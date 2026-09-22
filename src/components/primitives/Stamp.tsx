// P0 foundation — inline stamp badge, ported from portfolio-1.jsx.
// Its text is real info, so minimal mode calms it into a quiet mono chip
// (hairline border, no rotation) instead of dropping it — the `color` prop
// is kept so status chips can spend the sanctioned --color-accent
// (AGENTS.md §Two design modes).
import type { CSSProperties, ReactNode } from "react";
import { usePrefs } from "../../lib/prefs";
import { borders, cream, red, fonts } from "../../tokens";

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
  const { minimal } = usePrefs();

  if (minimal) {
    return (
      <span
        style={{
          display: "inline-block",
          padding: "4px 12px",
          border: borders.default,
          color,
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          background: cream,
          ...style,
        }}
      >
        {children}
      </span>
    );
  }

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
