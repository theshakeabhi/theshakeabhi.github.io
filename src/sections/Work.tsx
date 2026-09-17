// P5 — Work slab (portfolio-1.jsx 288–463, README §Section Highlights).
// The EximPe mega-card (4px border, 14px slab shadow, IN PRODUCTION rubber
// stamp, KPI tiles, 50K+ MAUs burst) followed by the three BEFORE-EXIMPE
// tilt cards (SAWO Labs / QBurst / Zomato) with metric stamps per bullet.
// Copy and metrics are FINAL (AGENT_TEAM_HANDOFF §P5).
import Slab from "../components/primitives/Slab";
import Stamp from "../components/primitives/Stamp";
import Burst from "../components/primitives/Burst";
import PlaceholderImg from "../components/primitives/PlaceholderImg";
import MagneticButton from "../components/interactive/MagneticButton";
import RubberStamp from "../components/interactive/RubberStamp";
import Tilt from "../components/interactive/Tilt";
import ScrambleHover from "../components/text/ScrambleHover";
import {
  cream,
  ink,
  red,
  cyan,
  yellow,
  fonts,
  text,
  borders,
  shadows,
} from "../tokens";

const WINS = [
  { metric: "25% → 85%", kicker: "mobile onboarding completion", color: red },
  { metric: "−50%", kicker: "API latency on critical paths", color: cyan },
  { metric: "−60%", kicker: "production incidents YoY", color: ink },
  { metric: "+30%", kicker: "speedup on revenue flows", color: red },
] as const;

const EXIMPE_BULLETS: [string, string][] = [
  [
    "Founding-level ownership of the FE architecture — customer apps, admin dashboards, internal tooling.",
    red,
  ],
  [
    "Built and mentored a team of 2 engineers. Set the quality bar, review process, and release discipline.",
    cyan,
  ],
  [
    "Primary IC on production fires — root-cause, fix, write the postmortem, ship the prevention.",
    ink,
  ],
  [
    "Re-engineered onboarding + transaction journeys. Numbers got hilariously better.",
    red,
  ],
  [
    "Treated perf, reliability, and security as first-class — not a quarterly initiative.",
    cyan,
  ],
];

interface PriorRole {
  name: [string, string]; // [ink part, red part]
  rotate: number;
  stamps: { text: string; color: string; rotate: number }[];
  meta: string;
  /** 'outline' = display-face tile with 2px colored border (SAWO);
   *  'solid' = mono tile with colored fill (QBurst / Zomato). */
  tile: "outline" | "solid";
  bullets: [string, string, string][]; // [metric, copy, color]
}

const PRIOR_ROLES: PriorRole[] = [
  {
    name: ["SAWO ", "LABS"],
    rotate: -0.4,
    stamps: [
      { text: "SDE II", color: cyan, rotate: -2 },
      { text: "9 MOS", color: ink, rotate: 1 },
    ],
    meta: "AUG '21 → APR '22 · BENGALURU · HYBRID",
    tile: "outline",
    bullets: [
      [
        "60%",
        "cut bot abuse — shipped Google reCAPTCHA into the core SDK",
        red,
      ],
      [
        "20→75",
        "Lighthouse on 11K daily-view surfaces; −35% load, +15% traffic",
        cyan,
      ],
      [
        "−70%",
        "support queries by rewriting the docs; scaled a 6K+ dev community",
        ink,
      ],
    ],
  },
  {
    name: ["Q", "BURST"],
    rotate: 0.5,
    stamps: [
      { text: "SWE → INTERN", color: red, rotate: -2 },
      { text: "10 MOS", color: ink, rotate: 1 },
    ],
    meta: "OCT '20 → JUL '21 · KOCHI · REMOTE",
    tile: "solid",
    bullets: [
      [
        "SHIP",
        "launched Splitter — a full-stack bill-settlement app, end-to-end",
        red,
      ],
      [
        "API",
        "scalable REST services on Express + MongoDB, multi-user, secure",
        cyan,
      ],
      [
        "LEARN",
        "aced production-level Django, React, and Node training as an intern",
        ink,
      ],
    ],
  },
  {
    name: ["ZO", "MATO"],
    rotate: -0.6,
    stamps: [
      { text: "SALES INTERN", color: ink, rotate: -2 },
      { text: "2 MOS", color: cyan, rotate: 1 },
    ],
    meta: "JUL '19 → AUG '19 · KOCHI · ON-SITE",
    tile: "solid",
    bullets: [
      [
        "EARLY",
        "pre-engineering detour: marketing + sales ops under State & City heads",
        red,
      ],
      [
        "OPS",
        "absorbed how a service platform actually runs at the ground level",
        cyan,
      ],
      [
        "DEAL",
        "converted restaurants onto the Zomato platform across the region",
        ink,
      ],
    ],
  },
];

