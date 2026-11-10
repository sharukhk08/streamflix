"use server";

import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";


export async function signOut() {
  if (process.env.DEMO_MODE === "true") redirect("/sign-in");
  const supabase = createClient();

  // Perform the sign out
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("Sign out failed");
  }

  redirect("/sign-in");
}
