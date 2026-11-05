// P5 — Hero slab (portfolio-1.jsx 90–186, README §Section Highlights).
// Top bar (logo easter-egg button + centered nav + available-for-hire dot),
// two-line mega name with cyan hand-drawn underline, lead copy, magnetic
// CTAs with the "start here" arrow, two eye pairs, bottom ink marquee.
// P7 wires onLogoClick/clicks to the rave easter egg (defaults: noop / 0).
// Minimal mode (AGENTS.md §Two design modes): calm 720px column — mono top
// row (logo button still wired, egg inert downstream; static dot), real
// name at document size, role line, shared lead copy, plain links. Both
// branches read the SAME shared constants below.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Slab from "../components/primitives/Slab";
import MinimalColumn from "../components/primitives/MinimalColumn";
import Squiggle from "../components/primitives/Squiggle";
import Hover from "../components/pointer/Hover";
import { usePointer } from "../components/pointer/PointerProvider";
import MagneticButton from "../components/interactive/MagneticButton";
import Vinyl from "../components/interactive/Vinyl";
import ShakeMe from "../components/interactive/ShakeMe";
import Eyes from "../components/interactive/Eyes";
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
  spacing,
} from "../tokens";

export interface HeroProps {
  /** P7 wires the rave easter egg here; defaults to a noop. */
  onLogoClick?: () => void;
  /** Logo click count — the "A" starts rotating from the 3rd click on. */
  clicks?: number;
}

