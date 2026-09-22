// P0 foundation — sticker star, ported from portfolio-1.jsx.
// Pure flourish — renders nothing in minimal mode (AGENTS.md §Two design
// modes).
import type { CSSProperties } from "react";
import { usePrefs } from "../../lib/prefs";
import { ink, red } from "../../tokens";

export interface StarProps {
  size?: number;
  color?: string;
  rotate?: number;
  style?: CSSProperties;
}

export default function Star({
  size = 30,
  color = red,
  rotate = 0,
  style,
}: StarProps) {
  const { minimal } = usePrefs();
  if (minimal) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 30 30'
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden='true'
    >
      <path
        d='M15 0 L18 11 L29 13 L20 19 L24 30 L15 23 L6 30 L10 19 L1 13 L12 11 Z'
        style={{ fill: color, stroke: ink }}
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
    </svg>
  );
}
