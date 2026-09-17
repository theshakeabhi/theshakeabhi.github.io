// P6 — live local-time hook for Contact's "IT IS {clock} IN BENGALURU"
// pill (README §Live Clock). Owns its own 1s setInterval.
//
// SSR-SAFE: returns a stable "--:--:--" placeholder on the server and on
// the first client paint (identical first-paint markup, no hydration
// mismatch), then fills in the real time after mount.
import { useEffect, useState } from "react";

export const LOCAL_TIME_PLACEHOLDER = "--:--:--";

export function useLocalTime(tz = "Asia/Kolkata"): string {
  const [time, setTime] = useState<string>(LOCAL_TIME_PLACEHOLDER);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, [tz]);

  return time;
}
