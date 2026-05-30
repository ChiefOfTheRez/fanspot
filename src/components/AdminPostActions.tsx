"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminPostActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function updatePost(nextStatus: "APPROVED" | "REMOVED" | "FLAGGED") {
    setLoading(nextStatus);
    setError("");
    const response = await fetch(`/api/posts/${id}`, {
      method: nextStatus === "REMOVED" ? "DELETE" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: nextStatus === "REMOVED" ? undefined : JSON.stringify({ status: nextStatus })
    });
    setLoading(null);
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.error || "Could not update post.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-2">
      {status !== "APPROVED" ? <button disabled={Boolean(loading)} onClick={() => void updatePost("APPROVED")} className="rounded-xl bg-green-600 px-3 py-2 text-xs font-black text-white hover:bg-green-500 disabled:opacity-50">Approve</button> : null}
      {status !== "FLAGGED" ? <button disabled={Boolean(loading)} onClick={() => void updatePost("FLAGGED")} className="rounded-xl border border-yellow-500/40 px-3 py-2 text-xs font-black text-yellow-100 hover:bg-yellow-500/10 disabled:opacity-50">Flag</button> : null}
      {status !== "REMOVED" ? <button disabled={Boolean(loading)} onClick={() => void updatePost("REMOVED")} className="rounded-xl border border-red-500/40 px-3 py-2 text-xs font-black text-red-200 hover:bg-red-500/10 disabled:opacity-50">Remove globally</button> : null}
      {error ? <p className="basis-full text-xs text-red-200">{error}</p> : null}
    </div>
  );
}
