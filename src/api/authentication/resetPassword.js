"use server";

import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";


export const resetPasswordAction = async (formData) => {
  if (process.env.DEMO_MODE === "true") redirect("/sign-in");
  const supabase = createClient();

  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!password || !confirmPassword) {
    redirect("/reset-password");
  }

  if (password !== confirmPassword) {
    redirect("/reset-password");
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    redirect("/reset-password");
  }

  redirect("/sign-in");
};