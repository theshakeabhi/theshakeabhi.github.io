// Product-screenshot carousel for the Work cards (owner request, Nov '26 —
// replaces the "Product Screens" PlaceholderImg slots). Manual only: no
// autoplay (a11y), prev/next buttons, dot pager, ←/→ keys while focused,
// horizontal swipe on touch. Slides are pre-cropped 1600×996 JPEGs in
// public/work/.
//
// SSR-SAFE: deterministic index 0, no browser APIs outside handlers.
// Both design modes (AGENTS.md §Two design modes), ONE slide list:
//   fancy   → ink frame, hard shadow, red/yellow chunky controls;
//   minimal → hairline frame, mono "← prev · 1 / 4 · next →" row, no motion.
// The slide track only animates when !minimal && !reducedMotion.
import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Hover from "../pointer/Hover";
import { usePointer } from "../pointer/PointerProvider";
import { usePrefs } from "../../lib/prefs";
import {
  cream,
  ink,
  red,
  yellow,
  slate,
  accent,
  borders,
  fonts,
  shadows,
} from "../../tokens";

export interface ScreenSlide {
  src: string;
  alt: string;
  caption: string;
}

// Natural pixel size of every slide (see header) — reserves layout space.
const IMG_W = 1600;
const IMG_H = 996;
const SWIPE_PX = 40;

const pad2 = (n: number) => String(n).padStart(2, "0");

export default function ScreenCarousel({
  slides,
  label,
}: {
  slides: ScreenSlide[];
  /** Accessible name, e.g. "FanPro Studio product screens". */
  label: string;
}) {
  const { minimal, reducedMotion } = usePrefs();
  const { sfx } = usePointer();
  const [index, setIndex] = useState(0);
  const swipeX = useRef<number | null>(null);
  const count = slides.length;

  const go = (next: number) => {
    setIndex(((next % count) + count) % count);
    sfx.click();
  };
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") swipeX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (swipeX.current === null) return;
    const dx = e.clientX - swipeX.current;
    swipeX.current = null;
    if (dx > SWIPE_PX) prev();
    else if (dx < -SWIPE_PX) next();
  };

  const animate = !minimal && !reducedMotion;
  const current = slides[index];

  const viewport = (
    <div
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (swipeX.current = null)}
      style={{
        overflow: "hidden",
        background: ink,
        aspectRatio: `${IMG_W} / ${IMG_H}`,
        touchAction: "pan-y",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          transform: `translateX(-${index * 100}%)`,
          transition: animate
            ? "transform .45s cubic-bezier(.2,.8,.2,1)"
            : "none",
        }}
      >
        {slides.map((s, i) => (
          <div
            key={s.src}
            role='group'
            aria-roledescription='slide'
            aria-label={`${i + 1} of ${count}: ${s.caption}`}
            aria-hidden={i !== index}
            style={{ flex: "0 0 100%", height: "100%" }}
          >
            <img
              src={s.src}
              alt={s.alt}
              width={IMG_W}
              height={IMG_H}
              loading={i === 0 ? "eager" : "lazy"}
              decoding='async'
              draggable={false}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                userSelect: "none",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // Visible caption + counter; the live region announces slide changes.
  const status = (
    <span aria-live='polite' aria-atomic='true'>
      <span className='sr-only'>
        Slide {index + 1} of {count}:{" "}
      </span>
      {current.caption}
    </span>
  );

  if (minimal) {
    const linkBtn: CSSProperties = {
      background: "none",
      border: 0,
      padding: "4px 0",
      font: "inherit",
      color: ink,
      cursor: "pointer",
      textDecorationLine: "underline",
      textDecorationThickness: 1,
      textUnderlineOffset: 3,
    };
    return (
      <section
        aria-roledescription='carousel'
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{ margin: "18px 0 6px" }}
      >
        <div style={{ border: borders.default }}>{viewport}</div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
            marginTop: 8,
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: "0.08em",
            color: slate,
          }}
        >
          <span style={{ textTransform: "lowercase" }}>{status}</span>
          <span style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button
              type='button'
              onClick={prev}
              style={linkBtn}
              className='decoration-hairline hover:decoration-accent'
            >
              <span aria-hidden='true'>← </span>prev
            </button>
            <span aria-hidden='true' style={{ color: accent }}>
              {index + 1} / {count}
            </span>
            <button
              type='button'
              onClick={next}
              style={linkBtn}
              className='decoration-hairline hover:decoration-accent'
            >
              next<span aria-hidden='true'> →</span>
            </button>
          </span>
        </div>
      </section>
    );
  }

  const ctrlBtn = (bg: string, fg: string): CSSProperties => ({
    width: 44,
    height: 44,
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    background: bg,
    color: fg,
    border: borders.default,
    boxShadow: shadows.pressed,
    fontFamily: fonts.display,
    fontSize: 20,
    cursor: "pointer",
  });

  return (
    <section
      aria-roledescription='carousel'
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      style={{ position: "relative" }}
    >
      <div
        style={{
          border: borders.thick,
          boxShadow: shadows.card,
          background: ink,
        }}
      >
        {viewport}
      </div>
      {/* Counter chip, top-left over the frame. */}
      <div
        aria-hidden='true'
        style={{
          position: "absolute",
          top: -14,
          left: 14,
          background: yellow,
          color: ink,
          border: borders.default,
          padding: "3px 10px",
          fontFamily: fonts.mono,
          fontWeight: 900,
          fontSize: 13,
          letterSpacing: "0.1em",
          transform: "rotate(-3deg)",
        }}
      >
        {pad2(index + 1)} / {pad2(count)}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 16,
        }}
      >
        <Hover
          as='button'
          type='button'
          aria-label='Previous screenshot'
          onClick={prev}
          style={ctrlBtn(cream, ink)}
        >
          <span aria-hidden='true'>←</span>
        </Hover>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            fontFamily: fonts.mono,
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: ink,
          }}
        >
          {status}
          <div
            aria-hidden='true'
            style={{ display: "flex", gap: 6, marginTop: 8 }}
          >
            {slides.map((s, i) => (
              <span
                key={s.src}
                style={{
                  width: i === index ? 22 : 10,
                  height: 10,
                  background: i === index ? red : cream,
                  border: borders.default,
                  transition: animate ? "width .2s" : "none",
                }}
              />
            ))}
          </div>
        </div>
        <Hover
          as='button'
          type='button'
          aria-label='Next screenshot'
          onClick={next}
          style={ctrlBtn(red, cream)}
        >
          <span aria-hidden='true'>→</span>
        </Hover>
      </div>
    </section>
  );
}
