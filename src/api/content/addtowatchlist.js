"use server";
import { isDemo, demoWatchlist } from "../../demo/data";

import { createClient } from "../../utils/supabase/server";

export async function addToWatchlist(contentId, profileId) {
  if (isDemo()) { demoWatchlist.add(contentId); return { success: true, data: [] }; }
  try {
    const client = createClient();

    // Insert into watchlists using the provided profile_id
    const { data, error } = await client
      .from("watchlists")
      .insert([{ content_id: contentId, profile_id: profileId }])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return { success: false, error: error.message };
  }
}
