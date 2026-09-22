// P0 foundation — sticker burst (spiky badge), ported from portfolio-1.jsx.
// Pure flourish — renders nothing in minimal mode (AGENTS.md §Two design
// modes).
import type { CSSProperties } from "react";
import { usePrefs } from "../../lib/prefs";
import { ink, yellow } from "../../tokens";

export interface BurstProps {
  size?: number;
  color?: string;
  rotate?: number;
  points?: number;
  style?: CSSProperties;
}

export default function Burst({
  size = 80,
  color = yellow,
  rotate = 0,
  points = 12,
  style,
}: BurstProps) {
  const { minimal } = usePrefs();
  if (minimal) return null;
  const r1 = size / 2;
  const r2 = size / 2 - 12;
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? r1 : r2;
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${r1 + Math.cos(a) * r},${r1 + Math.sin(a) * r}`);
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden='true'
    >
      <polygon
        points={pts.join(" ")}
        style={{ fill: color, stroke: ink }}
        strokeWidth='2.5'
        strokeLinejoin='round'
      />
    </svg>
  );
}
