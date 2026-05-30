"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, MessageCircle, Sparkles, Star } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";

type TierOption = {
  id: string;
  name: string;
  priceCents: number;
  description: string;
};

type CreatorSupportActionsProps = {
  username: string;
  displayName: string;
  tiers: TierOption[];
};

export function CreatorSupportActions({ username, displayName, tiers }: CreatorSupportActionsProps) {
  const followKey = `fanspot-followed-${username}`;
  const supportKey = `fanspot-supported-${username}`;
  const tipKey = `fanspot-tip-jar-${username}`;
  const goal = 50;

  const [followed, setFollowed] = useState(false);
  const [supported, setSupported] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [raised, setRaised] = useState(0);
  const [confetti, setConfetti] = useState(false);

  const tierOptions = useMemo(() => tiers.length ? tiers : [
    { id: "free", name: "Free follow", priceCents: 0, description: "Follow public updates." },
    { id: "supporter", name: "Supporter", priceCents: 999, description: "Monthly supporter posts and early previews." },
    { id: "core", name: "Core fan", priceCents: 1999, description: "Behind-the-scenes notes and priority updates." }
  ], [tiers]);

  useEffect(() => {
    try {
      setFollowed(localStorage.getItem(followKey) === "true");
      setSupported(localStorage.getItem(supportKey) === "true");
      const storedTip = localStorage.getItem(tipKey);
      if (storedTip) setRaised(Number(JSON.parse(storedTip).raised ?? 0));
    } catch {
      setFollowed(false);
      setSupported(false);
      setRaised(0);
    }
  }, [followKey, supportKey, tipKey]);

  function saveRaised(nextRaised: number) {
    setRaised(nextRaised);
    try {
      localStorage.setItem(tipKey, JSON.stringify({ goal, raised: nextRaised }));
    } catch {
      // localStorage can fail in private mode; UI still updates for this session.
    }

    if (raised < goal && nextRaised >= goal) {
      setConfetti(true);
      window.setTimeout(() => setConfetti(false), 3200);
    }
  }

  function toggleFollow() {
    const next = !followed;
    setFollowed(next);
    try {
      if (next) localStorage.setItem(followKey, "true");
      else localStorage.removeItem(followKey);
    } catch {
      // ignore
    }
  }

  function supportTier(priceCents: number) {
    const donation = priceCents > 0 ? priceCents / 100 : 5;
    setSupported(true);
    try {
      localStorage.setItem(supportKey, "true");
    } catch {
      // ignore
    }
    saveRaised(raised + donation);
    setModalOpen(false);
  }

  const percent = Math.min((raised / goal) * 100, 100);

  return (
    <div className="space-y-3">
      {confetti ? (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/20 text-6xl">
          <div className="animate-pulse rounded-[2rem] border border-green-400/50 bg-slate-950/90 px-6 py-5 text-center shadow-2xl">
            <div>🎉🎊✨</div>
            <p className="mt-3 text-base font-black text-white">Tip goal reached!</p>
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={toggleFollow}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold ${followed ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-500" : "border-slate-700 text-white hover:bg-white/5"}`}
        >
          <Bell className="h-4 w-4" aria-hidden="true" /> {followed ? "Following" : "Follow"}
        </button>
        <button
          onClick={() => setModalOpen(true)}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${supported ? "bg-green-600 text-white hover:bg-green-500" : "bg-blue-600 text-white hover:bg-blue-500"}`}
        >
          <Star className="h-4 w-4" aria-hidden="true" /> {supported ? "Supporting" : "Support"}
        </button>
      </div>

      <ButtonLink href={`/messages?creator=${username}`} variant="secondary"><MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Message</ButtonLink>

      <div className="rounded-2xl border border-slate-800 bg-white/[0.03] p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-black text-white">Tip jar</h3>
          <p className="text-xs font-bold text-slate-400">${raised.toFixed(2)} / ${goal.toFixed(2)}</p>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-400">Goal: fund the next creator drop.</p>
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-[2rem] border border-slate-800 bg-slate-950 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-200">Support</p>
                <h2 className="mt-2 text-2xl font-black text-white">Support {displayName}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">Choose a tier or make a one-time support donation.</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="rounded-2xl border border-slate-800 px-3 py-2 text-sm font-black text-white hover:bg-white/5">×</button>
            </div>

            <div className="mt-5 space-y-3">
              {tierOptions.map((tier) => (
                <div key={tier.id} className="rounded-2xl border border-slate-800 bg-white/[0.03] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-black text-white">{tier.name}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{tier.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-white">{tier.priceCents === 0 ? "Free" : `$${(tier.priceCents / 100).toFixed(2)}`}</p>
                      <button onClick={() => supportTier(tier.priceCents)} className="mt-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-black text-white hover:bg-blue-500">
                        {tier.priceCents === 0 ? "Follow" : "Donate"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={() => supportTier(500)} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm font-black text-green-100 hover:bg-green-500/20">
                <Sparkles className="h-4 w-4" aria-hidden="true" /> One-time $5 tip
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
