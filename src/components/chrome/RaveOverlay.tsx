// P6 — rave-mode easter egg overlay (README §Easter Egg).
// 50 confetti squares (14–34px, 2px ink borders, confetti token palette)
// fall on the global `fall` keyframe (3.6s, random delays ≤2s, random
// rotations). A dismissible "✶ RAVE MODE UNLOCKED ✶" banner sits fixed at
// the top — position: fixed, so this component must never gain a CSS-
// transformed ancestor (trap 1); it mounts at chrome level inside
// PointerProvider's untransformed wrapper in Portfolio.tsx.
// Fires sfx.yay() when `on` flips true (the triggering click/keydown is a
// user gesture, satisfying the AudioContext autoplay policy — trap 5).
// Under reduced motion only the banner renders — confetti never falls.
import { useEffect, useMemo, useRef } from "react";
import { usePointer } from "../pointer/PointerProvider";
import { usePrefs } from "../../lib/prefs";
import { cream, ink, red, yellow, confetti, fonts } from "../../tokens";

export interface RaveOverlayProps {
  on: boolean;
  onClose(): void;
}

interface ConfettiPiece {
  left: number;
  delay: number;
  color: string;
  size: number;
  rot: number;
}

export default function RaveOverlay({ on, onClose }: RaveOverlayProps) {
  const { sfx } = usePointer();
  const { reducedMotion, minimal } = usePrefs();
  const wasOn = useRef(false);

  useEffect(() => {
    // Minimal mode: eggs are inert — no fanfare (sfx is muted there anyway,
    // but yay() would still resume the AudioContext).
    if (on && !wasOn.current && !minimal) sfx.yay();
    wasOn.current = on;
  }, [on, sfx, minimal]);

  // Eggs stay inert in minimal mode: if rave triggers (or was already on
  // when the mode flipped), dismiss it so the egg state doesn't linger and
  // replay the party when the visitor switches back to full-fat.
  useEffect(() => {
    if (minimal && on) onClose();
  }, [minimal, on, onClose]);

  // Randomized once per rave (stable across re-renders while `on` holds).
  // Server-side `on` is always false, so Math.random never runs during SSR.
  const pieces = useMemo<ConfettiPiece[]>(
    () =>
      on
        ? Array.from({ length: 50 }, (_, i) => ({
            left: Math.random() * 100,
            delay: Math.random() * 2,
            color: confetti[i % confetti.length],
            size: 14 + Math.random() * 20,
            rot: Math.random() * 360,
          }))
        : [],
    [on]
  );

  if (!on || minimal) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9000,
        overflow: "hidden",
      }}
    >
      {!reducedMotion &&
        pieces.map((it, i) => (
          <div
            key={i}
            aria-hidden='true'
            style={{
              position: "absolute",
              top: -30,
              left: `${it.left}%`,
              width: it.size,
              height: it.size,
              background: it.color,
              border: `2px solid ${ink}`,
              transform: `rotate(${it.rot}deg)`,
              animation: `fall 3.6s ${it.delay}s linear forwards`,
            }}
          />
        ))}
      <button
        type='button'
        onClick={onClose}
        style={{
          position: "fixed",
          top: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9001,
          background: ink,
          color: cream,
          padding: "14px 24px",
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 18,
          letterSpacing: "0.1em",
          border: `3px solid ${cream}`,
          borderRadius: 0,
          boxShadow: `8px 8px 0 ${red}`,
          pointerEvents: "auto",
        }}
      >
        ✶ RAVE MODE UNLOCKED ✶&nbsp;&nbsp;
        <span style={{ color: yellow }}>[click to dismiss]</span>
      </button>
    </div>
  );
}
