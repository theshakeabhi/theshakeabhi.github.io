// "SHAKE ME" hero sticker (owner pick, Nov '26 — a pun on the nickname).
// Click → onShake() (the Hero shakes its slab) + a confetti burst out of
// the sticker + sfx.yay(). Fancy-only: renders null in minimal (guard AFTER
// hooks). Reduced motion: no confetti, no wobble — the parent also skips
// the shake; the click still answers with the sound.
// SSR-safe: confetti pieces are only created inside the click handler.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Hover from "../pointer/Hover";
import { usePointer } from "../pointer/PointerProvider";
import { usePrefs } from "../../lib/prefs";
import { confetti, ink, yellow, borders, fonts, shadows } from "../../tokens";

interface Piece {
  id: number;
  dx: number;
  dy: number;
  rot: number;
  color: string;
  w: number;
  h: number;
}

const PIECES = 26;
const BURST_MS = 900;

export default function ShakeMe({
  onShake,
  style,
}: {
  onShake: () => void;
  style?: CSSProperties;
}) {
  const { minimal, reducedMotion } = usePrefs();
  const { sfx } = usePointer();
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const seq = useRef(0);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    []
  );

  if (minimal) return null;

  const fire = () => {
    sfx.yay();
    onShake();
    if (reducedMotion) return;
    const burst: Piece[] = Array.from({ length: PIECES }, (_, i) => {
      const a = (i / PIECES) * Math.PI * 2 + Math.random() * 0.4;
      const dist = 90 + Math.random() * 130;
      return {
        id: ++seq.current,
        dx: Math.cos(a) * dist,
        dy: Math.sin(a) * dist - 40,
        rot: (Math.random() - 0.5) * 900,
        color: confetti[i % confetti.length],
        w: 8 + Math.random() * 8,
        h: 5 + Math.random() * 6,
      };
    });
    setPieces(burst);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPieces([]), BURST_MS);
  };

  return (
    // Tilt lives on the wrapper so the hover jitter (a transform keyframe)
    // never cancels it.
    <div
      style={{
        position: "relative",
        display: "inline-block",
        transform: "rotate(-7deg)",
        ...style,
      }}
    >
      <Hover
        as='button'
        type='button'
        kind='link'
        onClick={fire}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          setPressed(false);
          setHovered(false);
        }}
        style={{
          background: yellow,
          color: ink,
          border: borders.default,
          boxShadow: pressed ? shadows.pressed : shadows.card,
          padding: "12px 20px 10px",
          fontFamily: fonts.display,
          fontSize: 24,
          letterSpacing: "0.02em",
          lineHeight: 1,
          cursor: "pointer",
          transform: pressed ? "translate(4px, 4px)" : "none",
          transition: "transform .08s, box-shadow .08s",
          animation: hovered && !reducedMotion ? "jitter .3s infinite" : "none",
        }}
      >
        SHAKE ME
      </Hover>
      {pieces.map((p) => (
        <span
          key={p.id}
          aria-hidden='true'
          style={
            {
              position: "absolute",
              left: "50%",
              top: "50%",
              width: p.w,
              height: p.h,
              marginLeft: -p.w / 2,
              marginTop: -p.h / 2,
              background: p.color,
              border: `1.5px solid ${ink}`,
              pointerEvents: "none",
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              "--rot": `${p.rot}deg`,
              animation: `confetti-pop ${BURST_MS}ms cubic-bezier(.15,.7,.3,1) forwards`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
