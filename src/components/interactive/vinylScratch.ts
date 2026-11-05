// Record-scratch synth for the draggable hero Vinyl. Kept OUT of the
// frozen Sfx contract (AGENTS.md §Frozen contracts) — the Vinyl gates it on
// usePrefs().sfx itself.
//
// Trap 5: the shared AudioContext (vinylAudio.ts) is created/resumed ONLY
// from startScratch(), which the Vinyl calls inside a pointerdown. Nothing runs at import
// time, so the module is SSR-safe.
//
// Voice: looping white noise → bandpass (the "hiss" of the needle) plus a
// sawtooth → lowpass (the pitched "wikka"), both through one gain. Drag
// velocity drives pitch, filter cutoff and level; direction flips pitch
// down for a backspin feel.

import { getAudioCtx, peekAudioCtx } from "./vinylAudio";

let noiseBuf: AudioBuffer | null = null;

interface Voice {
  noise: AudioBufferSourceNode;
  saw: OscillatorNode;
  band: BiquadFilterNode;
  low: BiquadFilterNode;
  gain: GainNode;
}
let voice: Voice | null = null;

export function startScratch() {
  const ac = getAudioCtx();
  if (!ac || voice) return;
  if (!noiseBuf) {
    noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const noise = ac.createBufferSource();
  noise.buffer = noiseBuf;
  noise.loop = true;
  const band = ac.createBiquadFilter();
  band.type = "bandpass";
  band.Q.value = 4;
  band.frequency.value = 900;
  const saw = ac.createOscillator();
  saw.type = "sawtooth";
  saw.frequency.value = 90;
  const low = ac.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.value = 1200;
  const gain = ac.createGain();
  gain.gain.value = 0;
  noise.connect(band).connect(gain);
  saw.connect(low).connect(gain);
  gain.connect(ac.destination);
  noise.start();
  saw.start();
  voice = { noise, saw, band, low, gain };
}

/** v: signed horizontal drag speed in px/ms (≈ −3…3 for a hard flick). */
export function updateScratch(v: number) {
  const ctx = peekAudioCtx();
  if (!ctx || !voice) return;
  const t = ctx.currentTime;
  const speed = Math.min(Math.abs(v), 3);
  const dir = v >= 0 ? 1 : 0.6; // backspin sits lower
  voice.saw.frequency.setTargetAtTime((70 + speed * 420) * dir, t, 0.015);
  voice.band.frequency.setTargetAtTime((500 + speed * 2600) * dir, t, 0.015);
  voice.low.frequency.setTargetAtTime(600 + speed * 2400, t, 0.02);
  voice.gain.gain.setTargetAtTime(Math.min(0.22, speed * 0.12), t, 0.012);
}

export function stopScratch() {
  const ctx = peekAudioCtx();
  if (!ctx || !voice) return;
  const v = voice;
  voice = null;
  const t = ctx.currentTime;
  v.gain.gain.cancelScheduledValues(t);
  v.gain.gain.setTargetAtTime(0, t, 0.03);
  v.noise.stop(t + 0.2);
  v.saw.stop(t + 0.2);
}
