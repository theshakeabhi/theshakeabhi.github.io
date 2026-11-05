// Hero vinyl (owner pick, Nov '26): a record whose label + caption show the
// owner's latest Last.fm scrobble (Spotify → Last.fm, src/lib/useLastfmTrack).
// Spins with the tonearm down while a track is playing RIGHT NOW; parked
// (still disc, arm lifted) for "last spun" or when Last.fm has nothing.
//
// Fancy-only flourish like the rest of the hero sticker layer — renders
// null in minimal (guard AFTER hooks). SSR-safe: the hook is null on the
// server and first paint, so the static fallback (genres) pre-renders.
// Reduced motion: no spin, no arm transition (global CSS also freezes it).
// Scratchable (owner ask): grab the disc and spin it in place — rotation
// tracks the pointer's angle around the centre, and angular speed drives a
// record-scratch synth (vinylScratch.ts, gated on the sfx pref;
// AudioContext only from the pointerdown gesture — trap 5).
import { useEffect, useRef, useState, type PointerEvent } from "react";
import Hover from "../pointer/Hover";
import { usePointer } from "../pointer/PointerProvider";
import { startScratch, stopScratch, updateScratch } from "./vinylScratch";
import { usePrefs } from "../../lib/prefs";
import { useLastfmTrack } from "../../lib/useLastfmTrack";
import { cream, ink, red, accent, borders, fonts, shadows } from "../../tokens";

// Shown until/unless Last.fm returns a track (matches the Now-board copy).
const ON_ROTATION = "Techno · hard tech · schranz · indie";
const SPIN = "spin 1.8s linear infinite"; // ≈ 33⅓ rpm

const grooves = `repeating-radial-gradient(circle at 50% 50%, ${ink} 0 2px, color-mix(in srgb, ${ink} 78%, ${cream}) 2px 3px)`;

export default function Vinyl({ size = 290 }: { size?: number | string }) {
  const { minimal, reducedMotion, sfx: soundOn } = usePrefs();
  const { setHot } = usePointer();
  const track = useLastfmTrack();
  const [scrub, setScrub] = useState(0);
  const [dragging, setDragging] = useState(false);
  // Turntable scratch: rotation follows the pointer's ANGLE around the
  // disc centre (the record stays put — owner call).
  const drag = useRef<{
    cx: number;
    cy: number;
    la: number;
    lt: number;
  } | null>(null);
  const idle = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (idle.current !== null) window.clearTimeout(idle.current);
      stopScratch();
    },
    []
  );

  if (minimal) return null;

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
    setScrub((r) => r + step);
    // ~1°/ms is a hard flick → map onto the synth's px/ms-ish range.
    updateScratch((step / dt) * 1.6);
    // Held still → the needle goes quiet.
    if (idle.current !== null) window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => updateScratch(0), 60);
  };
  const onUp = () => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    setHot(null);
    if (idle.current !== null) window.clearTimeout(idle.current);
    stopScratch();
  };

  const playing = !!track?.nowPlaying;
  const animate = !reducedMotion;
  const eyebrow = !track
    ? "On rotation"
    : playing
      ? "Now spinning"
      : "Last spun";

  return (
    // inline-size container: the label type scales with the disc (cqw).
    <div
      style={{
        width: size,
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
                {track ? track.name : "shakeabhi"}
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
                {track ? track.artist : "side a · 33⅓"}
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

      {/* Caption — the real info (the label above is aria-hidden). */}
      <div
        style={{
          marginTop: 16,
          fontFamily: fonts.mono,
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: ink,
          lineHeight: 1.45,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
        {track ? (
          <Hover
            as='a'
            kind='link'
            href={track.url}
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              marginTop: 4,
              color: ink,
              textDecorationLine: "underline",
              textDecorationColor: red,
              textDecorationThickness: 3,
              textUnderlineOffset: 4,
            }}
          >
            “{track.name}” — {track.artist}
          </Hover>
        ) : (
          <div style={{ marginTop: 4, color: ink }}>{ON_ROTATION}</div>
        )}
      </div>
    </div>
  );
}
