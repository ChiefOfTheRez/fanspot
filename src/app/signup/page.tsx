"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Card } from "@/components/Card";
import { AppleAuthButton } from "@/components/AppleAuthButton";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { Logo } from "@/components/Logo";

export default function SignupPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailMarketingOptIn, setEmailMarketingOptIn] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, username, email, password, phoneNumber, emailMarketingOptIn })
    });
    const payload = await response.json();

    if (!response.ok || !payload?.data?.accepted) {
      setLoading(false);
      setError(payload?.data?.reason || payload?.error || "Could not create account.");
      return;
    }

    const result = await signIn("credentials", { login: email, password, redirect: false });
    setLoading(false);

    if (result?.error) {
      setNotice("Account created. Check your email to verify your account, then log in.");
      router.push("/login");
      return;
    }

    setNotice("Account created. Check your email to verify your account.");
    router.push("/feed");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-fan-black px-5 py-10 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <Card>
          <h1 className="text-2xl font-black text-white">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">Join FanSpot and start building your home feed.</p>
          <div className="mt-6"><GoogleAuthButton label="Sign up with Google" />
            <div className="mt-3"><AppleAuthButton label="Sign up with Apple" /></div></div>
          {(process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true" || process.env.NEXT_PUBLIC_APPLE_AUTH_ENABLED === "true") ? <div className="my-6 flex items-center gap-3"><div className="h-px flex-1 bg-slate-800" /><span className="text-xs font-bold uppercase tracking-wide text-slate-500">or</span><div className="h-px flex-1 bg-slate-800" /></div> : null}
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <label className="block text-sm font-bold text-slate-300">
              Display name
              <input className="mt-2 w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Your name" autoComplete="name" required />
            </label>
            <label className="block text-sm font-bold text-slate-300">
              Username
              <input className="mt-2 w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" value={username} onChange={(event) => setUsername(event.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))} placeholder="username" autoComplete="username" required minLength={3} />
            </label>
            <label className="block text-sm font-bold text-slate-300">
              Email
              <input className="mt-2 w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" type="email" autoComplete="email" required />
            </label>
            <label className="block text-sm font-bold text-slate-300">
              Password
              <input className="mt-2 w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 10 characters" type="password" autoComplete="new-password" required minLength={10} />
            </label>
            <label className="block text-sm font-bold text-slate-300">
              Phone number <span className="text-xs font-normal text-slate-500">(optional)</span>
              <input className="mt-2 w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} placeholder="Optional phone number" type="tel" autoComplete="tel" />
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-white/5 p-4 text-sm text-slate-300">
              <input type="checkbox" checked={emailMarketingOptIn} onChange={(event) => setEmailMarketingOptIn(event.target.checked)} className="mt-1" />
              <span>Send me account updates, creator announcements, and mailing-list emails. I can change this later.</span>
            </label>
            {notice ? <p className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">{notice}</p> : null}
            {error ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
            <button className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={loading}>{loading ? "Creating account..." : "Create account"}</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">Already have an account? <Link href="/login" className="font-bold text-blue-300">Log in</Link></p>
        </Card>
      </div>
    </main>
  );
}
