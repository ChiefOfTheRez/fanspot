"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, CheckCircle2, DollarSign, Star, X } from "lucide-react";

const supportTiers = [
  { name: "Bronze", price: "$4.99/mo", description: "Follow updates and support the creator." },
  { name: "Silver", price: "$9.99/mo", description: "Unlock supporter posts and creator updates." },
  { name: "Diamond", price: "$19.99/mo", description: "Priority updates and premium community benefits." }
];

function readNumber(key: string, fallback: number) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? Number(raw) || fallback : fallback;
  } catch {
    return fallback;
  }
}

export default function CreatorActions({ username }: { username: string }) {
  const followKey = `fanspot-followed-${username}`;
  const supportKey = `fanspot-supported-${username}`;
  const tierKey = `fanspot-support-tier-${username}`;
  const tipsKey = `fanspot-tip-total-${username}`;
  const [followed, setFollowed] = useState(false);
  const [supported, setSupported] = useState(false);
  const [selectedTier, setSelectedTier] = useState("");
  const [supportOpen, setSupportOpen] = useState(false);
  const [tipAmount, setTipAmount] = useState("5");
  const [tipTotal, setTipTotal] = useState(0);
  const [notice, setNotice] = useState("");

  const tipGoal = 250;
  const progress = useMemo(() => Math.min(100, Math.round((tipTotal / tipGoal) * 100)), [tipTotal]);

  useEffect(() => {
    try {
      setFollowed(localStorage.getItem(followKey) === "true");
      setSupported(localStorage.getItem(supportKey) === "true");
      setSelectedTier(localStorage.getItem(tierKey) ?? "");
      setTipTotal(readNumber(tipsKey, 80));
    } catch {
      // Ignore storage errors.
    }
  }, [followKey, supportKey, tierKey, tipsKey]);

  function toggleFollow() {
    const next = !followed;
    setFollowed(next);
    try {
      if (next) localStorage.setItem(followKey, "true");
      else localStorage.removeItem(followKey);
    } catch {
      // Ignore storage errors.
    }
  }

  function subscribe(tierName: string) {
    setSelectedTier(tierName);
    setSupported(true);
    setNotice(`Subscribed to ${tierName}. Payment processor is simulated for this test build.`);
    try {
      localStorage.setItem(supportKey, "true");
      localStorage.setItem(tierKey, tierName);
    } catch {
      // Ignore storage errors.
    }
  }

  function sendTip() {
    const amount = Number(tipAmount);
    if (!amount || amount <= 0) {
      setNotice("Enter a valid tip amount.");
      return;
    }
    const next = tipTotal + amount;
    setTipTotal(next);
    setNotice(`Tip sent: $${amount.toFixed(2)}. Payment processor is simulated for this test build.`);
    try {
      localStorage.setItem(tipsKey, String(next));
    } catch {
      // Ignore storage errors.
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={toggleFollow}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold ${followed ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-500" : "border-slate-700 text-white hover:bg-white/5"}`}
        >
          <Bell className="h-4 w-4" aria-hidden="true" /> {followed ? "Following" : "Follow"}
        </button>
        <button
          onClick={() => setSupportOpen(true)}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${supported ? "bg-green-600 text-white hover:bg-green-500" : "bg-blue-600 text-white hover:bg-blue-500"}`}
        >
          <Star className="h-4 w-4" aria-hidden="true" /> {supported ? "Manage support" : "Support"}
        </button>
      </div>

      {supportOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-2xl rounded-[2rem] border border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-black/60">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">Support @{username}</h2>
                <p className="mt-2 text-sm text-slate-400">Choose a membership tier or send a one-time tip.</p>
              </div>
              <button onClick={() => setSupportOpen(false)} className="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white"><X className="h-5 w-5" /></button>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {supportTiers.map((tier) => (
                <button key={tier.name} onClick={() => subscribe(tier.name)} className={`rounded-2xl border p-4 text-left transition ${selectedTier === tier.name ? "border-green-500 bg-green-500/10" : "border-slate-800 bg-white/[0.03] hover:border-blue-500"}`}>
                  <p className="font-black text-white">{tier.name}</p>
                  <p className="mt-1 text-xl font-black text-blue-200">{tier.price}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{tier.description}</p>
                  {selectedTier === tier.name ? <p className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-green-200"><CheckCircle2 className="h-3 w-3" /> Active</p> : null}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-black text-white">Tip jar goal</h3>
                  <p className="mt-1 text-sm text-slate-400">Help fund the next creator drop. Goal: ${tipGoal}.</p>
                </div>
                <p className="text-sm font-black text-blue-200">${tipTotal} / ${tipGoal}</p>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-4 flex gap-2">
                <label className="relative min-w-0 flex-1">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input value={tipAmount} onChange={(event) => setTipAmount(event.target.value)} className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-3 pl-9 pr-4 text-sm text-white outline-none focus:border-blue-500" />
                </label>
                <button onClick={sendTip} className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-500">Send tip</button>
              </div>
            </div>

            {notice ? <p className="mt-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">{notice}</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
