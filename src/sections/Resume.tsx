// STUB(P6): replaced by package P6 (headline + CTAs + last-updated stamp,
// 380×480 CV preview rotated 2deg with tape).
import Slab from "../components/primitives/Slab";
import { creamWarm, ink, red, borders, fonts, text } from "../tokens";

export default function Resume() {
  return (
    <Slab
      bg={creamWarm}
      label='09 // CV'
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
        THE
        <br />
        CV<span style={{ color: red }}>.</span>
      </h2>
    </Slab>
  );
}
