"use server";

import { createClient } from "../../utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const forgotPasswordAction = async (formData) => {
  if (process.env.DEMO_MODE === "true") redirect("/sign-in");
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    redirect("/forgot-password");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    redirect("/forgot-password");
    
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  redirect("/forgot-password");
};
