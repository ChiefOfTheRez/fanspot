"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOutButton({ compact = false }: { compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => void signOut({ callbackUrl: "/" })}
      className={compact ? "grid place-items-center rounded-2xl p-2 text-slate-400 hover:bg-white/5 hover:text-white" : "inline-flex items-center gap-2 rounded-2xl border border-slate-800 px-4 py-3 text-sm font-bold text-slate-200 hover:bg-white/5"}
      aria-label="Log out"
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      {compact ? null : "Log out"}
    </button>
  );
}
