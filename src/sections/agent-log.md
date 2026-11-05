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

## Stack: drop the "(probably)" aside · 2026-11-05T11:36:00+05:30

- **Files touched**: `Skills.tsx` — minimal: removed the "(probably — the bold ones are non-negotiable)" footnote; fancy: removed the yellow "(probably)" from the h2; unused `yellow` import dropped.
- **Decisions/deviations**: owner request, both modes. Fancy subline "Hover anything. Big ones are non-negotiable…" kept (not asked).
- **Self-check**: build (astro check 0 errors) + eslint clean.

## Hero: eyes off the lead copy · 2026-11-05T11:41:00+05:30

- **Files touched**: `Hero.tsx` — bottom-left eye pair (absolute left 80 / bottom 70) moved IN FLOW under the CTA buttons (lg+ only, same cutoff as the decor layer); right-hand pair (right 110 / top 655) now `hidden xl:block`.
- **Decisions/deviations**: owner report — at 1440 the wrapped lead paragraph ran over the bottom-left pair; between lg and xl the right pair sat behind SEE THE WORK. Fancy-only (minimal renders no Eyes).
- **Self-check**: headless-Chrome screenshots at 1100/1280/1440 — no eye/text overlap; build + eslint clean.

## Work: product screenshot carousels · 2026-11-05T11:55:00+05:30

- **Files touched**: `Work.tsx` — FANPRO_SLIDES (explore, images, socials, create post) and EXIMPE_SLIDES (exporter login, merchant sign-up) replace both "Product Screens" PlaceholderImg slots in fancy and are added under each employer's bullets in minimal; PlaceholderImg import dropped.
- **Self-check**: build + eslint clean; screenshots verified in both modes.

## Hero: start-here arrow, wordmark, nav spacing · 2026-11-05T12:05:00+05:30

- **Files touched**: `Hero.tsx` — lead/CTA gap `lg:gap-[60px]` → `lg:gap-[150px]` so the "start here" Arrow (x −110…−10 off the CTA column) never lands on the lead copy; CTA column `flexShrink: 0` (1024 was wrapping "SEE THE / WORK"); `LOGO_TEXT` "ABHISHEK.SH" → "SHAKEABHI" (both modes; "A" chip + rave egg unchanged); fancy slab paddingTop 70 → 100 to drop the nav row clear of the fixed FUNKY toggle; SENIOR stamp top 130 → 160 to track it.
- **Decisions/deviations**: owner requests. Minimal hero untouched apart from the shared wordmark.
- **Self-check**: headless screenshots 1024/1100/1280/1440 (fancy) + 1440 (minimal) — arrow, nav, toggle and stamp all clear; build + eslint clean.

## About portrait + hero nav nudge · 2026-11-05T12:12:00+05:30

- **Files touched**: `About.tsx` — owner photo (`/portrait.jpg`, shared PORTRAIT src/alt) replaces the Portrait PlaceholderImg in fancy (300×380, ink border, −3° tilt, tape/burst/eyes unchanged) and is added to minimal as a 120px hairline-bordered image under the label row; PlaceholderImg import dropped. `Hero.tsx` — fancy paddingTop 100 → 88 (owner: nav "a bit more up"), SENIOR stamp top 160 → 148 to track it.
- **Self-check**: screenshots at 1024/1440 (fancy) and 1440 (minimal); build + eslint clean.

## Hero: SENIOR · 6 YRS stamp removed · 2026-11-05T12:18:00+05:30

- **Files touched**: `Hero.tsx` — dropped the cyan "★ Senior · 6 yrs" Stamp from the fancy decor layer (owner request) and the now-unused Stamp import. Fancy-only (minimal never rendered it).
- **Self-check**: build + eslint clean.

## Hero: SHAKE / ABHI mega name + Shake Mon egg · 2026-11-05T12:30:00+05:30

- **Files touched**: `Hero.tsx` — fancy h1 is now the mono intro line ("Hi, I'm Abhishek Chandrasenan. Online, I go by", inside the h1 for SEO/AT) + mega SHAKE / ABHI (Ab|hi tilted tail like the old CHANDRA|SENAN). Clicking the red word toggles NICK_EGG "Mon" with a Caveat "(what everyone actually calls me)" note + sfx.pop. Both corner tapes moved off fixed slab coords onto the red word (lg+ only) — the shorter name left them on the lead copy at 1024. `usePointer` + `useState` added (hooks before the minimal guard).
- **Decisions/deviations**: owner picked Shake Abhi (handle/domain) as headline, Shake Mon (what people actually call them) as the egg; intro copy says "Online, I go by" so it stays true. Minimal hero keeps the real-name document heading (fancy-only display change).
- **Self-check**: screenshots at 1024/1440 incl. the Mon state; build + eslint clean.

