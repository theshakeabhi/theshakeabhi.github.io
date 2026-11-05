# agent-log — src/components/interactive/

Scoped, append-only audit log for `src/components/interactive/`. Every agent that changes files
in this folder appends an entry here (newest last), IN ADDITION to the
one-line summary entry in the repo-root `agent-log.md` (the chronological
master). House format: `## <Topic> · <ISO+05:30>` + **Files touched** /
**Decisions/deviations** / **Self-check**. Never edit an existing entry.
See AGENTS.md §Protocols.

## Log seeded · 2026-09-23T01:12:10+05:30

Per-folder agent logs introduced repo-wide (branch feat/minimal-mode).
All history before this date — the P0–P8 brutalist port and the
minimal-mode feature — lives in the repo-root `agent-log.md`.

## ScreenCarousel (new) · 2026-11-05T11:55:00+05:30

- **Files touched**: `ScreenCarousel.tsx` (new) — manual product-screenshot carousel: prev/next (Hover-wrapped in fancy), dot pager, ←/→ while focused, touch swipe, aria carousel/slide roles + polite live caption; no autoplay.
- **Decisions/deviations**: both modes from ONE slide list — fancy: 4px ink frame, card shadow, yellow 01 / 04 chip, red next button; minimal: hairline frame, mono "← prev · n / N · next →" row. Track animates only when !minimal && !reducedMotion. Tokens only; hard shadows only.
- **Self-check**: astro check 0/0/0, eslint clean; headless screenshots at 1440 in both modes.

## Vinyl + ShakeMe (new) · 2026-11-05T13:05:00+05:30

- **Files touched**: `Vinyl.tsx` (new) — live Last.fm record: label + caption show the latest scrobble (fallback "On rotation: techno · hard tech · schranz · indie"); spins (≈33⅓) with the tonearm down only while now-playing; label type scales via container `cqw`; grab-and-spin IN PLACE (rotation tracks pointer angle around the centre), auto-spin pauses while held. `vinylScratch.ts` (new) — noise→bandpass + saw→lowpass scratch synth driven by angular speed; AudioContext only from pointerdown (trap 5); gated on `usePrefs().sfx`; deliberately NOT added to the frozen Sfx contract. `ShakeMe.tsx` (new) — yellow tilted sticker button: sfx.yay + onShake + 26-piece confetti burst (`confetti-pop`), hover jitter; reduced motion → sound only.
- **Decisions/deviations**: owner picks (vinyl + shake me; vinyl rotate-only, not movable). All fancy-only (null in minimal, guard after hooks). Hard shadows only; tokens only.
- **Self-check**: CDP mouse-drag test — disc rotates in place, no console errors/warnings; screenshots 1024/1280/1440; build + eslint clean.

## Vinyl caption centred · 2026-11-05T16:10:00+05:30

- **Files touched**: `Vinyl.tsx` — caption block `textAlign: center`, eyebrow row `justifyContent: center` (owner: centre "On rotation / Techno · hard tech · schranz · indie" under the disc).
- **Self-check**: 1440/1024 screenshots; build + eslint clean.
