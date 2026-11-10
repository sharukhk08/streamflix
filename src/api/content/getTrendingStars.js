"use server";
import { isDemo, demoStars } from "../../demo/data";

import { createClient } from "../../utils/supabase/server";

export const getTrendingStars = async (filter) => {
  if (isDemo()) return demoStars;
  const client = createClient();
  try {
    const { data: actors, error: actorsError } = await client
      .from("actors")
      .select("actor_id, name, profile_image_url")
      .limit(4);

    const { data: directors, error: directorsError } = await client
      .from("directors")
      .select("director_id, name, profile_image_url")
      .limit(4);

    if (actorsError || directorsError) {
      throw new Error(actorsError?.message || directorsError?.message);
    }

    return { actors, directors };
  } catch (error) {
    console.error("Error fetching trending stars:", error);
    return { actors: [], directors: [] };
  }
};
