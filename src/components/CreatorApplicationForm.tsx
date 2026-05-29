"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";

type ExistingApplication = {
  status: string;
  displayName: string;
  desiredUsername?: string | null;
  category: string;
  audienceSummary: string;
  planSummary: string;
} | null;

export function CreatorApplicationForm({ existingApplication, defaultDisplayName, defaultUsername }: { existingApplication: ExistingApplication; defaultDisplayName: string; defaultUsername: string }) {
  const [displayName, setDisplayName] = useState(existingApplication?.displayName ?? defaultDisplayName);
  const [desiredUsername, setDesiredUsername] = useState(existingApplication?.desiredUsername ?? defaultUsername);
  const [category, setCategory] = useState(existingApplication?.category ?? "");
  const [audienceSummary, setAudienceSummary] = useState(existingApplication?.audienceSummary ?? "");
  const [planSummary, setPlanSummary] = useState(existingApplication?.planSummary ?? "");
  const [status, setStatus] = useState(existingApplication?.status ?? "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const response = await fetch("/api/creator/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, desiredUsername, category, audienceSummary, planSummary })
    });
    const payload = await response.json().catch(() => null);
    setLoading(false);

    if (!response.ok || !payload?.data?.application) {
      setError(payload?.error || "Could not submit application.");
      return;
    }

    setStatus(payload.data.application.status);
    setMessage("Application submitted. You can update it until it is reviewed.");
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      {status ? <p className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">Current status: {status.replaceAll("_", " ").toLowerCase()}</p> : null}
      <Field label="Creator display name" value={displayName} onChange={setDisplayName} placeholder="Your creator name" />
      <Field label="Preferred username" value={desiredUsername} onChange={(value) => setDesiredUsername(value.toLowerCase().replace(/[^a-z0-9_]/g, ""))} placeholder="yourusername" />
      <Field label="Creator category" value={category} onChange={setCategory} placeholder="Gaming, art, music, education..." />
      <Textarea label="Audience summary" value={audienceSummary} onChange={setAudienceSummary} placeholder="Describe your audience and what they will follow you for." />
      <Textarea label="Content plan" value={planSummary} onChange={setPlanSummary} placeholder="Explain what you plan to post first." />
      {message ? <p className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-100">{message}</p> : null}
      {error ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}
      <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? "Submitting..." : "Submit application"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white">{label}</span>
      <input className="mt-2 w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required />
    </label>
  );
}

function Textarea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white">{label}</span>
      <textarea className="mt-2 min-h-32 w-full resize-none rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required />
    </label>
  );
}
