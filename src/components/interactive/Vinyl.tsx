// Hero vinyl (owner pick, Nov '26): a record with the owner's genres as
// its caption. Parked (still disc, arm lifted) until Side A plays.
// (A Last.fm now-playing feed lived here until the owner deleted the
// account, Nov '26 — removed with src/lib/useLastfmTrack.ts.)
//
// Fancy-only flourish like the rest of the hero sticker layer — renders
// null in minimal (guard AFTER hooks). SSR-safe: loop state starts false,
// so server and first paint render the parked record.
// Reduced motion: no spin, no arm transition (global CSS also freezes it).
// Scratchable (owner ask): grab the disc and spin it in place — rotation
// tracks the pointer's angle around the centre, and angular speed drives a
// record-scratch synth (vinylScratch.ts, gated on the sfx pref;
// AudioContext only from the pointerdown gesture — trap 5).
// Side A (owner ask, Nov '26): click / tap the record or the PLAY SIDE A
// button to drop the needle on a live-synthesised acid loop (acidLoop.ts).
// While it plays, spinning the record IS the platter: drag speed sets
// tempo + pitch, holding still stalls it, release eases back to speed.
// Stops (with a power-off wind-down when asked) on click, on scroll-away,
// on tab hide, when sound is switched off, and in minimal mode.
import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  isLoopOn,
  onLoopChange,
  setLoopRate,
  settleLoopRate,
  startLoop,
  stopLoop,
} from "./acidLoop";
import Hover from "../pointer/Hover";
import { usePointer } from "../pointer/PointerProvider";
import { startScratch, stopScratch, updateScratch } from "./vinylScratch";
import { usePrefs } from "../../lib/prefs";
import { cream, ink, red, accent, borders, fonts, shadows } from "../../tokens";

// The owner's genres (caption while the record is parked).
// Genres joined with " · "; non-breaking spaces inside a genre so the
// caption only wraps between genres ("hard tech" never splits).
const ON_ROTATION = [
  "Techno",
  "house",
  "acid tech",
  "hard tech",
  "schranz",
  "indie",
]
  .map((g) => g.replace(/ /g, "\u00a0"))
  .join(" · ");
const SPIN = "spin 1.8s linear infinite"; // ≈ 33⅓ rpm
// Platter speed at rate 1: 360° per 1.8s.
const NORMAL_DEG_PER_MS = 360 / 1800;
// A press that barely turns the record (and is quick) is a click.
const CLICK_MAX_DEG = 6;
const CLICK_MAX_MS = 350;
const SIDE_A = "Side A · an acid loop, synthesised in your browser";

const grooves = `repeating-radial-gradient(circle at 50% 50%, ${ink} 0 2px, color-mix(in srgb, ${ink} 78%, ${cream}) 2px 3px)`;

