# agent-log — public/

Scoped, append-only audit log for `public/`. Every agent that changes files
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

- **Files touched**: none by this agent — `cv.pdf` (the real one-page
  resume, 101,719 bytes) was placed here by the lead ahead of this task
  and is now load-bearing: Hero CTA2 ("Grab the CV ↓") and both Resume
  CTAs/links point at `/cv.pdf`, and the Resume "PDF version coming
  soon" note is gone.
- **Decisions/deviations**: file is untracked until the lead commits;
  build copies it into dist/ (verified present, 101,719 bytes).
- **Self-check**: `npx astro build` ships dist/cv.pdf; bundle references
  `/cv.pdf` ×2.
