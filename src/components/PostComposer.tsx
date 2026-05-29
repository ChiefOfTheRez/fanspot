"use client";

import { Image as ImageIcon, Lock, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { Card } from "@/components/Card";

export function PostComposer() {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [visibility, setVisibility] = useState<"PUBLIC" | "FOLLOWERS" | "SUPPORTERS">("PUBLIC");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mediaName, setMediaName] = useState("");

  function onMediaSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setMediaName(file ? file.name : "");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: mediaName ? `${body}\n\nAttached media: ${mediaName}` : body, visibility })
    });

    setLoading(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.error || "Could not publish post.");
      return;
    }

    setBody("");
    router.refresh();
  }

  return (
    <Card>
      <form className="flex gap-3" onSubmit={onSubmit}>
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 font-black text-white">F</div>
        <div className="flex-1">
          <textarea
            className="min-h-24 w-full resize-none rounded-3xl border border-slate-800 bg-white/5 p-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            placeholder="Share your first FanSpot post..."
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
            maxLength={4000}
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-800 px-3 py-2 hover:bg-white/5"><ImageIcon className="h-4 w-4" aria-hidden="true" /> {mediaName || "Attach media"}<input type="file" accept="image/*,video/*" onChange={onMediaSelect} className="sr-only" /></label>
              <label className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 px-3 py-2 hover:bg-white/5">
                <Lock className="h-4 w-4" aria-hidden="true" />
                <select className="bg-transparent text-xs font-bold outline-none" value={visibility} onChange={(event) => setVisibility(event.target.value as "PUBLIC" | "FOLLOWERS" | "SUPPORTERS")}>
                  <option className="bg-slate-950" value="PUBLIC">Public</option>
                  <option className="bg-slate-950" value="FOLLOWERS">Followers</option>
                  <option className="bg-slate-950" value="SUPPORTERS">Supporters</option>
                </select>
              </label>
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60" disabled={loading || !body.trim()}>
              <Send className="h-4 w-4" aria-hidden="true" /> {loading ? "Posting..." : "Post"}
            </button>
          </div>
          {error ? <p className="mt-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
        </div>
      </form>
    </Card>
  );
}
