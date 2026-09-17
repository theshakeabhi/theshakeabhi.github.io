// P5 — About slab (portfolio-1.jsx 186–239, README §Section Highlights).
// Two-column (stacks < lg): taped portrait with the FOUNDING ENERGY burst,
// headline + two body paragraphs with yellow highlights, 4-stat grid.
import Slab from "../components/primitives/Slab";
import Star from "../components/primitives/Star";
import Burst from "../components/primitives/Burst";
import PlaceholderImg from "../components/primitives/PlaceholderImg";
import Hover from "../components/pointer/Hover";
import Eyes from "../components/interactive/Eyes";
import Tape from "../components/interactive/Tape";
import ScrambleHover from "../components/text/ScrambleHover";
import {
  cream,
  ink,
  red,
  cyan,
  yellow,
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

export default function About() {
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
            I've spent the last <strong>4+ years</strong> as the first frontend
            hire at{" "}
            <Hover
              as='span'
              kind='link'
              style={{ background: yellow, padding: "0 6px" }}
            >
              EximPe
            </Hover>
            , building cross-border fintech the way you'd build something you
            actually use yourself — opinionated, fast, and a little stubborn
            about quality. Before that, three years of agency + product work
            cramming the fundamentals.
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
            I run a team of two, write the design system, take the 2am pages,
            and unironically enjoy the part where you finally find the bug.
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
