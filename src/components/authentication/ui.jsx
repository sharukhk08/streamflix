"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";

// Shared look for every authentication screen: cinematic background + glass card.
export function AuthShell({ children, cta }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url(/demo/backdrop-3.jpg)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-[#070707]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#00FF99]/15 blur-[120px]"
        aria-hidden="true"
      />

      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-10">
        <Link href="/" aria-label="StreamFlix home">
          <Image src="/header/streamflixlogo.svg" alt="StreamFlix" width={200} height={37} priority className="h-[30px] w-auto sm:h-[36px]" />
        </Link>
        {cta}
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-170px)] items-center justify-center px-4 py-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black/55 p-7 shadow-[0_0_80px_rgba(0,255,153,0.08)] backdrop-blur-xl sm:p-9">
          {children}
        </div>
      </main>

      <footer className="relative z-10 px-4 pb-6 text-center text-xs text-zinc-500">
        <Link href="/terms-of-service" className="hover:text-white">Terms</Link>
        <span className="mx-2">·</span>
        <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
        <span className="mx-2">·</span>
        <Link href="/help" className="hover:text-white">Help</Link>
      </footer>
    </div>
  );
}

export function Heading({ title, subtitle }) {
  return (
    <div className="mb-6 text-center">
      <h1 className="bg-gradient-to-r from-white via-white to-[#00FF99] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
        {title}
      </h1>
      {subtitle && <p className="mt-2 text-sm text-zinc-400 sm:text-base">{subtitle}</p>}
    </div>
  );
}

export function Alert({ type = "info", children }) {
  const styles = {
    error: "border-red-500/40 bg-red-500/10 text-red-200",
    success: "border-[#00FF99]/40 bg-[#00FF99]/10 text-[#b8ffe0]",
    info: "border-white/15 bg-white/5 text-zinc-300",
  };
  const Icon = type === "error" ? FiAlertCircle : type === "success" ? FiCheckCircle : FiInfo;
  return (
    <div role={type === "error" ? "alert" : "status"} className={`mb-4 flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm ${styles[type]}`}>
      <Icon className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function Field({ id, label, icon, error, right, ...props }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-zinc-300">{label}</label>
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-zinc-500">{icon}</span>}
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-12 w-full rounded-xl border bg-white/5 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-[#00FF99] focus:bg-white/[0.07] focus:ring-2 focus:ring-[#00FF99]/20 ${icon ? "pl-11" : "pl-4"} ${right ? "pr-12" : "pr-4"} ${error ? "border-red-500/70" : "border-white/10"}`}
          {...props}
        />
        {right && <div className="absolute right-3 top-1/2 -translate-y-1/2">{right}</div>}
      </div>
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs text-red-300">{error}</p>}
    </div>
  );
}

export function PasswordField({ id, label, icon, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <Field
      id={id}
      label={label}
      icon={icon}
      type={show ? "text" : "password"}
      right={
        <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="p-1 text-lg text-zinc-400 hover:text-white">
          {show ? <FiEyeOff /> : <FiEye />}
        </button>
      }
      {...props}
    />
  );
}

export function SubmitButton({ loading, children, disabled }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00FF99] text-base font-semibold text-black transition hover:bg-[#00e68a] hover:shadow-[0_0_30px_rgba(0,255,153,0.35)] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400 disabled:shadow-none">
      {loading && (
        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  );
}

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

// 0-4 score + checklist for the password meter
export function passwordChecks(pw) {
  const checks = [
    { ok: pw.length >= 8, label: "8+ characters" },
    { ok: /[A-Z]/.test(pw) && /[a-z]/.test(pw), label: "Upper and lower case" },
    { ok: /\d/.test(pw), label: "A number" },
    { ok: /[^A-Za-z0-9]/.test(pw), label: "A symbol" },
  ];
  return { checks, score: checks.filter((c) => c.ok).length };
}

export function StrengthMeter({ password }) {
  const { checks, score } = passwordChecks(password);
  if (!password) return null;
  const colors = ["bg-red-500", "bg-red-500", "bg-amber-400", "bg-lime-400", "bg-[#00FF99]"];
  const labels = ["Too weak", "Weak", "Okay", "Good", "Strong"];
  return (
    <div className="-mt-1 mb-4" aria-live="polite">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= score ? colors[score] : "bg-white/10"}`} />
        ))}
      </div>
      <p className="mt-1.5 text-xs text-zinc-400">
        {labels[score]} · {checks.filter((c) => !c.ok).map((c) => c.label).join(", ") || "all checks passed"}
      </p>
    </div>
  );
}

export const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
