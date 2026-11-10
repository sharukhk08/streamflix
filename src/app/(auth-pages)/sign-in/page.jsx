"use client";
import React from "react";
import Link from "next/link";
import LoginForm from "../../../components/authentication/loginForm";
import { AuthShell } from "../../../components/authentication/ui";

export default function Page() {
  return (
    <AuthShell
      cta={
        <Link href="/sign-up" className="rounded-xl border border-[#00FF99] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#00FF99] hover:text-black">
          Create account
        </Link>
      }>
      <LoginForm />
    </AuthShell>
  );
}
