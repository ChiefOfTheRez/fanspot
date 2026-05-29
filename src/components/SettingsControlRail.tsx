"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Bell, CreditCard, Lock, Palette, ShieldCheck } from "lucide-react";
import { Card } from "@/components/Card";
import { readJson, scopedKey, useAccountStoragePrefix, writeJson } from "@/lib/account-storage";

type SettingState = {
  emailAlerts: boolean;
  creatorUpdates: boolean;
  compactCards: boolean;
  blockedUsers: string[];
  paymentMethod: string;
  sessionReviewedAt?: string;
};

const defaultState: SettingState = {
  emailAlerts: true,
  creatorUpdates: true,
  compactCards: false,
  blockedUsers: [],
  paymentMethod: "No saved payment method yet"
};

export function SettingsControlRail() {
  const accountPrefix = useAccountStoragePrefix();
  const settingsKey = scopedKey(accountPrefix, "settings-controls");
  const reportsKey = scopedKey(accountPrefix, "post-reports");
  const [state, setState] = useState<SettingState>(defaultState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setState(readJson<SettingState>(settingsKey, defaultState));
    setMessage("");
  }, [settingsKey]);

  function save(next: SettingState, msg: string) {
    setState(next);
    writeJson(settingsKey, next);
    setMessage(msg);
  }

  function toggle(key: keyof Pick<SettingState, "emailAlerts" | "creatorUpdates" | "compactCards">, label: string) {
    const next = { ...state, [key]: !state[key] };
    save(next, `${label} ${next[key] ? "enabled" : "disabled"}.`);
  }

  function reviewSession() {
    save({ ...state, sessionReviewedAt: new Date().toLocaleString() }, "Current session marked as reviewed.");
  }

  function addPaymentMethod() {
    save({ ...state, paymentMethod: "Visa ending in 4242 (test mode)" }, "Test payment method saved.");
  }

  const reports = readJson<Array<{ id: string; reason: string; createdAt: string }>>(reportsKey, []);

  return (
    <div className="space-y-5">
      <Card>
        <h2 className="text-xl font-black text-white">Profile controls</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">These controls are now on the right side and are saved separately for this account.</p>
        {message ? <p className="mt-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">{message}</p> : null}
      </Card>

      <ControlCard icon={<Lock className="h-5 w-5" />} title="Security" text="Password login is active. Review your current test session or start a password update flow.">
        <button onClick={() => setMessage("Password change flow is ready for backend wiring. Current password authentication is active.")} className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:border-blue-500 hover:text-white">Change password</button>
        <button onClick={reviewSession} className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:border-blue-500 hover:text-white">Review sessions</button>
        {state.sessionReviewedAt ? <p className="mt-3 text-xs text-slate-500">Last reviewed: {state.sessionReviewedAt}</p> : null}
      </ControlCard>

      <ControlCard icon={<Bell className="h-5 w-5" />} title="Alerts" text="Choose which account alerts and creator updates you want to receive.">
        <button onClick={() => toggle("emailAlerts", "Email alerts")} className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:border-blue-500 hover:text-white">Email alerts: {state.emailAlerts ? "On" : "Off"}</button>
        <button onClick={() => toggle("creatorUpdates", "Creator updates")} className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:border-blue-500 hover:text-white">Creator updates: {state.creatorUpdates ? "On" : "Off"}</button>
      </ControlCard>

      <ControlCard icon={<CreditCard className="h-5 w-5" />} title="Billing" text="Manage simulated payment methods and spending history for this test account.">
        <button onClick={addPaymentMethod} className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:border-blue-500 hover:text-white">Payment methods</button>
        <button onClick={() => setMessage(`Spending history: ${state.paymentMethod}. No live charges in this test environment.`)} className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:border-blue-500 hover:text-white">Spending history</button>
        <p className="mt-3 text-xs text-slate-500">{state.paymentMethod}</p>
      </ControlCard>

      <ControlCard icon={<Palette className="h-5 w-5" />} title="Appearance" text="Save appearance preferences for this account.">
        <button onClick={() => setMessage("Dark theme is already active for the MVP.")} className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:border-blue-500 hover:text-white">Dark theme</button>
        <button onClick={() => toggle("compactCards", "Compact cards")} className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:border-blue-500 hover:text-white">Compact cards: {state.compactCards ? "On" : "Off"}</button>
      </ControlCard>

      <ControlCard icon={<ShieldCheck className="h-5 w-5" />} title="Safety" text="Review blocked users and reports submitted from this account.">
        <button onClick={() => setMessage(state.blockedUsers.length ? `Blocked users: ${state.blockedUsers.join(", ")}` : "No blocked users yet.")} className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:border-blue-500 hover:text-white">Blocked users</button>
        <button onClick={() => setMessage(reports.length ? `${reports.length} report(s) saved for this account.` : "No report history yet.")} className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:border-blue-500 hover:text-white">Report history</button>
      </ControlCard>
    </div>
  );
}

function ControlCard({ icon, title, text, children }: { icon: ReactNode; title: string; text: string; children: ReactNode }) {
  return (
    <Card>
      <div className="flex gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-600/20 text-blue-200">{icon}</div>
        <div className="min-w-0">
          <h3 className="font-black text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
          <div className="mt-4 flex flex-wrap gap-2">{children}</div>
        </div>
      </div>
    </Card>
  );
}
