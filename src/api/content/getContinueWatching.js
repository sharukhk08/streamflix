"use server";
import { isDemo } from "../../demo/data";
import { createClient } from "../../utils/supabase/server";

export const getContinueWatching = async (profileId) => {
  if (isDemo()) return [];
  const client = createClient();

  try {
    const { data, error } = await client
      .from("continue_watching")
      .select(
        `
        content_id,
        content:content_id (
          title,
          image_url,
          type,
          content_categories:content_categories!content_id (
            categories:category_id (
              category_name
            )
          )
        ),
        last_watched_at
      `
      )
      .eq("profile_id", profileId);

    if (error) {
      throw error;
    }

    const recentContentMap = new Map();

    data.forEach((item) => {
      const contentId = item.content_id;
      const lastWatch = item.last_watched_at;

      if (
        !recentContentMap.has(contentId) ||
        new Date(recentContentMap.get(contentId).last_watched_time) <
          new Date(lastWatch)
      ) {
        recentContentMap.set(contentId, {
          id: contentId,
          title: item.content.title,
          src: item.content.image_url,
          type: item.content.type,
          genre: item.content.content_categories[0]
            ? item.content.content_categories[0].categories.category_name
            : "Unknown",
          last_watched_time: lastWatch,
        });
      }
    });

    const sortedContent = Array.from(recentContentMap.values()).sort(
      (a, b) => new Date(b.last_watched_time) - new Date(a.last_watched_time)
    );

    return sortedContent;
  } catch (error) {
    console.error("Error fetching continue watching data:", error);
    return [];
  }
};
