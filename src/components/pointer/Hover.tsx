// P1 — hoverable (micro.jsx 154–165). Sets the pointer "hot" state on
// enter / clears it on leave, and plays the hover sfx on enter of kind
// 'link' (drag surfaces get their grab/drop sfx from their own handlers).
// Frozen contract: <Hover as="span" kind="link"|"drag" {...rest}>.
import type { ElementType, PointerEvent, ReactNode } from "react";
import { usePointer } from "./PointerProvider";

export interface HoverProps {
  as?: ElementType;
  kind?: "link" | "drag";
  children?: ReactNode;
  [prop: string]: unknown;
}

type PointerHandler = (e: PointerEvent<Element>) => void;

export default function Hover({
  as: As = "span",
  kind = "link",
  children,
  ...rest
}: HoverProps) {
  const { setHot, sfx } = usePointer();
  const onPointerEnter = rest.onPointerEnter as PointerHandler | undefined;
  const onPointerLeave = rest.onPointerLeave as PointerHandler | undefined;
  return (
    <As
      {...rest}
      onPointerEnter={(e: PointerEvent<Element>) => {
        setHot(kind);
        if (kind === "link") sfx.hover();
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e: PointerEvent<Element>) => {
        setHot(null);
        onPointerLeave?.(e);
      }}
    >
      {children}
    </As>
  );
}
