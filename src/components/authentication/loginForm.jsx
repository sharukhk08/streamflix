"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import { login } from "../../api/authentication/login";
import { Heading, Alert, Field, PasswordField, SubmitButton, isEmail, IS_DEMO } from "./ui";

const DEMO_EMAIL = "demo@streamflix.example";
const DEMO_PASSWORD = "Demo@1234";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!isEmail(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;
    setLoading(true);
    try {
      await login({ email: email.trim(), password });
    } catch {
      setFormError("The email or password is incorrect. Please try again.");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <>
      <Heading title="Welcome back" subtitle="Sign in to continue watching" />
      {IS_DEMO && (
        <Alert type="info">
          <strong className="text-white">Demo mode:</strong> any email and password work.{" "}
          <button
            type="button"
            className="font-medium text-[#00FF99] underline underline-offset-2"
            onClick={() => {
              setEmail(DEMO_EMAIL);
              setPassword(DEMO_PASSWORD);
              setErrors({});
            }}>
            Use the demo account
          </button>
        </Alert>
      )}
      {formError && <Alert type="error">{formError}</Alert>}
      <form onSubmit={handleSubmit} noValidate>
        <Field id="email" label="Email" icon={<FiMail />} type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <PasswordField id="password" label="Password" icon={<FiLock />} autoComplete="current-password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <div className="-mt-2 mb-2 text-right">
          <Link href="/forgot-password" className="text-sm text-zinc-400 hover:text-[#00FF99]">Forgot password?</Link>
        </div>
        <SubmitButton loading={loading}>{loading ? "Signing in..." : "Sign in"}</SubmitButton>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-400">
        New to StreamFlix?{" "}
        <Link href="/sign-up" className="font-semibold text-[#00FF99] hover:underline">Create an account</Link>
      </p>
    </>
  );
}
