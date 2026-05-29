"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Card } from "@/components/Card";
import { AppleAuthButton } from "@/components/AppleAuthButton";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      login,
      password,
      redirect: false
    });

    setLoading(false);

    if (result?.error) {
      setError("Login failed. Check your username/email and password.");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    router.push(params.get("next") || "/feed");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-fan-black px-5 py-10 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <Card>
          <h1 className="text-2xl font-black text-white">Log in</h1>
          <p className="mt-2 text-sm text-slate-400">Welcome back to FanSpot.</p>
          <div className="mt-6">
            <GoogleAuthButton />
            <div className="mt-3"><AppleAuthButton /></div>
          </div>
          {(process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true" || process.env.NEXT_PUBLIC_APPLE_AUTH_ENABLED === "true") ? <div className="my-6 flex items-center gap-3"><div className="h-px flex-1 bg-slate-800" /><span className="text-xs font-bold uppercase tracking-wide text-slate-500">or</span><div className="h-px flex-1 bg-slate-800" /></div> : null}
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <label className="block text-sm font-bold text-slate-300">
              Username or email
              <input
                className="mt-2 w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                placeholder="username or you@example.com"
                type="text"
                autoComplete="username"
                required
              />
            </label>
            <label className="block text-sm font-bold text-slate-300">
              Password
              <input
                className="mt-2 w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                type="password"
                autoComplete="current-password"
                required
              />
            </label>
            {error ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
            <button className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">No account? <Link href="/signup" className="font-bold text-blue-300">Sign up</Link></p>
        </Card>
      </div>
    </main>
  );
}
