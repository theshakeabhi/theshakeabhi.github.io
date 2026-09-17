/*
 * P4 — Web Audio SFX, ported from micro.jsx (makeSfx).
 *
 * ONE lazily-created AudioContext per makeSfx() call. It is created/resumed
 * ONLY inside `ensure()`, which only ever runs from the six voice functions,
 * which are only ever invoked from user-gesture handlers (trap 5: autoplay
 * policy). No AudioContext at module top level — SSR-safe. No audio files:
 * every sound is a live oscillator with a 5ms linear attack ramp and an
 * exponential decay to 0.001 over its duration (README §Sound Effects).
 */

export interface Sfx {
  hover(): void;
  click(): void;
  pop(): void;
  grab(): void;
  drop(): void;
  yay(): void;
  setMuted(muted: boolean): void;
}

export function makeSfx(): Sfx {
  let ctx: AudioContext | null = null;
  let muted = false;

  const ensure = (): AudioContext | null => {
    if (!ctx) {
      try {
        const Ctor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (Ctor) ctx = new Ctor();
      } catch {
        // Web Audio unavailable — voices stay silent.
      }
    }
    if (ctx && ctx.state === "suspended") void ctx.resume();
    return ctx;
  };

  const beep = (
    freq: number,
    dur = 0.08,
    type: OscillatorType = "square",
    gain = 0.04
  ): void => {
    if (muted) return;
    const c = ensure();
    if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = 0;
    g.gain.linearRampToValueAtTime(gain, c.currentTime + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    o.connect(g);
    g.connect(c.destination);
    o.start();
    o.stop(c.currentTime + dur + 0.02);
  };

  /* Voices — exact wave/freq/dur/gain table from README §Sound Effects. */
  return {
    hover: () => beep(880, 0.04, "sine", 0.025),
    click: () => {
      beep(440, 0.05, "square", 0.05);
      window.setTimeout(() => beep(880, 0.06, "square", 0.04), 30);
    },
    pop: () => beep(660, 0.09, "triangle", 0.05),
    grab: () => beep(220, 0.06, "sawtooth", 0.04),
    drop: () => beep(160, 0.09, "sine", 0.05),
    yay: () => {
      [523, 659, 784, 1046].forEach((f, i) =>
        window.setTimeout(() => beep(f, 0.1, "triangle", 0.04), i * 80)
      );
    },
    setMuted: (m: boolean) => {
      muted = m;
    },
  };
}
