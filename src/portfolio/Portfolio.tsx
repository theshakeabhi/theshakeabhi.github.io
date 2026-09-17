// P0 foundation — the single React island. Composes PrefsProvider >
// PointerProvider(sfx) > chrome + sections + SectionDividers in the exact
// order from app.jsx (divider items/colors/dirs verbatim).
//
// P7 integration: rave easter egg (logo ×5 / Konami) wired through
// useEasterEgg(); sfx mute follows prefs.sfx (write-only — Sfx has no
// isMuted readback, see HANDOFF_NOTES); PreferencesMenu mounts with the
// fixed chrome OUTSIDE PointerProvider (trap 1 — and it keeps the OS
// cursor); the Testimonials section AND its "NICE THINGS…" divider are
// skipped while src/content/testimonials.ts ships empty.
import { useEffect, useState } from "react";
import { PrefsProvider, usePrefs } from "../lib/prefs";
import { makeSfx, type Sfx } from "../lib/sfx";
import { useEasterEgg } from "../lib/useEasterEgg";
import { PointerProvider } from "../components/pointer/PointerProvider";
import CustomCursor from "../components/pointer/CustomCursor";
import CursorTrail from "../components/pointer/CursorTrail";
import ScrollProgress from "../components/chrome/ScrollProgress";
import SideRibbon from "../components/chrome/SideRibbon";
import RaveOverlay from "../components/chrome/RaveOverlay";
import PreferencesMenu from "../components/chrome/PreferencesMenu";
import SectionDivider from "../components/primitives/SectionDivider";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Work from "../sections/Work";
import NowBoard from "../sections/NowBoard";
import Writing from "../sections/Writing";
import Playground from "../sections/Playground";
import Testimonials from "../sections/Testimonials";
import Resume from "../sections/Resume";
import Contact from "../sections/Contact";
import { testimonials } from "../content/testimonials";
import { cream, cyan, red } from "../tokens";

const RIBBON_ITEMS = [
  "✶ AVAILABLE FOR HIRE",
  "✶ BENGALURU · IST · GMT+5:30",
  "✶ REMOTE-FIRST",
  "✶ THESHAKEABHI@GMAIL.COM",
  "✶ MAY 2026",
  "✶ SCROLL TO CONTINUE ↓",
];

/** Follows prefs.sfx with sfx.setMuted (must live INSIDE PrefsProvider). */
function SfxMuteBridge({ sfx }: { sfx: Sfx }) {
  const { sfx: soundOn } = usePrefs();
  useEffect(() => {
    sfx.setMuted(!soundOn);
  }, [sfx, soundOn]);
  return null;
}

export default function Portfolio() {
  const [sfx] = useState(makeSfx);
  const egg = useEasterEgg();

  return (
    <PrefsProvider>
      <SfxMuteBridge sfx={sfx} />
      {/* Fixed chrome lives OUTSIDE any transformed ancestor (trap 1). */}
      <ScrollProgress />
      <SideRibbon items={RIBBON_ITEMS} />
      <PreferencesMenu />
      <PointerProvider sfx={sfx}>
        <CursorTrail />
        <CustomCursor />
        {/* Inside PointerProvider for sfx.yay(); the provider's container
            carries no transform, so the fixed banner stays viewport-pinned. */}
        <RaveOverlay on={egg.rave} onClose={egg.dismiss} />
        <Hero onLogoClick={egg.onLogoClick} clicks={egg.clicks} />
        <SectionDivider
          items={[
            "MORE ABOUT ME",
            "↓",
            "WHO IS THIS GUY",
            "↓",
            "FOUR YEARS OF SHIPPING",
            "↓",
            "KEEP SCROLLING",
          ]}
        />
        <About />
        <SectionDivider
          items={[
            "THE STACK",
            "★",
            "OPINIONS BELOW",
            "★",
            "STRONGLY HELD",
            "★",
            "LOOSELY DEFENDED",
            "★",
          ]}
          dir={-1}
          bg={red}
        />
        <Skills />
        <Work />
        <SectionDivider
          items={[
            "NOW PLAYING",
            "✦",
            "IN MY HEAD",
            "✦",
            "IN MY BACKLOG",
            "✦",
            "IN MY BROWSER",
            "✦",
          ]}
          bg={cyan}
          fg={cream}
        />
        <NowBoard />
        <Writing />
        <Playground />
        {/* No permissioned quotes yet — skip the section AND its divider
            while the content file is empty (HANDOFF_NOTES P6 → P7). */}
        {testimonials.length > 0 ? (
          <>
            <SectionDivider
              items={[
                "NICE THINGS",
                "★",
                "PEOPLE HAVE",
                "★",
                "SAID ABOUT ME",
                "★",
                "(I DIDN’T BRIBE THEM)",
                "★",
              ]}
              dir={-1}
            />
            <Testimonials />
          </>
        ) : null}
        <Resume />
        <Contact />
      </PointerProvider>
    </PrefsProvider>
  );
}
