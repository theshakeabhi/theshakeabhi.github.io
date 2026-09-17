// STUB(P6): replaced by package P6 (live Bengaluru clock pill, email +
// social links, magnetic CTAs, footer on the same red).
import Slab from "../components/primitives/Slab";
import { cream, red, borders, fonts, text } from "../tokens";

export default function Contact() {
  return (
    <Slab
      bg={red}
      label='10 // SAY HI'
      id='contact'
      style={{
        paddingTop: "var(--spacing-slab-top-deep)",
        paddingBottom: 100,
        color: cream,
        borderTop: borders.thick,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: text.contact,
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          color: cream,
        }}
      >
        LET&rsquo;S
        <br />
        BUILD
        <br />
        <span
          style={{
            background: cream,
            color: red,
            padding: "0 22px",
            display: "inline-block",
            transform: "rotate(-2deg)",
          }}
        >
          SOMETHING.
        </span>
      </h2>
    </Slab>
  );
}
