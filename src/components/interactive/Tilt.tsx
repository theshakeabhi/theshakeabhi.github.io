/*
 * P2 — Tilt. 3D perspective(900px) tilt that follows the cursor relative to
 * the card's own center, in PointerProvider container coords (with
 * effective-scale division, trap 2). Port of micro.jsx 482–519; spec
 * README §Card Tilt.
 *
 * While hovered: transform transitions .12s linear. On leave: gentle settle
 * over .4s cubic-bezier(.2,1.5,.3,1). Inert (no tilt, no transition) under
 * reduced motion or a coarse pointer.
 *
 * SSR-safe: rect/pointer math only runs in the effect; the first-paint
 * transform is the deterministic rest pose on server and client alike.
 */
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { usePointer } from "../pointer/PointerProvider";
import { usePrefs } from "../../lib/prefs";

export interface TiltProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  scale?: number;
  style?: CSSProperties;
  children?: ReactNode;
}

const REST = { rx: 0, ry: 0, s: 1 };

export default function Tilt({
  max = 8,
  scale = 1.02,
  style,
  children,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: TiltProps) {
  const { p, containerRef } = usePointer();
  const prefs = usePrefs();
  const inert = prefs.reducedMotion || prefs.coarsePointer;
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(REST);
  const [over, setOver] = useState(false);

  useEffect(() => {
    if (inert || !over || !ref.current || !containerRef.current) {
      setT(REST);
      return;
    }
    const r = ref.current.getBoundingClientRect();
    const cr = containerRef.current.getBoundingClientRect();
    const sx = cr.width / containerRef.current.offsetWidth || 1;
    // Own center in PointerProvider container coords.
    const cx = (r.left - cr.left) / sx + r.width / sx / 2;
    const cy = (r.top - cr.top) / sx + r.height / sx / 2;
    const dx = (p.x - cx) / (r.width / sx / 2);
    const dy = (p.y - cy) / (r.height / sx / 2);
    setT({ rx: -dy * max, ry: dx * max, s: scale });
  }, [p.x, p.y, over, max, scale, inert, containerRef]);

  return (
    <div
      ref={ref}
      {...rest}
      onPointerEnter={(e) => {
        setOver(true);
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        setOver(false);
        onPointerLeave?.(e);
      }}
      style={{
        transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.s})`,
        transition: inert
          ? "none"
          : over
            ? "transform .12s linear"
            : "transform .4s cubic-bezier(.2,1.5,.3,1)",
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
