"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLock, FiArrowLeft } from "react-icons/fi";
import { resetPasswordAction } from "../../api/authentication/resetPassword";
import { Heading, Alert, PasswordField, SubmitButton, StrengthMeter, passwordChecks, IS_DEMO } from "./ui";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (password.length < 8 || passwordChecks(password).score < 2) next.password = "Use at least 8 characters with letters and a number.";
    if (confirm !== password) next.confirm = "The passwords do not match.";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;
    setLoading(true);
    if (IS_DEMO) {
      setTimeout(() => {
        setLoading(false);
        setDone(true);
        setTimeout(() => router.push("/sign-in"), 1800);
      }, 700);
      return;
    }
    try {
      const fd = new FormData();
      fd.set("password", password);
      fd.set("confirmPassword", confirm);
      await resetPasswordAction(fd);
    } catch {
      setFormError("We could not update your password. Please request a new reset link.");
      setLoading(false);
    }
  };

  if (done) {
    return (
      <>
        <Heading title="Password updated" subtitle="You can now sign in with your new password." />
        <Alert type="success">All set. Taking you to sign in...</Alert>
        <Link href="/sign-in" className="flex h-12 w-full items-center justify-center rounded-xl bg-[#00FF99] font-semibold text-black hover:bg-[#00e68a]">Go to sign in</Link>
      </>
    );
  }

  return (
    <>
      <Heading title="Set a new password" subtitle="Choose a strong password you have not used before." />
      {formError && <Alert type="error">{formError}</Alert>}
      <form onSubmit={handleSubmit} noValidate>
        <PasswordField id="password" label="New password" icon={<FiLock />} autoComplete="new-password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <StrengthMeter password={password} />
        <PasswordField id="confirm" label="Confirm password" icon={<FiLock />} autoComplete="new-password" placeholder="Repeat the password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
        <SubmitButton loading={loading}>{loading ? "Updating..." : "Update password"}</SubmitButton>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-400">
        <Link href="/sign-in" className="inline-flex items-center gap-1.5 font-semibold text-[#00FF99] hover:underline"><FiArrowLeft /> Back to sign in</Link>
      </p>
    </>
  );
}
