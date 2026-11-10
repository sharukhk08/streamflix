"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { signup } from "../../api/authentication/signup";
import { Heading, Alert, Field, PasswordField, SubmitButton, StrengthMeter, isEmail, passwordChecks, IS_DEMO } from "./ui";

export default function SignUpForm() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (displayName.trim().length < 2) next.displayName = "Enter your name (at least 2 characters).";
    if (!isEmail(email)) next.email = "Enter a valid email address.";
    if (passwordChecks(password).score < 2 || password.length < 8) next.password = "Use at least 8 characters with letters and a number.";
    if (!accept) next.accept = "Please accept the Terms and Privacy Policy to continue.";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;
    setLoading(true);
    try {
      await signup({ email: email.trim(), password, displayName: displayName.trim() });
    } catch (err) {
      setFormError(err?.message || "We could not create your account. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Heading title="Create your account" subtitle="Free to join. Start discovering films in a minute." />
      {IS_DEMO && <Alert type="info">Demo mode: no real account is created, you will go straight to profile setup.</Alert>}
      {formError && <Alert type="error">{formError}</Alert>}
      <form onSubmit={handleSubmit} noValidate>
        <Field id="name" label="Full name" icon={<FiUser />} autoComplete="name" placeholder="Your name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} error={errors.displayName} />
        <Field id="email" label="Email" icon={<FiMail />} type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <PasswordField id="password" label="Password" icon={<FiLock />} autoComplete="new-password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <StrengthMeter password={password} />
        <label className="flex cursor-pointer items-start gap-3 text-sm text-zinc-400">
          <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#00FF99]" />
          <span>
            I agree to the <Link href="/terms-of-service" className="text-[#00FF99] hover:underline">Terms of Service</Link> and{" "}
            <Link href="/privacy-policy" className="text-[#00FF99] hover:underline">Privacy Policy</Link>.
          </span>
        </label>
        {errors.accept && <p className="mt-1.5 text-xs text-red-300">{errors.accept}</p>}
        <SubmitButton loading={loading}>{loading ? "Creating account..." : "Create account"}</SubmitButton>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-[#00FF99] hover:underline">Sign in</Link>
      </p>
    </>
  );
}
