import type { ReactNode } from "react";
import { cx } from "@/lib/format";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("rounded-[2rem] border border-slate-800 bg-slate-950/70 p-6 shadow-2xl shadow-black/20", className)}>
      {children}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mb-6">
      {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-blue-300">{eyebrow}</p> : null}
      <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{description}</p> : null}
    </div>
  );
}
