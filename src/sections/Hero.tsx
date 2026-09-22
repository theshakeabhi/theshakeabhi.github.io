// P5 — Hero slab (portfolio-1.jsx 90–186, README §Section Highlights).
// Top bar (logo easter-egg button + centered nav + available-for-hire dot),
// two-line mega name with cyan hand-drawn underline, lead copy, magnetic
// CTAs with the "start here" arrow, two eye pairs, bottom ink marquee.
// P7 wires onLogoClick/clicks to the rave easter egg (defaults: noop / 0).
// Minimal mode (AGENTS.md §Two design modes): calm 720px column — mono top
// row (logo button still wired, egg inert downstream; static dot), real
// name at document size, role line, shared lead copy, plain links. Both
// branches read the SAME shared constants below.
import type { CSSProperties } from "react";
import Slab from "../components/primitives/Slab";
import MinimalColumn from "../components/primitives/MinimalColumn";
import Stamp from "../components/primitives/Stamp";
import Burst from "../components/primitives/Burst";
import Squiggle from "../components/primitives/Squiggle";
import Hover from "../components/pointer/Hover";
import MagneticButton from "../components/interactive/MagneticButton";
import Eyes from "../components/interactive/Eyes";
import Tape from "../components/interactive/Tape";
import Arrow from "../components/interactive/Arrow";
import Marquee from "../components/text/Marquee";
import ScrambleHover from "../components/text/ScrambleHover";
import { usePrefs } from "../lib/prefs";
import {
  cream,
  ink,
  red,
  cyan,
  yellow,
  success,
  slate,
  fonts,
  text,
  borders,
} from "../tokens";

export interface HeroProps {
  /** P7 wires the rave easter egg here; defaults to a noop. */
  onLogoClick?: () => void;
  /** Logo click count — the "A" starts rotating from the 3rd click on. */
  clicks?: number;
}

// Anchor targets are the real section ids on the Slabs (Work id='work',
// NowBoard id='now', Contact id='contact'; Writing id='writing' → P6).
const NAV = [
  { label: "WORK", href: "#work" },
  { label: "NOW", href: "#now" },
  { label: "WRITING", href: "#writing" },
  { label: "CONTACT", href: "#contact" },
] as const;

const MARQUEE_ITEMS = [
  "REACT",
  "✦",
  "TYPESCRIPT",
  "✦",
  "CLAUDE-NATIVE",
  "✦",
  "FOUNDING ENGINEER ENERGY",
  "✦",
  "AI MEDIA",
  "✦",
  "50K+ MAUs",
  "✦",
  "BENGALURU → REMOTE",
  "✦",
] as const;

// User decision: no CV PDF yet — the ghost CTA links to LinkedIn instead.
const CV_URL = "https://www.linkedin.com/in/theshakeabhi/";

// Copy shared by BOTH design modes — never duplicated (AGENTS.md §Two
// design modes). Minimal lowercases via CSS textTransform so the
// UPPERCASE constants stay single-source.
const LOGO_TEXT = "ABHISHEK.SH";
const AVAILABLE = "AVAILABLE FOR HIRE";
const LEAD_PRE = "Senior frontend engineer who ships at ";
const LEAD_EM = "founding-team speed";
const LEAD_POST =
  ", mentors humans, and treats production incidents like a sport. Currently leading frontend at FanProStudio AI, shipping AI-media generation — AI influencers and on-brand UGC — from Bengaluru.";
const CTA_WORK = "SEE THE WORK →";
const CTA_CV = "CV ON LINKEDIN ↗";

// Minimal-only type: the calm hero shows the real name + a role line
// instead of the mega display face.
const NAME = "Abhishek Chandrasenan";
const ROLE_LINE = "senior frontend engineer · bengaluru · IST";

// Canonical minimal link (mockup-derived): decoration colors come from the
// classes (inline style beats hover classes, so BOTH base + hover colors
// stay classes) — never the `textDecoration` shorthand, which would reset
// text-decoration-color back to currentColor.
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

