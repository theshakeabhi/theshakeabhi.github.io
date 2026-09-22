/*
 * P0 foundation — typed re-exports of the design tokens defined in
 * src/styles/global.css (@theme). Everything is exported as a `var()`
 * string so components never carry literal hex / font / shadow values.
 *
 * These two files are the ONLY places tokens may be defined or spelled out.
 */

/* ── Colors ─────────────────────────────────────────────────── */
export const cream = "var(--color-cream)";
export const ink = "var(--color-ink)";
export const inkDeep = "var(--color-ink-deep)";
export const red = "var(--color-red)";
export const cyan = "var(--color-cyan)";
export const yellow = "var(--color-yellow)";
export const success = "var(--color-success)";
export const creamWarm = "var(--color-cream-warm)";
export const cork = "var(--color-cork)";
export const slate = "var(--color-slate)";
export const slateMid = "var(--color-slate-mid)";
export const slateLight = "var(--color-slate-light)";
/** 1px-rule color in minimal mode (border tokens resolve to it there). */
export const hairline = "var(--color-hairline)";
/** The ONE deliberate red that survives minimal mode: MinimalToggle knob
 *  when on, link hover underline, status markers. Same value in both
 *  modes — spend it sparingly. */
export const accent = "var(--color-accent)";

/** Sticky-note palette (Now section). */
export const sticky = {
  yellow: "var(--color-sticky-yellow)",
  mint: "var(--color-sticky-mint)",
  red: "var(--color-sticky-red)",
  sky: "var(--color-sticky-sky)",
  lavender: "var(--color-sticky-lavender)",
  orange: "var(--color-sticky-orange)",
} as const;

/** Confetti palette (rave-mode easter egg), in README order. */
export const confetti = [
  "var(--color-confetti-1)",
  "var(--color-confetti-2)",
  "var(--color-confetti-3)",
  "var(--color-confetti-4)",
  "var(--color-confetti-5)",
  "var(--color-confetti-6)",
] as const;

/* ── Fonts ──────────────────────────────────────────────────── */
export const fonts = {
  display: "var(--font-display)",
  body: "var(--font-body)",
  mono: "var(--font-mono)",
  hand: "var(--font-hand)",
} as const;

/* ── Shadows (all hard, zero blur — trap 7) ─────────────────── */
export const shadows = {
  card: "var(--shadow-card)",
  pressed: "var(--shadow-pressed)",
  lifted: "var(--shadow-lifted)",
  cardHover: "var(--shadow-card-hover)",
  slab: "var(--shadow-slab)",
  sticky: "var(--shadow-sticky)",
  stickyDrag: "var(--shadow-sticky-drag)",
} as const;

/* ── Borders — README §Borders ──────────────────────────────────────
   Mode-aware: the values live in a plain :root block in global.css
   (NOT @theme — Tailwind 4 tree-shakes unreferenced @theme vars) and
   collapse to 1px hairlines under html[data-minimal]. */
export const borders = {
  /** Default border: 3px ink (full-fat) / 1px hairline (minimal). */
  default: "var(--border-default)",
  /** Thick border: 4px ink (full-fat) / 1px hairline (minimal). */
  thick: "var(--border-thick)",
} as const;

/* ── Fluid type scale ───────────────────────────────────────── */
export const text = {
  mega: "var(--text-mega)",
  section: "var(--text-section)",
  sub: "var(--text-sub)",
  project: "var(--text-project)",
  cardTitle: "var(--text-card-title)",
  lead: "var(--text-lead)",
  body: "var(--text-body)",
  small: "var(--text-small)",
  stat: "var(--text-stat)",
  contact: "var(--text-contact)",
} as const;

/* ── Spacing ────────────────────────────────────────────────── */
export const spacing = {
  slabX: "var(--spacing-slab-x)",
  slabY: "var(--spacing-slab-y)",
  slabTopDeep: "var(--spacing-slab-top-deep)",
} as const;
