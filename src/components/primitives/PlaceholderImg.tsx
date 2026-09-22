// P0 foundation — striped image placeholder, ported from portfolio-1.jsx.
// Minimal mode: a plain hairline box with a quiet mono label — still
// role='img' (it stands in for real content in both modes).
import type { CSSProperties } from "react";
import { usePrefs } from "../../lib/prefs";
import {
  borders,
  cream,
  ink,
  slate,
  slateLight,
  slateMid,
  fonts,
} from "../../tokens";

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
  const { minimal } = usePrefs();
  const c = TONES[tone];

  if (minimal) {
    return (
      <div
        role='img'
        aria-label={label}
        style={{
          width: w,
          height: h,
          border: borders.default,
          background: cream,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          ...style,
        }}
      >
        <span
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: slate,
          }}
        >
          {label}
        </span>
      </div>
    );
  }

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
