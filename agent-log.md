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
