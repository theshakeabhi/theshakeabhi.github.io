// STUB(P5): replaced by package P5 (typographic word-cloud of ~18 skill
// keywords in mixed sizes with hover scramble).
import Slab from "../components/primitives/Slab";
import { cream, ink, yellow, fonts, text } from "../tokens";

export default function Skills() {
  return (
    <Slab
      bg={ink}
      label='03 // STACK'
      style={{ color: cream, paddingTop: "var(--spacing-slab-top-deep)" }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: text.sub,
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
          color: cream,
        }}
      >
        STUFF I&rsquo;M GOOD AT{" "}
        <span style={{ color: yellow }}>(probably)</span>
      </h2>
    </Slab>
  );
}
