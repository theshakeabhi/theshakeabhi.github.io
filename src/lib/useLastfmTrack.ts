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

// One in-flight/recent request shared by every caller (NowBoard's
// Listening note + the Hero vinyl) so the page polls Last.fm once, not
// once per component.
const SHARE_MS = 30_000;
let shared: { at: number; p: Promise<LastfmTrack | null> } | null = null;

function fetchTrack(): Promise<LastfmTrack | null> {
  const now = Date.now();
  if (shared && now - shared.at < SHARE_MS) return shared.p;
  const endpoint =
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
    `&user=${encodeURIComponent(LASTFM_USER)}` +
    `&api_key=${encodeURIComponent(LASTFM_API_KEY)}&format=json&limit=1`;
  const p = (async () => {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) return null;
      const data = (await res.json()) as RecentTracksResponse;
      const t = data.recenttracks?.track?.[0];
      const name = t?.name?.trim();
      const artist = t?.artist?.["#text"]?.trim();
      if (!name || !artist) return null;
      return {
        name,
        artist,
        url: t?.url ?? `https://www.last.fm/user/${LASTFM_USER}`,
        nowPlaying: t?.["@attr"]?.nowplaying === "true",
      };
    } catch {
      return null; // network/parse failure — callers keep what they had
    }
  })();
  shared = { at: now, p };
  return p;
}

export function useLastfmTrack(): LastfmTrack | null {
  const [track, setTrack] = useState<LastfmTrack | null>(null);

  useEffect(() => {
    if (!LASTFM_API_KEY) return;
    let cancelled = false;

    const load = async () => {
      if (document.hidden) return;
      const t = await fetchTrack();
      if (!cancelled && t) setTrack(t);
    };

    void load();
    const timer = window.setInterval(() => void load(), POLL_MS);
    const onVisible = () => {
      if (!document.hidden) void load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return track;
}
