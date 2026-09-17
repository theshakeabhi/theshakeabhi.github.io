// P4 — chunky brutalist scroll indicator, ported from micro.jsx.
// Fixed 14px strip on top of the viewport: ink bg, candy-stripe fill with a
// .12s linear width transition, right-side "{pct}% READ" pill (README
// §Scroll Progress Bar). Listens to window scroll — or an optional
// targetRef scroll container — with a passive listener; SSR-safe (all
// browser APIs live inside the effect). Must mount OUTSIDE any transformed
// ancestor (trap 1) — Portfolio.tsx mounts it at the top level.
import { useEffect, useState, type RefObject } from "react";
import { cream, cyan, fonts, ink, red } from "../../tokens";

export interface ScrollProgressProps {
  targetRef?: RefObject<HTMLElement | null>;
}

export default function ScrollProgress({ targetRef }: ScrollProgressProps) {
  // SSR-safe: 0% on the server and on the first client paint.
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = targetRef?.current ?? null;
    const onScroll = () => {
      if (el) {
        const max = el.scrollHeight - el.clientHeight;
        setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
      } else {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
      }
    };
    const target: HTMLElement | Window = el ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => target.removeEventListener("scroll", onScroll);
  }, [targetRef]);

  return (
    <div
      aria-hidden='true'
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: 14,
        background: ink,
        borderBottom: `3px solid ${ink}`,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: `repeating-linear-gradient(90deg, ${red} 0 16px, ${cream} 16px 18px, ${cyan} 18px 34px, ${cream} 34px 36px)`,
          transition: "width .12s linear",
          borderRight: `3px solid ${cream}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 14,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          color: cream,
          fontFamily: fonts.mono,
          fontWeight: 900,
          fontSize: 10,
          letterSpacing: "0.15em",
          background: ink,
          padding: "0 8px",
        }}
      >
        {Math.round(pct)}% READ
      </div>
    </div>
  );
}
