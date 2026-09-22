// P3 — draggable sticky note (README §Draggable Sticky Notes, micro.jsx
// 313–390). Drag from anywhere; while dragging: scale 1.05, rotation ×0.4
// (trap 6), z-index 50, sfx grab/drop. Drag math is relative to the note's
// OWN offsetParent (the cork board) with effective-scale division (trap 2).
// Position persists to localStorage `sticky_v2_<id>` on drop — the v2_
// prefix is intentional, never migrate old data (trap 4). SSR-safe: first
// paint renders at the given x/y; the stored position applies in an effect.
// Keyboard alternative: Tab to focus, Enter picks up, arrows move (8px,
// 32px with Shift), Esc or Enter drops (persists the same way).
// Positions are clamped to the offsetParent (cork board) bounds — on
// mount, on window resize, and before persisting — so notes stay visible
// when the fluid board is narrower than the 1440 design.
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { usePointer } from "../pointer/PointerProvider";
import { cream, ink, sticky, fonts, shadows } from "../../tokens";

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
  /**
   * Width of the board the default x coord was designed against (e.g. 1280
   * for the Now cork board at the 1440 design width). When set and no stored
   * position exists, the default x is scaled by clientWidth/designW so
   * un-dragged notes reflow with the fluid board instead of piling up at the
   * clamped right edge. Additive optional prop; frozen contract unchanged.
   */
  designW?: number;
}

