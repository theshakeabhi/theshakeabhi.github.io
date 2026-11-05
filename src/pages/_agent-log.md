# agent-log — src/pages/

Scoped, append-only audit log for `src/pages/`. Every agent that changes files
in this folder appends an entry here (newest last), IN ADDITION to the
one-line summary entry in the repo-root `agent-log.md` (the chronological
master). House format: `## <Topic> · <ISO+05:30>` + **Files touched** /
**Decisions/deviations** / **Self-check**. Never edit an existing entry.
See AGENTS.md §Protocols.

## Log seeded · 2026-09-23T01:12:10+05:30

Per-folder agent logs introduced repo-wide (branch feat/minimal-mode).
All history before this date — the P0–P8 brutalist port and the
minimal-mode feature — lives in the repo-root `agent-log.md`.

## Resume data refresh · 2026-09-23T01:33:39+05:30

- **Files touched**: `index.astro` — head copy only: title → "Abhishek
  Chandrasenan — Software Engineer"; meta/og/twitter description → the
  6-years fintech/dev-tools/AI-media summary ending "…entirely too many
  easter eggs."; og:image:alt swaps "senior frontend engineer" →
  "software engineer" (brutalist-type description kept).
- **Decisions/deviations**: GA/consent + pre-paint minimal-mode scripts
  untouched, per instruction. No structural changes.
- **Self-check**: `npx astro check` 0/0/0, `npx -y yarn@1 lint` clean,
  `npx astro build` OK; dist/index.html carries the new title ×3
  (title/og/twitter) and the new alt text.

## Renamed to \_agent-log.md — log was a public route · 2026-09-23T01:52:00+05:30

- **Files touched**: this file — `agent-log.md` → `_agent-log.md`. Bare
  `.md` files in `src/pages/` are routed by Astro, so the log shipped as
  the public page `/agent-log` (the 5th page in `astro build`). The
  underscore prefix excludes it from routing.
- **Decisions/deviations**: `public/agent-log.md` had the same class of
  leak (public/ ships verbatim) and was removed — its entries migrated to
  the repo-root master under `[public/]` tags. AGENTS.md §Protocols now
  documents both special folders.
- **Self-check**: build back to 4 pages; no `/agent-log` route and no
  `agent-log.md` anywhere in dist; `cv.pdf` still ships.

## Minimal becomes the default design mode · 2026-10-27T01:27:46+05:30

- **Files touched**: `index.astro`, `404.astro`, `privacy.astro`,
  `terms.astro` — `<html>` ships `data-minimal`; the pre-paint script
  now REMOVES it when `portfolio.tweaks` has `minimal: false` (was: add
  on `true`). index's static theme-color is now minimal paper (#fbfbf9),
  swapped to full-fat cream (#f5f1e8) by the script for funky visitors.
- **Decisions/deviations**: storage failure / no JS now falls back to
  minimal, matching the pre-rendered island.
- **Self-check**: all four built pages carry `<html lang="en" data-minimal>`.

## Remove Writing + Playground sections · 2026-11-05T10:59:30+05:30

- **Files touched**: `index.astro` — meta description no longer advertises "writing, playground".
- **Self-check**: build OK.

## Privacy: Last.fm disclosure · 2026-11-05T11:21:00+05:30

- **Files touched**: `privacy.astro` — §04 discloses the browser-side Last.fm lookup (IP visible to Last.fm, no cookies); meta description + "Last updated" (November 5, 2026) bumped.
- **Self-check**: build OK.

## Privacy: Last.fm disclosure removed · 2026-11-05T16:55:00+05:30

- **Files touched**: `privacy.astro` — §04 Last.fm paragraph and the meta-description mention removed (the site makes no third-party request besides opt-in GA again).
- **Self-check**: build OK.

## Boot screen over funky hydration reflow · 2026-11-05T17:30:00+05:30

- Boot overlay (#boot) for stored-funky visitors; see root agent-log.md.

## Boot screen: first-load only + fill to 100% · 2026-11-05T18:00:00+05:30

- Files: index.astro, prefs.tsx, global.css. Gated by sessionStorage "portfolio.booted"; bar animates 0→100% (1.2s) and release waits for it (+hold); failsafe 3.5s.

## Boot cover on repeat loads (quiet) · 2026-11-05T18:20:00+05:30

- Repeat loads in a session now get the cream cover without the bar (data-boot-quiet) so the minimal-first frame never shows. Files: index.astro, prefs.tsx, global.css.
