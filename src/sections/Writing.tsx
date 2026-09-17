// STUB(P6): replaced by package P6 (blog row list from src/content/writing.ts
// with brutalist hover inversion).
import Slab from "../components/primitives/Slab";
import { cream, ink, red, borders, fonts, text } from "../tokens";

export default function Writing() {
  return (
    <Slab
      bg={cream}
      label='06 // WRITING'
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
        THINGS I&rsquo;VE
        <br />
        WRITTEN<span style={{ color: red }}>.</span>
      </h2>
    </Slab>
  );
}
