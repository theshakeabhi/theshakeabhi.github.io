// Minimal-mode layout primitive — the single 720px reading column every
// minimal section branch wraps its content in (AGENTS.md §Two design
// modes). Width + centering ONLY: no horizontal padding (the parent Slab's
// --spacing-slab-x already provides the gutters — doubling them squeezes
// the column at phone widths). Callers add vertical rhythm through the
// `style` prop using padding-block or paddingTop/paddingBottom LONGHANDS —
// never a `padding` shorthand, which would zero the sides it doesn't name
// (this exact bug shipped once in the design mockup).
import type { CSSProperties, ReactNode } from "react";

export interface MinimalColumnProps {
  children?: ReactNode;
  style?: CSSProperties;
}

export default function MinimalColumn({ children, style }: MinimalColumnProps) {
  return (
    <div style={{ maxWidth: 720, marginInline: "auto", ...style }}>
      {children}
    </div>
  );
}
