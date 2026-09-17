// STUB(P6): replaced by package P6 (three experiment cards: The Counter
// That Complains, Hue Democracy, Bouncy Boi).
import Slab from "../components/primitives/Slab";
import { cream, ink, yellow, fonts, text } from "../tokens";

export default function Playground() {
  return (
    <Slab
      bg={ink}
      label='07 // PLAYGROUND'
      style={{ color: cream, paddingTop: "var(--spacing-slab-top-deep)" }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: text.section,
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          color: cream,
        }}
      >
        THE <span style={{ color: yellow }}>PLAYGROUND</span>
      </h2>
    </Slab>
  );
}
