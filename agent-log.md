# agent-log — append-only audit log

Every agent appends `## P<n> · <ISO timestamp>` when it finishes: files
created/deleted, decisions/deviations with reasons, self-check summary,
notes for other packages. Never edit an existing entry.

## P0 · 2026-09-17T14:47:00Z

**Migration: Vite → Astro 7.3 (single React island), Tailwind 3 → 4 (CSS-config).**

### Created

- `astro.config.mjs` (site theshakeabhi.github.io, react() + sitemap(), @tailwindcss/vite — shape verified against installed astro 7.3.3 types), `tsconfig.json` (extends astro/tsconfigs/strict + jsx react-jsx + noUnusedLocals/Parameters), rewritten `eslint.config.js` (react-refresh dropped, `defineConfig` from eslint/config, ignores dist/.astro), `.gitignore` (+.astro/), `.github/workflows/deploy.yml` (checkout@v4, setup-node@v4 node 22.12.0, yarn install/build, publish_dir ./dist unchanged).
- `src/pages/index.astro` — lang en, title "Abhishek Chandrasenan — Senior Frontend Engineer", description, canonical, OG/Twitter (og:image /og.png → P8), sitemap link, standard async gtag.js for G-X8L7GJY3D8 (legacy analytics.js snippet dropped), Archivo Black woff2 preload via `?url` import (resolves to hashed /_astro/… path — works), mounts `<Portfolio client:load />`.
- `src/styles/global.css` — @theme with every README token (colors incl. warm cream/cork/6 sticky/6 confetti, 4 font stacks, 7 hard shadows, fluid type scale, slab spacing), fontsource imports (Archivo Black 400; Space Grotesk 400/500/600/700; JetBrains Mono 400/600/700/800; Caveat 400/600/700), keyframes marq/marqV/spin/pulse/fall/jitter from Portfolio.html, ::selection, range-input styles, body defaults, reduced-motion kill block.
- `src/tokens.ts` — typed var() re-exports (colors, sticky, confetti, fonts, shadows, borders, text, spacing).
- `src/lib/prefs.tsx` (PrefsProvider/usePrefs, SSR-safe, localStorage "portfolio.tweaks" try/catch, matchMedia listeners, sfx defaults OFF under reduced motion with no stored pref), `src/lib/useMediaQuery.ts`, `src/lib/sfx.ts` (STUB(P4) noop Sfx).
- Primitives (full ports): `src/components/primitives/` Slab, Stamp, Squiggle, Star, Burst, PlaceholderImg (role=img aria-label), SectionDivider (static centered row <768px).
- Full ports of the simple visual four: `src/components/interactive/` Tape, RubberStamp, Scribble, Arrow.
- Stubs with frozen signatures: pointer/ PointerProvider (working ctx, inert p, real containerRef) + CustomCursor + CursorTrail + Hover; interactive/ MagneticButton (final kind styles) + Tilt + Eyes (static) + StickyNote (static); text/ Scramble + ScrambleHover + Marquee (FULL port, reduced-motion pause); chrome/ SideRibbon + ScrollProgress + RaveOverlay (null).
- 10 section stubs in `src/sections/` with real h1/h2 copy + correct slab bg/label/id; `src/content/writing.ts` + `testimonials.ts` typed empty arrays; `src/portfolio/Portfolio.tsx` composing PrefsProvider > chrome > PointerProvider(sfx) > sections + dividers (items/colors/dirs verbatim from app.jsx).
- `AGENTS.md` (architecture, SSR rules, token list, frozen contracts + usePrefs, ownership P0–P8, breakpoints, 7 traps verbatim, protocols, commands), `HANDOFF_NOTES.md`.

### Deleted

index.html, vite.config.ts, postcss.config.js, tailwind.config.js, tsconfig.app.json, tsconfig.node.json, src/main.tsx, src/vite-env.d.ts, src/App.tsx, src/index.css, src/components/{Main,Footer,Link}.tsx, src/assets/react.svg, public/vite.svg. Kept public/google5072c66c57a995ee.html.

### Decisions / deviations

