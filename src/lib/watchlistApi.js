// Watchlist calls. In demo mode they use the browser's localStorage (per profile, no database);
// otherwise they call the real server actions.
import { getWatchlist as srvGet } from "../api/content/getwatchlist";
import { addToWatchlist as srvAdd } from "../api/content/addtowatchlist";
import { removeFromWatchlist as srvRemove } from "../api/content/removefromwatchlist";
import { getContentWatchlist as srvContent } from "../api/content/getcontentwatchlist";
import { getContent } from "../api/content/getcontent";

const DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
const key = (pid) => `demoWatchlist:${pid || "default"}`;

const read = (pid) => {
  try {
    const v = JSON.parse(localStorage.getItem(key(pid)));
    if (Array.isArray(v)) return v;
  } catch {}
  const seed = pid === "demo-profile-1" ? ["demo-2", "demo-5"] : [];
  localStorage.setItem(key(pid), JSON.stringify(seed));
  return seed;
};
const write = (pid, list) => localStorage.setItem(key(pid), JSON.stringify(list));

export const getWatchlist = DEMO
  ? async (pid) => ({ success: true, data: read(pid).map((content_id) => ({ content_id })) })
  : srvGet;

export const addToWatchlist = DEMO
  ? async (contentId, pid) => {
      write(pid, [...new Set([...read(pid), contentId])]);
      return { success: true, data: [] };
    }
  : srvAdd;

export const removeFromWatchlist = DEMO
  ? async (contentId, pid) => {
      write(pid, read(pid).filter((id) => id !== contentId));
      return { success: true };
    }
  : srvRemove;

export const getContentWatchlist = DEMO
  ? async (pid) => {
      const ids = new Set(read(pid));
      const { collections } = await getContent();
      const seen = new Set();
      const items = collections
        .flatMap((c) => c.items)
        .filter((i) => ids.has(i.id) && !seen.has(i.id) && seen.add(i.id));
      return {
        success: true,
        data: {
          movies: items.filter((i) => i.content === "movie"),
          series: items.filter((i) => i.content === "series"),
        },
      };
    }
  : srvContent;
