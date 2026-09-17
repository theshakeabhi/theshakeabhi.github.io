// P0 foundation — inline stamp badge, ported from portfolio-1.jsx.
import type { CSSProperties, ReactNode } from "react";
import { cream, red, fonts } from "../../tokens";

export interface StampProps {
  children?: ReactNode;
  color?: string;
  rotate?: number;
  style?: CSSProperties;
}

export default function Stamp({
  children,
  color = red,
  rotate = -6,
  style,
}: StampProps) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        border: `3px solid ${color}`,
        color,
        fontFamily: fonts.mono,
        fontWeight: 900,
        fontSize: 14,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        transform: `rotate(${rotate}deg)`,
        background: cream,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
