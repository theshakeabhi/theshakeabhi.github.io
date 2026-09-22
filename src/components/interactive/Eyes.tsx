// P3 — googly eyes whose pupils track the cursor (README §Eyes That Follow,
// micro.jsx 247–312). Eye centers are resolved in PointerProvider CONTAINER
// coords via getBoundingClientRect on the wrapper — with effective-scale
// division (trap 2) — so pupils track the real cursor wherever the eyes are
// mounted. Blinks every 3.5–6.5s; double-click spins both eyes 360°/0.7s.
// Under coarse pointers or reduced motion the pupils are static + centered.
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import { usePointer } from "../pointer/PointerProvider";
import { usePrefs } from "../../lib/prefs";
import { ink, borders } from "../../tokens";

export interface EyesProps {
  size?: number;
  gap?: number;
  /** Optional absolute placement (prototype API). When either is set the
   *  wrapper is position:absolute at (x, y); otherwise it sits in flow. */
  x?: number | string;
  y?: number | string;
  blink?: boolean;
  style?: CSSProperties;
}

export default function Eyes({
  size = 60,
  gap = 14,
  x,
  y,
  blink = true,
  style,
}: EyesProps) {
  const { p, containerRef } = usePointer();
  const { reducedMotion, coarsePointer, minimal } = usePrefs();
  const [blinking, setBlinking] = useState(false);
  const [spin, setSpin] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const spinTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // No tracking on touch devices or for reduced-motion visitors —
  // static centered pupils instead.
  const tracking = !coarsePointer && !reducedMotion;

  useEffect(() => {
    // No blink interval in minimal mode either — the eyes render null there,
    // so the timer would be pure waste.
    if (!blink || reducedMotion || minimal) return;
    let close: ReturnType<typeof setTimeout> | undefined;
    const t = setInterval(
      () => {
        setBlinking(true);
        close = setTimeout(() => setBlinking(false), 140);
      },
      3500 + Math.random() * 3000
    );
    return () => {
      clearInterval(t);
      if (close) clearTimeout(close);
    };
  }, [blink, reducedMotion, minimal]);

  useEffect(() => {
    const timers = spinTimers.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  // Pure flourish — nothing in minimal mode (guard AFTER all hooks).
  if (minimal) return null;

  // Resolve eye centers in PointerProvider container coords (so pupils track
  // the real cursor regardless of where in the page the Eyes are mounted).
  // Divide by the container's effective scale (trap 2).
  let c1 = { x: 0, y: 0 };
  let c2 = { x: 0, y: 0 };
  if (tracking && wrap.current && containerRef.current) {
    const wr = wrap.current.getBoundingClientRect();
    const cr = containerRef.current.getBoundingClientRect();
    const sx = cr.width / containerRef.current.offsetWidth || 1;
    const left = (wr.left - cr.left) / sx;
    const top = (wr.top - cr.top) / sx;
    c1 = { x: left + size / 2, y: top + size / 2 };
    c2 = { x: left + size + gap + size / 2, y: top + size / 2 };
  }

  const onDoubleClick = () => {
    if (reducedMotion) return;
    setSpin(false);
    spinTimers.current.push(
      setTimeout(() => setSpin(true), 10),
      setTimeout(() => setSpin(false), 720)
    );
  };

  const eye = (cx: number, cy: number, key: number): ReactElement => {
    let pupilX = 0;
    let pupilY = 0;
    if (tracking) {
      const dx = p.x - cx;
      const dy = p.y - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const maxR = size * 0.18;
      pupilX = (dx / dist) * Math.min(maxR, dist / 8);
      pupilY = (dy / dist) * Math.min(maxR, dist / 8);
    }
    return (
      <div
        key={key}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "white",
          border: borders.default,
          position: "relative",
          overflow: "hidden",
          boxShadow: `3px 3px 0 ${ink}`,
          animation: spin ? "spin 0.7s ease-out" : "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`,
            width: size * 0.38,
            height: blinking ? 2 : size * 0.38,
            background: ink,
            borderRadius: "50%",
            transition: "height .08s",
          }}
        />
      </div>
    );
  };

  const positioned = x !== undefined || y !== undefined;
  return (
    <div
      ref={wrap}
      aria-hidden='true'
      onDoubleClick={onDoubleClick}
      style={{
        ...(positioned
          ? { position: "absolute" as const, left: x, top: y }
          : null),
        display: positioned ? "flex" : "inline-flex",
        gap,
        // OS-cursor hiding over the eyes comes from the provider's
        // [data-cursor-hidden] CSS (global.css) — no inline gate here, so
        // it can never disagree with the provider's reducedMotion/
        // coarsePointer/pref logic.
        ...style,
      }}
    >
      {eye(c1.x, c1.y, 0)}
      {eye(c2.x, c2.y, 1)}
    </div>
  );
}
