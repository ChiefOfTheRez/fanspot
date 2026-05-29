"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminApplicationActions({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function decide(status: "APPROVED" | "NEEDS_MORE_INFO" | "REJECTED") {
    setLoading(status);
    setError("");
    const response = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes: status === "APPROVED" ? "Approved from admin panel." : "Updated from admin panel." })
    });
    setLoading(null);
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.error || "Could not update application.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button disabled={Boolean(loading)} onClick={() => void decide("APPROVED")} className="rounded-xl bg-green-600 px-3 py-2 text-xs font-black text-white hover:bg-green-500 disabled:opacity-50">Approve</button>
      <button disabled={Boolean(loading)} onClick={() => void decide("NEEDS_MORE_INFO")} className="rounded-xl border border-slate-700 px-3 py-2 text-xs font-black text-slate-200 hover:bg-white/5 disabled:opacity-50">More info</button>
      <button disabled={Boolean(loading)} onClick={() => void decide("REJECTED")} className="rounded-xl border border-red-500/40 px-3 py-2 text-xs font-black text-red-200 hover:bg-red-500/10 disabled:opacity-50">Reject</button>
      {error ? <p className="basis-full text-xs text-red-200">{error}</p> : null}
    </div>
  );
}
