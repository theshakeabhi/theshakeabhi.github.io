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