export default function Vinyl({
  size = 290,
  strip = false,
}: {
  size?: number | string;
  /** Compact phone layout: small disc left, caption + button right. */
  strip?: boolean;
}) {
  const { minimal, reducedMotion, sfx: soundOn, setPref } = usePrefs();
  const { setHot } = usePointer();
  const [scrub, setScrub] = useState(0);
  const [dragging, setDragging] = useState(false);
  // Turntable scratch: rotation follows the pointer's ANGLE around the
  // disc centre (the record stays put — owner call).
  const drag = useRef<{
    cx: number;
    cy: number;
    la: number;
    lt: number;
    t0: number;
    turned: number;
  } | null>(null);
  const idle = useRef<number | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  // Mirrors the module-level loop state (false on SSR + first paint).
  const [loopOn, setLoopOn] = useState(false);

  useEffect(() => {
    setLoopOn(isLoopOn());
    return onLoopChange(setLoopOn);
  }, []);

  useEffect(
    () => () => {
      if (idle.current !== null) window.clearTimeout(idle.current);
      stopScratch();
      stopLoop();
    },
    []
  );

  // Sound switched off or minimal mode → silence immediately.
  useEffect(() => {
    if (!soundOn || minimal) stopLoop();
  }, [soundOn, minimal]);

  // Never leave music playing where nobody can see the record: stop when
  // the vinyl scrolls out of view or the tab is hidden.
  useEffect(() => {
    if (!loopOn) return;
    const el = wrap.current;
    const io =
      el && "IntersectionObserver" in window
        ? new IntersectionObserver(([en]) => {
            // The hero mounts one Vinyl per breakpoint and CSS hides the
            // others — a display:none copy reports "not intersecting" and
            // must not stop the music the visible copy is playing.
            if (!el.getClientRects().length) return;
            if (en && !en.isIntersecting) stopLoop();
          })
        : null;
    if (io && el) io.observe(el);
    const onVis = () => {
      if (document.hidden) stopLoop();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [loopOn]);

  if (minimal) return null;

  const play = () => {
    // Pressing play IS asking for sound — flip the pref on if it was off.
    if (!soundOn) setPref("sfx", true);
    startLoop();
  };
  const toggle = () => (loopOn ? stopLoop(true) : play());

  const angleAt = (x: number, y: number, cx: number, cy: number) =>
    (Math.atan2(y - cy, x - cx) * 180) / Math.PI;
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const r = e.currentTarget.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    drag.current = {
      cx,
      cy,
      la: angleAt(e.clientX, e.clientY, cx, cy),
      lt: performance.now(),
      t0: performance.now(),
      turned: 0,
    };
    setDragging(true);
    setHot("drag");
    if (soundOn) startScratch();
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const now = performance.now();
    const dt = Math.max(1, now - d.lt);
    const a = angleAt(e.clientX, e.clientY, d.cx, d.cy);
    // Shortest signed step across the ±180° seam.
    const step = ((a - d.la + 540) % 360) - 180;
    d.la = a;
    d.lt = now;
    d.turned += Math.abs(step);
    setScrub((r) => r + step);
    // ~1°/ms is a hard flick → map onto the synth's px/ms-ish range.
    updateScratch((step / dt) * 1.6);
    // Side A: the hand IS the platter. Forward = speed ∝ spin; backwards
    // can't play a synth in reverse, so it drags slow and dull instead.
    const omega = step / dt;
    setLoopRate(omega >= 0 ? omega / NORMAL_DEG_PER_MS : 0.25);
    // Held still → the needle goes quiet and the loop stalls.
    if (idle.current !== null) window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => {
      updateScratch(0);
      setLoopRate(0);
    }, 60);
  };
  const onUp = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    setDragging(false);
    setHot(null);
    if (idle.current !== null) window.clearTimeout(idle.current);
    stopScratch();
    const click =
      d.turned < CLICK_MAX_DEG && performance.now() - d.t0 < CLICK_MAX_MS;
    if (click) toggle();
    else settleLoopRate(); // let go → motor brings it back to speed
  };

  // Disc spins + arm drops while Side A plays.
  const playing = loopOn;
  const animate = !reducedMotion;
  const eyebrow = loopOn ? "Now spinning" : "On rotation";

  return (
    <div
      ref={wrap}
      style={
        strip
          ? {
              display: "flex",
              alignItems: "center",
              gap: 18,
              position: "relative",
            }
          : { width: size, position: "relative" }
      }
    >
      {/* inline-size container: the label type scales with the disc (cqw). */}
      <div
        style={{
          width: size,
          flexShrink: 0,
          containerType: "inline-size",
          position: "relative",
        }}
      >
        <div
          aria-hidden='true'
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            cursor: dragging ? "grabbing" : "grab",
            touchAction: "none",
            userSelect: "none",
          }}
        >
          {/* Scrub layer (drag-driven rotation) around the auto-spin disc. */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              transform: `rotate(${scrub}deg)`,
            }}
          >
            {/* Disc + label rotate together. */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: grooves,
                border: borders.default,
                boxShadow: shadows.card,
                animation: animate ? SPIN : "none",
                animationPlayState: playing && !dragging ? "running" : "paused",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "31%",
                  borderRadius: "50%",
                  background: red,
                  border: borders.default,
                  display: "grid",
                  placeItems: "center",
                  color: cream,
                  textAlign: "center",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontSize: "3.2cqw",
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    maxWidth: "78%",
                    position: "absolute",
                    top: "18%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "78%",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  shakeabhi
                </div>
                {/* Spindle hole */}
                <span
                  style={{
                    width: "14%",
                    aspectRatio: "1 / 1",
                    borderRadius: "50%",
                    background: cream,
                    border: `2px solid ${ink}`,
                  }}
                />
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontWeight: 700,
                    fontSize: "2.8cqw",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    position: "absolute",
                    bottom: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "74%",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  side a · 33⅓
                </div>
              </div>
            </div>
          </div>

          {/* Tonearm: pivot top-right; swings onto the record while playing. */}
          <div
            style={{
              position: "absolute",
              top: "-4%",
              right: "-4%",
              width: "16%",
              height: "62%",
              transformOrigin: "50% 8%",
              transform: `rotate(${playing ? 24 : 4}deg)`,
              transition: animate
                ? "transform .6s cubic-bezier(.2,.8,.2,1)"
                : "none",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: 26,
                height: 26,
                marginLeft: -13,
                borderRadius: "50%",
                background: cream,
                border: borders.default,
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 12,
                bottom: 14,
                left: "50%",
                width: 7,
                marginLeft: -3.5,
                background: ink,
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                width: 16,
                height: 22,
                marginLeft: -8,
                background: ink,
                transform: "rotate(-18deg)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Caption — the real info (the label above is aria-hidden). */}
      <div
        style={{
          marginTop: strip ? 0 : 16,
          minWidth: 0,
          fontFamily: fonts.mono,
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: ink,
          lineHeight: 1.45,
          // Centred under the disc (owner call); left beside it in strip.
          textAlign: strip ? "left" : "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: strip ? "flex-start" : "center",
            gap: 8,
          }}
        >
          <span
            aria-hidden='true'
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: playing ? accent : ink,
              animation: playing && animate ? "pulse 1.2s infinite" : "none",
            }}
          />
          {eyebrow}
        </div>
        {loopOn ? (
          <div style={{ marginTop: 4, color: ink }}>{SIDE_A}</div>
        ) : (
          <div style={{ marginTop: 4, color: ink }}>{ON_ROTATION}</div>
        )}
        {/* Keyboard / screen-reader / tap path to the same toggle. */}
        <Hover
          as='button'
          type='button'
          kind='link'
          onClick={toggle}
          aria-pressed={loopOn}
          style={{
            marginTop: 10,
            background: loopOn ? ink : cream,
            color: loopOn ? cream : ink,
            border: borders.default,
            boxShadow: shadows.pressed,
            padding: "6px 12px",
            fontFamily: fonts.mono,
            fontWeight: 900,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          {loopOn ? "■ Stop" : "▶ Play side A"}
        </Hover>
      </div>
    </div>
  );
}
