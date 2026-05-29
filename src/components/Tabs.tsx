import Link from "next/link";
import { cx } from "@/lib/format";

export function Tabs({ tabs, active }: { tabs: Array<{ label: string; href: string }>; active: string }) {
  return (
    <div className="flex gap-2 overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/70 p-2">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cx(
            "whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-bold transition",
            active === tab.href ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
