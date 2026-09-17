// STUB(P6): replaced by package P6 (cork-board graph grid on --color-cork,
// 8 draggable sticky notes with sticky_v2_ persistence, ↻ RESET LAYOUT).
// Below 768px the cork board collapses into a vertical list of notes.
import Slab from "../components/primitives/Slab";
import { creamWarm, ink, red, borders, fonts, text } from "../tokens";

export default function NowBoard() {
  return (
    <Slab
      bg={creamWarm}
      label='05 // NOW'
      id='now'
      style={{
        paddingTop: "var(--spacing-slab-top-deep)",
        borderTop: borders.thick,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: text.section,
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          color: ink,
        }}
      >
        NOW<span style={{ color: red }}>.</span>
      </h2>
    </Slab>
  );
}
