// STUB(P4): replaced by package P4 (32ms glitch-scramble on pointer enter,
// snap back on leave — README §Hover-Scramble Headlines).
import type { CSSProperties } from "react";

export interface ScrambleHoverProps {
  text: string;
  style?: CSSProperties;
}

export default function ScrambleHover({ text, style }: ScrambleHoverProps) {
  return <span style={style}>{text}</span>;
}
