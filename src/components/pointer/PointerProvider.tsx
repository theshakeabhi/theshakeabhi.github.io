// STUB(P1): replaced by package P1 (container-relative pointer tracking,
// hot states, effective-scale division — micro.jsx 1–55, trap 2).
// The context SHAPE is the frozen contract and must not change.
import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { makeSfx, type Sfx } from "../../lib/sfx";

export type PointerHot = "link" | "drag" | null;

export interface PointerState {
  x: number;
  y: number;
  inside: boolean;
  down: boolean;
  hot: PointerHot;
}

export interface PointerContextValue {
  p: PointerState;
  setHot(h: PointerHot): void;
  sfx: Sfx;
  containerRef: RefObject<HTMLElement>;
}

const INERT_POINTER: PointerState = {
  x: -999,
  y: -999,
  inside: false,
  down: false,
  hot: null,
};

const PointerCtx = createContext<PointerContextValue | null>(null);

export interface PointerProviderProps {
  children?: ReactNode;
  sfx?: Sfx;
}

export function PointerProvider({ children, sfx }: PointerProviderProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [fallbackSfx] = useState(makeSfx);

  const value = useMemo<PointerContextValue>(
    () => ({
      p: INERT_POINTER,
      setHot: () => {},
      sfx: sfx ?? fallbackSfx,
      containerRef,
    }),
    [sfx, fallbackSfx]
  );

  return (
    <PointerCtx.Provider value={value}>
      <div
        ref={containerRef as RefObject<HTMLDivElement>}
        style={{ position: "relative", width: "100%" }}
      >
        {children}
      </div>
    </PointerCtx.Provider>
  );
}

export function usePointer(): PointerContextValue {
  const ctx = useContext(PointerCtx);
  if (!ctx) {
    throw new Error("usePointer must be used inside <PointerProvider>");
  }
  return ctx;
}
