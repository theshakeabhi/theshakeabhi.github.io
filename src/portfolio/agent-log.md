# agent-log — src/portfolio/

Scoped, append-only audit log for `src/portfolio/`. Every agent that changes files
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

- **Files touched**: `Portfolio.tsx` — divider 1 item "SEVEN YEARS OF
  SHIPPING" → "SIX YEARS OF SHIPPING" (resume: 6 years).
- **Decisions/deviations**: RIBBON_ITEMS untouched ("✶ SEP 2026" already
  correct). Divider items are fancy-only flourish content, so caps IS the
  natural case here — no per-mode duplication involved.
- **Self-check**: gates green (check 0/0/0, lint clean, build OK); dist
  contains "SIX YEARS OF SHIPPING" ×6 (marquee repeat), zero "SEVEN
  YEARS".
