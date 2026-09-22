// P0 foundation — between-section marquee strip, ported from app.jsx.
// Below 768px it renders a static centered tag row instead of the marquee.
import type { CSSProperties } from "react";
import Marquee from "../text/Marquee";
import { useMediaQuery } from "../../lib/useMediaQuery";
import { cream, ink, borders, fonts } from "../../tokens";

export interface SectionDividerProps {
  items: string[];
  dir?: 1 | -1;
  bg?: string;
  fg?: string;
}

const itemStyle: CSSProperties = {
  fontFamily: fonts.display,
  fontWeight: 900,
  fontSize: 22,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

export default function SectionDivider({
  items,
  dir = 1,
  bg = ink,
  fg = cream,
}: SectionDividerProps) {
  const compact = useMediaQuery("(max-width: 767px)");
  return (
    <div
      aria-hidden='true'
      style={{
        background: bg,
        color: fg,
        padding: "14px 0",
        borderTop: borders.thick,
        borderBottom: borders.thick,
        overflow: "hidden",
      }}
    >
      {compact ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px 20px",
            padding: "0 16px",
          }}
        >
          {items.map((t, i) => (
            <span key={i} style={{ ...itemStyle, fontSize: 16 }}>
              {t}
            </span>
          ))}
        </div>
      ) : (
        <Marquee speed={45} dir={dir}>
          {items.concat(items).map((t, i) => (
            <span key={i} style={itemStyle}>
              {t}
            </span>
          ))}
        </Marquee>
      )}
    </div>
  );
}
