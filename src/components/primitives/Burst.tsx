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

// Star polygon coordinates at a FIXED 2-decimal precision. The island is
// pre-rendered by Node at build time and hydrated in the browser, and
// Math.cos/Math.sin are only ~1-ULP exact per engine — raw `${float}`
// interpolation emitted 17-significant-digit strings that could differ
// between the two, tripping React's "Prop `points` did not match"
// hydration warning on every load. toFixed is exactly specified
// (ECMA-262), no coordinate sits near a 2-decimal rounding boundary
// (the cardinal points land ~1e-15 from whole numbers), and 0.005px is
// sub-visual — so server and client now emit identical strings. Pure
// function of (size, points), memoized at module level.
const POINTS_CACHE = new Map<string, string>();
function starPoints(size: number, points: number): string {
  const key = `${size}:${points}`;
  const hit = POINTS_CACHE.get(key);
  if (hit) return hit;
  const r1 = size / 2;
  const r2 = size / 2 - 12;
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? r1 : r2;
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    pts.push(
      `${(r1 + Math.cos(a) * r).toFixed(2)},${(r1 + Math.sin(a) * r).toFixed(2)}`
    );
  }
  const out = pts.join(" ");
  POINTS_CACHE.set(key, out);
  return out;
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
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden='true'
    >
      <polygon
        points={starPoints(size, points)}
        style={{ fill: color, stroke: ink }}
        strokeWidth='2.5'
        strokeLinejoin='round'
      />
    </svg>
  );
}
