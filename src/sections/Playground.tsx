// P6 — Playground section (portfolio-2.jsx): three experiment cards on the
// ink slab, each with a different hard offset shadow (red/cyan/yellow) and
// its own local state — counter / hue / bounce. Exact prototype behaviors:
// counter message thresholds, hsl(hue, 70%, 60%) preview, 400ms
// cubic-bezier squish-and-leap (suppressed under reduced motion).
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Slab from "../components/primitives/Slab";
import Stamp from "../components/primitives/Stamp";
import MagneticButton from "../components/interactive/MagneticButton";
import ScrambleHover from "../components/text/ScrambleHover";
import { useMediaQuery } from "../lib/useMediaQuery";
import { usePrefs } from "../lib/prefs";
import {
  cream,
  cyan,
  ink,
  inkDeep,
  red,
  yellow,
  slateLight,
  slateMid,
  fonts,
  text,
} from "../tokens";

const cardStyle: CSSProperties = {
  border: `4px solid ${cream}`,
  padding: "28px 28px 32px",
  background: inkDeep,
  position: "relative",
};

const labelStyle: CSSProperties = {
  fontFamily: fonts.mono,
  fontWeight: 700,
  fontSize: 13,
  color: slateMid,
  letterSpacing: "0.15em",
  marginBottom: 16,
};

const cardTitleStyle: CSSProperties = {
  fontFamily: fonts.display,
  fontWeight: 900,
  fontSize: text.cardTitle,
  lineHeight: 0.95,
  color: cream,
  margin: "0 0 18px",
};

export default function Playground() {
  const stacked = useMediaQuery("(max-width: 1023px)");
  const { reducedMotion } = usePrefs();
  const [counter, setCounter] = useState(0);
  const [hue, setHue] = useState(0);
  const [bounce, setBounce] = useState(0);
  const bounceTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(bounceTimer.current), []);

  const boing = () => {
    setBounce(1);
    window.clearTimeout(bounceTimer.current);
    bounceTimer.current = window.setTimeout(() => setBounce(0), 450);
  };

  const complaint =
    counter === 0
      ? "…go on, click it."
      : counter < 5
        ? "is that all?"
        : counter < 15
          ? "okay i see you."
          : counter < 30
            ? "log off."
            : "i'm calling HR.";

  return (
    <Slab
      bg={ink}
      label='07 // PLAYGROUND'
      style={{ color: cream, paddingTop: "var(--spacing-slab-top-deep)" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 40,
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
            color: cream,
          }}
        >
          <ScrambleHover text='THE' />{" "}
          <span style={{ color: yellow }}>
            <ScrambleHover text='PLAYGROUND' />
          </span>
        </h2>
        <Stamp
          color={yellow}
          rotate={-3}
          style={{ background: ink, color: yellow }}
        >
          POKE EVERYTHING
        </Stamp>
      </div>
      <p
        style={{
          fontFamily: fonts.body,
          fontWeight: 500,
          fontSize: text.body,
          lineHeight: 1.4,
          color: slateLight,
          maxWidth: 700,
          marginTop: 0,
          marginBottom: 50,
        }}
      >
        A junk drawer of little things I built for the joy of it. Each one is
        functional. Each one is mildly cursed.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: stacked ? "1fr" : "repeat(3, 1fr)",
          gap: 28,
        }}
      >
        {/* Experiment 01 — the counter that complains */}
        <div style={{ ...cardStyle, boxShadow: `10px 10px 0 ${red}` }}>
          <div style={labelStyle}>EXPERIMENT 01</div>
          <h3 style={cardTitleStyle}>
            THE COUNTER
            <br />
            THAT COMPLAINS
          </h3>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: text.sub,
              color: yellow,
              lineHeight: 1,
              textAlign: "center",
              margin: "8px 0",
            }}
          >
            {counter}
          </div>
          <div
            aria-live='polite'
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: 16,
              color: slateMid,
              textAlign: "center",
              marginBottom: 18,
              minHeight: 24,
            }}
          >
            {complaint}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <MagneticButton
              kind='danger'
              aria-label='Decrement counter'
              style={{ padding: "10px 16px" }}
              onClick={() => setCounter((n) => n - 1)}
            >
              −
            </MagneticButton>
            <MagneticButton
              kind='cyan'
              aria-label='Increment counter'
              style={{ padding: "10px 16px" }}
              onClick={() => setCounter((n) => n + 1)}
            >
              + 1
            </MagneticButton>
          </div>
        </div>

        {/* Experiment 02 — hue democracy */}
        <div style={{ ...cardStyle, boxShadow: `10px 10px 0 ${cyan}` }}>
          <div style={labelStyle}>EXPERIMENT 02</div>
          <h3 style={cardTitleStyle}>
            HUE
            <br />
            DEMOCRACY
          </h3>
          <div
            style={{
              width: "100%",
              height: 140,
              // User-driven experiment color, not a design token.
              background: `hsl(${hue}, 70%, 60%)`,
              border: `3px solid ${cream}`,
              display: "grid",
              placeItems: "center",
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 56,
              color: ink,
              transition: "background .2s",
              boxSizing: "border-box",
            }}
          >
            {Math.round(hue)}°
          </div>
          <input
            type='range'
            min='0'
            max='360'
            value={hue}
            aria-label='Hue'
            onChange={(e) => setHue(+e.target.value)}
            style={{ width: "100%", marginTop: 18, accentColor: cream }}
          />
        </div>

        {/* Experiment 03 — bouncy boi */}
        <div
          style={{
            ...cardStyle,
            boxShadow: `10px 10px 0 ${yellow}`,
            overflow: "hidden",
          }}
        >
          <div style={labelStyle}>EXPERIMENT 03</div>
          <h3 style={cardTitleStyle}>
            BOUNCY
            <br />
            BOI
          </h3>
          <div
            style={{
              height: 140,
              position: "relative",
              border: `3px solid ${cream}`,
              background: ink,
            }}
          >
            <div
              aria-hidden='true'
              style={{
                position: "absolute",
                left: "50%",
                bottom: 8,
                width: 64,
                height: 64,
                background: red,
                borderRadius: "50%",
                border: `3px solid ${cream}`,
                transform: `translate(-50%, ${-bounce * 80}px) scale(${1 + bounce * 0.15}, ${1 - bounce * 0.2})`,
                // JS-driven motion checks reducedMotion (AGENTS.md).
                transition: reducedMotion
                  ? "none"
                  : "transform 0.4s cubic-bezier(.22,1.6,.36,1)",
              }}
            />
          </div>
          <div
            style={{ marginTop: 18, display: "flex", justifyContent: "center" }}
          >
            <MagneticButton
              kind='cyan'
              style={{ padding: "10px 18px" }}
              onClick={boing}
            >
              BOING
            </MagneticButton>
          </div>
        </div>
      </div>
    </Slab>
  );
}
