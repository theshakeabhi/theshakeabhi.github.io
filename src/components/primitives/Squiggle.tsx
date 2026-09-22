// P0 foundation — hand-drawn squiggle underline, ported from portfolio-1.jsx.
// Pure flourish — renders nothing in minimal mode (AGENTS.md §Two design
// modes).
import type { CSSProperties } from "react";
import { usePrefs } from "../../lib/prefs";
import { red } from "../../tokens";

export interface SquiggleProps {
  w?: number;
  color?: string;
  style?: CSSProperties;
}

export default function Squiggle({
  w = 80,
  color = red,
  style,
}: SquiggleProps) {
  const { minimal } = usePrefs();
  if (minimal) return null;
  return (
    <svg
      width={w}
      height='14'
      viewBox='0 0 80 14'
      style={style}
      aria-hidden='true'
    >
      <path
        d='M2 7 Q 12 -2, 22 7 T 42 7 T 62 7 T 78 7'
        style={{ stroke: color }}
        strokeWidth='3'
        fill='none'
        strokeLinecap='round'
      />
    </svg>
  );
}
