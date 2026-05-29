"use client";

import { FormEvent, useMemo, useState } from "react";
import { profileThemes } from "@/lib/profile-themes";

type CreatorSettingsInput = {
  displayName: string;
  username: string;
  bio?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  headline: string;
  category: string;
  intro: string;
  themePreset: string;
  backgroundUrl?: string | null;
  backgroundBlur: number;
  avatarMode: string;
  bannerMode: string;
  badgeText?: string | null;
  profileAccentColor: string;
  pinnedPostId?: string | null;
  highlightedTierId?: string | null;
};

type SelectItem = { id: string; label: string };

export function StudioSettingsForm({ initial, posts, tiers }: { initial: CreatorSettingsInput; posts: SelectItem[]; tiers: SelectItem[] }) {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const selectedTheme = useMemo(() => profileThemes.find((theme) => theme.key === form.themePreset) ?? profileThemes[0], [form.themePreset]);

  function update<K extends keyof CreatorSettingsInput>(key: K, value: CreatorSettingsInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function readFile(key: "avatarUrl" | "bannerUrl" | "backgroundUrl", file?: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update(key, String(reader.result));
    reader.readAsDataURL(file);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    const response = await fetch("/api/profile/customization", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const payload = await response.json().catch(() => null);
    setLoading(false);
    if (!response.ok) {
      setError(payload?.error || "Could not save profile settings.");
      return;
    }
    setMessage("Profile settings saved.");
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <div className="overflow-hidden rounded-[2rem] border border-slate-800">
        <div className={`relative min-h-64 bg-gradient-to-br ${selectedTheme.backgroundClass}`}>
          {form.backgroundUrl ? <img src={form.backgroundUrl} alt="Profile background preview" className="absolute inset-0 h-full w-full object-cover opacity-45" style={{ filter: `blur(${form.backgroundBlur}px)` }} /> : null}
          {form.bannerUrl ? <img src={form.bannerUrl} alt="Profile banner preview" className="absolute left-6 right-6 top-6 h-32 w-[calc(100%-3rem)] rounded-[1.5rem] object-cover opacity-90" /> : null}
          <div className="relative z-10 flex min-h-64 items-end gap-4 p-6">
            <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-[1.75rem] border-4 border-slate-950 bg-slate-900 text-2xl font-black text-white">
              {form.avatarUrl ? <img src={form.avatarUrl} alt="Profile avatar preview" className="h-full w-full object-cover" /> : form.displayName.slice(0, 2).toUpperCase()}
            </div>
            <div className={`rounded-[1.5rem] border p-4 ${selectedTheme.panelClass}`}>
              <h2 className="text-2xl font-black text-white">{form.displayName || "Creator name"}</h2>
              <p className="text-sm text-slate-300">@{form.username || "username"} · {form.category || "Category"}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-white">
                {(form.badgeText || "Verified Creator,Founding Member").split(",").filter(Boolean).slice(0, 4).map((badge) => <span key={badge} className="rounded-full bg-white/10 px-3 py-1">{badge.trim()}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Field label="Display name" value={form.displayName} onChange={(value) => update("displayName", value)} />
        <Field label="Username" value={form.username} onChange={(value) => update("username", value.toLowerCase().replace(/[^a-z0-9_]/g, ""))} />
        <Field label="Headline" value={form.headline} onChange={(value) => update("headline", value)} />
        <Field label="Category" value={form.category} onChange={(value) => update("category", value)} />
      </section>

      <Textarea label="Profile bio" value={form.bio ?? ""} onChange={(value) => update("bio", value)} />
      <Textarea label="Creator intro" value={form.intro} onChange={(value) => update("intro", value)} />

      <section className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="text-sm font-bold text-white">Preset theme</span>
          <select className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" value={form.themePreset} onChange={(event) => update("themePreset", event.target.value)}>
            {profileThemes.map((theme) => <option key={theme.key} value={theme.key}>{theme.name}</option>)}
          </select>
          <span className="mt-2 block text-xs text-slate-500">{selectedTheme.description}</span>
        </label>
        <label className="block">
          <span className="text-sm font-bold text-white">Avatar mode</span>
          <select className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" value={form.avatarMode} onChange={(event) => update("avatarMode", event.target.value)}>
            <option value="STATIC">Static image</option>
            <option value="ANIMATED">Animated image</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-bold text-white">Banner mode</span>
          <select className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" value={form.bannerMode} onChange={(event) => update("bannerMode", event.target.value)}>
            <option value="STATIC">Static banner</option>
            <option value="ANIMATED">Animated banner</option>
          </select>
        </label>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <UploadField label="Profile picture" onChange={(file) => readFile("avatarUrl", file)} />
        <UploadField label="Banner image" onChange={(file) => readFile("bannerUrl", file)} />
        <UploadField label="Blurred background" onChange={(file) => readFile("backgroundUrl", file)} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Field label="Badges, comma separated" value={form.badgeText ?? ""} onChange={(value) => update("badgeText", value)} placeholder="Verified Creator, Founding Member" />
        <label className="block">
          <span className="text-sm font-bold text-white">Background blur</span>
          <input type="range" min="0" max="32" value={form.backgroundBlur} onChange={(event) => update("backgroundBlur", Number(event.target.value))} className="mt-4 w-full" />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-white">Pinned post</span>
          <select className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" value={form.pinnedPostId ?? ""} onChange={(event) => update("pinnedPostId", event.target.value || null)}>
            <option value="">None</option>
            {posts.map((post) => <option key={post.id} value={post.id}>{post.label}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-bold text-white">Highlighted tier</span>
          <select className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" value={form.highlightedTierId ?? ""} onChange={(event) => update("highlightedTierId", event.target.value || null)}>
            <option value="">None</option>
            {tiers.map((tier) => <option key={tier.id} value={tier.id}>{tier.label}</option>)}
          </select>
        </label>
      </section>

      {message ? <p className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-100">{message}</p> : null}
      {error ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}
      <button disabled={loading} className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Saving..." : "Save creator settings"}</button>
    </form>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500" />
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-28 w-full resize-none rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500" />
    </label>
  );
}

function UploadField({ label, onChange }: { label: string; onChange: (file?: File | null) => void }) {
  return (
    <label className="block rounded-2xl border border-slate-800 bg-white/5 p-4 text-sm font-bold text-white hover:border-blue-500">
      {label}
      <input type="file" accept="image/*" onChange={(event) => onChange(event.target.files?.[0])} className="mt-3 block w-full text-xs text-slate-400 file:mr-3 file:rounded-xl file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-xs file:font-bold file:text-white" />
    </label>
  );
}