## Hero: SHIPS FAST burst + word tapes removed · 2026-11-05T12:36:00+05:30

- **Files touched**: `Hero.tsx` — removed the yellow "SHIPS FAST!" Burst (decor layer) and both corner Tapes on the red nickname (owner request); unused Burst/Tape imports dropped. Fancy-only. Right-side composition left open for the next owner pass.
- **Self-check**: build + eslint clean; 1440 screenshot.

## About: portrait removed from minimal · 2026-11-05T12:40:00+05:30

- **Files touched**: `About.tsx` — dropped the 120px portrait from the minimal branch (owner call: minimal stays photo-free); fancy portrait unchanged.
- **Decisions/deviations**: deliberate per-mode content difference, owner-directed.
- **Self-check**: build + eslint clean.

## Hero right column: vinyl + SHAKE ME · 2026-11-05T13:05:00+05:30

- **Files touched**: `Hero.tsx` — lg+ right column (top 140, right clamp(56px,7.6vw,110px)): `<Vinyl size=clamp(170px, 34vw−200px, 290px)>` over `<ShakeMe>`; slab runs the `shake` keyframe per click (rAF restart, 650ms clear, skipped under reduced motion); old xl-only right eye pair removed (it sat behind the CTAs at 1280 and the vinyl replaces it); Mon note font trimmed to clamp(20px,2.2vw,32px).
- **Self-check**: screenshots 1024/1280/1440 incl. mid-shake; build + eslint clean.

## Hero: CTAs in a row, start-here arrow removed, eyes to the right column · 2026-11-05T13:15:00+05:30

- **Files touched**: `Hero.tsx` — lead + CTAs no longer a lg flex row: paragraph (lg max-width min(680px, 100% − 320px) so it never runs under the right column) then SEE THE WORK / GRAB THE CV side by side; "start here" Arrow removed (import dropped); the in-flow eye pair moved into the right column under SHAKE ME.
- **Decisions/deviations**: owner requests. Supersedes the earlier 150px-gap arrow fix.
- **Self-check**: screenshots 1024/1280/1440; build + eslint clean.

## Work: rubber stamps removed (fancy) · 2026-11-05T13:30:00+05:30

- **Files touched**: `Work.tsx` — dropped the "IN PRODUCTION" (FanPro) and "SHIPPED & SCALED" (EximPe) RubberStamps from the fancy cards; RubberStamp import and the now-unused EXIMPE_STATUS constant removed; header/comments updated.
- **Decisions/deviations**: owner request, fancy only. FANPRO_STATUS stays — minimal still renders "in production" as its accent status word.
- **Self-check**: build + eslint clean; 1440 screenshot of the card seam (stamps gone).

## Work: EximPe CASE STUDY button removed · 2026-11-05T13:33:00+05:30

- **Files touched**: `Work.tsx` — dropped the fancy EximPe "CASE STUDY →" MagneticButton (it had no target).
- **Self-check**: build + eslint clean.

## Work: EximPe CASE STUDY button removed · 2026-11-05T13:33:00+05:30

- **Files touched**: `Work.tsx` — dropped the fancy EximPe "CASE STUDY →" MagneticButton (it had no target) and the now-unused MagneticButton import.
- **Self-check**: build + eslint clean.

## Hero: CTA row (SEE THE WORK · SHAKE ME · GRAB THE CV) on the right · 2026-11-05T13:45:00+05:30

- **Files touched**: `Hero.tsx` — `ctaRow()` renders the three as one row, SHAKE ME in the middle; xl+ it sits in the right column under the vinyl (column right-aligned so the row grows leftwards), < xl the same row falls back under the lead (the ~560px row would hit ABHI between lg and xl). Eyes centred under the vinyl via the shared VINYL_SIZE clamp. Only one copy is ever displayed (display:none hides the other from AT).
- **Self-check**: screenshots 1024/1280/1440 — no overlaps; build + eslint clean.

## Hero right column: vertically centred, eyes out, CTA air · 2026-11-05T14:00:00+05:30

