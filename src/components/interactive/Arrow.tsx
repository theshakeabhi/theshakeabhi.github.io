// P0 — hand-drawn quadratic-bezier arrow with arrowhead + optional Caveat
// label, ported FULLY from micro.jsx (P3 owns going forward).
import type { CSSProperties } from "react";
import { red, fonts } from "../../tokens";

export interface ArrowProps {
  from?: [number, number];
  to?: [number, number];
  color?: string;
  width?: number;
  label?: string;
  style?: CSSProperties;
}

export default function Arrow({
  from = [0, 0],
  to = [100, 100],
  color = red,
  width = 4,
  label,
  style,
}: ArrowProps) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const c1x = x1 + dx * 0.3 + nx * 30;
  const c1y = y1 + dy * 0.3 + ny * 30;
  const c2x = x1 + dx * 0.7 + nx * -10;
  const c2y = y1 + dy * 0.7 + ny * -10;
  const angle = Math.atan2(y2 - c2y, x2 - c2x);
  const ax = x2 - Math.cos(angle) * 14;
  const ay = y2 - Math.sin(angle) * 14;
  const wing = 14;
  const minX = Math.min(x1, x2) - 30;
  const minY = Math.min(y1, y2) - 30;
  const maxX = Math.max(x1, x2) + 30;
  const maxY = Math.max(y1, y2) + 30;
  const w = maxX - minX;
  const h = maxY - minY;
  const labelX = (x1 + x2) / 2 + nx * 28;
  const labelY = (y1 + y2) / 2 + ny * 28;
  return (
    <svg
      aria-hidden='true'
      style={{
        position: "absolute",
        left: minX,
        top: minY,
        pointerEvents: "none",
        overflow: "visible",
        ...style,
      }}
      width={w}
      height={h}
      viewBox={`${minX} ${minY} ${w} ${h}`}
    >
      <path
        d={`M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ax} ${ay}`}
        style={{ stroke: color }}
        strokeWidth={width}
        fill='none'
        strokeLinecap='round'
        strokeDasharray='0'
      />
      <polygon
        points={`
        ${x2},${y2}
        ${ax + Math.cos(angle - 2.6) * wing},${ay + Math.sin(angle - 2.6) * wing}
        ${ax + Math.cos(angle + 2.6) * wing},${ay + Math.sin(angle + 2.6) * wing}
      `}
        style={{ fill: color }}
      />
      {label && (
        <text
          x={labelX}
          y={labelY}
          style={{ fill: color, fontFamily: fonts.hand }}
          fontSize='26'
          fontWeight='700'
          textAnchor='middle'
          transform={`rotate(${(Math.atan2(dy, dx) * 180) / Math.PI - 4}, ${labelX}, ${labelY})`}
        >
          {label}
        </text>
      )}
    </svg>
  );
}
