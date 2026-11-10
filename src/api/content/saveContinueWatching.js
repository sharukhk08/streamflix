"use server";
import { isDemo } from "../../demo/data";

import { createClient } from "../../utils/supabase/server";

export async function saveContinueWatching(profileId, contentId, episodeId, lastWatchedDuration, title) {
  if (isDemo()) return { success: true };
  try {
    const client = createClient();

    // Insert into continue_watching table
    const { data, error } = await client.from("continue_watching").upsert(
      [
        {
          profile_id: profileId,
          content_id: contentId,
          episode_id: episodeId || title,
          last_watched_duration: lastWatchedDuration,
        },
      ],
      { onConflict: ["profile_id", "content_id"] }
    );

    if (error) {
      console.error("Error during upsert:", error);
      return { success: false, error: error.message };
    } else {
      return { success: true, data };
    }
  } catch (error) {
    console.error("Error saving continue watching:", error);
    return { success: false, error: error.message };
  }
}
