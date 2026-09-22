// P4 — fixed right-edge vertical ribbon, ported from micro.jsx.
// 36px strip: red bg, cream fg, 3px ink left border, writing-mode
// vertical-rl, marqV 40s vertical marquee with tripled items to avoid pop,
// pointer-events: none so it never blocks clicks (README §Side Ribbon).
// Not rendered below 768px (AGENTS.md breakpoints); static under reduced
// motion. Must mount OUTSIDE any transformed ancestor (trap 1) —
// Portfolio.tsx mounts it at the top level.
import { usePrefs } from "../../lib/prefs";
import { useMediaQuery } from "../../lib/useMediaQuery";
import { cream, fonts, ink, red } from "../../tokens";

export interface SideRibbonProps {
  items?: string[];
  speed?: number;
  color?: string;
  fg?: string;
}

export default function SideRibbon({
  items = [],
  speed = 40,
  color = red,
  fg = cream,
}: SideRibbonProps) {
  const { reducedMotion, minimal } = usePrefs();
  const compact = useMediaQuery("(max-width: 767px)");
  // Minimal mode: pure flourish — render nothing. data-flourish below also
  // CSS-hides the pre-rendered ribbon before hydration flips this branch.
  if (compact || minimal) return null;

  return (
    <div
      aria-hidden='true'
      data-flourish=''
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        width: 36,
        background: color,
        color: fg,
        borderLeft: `3px solid ${ink}`,
        overflow: "hidden",
        zIndex: 200,
        writingMode: "vertical-rl",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          animation: reducedMotion ? "none" : `marqV ${speed}s linear infinite`,
          display: "flex",
          flexDirection: "column",
          gap: 40,
          padding: "20px 0",
          fontFamily: fonts.mono,
          fontWeight: 900,
          fontSize: 14,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
        }}
      >
        {[0, 1, 2].map((k) => (
          <div
            key={k}
            style={{ display: "flex", flexDirection: "column", gap: 40 }}
          >
            {items.map((it, i) => (
              <span key={i}>{it}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
