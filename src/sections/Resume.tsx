// P6 — Resume / CV section (portfolio-2.jsx): two-column layout with a
// stylized one-page CV paper preview (380×480, rotate 2deg, washi tape)
// and a LAST UPDATED stamp line.
//
// USER DECISION: no PDF asset exists yet — both CV buttons open the
// LinkedIn profile and say so honestly (no fake DOWNLOAD/.PDF labels,
// no fabricated LAST UPDATED stamp).
import Slab from "../components/primitives/Slab";
import Tape from "../components/interactive/Tape";
import Eyes from "../components/interactive/Eyes";
import MagneticButton from "../components/interactive/MagneticButton";
import ScrambleHover from "../components/text/ScrambleHover";
import { useMediaQuery } from "../lib/useMediaQuery";
import {
  cream,
  creamWarm,
  ink,
  red,
  slateLight,
  borders,
  fonts,
  shadows,
  text,
} from "../tokens";

const LINKEDIN = "https://www.linkedin.com/in/theshakeabhi/";

const tapeRed = `color-mix(in srgb, ${red} 55%, transparent)`;

const PAPER_SECTIONS = [
  "FANPROSTUDIO AI · LEAD · 2026→",
  "EXIMPE · LEAD · 2022→26",
  "SELECTED WINS",
  "STACK",
];

export default function Resume() {
  const stacked = useMediaQuery("(max-width: 1023px)");

  const openLinkedIn = () => {
    window.open(LINKEDIN, "_blank", "noopener,noreferrer");
  };

  return (
    <Slab
      bg={creamWarm}
      label='09 // CV'
      style={{
        paddingTop: "var(--spacing-slab-top-deep)",
        borderTop: borders.thick,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: stacked ? "1fr" : "1fr 1fr",
          gap: 60,
          alignItems: "center",
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
            <ScrambleHover text='THE' />
            <br />
            <ScrambleHover text='CV' />
            <span style={{ color: red }}>.</span>
          </h2>
          <p
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: text.body,
              lineHeight: 1.4,
              color: ink,
              marginTop: 18,
              marginBottom: 0,
              maxWidth: 540,
            }}
          >
            One page. PDF. No Comic Sans (here). Updated whenever I do something
            worth bragging about.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 32,
              flexWrap: "wrap",
            }}
          >
            <MagneticButton kind='primary' onClick={openLinkedIn}>
              CV ON LINKEDIN ↗
            </MagneticButton>
            <MagneticButton kind='ghost' onClick={openLinkedIn}>
              VIEW PROFILE ↗
            </MagneticButton>
          </div>
          <div
            style={{
              marginTop: 26,
              fontFamily: fonts.mono,
              fontWeight: 700,
              fontSize: 12,
              color: ink,
              letterSpacing: "0.15em",
            }}
          >
            PDF VERSION COMING SOON
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{ position: "absolute", right: 10, top: -26 }}
            aria-hidden='true'
          >
            <Eyes size={54} gap={12} />
          </div>
          {/* Paper preview */}
          <div
            aria-hidden='true'
            style={{
              width: "min(380px, 100%)",
              height: 480,
              background: cream,
              border: borders.default,
              boxShadow: shadows.slab,
              transform: "rotate(2deg)",
              padding: "32px 28px",
              margin: "0 auto",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 28,
                color: ink,
                letterSpacing: "-0.02em",
              }}
            >
              ABHISHEK
              <br />
              CHANDRASENAN
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontWeight: 700,
                fontSize: 11,
                color: red,
                letterSpacing: "0.15em",
                marginTop: 6,
              }}
            >
              SENIOR FRONTEND ENGINEER
            </div>
            <div style={{ height: 2, background: ink, margin: "18px 0" }} />
            {PAPER_SECTIONS.map((s, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontWeight: 900,
                    fontSize: 10,
                    color: ink,
                    letterSpacing: "0.15em",
                  }}
                >
                  {s}
                </div>
                <div
                  style={{ height: 6, background: slateLight, marginTop: 6 }}
                />
                <div
                  style={{
                    height: 6,
                    background: slateLight,
                    marginTop: 4,
                    width: "85%",
                  }}
                />
                <div
                  style={{
                    height: 6,
                    background: slateLight,
                    marginTop: 4,
                    width: "70%",
                  }}
                />
              </div>
            ))}
          </div>
          <Tape x={130} y={-10} w={120} rotate={-6} color={tapeRed} />
        </div>
      </div>
    </Slab>
  );
}
