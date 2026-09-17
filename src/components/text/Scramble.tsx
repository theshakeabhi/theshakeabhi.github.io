// P4 — iterative character-reveal scrambler, ported from micro.jsx.
// 40ms step interval, reveals at i/2 rate; un-revealed positions fill from
// the charset below (README §Scramble Text). Re-runs when `trigger` changes.
// Under reduced motion it never scrambles — plain text, no interval.
import { useEffect, useState, type CSSProperties } from "react";
import { usePrefs } from "../../lib/prefs";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export interface ScrambleProps {
  text: string;
  trigger?: unknown;
  speed?: number;
  style?: CSSProperties;
}

export default function Scramble({
  text,
  trigger = 0,
  speed = 40,
  style,
}: ScrambleProps) {
  // SSR-safe: initial state is the final text — identical first paint on
  // server and client; the interval only starts in the effect after mount.
  const [v, setV] = useState(text);
  const { reducedMotion } = usePrefs();

  useEffect(() => {
    if (reducedMotion) {
      setV(text);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      const out = text
        .split("")
        .map((c, idx) => {
          if (idx < i / 2) return c;
          if (c === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setV(out);
      if (i / 2 >= text.length) {
        window.clearInterval(id);
        setV(text);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [trigger, text, speed, reducedMotion]);

  return <span style={style}>{v}</span>;
}
