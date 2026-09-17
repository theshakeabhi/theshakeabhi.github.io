// P5 — Skills slab (portfolio-1.jsx 239–288, README §Section Highlights).
// Inverted ink slab: headline + intro, then ~18 skill keywords as a
// typographic word-cloud in mixed sizes (36–96px) with small rotations and
// hover scramble/color transitions. Keyword sizes follow the fluid-type
// formula (design-px / 1440 × 100vw, capped at spec).
import Slab from "../components/primitives/Slab";
import ScrambleHover from "../components/text/ScrambleHover";
import {
  cream,
  ink,
  red,
  cyan,
  yellow,
  slateLight,
  fonts,
  text,
} from "../tokens";

type Tone = "ink" | "red" | "cyan";

const STACK: { t: string; size: number; tone: Tone; rot: number }[] = [
  { t: "REACT", size: 72, tone: "ink", rot: -3 },
  { t: "TYPESCRIPT", size: 56, tone: "red", rot: 2 },
  { t: "DESIGN SYSTEMS", size: 48, tone: "ink", rot: -1 },
  { t: "CLAUDE", size: 86, tone: "cyan", rot: 4 },
  { t: "NEXT.JS", size: 44, tone: "ink", rot: -2 },
  { t: "NODE", size: 38, tone: "ink", rot: 3 },
  { t: "MENTORSHIP", size: 52, tone: "red", rot: -3 },
  { t: "CODE REVIEW", size: 36, tone: "ink", rot: 1 },
  { t: "INCIDENT RESPONSE", size: 44, tone: "ink", rot: -1 },
  { t: "OBSERVABILITY", size: 40, tone: "cyan", rot: 2 },
  { t: "PERF", size: 96, tone: "red", rot: -4 },
  { t: "DELEGATION", size: 42, tone: "ink", rot: 2 },
  { t: "A11Y", size: 50, tone: "ink", rot: -2 },
  { t: "ROOT-CAUSE", size: 44, tone: "ink", rot: 3 },
  { t: "MIGRATIONS", size: 38, tone: "ink", rot: -1 },
  { t: "COMMUNICATION", size: 46, tone: "cyan", rot: 1 },
  { t: "RELEASE DISCIPLINE", size: 40, tone: "ink", rot: -2 },
  { t: "ANIMATION", size: 54, tone: "red", rot: 3 },
];

// On the ink slab, ink-toned keywords render cream (prototype mapping).
const TONE_COLOR: Record<Tone, string> = { ink: cream, red, cyan };

const fluid = (px: number) =>
  `clamp(${Math.round(px * 0.55)}px, ${(px / 14.4).toFixed(2)}vw, ${px}px)`;

export default function Skills() {
  return (
    <Slab
      bg={ink}
      label='03 // STACK'
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
        }}
      >
        <ScrambleHover text="STUFF I'M GOOD AT" />{" "}
        <span style={{ color: yellow }}>(probably)</span>
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
              transition: "transform .2s, color .2s",
              textShadow: `3px 3px 0 ${ink}`,
            }}
          />
        ))}
      </div>
    </Slab>
  );
}
