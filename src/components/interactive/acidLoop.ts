// "Side A" — the hero Vinyl's soundtrack: a 132 BPM acid-techno loop
// synthesised live with Web Audio (owner ask, Nov '26). No audio files, no
// licensing, ~0 bytes on the wire.
//
// Voices: sine kick with a pitch drop, clap on 2 & 4 (noise bursts),
// closed + open hats (high-passed noise), and a 303-style acid line
// (sawtooth → resonant low-pass with a per-note envelope, accents, slides).
//
// Turntable model: a single `rate` (1 = normal speed) scales tempo AND
// pitch together, like a platter. The Vinyl drives it from the drag speed
// (scratching), eases it back to 1 on release, and winds it to 0 on stop.
// rate < MIN_RATE stalls the sequencer (finger holding the record).
//
// Scheduling: classic lookahead — a 25ms timer schedules every step that
// falls in the next 120ms on the audio clock, so timing stays tight even
// though the timer itself jitters.
//
// Trap 5: everything audio starts inside startLoop(), which the Vinyl only
// calls from a click / pointer gesture. SSR-safe: no work at import time.
import { getAudioCtx, peekAudioCtx } from "./vinylAudio";

const BPM = 132;
const STEP_S = 60 / BPM / 4; // one 16th note
const LOOKAHEAD_S = 0.12;
const TICK_MS = 25;
const MIN_RATE = 0.06;
const MAX_RATE = 2.2;
const MASTER = 0.42;

// A-minor acid line, 16 steps: semitones above A1 (55 Hz), null = rest.
// [note, accent, slide-into-next]
type Step = [number | null, boolean, boolean];
const ACID: Step[] = [
  [0, true, false],
  [0, false, false],
  [12, false, true],
  [0, false, false],
  [null, false, false],
  [3, true, false],
  [15, false, true],
  [3, false, false],
  [0, false, false],
  [7, true, false],
  [null, false, false],
  [12, false, true],
  [10, true, false],
  [0, false, false],
  [3, false, true],
  [5, false, false],
];

interface Engine {
  master: GainNode;
  tone: BiquadFilterNode; // master low-pass — darkens as the platter slows
  noise: AudioBuffer;
  bass: { osc: OscillatorNode; filter: BiquadFilterNode; amp: GainNode };
  timer: number;
  nextTime: number;
  step: number;
}

let engine: Engine | null = null;
let rate = 1;
let windRaf: number | null = null;
const listeners = new Set<(on: boolean) => void>();

const emit = () => listeners.forEach((fn) => fn(!!engine));

