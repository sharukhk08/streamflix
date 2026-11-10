"use server";

import { createClient } from "../../utils/supabase/client"; // Adjust the import path as necessary

export const deleteAccount = async (userId) => {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) throw error; // Throw error if deletion fails

    await supabase.auth.signOut(); // Sign out the user after deletion
  } catch (error) {
    console.error("Error deleting account:", error);
    setNotification({ type: "error", message: "Failed to delete account" });
  };
};
