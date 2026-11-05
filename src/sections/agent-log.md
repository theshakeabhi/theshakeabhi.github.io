# agent-log — src/sections/

Scoped, append-only audit log for `src/sections/`. Every agent that changes files
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

Content sync to the new master resume (`../abhishek-chandrasenan-resume-master.tex`);
all copy edits land in the shared module-level constants so BOTH design
modes update from one edit (AGENTS.md §Two design modes).

- **Files touched**: `Hero.tsx` (lead paragraph → "Software engineer …
  Most recently Frontend Lead at FanPro Studio"; ROLE_LINE → "software
  engineer · bengaluru · IST"; sticker 7 yrs → 6 yrs; CTA2 "CV on
  LinkedIn ↗" → "Grab the CV ↓" hitting the real `/cv.pdf`),
  `About.tsx` (P1/P2 rewritten resume-true; ABOUT_P1 part keys reordered
  to sentence order pre→link→mid→strong→post in BOTH render branches;
  STATS now 50K+ MAUs / 25→85% Mobile KYC / −60% incidents / 39→81
  Lighthouse), `Work.tsx` (FanPro Studio naming + Frontend Lead + Mar→Sep
  '26 + 5 resume-true bullets; EximPe Lead Frontend Engineer + May '22 →
  Mar '26 + 5 resume-true bullets; WINS tiles → KYC/transaction/JS
  bundle/Lighthouse; PRIOR_ROLES → Sawo Labs + QBurst only, Zomato
  DELETED; foundation eyebrow 2019→2022 becomes 2020→2022; header stamp
  THREE → TWO WARM-UPS), `Skills.tsx` (+Stripe t2, +PostgreSQL t2,
  +GraphQL t3, +React Native t3 — 22 entries, core flags untouched),
  `NowBoard.tsx` (UPDATED → Sep '26), `Resume.tsx` (real PDF: primary
  "Download the PDF ↓" → /cv.pdf, ghost "LinkedIn profile ↗"; PDF_NOTE
  const + both render sites deleted; paper mock rows + SOFTWARE ENGINEER
  subtitle). `Contact.tsx` untouched (phone stays OFF the site).
- **Decisions/deviations**: (1) Zomato removed entirely — not on the
  resume; the 2026-09-22 minimal-mode mock-casing rulings for "Zomato ·
  sales intern" and "QBurst · SWE → intern" are SUPERSEDED by this
  refresh (QBurst is now "Software Engineer" per resume). (2) Unbacked
  metrics dropped: −50% API latency, +30% revenue flows, mobile
  _onboarding_ completion (now KYC). (3) Prior-roles fancy grid
  `lg:grid-cols-3` → `lg:grid-cols-2` — the lead's note assumed auto-fit;
  with a fixed 3-track grid two cards left an empty third track, so 2-up
  is the intent-preserving fix. (4) QBurst card carries 2 bullets (SHIP /
  API), both derived from the single resume line — keeps the tilt card
  visually balanced without inventing facts. (5) FanPro sub-tags: "AI
  media" + "UAE · Remote" flagged `sub` so the minimal sub-line reads
  "frontend lead · ai media · uae · remote · in production"; EximPe keeps
  "founding frontend · fintech" sub-tokens (ruling №3 intact), PA-CB is a
  fancy-only chip. (6) Sawo meta "Bangalore · Remote" per resume
  (was "Bengaluru · Hybrid").
- **Self-check**: `npx astro check` 0/0/0 (re-run after lint --fix);
  `npx -y yarn@1 lint` clean; `npx astro build` OK (5 pages). dist
  verified via python string-scan: new dates/roles/stats/skills present
  (natural case — fancy caps are CSS), Zomato/FanProStudio/"coming
  soon"/API-latency absent from index.html AND the JS bundle; /cv.pdf
  referenced ×2 in the bundle and shipped in dist/. Not live-QA'd in a
  browser this pass — recommend a quill sweep of both modes.

## Resume data refresh — Zomato override · 2026-09-23T01:37:34+05:30

USER OVERRIDE (relayed by the lead, crossed with the previous entry's
finish): the Zomato prior role STAYS. This entry supersedes the previous
entry's decision (1) — logs are append-only, so the correction is a new
entry rather than an edit.

- **Files touched**: `Work.tsx` only — Zomato PRIOR_ROLES entry restored
  VERBATIM from `git show HEAD:src/sections/Work.tsx` (read-only; "sales
  intern" / "2 mos" stamps, "Jul '19 → Aug '19 · Kochi · On-site" meta,
  EARLY/OPS/DEAL bullets); Foundation eyebrow back to "✶ 2019 → 2022 ·
  THE FOUNDATION ✶"; header stamp back to "THREE WARM-UPS"; prior-roles
  fancy grid back to `lg:grid-cols-3` (the 2-col judgment call is mooted
  with 3 cards); comments updated to record the override.
- **Decisions/deviations**: Zomato kept by owner's explicit choice
  despite absence from the resume; Sawo Labs and QBurst remain
  resume-corrected. The 2026-09-22 mock-casing ruling for "Zomato ·
  sales intern" stands again (only the QBurst "SWE → intern" ruling
  remains superseded). Both modes covered by the one shared array —
  minimal rows derive "Zomato · sales intern" from the same constants.
