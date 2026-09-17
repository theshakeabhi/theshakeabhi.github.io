// STUB(P6): replaced by package P6 (2-column tilt quote cards from
// src/content/testimonials.ts, sticky colors + tape strips).
import Slab from "../components/primitives/Slab";
import { cream, ink, red, borders, fonts, text } from "../tokens";

export default function Testimonials() {
  return (
    <Slab
      bg={cream}
      label='08 // SAID OF ME'
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
        WHAT PEOPLE
        <br />
        SAY<span style={{ color: red }}>.</span>{" "}
        <span
          style={{
            fontFamily: fonts.mono,
            fontWeight: 900,
            fontSize: text.cardTitle,
            letterSpacing: "0.05em",
            color: ink,
          }}
        >
          (when I&rsquo;m not in the room)
        </span>
      </h2>
    </Slab>
  );
}
