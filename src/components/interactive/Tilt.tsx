// STUB(P2): replaced by package P2 (perspective(900px) cursor tilt in
// container coords, .12s linear while hovered, spring settle on leave —
// README §Card Tilt).
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface TiltProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  scale?: number;
  style?: CSSProperties;
  children?: ReactNode;
}

export default function Tilt({
  max: _max = 8,
  scale: _scale = 1.02,
  style,
  children,
  ...rest
}: TiltProps) {
  return (
    <div {...rest} style={style}>
      {children}
    </div>
  );
}
