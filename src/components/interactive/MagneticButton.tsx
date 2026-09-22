/*
 * P2 — Magnetic button. Pulls toward the cursor with a framer-motion spring
 * (stiffness 300, damping 22), wobbles from horizontal pull, squishes on
 * press while the hard shadow collapses 6px→2px. Port of micro.jsx 171–246;
 * spec README §Magnetic Buttons.
 *
 * Trap 3 (magnetic drift): the measured rect already contains the applied
 * translation, so the springs' current output is subtracted to recover the
 * button's HOME position — without this the magnet drifts indefinitely.
 *
 * Fallback (prefs.magnetic off, reduced motion, or coarse pointer): plain
 * button with a tap/press scale only — no magnet, no wobble, no hover scale.
 *
 * SSR-safe: rect/pointer math runs only in the magnet effect; first-paint
 * markup is the untranslated button on server and client alike.
 */
import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Transition,
} from "framer-motion";
import { usePointer } from "../pointer/PointerProvider";
import { usePrefs } from "../../lib/prefs";
import { cream, cyan, ink, red, fonts, shadows } from "../../tokens";

export type MagneticButtonKind = "primary" | "danger" | "cyan" | "ghost";

export interface MagneticButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  // These React DOM handler types collide with framer-motion's own
  // gesture/animation props on motion.button; none are used by the design.
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
> {
  kind?: MagneticButtonKind;
  strength?: number;
  wobble?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}

const SPRING = { stiffness: 300, damping: 22 } as const;

const PALETTE: Record<
  MagneticButtonKind,
  { bg: string; fg: string; border: string }
> = {
  primary: { bg: ink, fg: cream, border: ink },
  danger: { bg: red, fg: cream, border: ink },
  cyan: { bg: cyan, fg: cream, border: ink },
  ghost: { bg: cream, fg: ink, border: ink },
};

export default function MagneticButton({
  kind = "primary",
  strength = 0.35,
  wobble = true,
  style,
  children,
  onClick,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  ...rest
}: MagneticButtonProps) {
  const { p, setHot, sfx, containerRef } = usePointer();
  const prefs = usePrefs();
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);

  // Minimal mode kills the magnet (and the wobble/hover scale with it).
  const magnetOn =
    prefs.magnetic &&
    !prefs.reducedMotion &&
    !prefs.coarsePointer &&
    !prefs.minimal;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);
  // Wobble: ±deg from horizontal pull (dx * 0.03, so the half-dimension cap
  // keeps it within ~±3deg). Driven by the spring so it settles with x.
  const rotate = useTransform(sx, (v) => (wobble && magnetOn ? v * 0.03 : 0));

  useEffect(() => {
    if (!magnetOn || !hover) {
      mx.set(0);
      my.set(0);
      return;
    }
    const el = ref.current;
    const cont = containerRef.current;
    if (!el || !cont) return;
    const r = el.getBoundingClientRect();
    const cr = cont.getBoundingClientRect();
    const s = cr.width / cont.offsetWidth || 1;
    // Button center in PointerProvider container coords. Subtract the
    // currently applied translation (spring output) so we always measure the
    // button's HOME position, not its translated position (trap 3).
    const cx = (r.left - cr.left) / s + r.width / s / 2 - sx.get();
    const cy = (r.top - cr.top) / s + r.height / s / 2 - sy.get();
    const rawDx = (p.x - cx) * strength;
    const rawDy = (p.y - cy) * strength;
    // Cap pull at half the button's shortest dimension so the click target
    // can never drift far enough to lose the press.
    const maxPull = (Math.min(r.width, r.height) / s) * 0.5;
    const mag = Math.hypot(rawDx, rawDy);
    const k = mag > maxPull ? maxPull / mag : 1;
    mx.set(rawDx * k);
    my.set(rawDy * k);
  }, [p.x, p.y, hover, magnetOn, strength, containerRef, mx, my, sx, sy]);

  const palette = PALETTE[kind];
  const scaleTarget = press ? 0.94 : hover && magnetOn ? 1.03 : 1;
  // While hovered: 80ms ease-out (deliberately non-overshoot — overshoot
  // beziers jitter on rapid pointer moves). On leave: overshoot snap-back.
  const scaleTransition: Transition = prefs.reducedMotion
    ? { duration: 0 }
    : hover
      ? { duration: 0.08, ease: "easeOut" }
      : { duration: 0.35, ease: [0.2, 1.6, 0.3, 1] };

  return (
    <motion.button
      ref={ref}
      {...rest}
      onClick={(e) => {
        sfx.click();
        onClick?.(e);
      }}
      onPointerEnter={(e) => {
        setHover(true);
        setHot("link");
        sfx.hover();
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        setHover(false);
        setHot(null);
        setPress(false);
        onPointerLeave?.(e);
      }}
      onPointerDown={(e) => {
        setPress(true);
        onPointerDown?.(e);
      }}
      onPointerUp={(e) => {
        setPress(false);
        onPointerUp?.(e);
      }}
      onPointerCancel={(e) => {
        setPress(false);
        onPointerCancel?.(e);
      }}
      initial={false}
      animate={{ scale: scaleTarget }}
      transition={scaleTransition}
      style={{
        x: sx,
        y: sy,
        rotate,
        background: palette.bg,
        color: palette.fg,
        border: `3px solid ${palette.border}`,
        boxShadow: press ? shadows.pressed : shadows.card,
        padding: "14px 22px",
        fontFamily: fonts.body,
        fontWeight: 700,
        fontSize: 16,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        borderRadius: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        // OS-cursor hiding is owned globally by PointerProvider
        // (data-cursor-hidden, !important); "pointer" is the fallback shown
        // whenever the custom cursor is off.
        cursor: "pointer",
        ...style,
        // Minimal mode: one quiet mono button face, whatever kind/style the
        // caller asked for — layered AFTER {...style} so per-call fancy
        // overrides (colors, sizes) can't leak through. Ink border on
        // purpose (affordance), NOT the hairline token.
        ...(prefs.minimal
          ? {
              background: cream,
              color: ink,
              border: `1px solid ${ink}`,
              boxShadow: "none",
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "lowercase" as const,
              padding: "8px 14px",
            }
          : null),
      }}
    >
      {children}
    </motion.button>
  );
}
