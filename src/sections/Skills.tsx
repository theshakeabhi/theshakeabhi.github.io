// P5 — Skills slab (portfolio-1.jsx 239–288, README §Section Highlights).
// Inverted ink slab: headline + intro, then ~22 skill keywords as a
// typographic word-cloud in mixed sizes (36–96px) with small rotations and
// hover scramble/color transitions. Keyword sizes follow the fluid-type
// formula (design-px / 1440 × 100vw, capped at spec).
// Minimal mode (AGENTS.md §Two design modes): the SAME array as a wrapped
// mono list — `core` entries render bold (explicit flags, NOT inferred
// from cloud size: ANIMATION 54 > A11Y 50 but only A11Y is core).
import { Fragment, type CSSProperties } from "react";
import Slab from "../components/primitives/Slab";
import MinimalColumn from "../components/primitives/MinimalColumn";
import ScrambleHover from "../components/text/ScrambleHover";
import { usePrefs } from "../lib/prefs";
import {
  cream,
  ink,
  red,
  cyan,
  yellow,
  slate,
  slateLight,
  hairline,
  fonts,
  text,
} from "../tokens";

type Tone = "ink" | "red" | "cyan";

// Natural-case entries — the fancy cloud uppercases via CSS, the minimal
// word list lowercases via CSS (mock shows "react · typescript · …").
const STACK: {
  t: string;
  size: number;
  tone: Tone;
  rot: number;
  core?: boolean;
}[] = [
  { t: "React", size: 72, tone: "ink", rot: -3, core: true },
  { t: "TypeScript", size: 56, tone: "red", rot: 2, core: true },
  { t: "Design systems", size: 48, tone: "ink", rot: -1, core: true },
  { t: "Claude", size: 86, tone: "cyan", rot: 4, core: true },
  { t: "Next.js", size: 44, tone: "ink", rot: -2 },
  { t: "Node", size: 38, tone: "ink", rot: 3 },
  { t: "Mentorship", size: 52, tone: "red", rot: -3, core: true },
  { t: "Code review", size: 36, tone: "ink", rot: 1 },
  { t: "Incident response", size: 44, tone: "ink", rot: -1 },
  { t: "Observability", size: 40, tone: "cyan", rot: 2 },
  { t: "Perf", size: 96, tone: "red", rot: -4, core: true },
  { t: "Delegation", size: 42, tone: "ink", rot: 2 },
  { t: "A11y", size: 50, tone: "ink", rot: -2, core: true },
  { t: "Root-cause", size: 44, tone: "ink", rot: 3 },
  { t: "Migrations", size: 38, tone: "ink", rot: -1 },
  { t: "Communication", size: 46, tone: "cyan", rot: 1 },
  { t: "Release discipline", size: 40, tone: "ink", rot: -2 },
  { t: "Animation", size: 54, tone: "red", rot: 3 },
  // Sep '26 resume refresh — non-core additions (t2/t3 cloud sizes).
  { t: "Stripe", size: 46, tone: "cyan", rot: 2 },
  { t: "PostgreSQL", size: 44, tone: "ink", rot: -2 },
  { t: "GraphQL", size: 38, tone: "red", rot: 1 },
  { t: "React Native", size: 40, tone: "ink", rot: -3 },
];

// Title copy shared by BOTH design modes — natural case per mock
// ("Stuff I'm good at"); the fancy headline uppercases via CSS.
const SKILLS_TITLE = "Stuff I'm good at";

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

// On the ink slab, ink-toned keywords render cream (prototype mapping).
const TONE_COLOR: Record<Tone, string> = { ink: cream, red, cyan };

const fluid = (px: number) =>
  `clamp(${Math.round(px * 0.55)}px, ${(px / 14.4).toFixed(2)}vw, ${px}px)`;

export default function Skills() {
  const { minimal } = usePrefs();

  // Minimal branch — guard AFTER hooks (AGENTS.md §Two design modes).
  // Paper slab (the fancy ink bg must not survive), no borderTop: the
  // preceding SectionDivider already draws the hairline.
  if (minimal) {
    return (
      <Slab
        bg={cream}
        id='skills'
        style={{ paddingTop: 52, paddingBottom: 64 }}
      >
        <MinimalColumn>
          <div style={minimalLabelStyle}>
            <span>03 / stack</span>
          </div>
          {/* Mock .mh2 keeps the title's natural case. */}
          <h2
            style={{
              fontFamily: fonts.mono,
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: "-0.01em",
              color: ink,
              margin: "0 0 22px",
            }}
          >
            {SKILLS_TITLE}
          </h2>
          <p
            style={{
              fontFamily: fonts.mono,
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 2.1,
              letterSpacing: "0.01em",
              color: ink,
              margin: 0,
              maxWidth: "60ch",
              textTransform: "lowercase",
            }}
          >
            {/* Real spaces around the separators + inline-block entries:
                the line WRAPS at entry boundaries instead of clipping
                glyphs at 375 (deliberately better than the mock, which
                joined entries unbreakably). */}
            {STACK.map((s, i) => (
              <Fragment key={s.t}>
                {i > 0 && (
                  <>
                    {" "}
                    <span aria-hidden='true' style={{ color: hairline }}>
                      ·
                    </span>{" "}
                  </>
                )}
                <span style={{ display: "inline-block" }}>
                  {s.core ? <b style={{ fontWeight: 700 }}>{s.t}</b> : s.t}
                </span>
              </Fragment>
            ))}
          </p>
          <span
            style={{
              display: "block",
              fontFamily: fonts.mono,
              fontWeight: 400,
              fontSize: 12,
              color: slate,
              marginTop: 14,
            }}
          >
            (probably — the bold ones are non-negotiable)
          </span>
        </MinimalColumn>
      </Slab>
    );
  }

  return (
    <Slab
      bg={ink}
      label='03 // STACK'
      id='skills'
      style={{ color: cream, paddingTop: "var(--spacing-slab-top-deep)" }}
    >
      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: text.sub,
          lineHeight: "var(--text-sub--line-height)",
          letterSpacing: "var(--text-sub--letter-spacing)",
          color: cream,
          margin: 0,
          // Natural-case shared title → display caps (mock h2.sec).
          textTransform: "uppercase",
        }}
      >
        <ScrambleHover text={SKILLS_TITLE} />{" "}
        {/* Mock .acc2: the aside stays lowercase inside the caps h2. */}
        <span style={{ color: yellow, textTransform: "none" }}>(probably)</span>
      </h2>
      <p
        style={{
          fontFamily: fonts.body,
          fontWeight: 500,
          fontSize: "clamp(17px, 1.39vw, 20px)",
          lineHeight: 1.4,
          color: slateLight,
          maxWidth: 700,
          marginTop: 18,
        }}
      >
        Hover anything. Big ones are non-negotiable; small ones I'd happily
        monologue about over coffee.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "14px 22px",
          marginTop: 50,
          alignItems: "baseline",
        }}
      >
        {STACK.map((s, i) => (
          <ScrambleHover
            key={i}
            text={s.t}
            style={{
              display: "inline-block",
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: fluid(s.size),
              color: TONE_COLOR[s.tone],
              transform: `rotate(${s.rot}deg)`,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              // Natural-case entries → cloud caps via CSS.
              textTransform: "uppercase",
              transition: "transform .2s, color .2s",
              textShadow: `3px 3px 0 ${ink}`,
            }}
          />
        ))}
      </div>
    </Slab>
  );
}
