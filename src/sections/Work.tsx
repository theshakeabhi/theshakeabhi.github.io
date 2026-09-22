// P5 — Work slab (portfolio-1.jsx 288–463, README §Section Highlights).
// Two mega-cards (4px border, 14px slab shadow, slight opposite rotations):
// FanProStudio AI (current — IN PRODUCTION rubber stamp, descriptive
// bullets, no invented metrics) above EximPe (SHIPPED & SCALED stamp, KPI
// tiles, 50K+ MAUs burst), followed by the three BEFORE-EXIMPE tilt cards
// (SAWO Labs / QBurst / Zomato) with metric stamps per bullet.
// EximPe copy and metrics are FINAL (AGENT_TEAM_HANDOFF §P5).
// Minimal mode (AGENTS.md §Two design modes): per-employer role blocks
// (mono heading + date, plain muted sub-line "role · tags · status" with
// the status word as the ONE sanctioned accent use — mockup truth: only
// FanPro carries a status there), shared bullets as plain "—" lists, WINS
// as a compact wrap grid, prior roles as stacked hairline rows. Both
// branches read the SAME shared constants below (natural case; fancy
// uppercases via CSS).
import type { CSSProperties, ReactNode } from "react";
import Slab from "../components/primitives/Slab";
import MinimalColumn from "../components/primitives/MinimalColumn";
import Stamp from "../components/primitives/Stamp";
import Burst from "../components/primitives/Burst";
import PlaceholderImg from "../components/primitives/PlaceholderImg";
import MagneticButton from "../components/interactive/MagneticButton";
import RubberStamp from "../components/interactive/RubberStamp";
import Tilt from "../components/interactive/Tilt";
import ScrambleHover from "../components/text/ScrambleHover";
import { usePrefs } from "../lib/prefs";
import {
  cream,
  ink,
  red,
  cyan,
  yellow,
  slate,
  accent,
  fonts,
  text,
  borders,
  shadows,
} from "../tokens";

// Employer meta + status + tag copy shared by BOTH design modes, in
// NATURAL case: fancy uppercases via CSS (RubberStamp, Stamp, the meta
// lines), minimal lowercases its meta/sub lines via CSS. The minimal
// sub-line derives from the same structured data the fancy chips render.
const FANPRO_STATUS = "in production";
const EXIMPE_STATUS = "shipped & scaled";
const FANPRO_META = {
  role: "Lead frontend developer",
  date: "Jan '26 → now",
} as const;
const EXIMPE_META = {
  role: "Frontend product eng lead",
  date: "May '22 → Apr '26",
} as const;

interface EmployerTag {
  text: string;
  color: string;
  rotate: number;
  /** Tags the mockup's minimal sub-line carries ("ai media", …). */
  sub?: boolean;
}

const FANPRO_TAGS: EmployerTag[] = [
  { text: "Lead frontend", color: red, rotate: -3 },
  { text: "Current", color: cyan, rotate: 2 },
  { text: "AI media", color: ink, rotate: -1, sub: true },
];

const EXIMPE_TAGS: EmployerTag[] = [
  { text: "Founding frontend", color: red, rotate: -3, sub: true },
  { text: "4 years", color: cyan, rotate: 2 },
  { text: "Fintech", color: ink, rotate: -1, sub: true },
];

/** Mockup .mrole-sub muted part: "role · tag · tag". */
const subLine = (role: string, tags: EmployerTag[]) =>
  [role, ...tags.filter((t) => t.sub).map((t) => t.text)].join(" · ");
// Minimal-only names: the fancy titles are display-face JSX (FANPRO /
// STUDIO AI line break, EXIM+PE color split) — the calm mode shows the
// real casing instead.
const FANPRO_MINIMAL_NAME = "FanProStudio AI";
const EXIMPE_MINIMAL_NAME = "EximPe";

const WINS = [
  { metric: "25% → 85%", kicker: "mobile onboarding completion", color: red },
  { metric: "−50%", kicker: "API latency on critical paths", color: cyan },
  { metric: "−60%", kicker: "production incidents YoY", color: ink },
  { metric: "+30%", kicker: "speedup on revenue flows", color: red },
] as const;

