// P1 — container-scoped pointer tracking (micro.jsx 1–55).
// Container-relative coords, hot states, effective-scale division (trap 2).
// The context SHAPE is the frozen contract and must not change.
//
// OS-cursor hiding: this provider owns the mechanism. It toggles
// `data-cursor-hidden` on the container; the matching `cursor: none` rule
// is static CSS in src/styles/global.css (an inline <style> child gets
// HTML-escaped by react-dom/server and never decoded inside RAWTEXT,
// causing hydration errors #425/#423). The attribute is applied only after
// mount (and only when usePrefs().cursor is on and neither reducedMotion
// nor coarsePointer applies), so first-paint markup is identical on server
// and client and the OS cursor is never hidden before the custom cursor
// can render.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { makeSfx, type Sfx } from "../../lib/sfx";
import { usePrefs } from "../../lib/prefs";

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

const PointerCtx = createContext<PointerContextValue | null>(null);

export interface PointerProviderProps {
  children?: ReactNode;
  sfx?: Sfx;
}

export function PointerProvider({ children, sfx }: PointerProviderProps) {
  const containerRef = useRef<HTMLElement>(null);
  // Only build a fallback Sfx when no instance is passed in — makeSfx now
  // registers a pre-warm gesture listener, so an unused instance would
  // needlessly create a second AudioContext.
  const [fallbackSfx] = useState(() => sfx ?? makeSfx());
  const [p, setP] = useState<PointerState>({
    x: -999,
    y: -999,
    inside: false,
    down: false,
    hot: null,
  });
  const [mounted, setMounted] = useState(false);
  const { cursor, reducedMotion, coarsePointer, minimal } = usePrefs();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      // Divide by effective scale so the cursor stays on the real pointer
      // when the artboard is rendered scaled (trap 2).
      const sx = r.width / el.offsetWidth || 1;
      const sy = r.height / el.offsetHeight || 1;
      setP((s) => ({
        ...s,
        x: (e.clientX - r.left) / sx,
        y: (e.clientY - r.top) / sy,
        inside: true,
      }));
    };
    const leave = () => setP((s) => ({ ...s, inside: false }));
    const down = () => setP((s) => ({ ...s, down: true }));
    const up = () => setP((s) => ({ ...s, down: false }));
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const setHot = useCallback(
    (hot: PointerHot) => setP((s) => (s.hot === hot ? s : { ...s, hot })),
    []
  );

  const value = useMemo<PointerContextValue>(
    () => ({
      p,
      setHot,
      sfx: sfx ?? fallbackSfx,
      containerRef,
    }),
    [p, setHot, sfx, fallbackSfx]
  );

  // Minimal mode keeps the OS cursor — CustomCursor renders null there.
  const hideOsCursor =
    mounted && cursor && !reducedMotion && !coarsePointer && !minimal;

  return (
    <PointerCtx.Provider value={value}>
      <div
        ref={containerRef as RefObject<HTMLDivElement>}
        data-cursor-hidden={hideOsCursor ? "true" : undefined}
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
