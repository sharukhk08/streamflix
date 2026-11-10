"use server";
import { isDemo, demoSpecific } from "../../demo/data";

import { cache } from "react";
import { createClient } from "../../utils/supabase/server";

const getClient = () => createClient();

// Helper function to format duration
const formatDuration = (minutes) => {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let formattedDuration = "";
  if (hours > 0) {
    formattedDuration += `${hours}h`;
  }
  if (remainingMinutes > 0) {
    formattedDuration += formattedDuration ? " " : "";
    formattedDuration += `${remainingMinutes}m`;
  }
  return formattedDuration;
};

export const getSpecificContent = cache(async (itemId) => {
  if (isDemo()) return demoSpecific(itemId);
  try {
    // Fetch content details including the type column
    const { data: contentData, error: contentError } = await getClient()
      .from("content")
      .select(
        `
        title,
        description,
        release_date,
        duration,
        maturity_rating,
        image_url,
        type,
        video_id,
        studios ( studio_name ),
        content_cast (
          actors: actors_id ( name )
        ),
        content_directors (
          director: director_id ( name )
        ),
        content_categories (
          categories: category_id ( category_name )
        )
      `
      )
      .eq("content_id", itemId)
      .single(); // Assuming single content per ID

    if (contentError) {
      throw contentError;
    }

    if (!contentData) {
      return null; // No content data found for the given ID
    }

    // Extract and process data
    const {
      title,
      description,
      release_date,
      duration,
      maturity_rating,
      image_url,
      type,
      video_id,
      studios: studio,
      content_cast,
      content_directors,
      content_categories,
    } = contentData;

    // Process data
    const releaseYear = release_date
      ? new Date(release_date).getFullYear()
      : null;

    // Format duration
    const formattedDuration = formatDuration(duration);

    // Initialize episode details
    let episodesData = [];
    let seasons = [];
    if (type === "series") {
      // Fetch episodes for the series
      const { data: episodes, error: episodesError } = await getClient()
        .from("episodes")
        .select(
          `
          episode_id,
          season_number,
          episode_number,
          title,
          description,
          duration,
          image_url,
          video_id,
          intro_marker,
          outro_marker
          `
        )
        .eq("content_id", itemId)
        .order("season_number", { ascending: true })
        .order("episode_number", { ascending: true });

      if (episodesError) {
        throw episodesError;
      }

      episodesData = episodes;

      // Determine unique seasons
      seasons = [...new Set(episodes.map((episode) => episode.season_number))];
    }

    return {
      title,
      description,
      releaseDate: releaseYear,
      duration: formattedDuration, // Use the formatted duration here
      rating: maturity_rating,
      maturityRating: maturity_rating,
      image_url,
      type,
      video_id,
      categories: content_categories.map(
        (category) => category.categories.category_name
      ),
      studioName: studio ? studio.studio_name : null,
      cast: content_cast.map((castMember) => castMember.actors.name),
      director:
        content_directors.length > 0
          ? content_directors[0].director.name
          : null,
      seasons: seasons.length,
      episodes: type === "series" ? episodesData : undefined,
    };
  } catch (error) {
    console.error("Error fetching content: ", error);
    return null;
  }
});
