// P5 — Hero slab (portfolio-1.jsx 90–186, README §Section Highlights).
// Top bar (logo easter-egg button + centered nav + available-for-hire dot),
// two-line mega name with cyan hand-drawn underline, lead copy, magnetic
// CTAs with the "start here" arrow, two eye pairs, bottom ink marquee.
// P7 wires onLogoClick/clicks to the rave easter egg (defaults: noop / 0).
import Slab from "../components/primitives/Slab";
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
  "FINTECH",
  "✦",
  "50K+ MAUs",
  "✦",
  "BENGALURU → REMOTE",
  "✦",
] as const;

// User decision: no CV PDF yet — the ghost CTA links to LinkedIn instead.
const CV_URL = "https://www.linkedin.com/in/theshakeabhi/";

export default function Hero({ onLogoClick, clicks = 0 }: HeroProps) {
  const { reducedMotion } = usePrefs();

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
          <span>ABHISHEK.SH</span>
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
          <span>AVAILABLE FOR HIRE</span>
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
            Senior frontend engineer who ships at{" "}
            <em
              style={{
                background: yellow,
                padding: "0 6px",
                fontStyle: "normal",
              }}
            >
              founding-team speed
            </em>
            , mentors humans, and treats production incidents like a sport.
            Currently scaling a cross-border fintech to 50K+ MAUs from
            Bengaluru.
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
              SEE THE WORK →
            </MagneticButton>
            <MagneticButton kind='ghost' onClick={openCv}>
              CV ON LINKEDIN ↗
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
