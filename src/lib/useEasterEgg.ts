// P6 — rave-mode easter egg state (README §Easter Egg).
// Two triggers, same outcome: click the hero logo five times, or type the
// Konami code (↑↑↓↓←→←→ B A) anywhere on the page.
//
// - The keydown listener is passive and never calls preventDefault (a11y:
//   the easter egg must not trap keys); it is added in an effect and
//   cleaned up on unmount. SSR-safe: no top-level window access.
// - Click count / Konami buffer are in-memory only and reset to 0 once
//   rave triggers (README §State Management).
// - sfx.yay() is fired by <RaveOverlay /> when `rave` flips on, so this
//   hook stays dependency-free.
//
// P7 wires this into Portfolio.tsx:
//   const egg = useEasterEgg();
//   <RaveOverlay on={egg.rave} onClose={egg.dismiss} />
//   <Hero onLogoClick={egg.onLogoClick} clicks={egg.clicks} />
import { useCallback, useEffect, useState } from "react";

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

const LOGO_CLICKS_TO_RAVE = 5;

export interface EasterEgg {
  /** Rave overlay on/off. */
  rave: boolean;
  /** Current logo click count (0–4). */
  clicks: number;
  /** Dismiss the rave overlay. */
  dismiss(): void;
  /** Wire to the hero logo's onClick. */
  onLogoClick(): void;
}

export function useEasterEgg(): EasterEgg {
  const [rave, setRave] = useState(false);
  const [clicks, setClicks] = useState(0);

  const onLogoClick = useCallback(() => {
    setClicks((c) => {
      const n = c + 1;
      if (n >= LOGO_CLICKS_TO_RAVE) {
        setRave(true);
        return 0; // reset after rave triggers
      }
      return n;
    });
  }, []);

  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf = [...buf, e.key.toLowerCase()].slice(-KONAMI.length);
      if (buf.join(",") === KONAMI.join(",")) {
        buf = []; // reset after rave triggers
        setRave(true);
      }
    };
    window.addEventListener("keydown", onKey, { passive: true });
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const dismiss = useCallback(() => setRave(false), []);

  return { rave, clicks, dismiss, onLogoClick };
}
