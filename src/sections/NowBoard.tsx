// P6 — Now section (portfolio-2.jsx): cork graph-paper board on
// --color-cork with 8 draggable sticky notes at the prototype's exact
// positions/rotations/colors. Positions persist under localStorage
// sticky_v2_n1..n8 (trap 4 — never drop the v2_ prefix); the "↻ RESET
// LAYOUT" ghost button clears them and remounts the board via a key bump.
// Below 768px the board collapses into a vertical list of notes (drag off
// — AGENTS.md §Responsive breakpoints).
// Minimal mode (AGENTS.md §Two design modes): the SAME notes as label→body
// hairline rows — no board/pins/StickyNote/reset (sticky_v2_* storage is
// untouched because StickyNote is simply never mounted here).
import { useState, type CSSProperties } from "react";
import Slab from "../components/primitives/Slab";
import MinimalColumn from "../components/primitives/MinimalColumn";
import Stamp from "../components/primitives/Stamp";
import StickyNote from "../components/interactive/StickyNote";
import Eyes from "../components/interactive/Eyes";
import MagneticButton from "../components/interactive/MagneticButton";
import ScrambleHover from "../components/text/ScrambleHover";
import { usePointer } from "../components/pointer/PointerProvider";
import { useMediaQuery } from "../lib/useMediaQuery";
import { usePrefs } from "../lib/prefs";
import {
  cream,
  creamWarm,
  cork,
  ink,
  red,
  slate,
  accent,
  sticky,
  borders,
  fonts,
  shadows,
  spacing,
  text,
} from "../tokens";

interface NowNote {
  id: string;
  x: number;
  y: number;
  rotate: number;
  color: string;
  w: number;
  h: number;
  label: string;
  body: string;
}

// Prototype positions/rotations/colors/copy — verbatim from portfolio-2.jsx.
const NOTES: NowNote[] = [
  {
    id: "n1",
    x: 70,
    y: 40,
    rotate: -4,
    color: sticky.yellow,
    w: 240,
    h: 210,
    label: "Building →",
    body: "A FE eval harness that lets Claude propose UI tweaks on real PRs without nuking the design system.",
  },
  {
    id: "n2",
    x: 350,
    y: 70,
    rotate: 3,
    color: sticky.mint,
    w: 230,
    h: 200,
    label: "Reading →",
    body: '"A Philosophy of Software Design" (Ousterhout) — for the fourth time. Still right.',
  },
  {
    id: "n3",
    x: 620,
    y: 50,
    rotate: -2,
    color: sticky.red,
    w: 230,
    h: 200,
    label: "Mentoring →",
    body: 'Weekly "code postmortems" — no shame, all signal.',
  },
  {
    id: "n4",
    x: 880,
    y: 80,
    rotate: 5,
    color: sticky.sky,
    w: 230,
    h: 200,
    label: "Listening →",
    body: "Lo-fi when shipping. Sigur Rós when debugging. Silence when on-call.",
  },
  {
    id: "n5",
    x: 170,
    y: 290,
    rotate: 4,
    color: sticky.yellow,
    w: 250,
    h: 210,
    label: "Obsessing over →",
    body: "View Transitions API + the boring elegance of native form validation.",
  },
  {
    id: "n6",
    x: 460,
    y: 300,
    rotate: -5,
    color: sticky.lavender,
    w: 240,
    h: 210,
    label: "Avoiding →",
    body: "Meetings that could've been a Loom. Frameworks-of-the-week. Untyped JSON.",
  },
  {
    id: "n7",
    x: 740,
    y: 310,
    rotate: 3,
    color: sticky.orange,
    w: 240,
    h: 210,
    label: "Drinking →",
    body: "Filter coffee. Aggressive amounts of it. South Indian, always.",
  },
  {
    id: "n8",
    x: 1020,
    y: 300,
    rotate: -3,
    color: sticky.yellow,
    w: 230,
    h: 200,
    label: "Open to →",
    body: "Staff/Lead roles. Founding teams. AI-native dev tools. Say hi.",
  },
];

// Pin marks — right-side pins are right-anchored so they stay visible when
// the fluid board is narrower than the 1440 design (offsets match at 1440).
const PINS: CSSProperties[] = [
  { left: 40, top: 40 },
  { right: 66, top: 38 },
  { left: 40, top: 480 },
  { right: 76, top: 480 },
];

// Stamp copy shared by BOTH design modes (label-row right side in
// minimal) — natural case; the fancy Stamp and the minimal label row
// both uppercase via CSS.
const UPDATED = "Updated May '26";

const ink25 = `color-mix(in srgb, ${ink} 25%, transparent)`;
const gridLine = `color-mix(in srgb, ${ink} 6%, transparent)`;

const minimalLabelStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontFamily: fonts.mono,
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: "0.14em",
  color: slate,
  textTransform: "uppercase",
  marginBottom: 26,
};

