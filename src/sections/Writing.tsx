// P6 — Writing section (portfolio-2.jsx): blog rows from
// src/content/writing.ts separated by 3px ink borders. On hover/focus the
// whole row inverts (bg→ink, text→cream) and the left padding shifts
// 8→24px (README §Hover Underline / Inversion). The padding shift is
// suppressed under reduced motion; the color inversion stays.
// Minimal mode (AGENTS.md §Two design modes): the mockup's compact list —
// label row with the all-posts link on its right side, then 3-col
// hairline rows (date+tag · title · read time); the hovered/focused row
// title underlines in --color-accent. Both branches read the SAME
// writingPosts content module (minimal lowercases via CSS and derives
// "2026.03.14 · tag" from the shared date string at render).
import { useState, type CSSProperties } from "react";
import Slab from "../components/primitives/Slab";
import MinimalColumn from "../components/primitives/MinimalColumn";
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

// Copy shared by BOTH design modes (minimal lowercases via CSS).
const ALL_POSTS = "ALL POSTS →";

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

// Canonical minimal link (mockup .mlink) — decoration colors come from
// the classes; never the `textDecoration` shorthand.
const MINIMAL_LINK_CLASSES =
  "text-ink decoration-hairline hover:decoration-accent";
const minimalLinkStyle: CSSProperties = {
  fontFamily: fonts.mono,
  fontWeight: 500,
  fontSize: 13.5,
  textDecorationLine: "underline",
  textDecorationThickness: 1,
  textUnderlineOffset: 4,
  textTransform: "lowercase",
};

// Mockup .mwr row cells.
const minimalDateStyle: CSSProperties = {
  fontFamily: fonts.mono,
  fontWeight: 400,
  fontSize: 11.5,
  letterSpacing: "0.04em",
  color: slate,
  textTransform: "lowercase",
};

const minimalTitleStyle: CSSProperties = {
  fontFamily: fonts.body,
  fontWeight: 500,
  fontSize: 15,
};

const minimalMinsStyle: CSSProperties = {
  fontFamily: fonts.mono,
  fontWeight: 400,
  fontSize: 11,
  letterSpacing: "0.06em",
  color: slate,
  textTransform: "lowercase",
};

export default function Writing() {
  const compact = useMediaQuery("(max-width: 767px)");
  const { reducedMotion, minimal } = usePrefs();
  const [hot, setHot] = useState<number | null>(null);

  // Minimal branch — guard AFTER all hooks (AGENTS.md §Two design modes).
  // borderTop KEPT from fancy; same id keeps the #writing anchor.
  if (minimal) {
    return (
      <Slab
        bg={cream}
        id='writing'
        style={{ paddingTop: 52, paddingBottom: 64, borderTop: borders.thick }}
      >
        <MinimalColumn>
          <div style={minimalLabelStyle}>
            <span>06 / writing</span>
            <a
              href={DEVTO_PROFILE}
              target='_blank'
              rel='noreferrer'
              className={MINIMAL_LINK_CLASSES}
              style={minimalLinkStyle}
            >
              {ALL_POSTS}
            </a>
          </div>
          <div style={{ borderTop: borders.default }}>
            {writingPosts.map((p, i) => {
              const active = hot === i;
              return (
                <a
                  key={i}
                  href={p.href ?? DEVTO_PROFILE}
                  target='_blank'
                  rel='noreferrer'
                  onPointerEnter={() => setHot(i)}
                  onPointerLeave={() => setHot(null)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                  style={{
                    display: "grid",
                    // Mockup narrow behavior: date+tag line above the
                    // title (via the existing compact query, not a
                    // container query).
                    gridTemplateColumns: compact ? "1fr auto" : "86px 1fr auto",
                    gap: 14,
                    alignItems: "baseline",
                    padding: "13px 2px",
                    borderBottom: borders.default,
                    textDecoration: "none",
                    color: ink,
                  }}
                >
                  <span
                    style={{
                      ...minimalDateStyle,
                      ...(compact ? { gridColumn: "1 / -1" } : null),
                    }}
                  >
                    {p.date.replace(/ · /g, ".")} · {p.tag}
                  </span>
                  <span
                    style={
                      active
                        ? {
                            ...minimalTitleStyle,
                            textDecorationLine: "underline",
                            textDecorationColor: accent,
                            textDecorationThickness: 1,
                            textUnderlineOffset: 4,
                          }
                        : minimalTitleStyle
                    }
                  >
                    {p.title}
                  </span>
                  <span style={minimalMinsStyle}>{p.readTime}</span>
                </a>
              );
            })}
          </div>
        </MinimalColumn>
      </Slab>
    );
  }

  return (
    <Slab
      bg={cream}
      label='06 // WRITING'
      id='writing'
      style={{
        paddingTop: "var(--spacing-slab-top-deep)",
        borderTop: borders.thick,
      }}
    >
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
          {ALL_POSTS}
        </Hover>
      </div>

      <div style={{ borderTop: borders.default }}>
        {writingPosts.map((p, i) => {
          const active = hot === i;
          const shift = active && !reducedMotion;
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
                background: active ? ink : "transparent",
                color: active ? cream : ink,
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
                  <span style={titleStyle}>{p.title}</span>
                </>
              ) : (
                <>
                  <span style={dateStyle}>{p.date}</span>
                  <span style={tagStyle}>{p.tag}</span>
                  <span style={titleStyle}>{p.title}</span>
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