// Descriptive only — no metrics until there are real ones to show.
const FANPRO_BULLETS: [string, string][] = [
  [
    "Own the frontend for the generation studio — the surface where AI influencers and on-brand UGC get made: images, image edits, short videos, trend recreations.",
    red,
  ],
  [
    "Build media-heavy interfaces that stay honest about state — queued, generating, failed, done — across image and video pipelines.",
    cyan,
  ],
  [
    "Ship prompt-to-preview flows that keep creators in the loop while the models do the heavy lifting.",
    ink,
  ],
  [
    "Run the design system so every new surface lands on-brand by default.",
    red,
  ],
  [
    "Hold the review bar — quality, a11y, and performance are part of done, not a follow-up ticket.",
    cyan,
  ],
];

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
    name: ["Sawo ", "Labs"],
    rotate: -0.4,
    stamps: [
      { text: "SDE II", color: cyan, rotate: -2 },
      { text: "9 mos", color: ink, rotate: 1 },
    ],
    meta: "Aug '21 → Apr '22 · Bengaluru · Hybrid",
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
    name: ["Q", "Burst"],
    rotate: 0.5,
    stamps: [
      // Mock casing exactly: "SWE → intern" (lowercase 'intern').
      { text: "SWE → intern", color: red, rotate: -2 },
      { text: "10 mos", color: ink, rotate: 1 },
    ],
    meta: "Oct '20 → Jul '21 · Kochi · Remote",
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
    name: ["Zo", "mato"],
    rotate: -0.6,
    stamps: [
      { text: "sales intern", color: ink, rotate: -2 },
      { text: "2 mos", color: cyan, rotate: 1 },
    ],
    meta: "Jul '19 → Aug '19 · Kochi · On-site",
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

const minimalRoleHeadStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: "6px 20px",
  marginBottom: 4,
};

const minimalRoleNameStyle: CSSProperties = {
  fontFamily: fonts.mono,
  fontWeight: 700,
  fontSize: 15.5,
  letterSpacing: "0.01em",
  color: ink,
  margin: 0,
};

const minimalRoleDateStyle: CSSProperties = {
  fontFamily: fonts.mono,
  fontWeight: 500,
  fontSize: 11.5,
  letterSpacing: "0.08em",
  color: slate,
  textTransform: "lowercase",
};

// Mockup .mrole-sub: plain muted mono line under the role heading.
const minimalRoleSubStyle: CSSProperties = {
  fontFamily: fonts.mono,
  fontWeight: 500,
  fontSize: 12,
  letterSpacing: "0.06em",
  color: slate,
  textTransform: "lowercase",
  margin: "0 0 14px",
};

const minimalBulletItemStyle: CSSProperties = {
  position: "relative",
  paddingLeft: 18,
  fontFamily: fonts.body,
  fontWeight: 400,
  fontSize: 15,
  lineHeight: 1.55,
  color: ink,
  maxWidth: "62ch",
};

function MinimalRoleBlock({
  name,
  date,
  children,
  last,
}: {
  name: ReactNode;
  date: string;
  children?: ReactNode;
  last?: boolean;
}) {
  return (
    <div
      style={{
        padding: "22px 0 26px",
        borderBottom: last ? undefined : borders.default,
      }}
    >
      <div style={minimalRoleHeadStyle}>
        <h3 style={minimalRoleNameStyle}>{name}</h3>
        <span style={minimalRoleDateStyle}>{date}</span>
      </div>
      {children}
    </div>
  );
}

