"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

export async function login(formData) {
  if (process.env.DEMO_MODE === "true") redirect("/profile");
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword(data);

  // Check if there was an authentication error or if authData is null
  if (authError || !authData) {
    // Notify the user of the error
    throw new Error("Authentication failed"); // This will be caught in the LoginForm component
  }

  // Fetch user's profile data (if it exists)
  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", authData.user.id);

  if (profileError) {
    redirect("/error");
  }

  if (profiles.length === 0) {
    revalidatePath("/", "layout");
    redirect("/profile");
  } else {
    revalidatePath("/", "layout");
    redirect("/profile");
  }
}