function MetricTile({
  metric,
  color,
  tile,
}: {
  metric: string;
  color: string;
  tile: "outline" | "solid";
}) {
  if (tile === "outline") {
    return (
      <span
        style={{
          flexShrink: 0,
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 14,
          color,
          background: cream,
          border: `2px solid ${color}`,
          padding: "2px 6px",
          minWidth: 56,
          textAlign: "center",
          marginTop: 2,
        }}
      >
        {metric}
      </span>
    );
  }
  return (
    <span
      style={{
        flexShrink: 0,
        fontFamily: fonts.mono,
        fontWeight: 900,
        fontSize: 12,
        color: cream,
        background: color,
        padding: "3px 8px",
        minWidth: 56,
        textAlign: "center",
        marginTop: 2,
        letterSpacing: "0.1em",
      }}
    >
      {metric}
    </span>
  );
}

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
      <div
        className='flex flex-wrap items-end justify-between gap-4'
        style={{ marginBottom: 50 }}
      >
        <h2
          style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: text.section,
            lineHeight: "var(--text-section--line-height)",
            letterSpacing: "var(--text-section--letter-spacing)",
            color: ink,
            margin: 0,
          }}
        >
          <ScrambleHover text='THE' />
          <br />
          <ScrambleHover text='WORK.' />
        </h2>
        {/* Ink, not cyan — 14px mono fails WCAG contrast on cream in cyan */}
        <Stamp color={ink} rotate={4}>
          ONE BIG ONE · THREE WARM-UPS · ALL THE OWNERSHIP
        </Stamp>
      </div>

      {/* Big project card — EximPe */}
      <div
        style={{
          position: "relative",
          border: borders.thick,
          background: cream,
          boxShadow: shadows.slab,
          padding: "clamp(24px, 2.8vw, 40px) clamp(20px, 2.9vw, 42px)",
        }}
      >
        <RubberStamp
          text='IN PRODUCTION'
          color={red}
          rotate={-14}
          size={200}
          style={{ bottom: -28, left: "min(360px, 45%)" }}
        />
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-[50px]'>
          <div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 16,
                flexWrap: "wrap",
              }}
            >
              <Stamp rotate={-3}>FOUNDING FRONTEND</Stamp>
              <Stamp color={cyan} rotate={2}>
                4 YRS · CURRENT
              </Stamp>
              <Stamp color={ink} rotate={-1}>
                FINTECH
              </Stamp>
            </div>
            <h3
              style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: text.project,
                lineHeight: "var(--text-project--line-height)",
                letterSpacing: "var(--text-project--letter-spacing)",
                color: ink,
                margin: "14px 0 6px",
              }}
            >
              EXIM<span style={{ color: red }}>PE</span>
            </h3>
            <div
              style={{
                fontFamily: fonts.mono,
                fontWeight: 700,
                fontSize: 16,
                color: ink,
                letterSpacing: "0.1em",
                marginBottom: 22,
              }}
            >
              FRONTEND PRODUCT ENG LEAD · MAY '22 → NOW
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {EXIMPE_BULLETS.map(([copy, c], i) => (
                <li
                  key={i}
                  style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                >
                  <span
                    aria-hidden='true'
                    style={{
                      flexShrink: 0,
                      width: 22,
                      height: 22,
                      marginTop: 4,
                      background: c,
                      color: cream,
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 900,
                      fontSize: 13,
                      fontFamily: fonts.mono,
                      transform: `rotate(${i * 5 - 8}deg)`,
                    }}
                  >
                    ▸
                  </span>
                  <span
                    style={{
                      fontFamily: fonts.body,
                      fontWeight: 500,
                      fontSize: text.small,
                      lineHeight: 1.4,
                      color: ink,
                    }}
                  >
                    {copy}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: product placeholder + wins */}
          <div style={{ position: "relative" }}>
            <PlaceholderImg
              w='100%'
              h={320}
              label='Product Screens'
              tone='mid'
            />
            <div
              aria-hidden='true'
              style={{ position: "absolute", top: -22, right: -18 }}
            >
              <Burst size={96} color={yellow} rotate={-15} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  fontFamily: fonts.display,
                  fontWeight: 900,
                  fontSize: 16,
                  color: ink,
                  transform: "rotate(12deg)",
                  textAlign: "center",
                  lineHeight: 0.95,
                }}
              >
                50K+
                <br />
                MAUs
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginTop: 22,
              }}
            >
              {WINS.map((w, i) => (
                <div
                  key={i}
                  style={{
                    border: borders.default,
                    padding: "10px 12px",
                    background: cream,
                    transform: `rotate(${i % 2 ? -0.5 : 0.5}deg)`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 900,
                      fontSize: 26,
                      color: w.color,
                      lineHeight: 1,
                    }}
                  >
                    {w.metric}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.mono,
                      fontWeight: 600,
                      fontSize: 11,
                      color: ink,
                      marginTop: 4,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {w.kicker}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 22 }}>
              <MagneticButton kind='primary'>CASE STUDY →</MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Prior roles */}
      <div style={{ marginTop: 80 }}>
        <div
          className='flex flex-wrap items-baseline justify-between gap-3'
          style={{ marginBottom: 24 }}
        >
          <h3
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: "clamp(36px, 3.89vw, 56px)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: ink,
              margin: 0,
            }}
          >
            BEFORE EXIM<span style={{ color: red }}>PE</span>.
          </h3>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 700,
              fontSize: 14,
              color: ink,
              letterSpacing: "0.15em",
            }}
          >
            ✶ 2019 → 2022 · THE FOUNDATION ✶
          </div>
        </div>

        <div className='grid grid-cols-1 gap-7 lg:grid-cols-3'>
          {PRIOR_ROLES.map((role, idx) => (
            <Tilt
              key={idx}
              max={4}
              scale={1.02}
              style={{ transform: `rotate(${role.rotate}deg)` }}
            >
              <article
                style={{
                  border: borders.default,
                  padding: "22px 22px 26px",
                  background: cream,
                  boxShadow: shadows.lifted,
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 14,
                    flexWrap: "wrap",
                  }}
                >
                  {role.stamps.map((s, i) => (
                    <Stamp
                      key={i}
                      color={s.color}
                      rotate={s.rotate}
                      style={{ fontSize: 11 }}
                    >
                      {s.text}
                    </Stamp>
                  ))}
                </div>
                <h3
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 900,
                    fontSize: text.cardTitle,
                    lineHeight: "var(--text-card-title--line-height)",
                    letterSpacing: "var(--text-card-title--letter-spacing)",
                    color: ink,
                    margin: "0 0 4px",
                  }}
                >
                  {role.name[0]}
                  <span style={{ color: red }}>{role.name[1]}</span>
                </h3>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontWeight: 700,
                    fontSize: 12,
                    color: ink,
                    letterSpacing: "0.1em",
                    marginBottom: 14,
                  }}
                >
                  {role.meta}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {role.bullets.map(([metric, copy, c], i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <MetricTile metric={metric} color={c} tile={role.tile} />
                      <span
                        style={{
                          fontFamily: fonts.body,
                          fontWeight: 500,
                          fontSize: 14,
                          lineHeight: 1.4,
                          color: ink,
                        }}
                      >
                        {copy}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Tilt>
          ))}
        </div>
      </div>
    </Slab>
  );
}
