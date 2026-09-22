# agent-log — src/content/

Scoped, append-only audit log for `src/content/`. Every agent that changes files
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

- **Files touched**: `writing.ts` — placeholder post titles must not cite
  unbacked metrics: post 1 → "Lighthouse 39 to 81 without the rewrite
  anyone was asking for" (PERF), post 3 → "The 25→85% KYC story (and the
  four screens we deleted)" (PRODUCT). Posts 2/4/5, dates, read times,
  tags, dev.to hrefs unchanged.
- **Decisions/deviations**: both replacement metrics (39→81 Lighthouse,
  25→85% KYC) are on the master resume; the old "50% API latency" and
  "onboarding" phrasings were not.
- **Self-check**: gates green; dist shows both new titles, zero "API
  latency"/"onboarding completion" strings anywhere in dist.
