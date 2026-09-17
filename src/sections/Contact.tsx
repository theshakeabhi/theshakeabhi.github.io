// P6 — Contact section (portfolio-2.jsx): red slab, 200px headline with
// "SOMETHING." on a cream pill rotated -2deg, live "IT IS {clock} IN
// BENGALURU" pill (useLocalTime, 1s interval, pulsing success dot —
// SSR-safe placeholder before mount), links with 4px underline / 6px
// offset, two magnetic CTAs, footer.
//
// USER DECISIONS: email is theshakeabhi@gmail.com; the social row is real
// GitHub / LinkedIn / dev.to links (no X); "Book a 30-min chat" is a
// mailto until a scheduler exists.
import type { CSSProperties } from "react";
import Slab from "../components/primitives/Slab";
import Stamp from "../components/primitives/Stamp";
import Eyes from "../components/interactive/Eyes";
import MagneticButton from "../components/interactive/MagneticButton";
import Hover from "../components/pointer/Hover";
import ScrambleHover from "../components/text/ScrambleHover";
import { useLocalTime } from "../lib/useLocalTime";
import { useMediaQuery } from "../lib/useMediaQuery";
import { usePrefs } from "../lib/prefs";
import {
  cream,
  ink,
  red,
  success,
  borders,
  fonts,
  spacing,
  text,
} from "../tokens";

const EMAIL = "theshakeabhi@gmail.com";
const MAILTO = `mailto:${EMAIL}`;

const SOCIALS = [
  { label: "@THESHAKEABHI ON GITHUB", href: "https://github.com/theshakeabhi" },
  {
    label: "@THESHAKEABHI ON LINKEDIN",
    href: "https://www.linkedin.com/in/theshakeabhi/",
  },
  { label: "@THESHAKEABHI ON DEV.TO", href: "https://dev.to/theshakeabhi" },
];

const linkStyle: CSSProperties = {
  fontFamily: fonts.display,
  fontWeight: 900,
  fontSize: "clamp(18px, 1.94vw, 28px)",
  color: cream,
  textDecoration: "underline",
  textDecorationThickness: 4,
  textUnderlineOffset: 6,
  overflowWrap: "anywhere",
};

export default function Contact() {
  const clock = useLocalTime("Asia/Kolkata");
  const compact = useMediaQuery("(max-width: 767px)");
  const stacked = useMediaQuery("(max-width: 1023px)");
  const { reducedMotion } = usePrefs();

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <Slab
      bg={red}
      label='10 // SAY HI'
      id='contact'
      style={{
        paddingTop: "var(--spacing-slab-top-deep)",
        paddingBottom: 100,
        color: cream,
        borderTop: borders.thick,
      }}
    >
      {!compact && (
        <div
          style={{
            position: "absolute",
            top: 130,
            right: `calc(${spacing.slabX} + 22px)`,
          }}
          aria-hidden='true'
        >
          <Eyes size={70} gap={18} />
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.2em",
          }}
        >
          ↘ END OF SCROLL. NOW WHAT?
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: ink,
            color: cream,
            padding: "8px 16px",
            fontFamily: fonts.mono,
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.15em",
            border: `3px solid ${cream}`,
            boxShadow: `4px 4px 0 ${cream}`,
          }}
        >
          <span
            aria-hidden='true'
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: success,
              animation: reducedMotion ? "none" : "pulse 2s infinite",
            }}
          />
          IT IS {clock} IN BENGALURU
        </div>
      </div>
      <h2
        style={{
          margin: 0,
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: text.contact,
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          color: cream,
        }}
      >
        <ScrambleHover text="LET'S" />
        <br />
        <ScrambleHover text='BUILD' />
        <br />
        <span
          style={{
            background: cream,
            color: red,
            padding: "0 22px",
            display: "inline-block",
            transform: "rotate(-2deg)",
          }}
        >
          <ScrambleHover text='SOMETHING.' />
        </span>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: stacked ? "1fr" : "1fr 1fr",
          gap: 60,
          marginTop: 60,
          alignItems: "flex-end",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: 24,
              lineHeight: 1.4,
              margin: 0,
              maxWidth: 520,
              textWrap: "pretty",
            }}
          >
            Reach out for staff/lead roles, founding-team gigs, design-system
            rescues, or honest opinions on your frontend codebase.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 4,
              marginTop: 36,
            }}
          >
            <Hover as='a' href={MAILTO} kind='link' style={linkStyle}>
              THESHAKEABHI@GMAIL.COM
            </Hover>
            {SOCIALS.map((s) => (
              <Hover
                key={s.href}
                as='a'
                href={s.href}
                target='_blank'
                rel='noreferrer'
                kind='link'
                style={linkStyle}
              >
                {s.label}
              </Hover>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            alignItems: stacked ? "flex-start" : "flex-end",
          }}
        >
          <MagneticButton
            kind='ghost'
            onClick={() => {
              window.location.href = MAILTO;
            }}
            style={{
              background: cream,
              color: red,
              padding: "22px 34px",
              fontSize: 22,
            }}
          >
            ✉ SEND ME AN EMAIL
          </MagneticButton>
          <MagneticButton
            kind='primary'
            onClick={() => {
              window.location.href = MAILTO;
            }}
            style={{ padding: "18px 28px", fontSize: 18 }}
          >
            📅 BOOK A 30-MIN CHAT
          </MagneticButton>
          <Stamp
            color={cream}
            rotate={5}
            style={{
              background: red,
              color: cream,
              borderColor: cream,
              marginTop: 6,
            }}
          >
            RESPONDS IN &lt; 24H
          </Stamp>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: 80,
          paddingTop: 24,
          borderTop: `3px solid ${cream}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          fontFamily: fonts.mono,
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.15em",
          color: cream,
        }}
      >
        <div>© 2026 · BUILT WITH SPITE AND LOVE · BENGALURU 🇮🇳</div>
        <div>NO COOKIES. NO TRACKING. NO BS.</div>
        <Hover
          as='button'
          type='button'
          kind='link'
          onClick={backToTop}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            font: "inherit",
            letterSpacing: "inherit",
            color: "inherit",
          }}
        >
          ↑ BACK TO TOP
        </Hover>
      </footer>
    </Slab>
  );
}
