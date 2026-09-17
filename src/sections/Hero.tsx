// STUB(P5): replaced by package P5 (top bar + logo easter egg, nav,
// available-for-hire dot, lead copy, magnetic CTAs, eyes, bottom marquee).
import Slab from "../components/primitives/Slab";
import { cream, ink, red, fonts, text } from "../tokens";

export default function Hero() {
  return (
    <Slab
      bg={cream}
      label='01 // HELLO'
      style={{ paddingTop: 70, paddingBottom: 60 }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: text.mega,
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          color: ink,
          textTransform: "uppercase",
        }}
      >
        ABHISHEK
        <br />
        <span style={{ color: red }}>
          CHANDRA
          <span
            style={{
              display: "inline-block",
              transform: "translateY(8px) rotate(-2deg)",
            }}
          >
            SENAN
          </span>
        </span>
      </h1>
    </Slab>
  );
}
