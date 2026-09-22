// P6 — Writing section (portfolio-2.jsx): blog rows from
// src/content/writing.ts separated by 3px ink borders. On hover/focus the
// whole row inverts (bg→ink, text→cream) and the left padding shifts
// 8→24px (README §Hover Underline / Inversion). The padding shift is
// suppressed under reduced motion; the color inversion stays.
// Minimal mode ships BRANCHLESS (already doc-shaped; the token skin does
// the rest) except: the fancy corner chip becomes the standard mono label
// row, and the row hover softens — no inversion / padding shift, the
// hovered title underlines in --color-accent instead.
import { useState, type CSSProperties } from "react";
import Slab from "../components/primitives/Slab";
import Hover from "../components/pointer/Hover";
import ScrambleHover from "../components/text/ScrambleHover";
import { useMediaQuery } from "../lib/useMediaQuery";
import { usePrefs } from "../lib/prefs";
import {
  cream,
  ink,
  red,
  slate,
  accent,
  borders,
  fonts,
  text,
} from "../tokens";
import { writingPosts } from "../content/writing";

const DEVTO_PROFILE = "https://dev.to/theshakeabhi";

const dateStyle: CSSProperties = {
  fontFamily: fonts.mono,
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: "0.1em",
};

const tagStyle: CSSProperties = {
  fontFamily: fonts.mono,
  fontWeight: 900,
  fontSize: 12,
  letterSpacing: "0.15em",
  color: red,
  border: `2px solid ${red}`,
  padding: "3px 8px",
  justifySelf: "start",
};

const titleStyle: CSSProperties = {
  fontFamily: fonts.display,
  fontWeight: 900,
  fontSize: text.cardTitle,
  lineHeight: 1.1,
  letterSpacing: "-0.01em",
};

const minsStyle: CSSProperties = {
  fontFamily: fonts.mono,
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: "0.1em",
  justifySelf: "end",
};

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

export default function Writing() {
  const compact = useMediaQuery("(max-width: 767px)");
  const { reducedMotion, minimal } = usePrefs();
  const [hot, setHot] = useState<number | null>(null);

  return (
    <Slab
      bg={cream}
      label={minimal ? undefined : "06 // WRITING"}
      id='writing'
      style={{
        paddingTop: "var(--spacing-slab-top-deep)",
        borderTop: borders.thick,
      }}
    >
      {minimal && (
        <div style={minimalLabelStyle}>
          <span>06 / writing</span>
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 38,
        }}
      >
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
          <ScrambleHover text="THINGS I'VE" />
          <br />
          <ScrambleHover text='WRITTEN' />
          <span style={{ color: red }}>.</span>
        </h2>
        <Hover
          as='a'
          href={DEVTO_PROFILE}
          target='_blank'
          rel='noreferrer'
          kind='link'
          style={{
            fontFamily: fonts.mono,
            fontWeight: 700,
            fontSize: 16,
            color: ink,
            letterSpacing: "0.1em",
            textDecoration: "none",
          }}
        >
          ALL POSTS →
        </Hover>
      </div>

      <div style={{ borderTop: borders.default }}>
        {writingPosts.map((p, i) => {
          const active = hot === i;
          // Minimal softens the hover: no inversion, no padding shift —
          // the hovered/focused row title underlines in accent instead
          // (decoration color inline here because the whole row is the
          // link, not the title span).
          const shift = active && !reducedMotion && !minimal;
          const invert = active && !minimal;
          const rowTitleStyle: CSSProperties =
            minimal && active
              ? {
                  ...titleStyle,
                  textDecorationLine: "underline",
                  textDecorationColor: accent,
                  textDecorationThickness: 1,
                  textUnderlineOffset: 4,
                }
              : titleStyle;
          return (
            <Hover
              key={i}
              as='a'
              href={p.href ?? DEVTO_PROFILE}
              target='_blank'
              rel='noreferrer'
              kind='link'
              onPointerEnter={() => setHot(i)}
              onPointerLeave={() => setHot(null)}
              onFocus={() => setHot(i)}
              onBlur={() => setHot(null)}
              style={{
                ...(compact
                  ? {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 10,
                    }
                  : {
                      display: "grid",
                      gridTemplateColumns: "180px 140px 1fr 100px",
                      alignItems: "center",
                      gap: 28,
                    }),
                padding: shift ? "24px 8px 24px 24px" : "24px 8px",
                borderBottom: borders.default,
                background: invert ? ink : "transparent",
                color: invert ? cream : ink,
                textDecoration: "none",
                transition: "background .15s, padding-left .15s, color .15s",
              }}
            >
              {compact ? (
                <>
                  <span
                    style={{ display: "flex", gap: 14, alignItems: "center" }}
                  >
                    <span style={dateStyle}>{p.date}</span>
                    <span style={tagStyle}>{p.tag}</span>
                    <span style={{ ...minsStyle, justifySelf: "auto" }}>
                      {p.readTime} →
                    </span>
                  </span>
                  <span style={rowTitleStyle}>{p.title}</span>
                </>
              ) : (
                <>
                  <span style={dateStyle}>{p.date}</span>
                  <span style={tagStyle}>{p.tag}</span>
                  <span style={rowTitleStyle}>{p.title}</span>
                  <span style={minsStyle}>{p.readTime} →</span>
                </>
              )}
            </Hover>
          );
        })}
      </div>
    </Slab>
  );
}
