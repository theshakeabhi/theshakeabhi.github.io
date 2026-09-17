# AGENTS.md — theshakeabhi.github.io (brutalist portfolio port)

Read this before touching anything. The visual spec lives in the design
handoff bundle (`../README.md` of the handoff — tokens, per-section layout,
interaction detail, a11y); this file is the repo's operating manual.

## Architecture

- **Astro 7 + a single React island.** `src/pages/index.astro` renders the
  `<head>` (SEO, GA, font preload) and mounts ONE island:
  `<Portfolio client:load />` from `src/portfolio/Portfolio.tsx`.
- **The island is pre-rendered at build time.** That means every component
  it reaches runs on the server during `astro build`. SSR-safety rules:
  - **No top-level `window` / `document` / `localStorage` / `matchMedia` /
    `AudioContext`** in any module the island imports. Browser APIs only
    inside `useEffect` (or event handlers).
  - **Identical first-paint markup on server and client.** Initial React
    state must be deterministic defaults; sync to storage/media queries in
    an effect after mount (see `src/lib/prefs.tsx`, `src/lib/useMediaQuery.ts`
    for the pattern). Hydration mismatches are build-breaking bugs here.
- Styling: Tailwind 4 via `@tailwindcss/vite` (CSS-config, no tailwind.config
  file). Components may use Tailwind utilities or inline styles with `var()`
  token strings from `src/tokens.ts`.