// Anchor targets are the real section ids on the Slabs (Work id='work',
// NowBoard id='now', Contact id='contact').
const NAV = [
  { label: "Work", href: "#work" },
  { label: "Now", href: "#now" },
  { label: "Contact", href: "#contact" },
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

// The real two-page CV ships at public/cv.pdf (resume refresh, Sep '26).
const CV_URL = "/cv.pdf";

// Copy shared by BOTH design modes — never duplicated (AGENTS.md §Two
// design modes). Constants are NATURAL case: fancy uppercases via CSS
// textTransform (top bar, MagneticButton faces), minimal lowercases its
// links via CSS. LOGO_TEXT is a wordmark — caps IS its natural case.
const LOGO_TEXT = "SHAKEABHI";
const AVAILABLE = "Available for hire";
// Fancy mega name (owner call, Nov '26): the nickname is the headline,
// the real name rides in the mono intro line INSIDE the h1, so the heading
// still reads "Hi, I'm Abhishek Chandrasenan. Online, I go by Shake Abhi"
// for search engines and screen readers (Shake Abhi = the handle/domain;
// IRL everyone says Shake Mon — that's the egg). Natural case; the h1
// uppercases via CSS. Easter egg: click the red word → NICK_EGG ("Mon").
const HERO_INTRO = "Hi, I'm Abhishek Chandrasenan. Online, I go by";
const NICK_FIRST = "Shake";
const NICK_LAST = "Abhi";
const NICK_EGG = "Mon";
const VINYL_SIZE = "clamp(170px, calc(34vw - 200px), 290px)";
const NICK_EGG_NOTE = "(what everyone actually calls me)";

const LEAD_PRE = "Software engineer who ships at ";
const LEAD_EM = "founding-team speed";
const LEAD_POST =
  ", mentors humans, and treats production incidents like a sport. Most recently Lead Software Engineer at FanPro Studio — an AI media generation platform taken from an empty repo to public beta — based in Bengaluru.";
// Shared label text, per-mode arrow glyph (mock: fancy →, minimal ↓).
const CTA_WORK_TEXT = "See the work";
const CTA_WORK_ARROW = { fancy: "→", minimal: "↓" } as const;
const CTA_CV = "Grab the CV ↓";

// Minimal-only type: the calm hero shows the real name + a role line
// instead of the mega display face.
const NAME = "Abhishek Chandrasenan";
const ROLE_LINE = "software engineer · bengaluru · IST";

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
  const { sfx } = usePointer();
  const [mon, setMon] = useState(false);
  const nick = mon ? NICK_EGG : NICK_LAST;
  // Tilted tail like the old CHANDRA/SENAN split: Ab|hi, M|on.
  const nickCut = Math.floor(nick.length / 2);
  const toggleMon = () => {
    setMon((m) => !m);
    sfx.pop();
  };
  // SHAKE ME: restart the slab's `shake` keyframe on every click (off for
  // a frame, then on); cleared after it finishes. Never under reduced motion.
  const [shaking, setShaking] = useState(false);
  const shakeRaf = useRef<number | null>(null);
  const shakeTimer = useRef<number | null>(null);
  const shake = () => {
    if (reducedMotion) return;
    setShaking(false);
    if (shakeRaf.current !== null) cancelAnimationFrame(shakeRaf.current);
    if (shakeTimer.current !== null) window.clearTimeout(shakeTimer.current);
    shakeRaf.current = requestAnimationFrame(() => {
      setShaking(true);
      shakeTimer.current = window.setTimeout(() => setShaking(false), 650);
    });
  };
  useEffect(
    () => () => {
      if (shakeRaf.current !== null) cancelAnimationFrame(shakeRaf.current);
      if (shakeTimer.current !== null) window.clearTimeout(shakeTimer.current);
    },
    []
  );

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
              {/* No chip letter here — the mock's minimal top row is
                  exactly the wordmark (LOGO_TEXT). */}
              {LOGO_TEXT}
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
              {CTA_WORK_TEXT} {CTA_WORK_ARROW.minimal}
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
  // SEE THE WORK · SHAKE ME · GRAB THE CV — rendered in ONE of two spots
  // by breakpoint (display:none hides the other from AT too).
  const ctaRow = (className: string, style?: CSSProperties) => (
    <div
      className={className}
      style={{ flexWrap: "wrap", alignItems: "center", gap: 14, ...style }}
    >
      <MagneticButton kind='danger' onClick={goToWork}>
        {CTA_WORK_TEXT} {CTA_WORK_ARROW.fancy}
      </MagneticButton>
      <ShakeMe onShake={shake} />
      <MagneticButton kind='ghost' onClick={openCv}>
        {CTA_CV}
      </MagneticButton>
    </div>
  );

  return (
    <Slab
      bg={cream}
      label='01 // HELLO'
      className='lg:min-h-[1020px]'
      // 88 (was 70): drops the nav row clear of the fixed FUNKY toggle.
      style={{
        paddingTop: 88,
        // Clears the absolute bottom marquee (~62px) + breathing room. Below
        // lg the slab has no min-height, so without this the CTA row ran
        // into the marquee on tablet/mobile.
        paddingBottom: 140,
        // No fixed descendants in the hero, so a transform here is safe
        // (trap 1 only bites fixed chrome, which lives outside <main>).
        animation: shaking ? "shake .6s cubic-bezier(.36,.07,.19,.97)" : "none",
      }}
    >
      {/* Top bar */}
      <div
        className='flex flex-wrap items-center justify-between gap-x-6 gap-y-3'
        style={{
          fontFamily: fonts.mono,
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.15em",
          // Natural-case NAV/AVAILABLE constants → fancy caps via CSS.
          textTransform: "uppercase",
          color: ink,
          marginBottom: 50,
        }}
      >
        {/* Named from its visible content ("A SHAKEABHI") — an aria-label
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
        {/* Phones: the bar wraps, so this gets its own centred row instead
            of dangling under the logo. */}
        <div
          className='max-sm:w-full max-sm:justify-center'
          style={{ display: "flex", gap: 10, alignItems: "center" }}
        >
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

      {/* Right column (owner picks, Nov '26): live Last.fm vinyl, then (xl+)
          the CTA row with SHAKE ME in the middle (eyes removed for now). lg+ only;
          NOT aria-hidden — caption + buttons are real content. Right-
          aligned so the wide CTA row grows leftwards, never under the
          vinyl. Between lg and xl the row is too wide for this column (it
          would hit ABHI), so it falls back under the lead copy instead. */}
      <div
        // The column's box is as wide as the xl CTA row (~575px) and sits
        // at zIndex 1, so its empty area covered the eyes after SHAKE and
        // ate their double-click. The box itself ignores the pointer; its
        // children (vinyl, CTA row) opt back in.
        className='pointer-events-none hidden lg:flex [&>*]:pointer-events-auto'
        style={{
          position: "absolute",
          // Tracks the content max-width on wide screens (30px inside the
          // gutter); the clamp still rules up to 1440.
          right: `max(clamp(56px, 7.6vw, 110px), calc(${spacing.gutterRight} + 30px))`,
          // Vertically centred in the band between the nav row and the
          // bottom marquee (owner call) — top/bottom pin the column to
          // that band and justifyContent centres the stack inside it.
          top: 130,
          bottom: 90,
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 22,
          zIndex: 1,
        }}
      >
        <Vinyl size={VINYL_SIZE} />
        {/* Extra air between the vinyl caption and the CTAs (owner call). */}
        {ctaRow("hidden xl:flex", { marginTop: 28 })}
      </div>

      {/* Sticker chaos + eyes — 1440-positioned decoration, hidden < lg */}
      <div aria-hidden='true' className='hidden lg:block'></div>

      {/* Main type */}
      <div style={{ marginTop: 40, position: "relative" }}>
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
          <span
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              columnGap: 16,
              rowGap: 4,
              fontFamily: fonts.mono,
              fontWeight: 900,
              fontSize: "clamp(15px, 1.67vw, 24px)",
              lineHeight: 1.3,
              letterSpacing: "0.1em",
              marginBottom: 14,
            }}
          >
            <span>{HERO_INTRO}</span>
            <Squiggle w={120} color={red} />
          </span>
          <span style={{ position: "relative", display: "inline-block" }}>
            <ScrambleHover text={NICK_FIRST} />
            {/* Eye pair peeking out after SHAKE (owner ask): absolutely
                placed in the ~140px gap before the vinyl, so it never moves
                or covers anything. md+ only — on phones SHAKE fills the
                width. */}
            <span
              aria-hidden='true'
              className='hidden md:block'
              style={{
                position: "absolute",
                left: "100%",
                top: "50%",
                marginLeft: 18,
                transform: "translateY(-50%) rotate(-6deg)",
                lineHeight: 0,
              }}
            >
              <Eyes size={40} gap={10} />
            </span>
          </span>
          <br />
          <span
            onClick={toggleMon}
            style={{
              color: red,
              position: "relative",
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            {/* key remounts ScrambleHover so it picks up the swapped word */}
            <ScrambleHover key={`${nick}-a`} text={nick.slice(0, nickCut)} />
            <span
              style={{
                display: "inline-block",
                transform: "translateY(8px) rotate(-2deg)",
              }}
            >
              <ScrambleHover key={`${nick}-b`} text={nick.slice(nickCut)} />
            </span>
            {mon && (
              <span
                aria-hidden='true'
                // md+: beside the word. Phones get the in-flow copy below
                // the h1 (beside MON it ran off a 393px screen).
                className='hidden md:block'
                style={{
                  position: "absolute",
                  left: "100%",
                  top: "34%",
                  marginLeft: 18,
                  whiteSpace: "nowrap",
                  fontFamily: fonts.hand,
                  fontWeight: 700,
                  fontSize: "clamp(20px, 2.2vw, 32px)",
                  letterSpacing: 0,
                  lineHeight: 1,
                  textTransform: "none",
                  color: ink,
                  transform: "rotate(-6deg)",
                }}
              >
                {NICK_EGG_NOTE}
              </span>
            )}
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
          {mon && (
            <span
              aria-hidden='true'
              className='block md:hidden'
              style={{
                marginTop: 18,
                fontFamily: fonts.hand,
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: 0,
                lineHeight: 1,
                textTransform: "none",
                color: ink,
                transform: "rotate(-3deg)",
                transformOrigin: "left center",
              }}
            >
              {NICK_EGG_NOTE}
            </span>
          )}
        </h1>

        <div style={{ marginTop: 36 }}>
          <p
            // lg+: stop short of the absolute right column so the copy can
            // never run under it — wider gap at xl+, where the ~560px CTA
            // row sits in that (vertically centred) column.
            className='max-w-[680px] lg:max-w-[min(680px,calc(100%_-_320px))] xl:max-w-[min(680px,calc(100%_-_630px))]'
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: text.lead,
              lineHeight: "var(--text-lead--line-height)",
              color: ink,
              margin: 0,
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
          {/* < xl fallback for the CTA row (see the right column). */}
          {/* Centred on mobile/tablet; left-aligned under the lead at lg–xl. */}
          {ctaRow("flex justify-center lg:justify-start xl:hidden", {
            marginTop: 32,
          })}
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
