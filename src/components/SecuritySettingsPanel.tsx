"use client";

import { FormEvent, useState } from "react";

type SecuritySettingsPanelProps = {
  email?: string | null;
};

export function SecuritySettingsPanel({ email }: SecuritySettingsPanelProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function requestPasswordReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/auth/password-reset", { method: "POST" });
      if (!response.ok) throw new Error("Password reset request failed");
      setStatus("success");
      setMessage("Password reset request sent. Check your email or console mail provider in this test build.");
    } catch {
      setStatus("error");
      setMessage("Could not send password reset request. Try again after deployment finishes.");
    }
  }

  return (
    <form onSubmit={requestPasswordReset} className="space-y-4">
      <div>
        <h2 className="text-lg font-black text-white">Security</h2>
        <p className="mt-1 text-sm leading-6 text-slate-400">
          Request a password reset for {email ?? "this account"}. This replaces the old shell card with an actual action.
        </p>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send password reset"}
      </button>

      {message ? (
        <p className={`rounded-2xl border px-4 py-3 text-sm ${status === "error" ? "border-red-500/30 bg-red-500/10 text-red-100" : "border-green-500/30 bg-green-500/10 text-green-100"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
