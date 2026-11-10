"use server";
import { createClient } from "../../../utils/supabase/server";

export async function updateProfile(updatedProfileData) {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error.message);
      throw new Error("Failed to fetch user: " + error.message);
    }

    // Update the profile in the Supabase database
    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({
        profile_name: updatedProfileData.profileName,
        profile_image: updatedProfileData.profileImage,
        is_kid: updatedProfileData.is_kid,
        language: updatedProfileData.language,
        maturity_level: updatedProfileData.maturity,
        updated_at: new Date(), // Update the timestamp
      })
      .eq("profile_id", updatedProfileData.id); // Use profile_id from updatedProfileData

    if (updateError) {
      throw new Error("Failed to update profile: " + updateError.message);
    }

    return data; // Return the updated profile data
  } catch (error) {
    throw new Error("Failed to update profile: " + error.message);
  }
}
