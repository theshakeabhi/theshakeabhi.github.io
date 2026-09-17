// STUB(P5): replaced by package P5 (big EximPe card with IN PRODUCTION
// rubber stamp + KPI tiles, then the three BEFORE-EXIMPE tilt cards:
// SAWO Labs / QBurst / Zomato).
import Slab from "../components/primitives/Slab";
import { cream, ink, borders, fonts, text } from "../tokens";

export default function Work() {
  return (
    <Slab
      bg={cream}
      label='04 // WORK'
      id='work'
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
        WORK.
      </h2>
    </Slab>
  );
}
