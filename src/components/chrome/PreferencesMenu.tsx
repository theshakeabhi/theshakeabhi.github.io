// P7 — the "Tweaks" preferences surface (README implementation step 12,
// app.jsx TweaksPanel). Fixed bottom-right chrome, mounted in Portfolio.tsx
// OUTSIDE PointerProvider (trap 1: no transformed ancestor; it also keeps
// the OS cursor — no data-cursor-hidden here by design, see HANDOFF_NOTES).
//
// Toggles write through usePrefs().setPref (persistence to
// localStorage "portfolio.tweaks" lives in prefs.tsx). A11y: the toggle
// button carries aria-expanded/aria-controls, each preference is a real
// <button role="switch">, and Esc closes the panel returning focus to the
// toggle. SSR-safe: deterministic closed state, browser APIs in effects.
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefs, type PrefKey } from "../../lib/prefs";
import { cream, ink, slate, fonts, shadows, borders } from "../../tokens";

const PANEL_ID = "preferences-panel";

const TOGGLES: { key: PrefKey; label: string }[] = [
  { key: "sfx", label: "Sound effects" },
  { key: "cursor", label: "Custom cursor" },
  { key: "magnetic", label: "Magnetic buttons" },
];

// Easter-egg hints — copy from the prototype's TweaksPanel (app.jsx).
const HINTS = [
  "Click the A logo in the hero five times.",
  "Konami: ↑↑↓↓←→←→ B A.",
  "Drag the sticky notes — they remember their spots.",
  "Double-click any pair of eyes to spin them.",
  "Hover the big section headlines — they scramble.",
];

function SwitchRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle(): void;
}) {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        width: "100%",
        padding: "8px 0",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: fonts.mono,
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: "0.1em",
        color: ink,
        textTransform: "uppercase",
        textAlign: "left",
      }}
    >
      <span>{label}</span>
      {/* Brutalist track + square knob — zero radius, hard edges. */}
      <span
        aria-hidden='true'
        style={{
          flexShrink: 0,
          width: 38,
          height: 20,
          border: `2px solid ${ink}`,
          background: checked ? ink : cream,
          position: "relative",
          transition: "background .15s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: checked ? 20 : 2,
            width: 12,
            height: 12,
            background: checked ? cream : ink,
            transition: "left .15s",
          }}
        />
      </span>
    </button>
  );
}

export default function PreferencesMenu() {
  const prefs = usePrefs();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Esc closes the panel (listener only while open; passive — never traps).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey, { passive: true });
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div
      style={{
        position: "fixed",
        // 36px SideRibbon + gutter, so the chrome never overlaps the ribbon.
        right: 52,
        bottom: 20,
        zIndex: 9500,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 10,
      }}
    >
      {/* Always mounted (hidden when closed) so aria-controls stays valid. */}
      <section
        id={PANEL_ID}
        aria-label='Preferences'
        hidden={!open}
        style={{
          width: 272,
          maxWidth: "calc(100vw - 68px)",
          background: cream,
          border: borders.default,
          boxShadow: shadows.lifted,
          padding: "16px 18px 18px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 900,
            fontSize: 11,
            letterSpacing: "0.2em",
            color: ink,
            marginBottom: 6,
          }}
        >
          VIBE
        </div>
        {TOGGLES.map(({ key, label }) => (
          <SwitchRow
            key={key}
            label={label}
            checked={prefs[key]}
            onToggle={() => prefs.setPref(key, !prefs[key])}
          />
        ))}
        <div
          style={{
            height: 2,
            background: ink,
            margin: "12px 0 10px",
          }}
        />
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 900,
            fontSize: 11,
            letterSpacing: "0.2em",
            color: ink,
            marginBottom: 6,
          }}
        >
          EASTER EGGS
        </div>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: "2px 0 0",
            fontFamily: fonts.body,
            fontWeight: 500,
            fontSize: 13,
            lineHeight: 1.45,
            color: slate,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {HINTS.map((hint, i) => (
            <li key={i}>✶ {hint}</li>
          ))}
        </ul>
      </section>
      <button
        ref={toggleRef}
        type='button'
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => (open ? close() : setOpen(true))}
        style={{
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
        <span aria-hidden='true'>⚙ </span>TWEAKS
      </button>
    </div>
  );
}
