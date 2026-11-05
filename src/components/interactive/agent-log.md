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

## Vinyl genres: + house, acid tech · 2026-11-05T16:15:00+05:30

- **Files touched**: `Vinyl.tsx` — ON_ROTATION is now built from a list (Techno · house · acid tech · hard tech · schranz · indie) with NBSPs inside each genre, so the centred caption only wraps between genres.
- **Decisions/deviations**: owner request; the Now-board Listening fallback copy is unchanged.
- **Self-check**: 1024/1440 screenshots; build + eslint clean.

## Side A: synthesised acid loop on the hero vinyl · 2026-11-05T16:40:00+05:30

- **Files touched**: `acidLoop.ts` (new) — 132 BPM Web Audio sequencer (sine kick, 3-burst clap on 2 & 4, open/closed noise hats, 303-style saw → resonant LP acid line with accents + slides, A minor); lookahead scheduling (25ms tick / 120ms window); one `rate` scales tempo + pitch like a platter; `setLoopRate` / `settleLoopRate` (450ms ease back to 1) / `stopLoop(windDown)` (1.1s power-off sag) / `onLoopChange`. `vinylAudio.ts` (new) — the shared AudioContext (`getAudioCtx` gesture-only, `peekAudioCtx`). `vinylScratch.ts` — uses the shared context. `Vinyl.tsx` — quick press on the disc or the new "▶ Play side A / ■ Stop" button toggles the loop; while playing, angular drag speed drives the rate (backspin → slow + dull), holding still stalls it, release settles it; disc spins + arm drops for the loop or a Last.fm now-playing; caption shows "Side A · an acid loop, synthesised in your browser"; auto-stops on scroll-away (IntersectionObserver), tab hide, sound off, minimal, unmount.
- **Decisions/deviations**: no audio files / licensing; play turns the sfx pref on (pressing play is consent to sound); the synth is NOT added to the frozen Sfx contract; fancy-only (Vinyl renders null in minimal; < lg the vinyl column is hidden, so phones don't get Side A yet).
- **Self-check**: CDP-driven run (real mouse events): play → button ■ Stop / aria-pressed / disc running / arm 24°; scratch keeps it playing; scroll away + back → stopped; disc click starts, second click winds down and stops; zero console errors; screenshots 1024/1280/1440; build + eslint clean. Audio itself not audible in headless — needs a listen.

## Last.fm removed from the vinyl · 2026-11-05T16:55:00+05:30

- **Files touched**: `Vinyl.tsx` — no track hook; label is always "shakeabhi / side a · 33⅓", caption "On rotation · genres" or "Now spinning · Side A"; disc + tonearm follow Side A only; the Last.fm track link branch is gone.
- **Self-check**: Side A CDP run unchanged (play / scratch / scroll-stop / disc toggle), zero console errors.
