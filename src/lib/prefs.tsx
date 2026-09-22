/*
 * P0 foundation — user preferences ("Tweaks") + media-derived flags.
 *
 * SSR-SAFE: the initial state is identical on the server and on the first
 * client render (all defaults). localStorage and matchMedia are read only
 * inside useEffect, after mount.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "portfolio.tweaks";

export interface Prefs {
  sfx: boolean;
  cursor: boolean;
  magnetic: boolean;
  minimal: boolean;
  reducedMotion: boolean;
  coarsePointer: boolean;
}

/** Keys the user can set; reducedMotion / coarsePointer are media-derived. */
export type PrefKey = "sfx" | "cursor" | "magnetic" | "minimal";

export interface PrefsContextValue extends Prefs {
  setPref(key: PrefKey, value: boolean): void;
}

const DEFAULTS: Prefs = {
  sfx: true,
  cursor: true,
  magnetic: true,
  minimal: false,
  reducedMotion: false,
  coarsePointer: false,
};

const PrefsCtx = createContext<PrefsContextValue>({
  ...DEFAULTS,
  setPref: () => {},
});

function readStored(): Partial<Record<PrefKey, boolean>> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    const record = parsed as Record<string, unknown>;
    const out: Partial<Record<PrefKey, boolean>> = {};
    (["sfx", "cursor", "magnetic", "minimal"] as const).forEach((key) => {
      if (typeof record[key] === "boolean") out[key] = record[key];
    });
    return out;
  } catch {
    return {};
  }
}

function writeStored(next: Partial<Record<PrefKey, boolean>>): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode, blocked) — prefs stay in-memory.
  }
}

export function PrefsProvider({ children }: { children?: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);

  useEffect(() => {
    let rmQuery: MediaQueryList | null = null;
    let cpQuery: MediaQueryList | null = null;
    try {
      rmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      cpQuery = window.matchMedia("(pointer: coarse)");
    } catch {
      // matchMedia unavailable — keep defaults.
    }
    const reducedMotion = rmQuery?.matches ?? false;
    const coarsePointer = cpQuery?.matches ?? false;
    const stored = readStored();
    setPrefs({
      // A11y: sfx defaults OFF for reduced-motion visitors with no stored pref.
      sfx: stored.sfx ?? (reducedMotion ? false : DEFAULTS.sfx),
      cursor: stored.cursor ?? DEFAULTS.cursor,
      magnetic: stored.magnetic ?? DEFAULTS.magnetic,
      minimal: stored.minimal ?? DEFAULTS.minimal,
      reducedMotion,
      coarsePointer,
    });
    const onRm = (e: MediaQueryListEvent) =>
      setPrefs((s) => ({ ...s, reducedMotion: e.matches }));
    const onCp = (e: MediaQueryListEvent) =>
      setPrefs((s) => ({ ...s, coarsePointer: e.matches }));
    rmQuery?.addEventListener("change", onRm);
    cpQuery?.addEventListener("change", onCp);
    return () => {
      rmQuery?.removeEventListener("change", onRm);
      cpQuery?.removeEventListener("change", onCp);
    };
  }, []);

  // Mirror the minimal pref onto <html data-minimal> so the CSS skin
  // (global.css `html[data-minimal]` block) applies. On load the is:inline
  // head scripts set the same attribute BEFORE first paint from the same
  // storage key; the first run below happens while state is still DEFAULTS
  // (the storage sync above hasn't applied yet), so it must leave the
  // attribute exactly as the pre-paint script set it — otherwise a stored
  // minimal=true would flash fancy tokens for a frame.
  const minimalSynced = useRef(false);
  useEffect(() => {
    if (!minimalSynced.current) {
      minimalSynced.current = true;
      return;
    }
    const el = document.documentElement;
    if (prefs.minimal) el.setAttribute("data-minimal", "");
    else el.removeAttribute("data-minimal");
    // Keep the browser-chrome tint on the active background token. The
    // value is resolved from CSS (--color-cream collapses to paper under
    // data-minimal), so no hex literal lives outside global.css.
    const meta = document.querySelector('meta[name="theme-color"]');
    const bg = getComputedStyle(el).getPropertyValue("--color-cream").trim();
    if (meta && bg) meta.setAttribute("content", bg);
  }, [prefs.minimal]);

  const setPref = useCallback((key: PrefKey, value: boolean) => {
    setPrefs((s) => ({ ...s, [key]: value }));
    writeStored({ ...readStored(), [key]: value });
  }, []);

  const value = useMemo<PrefsContextValue>(
    () => ({ ...prefs, setPref }),
    [prefs, setPref]
  );

  return <PrefsCtx.Provider value={value}>{children}</PrefsCtx.Provider>;
}

export function usePrefs(): PrefsContextValue {
  return useContext(PrefsCtx);
}
