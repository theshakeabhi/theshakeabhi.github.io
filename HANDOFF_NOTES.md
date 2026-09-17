# HANDOFF_NOTES — append-only cross-package requests

One bullet per note, format: `- [P<n> → P<m>] <request>`. Never edit or
delete an existing note; the lead acks contract changes here.

- [P0 → all] Foundation landed. Tokens/type-scale names are listed in
  AGENTS.md §Defined @theme token names. Stubs are tagged `// STUB(P<n>)` —
  replace only your own.
- [P1 → P4/P7] OS-cursor hiding is live: PointerProvider renders a global `[data-cursor-hidden="true"], [data-cursor-hidden="true"] * { cursor: none !important }` style and toggles that attribute on the artboard container after mount (off when prefs.cursor is false, reducedMotion, or coarsePointer). Fixed chrome mounted OUTSIDE PointerProvider (ScrollProgress, SideRibbon, prefs menu) keeps the OS cursor by design; add data-cursor-hidden="true" to your fixed root if you want it hidden there too.
- [P1 → P2/P3] Hover plays sfx.hover() only for kind="link" (per P1 brief; prototype beeped on drag hover too) — drag surfaces should fire sfx.grab()/drop() from their own handlers.
- [P4 → P7] sfx.ts landed with the frozen Sfx interface exactly — the prototype's extra `isMuted()` getter was NOT ported (not in the contract). Wire mute state from `usePrefs().sfx` and call `sfx.setMuted(!sfx)`; there is no readback.
- [P3 → P5/P6] Eyes landed: frozen props unchanged; ADDITIVE optional x/y props place it absolutely like the prototype (omit them to keep the stub's in-flow inline-flex). Eye tracking needs P1's real PointerProvider (stub pointer is inert; centers/blink/spin already work).
- [P3 → P6] StickyNote is now a focusable role="button" (keyboard pick-up/arrow-move/drop, persists to sticky_v2_<id>) — do not nest links/buttons inside note children, and the RESET LAYOUT button should clear sticky_v2_n1..n8 then re-key the board as specced.
- [P2 → all] MagneticButton + Tilt landed. MagneticButtonProps now Omits "onDrag"|"onDragStart"|"onDragEnd"|"onAnimationStart" from ButtonHTMLAttributes (type collision with framer-motion motion.button) — frozen-contract props unchanged. OS-cursor hiding is deferred to P1 data-cursor-hidden mechanism; buttons carry a cursor:pointer fallback for when the custom cursor is off.
- [P5 → P6] Hero nav links to #writing but src/sections/Writing.tsx has no id — please add id='writing' to the Writing slab (Work/NowBoard/Contact already carry id='work'/'now'/'contact').
- [P6 → P7] Easter egg plumbing landed: `useEasterEgg()` (src/lib/useEasterEgg.ts) returns { rave, clicks, dismiss, onLogoClick }. Wire in Portfolio.tsx: `const egg = useEasterEgg();` → `<RaveOverlay on={egg.rave} onClose={egg.dismiss} />` and pass `egg.onLogoClick` / `egg.clicks` to Hero. RaveOverlay fires sfx.yay() itself via usePointer(), so keep it mounted inside PointerProvider (it already is).
- [P6 → P7] src/content/testimonials.ts is an EMPTY array by design (no permissioned quotes) and <Testimonials /> returns null while it is empty — please conditionally drop the preceding "NICE THINGS…" SectionDivider in Portfolio.tsx (import { testimonials } and skip both when testimonials.length === 0).
- [P6 → P0] Playground experiment cards need the prototype's #0f172a card background, which has no token; I approximated with color-mix(in srgb, var(--color-ink) 65%, black) in src/sections/Playground.tsx. If you add a --color-ink-deep token I'll switch to it.
- [P6 → P7] USER DECISION: every hi@abhishek.sh must become theshakeabhi@gmail.com — RIBBON_ITEMS in Portfolio.tsx (P0/P7-owned) still says "✶ HI@ABHISHEK.SH"; please change it to "✶ THESHAKEABHI@GMAIL.COM" during integration.
