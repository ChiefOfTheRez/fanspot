"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function GoogleAuthButton({ label = "Continue with Google" }: { label?: string }) {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setLoading(true);
        void signIn("google", { callbackUrl: "/feed" }).finally(() => setLoading(false));
      }}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
    >
      <span className="grid h-5 w-5 place-items-center rounded-full border border-slate-300 text-xs font-black text-blue-600">G</span>
      {loading ? "Opening Google..." : label}
    </button>
  );
}
