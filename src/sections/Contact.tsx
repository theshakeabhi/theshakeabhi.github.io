// P6 — Contact section (portfolio-2.jsx): red slab, 200px headline with
// "SOMETHING." on a cream pill rotated -2deg, live "IT IS {clock} IN
// BENGALURU" pill (useLocalTime, 1s interval, pulsing success dot —
// SSR-safe placeholder before mount), links with 4px underline / 6px
// offset, two magnetic CTAs, footer.
//
// USER DECISIONS: email is theshakeabhi@gmail.com; the social row is real
// GitHub / LinkedIn / dev.to links (no X); "Book a 30-min chat" is a
// mailto until a scheduler exists.
// Minimal mode (AGENTS.md §Two design modes): paper slab (NOT red — red
// collapses to ink), lowercase mono heading at the contact token size,
// clock line with a static dot, shared body + link list. The SEND EMAIL /
// BOOK CHAT buttons are dropped — the email link covers both (lead
// decision); the footer keeps PRIVACY/TERMS + back-to-top.
import type { CSSProperties } from "react";
import Slab from "../components/primitives/Slab";
import MinimalColumn from "../components/primitives/MinimalColumn";
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
  slate,
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

// Copy shared by BOTH design modes (minimal lowercases via CSS; fancy
// scrambles the heading words and appends the 🇮🇳 to the footer note).
const CONTACT_WORDS = ["LET'S", "BUILD", "SOMETHING."] as const;
const CONTACT_BODY =
  "Reach out for staff/lead roles, founding-team gigs, design-system rescues, or honest opinions on your frontend codebase.";
const CLOCK_PRE = "IT IS";
const CLOCK_POST = "IN BENGALURU";
const RESPONDS = "RESPONDS IN < 24H";
const CTA_EMAIL_LABEL = "✉ SEND ME AN EMAIL";
const CTA_CHAT_LABEL = "📅 BOOK A 30-MIN CHAT";
const FOOTER_NOTE = "© 2026 · BUILT WITH SPITE AND LOVE · BENGALURU";
const FOOT_LINKS = [
  { label: "PRIVACY", href: "/privacy" },
  { label: "TERMS", href: "/terms" },
] as const;
const BACK_TO_TOP = "↑ BACK TO TOP";

const linkStyle: CSSProperties = {
  fontFamily: fonts.display,
  fontWeight: 900,
  fontSize: "clamp(18px, 1.94vw, 28px)",
  color: cream,
  textDecoration: "underline",
  textDecorationThickness: 4,
  textUnderlineOffset: 6,
  textTransform: "uppercase",
  overflowWrap: "anywhere",
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

const minimalLinkStyle: CSSProperties = {
  fontFamily: fonts.mono,
  fontWeight: 500,
  fontSize: 13.5,
  textDecorationLine: "underline",
  textDecorationThickness: 1,
  textUnderlineOffset: 4,
  textTransform: "lowercase",
  overflowWrap: "anywhere",
};

const MINIMAL_LINK_CLASSES =
  "text-ink decoration-hairline hover:decoration-accent";

export default function Contact() {
  const clock = useLocalTime("Asia/Kolkata");
  const compact = useMediaQuery("(max-width: 767px)");
  const stacked = useMediaQuery("(max-width: 1023px)");
  const { reducedMotion, minimal } = usePrefs();

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  // Minimal branch — guard AFTER all hooks (AGENTS.md §Two design modes).
  // borderTop KEPT from fancy; same id keeps the #contact anchor.
  if (minimal) {
    return (
      <Slab
        bg={cream}
        id='contact'
        style={{ paddingTop: 52, paddingBottom: 64, borderTop: borders.thick }}
      >
        <MinimalColumn>
          <div style={minimalLabelStyle}>
            <span>10 / contact</span>
          </div>
          <h2
            style={{
              fontFamily: fonts.mono,
              fontWeight: 700,
              fontSize: text.contact,
              lineHeight: "var(--text-contact--line-height)",
              letterSpacing: "var(--text-contact--letter-spacing)",
              color: ink,
              margin: "0 0 18px",
              textTransform: "lowercase",
            }}
          >
            {CONTACT_WORDS.join(" ")}
          </h2>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.08em",
              color: slate,
              margin: "0 0 26px",
              textTransform: "lowercase",
            }}
          >
            <span
              aria-hidden='true'
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: success,
                flexShrink: 0,
              }}
            />
            {CLOCK_PRE} {clock} {CLOCK_POST} · {RESPONDS}
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontWeight: 400,
              fontSize: 16.5,
              lineHeight: 1.65,
              color: ink,
              margin: 0,
              maxWidth: "62ch",
              textWrap: "pretty",
            }}
          >
            {CONTACT_BODY}
          </p>
          <div
            style={{
              display: "grid",
              gap: 11,
              margin: "24px 0 10px",
              justifyItems: "start",
            }}
          >
            <a
              href={MAILTO}
              className={MINIMAL_LINK_CLASSES}
              style={minimalLinkStyle}
            >
              {EMAIL}
            </a>
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target='_blank'
                rel='noreferrer'
                className={MINIMAL_LINK_CLASSES}
                style={minimalLinkStyle}
              >
                {s.label}
              </a>
            ))}
          </div>
          <footer
            style={{
              borderTop: borders.default,
              marginTop: 60,
              paddingTop: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px 24px",
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.08em",
              color: slate,
              textTransform: "lowercase",
            }}
          >
            <div>{FOOTER_NOTE}</div>
            <div style={{ display: "flex", gap: 16 }}>
              {FOOT_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className='text-slate decoration-hairline hover:decoration-accent'
                  style={{
                    textDecorationLine: "underline",
                    textDecorationThickness: 1,
                    textUnderlineOffset: 4,
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
            <button
              type='button'
              onClick={backToTop}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                font: "inherit",
                letterSpacing: "inherit",
                color: "inherit",
                textTransform: "inherit",
                cursor: "pointer",
              }}
            >
              {BACK_TO_TOP}
            </button>
          </footer>
        </MinimalColumn>
      </Slab>
    );
  }

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
          {CLOCK_PRE} {clock} {CLOCK_POST}
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
        <ScrambleHover text={CONTACT_WORDS[0]} />
        <br />
        <ScrambleHover text={CONTACT_WORDS[1]} />
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
          <ScrambleHover text={CONTACT_WORDS[2]} />
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
            {CONTACT_BODY}
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
              {EMAIL}
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
            {CTA_EMAIL_LABEL}
          </MagneticButton>
          <MagneticButton
            kind='primary'
            onClick={() => {
              window.location.href = MAILTO;
            }}
            style={{ padding: "18px 28px", fontSize: 18 }}
          >
            {CTA_CHAT_LABEL}
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
            {RESPONDS}
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
        <div>{FOOTER_NOTE} 🇮🇳</div>
        <div style={{ display: "flex", gap: 16 }}>
          {FOOT_LINKS.map((l) => (
            <Hover
              key={l.href}
              as='a'
              href={l.href}
              kind='link'
              style={{
                color: "inherit",
                textDecoration: "underline",
                textDecorationThickness: 2,
                textUnderlineOffset: 4,
              }}
            >
              {l.label}
            </Hover>
          ))}
        </div>
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
          {BACK_TO_TOP}
        </Hover>
      </footer>
    </Slab>
  );
}
