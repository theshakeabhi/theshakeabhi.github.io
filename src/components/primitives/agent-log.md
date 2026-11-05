# agent-log — src/components/primitives/

Scoped, append-only audit log for `src/components/primitives/`. Every agent that changes files
in this folder appends an entry here (newest last), IN ADDITION to the
one-line summary entry in the repo-root `agent-log.md` (the chronological
master). House format: `## <Topic> · <ISO+05:30>` + **Files touched** /
**Decisions/deviations** / **Self-check**. Never edit an existing entry.
See AGENTS.md §Protocols.

## Log seeded · 2026-09-23T01:12:10+05:30

Per-folder agent logs introduced repo-wide (branch feat/minimal-mode).
All history before this date — the P0–P8 brutalist port and the
minimal-mode feature — lives in the repo-root `agent-log.md`.

## Slab padding longhands · 2026-11-05T13:05:00+05:30

- **Files touched**: `Slab.tsx` — `padding` shorthand → paddingTop/Bottom/Left/Right longhands (same values).
- **Decisions/deviations**: callers override paddingTop/paddingBottom; mixing shorthand + longhand logged a React "Removing paddingBottom" warning on every minimal ⇄ funky re-render (pre-existing; DoD requires zero console warnings).
- **Self-check**: CDP console capture clean in both modes.

## spacing.gutter · 2026-11-05T14:10:00+05:30

- **Files touched**: `tokens.ts` — `spacing.gutter` = var(--spacing-gutter). `Slab.tsx` — horizontal padding now `spacing.gutter` (== slabX up to 1440, centres a 1280 content box beyond).
- **Self-check**: build + eslint clean; 1440 renders identically.

## spacing.gutterRight · 2026-11-05T16:00:00+05:30

- **Files touched**: `tokens.ts` (`spacing.gutterRight` = gutter + ribbon), `Slab.tsx` (paddingRight uses it).
- **Self-check**: 768/1440 screenshots — left and right gutters match.
