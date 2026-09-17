// STUB(P5): replaced by package P5 (portrait + tape + burst, two body
// paragraphs with yellow <em> highlights, 4-stat grid).
import Slab from "../components/primitives/Slab";
import { cream, ink, red, borders, fonts, text } from "../tokens";

export default function About() {
  return (
    <Slab
      bg={cream}
      label='02 // ABOUT'
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
          fontSize: text.sub,
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
          color: ink,
        }}
      >
        ABOUT.<span style={{ color: red }}>TXT</span>
      </h2>
    </Slab>
  );
}
