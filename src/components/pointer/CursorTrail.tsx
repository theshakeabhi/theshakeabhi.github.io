// P1 — cursor trail (micro.jsx 442–478; README §Custom Cursor + Trail).
// 4 small lagging dots (red, cyan, ink, ink) chained behind the cursor
// with successively slower easing (0.22 − i·0.04) and fading opacity.
// Same enablement gate as CustomCursor: off-pref / reduced motion /
// coarse pointer render nothing.
import { useEffect, useRef } from "react";
import { usePointer } from "./PointerProvider";
import { usePrefs } from "../../lib/prefs";
import { red, cyan, ink } from "../../tokens";

export interface CursorTrailProps {
  count?: number;
}

interface TrailDot {
  x: number;
  y: number;
  el: HTMLDivElement | null;
}

export default function CursorTrail({ count = 4 }: CursorTrailProps) {
  const { p } = usePointer();
  const { cursor, reducedMotion, coarsePointer, minimal } = usePrefs();
  // minimal folds into `enabled` so the rAF loop stops, not just the render.
  const enabled = cursor && !reducedMotion && !coarsePointer && !minimal;
  const refs = useRef<TrailDot[]>(
    Array.from({ length: count }, () => ({ x: 0, y: 0, el: null }))
  );
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    target.current = { x: p.x, y: p.y };
  }, [p.x, p.y]);

  useEffect(() => {
    if (!enabled) return;
    let raf: number;
    const tick = () => {
      let { x, y } = target.current;
      refs.current.forEach((r, i) => {
        const ease = 0.22 - i * 0.04;
        r.x += (x - r.x) * ease;
        r.y += (y - r.y) * ease;
        if (r.el) {
          r.el.style.transform = `translate(${r.x}px, ${r.y}px) translate(-50%, -50%)`;
        }
        x = r.x;
        y = r.y;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  if (!enabled || !p.inside) return null;
  return (
    <>
      {refs.current.map((r, i) => (
        <div
          key={i}
          ref={(el) => {
            r.el = el;
          }}
          aria-hidden='true'
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            pointerEvents: "none",
            zIndex: 9998 - i,
            width: 6 - i,
            height: 6 - i,
            background: i === 0 ? red : i === 1 ? cyan : ink,
            borderRadius: "50%",
            opacity: 1 - i * 0.18,
          }}
        />
      ))}
    </>
  );
}
