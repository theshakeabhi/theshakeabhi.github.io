// P4 — hover-glitch headline, ported from micro.jsx.
// Pointer-enter starts a 32ms-interval scrambler revealing frame*0.6 chars
// per tick; un-revealed positions fill from the charset below. Pointer-leave
// cancels and snaps the original text back (README §Hover-Scramble
// Headlines). Under reduced motion it never scrambles — plain text only.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePointer } from "../pointer/PointerProvider";
import { usePrefs } from "../../lib/prefs";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*█▓▒░";

export interface ScrambleHoverProps {
  text: string;
  style?: CSSProperties;
}

export default function ScrambleHover({ text, style }: ScrambleHoverProps) {
  const [v, setV] = useState(text);
  const tickRef = useRef<number | null>(null);
  const { setHot, sfx } = usePointer();
  const { reducedMotion, minimal } = usePrefs();

  // Clear any in-flight scramble if unmounted mid-glitch.
  useEffect(() => {
    return () => {
      if (tickRef.current !== null) window.clearInterval(tickRef.current);
    };
  }, []);

  // Minimal mode: plain text, no pointer handlers, no glitch (guard AFTER
  // all hooks).
  if (minimal) return <span style={style}>{text}</span>;

  const start = () => {
    setHot("link");
    sfx.hover();
    if (reducedMotion) return; // no scrambling — text stays plain
    let frame = 0;
    if (tickRef.current !== null) window.clearInterval(tickRef.current);
    tickRef.current = window.setInterval(() => {
      frame++;
      const reveal = frame * 0.6;
      const out = text
        .split("")
        .map((c, i) => {
          if (i < reveal) return c;
          if (c === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setV(out);
      if (reveal >= text.length) {
        if (tickRef.current !== null) window.clearInterval(tickRef.current);
        tickRef.current = null;
        setV(text);
      }
    }, 32);
  };

  const stop = () => {
    setHot(null);
    if (tickRef.current !== null) window.clearInterval(tickRef.current);
    tickRef.current = null;
    setV(text);
  };

  return (
    // Prototype set an inline `cursor: none` here; OS-cursor hiding is now
    // handled globally by PointerProvider's data-cursor-hidden attribute
    // (HANDOFF_NOTES P1 → P4), which already respects the cursor pref,
    // reduced motion and coarse pointers — so no per-span cursor style.
    <span onPointerEnter={start} onPointerLeave={stop} style={style}>
      {v}
    </span>
  );
}
