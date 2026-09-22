// P1 — custom cursor (micro.jsx 98–149; README §Custom Cursor + Trail).
// Soft 32px ring lagging behind (0.18 lerp per frame) + hard 7px dot that
// tracks exactly. State morphs (.18s transitions): 56px red ring filled at
// 12% on 'link', 44px cyan 6px-radius square on 'drag', 4px dot on press.
// Renders nothing when the custom cursor is off (pref), under reduced
// motion, or on a coarse pointer — the OS cursor stays visible then
// (PointerProvider only hides it while this cursor is active).
import { useEffect, useRef } from "react";
import { usePointer } from "./PointerProvider";
import { usePrefs } from "../../lib/prefs";
import { red, cyan, ink } from "../../tokens";

export default function CustomCursor() {
  const { p } = usePointer();
  const { cursor, reducedMotion, coarsePointer, minimal } = usePrefs();
  // minimal folds into `enabled` so the rAF loop stops, not just the render.
  const enabled = cursor && !reducedMotion && !coarsePointer && !minimal;
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    target.current = { x: p.x, y: p.y };
  }, [p.x, p.y]);

  useEffect(() => {
    if (!enabled) return;
    let raf: number;
    const tick = () => {
      const t = target.current;
      const c = current.current;
      c.x += (t.x - c.x) * 0.18;
      c.y += (t.y - c.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${c.x}px, ${c.y}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  if (!enabled || !p.inside) return null;
  const hot = p.hot;
  return (
    <>
      <div
        ref={ringRef}
        aria-hidden='true'
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "none",
          zIndex: 9999,
          width: hot === "link" ? 56 : hot === "drag" ? 44 : 32,
          height: hot === "link" ? 56 : hot === "drag" ? 44 : 32,
          border: `2.5px solid ${hot === "link" ? red : hot === "drag" ? cyan : ink}`,
          borderRadius: hot === "drag" ? 6 : "50%",
          background:
            hot === "link"
              ? `color-mix(in srgb, ${red} 12%, transparent)`
              : "transparent",
          transition:
            "width .18s, height .18s, border-radius .18s, background .18s, border-color .18s",
          mixBlendMode: "multiply",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden='true'
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "none",
          zIndex: 10000,
          width: p.down ? 4 : 7,
          height: p.down ? 4 : 7,
          background: ink,
          borderRadius: "50%",
          transition: "width .1s, height .1s",
        }}
      />
    </>
  );
}
