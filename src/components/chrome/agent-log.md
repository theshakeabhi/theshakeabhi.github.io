# agent-log — src/components/chrome/

Scoped, append-only audit log for `src/components/chrome/`. Every agent that changes files
in this folder appends an entry here (newest last), IN ADDITION to the
one-line summary entry in the repo-root `agent-log.md` (the chronological
master). House format: `## <Topic> · <ISO+05:30>` + **Files touched** /
**Decisions/deviations** / **Self-check**. Never edit an existing entry.
See AGENTS.md §Protocols.

## Log seeded · 2026-09-23T01:12:10+05:30

Per-folder agent logs introduced repo-wide (branch feat/minimal-mode).
All history before this date — the P0–P8 brutalist port and the
minimal-mode feature — lives in the repo-root `agent-log.md`.

## Toggle relabelled FUNKY (minimal is default) · 2026-10-27T01:27:46+05:30

- **Files touched**: `MinimalToggle.tsx` — label MINIMAL → FUNKY,
  `aria-checked={!minimal}`, knob right + accent when funky.
  `PreferencesMenu.tsx` — "Minimal mode" row → "Funky mode" via a new
  `invert` flag on TOGGLES; minimal-mode note now says "apply to funky mode".
- **Decisions/deviations**: both switches still write the `minimal` pref;
  only presentation inverted, so the frozen prefs contract is untouched.
- **Self-check**: headless 1440 run — fresh visit minimal, FUNKY click →
  full-fat (+ flourishes, theme-color cream), persists over reload, flips
  back; zero console errors/warnings.
