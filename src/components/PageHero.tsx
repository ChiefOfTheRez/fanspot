import type { ReactNode } from "react";
import { cx } from "@/lib/format";

export function PageHero({ eyebrow, title, description, children, className }: { eyebrow?: string; title: string; description?: string; children?: ReactNode; className?: string }) {
  void eyebrow;
  return (
    <section className={cx("overflow-hidden rounded-[2rem] border border-slate-800 bg-[radial-gradient(circle_at_top_right,rgba(30,107,255,0.18),transparent_34%),rgba(15,23,42,0.74)] p-6 md:p-8", className)}>
      <h1 className="max-w-3xl text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h1>
      {description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">{description}</p> : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
