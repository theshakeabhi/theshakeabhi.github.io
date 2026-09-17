// STUB(P3): replaced by package P3 (pointer drag against the note's own
// offsetParent, localStorage `sticky_v2_<id>` persistence (trap 4), 0.4×
// rotation while dragging (trap 6), keyboard alternative — README
// §Draggable Sticky Notes). This stub renders the note statically.
import type { CSSProperties, ReactNode } from "react";
import { ink, sticky, fonts, shadows } from "../../tokens";

export interface StickyNoteProps {
  id: string;
  w?: number;
  h?: number;
  x: number;
  y: number;
  rotate?: number;
  color?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export default function StickyNote({
  id,
  w = 200,
  h = 200,
  x,
  y,
  rotate = 0,
  color = sticky.yellow,
  children,
  style,
}: StickyNoteProps) {
  return (
    <div
      data-sticky-id={id}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        minHeight: h,
        background: color,
        transform: `rotate(${rotate}deg)`,
        boxShadow: shadows.sticky,
        padding: "16px 18px",
        color: ink,
        fontFamily: fonts.hand,
        fontSize: 24,
        lineHeight: 1.15,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
