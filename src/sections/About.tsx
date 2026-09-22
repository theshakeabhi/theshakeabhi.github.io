// P5 — About slab (portfolio-1.jsx 186–239, README §Section Highlights).
// Two-column (stacks < lg): taped portrait with the FOUNDING ENERGY burst,
// headline + two body paragraphs with yellow highlights, 4-stat grid.
// Minimal mode (AGENTS.md §Two design modes): label row + the two shared
// paragraphs + STATS as hairline rows. Both branches read the SAME shared
// constants below.
import type { CSSProperties } from "react";
import Slab from "../components/primitives/Slab";
import MinimalColumn from "../components/primitives/MinimalColumn";
import Star from "../components/primitives/Star";
import Burst from "../components/primitives/Burst";
import PlaceholderImg from "../components/primitives/PlaceholderImg";
import Hover from "../components/pointer/Hover";
import Eyes from "../components/interactive/Eyes";
import Tape from "../components/interactive/Tape";
import ScrambleHover from "../components/text/ScrambleHover";
import { usePrefs } from "../lib/prefs";
import {
  cream,
  ink,
  red,
  cyan,
  yellow,
  slate,
  fonts,
  text,
  borders,
  shadows,
} from "../tokens";

// Copy + metrics are FINAL (AGENT_TEAM_HANDOFF §P5).
const STATS = [
  { n: "50K+", l: "MAUs shipped to", c: ink },
  { n: "25→85%", l: "Mobile onboarding ✶", c: red },
  { n: "−50%", l: "API latency cut", c: cyan },
  { n: "−60%", l: "Prod incidents", c: ink },
] as const;

// Paragraph copy shared by BOTH design modes — fancy dresses the parts
// (strong / yellow Hover highlight), minimal renders them plain.
const ABOUT_P1 = {
  pre: "These days I'm the ",
  strong: "Lead Frontend Developer",
  mid: " at ",
  link: "FanProStudio AI",
  post: ", building AI media generation — AI influencers and on-brand UGC — the way you'd build something you actually use yourself: opinionated, fast, and a little stubborn about quality. Before that, four years as the first frontend hire at EximPe building cross-border fintech, on top of three years of agency + product work cramming the fundamentals.",
} as const;
const ABOUT_P2 =
  "I lead the frontend, write the design system, take the 2am pages, and unironically enjoy the part where you finally find the bug.";

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

const minimalBodyStyle: CSSProperties = {
  fontFamily: fonts.body,
  fontWeight: 400,
  fontSize: 16.5,
  lineHeight: 1.65,
  color: ink,
  maxWidth: "62ch",
};

export default function About() {
  const { minimal } = usePrefs();

  // Minimal branch — guard AFTER hooks (AGENTS.md §Two design modes). No
  // borderTop here: the preceding SectionDivider already draws the hairline.
  if (minimal) {
    return (
      <Slab bg={cream} style={{ paddingTop: 52, paddingBottom: 64 }}>
        <MinimalColumn>
          <div style={minimalLabelStyle}>
            <span>02 / about</span>
          </div>
          <p style={{ ...minimalBodyStyle, margin: "0 0 16px" }}>
            {ABOUT_P1.pre}
            {ABOUT_P1.strong}
            {ABOUT_P1.mid}
            {ABOUT_P1.link}
            {ABOUT_P1.post}
          </p>
          <p style={{ ...minimalBodyStyle, margin: 0 }}>{ABOUT_P2}</p>
          <div style={{ borderTop: borders.default, marginTop: 30 }}>
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 18,
                  borderBottom: borders.default,
                  padding: "13px 2px",
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontWeight: 700,
                    fontSize: 17,
                    color: ink,
                    minWidth: 96,
                  }}
                >
                  {s.n}
                </span>
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontWeight: 500,
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    color: slate,
                    textTransform: "uppercase",
                  }}
                >
                  {s.l.replace(" ✶", "")}
                </span>
              </div>
            ))}
          </div>
        </MinimalColumn>
      </Slab>
    );
  }

  return (
    <Slab
      bg={cream}
      label='02 // ABOUT'
      style={{
        paddingTop: "var(--spacing-slab-top-deep)",
        borderTop: borders.thick,
      }}
    >
      <div className='grid grid-cols-1 items-start gap-12 lg:grid-cols-[320px_1fr] lg:gap-20'>
        {/* Portrait + tape + burst */}
        <div className='relative max-lg:mb-10'>
          <PlaceholderImg
            w={300}
            h={380}
            label='Portrait'
            tone='dark'
            style={{ transform: "rotate(-3deg)" }}
          />
          <Tape x={-10} y={-14} w={120} rotate={-14} />
          <Tape
            x={210}
            y={360}
            w={110}
            rotate={8}
            color={`color-mix(in srgb, ${red} 50%, transparent)`}
          />
          <div
            aria-hidden='true'
            style={{
              position: "absolute",
              bottom: -40,
              right: -50,
              width: 130,
              height: 130,
            }}
          >
            <Burst size={130} color={red} rotate={-10} points={10} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 16,
                color: cream,
                transform: "rotate(10deg)",
                textAlign: "center",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              FOUNDING
              <br />
              ENERGY
            </div>
          </div>
          {/* Eye pair by the FOUNDING ENERGY burst (README §About) —
              decorative, hidden <768px like the other pairs. */}
          <div
            aria-hidden='true'
            className='hidden md:block'
            style={{
              position: "absolute",
              bottom: 96,
              right: -58,
              transform: "rotate(8deg)",
            }}
          >
            <Eyes size={44} gap={10} />
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 16,
            }}
          >
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: text.sub,
                lineHeight: "var(--text-sub--line-height)",
                letterSpacing: "var(--text-sub--letter-spacing)",
                color: ink,
                margin: 0,
              }}
            >
              <ScrambleHover text='ABOUT' />.
              <span style={{ color: red }}>
                <ScrambleHover text='TXT' />
              </span>
            </h2>
            <Star
              size={36}
              color={cyan}
              rotate={20}
              style={{ marginTop: -36 }}
            />
          </div>
          <p
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: text.body,
              lineHeight: 1.5,
              color: ink,
              maxWidth: 760,
            }}
          >
            {ABOUT_P1.pre}
            <strong>{ABOUT_P1.strong}</strong>
            {ABOUT_P1.mid}
            <Hover
              as='span'
              kind='link'
              style={{ background: yellow, padding: "0 6px" }}
            >
              {ABOUT_P1.link}
            </Hover>
            {ABOUT_P1.post}
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: text.body,
              lineHeight: 1.5,
              color: ink,
              maxWidth: 760,
              marginTop: 18,
            }}
          >
            {ABOUT_P2}
          </p>

          {/* Stats slabs */}
          <div
            className='grid grid-cols-2 lg:grid-cols-4'
            style={{ gap: 18, marginTop: 38, maxWidth: 880 }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  border: borders.default,
                  background: cream,
                  padding: "18px 16px",
                  boxShadow: shadows.card,
                  transform: `rotate(${(i % 2 ? -1 : 1) * 0.6}deg)`,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 900,
                    fontSize: text.stat,
                    color: s.c,
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontWeight: 600,
                    fontSize: 13,
                    color: ink,
                    marginTop: 8,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slab>
  );
}
