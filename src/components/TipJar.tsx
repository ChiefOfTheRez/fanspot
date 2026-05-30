"use client";

import { useEffect, useState } from "react";

export function TipJar({ username, goal = 50 }: { username: string; goal?: number }) {
  const storageKey = `fanspot-tip-jar-${username}`;
  const [raised, setRaised] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setRaised(Number(JSON.parse(stored).raised ?? 0));
    } catch {
      setRaised(0);
    }
  }, [storageKey]);

  const percent = Math.min((raised / goal) * 100, 100);

  return (
    <div className="rounded-2xl border border-slate-800 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-black text-white">Tip jar</h3>
        <p className="text-xs font-bold text-slate-400">${raised.toFixed(2)} / ${goal.toFixed(2)}</p>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-400">Creator goal progress updates when fans support or donate.</p>
    </div>
  );
}
