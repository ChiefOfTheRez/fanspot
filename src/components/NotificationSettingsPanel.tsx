"use client";

import { FormEvent, useEffect, useState } from "react";

type NotificationSettingsPanelProps = {
  userId: string;
};

const notificationOptions = [
  { key: "creatorUpdates", label: "Creator updates" },
  { key: "messages", label: "Messages" },
  { key: "supportReplies", label: "Support replies" },
  { key: "accountWarnings", label: "Account warnings" }
] as const;

type Preferences = Record<(typeof notificationOptions)[number]["key"], boolean>;

const defaultPreferences: Preferences = {
  creatorUpdates: true,
  messages: true,
  supportReplies: true,
  accountWarnings: true
};

export function NotificationSettingsPanel({ userId }: NotificationSettingsPanelProps) {
  const storageKey = `fanspot-alert-preferences-${userId}`;
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setPreferences({ ...defaultPreferences, ...JSON.parse(stored) });
    } catch {
      setPreferences(defaultPreferences);
    }
  }, [storageKey]);

  function toggle(key: keyof Preferences) {
    setSaved(false);
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-4">
      <div>
        <h2 className="text-lg font-black text-white">Alerts</h2>
        <p className="mt-1 text-sm leading-6 text-slate-400">Choose which alert categories this account receives.</p>
      </div>

      <div className="space-y-2">
        {notificationOptions.map((option) => (
          <label key={option.key} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-white/[0.03] px-4 py-3 text-sm font-bold text-slate-200">
            <span>{option.label}</span>
            <input type="checkbox" checked={preferences[option.key]} onChange={() => toggle(option.key)} className="h-4 w-4" />
          </label>
        ))}
      </div>

      <button type="submit" className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-500">Save alert settings</button>
      {saved ? <p className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-100">Alert preferences saved.</p> : null}
    </form>
  );
}
