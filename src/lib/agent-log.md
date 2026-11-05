# agent-log — src/lib/

Scoped, append-only audit log for `src/lib/`. Every agent that changes files
in this folder appends an entry here (newest last), IN ADDITION to the
one-line summary entry in the repo-root `agent-log.md` (the chronological
master). House format: `## <Topic> · <ISO+05:30>` + **Files touched** /
**Decisions/deviations** / **Self-check**. Never edit an existing entry.
See AGENTS.md §Protocols.

## Log seeded · 2026-09-23T01:12:10+05:30

Per-folder agent logs introduced repo-wide (branch feat/minimal-mode).
All history before this date — the P0–P8 brutalist port and the
minimal-mode feature — lives in the repo-root `agent-log.md`.

## Minimal becomes the default design mode · 2026-10-27T01:27:46+05:30

- **Files touched**: `prefs.tsx` — `DEFAULTS.minimal` false → true; the
  first-run attribute-sync comment now describes the funky flash it guards.
- **Decisions/deviations**: pref key/name unchanged (`minimal`, frozen
  contract); only the default flipped. Stored `minimal: false` keeps a
  visitor on funky; no stored value now means minimal.
- **Self-check**: build/check/lint clean; SSR + first client render agree
  (no hydration warnings in a headless run).

## Last.fm now-playing hook · 2026-11-05T11:21:00+05:30

- **Files touched**: `useLastfmTrack.ts` (new) — fetches `user.getrecenttracks` (limit 1) for `theshakeabhi`; 90s poll while visible + refetch on visibilitychange; null on SSR/first paint/failure/empty key.
- **Decisions/deviations**: owner linked Spotify → Last.fm (Spotify's API needs a secret; GitHub Pages has no backend). The read-only API key ships in source by design; the shared secret is never used. `LASTFM_API_KEY` is empty until the owner provides it — the hook is a no-op until then.
- **Self-check**: build (astro check 0/0/0) + eslint clean.

## Last.fm API key set · 2026-11-05T11:24:00+05:30

- **Files touched**: `useLastfmTrack.ts` — `LASTFM_API_KEY` filled with the owner's read-only key (shared secret deliberately NOT stored anywhere).
- **Self-check**: live call returns 200 with `access-control-allow-origin: *`; account has 0 scrobbles so far, so the static fallback shows until Spotify scrobbling starts. Build + eslint clean.

## Shared Last.fm request · 2026-11-05T13:05:00+05:30

- **Files touched**: `useLastfmTrack.ts` — module-level 30s shared promise so NowBoard + Hero vinyl poll Last.fm once; per-instance AbortController dropped (the shared fetch outlives any one caller).
- **Self-check**: build + eslint clean.

## Last.fm removed · 2026-11-05T16:55:00+05:30

- **Files touched**: `useLastfmTrack.ts` deleted (owner deleted the Last.fm account).
- **Decisions/deviations**: the shipped read-only API key goes with it; nothing else in src/lib depended on it.
- **Self-check**: no `audioscrobbler` / key in dist; build + eslint clean.
