"use server";
import { createClient } from "../../../utils/supabase/server";

const supabase = createClient(); // Ensure supabase client is created

export async function createProfile(profileData) {
  // Retrieve userId from Supabase session
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    console.error("User not found or session error:", sessionError);
    return null;
  }

  const userId = user.id; // Get userId from the user object

  const { data, error } = await supabase
    .from("profiles")
    .insert([
      // Insert profile data
      {
        user_id: userId, // Ensure user_id is included
        profile_name: profileData.profileName,
        profile_image: profileData.profileImage,
        is_kid: profileData.isKidsAccount, // Ensure this matches the key in profileData
        language: profileData.language,
        maturity_level: profileData.maturity, // Ensure this matches the key in profileData
      },
    ])
    .single(); // Use .single() to return a single object instead of an array

  if (error) {
    console.error("Error creating profile:", error.message);
    return null;
  }
  return data;
}
