// STUB(P2): replaced by package P2 (framer-motion magnet: 0.35 strength,
// pull capped at half the shortest dimension, home-position subtraction
// (trap 3), press squish 0.94 + shadow collapse — README §Magnetic Buttons).
// The kind styles below are final so P5/P6 layouts look right meanwhile.
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { cream, cyan, ink, red, fonts, shadows } from "../../tokens";

export type MagneticButtonKind = "primary" | "danger" | "cyan" | "ghost";

export interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: MagneticButtonKind;
  strength?: number;
  wobble?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}

const PALETTE: Record<
  MagneticButtonKind,
  { bg: string; fg: string; border: string }
> = {
  primary: { bg: ink, fg: cream, border: ink },
  danger: { bg: red, fg: cream, border: ink },
  cyan: { bg: cyan, fg: cream, border: ink },
  ghost: { bg: cream, fg: ink, border: ink },
};

export default function MagneticButton({
  kind = "primary",
  strength: _strength = 0.35,
  wobble: _wobble = true,
  style,
  children,
  ...rest
}: MagneticButtonProps) {
  const palette = PALETTE[kind];
  return (
    <button
      {...rest}
      style={{
        background: palette.bg,
        color: palette.fg,
        border: `3px solid ${palette.border}`,
        boxShadow: shadows.card,
        padding: "14px 22px",
        fontFamily: fonts.body,
        fontWeight: 700,
        fontSize: 16,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        borderRadius: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
