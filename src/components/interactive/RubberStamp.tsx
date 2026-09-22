// P0 — double-line rubber stamp, ported FULLY from micro.jsx (P3 owns
// going forward).
import type { CSSProperties } from "react";
import { cream, red, fonts } from "../../tokens";

export interface RubberStampProps {
  text?: string;
  color?: string;
  rotate?: number;
  size?: number;
  style?: CSSProperties;
}

export default function RubberStamp({
  text = "APPROVED",
  color = red,
  rotate = -12,
  size = 110,
  style,
}: RubberStampProps) {
  return (
    <div
      aria-hidden='true'
      style={{
        position: "absolute",
        width: size,
        height: size * 0.5,
        transform: `rotate(${rotate}deg)`,
        border: `3px double ${color}`,
        color,
        borderRadius: 6,
        display: "grid",
        placeItems: "center",
        fontFamily: fonts.display,
        fontWeight: 900,
        fontSize: Math.round(size * 0.16),
        letterSpacing: "0.1em",
        opacity: 0.85,
        background: `repeating-linear-gradient(0deg, transparent 0 4px, color-mix(in srgb, ${cream} 40%, transparent) 4px 5px)`,
        ...style,
      }}
    >
      {text}
    </div>
  );
}
