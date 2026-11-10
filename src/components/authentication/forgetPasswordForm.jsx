"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { forgotPasswordAction } from "../../api/authentication/forgotPassword";
import { Heading, Alert, Field, SubmitButton, isEmail, IS_DEMO } from "./ui";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("Enter the email address of your account.");
      return;
    }
    setError("");
    setLoading(true);
    if (IS_DEMO) {
      setTimeout(() => {
        setLoading(false);
        setSent(true);
      }, 700);
      return;
    }
    try {
      const fd = new FormData();
      fd.set("email", email.trim());
      await forgotPasswordAction(fd);
      setSent(true);
    } catch {
      setError("We could not send the reset link. Please try again.");
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <>
        <Heading title="Check your email" subtitle="Password reset instructions" />
        <Alert type="success">
          If an account exists for <strong>{email.trim()}</strong>, a reset link is on its way.
          {IS_DEMO && " (Demo mode: no email is really sent.)"}
        </Alert>
        {IS_DEMO && (
          <Link href="/reset-password" className="flex h-12 w-full items-center justify-center rounded-xl bg-[#00FF99] font-semibold text-black hover:bg-[#00e68a]">
            Continue to reset your password
          </Link>
        )}
        <p className="mt-6 text-center text-sm text-zinc-400">
          <Link href="/sign-in" className="inline-flex items-center gap-1.5 font-semibold text-[#00FF99] hover:underline"><FiArrowLeft /> Back to sign in</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <Heading title="Forgot your password?" subtitle="Enter your email and we will send you a reset link." />
      {error && <Alert type="error">{error}</Alert>}
      <form onSubmit={handleSubmit} noValidate>
        <Field id="email" label="Email" icon={<FiMail />} type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <SubmitButton loading={loading}>{loading ? "Sending..." : "Send reset link"}</SubmitButton>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-400">
        <Link href="/sign-in" className="inline-flex items-center gap-1.5 font-semibold text-[#00FF99] hover:underline"><FiArrowLeft /> Back to sign in</Link>
      </p>
    </>
  );
}
