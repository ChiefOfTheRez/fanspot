import Link from "next/link";
import { AlertTriangle, FileCheck2, ShieldCheck, UserCheck } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Card, SectionHeader } from "@/components/Card";
import { Logo } from "@/components/Logo";

const items = [
  { icon: ShieldCheck, title: "Community guidelines", text: "Clear rules for what belongs on FanSpot and what gets removed.", href: "/legal/community-guidelines" },
  { icon: AlertTriangle, title: "Report a problem", text: "Report spam, impersonation, harassment, unsafe content, payment issues, or copyright concerns.", href: "/support" },
  { icon: UserCheck, title: "Creator applications", text: "Creators are reviewed before publishing tools, wallet tools, and profile monetization are enabled.", href: "/creator/apply" },
  { icon: FileCheck2, title: "Trust center", text: "Learn how FanSpot handles safety workflows, account controls, and platform accountability.", href: "/trust" }
];

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-fan-black px-5 py-6 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between"><Logo /><ButtonLink href="/feed">Open FanSpot</ButtonLink></header>
        <section className="py-16">
          <SectionHeader eyebrow="Safety" title="FanSpot safety center" description="Safety pages are now connected to real destinations for guidelines, reporting, creator review, and trust information." />
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.href}>
                  <Card className="h-full transition hover:border-blue-500 hover:bg-blue-600/10">
                    <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-blue-600/20 text-blue-200"><Icon className="h-5 w-5" aria-hidden="true" /></div>
                    <h2 className="font-black text-white">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                    <p className="mt-4 text-sm font-bold text-blue-300">Open →</p>
                  </Card>
                </Link>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-slate-500">Before public monetization, policies, terms, privacy, moderation rules, and payment workflows should be reviewed by qualified professionals.</p>
          <Link href="/" className="mt-8 inline-flex text-sm font-bold text-blue-300 hover:text-white">← Back home</Link>
        </section>
      </div>
    </main>
  );
}
