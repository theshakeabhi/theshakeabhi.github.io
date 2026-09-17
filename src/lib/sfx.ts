// STUB(P4): replaced by package P4 (Web Audio oscillator synthesis — one
// lazily-created AudioContext on first user gesture, six synth voices,
// global mute; see README §Sound Effects).

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
  const noop = () => {};
  return {
    hover: noop,
    click: noop,
    pop: noop,
    grab: noop,
    drop: noop,
    yay: noop,
    setMuted: noop,
  };
}
