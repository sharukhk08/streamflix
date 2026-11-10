"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

export async function signup(formData) {
  if (process.env.DEMO_MODE === "true") redirect("/profile");
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password,
    options: {
      //emailRedirectTo: `${origin}/auth/callback`,
      data: {
        displayName: formData.displayName,
      },
    },
  };

  const { data: authData, error: authError } = await supabase.auth.signUp(data);

  // Check if there was an authentication error or if authData is null
  if (authError || !authData) {
    console.error("Supabase Auth Error:", authError); // Log the full error for debugging

    // Handle specific error messages
    if (authError.message.includes("password")) {
      throw new Error(
        "Password validation failed. Please ensure your password meets the requirements."
      );
    }
    if (authError.message.includes("email")) {
      throw new Error("Email is already in use. Please use a different email.");
    }
    // Notify the user of a generic error
    throw new Error("Authentication failed. Please try again.");
  }

  // If registration is successful, redirect to sign-in
  revalidatePath("/", "layout");
  redirect("/sign-in");
}