- **Files touched**: `Hero.tsx` — right column now pinned top 130 / bottom 90 with justifyContent center (vertically centred between nav and marquee; still right-aligned); xl CTA row gets marginTop 28 below the vinyl caption; eye pair removed from the column (owner: "for now"; Eyes import dropped); lead max-width at xl tightened to min(680px, 100% − 630px) so the lower-sitting CTA row clears it at 1280.
- **Decisions/deviations**: owner first asked to "centre" — a horizontal centring pass was reverted in favour of vertical centring per the follow-up.
- **Self-check**: screenshots 1024/1280/1440; build + eslint clean.

## Edge-anchored decor follows the content max-width · 2026-11-05T14:10:00+05:30

- **Files touched**: `Hero.tsx` (right column right = max(clamp(56px,7.6vw,110px), gutter + 30px); `spacing` import), `NowBoard.tsx` (eyes right: gutter), `Contact.tsx` (eyes right: gutter + 22px).
- **Self-check**: 2560 screenshots of Hero/Work/Now/Contact — decorations sit with the centred content; 1440 unchanged.

## Hero: tablet/mobile CTA gap + centring · 2026-11-05T14:20:00+05:30

- **Files touched**: `Hero.tsx` — fancy slab paddingBottom 60 → 140 so content clears the absolute bottom marquee (~62px) below lg, where the slab has no min-height (CTA row was running into the marquee at 820); the < xl CTA row is now `justify-center` below lg (stacks centred on phones), left-aligned again at lg–xl.
- **Self-check**: screenshots 390 / 820 / 1440 (desktop unchanged — lg:min-h-[1020px] dominates); build + eslint clean.

## Contact: eyes moved off the live-clock pill · 2026-11-05T14:25:00+05:30

- **Files touched**: `Contact.tsx` — eye pair top 130 → 186 so it sits under the "IT IS … IN BENGALURU" pill instead of covering it (owner report).
- **Self-check**: screenshots 820 / 1024 / 1440 — clear of the pill and the headline; build + eslint clean.

## Hero: eye pair after SHAKE · 2026-11-05T14:35:00+05:30

- **Files touched**: `Hero.tsx` — SHAKE wrapped in a relative inline-block; an aria-hidden Eyes (40px, gap 10, −6°) is absolutely placed at left 100% + 18px, vertically centred on the word. md+ only (on phones SHAKE fills the width). Eyes import restored.
- **Decisions/deviations**: owner asked for an eye "without hindering any sections" — the gap between SHAKE and the vinyl (~140–150px at 1024–1440) is the one spot that stays clear at every width; absolute, so it never shifts layout.
- **Self-check**: screenshots 820/1024/1280/1440 — clear of the vinyl, the intro line and ABHI; build + eslint clean.

## Resume: "One page" → "Two pages" · 2026-11-05T14:38:00+05:30

- **Files touched**: `Resume.tsx` — shared blurb now "Two pages. PDF. No Comic Sans (here)…" (the new cv.pdf is 2 pages; both modes read the one constant); `Hero.tsx` comment updated.
- **Self-check**: build + eslint clean.

## Hero: right column click-through (eyes double-click fix) · 2026-11-05T14:50:00+05:30

- **Files touched**: `Hero.tsx` — right column gets `pointer-events-none` + `[&>*]:pointer-events-auto`. At xl+ the column box is as wide as the CTA row (~575px) at zIndex 1, so its empty area covered the SHAKE eyes and swallowed their double-click spin.
- **Self-check**: CDP elementFromPoint over the eyes now hits the eye at 1024/1280/1440 (was the column at 1280/1440); vinyl + CTAs still interactive; build + eslint clean.

## Work: FanPro win tiles · 2026-11-05T14:50:00+05:30

- **Files touched**: `Work.tsx` — new `Win` type, `FANPRO_WINS` (0.66 → 0.003 explore-page CLS · 4 mo empty repo → public beta · 20 generation types · 11 social platforms — all resume-backed); extracted `WinTiles` (fancy 2×2, long metrics step 26 → 21px) and `MinimalWins` (inline row); FanPro gets both under its carousel, EximPe now renders through the same components (unchanged output).
- **Decisions/deviations**: supersedes the old "no KPI tiles for FanPro until the numbers are real" note — these come straight off the CV.
- **Self-check**: screenshots 1024/1440 fancy + 1440 minimal; EximPe tiles unchanged; build + eslint clean.

