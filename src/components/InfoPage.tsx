import type { ReactNode } from "react";
import { Badge } from "@/components/Badge";
import { Card, SectionHeader } from "@/components/Card";
import { Shell } from "@/components/Shell";

export function InfoPage({ active = "/support", eyebrow, title, description, children, cards = [] }: { active?: string; eyebrow?: string; title: string; description: string; children?: ReactNode; cards?: Array<{ title: string; body: string; badge?: string }> }) {
  return (
    <Shell active={active}>
      <div className="space-y-6 pb-24">
        <section className="rounded-[2.5rem] border border-blue-400/20 bg-blue-500/10 p-8">
          {eyebrow ? <Badge>{eyebrow}</Badge> : null}
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">{description}</p>
        </section>
        {cards.length ? (
          <section>
            <SectionHeader title="What is included" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
                <Card key={card.title}>
                  {/* Removed badge display for guideline cards to reduce visual clutter */}
                  <h3 className="mt-4 text-lg font-black text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{card.body}</p>
                </Card>
              ))}
            </div>
          </section>
        ) : null}
        {children}
      </div>
    </Shell>
  );
}
