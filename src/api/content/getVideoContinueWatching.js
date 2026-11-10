"use server";
import { isDemo } from "../../demo/data";

import { createClient } from "../../utils/supabase/server";

export async function getContinueWatching(profileId, contentId) {
  if (isDemo()) return { success: true, data: null };
  try {
    const client = createClient();
    const { data, error } = await client
      .from("continue_watching")
      .select("last_watched_duration")
      .eq("profile_id", profileId)
      .eq("content_id", contentId)
      .single();

    if (error) {
      console.error("Error fetching continue watching data:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching continue watching data:", error);
    return { success: false, error: error.message };
  }
}
