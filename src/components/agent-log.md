# agent-log — src/components/

Scoped, append-only audit log for `src/components/`. Every agent that changes files
in this folder appends an entry here (newest last), IN ADDITION to the
one-line summary entry in the repo-root `agent-log.md` (the chronological
master). House format: `## <Topic> · <ISO+05:30>` + **Files touched** /
**Decisions/deviations** / **Self-check**. Never edit an existing entry.
See AGENTS.md §Protocols.

## Log seeded · 2026-09-23T01:12:10+05:30

Per-folder agent logs introduced repo-wide (branch feat/minimal-mode).
All history before this date — the P0–P8 brutalist port and the
minimal-mode feature — lives in the repo-root `agent-log.md`.

## Analytics: GoatCounter + GA4 events · 2026-11-05T21:00:00+05:30

- **Files touched**: new `src/components/Analytics.astro` (GoatCounter tag + bundled script installing delegated link tracking, mounted in every page head); `chrome/CookieConsent.tsx` copy now mentions cookieless counting.
- **Self-check**: `yarn build` + eslint clean; dist pages all carry the GoatCounter tag.
