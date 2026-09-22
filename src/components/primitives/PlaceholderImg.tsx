// P0 foundation — striped image placeholder, ported from portfolio-1.jsx.
import type { CSSProperties } from "react";
import { cream, ink, slateLight, slateMid, fonts } from "../../tokens";

export interface PlaceholderImgProps {
  w?: number | string;
  h?: number | string;
  label?: string;
  tone?: "dark" | "mid" | "light";
  style?: CSSProperties;
}

const TONES = { dark: ink, mid: slateMid, light: slateLight } as const;

export default function PlaceholderImg({
  w,
  h,
  label = "image",
  tone = "mid",
  style,
}: PlaceholderImgProps) {
  const c = TONES[tone];
  return (
    <div
      role='img'
      aria-label={label}
      style={{
        width: w,
        height: h,
        border: `3px solid ${ink}`,
        background: `repeating-linear-gradient(45deg, ${c} 0 8px, transparent 8px 16px), ${cream}`,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            background: cream,
            padding: "4px 10px",
            border: `2px solid ${ink}`,
            fontFamily: fonts.mono,
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
