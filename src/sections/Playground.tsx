// P6 — Playground section (portfolio-2.jsx): three experiment cards on the
// ink slab, each with a different hard offset shadow (red/cyan/yellow) and
// its own local state — counter / hue / bounce. Exact prototype behaviors:
// counter message thresholds, hsl(hue, 70%, 60%) preview, 400ms
// cubic-bezier squish-and-leap (suppressed under reduced motion).
// Minimal mode (AGENTS.md §Two design modes): hairline cards, SAME state,
// SAME toys fully functional — MagneticButtons stay (they auto-quiet).
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Slab from "../components/primitives/Slab";
import MinimalColumn from "../components/primitives/MinimalColumn";
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
  slate,
  slateLight,
  slateMid,
  borders,
  fonts,
  text,
} from "../tokens";

// Copy shared by BOTH design modes. Fancy card headings render
// lines[0]<br/>lines[1]; minimal card titles join the lines.
const PLAYGROUND_SUB =
  "A junk drawer of little things I built for the joy of it. Each one is functional. Each one is mildly cursed.";
const EXPERIMENTS = [
  { num: "01", lines: ["THE COUNTER", "THAT COMPLAINS"] },
  { num: "02", lines: ["HUE", "DEMOCRACY"] },
  { num: "03", lines: ["BOUNCY", "BOI"] },
] as const;
const BTN_DEC = "−";
const BTN_INC = "+ 1";
const BTN_BOING = "BOING";

const minimalLabelStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontFamily: fonts.mono,
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: "0.14em",
  color: slate,
  textTransform: "uppercase",
  marginBottom: 26,
};

const minimalCardStyle: CSSProperties = {
  border: borders.default,
  padding: 18,
  background: cream,
};

const minimalCardTitleStyle: CSSProperties = {
  fontFamily: fonts.mono,
  fontWeight: 500,
  fontSize: 10.5,
  letterSpacing: "0.14em",
  color: slate,
  textTransform: "uppercase",
  margin: "0 0 14px",
};

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
  const { reducedMotion, minimal } = usePrefs();
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

  // Minimal branch — guard AFTER all hooks (state is shared across the
  // mode flip). ADDED hairline borderTop: fancy has none (the ink slab
  // contrast did the separating; cream-on-cream needs the rule).
  if (minimal) {
    return (
      <Slab
        bg={cream}
        style={{
          paddingTop: 52,
          paddingBottom: 64,
          borderTop: borders.default,
        }}
      >
        <MinimalColumn>
          <div style={minimalLabelStyle}>
            <span>07 / playground</span>
          </div>
          <p
            style={{
              fontFamily: fonts.body,
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.6,
              color: slate,
              margin: "0 0 26px",
              maxWidth: "62ch",
            }}
          >
            {PLAYGROUND_SUB}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {/* 01 — the counter that complains */}
            <div style={minimalCardStyle}>
              <h3 style={minimalCardTitleStyle}>
                {EXPERIMENTS[0].num} · {EXPERIMENTS[0].lines.join(" ")}
              </h3>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 700,
                  fontSize: 34,
                  lineHeight: 1,
                  color: ink,
                }}
              >
                {counter}
              </div>
              <div
                aria-live='polite'
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 400,
                  fontSize: 12,
                  color: slate,
                  minHeight: 30,
                  margin: "6px 0 10px",
                }}
              >
                {complaint}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <MagneticButton
                  kind='danger'
                  aria-label='Decrement counter'
                  onClick={() => setCounter((n) => n - 1)}
                >
                  {BTN_DEC}
                </MagneticButton>
                <MagneticButton
                  kind='cyan'
                  aria-label='+ 1 — increment counter'
                  onClick={() => setCounter((n) => n + 1)}
                >
                  {BTN_INC}
                </MagneticButton>
              </div>
            </div>

            {/* 02 — hue democracy */}
            <div style={minimalCardStyle}>
              <h3 style={minimalCardTitleStyle}>
                {EXPERIMENTS[1].num} · {EXPERIMENTS[1].lines.join(" ")}
              </h3>
              <div
                style={{
                  height: 54,
                  border: borders.default,
                  // User-driven experiment color, not a design token.
                  background: `hsl(${hue}, 70%, 60%)`,
                  transition: "background .2s",
                  marginBottom: 12,
                }}
              />
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 400,
                  fontSize: 12,
                  color: slate,
                  marginBottom: 8,
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
                style={{ width: "100%", accentColor: ink }}
              />
            </div>

            {/* 03 — bouncy boi */}
            <div style={minimalCardStyle}>
              <h3 style={minimalCardTitleStyle}>
                {EXPERIMENTS[2].num} · {EXPERIMENTS[2].lines.join(" ")}
              </h3>
              <div
                style={{
                  height: 100,
                  position: "relative",
                  border: borders.default,
                  overflow: "hidden",
                }}
              >
                <div
                  aria-hidden='true'
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: 8,
                    width: 40,
                    height: 40,
                    background: ink,
                    borderRadius: "50%",
                    transform: `translate(-50%, ${-bounce * 44}px) scale(${1 + bounce * 0.15}, ${1 - bounce * 0.2})`,
                    // JS-driven motion checks reducedMotion (AGENTS.md).
                    transition: reducedMotion
                      ? "none"
                      : "transform 0.4s cubic-bezier(.22,1.6,.36,1)",
                  }}
                />
              </div>
              <div style={{ marginTop: 12 }}>
                <MagneticButton kind='cyan' onClick={boing}>
                  {BTN_BOING}
                </MagneticButton>
              </div>
            </div>
          </div>
        </MinimalColumn>
      </Slab>
    );
  }

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
        {PLAYGROUND_SUB}
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
          <div style={labelStyle}>EXPERIMENT {EXPERIMENTS[0].num}</div>
          <h3 style={cardTitleStyle}>
            {EXPERIMENTS[0].lines[0]}
            <br />
            {EXPERIMENTS[0].lines[1]}
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
              {BTN_DEC}
            </MagneticButton>
            <MagneticButton
              kind='cyan'
              // Name starts with the visible "+ 1" (WCAG 2.5.3 label in name)
              aria-label='+ 1 — increment counter'
              style={{ padding: "10px 16px" }}
              onClick={() => setCounter((n) => n + 1)}
            >
              {BTN_INC}
            </MagneticButton>
          </div>
        </div>

        {/* Experiment 02 — hue democracy */}
        <div style={{ ...cardStyle, boxShadow: `10px 10px 0 ${cyan}` }}>
          <div style={labelStyle}>EXPERIMENT {EXPERIMENTS[1].num}</div>
          <h3 style={cardTitleStyle}>
            {EXPERIMENTS[1].lines[0]}
            <br />
            {EXPERIMENTS[1].lines[1]}
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
          <div style={labelStyle}>EXPERIMENT {EXPERIMENTS[2].num}</div>
          <h3 style={cardTitleStyle}>
            {EXPERIMENTS[2].lines[0]}
            <br />
            {EXPERIMENTS[2].lines[1]}
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
              {BTN_BOING}
            </MagneticButton>
          </div>
        </div>
      </div>
    </Slab>
  );
}
