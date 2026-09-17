// P6 — Testimonials section (portfolio-2.jsx): 2-column grid of tilting
// quote cards in sticky-note colors with tape strips.
//
// Content comes from src/content/testimonials.ts, which ships EMPTY on
// purpose (no real, permissioned quotes yet — README §Questions to
// Resolve). While it is empty this section renders null; P7 also drops the
// preceding SectionDivider in Portfolio.tsx (see HANDOFF_NOTES.md).
import Slab from "../components/primitives/Slab";
import Tilt from "../components/interactive/Tilt";
import Tape from "../components/interactive/Tape";
import ScrambleHover from "../components/text/ScrambleHover";
import { useMediaQuery } from "../lib/useMediaQuery";
import { cream, ink, red, sticky, borders, fonts, text } from "../tokens";
import { testimonials } from "../content/testimonials";

// Prototype fallbacks for entries without an explicit color/rotation.
const FALLBACK_COLORS = [sticky.yellow, sticky.mint, sticky.sky, sticky.red];
const FALLBACK_ROTATIONS = [-3, 4, -5, 3];

const ink20 = `color-mix(in srgb, ${ink} 20%, transparent)`;
const tapeCream = `color-mix(in srgb, ${cream} 85%, transparent)`;

export default function Testimonials() {
  const stacked = useMediaQuery("(max-width: 1023px)");

  if (testimonials.length === 0) return null;

  return (
    <Slab
      bg={cream}
      label='08 // SAID OF ME'
      style={{
        paddingTop: "var(--spacing-slab-top-deep)",
        borderTop: borders.thick,
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
        <ScrambleHover text='WHAT PEOPLE' />
        <br />
        <ScrambleHover text='SAY' />
        <span style={{ color: red }}>.</span>{" "}
        <span
          style={{
            fontFamily: fonts.mono,
            fontWeight: 900,
            fontSize: text.cardTitle,
            letterSpacing: "0.05em",
            color: ink,
          }}
        >
          (when I'm not in the room)
        </span>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: stacked ? "1fr" : "repeat(2, 1fr)",
          gap: 32,
          marginTop: 60,
        }}
      >
        {testimonials.map((t, i) => {
          const color = t.color ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length];
          const rot =
            t.rotate ?? FALLBACK_ROTATIONS[i % FALLBACK_ROTATIONS.length];
          return (
            <Tilt
              key={i}
              max={6}
              scale={1.03}
              style={{ transform: `rotate(${rot * 0.6}deg)` }}
            >
              <blockquote
                style={{
                  position: "relative",
                  margin: 0,
                  background: color,
                  padding: "32px 34px 28px",
                  boxShadow: `10px 10px 0 ${ink20}`,
                  border: borders.default,
                }}
              >
                <Tape
                  x={120}
                  y={-14}
                  w={140}
                  rotate={rot * 2}
                  color={tapeCream}
                />
                <div
                  aria-hidden='true'
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 900,
                    fontSize: 60,
                    color: ink,
                    lineHeight: 0.5,
                    marginBottom: 4,
                  }}
                >
                  "
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontWeight: 500,
                    fontSize: text.body,
                    lineHeight: 1.35,
                    color: ink,
                    textWrap: "pretty",
                  }}
                >
                  {t.quote}
                </div>
                <footer
                  style={{
                    fontFamily: fonts.mono,
                    fontWeight: 700,
                    fontSize: 14,
                    color: ink,
                    letterSpacing: "0.1em",
                    marginTop: 22,
                    textTransform: "uppercase",
                  }}
                >
                  — {t.name} · {t.role}
                </footer>
              </blockquote>
            </Tilt>
          );
        })}
      </div>
    </Slab>
  );
}
