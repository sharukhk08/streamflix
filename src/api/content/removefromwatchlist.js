"use server";
import { isDemo, demoWatchlist } from "../../demo/data";

import { createClient } from "../../utils/supabase/server";

export async function removeFromWatchlist(contentId, profileId) {
  if (isDemo()) { demoWatchlist.delete(contentId); return { success: true }; }
  try {
    const client = createClient();

    const { data, error } = await client
      .from("watchlists")
      .delete()
      .match({ content_id: contentId, profile_id: profileId });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    return { success: false, error: error.message };
  }
}
