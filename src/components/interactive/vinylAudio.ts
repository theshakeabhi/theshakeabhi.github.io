// One AudioContext shared by the hero Vinyl's scratch synth and its acid
// loop, so the two mix on one clock instead of fighting two contexts.
//
// Trap 5: created / resumed ONLY from getAudioCtx(), and every caller runs
// inside a user gesture (pointerdown / click). Nothing happens at import
// time, so the module is SSR-safe.

let ctx: AudioContext | null = null;

export function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** The context if it already exists — never creates one (non-gesture use). */
export function peekAudioCtx(): AudioContext | null {
  return ctx;
}
