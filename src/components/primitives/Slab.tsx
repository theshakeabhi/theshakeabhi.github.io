// P0 foundation — layout primitive, ported from portfolio-1.jsx.
// A "slab" is one full-width section band. Corner label renders the
// `## // NAME` stamp (inverse-colored, top-left, 10px 18px inset text).
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cream, ink, fonts, spacing } from "../../tokens";

export interface SlabProps extends HTMLAttributes<HTMLElement> {
  bg?: string;
  label?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export default function Slab({
  bg = cream,
  label,
  style,
  children,
  ...rest
}: SlabProps) {
  return (
    <section
      {...rest}
      style={{
        position: "relative",
        background: bg,
        // README §Spacing: 90px vertical (sections after the hero override
        // paddingTop to 110px); horizontal is fluid: clamp(20px, 5.5vw, 80px).
        // Longhands, not the `padding` shorthand: callers override
        // paddingTop/paddingBottom, and mixing the two warns in React on
        // the minimal ⇄ funky re-render.
        paddingTop: spacing.slabY,
        paddingBottom: spacing.slabY,
        // gutter = slabX until the viewport outgrows the 1280 content
        // max, then whatever centres the content (full-bleed background).
        paddingLeft: spacing.gutter,
        // + ribbon width, so the visible right gutter matches the left.
        paddingRight: spacing.gutterRight,
        overflow: "hidden",
        ...style,
      }}
    >
      {label && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            padding: "10px 18px",
            background: ink,
            color: cream,
            fontFamily: fonts.mono,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.15em",
          }}
        >
          {label}
        </div>
      )}
      {children}
    </section>
  );
}