- Deploy: GitHub Pages via `.github/workflows/deploy.yml` — the official
  Astro action flow (`withastro/action@v6` build → `actions/deploy-pages@v5`)
  on pushes to `master` (this repo's default branch). The action auto-detects
  yarn from the committed `yarn.lock`; no `base` config needed (user-site
  repo, served at root). **One-time manual step after merge**: the repo's
  Settings → Pages → Source must be switched to "GitHub Actions".

## Tokens — ONE source of truth

- `src/styles/global.css` holds the Tailwind 4 `@theme` block: **the only
  place tokens are defined.** `src/tokens.ts` re-exports them as typed
  `var()` strings for inline styles.
- **No literal hex colors, font-family names, or shadow strings anywhere
  else in the repo.** If you are typing `#1e293b` or `"Archivo Black"` in a
  component, you are in the wrong file — import from `src/tokens.ts`.
- Semi-transparent token tints use
  `color-mix(in srgb, var(--color-x) N%, transparent)` (see `Tape.tsx`).
- Every shadow is hard: `Npx Npx 0 <color>` — zero blur (trap 7). The single
  sanctioned exception is the washi-tape soft shadow ported verbatim from
  the prototype (`Tape.tsx`).

### Defined @theme token names

- **Colors**: `--color-cream`, `--color-ink`, `--color-red`, `--color-cyan`,
  `--color-yellow`, `--color-success`, `--color-cream-warm` (#fef7ed),
  `--color-cork` (#f5ead0), `--color-sticky-{yellow,mint,red,sky,lavender,orange}`,
  `--color-confetti-{1..6}`, `--color-slate`, `--color-slate-mid`,
  `--color-slate-light`.
- **Fonts**: `--font-display` (Archivo Black), `--font-body` (Space Grotesk),
  `--font-mono` (JetBrains Mono), `--font-hand` (Caveat).
- **Shadows**: `--shadow-card` (6px), `--shadow-pressed` (2px),
  `--shadow-lifted` (8px), `--shadow-card-hover` (12px), `--shadow-slab`
  (14px), `--shadow-sticky`, `--shadow-sticky-drag`.
- **Fluid type** (min, px/1440·100vw, design px — exact at 1440):
  `--text-mega` (220), `--text-section` (110), `--text-sub` (96),
  `--text-project` (80), `--text-card-title` (32), `--text-lead` (26),
  `--text-body` (22), `--text-small` (18), `--text-stat` (38),
  `--text-contact` (200, Contact headline). Each has `--text-*--line-height`
  and (where applicable) `--text-*--letter-spacing` companions, so Tailwind
  `text-mega` etc. also work.
- **Spacing**: `--spacing-slab-x` = clamp(20px, 5.5vw, 80px),
  `--spacing-slab-y` = 90px, `--spacing-slab-top-deep` = 110px.
- Keyframes available globally: `marq`, `marqV`, `spin`, `pulse`, `fall`,
  `jitter`.

## Frozen contracts (AGENT_TEAM_HANDOFF §2 — do not change)

Keep these signatures identical across the port; sections are written
against them. Changing a prop name is a coordination event: post it in
`HANDOFF_NOTES.md` and stop until the lead ack's it.

```ts
usePointer(): {
  p: { x: number; y: number; inside: boolean; down: boolean; hot: 'link'|'drag'|null };
  setHot(h: 'link'|'drag'|null): void;
  sfx: Sfx;
  containerRef: React.RefObject<HTMLElement>;
}

<PointerProvider sfx>                                     // wraps the whole page
<Hover as="span" kind="link"|"drag" {...rest}>
<MagneticButton kind="primary"|"danger"|"cyan"|"ghost" strength={0.35} wobble onClick>
<Eyes size={60} gap={14} blink />
<StickyNote id w={200} h={200} x y rotate color />        // localStorage: sticky_v2_<id>
<Tilt max={8} scale={1.02} />
<Scramble text trigger speed={40} />  <ScrambleHover text />
<Marquee speed={60} dir={1|-1} />     <SideRibbon items speed={40} color fg />
<ScrollProgress targetRef? />
<Tape x y w={90} rotate color />      <RubberStamp text color rotate size />
<Scribble w h color strokeWidth />    <Arrow from={[x,y]} to={[x,y]} color width label />
<Slab bg label style />               <Stamp color rotate />
<Star size color rotate />            <Burst size color rotate points={12} />
<Squiggle w color />                  <PlaceholderImg w h label tone="dark"|"mid"|"light" />

Sfx: { hover(); click(); pop(); grab(); drop(); yay(); setMuted(b: boolean) }
```

And the preferences contract (P0-owned, `src/lib/prefs.tsx`):

```ts
usePrefs(): {
  sfx: boolean;          // user pref — defaults OFF when reducedMotion && no stored pref
  cursor: boolean;       // user pref — custom cursor on/off
  magnetic: boolean;     // user pref — magnetic buttons on/off
  reducedMotion: boolean; // media-derived: (prefers-reduced-motion: reduce)
  coarsePointer: boolean; // media-derived: (pointer: coarse)
  setPref(k: 'sfx'|'cursor'|'magnetic', v: boolean): void; // persists to localStorage "portfolio.tweaks"
}
```

## File ownership (never edit a file you don't own)

| Pkg | Owns                                                                                                                                                                                                                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0  | Foundation: package.json, configs, `src/styles/global.css`, `src/tokens.ts`, `src/lib/prefs.tsx`, `src/lib/useMediaQuery.ts`, `src/components/primitives/*`, all stubs until their owner lands                            |
| P1  | Pointer: `src/components/pointer/*` (PointerProvider, CustomCursor, CursorTrail, Hover)                                                                                                                                   |
| P2  | Magnetic + tilt: `src/components/interactive/MagneticButton.tsx`, `Tilt.tsx`                                                                                                                                              |
| P3  | Eyes/sticky/stamps: `src/components/interactive/Eyes.tsx`, `StickyNote.tsx`, `Tape.tsx`, `RubberStamp.tsx`, `Scribble.tsx`, `Arrow.tsx`                                                                                   |
| P4  | Text/marquee/chrome/sfx: `src/components/text/*` (Scramble, ScrambleHover, Marquee), `src/components/chrome/SideRibbon.tsx`, `ScrollProgress.tsx`, `src/lib/sfx.ts`                                                       |
| P5  | Sections: `src/sections/Hero.tsx`, `About.tsx`, `Skills.tsx`, `Work.tsx`                                                                                                                                                  |
| P6  | Sections: `src/sections/NowBoard.tsx`, `Writing.tsx`, `Playground.tsx`, `Testimonials.tsx`, `Resume.tsx`, `Contact.tsx` + `src/components/chrome/RaveOverlay.tsx` + `useLocalTime`/`useEasterEgg` hooks + `src/content/*` |
| P7  | PreferencesMenu + `src/portfolio/Portfolio.tsx` integration (rave/Konami/logo wiring, sfx mute wiring, reduced-motion audit)                                                                                              |
| P8  | Launch pages: privacy/terms/404, CookieConsent, `public/robots.txt`, `public/og.png`, favicons, `src/pages/index.astro` head                                                                                              |

Stubs are marked `// STUB(P<n>): …` — replace ONLY the ones tagged with
your package number. Only P0 touches `package.json` / lockfile.

## Responsive breakpoints

The design is 1440px-native and re-flows (no viewport-scale hack):

- **≥1440px**: exact design sizes (fluid type caps at spec).
- **<1024px (lg)**: two-column sections stack to a single column.
- **<768px (md)**: cork board becomes a vertical list of notes;
  SectionDividers render a static centered tag row (no marquee);
  SideRibbon is not rendered.
- **pointer: coarse**: no custom cursor, no cursor trail, no eye tracking,
  no magnetic pull (tap-scale instead). Sticky-note drag still works
  (pointer events). Use `usePrefs().coarsePointer`.
- `prefers-reduced-motion: reduce`: global CSS jumps every animation to its
  final frame (marquees freeze, confetti never falls); JS-driven motion must
  check `usePrefs().reducedMotion` too.

## Known traps (AGENT_TEAM_HANDOFF §3 — each cost real debugging time)

1. **`position: fixed` inside a transform.** `ScrollProgress`, `SideRibbon`,
   and the rave banner must mount outside any CSS-transformed ancestor — a
   transform creates a containing block and pins them to the stage instead
   of the viewport.
2. **Scaled artboard breaks pointer math.** If the stage is scaled, compute
   `scale = getBoundingClientRect().width / offsetWidth` and divide pointer
   offsets by it, or the custom cursor and eye tracking drift from the real
   cursor.
3. **Magnetic drift.** The magnet reads a rect that already contains the
   applied translation; subtract current `t.x`/`t.y` to recover the home
   position, or the button walks off the page.
4. **Sticky-note storage keys.** The `sticky_v2_` prefix exists because v1
   coords were computed against the wrong container. Do not drop the prefix;
   do not migrate old data.
5. **AudioContext autoplay policy.** Create/resume it inside a user gesture
   only.
6. **Rotation during drag.** Scale a note's rotation to `0.4×` while
   dragging or it feels like it's fighting the cursor.
7. **No soft shadows anywhere.** Every shadow is `Npx Npx 0 <color>` — zero
   blur. One blurred shadow and the whole aesthetic reads as generic.

## Protocols

- **`HANDOFF_NOTES.md`** — append-only. One bullet per cross-package
  request (`- [P<n> → P<m>] …`). Never edit or delete existing notes.
- **`agent-log.md`** — append-only audit log. Every agent appends
  `## P<n> · <ISO timestamp>` with files touched, decisions/deviations,
  and self-check results when it finishes.
- **No git writes by agents** — no `git add`/`commit`/`push`; the lead
  commits.
- **Only P0 touches `package.json`** (and the lockfile). Need a dependency?
  Write it in `HANDOFF_NOTES.md`.
- Ship with the page still building: land stubs, not broken sections.

## Commands

```sh
npx -y yarn@1 install    # yarn is not on PATH; always invoke via npx
npx -y yarn@1 dev        # astro dev
npx -y yarn@1 build      # astro check && astro build → dist/
npx -y yarn@1 preview    # serve dist/
npx -y yarn@1 lint       # eslint . --fix (prettier enforced via plugin)
npx astro check          # typecheck only
npx eslint .             # lint without --fix
```

Definition of done per package: renders at 1440px matching the prototype,
zero build/lint errors, no console errors/warnings, `prefers-reduced-motion`
path implemented, a11y notes for owned surfaces satisfied.
