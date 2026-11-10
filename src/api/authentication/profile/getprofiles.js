"use server";
import { isDemo, demoProfiles } from "../../../demo/data";
import { createClient } from "../../../utils/supabase/server";
import { cache } from "react";

// Cache the getProfiles function
export const getProfiles = cache(async () => {
  if (isDemo()) return demoProfiles;
  try {
    const client = createClient();
    const { data: session, error: sessionError } = await client.auth.getUser();

    if (sessionError) {
      throw new Error("Failed to fetch user: " + sessionError.message);
    }

    const { data: profiles, error: profileError } = await client
      .from("profiles")
      .select("*")
      .eq("user_id", session.user.id);

    if (profileError) {
      throw new Error("Failed to fetch profiles: " + profileError.message);
    }

    return profiles;
  } catch (error) {
    throw new Error("Failed to fetch profiles: " + error.message);
  }
});
