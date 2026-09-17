// STUB(P4): replaced by package P4 (iterative character-reveal scrambler,
// 40ms step, i/2 reveal rate — README §Scramble Text).
import type { CSSProperties } from "react";

export interface ScrambleProps {
  text: string;
  trigger?: unknown;
  speed?: number;
  style?: CSSProperties;
}

export default function Scramble({ text, style }: ScrambleProps) {
  return <span style={style}>{text}</span>;
}