## Work: FanPro tile copy · 2026-11-05T14:55:00+05:30

- **Files touched**: `Work.tsx` — FANPRO_WINS: "20" → "20+" generation types; "11 social platforms" → "11+ social platforms with scheduling" (owner wording). Both modes read the one list.
- **Self-check**: build + eslint clean; 1024 screenshot.

## Titles → Lead Software Engineer + FanPro mentoring tile · 2026-11-05T15:05:00+05:30

- **Files touched**: `Work.tsx` (FANPRO_META/EXIMPE_META role → "Lead Software Engineer"; FanPro red tag → "Lead software engineer"; FANPRO_WINS + `{ 3 · juniors mentored }`; WinTiles spans an odd last tile across the row), `Hero.tsx` (lead copy "Most recently Lead Software Engineer at FanPro Studio"), `Resume.tsx` (paper lines → "LEAD SWE").
- **Decisions/deviations**: matches the new cv.pdf titles. Mentoring tile uses the owner's "juniors" (CV says "3 engineers"). Shared constants → both modes updated.
- **Self-check**: 1024/1440 fancy + 1440 minimal screenshots; build + eslint clean.

## Phone (393px) fixes · 2026-11-05T15:20:00+05:30

- **Files touched**: `Hero.tsx` — Mon egg note: absolute beside the word md+ only, in-flow line under the h1 on phones (ran off-screen); AVAILABLE FOR HIRE row `max-sm:w-full max-sm:justify-center` (dangled under the logo once the bar wrapped). `About.tsx` — FOUNDING ENERGY burst `right-[-50px] max-md:right-[-6px]` (clipped by the slab). `Work.tsx` — win tiles are inline-size containers; metric font `min(26|21px, 100/(len·0.72) cqw)` so "0.66 → 0.003" / "25% → 85%" fit narrow tiles. `NowBoard.tsx` — sub-line per layout: drag copy on the board, NOW_SUB_LIST ("What's on my desk, in my headphones and in my cup right now.") on the non-draggable < 768 list. `Contact.tsx` — "SOMETHING." pill font capped to the column on phones; FOOTER_NOTE "Built with spite and love" → "Built with love, music and coffee" (owner).
- **Self-check**: CDP screenshots at 393×852 of each spot (hero incl. Mon state, about, both win grids, now, contact) — nothing clipped; desktop untouched (all changes are breakpoint-gated or capped at the old sizes); build + eslint clean.

## Win tiles evened out + Contact copy · 2026-11-05T15:35:00+05:30

- **Files touched**: `Work.tsx` — WinTiles: grid wrapped in an inline-size container; ONE metric size per grid, min(26px, (50cqw − 36px)/(longest·0.72)); `gridAutoRows: 1fr` so every row matches the tallest; kicker line-height 1.4. FanPro CLS tile "0.66 → 0.003 · explore-page CLS" → "−99% · explore-page layout shift" (99.5% drop) so the shared size stays large on phones. `Contact.tsx` — pitch now "…founding-team gigs, any kind of development work (I'm a full-blown builder now), or honest opinions on your codebase." (owner).
- **Self-check**: 393 + 1440 screenshots of both grids — equal tile heights, one metric size per card; build + eslint clean.

## iPad mini (768×1024) pass · 2026-11-05T16:00:00+05:30

- **Files touched**: `About.tsx` (portrait box `w-fit` so the FOUNDING ENERGY burst + eyes hang off the photo, not off a full-width stacked column; the phone-only right override dropped), `NowBoard.tsx` (static list below lg instead of md — the cork board overlapped notes at 768 — as a 1-col / sm:2-col grid; list sub-line follows), `Contact.tsx` (SOMETHING. pill capped to the content column at EVERY width — it also clipped at 768/1024; both CTAs share one max-content column so they match widths), `Hero.tsx` / `NowBoard.tsx` / `Contact.tsx` right-anchored decor → `spacing.gutterRight`.
- **Decisions/deviations**: AGENTS.md says the cork board becomes a list < 768; it now does so < 1024 (owner-driven, iPad). Desktop SOMETHING. no longer bleeds past the content edge (it was clipped by the ribbon there too).
- **Self-check**: DOM overflow audit (text boxes past the viewport, marquees excluded) empty at 393/768/1024/1440 fancy + 768 minimal; screenshots of every section at 768; build + eslint clean.