- **Self-check**: `npx astro check` 0/0/0; `npx -y yarn@1 lint` clean;
  `npx astro build` OK (5 pages). dist scan: "Zomato"/"sales intern"/
  "Kochi · On-site"/"2019 → 2022"/"THREE WARM-UPS" present in HTML and
  JS bundle; "2020 → 2022"/"TWO WARM-UPS" gone; all other refresh
  strings unchanged.

## Remove Writing + Playground sections · 2026-11-05T10:59:30+05:30

- **Files touched**: deleted `Writing.tsx`, `Playground.tsx`; `Hero.tsx` (NAV drops the "Writing" → #writing link), `Resume.tsx` (09 → 06), `Contact.tsx` (10 → 07).
- **Decisions/deviations**: owner request — Writing was placeholder posts (all hrefs → dev.to profile), Playground cut. Slab labels and minimal `NN / name` rows renumbered together so both modes match. `Testimonials.tsx` (still unmounted, content empty) keeps its `08` label — renumber it when it ships.
- **Self-check**: `yarn build` (astro check 0/0/0) OK; `npx eslint .` clean.

## Now board copy refresh · 2026-11-05T11:04:00+05:30

- **Files touched**: `NowBoard.tsx` — notes cut from 8 to 5: Building (Moments), Reading (Atomic Habits), Listening (unchanged, pending a Spotify decision), Drinking (cortado / French press), Open to (any development). Mentoring (n3), Obsessing over (n5), Avoiding (n6) removed; stamp → "Updated Nov '26".
- **Decisions/deviations**: surviving ids kept so stored `sticky_v2_<id>` positions still apply (trap 4); defaults re-laid 3-over-2 on the 1280×560 board; n1/n7/n8 resized for the longer copy; n8 recoloured lavender so it does not repeat n1 yellow. Both modes read the one NOTES array.
- **Self-check**: build (astro check 0/0/0) + eslint clean; new copy present in the bundle.

## Live Listening note · 2026-11-05T11:21:00+05:30

- **Files touched**: `NowBoard.tsx` — `withLiveListening` swaps n4's body for the latest Last.fm scrobble ("On repeat right now" / "Last played": "track" by artist) in all three renders (minimal rows, compact list, cork board).
- **Decisions/deviations**: hook called before the minimal guard; static n4 copy is the SSR/fallback text, so first paint is identical. Plain text, no link (notes are drag targets).
- **Self-check**: build + eslint clean.

## Listening fallback copy · 2026-11-05T11:30:00+05:30

- **Files touched**: `NowBoard.tsx` — n4 static/fallback body now owner copy: techno, hard techno, schranz, indie.
- **Self-check**: build + eslint clean.
