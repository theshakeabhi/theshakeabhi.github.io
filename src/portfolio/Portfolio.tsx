// P0 foundation — the single React island. Composes PrefsProvider >
// PointerProvider(sfx) > chrome + sections + SectionDividers in the exact
// order from app.jsx (divider items/colors/dirs verbatim).
//
// P7 owns integration here (rave state, logo clicks, Konami, preferences
// menu wiring). Rave wiring is stubbed `on={false}` until then.
import { useState } from "react";
import { PrefsProvider } from "../lib/prefs";
import { makeSfx } from "../lib/sfx";
import { PointerProvider } from "../components/pointer/PointerProvider";
import CustomCursor from "../components/pointer/CustomCursor";
import CursorTrail from "../components/pointer/CursorTrail";
import ScrollProgress from "../components/chrome/ScrollProgress";
import SideRibbon from "../components/chrome/SideRibbon";
import RaveOverlay from "../components/chrome/RaveOverlay";
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
import { cream, cyan, red } from "../tokens";

const RIBBON_ITEMS = [
  "✶ AVAILABLE FOR HIRE",
  "✶ BENGALURU · IST · GMT+5:30",
  "✶ REMOTE-FIRST",
  "✶ HI@ABHISHEK.SH",
  "✶ MAY 2026",
  "✶ SCROLL TO CONTINUE ↓",
];

export default function Portfolio() {
  const [sfx] = useState(makeSfx);

  return (
    <PrefsProvider>
      {/* Fixed chrome lives OUTSIDE any transformed ancestor (trap 1). */}
      <ScrollProgress />
      <SideRibbon items={RIBBON_ITEMS} />
      <PointerProvider sfx={sfx}>
        <CursorTrail />
        <CustomCursor />
        <RaveOverlay on={false} onClose={() => {}} />
        <Hero />
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
        <Resume />
        <Contact />
      </PointerProvider>
    </PrefsProvider>
  );
}
