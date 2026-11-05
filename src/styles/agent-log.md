# agent-log — src/styles/

Scoped, append-only audit log for `src/styles/`. Every agent that changes files
in this folder appends an entry here (newest last), IN ADDITION to the
one-line summary entry in the repo-root `agent-log.md` (the chronological
master). House format: `## <Topic> · <ISO+05:30>` + **Files touched** /
**Decisions/deviations** / **Self-check**. Never edit an existing entry.
See AGENTS.md §Protocols.

## Log seeded · 2026-09-23T01:12:10+05:30

Per-folder agent logs introduced repo-wide (branch feat/minimal-mode).
All history before this date — the P0–P8 brutalist port and the
minimal-mode feature — lives in the repo-root `agent-log.md`.

## shake + confetti-pop keyframes · 2026-11-05T13:05:00+05:30

- **Files touched**: `global.css` — added `@keyframes shake` (decaying hero shake) and `@keyframes confetti-pop` (reads --dx/--dy/--rot). Reduced-motion global rule already collapses both.
- **Self-check**: build clean.

## Content max-width token · 2026-11-05T14:10:00+05:30

- **Files touched**: `global.css` — plain `:root` gains `--content-max: 1280px` and `--spacing-gutter: max(var(--spacing-slab-x), calc((100% - var(--content-max)) / 2))` (the % resolves against the slab where used).
- **Decisions/deviations**: owner ask — content stops growing past the 1440 design width; slab backgrounds, marquees and dividers stay full-bleed. Not in @theme (var()-only consumer, tree-shake rule).
- **Self-check**: screenshots 1440 (unchanged) / 1920 / 2560 in both modes.

## --ribbon-w + right gutter · 2026-11-05T16:00:00+05:30

- **Files touched**: `global.css` — `--ribbon-w` (0px; 36px at ≥768 when not minimal) beside the content-max tokens.
- **Decisions/deviations**: the fixed SideRibbon overlays the slab's right padding, so the visible right gutter was 36px thinner than the left (owner, iPad mini). Mirrors the ribbon's own render rule (< 768 / minimal → none), and the pre-paint head script already sets data-minimal, so first paint is right.
- **Self-check**: build clean.
