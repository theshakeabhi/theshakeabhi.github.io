// STUB(P1): replaced by package P1 (sets pointer hot state + hover sfx).
// Frozen contract: <Hover as="span" kind="link"|"drag" {...rest}>.
import type { ElementType, ReactNode } from "react";

export interface HoverProps {
  as?: ElementType;
  kind?: "link" | "drag";
  children?: ReactNode;
  [prop: string]: unknown;
}

export default function Hover({
  as: As = "span",
  kind = "link",
  children,
  ...rest
}: HoverProps) {
  return (
    <As data-hover-kind={kind} {...rest}>
      {children}
    </As>
  );
}