const noteLabelStyle: CSSProperties = {
  fontFamily: fonts.mono,
  fontWeight: 900,
  fontSize: 16,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const noteBodyStyle: CSSProperties = {
  marginTop: 10,
  fontSize: 24,
  lineHeight: 1.1,
};

function NoteContent({ label, body }: { label: string; body: string }) {
  return (
    <>
      <strong style={noteLabelStyle}>{label}</strong>
      <div style={noteBodyStyle}>{body}</div>
    </>
  );
}

export default function NowBoard() {
  const { sfx } = usePointer();
  const compact = useMediaQuery("(max-width: 767px)");
  const { minimal } = usePrefs();
  const [boardKey, setBoardKey] = useState(0);

  // Minimal branch — guard AFTER all hooks (AGENTS.md §Two design modes).
  // No borderTop: the preceding SectionDivider already draws the hairline.
  if (minimal) {
    return (
      <Slab bg={cream} id='now' style={{ paddingTop: 52, paddingBottom: 64 }}>
        <MinimalColumn>
          <div style={minimalLabelStyle}>
            <span>05 / now</span>
            <span>{UPDATED}</span>
          </div>
          <div style={{ borderTop: borders.default }}>
            {NOTES.map((n) => (
              <div
                key={n.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: compact
                    ? "1fr"
                    : "minmax(120px, 150px) 1fr",
                  gap: compact ? 4 : 16,
                  borderBottom: borders.default,
                  padding: "13px 2px",
                }}
              >
                <b
                  style={{
                    fontFamily: fonts.mono,
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    color: ink,
                    textTransform: "uppercase",
                  }}
                >
                  {n.label.replace(" →", "")}{" "}
                  <span aria-hidden='true' style={{ color: accent }}>
                    →
                  </span>
                </b>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontWeight: 400,
                    fontSize: 14.5,
                    lineHeight: 1.5,
                    color: ink,
                    margin: 0,
                  }}
                >
                  {n.body}
                </p>
              </div>
            ))}
          </div>
        </MinimalColumn>
      </Slab>
    );
  }

  const resetLayout = () => {
    try {
      for (const n of NOTES)
        window.localStorage.removeItem(`sticky_v2_${n.id}`);
    } catch {
      // Storage unavailable — remount alone restores the defaults.
    }
    setBoardKey((k) => k + 1);
    sfx.pop();
  };

  return (
    <Slab
      bg={creamWarm}
      label='05 // NOW'
      id='now'
      style={{
        paddingTop: "var(--spacing-slab-top-deep)",
        borderTop: borders.thick,
      }}
    >
      {!compact && (
        <div
          style={{ position: "absolute", top: 90, right: spacing.slabX }}
          aria-hidden='true'
        >
          <Eyes size={54} gap={12} />
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: text.section,
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              color: ink,
            }}
          >
            <ScrambleHover text='NOW' />
            <span style={{ color: red }}>.</span>
          </h2>
          <p
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: text.body,
              lineHeight: 1.4,
              color: ink,
              marginTop: 14,
              marginBottom: 0,
              maxWidth: 600,
            }}
          >
            Drag the notes. Rearrange the chaos. They remember where you put
            them.
          </p>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {!compact && (
            <MagneticButton
              kind='ghost'
              onClick={resetLayout}
              style={{ padding: "12px 18px", fontSize: 14 }}
            >
              ↻ RESET LAYOUT
            </MagneticButton>
          )}
          <Stamp color={ink} rotate={-4}>
            {UPDATED}
          </Stamp>
        </div>
      </div>

      {compact ? (
        // <768px: vertical list of static notes (drag off).
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            marginTop: 40,
          }}
        >
          {NOTES.map((n) => (
            <div
              key={n.id}
              style={{
                background: n.color,
                color: ink,
                boxShadow: shadows.sticky,
                padding: "16px 18px",
                fontFamily: fonts.hand,
                fontSize: 24,
                lineHeight: 1.15,
                transform: `rotate(${n.rotate * 0.25}deg)`,
              }}
            >
              <NoteContent label={n.label} body={n.body} />
            </div>
          ))}
        </div>
      ) : (
        // Cork board — graph-paper grid on --color-cork.
        <div
          key={boardKey}
          style={{
            position: "relative",
            marginTop: 60,
            height: 560,
            background: `repeating-linear-gradient(0deg, ${gridLine} 0 1px, transparent 1px 28px),
                         repeating-linear-gradient(90deg, ${gridLine} 0 1px, transparent 1px 28px)`,
            backgroundColor: cork,
            border: borders.thick,
            boxShadow: shadows.cardHover,
            overflow: "hidden",
          }}
        >
          {PINS.map((pos, i) => (
            <div
              key={i}
              aria-hidden='true'
              style={{
                position: "absolute",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: red,
                // Hard shadows only (trap 7) — the prototype's soft pin
                // shadow is flattened to zero blur, ink-tinted.
                boxShadow: `inset -3px -3px 0 ${ink25}, 2px 2px 0 ${ink25}`,
                ...pos,
              }}
            />
          ))}

          {NOTES.map((n) => (
            <StickyNote
              key={n.id}
              id={n.id}
              x={n.x}
              y={n.y}
              rotate={n.rotate}
              color={n.color}
              w={n.w}
              h={n.h}
              // Board content width at the 1440 design (1440 − 2×80 slab
              // padding); default coords scale against it on narrower boards.
              designW={1280}
            >
              <NoteContent label={n.label} body={n.body} />
            </StickyNote>
          ))}
        </div>
      )}
    </Slab>
  );
}