interface NotePos {
  x: number;
  y: number;
  rotate: number;
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
  designW,
}: StickyNoteProps) {
  const { setHot, sfx, containerRef } = usePointer();
  const key = `sticky_v2_${id}`;
  const [pos, setPos] = useState<NotePos>({ x, y, rotate });
  const [drag, setDrag] = useState(false); // pointer drag
  const [lifted, setLifted] = useState(false); // keyboard pick-up
  const off = useRef({ x: 0, y: 0 });
  const node = useRef<HTMLDivElement>(null);

  // Clamp a position to the offsetParent (cork board) bounds so the note
  // stays fully visible inside the overflow-hidden board. Uses clientWidth/
  // clientHeight (unscaled layout values, EXCLUDING the board's 3px borders —
  // the overflow clip box) because pos coords live in the board's unscaled
  // padding-box coordinate space (trap 2).
  const clamp = useCallback((p: NotePos): NotePos => {
    const el = node.current;
    const parent = el?.offsetParent as HTMLElement | null;
    if (!el || !parent) return p;
    const maxX = Math.max(0, parent.clientWidth - el.offsetWidth);
    const maxY = Math.max(0, parent.clientHeight - el.offsetHeight);
    const nx = Math.min(Math.max(p.x, 0), maxX);
    const ny = Math.min(Math.max(p.y, 0), maxY);
    return nx === p.x && ny === p.y ? p : { ...p, x: nx, y: ny };
  }, []);

  // Scale the DEFAULT x coord with the fluid board width (defaults were
  // authored against the 1440-design board = designW px wide) so un-dragged
  // notes reflow instead of all clamping into the same right-edge column.
  // Stored (user-dragged) positions are never rescaled, only clamped.
  const scaledDefault = useCallback((): NotePos => {
    const parent = node.current?.offsetParent as HTMLElement | null;
    if (!parent || !designW) return { x, y, rotate };
    const s = Math.min(1, parent.clientWidth / designW);
    return { x: Math.round(x * s), y, rotate };
  }, [x, y, rotate, designW]);
  const fromStorage = useRef(false);

  // Apply the stored (or default) position — clamped to the board —
  // AFTER mount so server and first client paint are identical (SSR rule:
  // this is a style-only change, no text mismatch). All storage access is
  // try/catch-guarded.
  useEffect(() => {
    let next: NotePos | null = null;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const v: unknown = JSON.parse(raw);
        if (typeof v === "object" && v !== null) {
          const r = v as Record<string, unknown>;
          if (
            typeof r.x === "number" &&
            typeof r.y === "number" &&
            typeof r.rotate === "number"
          ) {
            next = { x: r.x, y: r.y, rotate: r.rotate };
          }
        }
      }
    } catch {
      // Storage unavailable (private mode, blocked) — keep defaults.
    }
    fromStorage.current = next !== null;
    setPos(clamp(next ?? scaledDefault()));
  }, [key, clamp, scaledDefault]);

  // Re-fit when the fluid board resizes under the note: un-dragged notes
  // rescale from their design defaults; dragged/stored ones only clamp.
  useEffect(() => {
    const onResize = () =>
      setPos((p) => clamp(fromStorage.current ? p : scaledDefault()));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clamp, scaledDefault]);

  const persist = useCallback(
    (p: NotePos) => {
      fromStorage.current = true; // user-placed from here on; never rescale
      try {
        window.localStorage.setItem(key, JSON.stringify(p));
      } catch {
        // Storage unavailable — the note simply won't remember its spot.
      }
    },
    [key]
  );

  useEffect(() => {
    if (!drag) return;
    const move = (e: PointerEvent) => {
      // Position the note relative to its OWN offsetParent (the cork
      // board), not the outer pointer container — otherwise the note jumps
      // off-screen on first drag (trap 4's origin). Divide by the parent's
      // effective scale for the artboard transform (trap 2).
      const parent = node.current?.offsetParent as HTMLElement | null;
      const el = parent ?? containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const sx = parent ? r.width / parent.offsetWidth || 1 : 1;
      const sy = parent ? r.height / parent.offsetHeight || 1 : 1;
      setPos((p) => ({
        ...p,
        x: (e.clientX - r.left) / sx - off.current.x,
        y: (e.clientY - r.top) / sy - off.current.y,
      }));
    };
    const up = () => {
      setDrag(false);
      setHot(null);
      sfx.drop();
      setPos((p) => {
        const c = clamp(p);
        persist(c);
        return c;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [drag, containerRef, clamp, persist, setHot, sfx]);

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const el = node.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const parent = el.offsetParent as HTMLElement | null;
    const sx = parent
      ? parent.getBoundingClientRect().width / parent.offsetWidth || 1
      : 1;
    const sy = parent
      ? parent.getBoundingClientRect().height / parent.offsetHeight || 1
      : 1;
    off.current = { x: (e.clientX - r.left) / sx, y: (e.clientY - r.top) / sy };
    setDrag(true);
    setHot("drag");
    sfx.grab();
  };

  // ── Keyboard alternative (a11y — not in the prototype, in scope) ──
  const dropLifted = useCallback(() => {
    setLifted(false);
    sfx.drop();
    setPos((p) => {
      const c = clamp(p);
      persist(c);
      return c;
    });
  }, [clamp, persist, sfx]);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (lifted) {
        dropLifted();
      } else {
        setLifted(true);
        sfx.grab();
      }
      return;
    }
    if (!lifted) return;
    if (e.key === "Escape") {
      e.preventDefault();
      dropLifted();
      return;
    }
    const step = e.shiftKey ? 32 : 8;
    const move: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const d = move[e.key];
    if (d) {
      e.preventDefault();
      setPos((p) => clamp({ ...p, x: p.x + d[0], y: p.y + d[1] }));
    }
  };

  const active = drag || lifted;
  // Accessible name comes from the note's visible content (WCAG 2.5.3 —
  // voice control users speak what they see); the drag instructions live
  // in a hidden aria-describedby span instead of an aria-label. The span
  // is aria-hidden so it stays OUT of the name-from-contents computation,
  // yet still resolves as the description (directly-referenced nodes are
  // always traversed per the AccName spec).
  const hintId = `sticky-hint-${id}`;

  return (
    <div
      ref={node}
      data-sticky-id={id}
      role='button'
      tabIndex={0}
      aria-pressed={lifted}
      aria-describedby={hintId}
      onPointerDown={onDown}
      onPointerEnter={() => setHot("drag")}
      onPointerLeave={() => {
        if (!drag) setHot(null);
      }}
      onKeyDown={onKeyDown}
      onBlur={() => {
        if (lifted) dropLifted();
      }}
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: w,
        minHeight: h,
        background: color,
        padding: "18px 18px 22px",
        fontFamily: fonts.hand,
        fontWeight: 400,
        fontSize: 24,
        color: ink,
        boxShadow: active ? shadows.stickyDrag : shadows.sticky,
        transform: `rotate(${active ? pos.rotate * 0.4 : pos.rotate}deg) scale(${active ? 1.05 : 1})`,
        transition: active
          ? "box-shadow .15s, transform .15s"
          : "box-shadow .25s, transform .25s",
        cursor: drag ? "grabbing" : "grab",
        zIndex: active ? 50 : 5,
        userSelect: "none",
        touchAction: "none",
        lineHeight: 1.15,
        ...style,
      }}
    >
      {children}
      <span id={hintId} aria-hidden='true' style={{ display: "none" }}>
        Draggable sticky note. Press Enter to pick it up, move it with the arrow
        keys (hold Shift for bigger steps), then press Enter or Escape to put it
        down.
      </span>
      <div
        aria-hidden='true'
        style={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translateX(-50%) rotate(-3deg)",
          width: 60,
          height: 18,
          background: `color-mix(in srgb, ${cream} 70%, transparent)`,
          borderTop: `1px solid color-mix(in srgb, ${ink} 20%, transparent)`,
          borderBottom: `1px solid color-mix(in srgb, ${ink} 20%, transparent)`,
        }}
      />
    </div>
  );
}
