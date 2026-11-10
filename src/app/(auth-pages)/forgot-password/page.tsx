"use client";
import React from "react";
import Link from "next/link";
import ForgetPasswordForm from "../../../components/authentication/forgetPasswordForm";
import { AuthShell } from "../../../components/authentication/ui";

export default function Page() {
  return (
    <AuthShell
      cta={
        <Link href="/sign-in" className="rounded-xl border border-[#00FF99] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#00FF99] hover:text-black">
          Sign in
        </Link>
      }>
      <ForgetPasswordForm />
    </AuthShell>
  );
}