- **prettier bumped ^3.3.3 → ^3.9.7**: prettier-plugin-tailwindcss 0.8.1 (the Tailwind-4-compatible line) crashes ESLint (`e.charAt is not a function`) with the lock-pinned prettier 3.3.3.
- **yarn.lock regenerated from scratch**: the stale Vite-era lock caused broken resolutions after the dependency swap.
- **`@emnapi/runtime` added to devDependencies**: it is only a _peerDependency_ of `@napi-rs/wasm-runtime` (used by @astrojs/check's language tooling) and yarn 1 never auto-installs peers, so `astro check` silently skipped typechecking (interactive install prompt, exit 0). With the dep added, check runs for real. Remove if the repo ever moves off yarn 1.
- **typescript kept at ^5.5.3** (resolves 5.9.x): npm latest is TS 7.0, which typescript-eslint 8 / @astrojs/check aren't built against.
- **Fluid type mins**: lead-specified anchors kept verbatim (mega 72px, section 56px); remaining mins hand-picked (sub 48, project 40, card-title 24, lead 20, body 18, small 16, stat 28) — big headlines ~50% floors, body sizes floored near 16px for readability. Preferred values = px/1440·100vw so 1440 renders exactly at spec.
- **Extra tokens beyond README tables**: `--text-contact` (200px Contact headline, for P6), `--color-slate{,-mid,-light}` (prototype's placeholder stripes + range track — keeps PlaceholderImg/global.css hex-free elsewhere). Token _names_ listed in AGENTS.md.
- **Tape's soft shadow ported verbatim** (`0 2px 6px` ink@15%) — the prototype's one deliberate soft shadow; noted as the sanctioned exception to trap 7. Alpha tints use `color-mix(in srgb, var(--color-x) N%, transparent)` instead of literal rgba-of-hex.
- **Reduced-motion**: global CSS jumps all animations to final frame (marquees freeze legibly thanks to tripled content, confetti lands off-screen); Marquee additionally checks `usePrefs().reducedMotion`.
- **SectionDivider static row** uses 16px type (mobile size unspecified in the prototype).
- **Rave/Konami/logo-click wiring intentionally absent** (P6/P7); RaveOverlay mounted `on={false}`.
- GA: only gtag.js kept, per instruction; old dual analytics.js snippet dropped.

### Self-check

- `npx -y yarn@1 build` (astro check && astro build): **0 errors, 0 warnings, 0 hints (46 files)**; 1 page built; sitemap-index.xml emitted.
- `npx -y yarn@1 lint`: clean (prettier formatting applied via --fix).
- dist/index.html: 1×h1 + 9×h2 pre-rendered with real copy (ABHISHEK…, ABOUT.TXT, STUFF I'M GOOD AT, THE WORK., NOW., THINGS I'VE WRITTEN., THE PLAYGROUND, WHAT PEOPLE SAY., THE CV., LET'S BUILD SOMETHING.); font preload resolves to hashed /_astro/archivo-black-latin-400-normal.*.woff2; gtag present.
- `grep -rE "#[0-9a-fA-F]{3,6}" src --include="*.tsx" --include="*.ts" -l` → **no matches at all** (not even tokens.ts).

### Notes for other packages

- Replace only files tagged with your `// STUB(P<n>)`. MagneticButton stub already carries final kind styling; keep it visually identical when adding motion.
- SSR rule is load-bearing: the island is build-rendered — browser APIs only in effects; identical first-paint markup (see prefs.tsx / useMediaQuery.ts patterns).
- P8: og.png is already referenced from index.astro head; favicons currently absent (no link tag).
- Prototype `Eyes` also accepts x/y/style placement props beyond the frozen contract; stub accepts size/gap/blink/style — P3 may extend with placement props without breaking the contract.

## P0 · 2026-09-17T15:05:00Z (addendum — deploy workflow change)

Per lead/user decision, `.github/workflows/deploy.yml` replaced entirely:
peaceiris/actions-gh-pages flow dropped in favor of the official Astro
Pages flow — `actions/checkout@v7` + `withastro/action@v6` (build job) →
`actions/deploy-pages@v5` (deploy job, github-pages environment), with
`workflow_dispatch` and the Pages permissions block. Latest majors verified
live (checkout v7.0.1, withastro/action v6.1.3, deploy-pages v5.0.1).
Trigger stays `master` (repo default branch). withastro/action auto-detects
yarn from the committed yarn.lock; no `base` needed (user-site repo, root).
`site` unchanged in astro.config.mjs. AGENTS.md deploy section updated.

**Manual step after merge (goes in PR body too): Settings → Pages → Source
→ "GitHub Actions".**

# P1 · Pointer system & cursor · 2026-09-17

## Files touched (owned by P1)

- `src/components/pointer/PointerProvider.tsx` — full port of micro.jsx 13–55.
  Container-relative pointer coords via pointermove on the container div,
  `pointerup` on window; effective-scale division per axis
  (`rect.width / offsetWidth`, trap 2); `hot: null|'link'|'drag'` with a
  no-op-on-same-value `setHot`; `down`/`inside`. Frozen `usePointer`
  contract kept byte-for-byte (`{ p, setHot, sfx, containerRef }`, throws
  outside the provider). Also owns the OS-cursor-hiding mechanism: a
  scoped `<style>` with `[data-cursor-hidden="true"], … * { cursor: none
!important }` and the attribute toggled on the container.
- `src/components/pointer/CustomCursor.tsx` — 32px lag ring (0.18 lerp per
  rAF frame) + exact 7px dot; morphs: 56px red ring filled with
  `color-mix(in srgb, red 12%, transparent)` on `link`, 44px cyan
  6px-radius square on `drag`, 4px dot on press; `.18s` transitions on
  width/height/border-radius/background/border-color; `mix-blend-mode:
multiply`; z 9999/10000. rAF loop starts in `useEffect`, cancels on
  cleanup, and is not started at all when disabled.
- `src/components/pointer/CursorTrail.tsx` — 4 chained dots, ease
  `0.22 − i·0.04` (successively slower), sizes `6 − i`, colors red / cyan /
  ink / ink, opacity `1 − i·0.18`, z `9998 − i`. Same rAF discipline.
- `src/components/pointer/Hover.tsx` — sets hot on enter, clears on leave,
  chains any `onPointerEnter`/`onPointerLeave` from rest props; plays
  `sfx.hover()` on enter of kind `'link'` (see deviations). Frozen
  `<Hover as kind {...rest}>` contract kept.

Also appended two bullets to `HANDOFF_NOTES.md` (cursor-hide mechanism for
P4/P7 fixed chrome; Hover sfx scope for P2/P3).

## Decisions / deviations

1. **Show-system-cursor path** (README a11y + P1 brief): when
   `usePrefs().cursor` is false, or `reducedMotion`, or `coarsePointer`,
   CustomCursor and CursorTrail render null and the container does NOT get
   `data-cursor-hidden`, so the OS cursor stays. P7 wires the preference
   UI; the mechanism (attribute + injected style) is here.
2. **Cursor hiding is gated on `mounted`** (a post-mount effect flag):
   first-paint markup is identical on server and client (no attribute),
   and — more importantly — the static HTML never hides the OS cursor
   before hydration, when the custom cursor cannot render yet. Hiding
   kicks in one effect-tick after mount.
3. **`sfx.hover()` only for `kind === 'link'`** — the prototype (micro.jsx 159) beeped on every Hover enter including `drag`; the P1 brief
   explicitly says "on enter of kind 'link'", so I followed the brief and
   noted it in HANDOFF_NOTES for P2/P3 (drag surfaces own grab/drop sfx).
4. **Container div style kept from the P0 stub** (`position: relative;
width: 100%`, no `height: 100%`): the prototype's provider wrapped a
   fixed-size artboard; in the page it wraps flowing content, where
   `height: 100%` is meaningless-to-harmful. Everything else (absolute
   z-indexed children) is unaffected.
5. Tokens only: `#dc2626`→`red`, `#0891b2`→`cyan`, `#1e293b`→`ink` from
   `src/tokens.ts`; `rgba(220,38,38,0.12)`→`color-mix(in srgb, red 12%,
transparent)` per the AGENTS.md sanctioned tint pattern. No shadows in
   these components (nothing to blur).
6. `aria-hidden='true'` + `pointer-events: none` on all cursor/trail
   decorations (decorative, never focusable, never intercept input).
7. Kept the per-pointermove React state update (context `p`) exactly as
   the prototype — the frozen contract makes `p` the shared data path for
   Eyes/Tilt/Magnetic, so no ref-only "optimization".

## Self-check

- `npx astro check` → 46 files, **0 errors, 0 warnings, 0 hints**.
- `npx -y yarn@1 lint` (eslint --fix + prettier plugin) → clean;
  `npx eslint src/components/pointer/` → 0 problems;
  `npx prettier --check src/components/pointer/*.tsx` → all clean.
- SSR audit: no top-level window/document/matchMedia; all listeners and
  rAF loops start in `useEffect` with cleanup; first client render output
  equals server output (cursor/trail render null while `p.inside` is
  false; hide-attribute absent until after mount).
- Note: `git status` shows concurrent in-progress edits from P3/P4 in the
  same working tree (sfx.ts, Scramble, Eyes, chrome). Untouched by me
  except any prettier `--fix` formatting from the mandated lint run.

## Notes for other packages

- P2/P3/P4: `usePointer()` is live from
  `src/components/pointer/PointerProvider.tsx` — exact frozen shape;
  `p.x/p.y` are container-relative and already scale-corrected.
- P4 (sfx): Hover calls `sfx.hover()` for link-kind enters only; mute
  behavior is expected to live inside the Sfx object (`setMuted`).
- P7: the "show system cursor" preference needs no extra wiring beyond
  `setPref('cursor', …)` — provider + cursor + trail all react to it.
- P4/P7: fixed chrome outside PointerProvider keeps the OS cursor; opt in
  with `data-cursor-hidden="true"` on your fixed root if desired.

# P2 · 2026-09-17 — Magnetic buttons & tilt

## Files touched

- `src/components/interactive/MagneticButton.tsx` — full port (replaced STUB(P2))
- `src/components/interactive/Tilt.tsx` — full port (replaced STUB(P2))
- `HANDOFF_NOTES.md` — one appended bullet (shell append)

## What landed

**MagneticButton** (micro.jsx 171–246, README §Magnetic Buttons):

- framer-motion `useMotionValue` + `useSpring({ stiffness: 300, damping: 22 })`
  drive x/y. Pull = `strength` (0.35) × cursor offset from the button's HOME
  center in PointerProvider container coords, with effective-scale division
  (trap 2), capped at half the shortest dimension.
- Trap 3 honored: the measured rect contains the applied translation, so the
  springs' current output (`sx.get()`/`sy.get()`) is subtracted to recover the
  home position.
- Wobble: `rotate = sx × 0.03` via `useTransform` (the half-dimension cap keeps
  it within the ±3deg spec); disabled with `wobble={false}`.
- Scale via `animate`: hover 1.03, press 0.94; hovered transition 80ms
  ease-out, leave snap `.35s cubic-bezier(.2,1.6,.3,1)`; shadow collapses
  `var(--shadow-card)` → `var(--shadow-pressed)` instantly on press (prototype
  transitions transform only). `sfx.click()` on click, `sfx.hover()` +
  `setHot("link")` on enter.
- Kind palette, 3px ink border, 0 radius, uppercase 700 0.02em 16px body font —
  kept verbatim from the P0 stub (all tokens, no literals).
- Fallback (`!prefs.magnetic || reducedMotion || coarsePointer`): plain button,
  tap/press scale only — no magnet, no wobble, no hover scale; press scale is
  instant (`duration: 0`) under reducedMotion.

**Tilt** (micro.jsx 482–519, README §Card Tilt): `perspective(900px)`
rotateX/rotateY from cursor vs own center in container coords (usePointer),
`max` default 8, `scale` default 1.02; hovered `.12s linear`, leave
`.4s cubic-bezier(.2,1.5,.3,1)`; fully inert (rest pose, `transition: none`)
under reducedMotion/coarsePointer.

Both are SSR-safe: all rect/pointer math in effects, first-paint markup is the
deterministic rest pose (verified by renderToString smoke, below).

## Decisions / deviations (with reasons)

1. **`cursor: "pointer"` instead of the prototype's `cursor: 'none'`.** P1's
   PointerProvider landed mid-package and owns OS-cursor hiding globally
   (`data-cursor-hidden` + `cursor: none !important`, applied only post-mount).
   A per-button inline `none` would hide the OS cursor pre-mount and override
   the "show system cursor" preference. `pointer` is the fallback whenever the
   custom cursor is off; the provider's rule wins whenever it's on.
2. **`MagneticButtonProps` omits `onDrag | onDragStart | onDragEnd |
onAnimationStart`** from `ButtonHTMLAttributes` — React's DOM handler types
   collide with framer-motion's gesture/animation props on `motion.button`.
   Frozen-contract props (`kind`, `strength`, `wobble`, `onClick`) unchanged.
3. **Wobble follows the spring output**, not the raw target, so rotation
   settles together with x (the mandated springs replace the prototype's
   single CSS transition for translate).
4. **Added `onPointerCancel` → press reset** (not in prototype): prevents a
   stuck 0.94 tap scale on touch when a scroll gesture cancels the tap.
5. **User-supplied pointer/click handlers are composed** rather than
   overridden (prototype spread `...rest` before its own handlers).
6. **`initial={false}`** on `motion.button` so SSR renders the animate state
   and there is no mount animation.
7. **Lint run without repo-wide `--fix`**: `yarn lint` is `eslint . --fix`,
   which could write to unowned files mid-phase. Ran `npx eslint .` (no fix,
   exit 0 — so `--fix` would have been a no-op anyway) plus a scoped check of
   my two files.

## Self-check output

- `npx astro check` → `Result (46 files): 0 errors, 0 warnings, 0 hints`
- `npx eslint src/components/interactive/MagneticButton.tsx src/components/interactive/Tilt.tsx` → exit 0
- `npx eslint .` (repo-wide, no fix) → exit 0
- SSR smoke (esbuild-bundled `renderToString` of PrefsProvider →
  PointerProvider → MagneticButton + Tilt, run in scratchpad): renders without
  exceptions; button at rest emits `transform:none`, token `var()`s only,
  hard shadows; Tilt emits the deterministic rest transform. No console
  errors.
- Reduced-motion / coarse-pointer / magnetic-off paths implemented as above;
  a11y: native `<button>`, focus ring not suppressed, uppercase via CSS.

## Notes for other packages

- P5/P6: use `<MagneticButton kind strength wobble onClick>` as per the frozen
  contract; extra DOM props pass through (except the four omitted handlers
  above). `<Tilt max={6}>` testimonials, `<Tilt max={4}>` career cards per
  README §Card Tilt.
- P7: no extra wiring needed — MagneticButton/Tilt already read
  `usePrefs().magnetic/reducedMotion/coarsePointer` themselves.

# P3 — Eyes, sticky notes, stamps & tape · 2026-09-17

## Files touched

- `src/components/interactive/Eyes.tsx` — stub replaced with the full port.
- `src/components/interactive/StickyNote.tsx` — stub replaced with the full port.
- `HANDOFF_NOTES.md` — two appended bullets (shell append).
- Audited, NOT modified (P0 ports verified faithful against micro.jsx
  413–427 / 520–560 / 593–657): `Tape.tsx`, `RubberStamp.tsx`,
  `Scribble.tsx`, `Arrow.tsx`.

## Eyes.tsx

Ported per micro.jsx 247–312 + README §Eyes That Follow: white ball,
3px ink border (`borders.default`), `3px 3px 0 ${ink}` hard shadow; pupil
38% of eye; offset = unit-vector(eye→cursor) × `min(size*0.18, dist/8)`;
eye centers resolved in PointerProvider CONTAINER coords via
`getBoundingClientRect` on the wrapper with effective-scale division
(`cr.width / container.offsetWidth`, trap 2); blink every 3.5–6.5s
(pupil height → 2px for 140ms); double-click spins both eyes via the
global `spin` keyframe, 0.7s ease-out (10ms off → on → off at 720ms,
as in the prototype).

Decisions / deviations:

- **Reduced motion / coarse pointer**: `usePrefs()` gates everything —
  `coarsePointer || reducedMotion` ⇒ no tracking, static centered pupils;
  `reducedMotion` additionally disables blink and the double-click spin.
  (Blink stays on for coarse-pointer visitors: it is pointer-independent.)
- **Additive props `x`/`y`** (prototype API): when either is set the
  wrapper is `position:absolute` at (x, y) with `display:flex`; when both
  are omitted it keeps the stub's in-flow `inline-flex`. Frozen-contract
  props (`size`, `gap`, `blink`) are unchanged — this is a superset.
  Posted in HANDOFF_NOTES.
- **`cursor: none` gated**: the prototype hardcodes `cursor:'none'` on the
  wrapper (custom cursor is the pointer). Hardcoding it would strand
  users who disable the custom cursor, so it applies only while
  `prefs.cursor && !coarsePointer`. First paint is deterministic (prefs
  defaults identical on server and client), so no hydration mismatch.
- Timers (blink close, spin) are tracked and cleared on unmount (the
  prototype leaked its 140ms/720ms timeouts).
- `background: "white"` keyword kept from the P0 stub (no white token
  exists; not a hex literal). Everything else is tokens.
- SSR: no browser APIs at module/render scope; the render-time
  `getBoundingClientRect` reads are ref-guarded (refs are null on the
  server and on first client render → identical markup, pupils at the
  prototype's initial `-999,-999`-facing offset until the pointer moves).

## StickyNote.tsx

Ported per micro.jsx 313–390 + README §Draggable Sticky Notes: drag from
anywhere; while dragging scale 1.05, rotation × 0.4 (trap 6), z-index 50,
`shadows.stickyDrag` (else `shadows.sticky`), transition .15s/.25s,
`sfx.grab()`/`sfx.drop()`, cursor grab/grabbing + `setHot('drag')` on
enter/grab (cleared on leave/drop); drag math relative to the note's OWN
`offsetParent` with effective-scale division (falls back to
`containerRef` exactly like the prototype); persists `{x,y,rotate}` to
`localStorage["sticky_v2_<id>"]` on drop — v2 prefix kept, no migration
(trap 4); every storage access is try/catch-guarded. Tape flap ported
with token tints (`color-mix` cream 70% / ink 20% borders). Content is
Caveat (fonts.hand) 24px / 1.15 per the handoff spec (the raw prototype's
18px was superseded); padding `18px 18px 22px`, `userSelect/touchAction:
none` as prototyped.

Decisions / deviations:

- **SSR-safe storage**: the prototype read localStorage during initial
  render; here first paint renders at the given `x`/`y` and the stored
  position (shape-validated) applies in a `useEffect` after mount.
- **Keyboard alternative** (in scope; prototype lacks it): `tabIndex=0`,
  `role="button"`, instructional `aria-label`, `aria-pressed` while
  lifted. Enter (or Space, standard for the button role) picks up /
  drops; arrows move 8px (32px with Shift); Esc drops; blur while lifted
  drops. Lifted state shares the drag visuals (1.05 / 0.4× rotation /
  z 50) and sfx, and drops persist to the same key.
- Kept the stub's `data-sticky-id` attribute and `style` passthrough.
- `pointermove` listener registered `{ passive: true }` (no preventDefault
  in the handler); drag offset lives in a ref (no re-render churn).

## Audit of the P0-ported four (no changes needed)

- `Tape.tsx`: geometry/stripes/rotate identical; default fill = cyan@55%
  color-mix ≡ prototype `rgba(8,145,178,0.55)`; the soft `0 2px 6px`
  ink@15% shadow is the one sanctioned verbatim exception (AGENTS.md).
- `RubberStamp.tsx`: double border, 6px radius, 0.5 aspect, 0.16em-scaled
  Archivo Black 900, 0.1em tracking, 0.85 opacity, cream@40% scanlines —
  all match.
- `Scribble.tsx`: both paths, stroke widths (n / n−1), 0.6 opacity match.
- `Arrow.tsx`: bezier control math, 14px arrowhead wings at ±2.6rad,
  ±30px viewBox padding, Caveat 26/700 label rotated path-angle−4° match.

## Self-check

- `npx astro check`: 46 files — 0 errors, 0 warnings, 0 hints.
- `npx -y yarn@1 lint` (eslint --fix): clean, no diagnostics.
- `npx -y yarn@1 build`: full pre-render build completed (verifies the
  SSR safety of both new components inside the pre-rendered island).

## Notes for other packages

- P1: Eyes consumes `usePointer().p` + `containerRef`; with the P1 stub
  the pointer is inert (−999,−999) so pupils sit at their max up-left
  offset until real tracking lands — nothing needed beyond the frozen
  contract.
- P5/P6: Eyes placement — pass `x`/`y` for prototype-style absolute
  placement or omit them and position the inline-flex wrapper yourself.
- P6: StickyNote is a focusable `role="button"` — don't nest interactive
  elements in note children. RESET LAYOUT: clear `sticky_v2_n1`…`n8`
  and re-key the board to remount at defaults (stored positions are read
  on mount only).
- P7: no extra reduced-motion wiring needed for Eyes/StickyNote — Eyes
  self-gates via `usePrefs()`; sticky drag is user-initiated and remains
  enabled (per AGENTS.md coarse-pointer rules).

# P4 — Text effects, marquees, chrome & audio · 2026-09-17

## Files touched

- `src/lib/sfx.ts` — full port of `makeSfx` (micro.jsx 60–92)
- `src/components/text/Scramble.tsx` — full port (micro.jsx 390–408)
- `src/components/text/ScrambleHover.tsx` — full port (micro.jsx 560–588)
- `src/components/chrome/ScrollProgress.tsx` — full port (micro.jsx 658–697)
- `src/components/chrome/SideRibbon.tsx` — full port (micro.jsx 627–652)
- `src/components/text/Marquee.tsx` — **audited, NOT modified** (see below)
- `HANDOFF_NOTES.md` — one appended bullet (P4 → P7, `isMuted` not ported)

## Marquee audit (P0 port vs prototype, micro.jsx 428–439)

Line-for-line match: overflow/nowrap wrapper, inner `inline-flex` gap 24,
`marq ${speed}s linear infinite` with `animationDirection` normal/reverse,
tripled children, defaults `speed=60` / `dir=1`. P0 added the required
reduced-motion pause (`animation: none`; tripled content still fills the
strip). Zero fidelity gaps — no changes made.

## Decisions / deviations (with reasons)

1. **`Sfx.isMuted()` not ported.** The prototype returns it; the frozen
   contract (`AGENTS.md` §Frozen contracts) does not include it, so the
   interface stays exactly `hover/click/pop/grab/drop/yay/setMuted`.
   Noted in `HANDOFF_NOTES.md` for P7 (mute state lives in prefs; no readback).
2. **`ScrambleHover` inline `cursor: 'none'` dropped.** Mid-package, P1's
   HANDOFF_NOTES bullet announced global OS-cursor hiding via the
   `data-cursor-hidden` attribute on the artboard container, which already
   respects the cursor pref, reduced motion, and coarse pointers. A per-span
   inline `cursor: none` would keep hiding the OS cursor on headlines when
   the global system turns hiding OFF, so the span carries no cursor style.
3. **`Scramble` renders plain text under reduced motion** (no interval).
   The prototype has no reduced-motion path; AGENTS.md requires JS-driven
   motion to check `usePrefs().reducedMotion`. Same for `ScrambleHover`
   (explicitly specced): pointer-enter still sets the hot state and plays
   `sfx.hover()` (link affordance + sfx pref stay honored), but never
   scrambles.
4. **No `font:` shorthand.** Prototype used
   `font: '900 14px "JetBrains Mono", monospace'` — literal font names are
   banned, so both chrome pieces use `fontFamily: fonts.mono` +
   weight/size/letter-spacing longhand (identical computed style).
5. **ScrollProgress candy stripe** uses `red`/`cream`/`cyan` token vars in
   the `repeating-linear-gradient` instead of the spec's literal hexes
   (tokens-only rule; stops 0/16/18/34/36px preserved exactly).
6. **SideRibbon <768px**: returns `null` via
   `useMediaQuery("(max-width: 767px)")` — same pattern P0 used in
   `SectionDivider`, SSR-safe (first paint renders the ribbon on all
   viewports, matching the server; it unmounts on phones after mount).
7. **Both chrome pieces `aria-hidden='true'`** — decorative, and the ribbon
   repeats its items ×3 (screen readers would announce them three times);
   the info (availability, email, location) exists in real page copy. Same
   treatment P0 gave `SectionDivider`. The `{pct}% READ` pill is decorative
   progress chrome, not a `progressbar` widget.
8. **Unmount cleanup added to `ScrambleHover`** (clears an in-flight
   interval) — the prototype only cleared on pointer-leave, which leaks the
   interval + sets state on an unmounted component if unmounted mid-glitch.
   No visual difference.
9. **SSR safety**: `makeSfx()` builds closures only — `window.AudioContext`
   is referenced solely inside `ensure()`, which runs only from voice calls,
   which run only from gesture handlers (trap 5: create/resume inside a user
   gesture only). Both chrome components start at deterministic defaults
   (0%, ribbon rendered) and touch browser APIs only in effects.

## Self-check

- `npx astro check`: **0 errors, 0 warnings, 0 hints** (46 files).
- `npx eslint <all 6 owned files>`: clean; full `npx -y yarn@1 lint`: clean.
- `npx prettier --check` on owned files: all formatted.
- Bonus: `npx astro build` completes — SSR pre-render succeeds with all P4
  components live.
- Verified against prototype at source lines: exact charsets (incl.
  `█▓▒░`), 40ms/`i/2` and 32ms/`frame*0.6` reveal rates, voice table
  (wave/freq/dur/gain, 5ms attack, exp decay to 0.001), 14px strip /
  3px borders / 0.15em–0.35em tracking / z-indices 9999 & 200 /
  `pointer-events: none` / `writing-mode: vertical-rl` / marqV 40s /
  tripled content, `.12s linear` width transition.

## Notes for other packages

- **P7**: `Sfx` has no `isMuted()` — drive mute purely from
  `usePrefs().sfx` → `sfx.setMuted(...)` (also in HANDOFF_NOTES).
- **P5/P6**: `ScrambleHover` requires a `PointerProvider` ancestor
  (throws otherwise) — fine anywhere inside the island body. `Scramble` and
  `Marquee` only need `PrefsProvider`. `SideRibbon`/`ScrollProgress` are
  already mounted from `Portfolio.tsx` top level, outside the transformed
  artboard (trap 1) — do not remount them inside sections.
- **P1**: per your note, the fixed chrome (outside PointerProvider) keeps
  the OS cursor — intentional, since the ribbon is `pointer-events: none`
  and the progress strip is non-interactive; no `data-cursor-hidden` added.

# agent-log.P5 — Sections 1–4 (Hero, About, Skills, Work)

## P5 · 2026-09-17T20:35:00Z

### Files touched (owned)

- `src/sections/Hero.tsx` — full port of portfolio-1.jsx 90–186.
- `src/sections/About.tsx` — full port of portfolio-1.jsx 186–239.
- `src/sections/Skills.tsx` — full port of portfolio-1.jsx 239–288.
- `src/sections/Work.tsx` — full port of portfolio-1.jsx 288–463.
- `HANDOFF_NOTES.md` — one appended bullet (shell append): P6 to add
  `id='writing'` to the Writing slab (Hero nav links `#writing`).

### What landed

- **Hero**: top bar with the A-logo as a real `<button>` (via P1 `Hover as='button'`)
  accepting `onLogoClick?: () => void` / `clicks?: number` (defaults noop/0,
  logo rotates `clicks*30deg` from click 3 — P7 wires the rave); centered nav
  anchored to the real slab ids (`#work`, `#now`, `#writing`, `#contact`);
  available-for-hire pulse dot (success token, ring via `color-mix` 25%);
  `HI, I'M` + Squiggle; single-`h1` mega name (`--text-mega` fluid token),
  surname red with the verbatim cyan hand-drawn underline SVG (translateY(8px)
  rotate(-2deg) SENAN); 26px lead with yellow `<em>` highlight; MagneticButtons
  danger `SEE THE WORK →` (scrolls to `#work`, `behavior` auto under
  reduced motion) and ghost `↓ DOWNLOAD CV` (opens
  https://www.linkedin.com/in/theshakeabhi/ — user decision, no CV PDF yet);
  Arrow `from [-110,60] to [-10,60]` label "start here"; sticker cluster
  (Senior stamp, SHIPS FAST! burst, two 50%-alpha tapes via color-mix); TWO
  eye pairs; bottom ink marquee `speed={50}` with the verbatim item list.
- **About**: `320px 1fr` grid (stacks < lg); 300×380 `PlaceholderImg` portrait
  rotated −3° with two tapes + red FOUNDING ENERGY `Burst` (points 10);
  `ABOUT.TXT` h2 with Star; two body paragraphs verbatim (yellow `Hover`
  highlight on EximPe); 4-stat grid `50K+ / 25→85% / −50% / −60%` with
  `--shadow-card` and alternating ±0.6° rotation.
- **Skills**: ink slab, `STUFF I'M GOOD AT (probably)` h2, intro, 18 keyword
  word-cloud (36–96px, mixed tones/rotations, `transition: transform .2s,
color .2s`, `3px 3px 0` ink text shadow) — every keyword is a
  `ScrambleHover`.
- **Work**: `id='work'` kept; `THE WORK.` h2 + cyan stamp; EximPe mega-card
  (4px border, `--shadow-slab`, `IN PRODUCTION` RubberStamp size 200 rot −14
  on the bottom edge, 3 stamps, `EXIMPE` h3 at `--text-project`, role line,
  5 bullets with rotated ▸ chips, `Product Screens` placeholder with yellow
  `50K+ MAUs` burst overlap, 4 KPI tiles, `CASE STUDY →` primary button);
  then `BEFORE EXIMPE.` + three `Tilt max={4} scale={1.02}` cards
  (SAWO Labs / QBurst / Zomato) with per-bullet metric stamps — SAWO uses the
  outline display-face tile, QBurst/Zomato the solid mono tile, copy verbatim.

### Decisions / deviations (with reasons)

1. **Two eye pairs in the Hero** — prototype mounts one (`x 80 / y 900`);
   README §Section Highlights says "Two pairs of googly eyes" and the P5 brief
   repeats it. Kept the prototype pair (bottom-left, `left 80 / bottom 70` ≡
   y 900 at the 1020px min-height) and added a second smaller pair at
   `right 110 / top 655` in the empty zone under the cyan tape.
2. **Eyes positioned by my own absolute wrappers** (not P3's additive x/y
   props) so the frozen contract alone is enough and bottom-anchoring keeps
   the pair glued above the marquee at any hero height.
3. **Responsive** (design is 1440-native, AGENTS.md breakpoints): two-column
   grids (About, EximPe card) and the 3-card row stack under `lg` via Tailwind
   classes; About stats go 2×2 under `lg`; hero lead+CTA row stacks under
   `lg`; 1440-px-positioned decoration (hero stickers/tapes/eyes, the Arrow)
   is `hidden lg:block` — px coordinates are meaningless once the layout
   reflows. Skill-keyword and one-off heading sizes (56px "BEFORE EXIMPE.",
   20px Skills intro, EximPe card padding) use the same fluid formula as the
   type tokens (`px/1440·100vw` clamp); everything renders exactly at spec at
   ≥1440px.
4. **RubberStamp left offset** `min(360px, 45%)` instead of `360` so the stamp
   stays on the card edge on narrow screens (equal to 360px at design width).
5. **Heading hierarchy per README a11y** — company names are `h3` (prototype
   had `h4`); `BEFORE EXIMPE.` stays `h3`; hero name is the single `h1`.
6. **No inline `cursor: none`** (prototype had it on hover targets) — P1's
   `data-cursor-hidden` mechanism owns OS-cursor hiding; the logo button
   carries a `cursor: pointer` fallback like P2's buttons.
7. **Prior-role cards are data-driven** (one map + a `MetricTile` helper with
   the two tile styles) — identical rendered output to the three hand-written
   prototype cards.
8. **rgba literals replaced with `color-mix` on tokens** (tape 50% tints,
   pulse ring 25%) per the tokens-only rule.
9. **`CASE STUDY →` has no handler** (prototype had none; no target given) —
   left for P7/later content.

### Self-check

- `npx astro check` → 0 errors / 0 warnings / 0 hints (48 files).
- `npx -y yarn@1 lint` (eslint --fix incl. prettier) → clean.
- `npx -y yarn@1 build` → static build OK; pre-rendered HTML contains all
  four sections' copy, exactly one `<h1>`, `id="work"` present; compiled CSS
  contains every responsive utility used (lg:min-h-[1020px],
  lg:grid-cols-[320px_1fr], lg:grid-cols-[1.3fr_1fr], lg:grid-cols-3/4,
  max-lg variants, hidden/lg:block/lg:inline).
- Token audit: no literal hex / rgba / font-family / shadow strings in the
  four files (grep-verified); all shadows hard (zero blur).
- Reduced motion: marquee pause is inside P0's Marquee; pulse frozen by the
  global reduced-motion CSS; `SEE THE WORK` scroll uses `behavior: 'auto'`
  when `usePrefs().reducedMotion`. Coarse pointer handling lives in the
  interaction components (P1–P3) my sections compose.

### Notes for other packages

- **P6**: add `id='writing'` to the Writing slab (bullet in HANDOFF_NOTES.md).
- **P7**: Hero exports `HeroProps { onLogoClick?, clicks? }` — wire the rave
  logo counter there; the A rotates from the 3rd click as in the prototype.
- **P7**: `CASE STUDY →` MagneticButton in Work is intentionally inert.

# P6 · 2026-09-17 — Sections 5–10 + easter egg plumbing

## Files touched (all P6-owned)

- `src/sections/NowBoard.tsx` — full port
- `src/sections/Writing.tsx` — full port (+ `id='writing'` per P5's HANDOFF note)
- `src/sections/Playground.tsx` — full port
- `src/sections/Testimonials.tsx` — full port (renders null while content is empty)
- `src/sections/Resume.tsx` — full port
- `src/sections/Contact.tsx` — full port
- `src/components/chrome/RaveOverlay.tsx` — full port
- `src/lib/useLocalTime.ts` — new
- `src/lib/useEasterEgg.ts` — new
- `src/content/writing.ts` — 5 placeholder entries
- `src/content/testimonials.ts` — empty by design, shape comment added
- `HANDOFF_NOTES.md` — three appended bullets (shell append)

## User decisions applied

- Email everywhere is `theshakeabhi@gmail.com` (no `hi@abhishek.sh` remains in my files).
- Contact social row replaced with real links: GitHub / LinkedIn / dev.to as three
  separate underlined links (`@THESHAKEABHI ON …`); no X link. Separate links were
  necessary anyway — one row can't carry three hrefs.
- Both Resume CTAs open `https://www.linkedin.com/in/theshakeabhi/` (no PDF yet).
- "📅 BOOK A 30-MIN CHAT" and "✉ SEND ME AN EMAIL" are `mailto:theshakeabhi@gmail.com`.
- Writing rows come from `src/content/writing.ts`; the five prototype titles are
  **placeholders** with every `href` (and ALL POSTS →) pointing at
  `https://dev.to/theshakeabhi` — swap when real posts exist.
- Testimonials content is an **empty typed array**; the prototype's invented quotes
  live only in a comment as shape reference. Section returns null while empty.

## Decisions / deviations (with reasons)

1. **Playground card background**: prototype `#0f172a` has no token → approximated
   with `color-mix(in srgb, var(--color-ink) 65%, black)`; asked P0 for a
   `--color-ink-deep` token in HANDOFF_NOTES.
2. **Cork-board pin shadows**: prototype used a 4px-blur soft shadow → flattened to
   hard zero-blur (`inset -3px -3px 0` + `2px 2px 0`, ink @25% via color-mix) per
   trap 7 / hard rule "every shadow is hard". rgba(0,0,0) tints became ink tints.
3. **Right-side board pins** are right-anchored (`right: 66/76`) instead of
   `left: 1200/1190` so they stay visible on fluid widths; identical at 1440px.
   Sticky notes keep prototype px positions (P3 drag math persists px); between
   768–1440px the rightmost notes may clip (overflow hidden) — 1440 is exact,
   <768 uses the list. Flagging as a known mid-range limitation.
4. **Reset bug in prototype fixed**: portfolio-2.jsx cleared `sticky_n${i}` keys,
   which never matched the `sticky_v2_` storage — I clear `sticky_v2_n1..n8`
   (trap 4), then key-bump the board and fire `sfx.pop()`.
5. **No inline `cursor: none`** in my sections (prototype had it inline): OS-cursor
   hiding is owned by the P1/P7 mechanism (see P2's HANDOFF note); inline
   `cursor:none` would defeat the "show system cursor" preference (README a11y).
6. **Resume CTA labels kept verbatim** ("↓ DOWNLOAD .PDF" / "VIEW ONLINE") per
   port-don't-improve even though both currently open LinkedIn — revisit copy when
   the real PDF lands. Same for "LAST UPDATED · 2026.05.20 · 84KB".
7. **Writing rows** are real `<a>` elements (target=_blank, rel=noreferrer);
   inversion state is React-held (hover + keyboard focus both invert — a11y).
   Padding-left shift (8→24px) is suppressed under `reducedMotion`; the color
   inversion stays. Handlers are passed through `<Hover>` exactly like the
   prototype did — if P1's Hover clobbers consumer `onPointerEnter/Leave`, ping me.
8. **RaveOverlay** fires `sfx.yay()` itself (effect on `on` rising edge) via
   `usePointer()`, so `useEasterEgg` stays dependency-free with the frozen
   `{ rave, clicks, dismiss, onLogoClick }` shape. It must therefore stay mounted
   inside PointerProvider (it already is in Portfolio.tsx; the provider wrapper is
   untransformed so the fixed banner is viewport-anchored — trap 1). Confetti
   randomness is `useMemo`-keyed on `on` (never runs during SSR since `on` starts
   false); banner is a real `<button>`. Under `reducedMotion` only the banner
   renders — zero confetti.
9. **useLocalTime** returns a deterministic `"--:--:--"` placeholder on the server
   and first client paint, then ticks every 1s after mount (no hydration
   mismatch). Called inside Contact per spec.
10. **Konami listener** is `{ passive: true }`, lowercases `e.key`, never calls
    preventDefault, cleans up on unmount; click count / buffer reset after rave.
11. **Eyes placement** (README: Now / Resume / Contact top-right): absolute pairs
    added — Now top-right (hidden <768px), Resume above the paper preview, Contact
    top-right at prototype coords (hidden <768px to avoid the wrapped clock pill).
12. **Responsive**: 3-col Playground grid, 2-col Testimonials, Resume and Contact
    two-column layouts all stack below 1024px; Writing rows re-flow to a stacked
    layout and the NowBoard becomes a vertical list of static notes below 768px
    (reset button hidden — nothing to reset with drag off). Contact link font
    clamps + `overflowWrap: anywhere` so the email never overflows at 320px.
13. **Playground extras**: bounce timeout is cleared on unmount; ball transition is
    `none` under `reducedMotion`; counter complaint line is `aria-live=polite`;
    +/− buttons and hue slider carry aria-labels; pulse dot animation is disabled
    under `reducedMotion` (belt over the global CSS brake).

## Self-check

- `npx astro check` → 0 errors, 0 warnings, 0 hints (48 files) — run twice,
  including after P1–P5 landed their real components mid-phase.
- `npx -y yarn@1 lint` (eslint --fix + prettier) → clean, repo-wide.
- Grep for literal hex / font names / rgba in my files → only a comment mentioning
  `#0f172a` (documents deviation 1).
- No git write commands run; only my owned files + HANDOFF_NOTES appends touched.

## Notes for other packages

- **P7**: wire `useEasterEgg()` into Portfolio.tsx (`rave`→RaveOverlay,
  `onLogoClick`/`clicks`→Hero) and conditionally drop the "NICE THINGS…"
  SectionDivider while `testimonials` is empty — both in HANDOFF_NOTES.
- **P0**: optional `--color-ink-deep` token (HANDOFF_NOTES).
- **P1**: Writing rows pass `onPointerEnter/Leave` through `<Hover>` — please
  merge, don't clobber, consumer pointer handlers (prototype behavior).
- **P8**: SideRibbon default items still say `HI@ABHISHEK.SH` in Portfolio.tsx
  (P0/P7-owned) — should become `THESHAKEABHI@GMAIL.COM` per the user decision.

# agent-log.P7 — Integration, a11y & preferences

## P7 · 2026-09-17T20:45:00+05:30

### Files touched

- `src/portfolio/Portfolio.tsx` — rewired: `useEasterEgg()` → RaveOverlay
  (inside PointerProvider) + Hero (`onLogoClick`/`clicks`); `SfxMuteBridge`
  child of PrefsProvider runs `sfx.setMuted(!prefs.sfx)` (write-only, no
  readback per P4 note); Testimonials + its "NICE THINGS…" divider skipped
  while `testimonials.length === 0`; RIBBON_ITEMS email →
  `✶ THESHAKEABHI@GMAIL.COM`; `<PreferencesMenu />` mounted with the fixed
  chrome OUTSIDE PointerProvider.
- `src/components/chrome/PreferencesMenu.tsx` — NEW. Fixed bottom-right
  (right: 52px clears the 36px SideRibbon), z-index 9500, brutalist ghost
  (cream, 3px ink border, hard shadows, zero radius). ⚙ TWEAKS toggle with
  `aria-expanded`/`aria-controls`; panel always mounted, `hidden` when
  closed (keeps the aria-controls id valid); three `role="switch"` buttons
  (Sound effects / Custom cursor / Magnetic buttons) through
  `usePrefs().setPref`; Esc closes and refocuses the toggle (passive
  listener, no focus trap — per brief); easter-egg hint list ported from
  app.jsx TweaksPanel copy (logo ×5, Konami, sticky notes remember,
  double-click eyes, hover headlines). Keeps the OS cursor: no
  `data-cursor-hidden`, sits outside the artboard.
- `src/styles/global.css` — additive: `--color-ink-deep: #0f172a` in the
  @theme color block.
- `src/tokens.ts` — additive one-line `inkDeep` re-export (see Deviations).
- `src/sections/Playground.tsx` — swapped the
  `color-mix(in srgb, ink 65%, black)` approximation for the new `inkDeep`
  token; removed the stale comment.
- `src/sections/Hero.tsx` — available-for-hire pulse dot now gates its
  animation on `reducedMotion` (parity with Contact's identical dot; the
  global CSS freeze already covered it, this makes the JS path explicit).
- `HANDOFF_NOTES.md` — appended `- [P7] resolved: …` acks (append-only).

### Backlog disposition (HANDOFF_NOTES + task list)

1. useEasterEgg wiring — DONE (RaveOverlay inside PointerProvider; Konami
   listener stays passive; clicks reset after rave).
2. Testimonials + divider skip — DONE (conditional on
   `testimonials.length > 0`; verified absent from dist/index.html).
3. Ribbon email — DONE (4 occurrences in rendered HTML = tripled marquee +
   static row; zero `HI@ABHISHEK.SH` left in src).
4. `--color-ink-deep` — DONE (token + Playground switch).
5. SFX mute — DONE (`SfxMuteBridge`; effect re-runs on pref change; initial
   defaults-run is a harmless `setMuted(false)` before storage sync, and
   reduced-motion first-visits resolve to muted via prefs defaults).
6. PreferencesMenu — DONE (see above).
7. Reduced-motion audit — PASS with one fix (Hero pulse, above). Verified
   in-place: Marquee + SideRibbon render `animation: none`; SectionDivider
   <768px is a static row; CustomCursor/CursorTrail disabled
   (cursor && !reducedMotion && !coarsePointer); MagneticButton inert +
   scale transition dropped; Tilt inert; Scramble/ScrambleHover render
   plain text; Eyes: no tracking, no blink, no double-click spin;
   RaveOverlay: banner only, no confetti; Playground bouncy-boi transition
   "none"; Writing padding shift suppressed (inversion kept by design);
   Contact pulse + both scrollIntoView/scrollTo behaviors already gated;
   sfx defaults OFF for reduced-motion first visits (prefs.tsx) and the
   global CSS freeze backstops all keyframes.
8. Heading audit — PASS, no changes: exactly one `<h1>` (hero name);
   8 `<h2>` = one per rendered section (Testimonials skipped); 8 `<h3>` =
   EXIMPE, BEFORE EXIMPE, SAWO/QBURST/ZOMATO, 3 Playground experiments.
   Writing post titles are list-row links (not headings) — matches the
   prototype and stays scannable. Counts confirmed against dist/index.html.
9. Contrast audit — PASS with one fix (in my own new file: panel section
   labels ink, not red-at-11px). No red body copy exists anywhere. Red
   below headline size survives only as prototype-verbatim _badges_:
   Writing tag chips, Stamp/RubberStamp/MetricTile stamps (README specs
   these as red stamps; they are decorative metric flair, not body copy)
   and the `aria-hidden` CV paper mock. Red stats/headline spans are all
   ≥28px display face (large-text AA passes at 3.9:1). Documented rather
   than "fixed" to honor port-don't-improve; flagging here for the lead.
10. Trap-1 audit — PASS: rendered tree shows ScrollProgress, SideRibbon and
    PreferencesMenu as siblings ahead of PointerProvider's container, which
    is `position:relative;width:100%` with NO transform, so RaveOverlay's
    fixed banner stays viewport-pinned. The only transforms before the
    first `<section>` are on the fixed elements' own inner movers
    (SideRibbon marqV column), never on an ancestor.
11. STUB sweep — grep for `STUB(` across all ts/tsx/astro/css/js finds
    ZERO matches; every stub was already replaced by its owner. Nothing to
    delete, no orphaned stub files to report.

### Decisions / deviations

- `src/tokens.ts` is P0-owned but got a one-line additive `inkDeep` export:
  the sanctioned alternative (spelling `var(--color-ink-deep)` inside
  Playground) violates the stronger repo invariant that global.css +
  tokens.ts are the only files that spell out tokens. Flagged in
  HANDOFF_NOTES for the lead.
- PreferencesMenu deliberately does NOT play sfx: it lives outside
  PointerProvider (usePointer would throw), and clicking "Sound effects"
  off would race the mute effect. Silence is the least surprising option.
- Panel stays mounted with `hidden` instead of conditional render so
  `aria-controls` always references a real id; SSR markup is deterministic
  (closed) on both server and client.
- SwitchRow keeps its .15s knob/background transitions under reduced
  motion — discrete state-change feedback, same category as Writing's
  kept color inversion.

### Self-check

- `npx -y yarn@1 build` → `astro check`: 0 errors, 0 warnings, 0 hints
  (50 files); `astro build`: Complete, 1 page.
- `npx -y yarn@1 lint` → clean; verified again with bare `npx eslint .`
  (no --fix) → zero findings.
- dist/index.html spot-checks: TWEAKS toggle + `aria-expanded="false"`
  present; ribbon email ×4; no `HI@ABHISHEK.SH`; no "NICE THINGS"; no rave
  banner in first paint; h1/h2/h3 = 1/8/8; `--color-ink-deep` present and
  the color-mix approximation gone.
- HANDOFF_NOTES re-read before finishing: no P8-appended requests for P7.

# P8 · Launch & compliance — 2026-09-17T21:05+05:30

## Files touched

- `src/pages/index.astro` — head only + body mount: Consent Mode v2 default
  script (all four signals denied, `wait_for_update: 0`) inserted BEFORE the
  async gtag.js loader; loader + `config G-X8L7GJY3D8` kept. Added favicon
  links (`/favicon.svg`, `/apple-touch-icon.png`), `theme-color`,
  `og:image:width/height/alt`, `twitter:image:alt`. Meta description
  tightened to 148 chars (senior frontend engineer, Bengaluru). Kept font
  preload + sitemap link + canonical. Mounted `<CookieConsent client:idle />`
  after the Portfolio island.
- `src/components/chrome/CookieConsent.tsx` — NEW island. Brutalist slab
  fixed bottom-left (ink bg, cream text, 3px cream border, hard zero-blur
  `6px 6px 0` red shadow, JetBrains Mono), real `<button>` ACCEPT
  (red/cream, primary) + DECLINE (ghost), link to /privacy,
  `aria-label="Cookie consent"`. Persists to localStorage
  `portfolio.consent` in try/catch; renders nothing until mounted AND no
  stored choice (SSR-safe, no hydration mismatch). On accept sends
  `gtag('consent','update',{analytics_storage:'granted'})` via the
  head-defined `window.gtag`; a stored "accepted" is REPLAYED on every mount
  (consent default is deny-per-pageload). zIndex 8000 (above SideRibbon 200,
  below RaveOverlay 9000 / cursor 9999). Tokens only, via `src/tokens.ts`.
- `src/pages/privacy.astro` — NEW. Plain-language policy: static site on
  GitHub Pages (host logging → GitHub's privacy statement), GA4
  G-X8L7GJY3D8 only after consent + what GA collects, localStorage cards
  for `sticky_v2_*` / `portfolio.tweaks` / `portfolio.consent`
  (device-only, never transmitted), no other tracking, contact
  theshakeabhi@gmail.com, last-updated Sept 17 2026. Own title/description,
  canonical `/privacy/`, `← BACK` chip, `lang="en"`, token utilities only.
- `src/pages/terms.astro` — NEW. Short: personal portfolio, content/code
  ownership, no warranties, external links. Same chrome as privacy;
  canonical `/terms/`.
- `src/pages/404.astro` — NEW. `LOST?` mega headline (text-mega, display
  face), corner stamp `404 // NOT FOUND`, red accent block + yellow star
  (both `aria-hidden`, hidden < md), `← TAKE ME HOME` chip. `noindex`.
- `public/robots.txt` — NEW. Allow all + `Sitemap:
https://theshakeabhi.github.io/sitemap-index.xml`.
- `public/favicon.svg` — NEW. Red "A" mark: red chip, 4px ink stroke, hard
  ink offset shadow, cream blocky hand-drawn "A" path (no font dependency).
- `public/apple-touch-icon.png` — NEW. 180×180, full-bleed red variant
  (iOS rounds its own corners), rasterized from a scratch SVG via
  sharp-cli, 16-color palette → 1.0 KB.
- `public/og.png` — NEW. 1200×630 (verified via `sips`), 30.4 KB (32-color
  palette PNG). Brutalist composition in the exact site palette: cream bg,
  ink "ABHISHEK" + red "CHANDRASENAN" in Archivo Black, cyan squiggle
  underline, rotated red accent block with cream "A" + 12px ink hard
  shadow, ink/red/yellow role chips (all shadows zero-blur), logo chip +
  AVAILABLE FOR HIRE top bar. Authored as HTML with base64-embedded
  fontsource woff2s, screenshotted with headless Chrome
  (`--window-size=1200,630`), palettized with sharp-cli. Intermediate
  SVG/HTML kept in the session scratchpad, not committed.
- `HANDOFF_NOTES.md` — appended one bullet (P8 → P7): request footer links
  to /privacy + /terms in Contact's footer; reported a11y sweep result.
- `astro.config.mjs` — NOT touched (no addition needed; @astrojs/sitemap
  already excludes 404 and picked up the new pages).

## Decisions / deviations

1. **Literal colors in static assets**: `favicon.svg`, `og.png`,
   `apple-touch-icon.png` and the `theme-color` meta carry literal hex by
   necessity — standalone assets / meta tags cannot reference CSS custom
   properties. Each file documents the token mapping in a comment. No other
   file gained a literal.
2. **Consent replay on mount**: the brief asked for the update on accept;
   I also re-send `granted` on mount when localStorage says "accepted",
   because Consent Mode defaults re-deny on every pageload — without the
   replay, returning accepted visitors would never be measured. Decline
   also sends an explicit `denied` update (harmless, self-documenting).
3. **Astro compressHTML whitespace trap**: text ending at a source-line
   break directly before an inline element gets its space eaten in the
   build output ("governed byGitHub's…"). Fixed with explicit `&#32;`
   before those inline elements in privacy/terms.
4. **Section-label numbering** continues the slab sequence: `11 // PRIVACY`,
   `12 // TERMS`; 404 uses the mandated `404 // NOT FOUND`.
5. **CookieConsent primary button** is red-on-ink with a cream hard shadow
   rather than MagneticButton's ink-primary (invisible on the ink slab);
   ghost is transparent/cream-border. Both are plain `<button>`s — the
   slab lives outside PointerProvider so no Hover/Magnetic wrappers, and
   the OS cursor stays, as specced.

## Self-check

- `npx -y yarn@1 build` (astro check && astro build): **0 errors, 0
  warnings, 0 hints; 4 pages built** (`/404.html`, `/privacy/index.html`,
  `/terms/index.html`, `/index.html`).
- `npx -y yarn@1 lint`: clean (`eslint . --fix` → Done).
- dist inventory verified: `404.html`, `privacy/index.html`,
  `terms/index.html`, `robots.txt`, `og.png` (1200×630, 31,126 B),
  `favicon.svg`, `apple-touch-icon.png` (180×180, 1,029 B) all present.
- `sitemap-0.xml` contains `/`, `/privacy/`, `/terms/` (404 excluded by
  the integration itself).
- Built `index.html`: consent-default script index 2563 < gtag.js loader
  2834 < config 2939 (order verified programmatically);
  `wait_for_update` present; CookieConsent astro-island present with
  `client="idle"`.
- A11y sweep of built `dist/index.html`: 7 `<svg>` elements, all
  `aria-hidden="true"`; zero `<img>` elements → nothing unlabeled, no P7
  fixes needed (reported in HANDOFF_NOTES).
- Visual checks via headless Chrome on a path-rewritten dist copy:
  404/privacy/terms render in-style (Archivo Black + mono stamps + hard
  shadows) at 1440 and phone width. Note: headless Chrome clamps windows
  to 500px min width (verified `innerWidth=500` with a control page), so
  "phone" screenshots render a 500px viewport cropped to 390 — apparent
  right-edge clipping is a tooling artifact, not overflow. Island
  hydration cannot run over `file://` (module CORS): the known-good
  Portfolio island fails identically there, so CookieConsent's absence in
  those screenshots is environmental; its SSR path runs during the build
  and its markup/logic are covered by astro check + eslint.

# agent-log.FIX — post-QA fix pass (append-only)

## FIX · 2026-09-17T16:18:43Z

Applied all verified findings from live QA + adversarial review on
`feat/handoff-redesign`. `npx -y yarn@1 build` (astro check + build) and
`npx -y yarn@1 lint` both clean. No git writes; no dev servers left running.

### Files touched

- `src/components/pointer/PointerProvider.tsx` — QA-1, F7 follow-up
- `src/styles/global.css` — QA-1, F2
- `src/components/interactive/StickyNote.tsx` — QA-2/F8, F1/QA-5(labels)
- `src/sections/NowBoard.tsx` — untouched (clamping lives in StickyNote;
  the `sticky_v2_` key contract and default positions are unchanged)
- `src/pages/index.astro` — QA-3
- `src/components/chrome/CookieConsent.tsx` — QA-3
- `src/pages/privacy.astro` — QA-3 (wording), QA-5/F4 (contrast)
- `src/pages/terms.astro`, `src/pages/404.astro` — QA-5/F4 (contrast)
- `src/sections/Hero.tsx` — F1/QA-5(labels), F6
- `src/portfolio/Portfolio.tsx` — QA-5(landmark)
- `src/sections/Work.tsx` — QA-5/F4 (contrast)
- `src/components/interactive/Eyes.tsx` — F3
- `src/sections/About.tsx` — F5
- `src/sections/Resume.tsx` — F6
- `src/lib/sfx.ts` — F7
- `src/sections/Playground.tsx` — QA-5(labels) follow-up (Lighthouse
  `label-content-name-mismatch` on the "+ 1" counter button)

### Fixes

1. **QA-1 BLOCKER (hydration).** Deleted the `<style>{CURSOR_HIDE_CSS}</style>`
   text child from PointerProvider (react-dom/server escapes it; browsers
   don't decode entities inside RAWTEXT `<style>`, → React #425/#423 on every
   load + full client re-render). The rule
   `[data-cursor-hidden="true"], [data-cursor-hidden="true"] * { cursor: none !important }`
   now lives as static CSS in `src/styles/global.css`.
   Verified: `dist/index.html` contains zero `data-cursor-hidden=&quot`
   occurrences; the only remaining `<style>` in the page is Astro's own
   `astro-island` display:contents helper. Lighthouse `errors-in-console`
   is now clean (score 1, no items) — the hydration errors are gone.

2. **QA-2 MAJOR + F8 (sticky notes clipped off the fluid board).** StickyNote
   now clamps x/y to its offsetParent bounds — `max(0, parent.offsetWidth −
el.offsetWidth)` / same for height, via offset* (unscaled) values so the
   math matches the board coordinate space (trap 2). Clamping applies
   (a) in the mount effect when the default or stored `sticky_v2_` position
   is applied, (b) on window resize, (c) before persisting on pointer drop
   AND on every keyboard move/drop. The `sticky_v2_` key contract is
   untouched (same shape, same prefix, no migration); SSR first paint still
   renders the raw default x/y — clamping is a style-only change in the
   mount effect, so no hydration text mismatch (console clean, see above).

3. **QA-3 MAJOR (DECLINE still pinged GA).** Switched to BASIC Consent Mode.
   `index.astro` no longer has an unconditional gtag.js `<script src>`; the
   inline head script keeps the denied consent defaults + dataLayer/gtag
   bootstrap, defines `window.__loadGtag()` (consent update → js/config →
   inject the script tag once) and calls it immediately only when
   `localStorage["portfolio.consent"] === "accepted"`. CookieConsent's
   ACCEPT stores the choice and calls `__loadGtag()`; DECLINE only stores
   the choice — gtag.js was never loaded, so nothing is sent, not even
   cookieless pings. Verified in dist: no `<script src>` to
   googletagmanager anywhere; the URL only appears inside the loader
   string. `/privacy` §02 rewritten: "the script does not even load unless
   you press ACCEPT … no requests to Google at all, cookieless or
   otherwise".

4. **F1 MAJOR + QA-5 (labels).** StickyNote: dropped the generic aria-label;
   role=button now takes its accessible name from the note's visible
   content (WCAG 2.5.3), and the pick-up/move instructions moved to a
   hidden `aria-describedby` span (aria-hidden so it stays out of the
   name-from-contents computation; directly-referenced nodes still resolve
   as the description per the AccName spec). Hero logo button: removed
   `aria-label='ABHISHEK.SH'` and the `aria-hidden` on the "A" tile — the
   name is now the visible "A ABHISHEK.SH". Follow-up caught by Lighthouse:
   Playground's "+ 1" counter button aria-label now starts with its visible
   text (`+ 1 — increment counter`); `label-content-name-mismatch` now
   passes.

5. **QA-5 (landmark).** Portfolio.tsx wraps Hero→Contact (all sections +
   dividers) in a semantic `<main>` with no styles/transform, inside the
   PointerProvider container (position:relative only — trap 1 safe).
   CursorTrail/CustomCursor/RaveOverlay stay outside `<main>`; ScrollProgress,
   SideRibbon and PreferencesMenu remain outside the provider entirely.
   Verified in dist: `<main>` sits directly inside the provider's
   `position:relative;width:100%` div; fixed chrome precedes it.

6. **QA-5/F4 (contrast, surgical).** Small red mono headings/eyebrows on the
   P8 pages → ink: 5 h2s on /privacy, 4 h2s on /terms, the "ERROR // PAGE
   MISSING" eyebrow on /404 (`text-red` → `text-ink`; the large red display
   spans in the h1s stay — large text passes at 3:1). Work.tsx "ONE BIG ONE
   · THREE WARM-UPS · ALL THE OWNERSHIP" Stamp: cyan → ink. NOT touched
   (documented design decisions for the PR body): prototype-verbatim red
   rubber stamps/tag chips, danger button cream-on-red, ribbon colors —
   these are the only remaining Lighthouse color-contrast items.

7. **F2 (range thumbs).** `cursor: none` removed from the base
   `::-webkit-slider-thumb` / `::-moz-range-thumb` rules; both re-added
   scoped under `[data-cursor-hidden="true"]` (thumb pseudo-elements aren't
   reached by the `*` rule). Verified in the built CSS.

8. **F3 (Eyes cursor gate).** Removed the inline
   `cursor: cursor && !coarsePointer ? "none" : undefined` (missed
   `!reducedMotion`); the eyes now rely solely on the provider's
   `[data-cursor-hidden]` CSS, so the gate can never disagree with the
   provider. Unused `cursor` pref destructuring removed.

9. **F5 (About eyes).** Added the README's About eye pair: `<Eyes size={44}
gap={10} />` absolutely positioned next to the FOUNDING ENERGY burst
   (bottom 96 / right −58, rotate 8deg), `aria-hidden`, wrapper
   `hidden md:block` so it disappears <768px like the other decorative
   pairs.

10. **F6 (honest CV labels).** Hero ghost CTA: "↓ DOWNLOAD CV" → "CV ON
    LINKEDIN ↗". Resume: "↓ DOWNLOAD .PDF" → "CV ON LINKEDIN ↗", "VIEW
    ONLINE" → "VIEW PROFILE ↗"; the fabricated "LAST UPDATED · 2026.05.20 ·
    84KB" line replaced by "PDF VERSION COMING SOON" (same mono styling).
    Verified in dist: no "DOWNLOAD"/"84KB" remain.

11. **F7 (AudioContext from hover).** `makeSfx().hover()` can no longer
    create the AudioContext — `beep(..., create=false)` bails silently when
    none exists (pointerenter is not a user activation → Chrome autoplay
    warning + silent beeps). The context is created/resumed only from the
    gesture voices (click/pop/grab/drop/yay) plus a one-time window
    pointerdown/keydown pre-warm listener (SSR-guarded — makeSfx runs
    during the island's server render). PointerProvider's fallback Sfx is
    now lazy (`sfx ?? makeSfx()`) so the unused fallback instance no longer
    exists to register a second context via the pre-warm.

12. **QA-4 (perf).** Fresh build + `astro preview` + Lighthouse mobile
    (headless new), server killed afterwards:
    - Before (QA baseline): performance 89, LCP 3.2s, hydration discard.
    - After: **performance 90, accessibility 96, best-practices 100, SEO
      100; FCP 2.7s, LCP 3.0s, TBT 0ms, CLS 0.01; zero console errors.**
    - LCP is still >2.5s, but the trace shows it is bound by the
      render-blocking global stylesheet + self-hosted font chain
      (`render-blocking` est. savings ~1.58s), NOT hydration: bootup time
      0.1s, TBT 0ms. `client:idle` for the island therefore cannot move
      LCP (hydration isn't on the LCP path) while it WOULD delay the
      custom cursor/prefs/sticky restore — risk with no measurable reward,
      so per the "if risky, skip" rule it was skipped. Critical-CSS
      inlining / font subsetting would help but is bundle restructuring
      (explicitly out of scope).

### Self-check

- `npx -y yarn@1 build` — astro check 0 errors/0 warnings, 4 pages built.
- `npx -y yarn@1 lint` — clean (prettier applied via --fix).
- dist spot-checks: no escaped `<style>` payload, no gtag `<script src>`,
  `<main>` landmark with untransformed ancestors, 8 sticky notes with
  content-derived names + describedby hints, honest CV labels, ink
  headings on privacy/terms/404, scoped range-thumb cursor rules.
- Lighthouse `errors-in-console` clean → no hydration warnings (QA-1/QA-2
  SSR rule holds).
- Preview server confirmed killed (port 4321 closed, no astro processes).

## Career-narrative update (FanProStudio AI) · 2026-09-18T01:40:00+05:30

Lead-directed copy update on `feat/handoff-redesign` (PR #1): present role
moves to FanProStudio AI (Lead Frontend Developer, JAN '26 → NOW, AI media
generation); EximPe becomes previous (MAY '22 → APR '26). No git writes.

- **Files touched**: `src/sections/Work.tsx` (new FanProStudio AI mega-card
  above EximPe — 4px ink border, `--shadow-slab`, opposite ±0.35deg
  rotations, LEAD FRONTEND / CURRENT / AI MEDIA stamps, FANPRO + red
  STUDIO AI title, 5 descriptive bullets, `PlaceholderImg` right column, IN
  PRODUCTION rubber stamp moved here; EximPe card gets SHIPPED & SCALED
  stamp, "4 YEARS" stamp, meta → MAY '22 → APR '26; header stamp → "TWO BIG
  ONES · THREE WARM-UPS"), `src/sections/Hero.tsx` (lead paragraph now
  FanPro present-tense; marquee FINTECH → AI MEDIA), `src/sections/About.tsx`
  (para 1 reworked: yellow Hover highlight moves to FanProStudio AI, EximPe
  past tense; para 2 + stat grid untouched per instruction),
  `src/sections/Resume.tsx` (paper rows: FANPROSTUDIO AI · LEAD · 2026→ /
  EXIMPE · LEAD · 2022→26 / SELECTED WINS / STACK — still 4 rows),
  `src/pages/index.astro` (meta/og/twitter description → FanPro, 149 chars),
  `src/portfolio/Portfolio.tsx` (divider "FOUR YEARS OF SHIPPING" → "SEVEN
  YEARS OF SHIPPING", consistent with the Hero "Senior · 7 yrs" sticker).
- **Decisions/deviations**: no invented FanPro metrics — bullets are
  descriptive only, right column is a placeholder with no KPI tiles; all
  EximPe metrics (50K+ MAUs, 25→85%, −50%, −60%, +30%) stay on the EximPe
  card; About stat grid + hero "50K+ MAUs" marquee item kept as career
  stats. Kept About para 2 ("I run a team of two…") verbatim per
  instruction — flagged for lead review since it is present tense and
  EximPe-era. EximPe card keeps its FINTECH stamp (domain label on a dated
  role card, not a present-tense claim). Portfolio.tsx/index.astro are
  P7/P8-owned — edited under the lead's explicit sweep instruction.
- **Self-check**: `npx -y yarn@1 build` — astro check 0 errors, 4 pages
  built; `npx -y yarn@1 lint` — clean. dist/index.html: FANPRO present,
  `MAY '22 → APR '26` rendered, "4 YRS · CURRENT" absent, IN PRODUCTION
  appears once (inside the FanPro card, offset-ordered before the EximPe
  card), SHIPPED & SCALED once, "payments products" absent. No dev servers
  started.

## Minimal-mode design toggle · 2026-09-22T23:40:00+05:30

Second design mode behind a persisted top-right switch, on branch
`feat/minimal-mode` off master merge commit `96e5384` (plan: "Minimal
Mode — top-right switch"; approval artifact mockup
`minimal-mode-preview.html`). Six commit-sized change sets; AGENTS.md
gains the standing two-mode contract.

- **Files touched** (grouped by the six commits):
  1. `feat(minimal): pref, pre-paint attribute, CSS skin, border tokens`
     (`fb18b63`) — src/lib/prefs.tsx (minimal pref + data-minimal sync),
     src/styles/global.css (:root border tokens, @theme hairline/accent,
     html[data-minimal] override block, box-shadow backstop, data-flourish
     rule), src/tokens.ts (hairline/accent/borders exports),
     src/pages/{index,404,privacy,terms}.astro (is:inline pre-paint heads).
  2. `feat(minimal): MinimalToggle + PreferencesMenu row + quiet
progress/ribbon + sfx mute` (`d1fa488`) —
     src/components/chrome/MinimalToggle.tsx (new), PreferencesMenu.tsx,
     ScrollProgress.tsx, SideRibbon.tsx, src/portfolio/Portfolio.tsx
     (toggle mount, SfxMuteBridge minimal, AnchorRescroll).
  3. `feat(minimal): primitive + interaction calm branches` (`98e2b49`) —
     src/components/primitives/MinimalColumn.tsx (new) + null/calm guards
     across 20 primitives/interactive/pointer/text/chrome components.
  4. `feat(minimal): section layouts — Hero, About, Skills, Work` —
     src/sections/{Hero,About,Skills,Work}.tsx: minimal branches (guard
     after hooks) + shared content constants lifted (hero lead pre/em/post,
     CTAs, ABOUT_P1/P2, SKILLS_TITLE + core flags, employer meta/status/
     bullets/WINS).
  5. `feat(minimal): section layouts — Now, Playground, Testimonials,
Resume, Contact` — src/sections/{NowBoard,Playground,Testimonials,
     Resume,Contact}.tsx minimal branches + src/sections/Writing.tsx
     (label-row conditional + hover softening only; otherwise branchless).
  6. `docs(minimal): AGENTS two-mode contract; agent-log entry` —
     AGENTS.md (§Tokens border/override bullets, hairline/accent/Borders
     token names, usePrefs frozen contract + sanction note, new §Two
     design modes, trap 8, three stale HANDOFF_NOTES references retired,
     definition-of-done += both-modes verification), this entry.
- **Decisions/deviations**:
  - prefs.tsx re-syncs `<meta name="theme-color">` at runtime on every
    mode flip (resolves `--color-cream` from CSS) — beyond the plan's
    pre-paint-only swap, so the browser chrome tracks live toggles.
  - Minimal `--text-contact` companions are line-height 1.2 / letter-
    spacing 0 (heading wraps in the 720px column; the fancy 0.85/-0.04em
    would collide).
  - Writing got TWO lead-approved conditionals despite "branchless": the
    fancy corner chip → standard mono label row, and hover softening (no
    inversion/padding shift; accent underline on the hovered title).
  - Minimal Contact drops the SEND EMAIL / BOOK CHAT buttons — the email
    link covers both mailtos; the CTA label constants are still lifted and
    shared with the fancy buttons. Footer keeps PRIVACY/TERMS + back-to-
    top; FOOTER_NOTE const is flag-free (fancy appends 🇮🇳).
  - Playground's minimal sub-line reuses the fancy PLAYGROUND_SUB copy
    verbatim (no separate minimal wording); toys stay fully functional in
    both modes and share their state across the flip.
  - Stamp's quiet chip keeps the fancy 4px 12px padding (only border/
    weight/size/rotation calm down).
  - Minimal section rhythm is explicit paddingTop/paddingBottom longhands
    (52/64; Hero 84/64 to clear the fixed toggle at 375px) per the
    approved mockup, instead of the re-scaled spacing tokens. Hairline
    de-dup: About/NowBoard/Testimonials drop their fancy borderTop (a
    SectionDivider precedes them), Work/Resume/Contact keep it, Playground
    ADDS borders.default (fancy relied on the ink-slab contrast), Skills
    none, Writing keeps automatically.
  - Work's minimal prior-role rows render the FULL meta constants
    (including "· HYBRID/REMOTE/ON-SITE", lowercased) — single-source
    beats the mockup's trimmed strings. Prior names join `name[0]+name[1]`
    - first stamp text; FanPro/EximPe use minimal-only real-casing name
      constants (fancy titles are display-face JSX).
  - The mono label-row style const is repeated per section file — scope
    was section-file edits only; extracting a shared primitive is P0's
    call (flagged as a possible follow-up).
  - Testimonials' header comment lost its stale HANDOFF_NOTES pointer
    (same retirement sweep as the AGENTS.md fixes).
  - Fancy Contact's email link now renders the shared lowercase EMAIL
    constant with `textTransform: uppercase` added to linkStyle — visual
    output unchanged, copy single-sourced.
  - Pixel-truth pass after user feedback ("exactly as it was in the
    artifact"; mockup promoted from guidance to truth for the minimal
    branches): hero availability line moved BELOW the CTAs (mockup
    `.mavail`, static dot), hero nav links → muted / no underline with
    accent COLOR on hover (mockup `.mtop nav a`) instead of underlined ink
    links, About stat rows 12px 2px, Playground hue preview 40px + 10.5px
    degree label, Resume link row marginTop 26 + 13px PDF note, Contact
    heading margin-bottom 22. Lead-approved follow-up: Writing got the
    FULL minimal branch after all (supersedes the plan's "branchless") —
    mockup `.mwr` anatomy: label row with the shared ALL_POSTS link on
    its right, hairline rows grid `86px 1fr auto` (13px 2px) with the
    date+tag cell derived from the shared strings ("2026.03.14 · perf"
    via `date.replace(/ · /g, ".")` + CSS lowercase), Grotesk 15/500
    title with the accent underline on hover/focus, mono 11 read time
    (no arrow); stacks date-line-above-title under the existing compact
    query (not a container query); the earlier fancy-side hover-softening
    and label conditionals were reverted as dead code, so the fancy path
    is byte-identical to its pre-minimal state again. Known remaining
    deltas vs the mockup, all lead-sanctioned: work status renders as the
    accent Stamp chip (mockup: plain red text), bouncy boi keeps the real
    site's arena + BOING interaction model (mockup clicks the ball
    directly), and shared-copy constants beat mockup-only wordings
    ("see the work →" / "all posts →" arrows, social link labels,
    "↑ back to top", full prior-role meta strings).
- **Self-check**: `npx -y yarn@1 build` — astro check 0 errors /
  0 warnings, 4 pages built. `npx -y yarn@1 lint` — clean (prettier
  applied via --fix). dist CSS contains the generated `.text-ink`,
  `.text-slate`, `decoration-hairline`, `decoration-accent` utilities
  (minimal link classes verified referenced). No dev servers started —
  visual QA runs next. No git writes by this agent; lead commits and
  opens the PR.
