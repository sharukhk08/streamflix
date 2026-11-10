"use server";

import { getContent } from "./getcontent";
import { getWatchlist } from "./getwatchlist";

export async function getContentWatchlist(profileId) {
  try {
    // Get the watchlist for the profile
    const {
      success: watchlistSuccess,
      data: watchlistData,
      error: watchlistError,
    } = await getWatchlist(profileId);

    if (!watchlistSuccess) {
      throw new Error(watchlistError || "Failed to fetch watchlist");
    }

    // Get all content
    const { collections } = await getContent();

    // Extract content IDs from the watchlist
    const watchlistContentIds = new Set(
      watchlistData.map((item) => item.content_id)
    );

    // Filter and organize watchlist content
    const seen = new Set();
    const watchlistContent = collections
      .flatMap((collection) =>
        collection.items.filter((item) => watchlistContentIds.has(item.id))
      )
      .filter((item) => !seen.has(item.id) && seen.add(item.id));

    return {
      success: true,
      data: {
        movies: watchlistContent.filter((item) => item.content === "movie"),
        series: watchlistContent.filter((item) => item.content === "series"),
      },
    };
  } catch (error) {
    console.error("Error fetching watchlist content:", error);
    return { success: false, error: error.message };
  }
}