export default function Hero({ onLogoClick, clicks = 0 }: HeroProps) {
  const { minimal, reducedMotion } = usePrefs();

  // Minimal branch — guard AFTER all hooks (AGENTS.md §Two design modes).
  // No marquee/eyes/tape/burst/arrow/squiggle wrappers here at all.
  if (minimal) {
    return (
      // paddingTop 84 clears the fixed MinimalToggle at 375px.
      <Slab bg={cream} style={{ paddingTop: 84, paddingBottom: 64 }}>
        <MinimalColumn>
          {/* Mono top row: logo (egg inert downstream), nav, static dot. */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "10px 24px",
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.1em",
              color: ink,
              marginBottom: 66,
            }}
          >
            <button
              type='button'
              onClick={onLogoClick}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "inherit",
                font: "inherit",
                letterSpacing: "inherit",
                cursor: "pointer",
              }}
            >
              A {LOGO_TEXT}
            </button>
            {/* Mockup .mtop nav a: muted, NO underline, hover → accent
                COLOR (both colors as classes — inline beats hover). */}
            <nav aria-label='Primary' style={{ display: "flex", gap: 20 }}>
              {NAV.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className='text-slate hover:text-accent'
                  style={{
                    textDecoration: "none",
                    textTransform: "lowercase",
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <h1
            style={{
              fontFamily: fonts.mono,
              fontWeight: 700,
              fontSize: "clamp(25px, 2.5vw, 36px)",
              letterSpacing: "-0.02em",
              color: ink,
              margin: "0 0 10px",
            }}
          >
            {NAME}
          </h1>
          <p
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.06em",
              color: slate,
              margin: "0 0 28px",
            }}
          >
            {ROLE_LINE}
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
            }}
          >
            {LEAD_PRE}
            {LEAD_EM}
            {LEAD_POST}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 26,
              marginTop: 26,
            }}
          >
            <a
              href='#work'
              className={MINIMAL_LINK_CLASSES}
              style={minimalLinkStyle}
            >
              {CTA_WORK}
            </a>
            <a
              href={CV_URL}
              target='_blank'
              rel='noreferrer'
              className={MINIMAL_LINK_CLASSES}
              style={minimalLinkStyle}
            >
              {CTA_CV}
            </a>
          </div>
          {/* Mockup .mavail: the availability line sits BELOW the CTAs
              with a STATIC dot — no pulse ring/animation. */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.08em",
              color: slate,
              textTransform: "lowercase",
              marginTop: 30,
            }}
          >
            <span
              aria-hidden='true'
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: success,
              }}
            />
            {AVAILABLE}
          </span>
        </MinimalColumn>
      </Slab>
    );
  }

  const goToWork = () => {
    document
      .getElementById("work")
      ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };
  const openCv = () => {
    window.open(CV_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <Slab
      bg={cream}
      label='01 // HELLO'
      className='lg:min-h-[1020px]'
      style={{ paddingTop: 70, paddingBottom: 60 }}
    >
      {/* Top bar */}
      <div
        className='flex flex-wrap items-center justify-between gap-x-6 gap-y-3'
        style={{
          fontFamily: fonts.mono,
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.15em",
          color: ink,
          marginBottom: 50,
        }}
      >
        {/* Named from its visible content ("A ABHISHEK.SH") — an aria-label
            that hides the visible "A" breaks WCAG 2.5.3 voice control. */}
        <Hover
          as='button'
          type='button'
          kind='link'
          onClick={onLogoClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            padding: 0,
            color: "inherit",
            font: "inherit",
            letterSpacing: "inherit",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              background: ink,
              color: cream,
              display: "grid",
              placeItems: "center",
              fontWeight: 900,
              fontSize: 16,
              transform: clicks >= 3 ? `rotate(${clicks * 30}deg)` : "none",
              transition: "transform .3s",
            }}
          >
            A
          </span>
          <span>{LOGO_TEXT}</span>
        </Hover>
        <nav aria-label='Primary' style={{ display: "flex", gap: 28 }}>
          {NAV.map(({ label, href }) => (
            <Hover
              key={label}
              as='a'
              href={href}
              kind='link'
              style={{ color: ink, textDecoration: "none" }}
            >
              <span style={{ display: "inline-block", position: "relative" }}>
                {label}
              </span>
            </Hover>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span
            aria-hidden='true'
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: success,
              boxShadow: `0 0 0 3px color-mix(in srgb, ${success} 25%, transparent)`,
              animation: reducedMotion ? "none" : "pulse 2s infinite",
            }}
          />
          <span>{AVAILABLE}</span>
        </div>
      </div>

      {/* Sticker chaos + eyes — 1440-positioned decoration, hidden < lg */}
      <div aria-hidden='true' className='hidden lg:block'>
        <div
          style={{
            position: "absolute",
            top: 130,
            right: 290,
            transform: "rotate(8deg)",
          }}
        >
          <Stamp color={cyan} rotate={0}>
            ★ Senior · 7 yrs
          </Stamp>
        </div>
        <div style={{ position: "absolute", top: 200, right: 130 }}>
          <Burst size={88} color={yellow} rotate={12} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 14,
              color: ink,
              transform: "rotate(-6deg)",
              textAlign: "center",
              lineHeight: 1,
            }}
          >
            SHIPS
            <br />
            FAST!
          </div>
        </div>
        <Tape
          x={250}
          y={620}
          w={130}
          rotate={-12}
          color={`color-mix(in srgb, ${red} 50%, transparent)`}
        />
        <Tape
          x={1020}
          y={580}
          w={110}
          rotate={9}
          color={`color-mix(in srgb, ${cyan} 50%, transparent)`}
        />
        {/* Two eye pairs (README: "Two pairs of googly eyes"). Bottom-left
            pair = prototype (x 80 / y 900 at the 1020px slab height). */}
        <div style={{ position: "absolute", left: 80, bottom: 70 }}>
          <Eyes size={50} gap={14} />
        </div>
        <div style={{ position: "absolute", right: 110, top: 655 }}>
          <Eyes size={44} gap={12} />
        </div>
      </div>

      {/* Main type */}
      <div style={{ marginTop: 40, position: "relative" }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 900,
            fontSize: 32,
            color: ink,
            letterSpacing: "0.1em",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span>HI, I'M</span>
          <Squiggle w={120} color={red} />
        </div>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: text.mega,
            lineHeight: "var(--text-mega--line-height)",
            letterSpacing: "var(--text-mega--letter-spacing)",
            color: ink,
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          <ScrambleHover text='ABHISHEK' />
          <br />
          <span
            style={{
              color: red,
              position: "relative",
              display: "inline-block",
            }}
          >
            <ScrambleHover text='CHANDRA' />
            <span
              style={{
                display: "inline-block",
                transform: "translateY(8px) rotate(-2deg)",
              }}
            >
              <ScrambleHover text='SENAN' />
            </span>
            <svg
              aria-hidden='true'
              style={{
                position: "absolute",
                left: -8,
                bottom: -12,
                width: "108%",
              }}
              viewBox='0 0 800 30'
              preserveAspectRatio='none'
            >
              <path
                d='M5 22 Q 200 5, 400 18 T 795 14'
                style={{ stroke: cyan }}
                strokeWidth='6'
                fill='none'
                strokeLinecap='round'
              />
            </svg>
          </span>
        </h1>

        <div
          className='flex flex-col items-start gap-8 lg:flex-row lg:gap-[60px]'
          style={{ marginTop: 36, position: "relative" }}
        >
          <p
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: text.lead,
              lineHeight: "var(--text-lead--line-height)",
              color: ink,
              margin: 0,
              maxWidth: 680,
            }}
          >
            {LEAD_PRE}
            <em
              style={{
                background: yellow,
                padding: "0 6px",
                fontStyle: "normal",
              }}
            >
              {LEAD_EM}
            </em>
            {LEAD_POST}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginTop: 8,
              position: "relative",
            }}
          >
            <MagneticButton kind='danger' onClick={goToWork}>
              {CTA_WORK}
            </MagneticButton>
            <MagneticButton kind='ghost' onClick={openCv}>
              {CTA_CV}
            </MagneticButton>
            <span aria-hidden='true' className='hidden lg:inline'>
              <Arrow
                from={[-110, 60]}
                to={[-10, 60]}
                color={red}
                label='start here'
              />
            </span>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div
        aria-hidden='true'
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          background: ink,
          color: cream,
          padding: "14px 0",
          borderTop: borders.thick,
        }}
      >
        <Marquee speed={50}>
          {MARQUEE_ITEMS.map((t, i) => (
            <span
              key={i}
              style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 22,
                letterSpacing: "0.05em",
              }}
            >
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </Slab>
  );
}
