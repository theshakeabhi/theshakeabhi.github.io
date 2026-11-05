// Live "Listening →" note for the Now board: reads the owner's most recent
// scrobble from Last.fm (Spotify is linked to the Last.fm account, so it
// scrobbles there). Static site, no backend — Last.fm's read-only API key
// is public by design and safe to ship (the SHARED SECRET is never used).
//
// SSR-SAFE: returns null on the server and on the first client paint
// (identical first-paint markup — callers render their static fallback),
// fetches only inside the effect, and stays null on any failure or while
// LASTFM_API_KEY is empty. Polls every 90s while the tab is visible.
import { useEffect, useState } from "react";

export const LASTFM_USER = "theshakeabhi";
// Paste the Last.fm API key here (NOT the shared secret). Empty = disabled.
export const LASTFM_API_KEY = "cc79744ccf533e8fd7e5fb736b58baf2";

const POLL_MS = 90_000;

export interface LastfmTrack {
  name: string;
  artist: string;
  url: string;
  nowPlaying: boolean;
}

interface RecentTracksResponse {
  recenttracks?: {
    track?: {
      name?: string;
      url?: string;
      artist?: { "#text"?: string };
      "@attr"?: { nowplaying?: string };
    }[];
  };
}

export function useLastfmTrack(): LastfmTrack | null {
  const [track, setTrack] = useState<LastfmTrack | null>(null);

  useEffect(() => {
    if (!LASTFM_API_KEY) return;
    let cancelled = false;
    const ctrl = new AbortController();
    const endpoint =
      "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
      `&user=${encodeURIComponent(LASTFM_USER)}` +
      `&api_key=${encodeURIComponent(LASTFM_API_KEY)}&format=json&limit=1`;

    const load = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch(endpoint, { signal: ctrl.signal });
        if (!res.ok) return;
        const data = (await res.json()) as RecentTracksResponse;
        const t = data.recenttracks?.track?.[0];
        const name = t?.name?.trim();
        const artist = t?.artist?.["#text"]?.trim();
        if (cancelled || !name || !artist) return;
        setTrack({
          name,
          artist,
          url: t?.url ?? `https://www.last.fm/user/${LASTFM_USER}`,
          nowPlaying: t?.["@attr"]?.nowplaying === "true",
        });
      } catch {
        // Network/abort/parse failure — keep whatever we last showed.
      }
    };

    void load();
    const timer = window.setInterval(() => void load(), POLL_MS);
    const onVisible = () => {
      if (!document.hidden) void load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      ctrl.abort();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return track;
}
