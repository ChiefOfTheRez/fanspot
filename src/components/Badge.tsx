import type { ReactNode } from "react";
import { cx } from "@/lib/format";

export function Badge({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "green" | "yellow" | "red" | "gray" }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold",
        tone === "blue" && "border-blue-400/30 bg-blue-500/10 text-blue-200",
        tone === "green" && "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
        tone === "yellow" && "border-amber-400/30 bg-amber-500/10 text-amber-200",
        tone === "red" && "border-rose-400/30 bg-rose-500/10 text-rose-200",
        tone === "gray" && "border-slate-700 bg-slate-900 text-slate-300"
      )}
    >
      {children}
    </span>
  );
}
