// P3 — draggable sticky note (README §Draggable Sticky Notes, micro.jsx
// 313–390). Drag from anywhere; while dragging: scale 1.05, rotation ×0.4
// (trap 6), z-index 50, sfx grab/drop. Drag math is relative to the note's
// OWN offsetParent (the cork board) with effective-scale division (trap 2).
// Position persists to localStorage `sticky_v2_<id>` on drop — the v2_
// prefix is intentional, never migrate old data (trap 4). SSR-safe: first
// paint renders at the given x/y; the stored position applies in an effect.
// Keyboard alternative: Tab to focus, Enter picks up, arrows move (8px,
// 32px with Shift), Esc or Enter drops (persists the same way).
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
}: StickyNoteProps) {
  const { setHot, sfx, containerRef } = usePointer();
  const key = `sticky_v2_${id}`;
  const [pos, setPos] = useState<NotePos>({ x, y, rotate });
  const [drag, setDrag] = useState(false); // pointer drag
  const [lifted, setLifted] = useState(false); // keyboard pick-up
  const off = useRef({ x: 0, y: 0 });
  const node = useRef<HTMLDivElement>(null);

  // Apply any stored position AFTER mount so server and first client paint
  // are identical (SSR rule). All storage access is try/catch-guarded.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return;
      const v: unknown = JSON.parse(raw);
      if (typeof v !== "object" || v === null) return;
      const r = v as Record<string, unknown>;
      if (
        typeof r.x === "number" &&
        typeof r.y === "number" &&
        typeof r.rotate === "number"
      ) {
        setPos({ x: r.x, y: r.y, rotate: r.rotate });
      }
    } catch {
      // Storage unavailable (private mode, blocked) — keep defaults.
    }
  }, [key]);

  const persist = useCallback(
    (p: NotePos) => {
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
        persist(p);
        return p;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [drag, containerRef, persist, setHot, sfx]);

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
      persist(p);
      return p;
    });
  }, [persist, sfx]);

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
      setPos((p) => ({ ...p, x: p.x + d[0], y: p.y + d[1] }));
    }
  };

  const active = drag || lifted;

  return (
    <div
      ref={node}
      data-sticky-id={id}
      role='button'
      tabIndex={0}
      aria-pressed={lifted}
      aria-label='Draggable sticky note. Press Enter to pick it up, move it with the arrow keys (hold Shift for bigger steps), then press Enter or Escape to put it down.'
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
