"use server";
import { isDemo } from "../../../demo/data";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";

export async function validateProfile() {
  if (isDemo()) return true;
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
      redirect("/error");
    }

    if (profiles.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    throw error;
  }
}
