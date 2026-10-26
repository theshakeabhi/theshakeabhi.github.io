// Design-mode switch — the top-right chrome that flips between the two
// design modes (AGENTS.md §Two design modes). Minimal is the default, so
// the switch is labelled FUNKY and reads ON when the full-fat mode is
// active (aria-checked = !minimal); it still writes the `minimal` pref. Mounted in Portfolio.tsx with the
// fixed chrome OUTSIDE PointerProvider (trap 1); like PreferencesMenu it
// keeps the OS cursor. Fancy face mirrors the ⚙ TWEAKS button (cream, 3px
// ink border, hard shadow, mono 900); under html[data-minimal] the border
// token collapses to a hairline and the shadow backstop quiets the frame —
// no structural branch needed. Track/knob mirror PreferencesMenu's
// SwitchRow numbers; the on-knob is one of the sanctioned --color-accent
// uses. A11y: native <button role='switch' aria-checked> with a visible
// text label.
import { usePrefs } from "../../lib/prefs";
import { accent, cream, ink, fonts, shadows, borders } from "../../tokens";

export default function MinimalToggle() {
  const { minimal, setPref } = usePrefs();

  return (
    <button
      type='button'
      role='switch'
      aria-checked={!minimal}
      onClick={() => setPref("minimal", !minimal)}
      style={{
        position: "fixed",
        top: 28,
        // 36px SideRibbon + gutter (PreferencesMenu precedent), constant
        // at every width — the toggle never overlaps the ribbon.
        right: 52,
        zIndex: 9500,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: cream,
        color: ink,
        border: borders.default,
        boxShadow: shadows.card,
        padding: "10px 14px",
        fontFamily: fonts.mono,
        fontWeight: 900,
        fontSize: 12,
        letterSpacing: "0.15em",
        cursor: "pointer",
      }}
    >
      <span>FUNKY</span>
      {/* SwitchRow-pattern track + square knob. The track stays cream in
          BOTH states so the accent on-knob reads against it. */}
      <span
        aria-hidden='true'
        style={{
          flexShrink: 0,
          width: 38,
          height: 20,
          border: `2px solid ${ink}`,
          background: cream,
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: minimal ? 2 : 20,
            width: 12,
            height: 12,
            background: minimal ? ink : accent,
            transition: "left .15s, background .15s",
          }}
        />
      </span>
    </button>
  );
}
