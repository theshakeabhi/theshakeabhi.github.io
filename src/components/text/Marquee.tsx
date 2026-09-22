// P0 foundation — endless horizontal marquee, ported from micro.jsx.
// Triples its content to avoid pop; pauses under reduced motion. Minimal
// mode renders a single static pass — no animation, no tripling
// (AGENTS.md §Two design modes).
import type { CSSProperties, ReactNode } from "react";
import { usePrefs } from "../../lib/prefs";

export interface MarqueeProps {
  children?: ReactNode;
  speed?: number;
  dir?: 1 | -1;
  style?: CSSProperties;
}

export default function Marquee({
  children,
  speed = 60,
  dir = 1,
  style,
}: MarqueeProps) {
  const { reducedMotion, minimal } = usePrefs();

  if (minimal) {
    return (
      <div style={{ overflow: "hidden", whiteSpace: "nowrap", ...style }}>
        <div style={{ display: "inline-flex", gap: 24 }}>{children}</div>
      </div>
    );
  }

  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", ...style }}>
      <div
        style={{
          display: "inline-flex",
          gap: 24,
          animation: reducedMotion ? "none" : `marq ${speed}s linear infinite`,
          animationDirection: dir > 0 ? "normal" : "reverse",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: "inline-flex", gap: 24 }}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
