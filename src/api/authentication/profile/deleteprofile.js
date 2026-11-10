"use server";

import { createClient } from "../../../utils/supabase/server";

export async function deleteProfile(deleteProfileData) {
  const supabase = createClient();

  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("profile_id", deleteProfileData.id); // Use the profileId to specify which profile to delete

  if (error) throw new Error(error.message); // Throw an error if the deletion fails
}
