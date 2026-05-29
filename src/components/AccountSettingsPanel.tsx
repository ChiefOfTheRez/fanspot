"use client";

import { FormEvent, useState } from "react";

export function AccountSettingsPanel({ initial }: { initial: { displayName: string; username: string; email: string; phoneNumber?: string | null; bio?: string | null; emailVerified: boolean; emailMarketingOptIn: boolean } }) {
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [username, setUsername] = useState(initial.username);
  const [bio, setBio] = useState(initial.bio ?? "");
  const [phoneNumber, setPhoneNumber] = useState(initial.phoneNumber ?? "");
  const [emailMarketingOptIn, setEmailMarketingOptIn] = useState(initial.emailMarketingOptIn);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    const response = await fetch("/api/me/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, username, phoneNumber, bio, emailMarketingOptIn })
    });
    const payload = await response.json().catch(() => null);
    setLoading(false);
    if (!response.ok) {
      setError(payload?.error || "Could not save settings.");
      return;
    }
    setMessage("Settings saved.");
  }

  async function resendVerification() {
    setResending(true);
    setMessage("");
    setError("");
    const response = await fetch("/api/auth/resend-verification", { method: "POST" });
    const payload = await response.json().catch(() => null);
    setResending(false);
    if (!response.ok) {
      setError(payload?.error || "Could not send verification email.");
      return;
    }
    setMessage("Verification email sent. For local testing, check the terminal running npm run dev.");
  }

  return (
    <form onSubmit={save} className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-white/5 p-4 text-sm text-slate-300">
        <p className="font-bold text-white">Email</p>
        <p className="mt-1">{initial.email}</p>
        <p className="mt-2 text-xs text-slate-500">Status: {initial.emailVerified ? "Verified" : "Not verified"}</p>
        {!initial.emailVerified ? <button type="button" onClick={() => void resendVerification()} disabled={resending} className="mt-3 rounded-xl bg-blue-600 px-3 py-2 text-xs font-black text-white hover:bg-blue-500 disabled:opacity-50">{resending ? "Sending..." : "Resend verification email"}</button> : null}
      </div>
      <label className="block text-sm font-bold text-slate-300">Display name<input value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></label>
      <label className="block text-sm font-bold text-slate-300">Username<input value={username} onChange={(event) => setUsername(event.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))} className="mt-2 w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></label>
      <label className="block text-sm font-bold text-slate-300">Phone number <span className="text-xs font-normal text-slate-500">(optional)</span><input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} type="tel" autoComplete="tel" placeholder="Optional phone number" className="mt-2 w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></label>
      <label className="block text-sm font-bold text-slate-300">Bio<textarea value={bio} onChange={(event) => setBio(event.target.value)} className="mt-2 min-h-28 w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></label>
      <label className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-white/5 p-4 text-sm text-slate-300"><input type="checkbox" checked={emailMarketingOptIn} onChange={(event) => setEmailMarketingOptIn(event.target.checked)} className="mt-1" /><span>Send me creator announcements, product updates, and mailing-list emails.</span></label>
      {message ? <p className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-100">{message}</p> : null}
      {error ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}
      <button disabled={loading} className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-500 disabled:opacity-50">{loading ? "Saving..." : "Save settings"}</button>
    </form>
  );
}