/** Subscribe to play/stop changes; returns the unsubscribe. */
export function onLoopChange(fn: (on: boolean) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const isLoopOn = () => !!engine;

function makeNoise(ac: AudioContext): AudioBuffer {
  const buf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function kick(ac: AudioContext, e: Engine, t: number, r: number) {
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.frequency.setValueAtTime(150 * r, t);
  o.frequency.exponentialRampToValueAtTime(45 * r, t + 0.12);
  g.gain.setValueAtTime(1, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
  o.connect(g).connect(e.master);
  o.start(t);
  o.stop(t + 0.34);
}

function noiseHit(
  ac: AudioContext,
  e: Engine,
  t: number,
  r: number,
  opts: {
    type: BiquadFilterType;
    freq: number;
    q?: number;
    level: number;
    decay: number;
  }
) {
  const src = ac.createBufferSource();
  src.buffer = e.noise;
  src.playbackRate.value = Math.max(0.25, r);
  const f = ac.createBiquadFilter();
  f.type = opts.type;
  f.frequency.value = opts.freq * r;
  if (opts.q) f.Q.value = opts.q;
  const g = ac.createGain();
  g.gain.setValueAtTime(opts.level, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + opts.decay);
  src.connect(f).connect(g).connect(e.master);
  src.start(t, Math.random() * 0.5);
  src.stop(t + opts.decay + 0.02);
}

function clap(ac: AudioContext, e: Engine, t: number, r: number) {
  // Three tight bursts read as a hand clap.
  for (const dt of [0, 0.011, 0.022]) {
    noiseHit(ac, e, t + dt, r, {
      type: "bandpass",
      freq: 1500,
      q: 1.2,
      level: 0.5,
      decay: dt === 0.022 ? 0.18 : 0.03,
    });
  }
}

function acid(e: Engine, t: number, r: number, i: number) {
  const [note, accent, slide] = ACID[i];
  const { osc, filter, amp } = e.bass;
  const stepDur = STEP_S / r;
  if (note === null) {
    amp.gain.setTargetAtTime(0, t, 0.01);
    return;
  }
  const freq = 55 * 2 ** (note / 12) * r;
  const prevSlide = ACID[(i + 15) % 16][2];
  if (prevSlide) osc.frequency.setTargetAtTime(freq, t, 0.03);
  else osc.frequency.setValueAtTime(freq, t);
  // Filter "squelch": snap open then decay; accents open wider + louder.
  const peak = (accent ? 2600 : 1500) * Math.min(r, 1.4);
  filter.frequency.cancelScheduledValues(t);
  filter.frequency.setValueAtTime(peak, t);
  filter.frequency.exponentialRampToValueAtTime(220, t + stepDur * 0.9);
  amp.gain.cancelScheduledValues(t);
  amp.gain.setTargetAtTime(accent ? 0.42 : 0.3, t, 0.004);
  // Gate off before the next step unless sliding into it.
  if (!slide) amp.gain.setTargetAtTime(0, t + stepDur * 0.7, 0.015);
}

function scheduleStep(ac: AudioContext, e: Engine, t: number, r: number) {
  const i = e.step % 16;
  if (i % 4 === 0) kick(ac, e, t, r);
  if (i === 4 || i === 12) clap(ac, e, t, r);
  if (i % 4 === 2) {
    noiseHit(ac, e, t, r, {
      type: "highpass",
      freq: 7000,
      level: 0.22,
      decay: 0.16,
    });
  } else {
    noiseHit(ac, e, t, r, {
      type: "highpass",
      freq: 9000,
      level: 0.08,
      decay: 0.035,
    });
  }
  acid(e, t, r, i);
}

function tick() {
  const ac = peekAudioCtx();
  const e = engine;
  if (!ac || !e) return;
  const now = ac.currentTime;
  // Platter held / nearly stopped: stall, and resume from "now" later.
  if (rate < MIN_RATE) {
    e.nextTime = now + 0.02;
    e.bass.amp.gain.setTargetAtTime(0, now, 0.02);
    return;
  }
  while (e.nextTime < now + LOOKAHEAD_S) {
    scheduleStep(ac, e, e.nextTime, rate);
    e.nextTime += STEP_S / rate;
    e.step++;
  }
}

/** Start Side A. Call from a user gesture. No-op if already playing. */
export function startLoop() {
  cancelWind();
  rate = 1;
  if (engine) return;
  const ac = getAudioCtx();
  if (!ac) return;
  const master = ac.createGain();
  master.gain.setValueAtTime(0, ac.currentTime);
  master.gain.linearRampToValueAtTime(MASTER, ac.currentTime + 0.25);
  const comp = ac.createDynamicsCompressor();
  comp.threshold.value = -16;
  comp.ratio.value = 4;
  const tone = ac.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 18000;
  master.connect(tone).connect(comp).connect(ac.destination);

  const osc = ac.createOscillator();
  osc.type = "sawtooth";
  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.Q.value = 14;
  const amp = ac.createGain();
  amp.gain.value = 0;
  osc.connect(filter).connect(amp).connect(master);
  osc.start();

  engine = {
    master,
    tone,
    noise: makeNoise(ac),
    bass: { osc, filter, amp },
    timer: window.setInterval(tick, TICK_MS),
    nextTime: ac.currentTime + 0.05,
    step: 0,
  };
  tick();
  emit();
}

function teardown() {
  const ac = peekAudioCtx();
  const e = engine;
  if (!e) return;
  engine = null;
  window.clearInterval(e.timer);
  if (ac) {
    const t = ac.currentTime;
    e.master.gain.cancelScheduledValues(t);
    e.master.gain.setTargetAtTime(0, t, 0.05);
    e.bass.osc.stop(t + 0.3);
  }
  emit();
}

function cancelWind() {
  if (windRaf !== null) cancelAnimationFrame(windRaf);
  windRaf = null;
}

/** Set the platter speed (scratching). Clamped to [0, MAX_RATE]. */
export function setLoopRate(r: number) {
  if (!engine) return;
  cancelWind();
  rate = Math.max(0, Math.min(MAX_RATE, r));
  const ac = peekAudioCtx();
  if (ac) {
    // Slow platter = duller sound, like a real deck dragging.
    engine.tone.frequency.setTargetAtTime(
      400 + 17600 * Math.min(1, rate),
      ac.currentTime,
      0.03
    );
  }
}

/** Ease the platter back to 1 (motor catching up after a scratch). */
export function settleLoopRate() {
  if (!engine) return;
  cancelWind();
  const from = rate;
  const t0 = performance.now();
  const step = () => {
    const k = Math.min(1, (performance.now() - t0) / 450);
    setLoopRate(from + (1 - from) * (1 - (1 - k) ** 3));
    windRaf = k < 1 ? requestAnimationFrame(step) : null;
  };
  windRaf = requestAnimationFrame(step);
}

/**
 * Stop Side A. `windDown` = turntable power-off (speed + pitch sag to zero
 * over ~1.1s); otherwise a quick fade (scroll-away, tab hidden, prefs).
 */
export function stopLoop(windDown = false) {
  if (!engine) return;
  cancelWind();
  if (!windDown) {
    teardown();
    return;
  }
  const from = rate;
  const t0 = performance.now();
  const step = () => {
    const k = Math.min(1, (performance.now() - t0) / 1100);
    rate = from * (1 - k) ** 2;
    const ac = peekAudioCtx();
    if (ac && engine) {
      engine.tone.frequency.setTargetAtTime(
        400 + 17600 * Math.min(1, rate),
        ac.currentTime,
        0.03
      );
    }
    if (k < 1) windRaf = requestAnimationFrame(step);
    else {
      windRaf = null;
      teardown();
    }
  };
  windRaf = requestAnimationFrame(step);
}
