// P0 — washi tape strip, ported FULLY from micro.jsx (P3 owns going forward).
// Prototype defaults: rgba(8,145,178,0.55) fill (cyan @ 55%) and a soft
// 0 2px 6px ink@15% shadow — the one deliberate soft shadow in the system.
// Pure flourish — renders nothing in minimal mode (AGENTS.md §Two design
// modes).
import { usePrefs } from "../../lib/prefs";
import { cyan, ink } from "../../tokens";

export interface TapeProps {
  x?: number | string;
  y?: number | string;
  w?: number;
  rotate?: number;
  color?: string;
}

const DEFAULT_COLOR = `color-mix(in srgb, ${cyan} 55%, transparent)`;

export default function Tape({
  x,
  y,
  w = 90,
  rotate = -8,
  color = DEFAULT_COLOR,
}: TapeProps) {
  const { minimal } = usePrefs();
  if (minimal) return null;
  return (
    <div
      aria-hidden='true'
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: 26,
        background: color,
        transform: `rotate(${rotate}deg)`,
        boxShadow: `0 2px 6px color-mix(in srgb, ${ink} 15%, transparent)`,
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.18) 0 6px, transparent 6px 12px)",
      }}
    />
  );
}
