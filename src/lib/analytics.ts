// Analytics — one `track()` that fans an event out to both providers:
//
// - GoatCounter (cookieless, no storage, counts EVERY visitor): loaded by
//   src/components/Analytics.astro on every page. Events are counted as
//   `event: true` paths, e.g. "resume_download · hero".
// - Google Analytics 4 (opt-in): only when the visitor ACCEPTED the cookie
//   banner and gtag.js is loaded (window.__gtagLoaded, set by index.astro's
//   head). Declined/undecided visitors send nothing to Google.
//
// SSR-safe: no top-level browser access — call track() from event
// handlers or effects only.

/** GoatCounter site code — the "<code>" in https://<code>.goatcounter.com.
 *  Empty string = GoatCounter disabled (no script, no requests). */
export const GOATCOUNTER_CODE = "shakeabhi";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    goatcounter?: {
      count?: (vars: { path: string; title?: string; event?: boolean }) => void;
    };
  }
}

export function track(name: string, props: Props = {}): void {
  if (typeof window === "undefined") return;
  try {
    if (window.__gtagLoaded && window.gtag) {
      window.gtag("event", name, props);
    }
    const detail = Object.values(props)
      .filter((v) => v !== undefined && v !== "")
      .join(" · ");
    window.goatcounter?.count?.({
      path: detail ? `${name} · ${detail}` : name,
      title: name,
      event: true,
    });
  } catch {
    // Analytics must never break the page.
  }
}

/** Delegated link tracking: résumé downloads, email clicks, outbound links.
 *  Installed once per page by Analytics.astro; no per-component wiring. */
export function installLinkTracking(): void {
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as Element | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const section = a.closest("[id]")?.id;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("mailto:")) {
        track("contact_email", { section });
      } else if (/\.pdf($|[?#])/i.test(href)) {
        track("resume_download", { section });
      } else if (a.host && a.host !== location.host) {
        track("outbound_click", { domain: a.hostname, section });
      }
    },
    { capture: true, passive: true }
  );
}
