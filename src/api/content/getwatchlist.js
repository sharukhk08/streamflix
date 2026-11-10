"use server";
import { isDemo, demoWatchlist } from "../../demo/data";

import { createClient } from "../../utils/supabase/server";

export async function getWatchlist(profileId) {
  if (isDemo()) return { success: true, data: [...demoWatchlist].map((content_id) => ({ content_id })) };
  try {
    const client = createClient();

    const { data, error } = await client
      .from("watchlists")
      .select("content_id")
      .eq("profile_id", profileId);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return { success: false, error: error.message };
  }
}
