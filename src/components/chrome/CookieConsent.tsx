// P8 — cookie-consent slab + Google Consent Mode v2 wiring (BASIC mode).
//
// This is its OWN island, mounted from index.astro (<CookieConsent
// client:idle />) OUTSIDE the Portfolio island — no PointerProvider above
// it, so the normal OS cursor applies here by design.
//
// Consent flow (BASIC consent mode): gtag.js is NEVER loaded up front.
// index.astro's head sets consent defaults to "denied", defines
// window.__loadGtag (consent update + config + script injection) and calls
// it immediately only when localStorage already holds "accepted" (returning
// visitors). This slab calls __loadGtag on ACCEPT. Declined/undecided
// visitors make ZERO requests to googletagmanager/google-analytics — not
// even cookieless pings.
//
// SSR-safe: renders nothing until mounted AND no stored choice exists, so
// server and client first paint are byte-identical (both empty).
import { useEffect, useState } from "react";
import { cream, ink, red, yellow, fonts } from "../../tokens";

const STORAGE_KEY = "portfolio.consent";

type Choice = "accepted" | "declined";

declare global {
  interface Window {
    /** Defined by the inline Consent Mode script in index.astro's head. */
    gtag?: (...args: unknown[]) => void;
    /** Loads gtag.js + fires consent update/config — index.astro's head. */
    __loadGtag?: () => void;
    /** Guard so __loadGtag only ever injects the script once. */
    __gtagLoaded?: boolean;
  }
}

function readStoredChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null; // private mode / blocked storage — just re-ask
  }
}

function storeChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage unavailable — consent still applies for this pageview.
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // A stored "accepted" is replayed by the head script (it loads gtag.js
    // itself); here we only decide whether to show the banner.
    if (readStoredChoice() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    storeChoice("accepted");
    // Injects gtag.js and fires the consent update + config (BASIC mode).
    window.__loadGtag?.();
    setVisible(false);
  };
  const decline = () => {
    // BASIC consent mode: gtag.js was never loaded, so declining sends
    // nothing anywhere — we only remember the choice.
    storeChoice("declined");
    setVisible(false);
  };

  const buttonBase = {
    flex: 1,
    padding: "10px 14px",
    fontFamily: fonts.mono,
    fontWeight: 800,
    fontSize: 12,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
  } as const;

  return (
    <section
      aria-label='Cookie consent'
      style={{
        position: "fixed",
        left: 16,
        bottom: 16,
        // Above sections + SideRibbon (200), below RaveOverlay (9000)
        // and the custom cursor (9999+).
        zIndex: 8000,
        width: 340,
        maxWidth: "calc(100vw - 32px)",
        background: ink,
        color: cream,
        border: `3px solid ${cream}`,
        boxShadow: `6px 6px 0 ${red}`,
        padding: 18,
        fontFamily: fonts.mono,
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: 11,
          letterSpacing: "0.18em",
          color: yellow,
          marginBottom: 10,
        }}
      >
        COOKIES // CONSENT
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 1.6,
        }}
      >
        This site uses Google Analytics to count visits. Its cookies stay OFF
        unless you accept. Sticky-note positions &amp; preferences live only in
        your browser — never sent anywhere.
      </p>
      <a
        href='/privacy'
        style={{
          display: "inline-block",
          marginTop: 10,
          color: cream,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textDecorationThickness: 2,
          textUnderlineOffset: 3,
        }}
      >
        READ THE PRIVACY POLICY →
      </a>
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button
          type='button'
          onClick={accept}
          style={{
            ...buttonBase,
            background: red,
            color: cream,
            border: `3px solid ${cream}`,
            boxShadow: `4px 4px 0 ${cream}`,
          }}
        >
          Accept
        </button>
        <button
          type='button'
          onClick={decline}
          style={{
            ...buttonBase,
            background: "transparent",
            color: cream,
            border: `3px solid ${cream}`,
          }}
        >
          Decline
        </button>
      </div>
    </section>
  );
}
