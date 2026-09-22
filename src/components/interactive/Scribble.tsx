// P0 — hand-drawn double-stroke underline, ported FULLY from micro.jsx
// (P3 owns going forward). Pure flourish — renders nothing in minimal mode
// (AGENTS.md §Two design modes).
import type { CSSProperties } from "react";
import { usePrefs } from "../../lib/prefs";
import { red } from "../../tokens";

export interface ScribbleProps {
  w?: number;
  h?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}

export default function Scribble({
  w = 200,
  h = 40,
  color = red,
  strokeWidth = 4,
  style,
}: ScribbleProps) {
  const { minimal } = usePrefs();
  if (minimal) return null;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={style}
      aria-hidden='true'
    >
      <path
        d={`M 5 ${h - 8} Q ${w * 0.25} ${h - 22}, ${w * 0.5} ${h - 12} T ${w - 8} ${h - 14}`}
        style={{ stroke: color }}
        strokeWidth={strokeWidth}
        fill='none'
        strokeLinecap='round'
      />
      <path
        d={`M 8 ${h - 4} Q ${w * 0.3} ${h - 14}, ${w * 0.55} ${h - 6} T ${w - 12} ${h - 8}`}
        style={{ stroke: color }}
        strokeWidth={strokeWidth - 1}
        fill='none'
        strokeLinecap='round'
        opacity='0.6'
      />
    </svg>
  );
}