function MinimalBullets({ bullets }: { bullets: [string, string][] }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "grid",
        gap: 9,
      }}
    >
      {bullets.map(([copy], i) => (
        <li key={i} style={minimalBulletItemStyle}>
          <span
            aria-hidden='true'
            style={{ position: "absolute", left: 0, color: slate }}
          >
            —
          </span>
          {copy}
        </li>
      ))}
    </ul>
  );
}

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
  const { minimal } = usePrefs();

  // Minimal branch — guard AFTER hooks (AGENTS.md §Two design modes).
  // borderTop KEPT from fancy (no divider precedes Work; the token
  // collapses to the hairline). Same id keeps the #work anchor.
  if (minimal) {
    return (
      <Slab
        bg={cream}
        id='work'
        style={{ paddingTop: 52, paddingBottom: 64, borderTop: borders.thick }}
      >
        <MinimalColumn>
          <div style={minimalLabelStyle}>
            <span>04 / selected work</span>
          </div>

          <MinimalRoleBlock name={FANPRO_MINIMAL_NAME} date={FANPRO_META.date}>
            <p style={minimalRoleSubStyle}>
              {subLine(FANPRO_META.role, FANPRO_TAGS)} ·{" "}
              {/* The ONE sanctioned --color-accent use in this section. */}
              <span style={{ color: accent }}>{FANPRO_STATUS}</span>
            </p>
            <MinimalBullets bullets={FANPRO_BULLETS} />
          </MinimalRoleBlock>

          <MinimalRoleBlock name={EXIMPE_MINIMAL_NAME} date={EXIMPE_META.date}>
            {/* Mockup truth: EximPe's minimal sub-line carries NO status —
                "shipped & scaled" renders in fancy's RubberStamp alone. */}
            <p style={minimalRoleSubStyle}>
              {subLine(EXIMPE_META.role, EXIMPE_TAGS)}
            </p>
            <MinimalBullets bullets={EXIMPE_BULLETS} />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px 22px",
                marginTop: 14,
                fontFamily: fonts.mono,
                fontWeight: 400,
                fontSize: 12,
                letterSpacing: "0.04em",
                color: slate,
                // NO lowercase here — the kickers keep their natural case
                // ("API latency…", "production incidents YoY") per mock.
              }}
            >
              {WINS.map((w, i) => (
                <span key={i}>
                  <b style={{ color: ink, fontWeight: 700 }}>{w.metric}</b>{" "}
                  {w.kicker}
                </span>
              ))}
            </div>
          </MinimalRoleBlock>

          {PRIOR_ROLES.map((role, i) => (
            <MinimalRoleBlock
              key={i}
              last={i === PRIOR_ROLES.length - 1}
              name={
                // Natural case straight from the constants (mock: "Sawo
                // Labs · SDE II", "QBurst · SWE → intern") — no transform.
                <span>
                  {role.name[0]}
                  {role.name[1]}
                  <span style={{ color: slate, fontWeight: 500 }}>
                    {" "}
                    · {role.stamps[0].text}
                  </span>
                </span>
              }
              date={role.meta}
            />
          ))}
        </MinimalColumn>
      </Slab>
    );
  }

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
          TWO BIG ONES · THREE WARM-UPS · ALL THE OWNERSHIP
        </Stamp>
      </div>

      {/* Big project card — FanProStudio AI (current) */}
      <div
        style={{
          position: "relative",
          border: borders.thick,
          background: cream,
          boxShadow: shadows.slab,
          padding: "clamp(24px, 2.8vw, 40px) clamp(20px, 2.9vw, 42px)",
          transform: "rotate(-0.35deg)",
          marginBottom: 70,
        }}
      >
        <RubberStamp
          text={FANPRO_STATUS}
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
              {FANPRO_TAGS.map((t) => (
                <Stamp key={t.text} color={t.color} rotate={t.rotate}>
                  {t.text}
                </Stamp>
              ))}
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
              FANPRO
              <br />
              <span style={{ color: red }}>STUDIO&nbsp;AI</span>
            </h3>
            <div
              style={{
                fontFamily: fonts.mono,
                fontWeight: 700,
                fontSize: 16,
                color: ink,
                letterSpacing: "0.1em",
                marginBottom: 22,
                // Constants are natural-case; the fancy meta line is caps.
                textTransform: "uppercase",
              }}
            >
              {FANPRO_META.role} · {FANPRO_META.date}
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
              {FANPRO_BULLETS.map(([copy, c], i) => (
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

          {/* Right: product placeholder — no KPI tiles until the numbers
              are real (no invented metrics for FanPro). */}
          <div style={{ position: "relative" }}>
            <PlaceholderImg
              w='100%'
              h={440}
              label='Product Screens'
              tone='mid'
            />
          </div>
        </div>
      </div>

      {/* Big project card — EximPe */}
      <div
        style={{
          position: "relative",
          border: borders.thick,
          background: cream,
          boxShadow: shadows.slab,
          padding: "clamp(24px, 2.8vw, 40px) clamp(20px, 2.9vw, 42px)",
          transform: "rotate(0.35deg)",
        }}
      >
        <RubberStamp
          text={EXIMPE_STATUS}
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
              {EXIMPE_TAGS.map((t) => (
                <Stamp key={t.text} color={t.color} rotate={t.rotate}>
                  {t.text}
                </Stamp>
              ))}
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
                // Constants are natural-case; the fancy meta line is caps.
                textTransform: "uppercase",
              }}
            >
              {EXIMPE_META.role} · {EXIMPE_META.date}
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
                    // Natural-case name parts → display-face caps.
                    textTransform: "uppercase",
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
                    textTransform: "uppercase",
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
