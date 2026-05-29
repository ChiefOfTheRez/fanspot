"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function CommentForm({ postId, disabledReason }: { postId: string; disabledReason?: string }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabledReason) return;
    setLoading(true);
    setError("");
    const response = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body })
    });
    const payload = await response.json().catch(() => null);
    setLoading(false);
    if (!response.ok) {
      setError(payload?.error || "Could not post comment.");
      return;
    }
    setBody("");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <textarea disabled={Boolean(disabledReason)} value={body} onChange={(event) => setBody(event.target.value)} placeholder={disabledReason ?? "Write a comment..."} className="min-h-24 w-full resize-none rounded-2xl border border-slate-800 bg-white/5 p-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60" />
      {error ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}
      {disabledReason ? <p className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-100">{disabledReason}</p> : null}
      <button disabled={loading || !body.trim() || Boolean(disabledReason)} className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Posting..." : "Post comment"}</button>
    </form>
  );
}
