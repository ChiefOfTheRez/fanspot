import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/Badge";
import { ButtonLink } from "@/components/ButtonLink";
import { Card, SectionHeader } from "@/components/Card";
import { Logo } from "@/components/Logo";

const creatorTiers = [
  {
    name: "Bronze",
    split: "80 / 20",
    creatorShare: "80% creator share",
    platformShare: "20% platform share",
    benefits: ["Text and image posts", "Public and follower posts", "Basic creator profile", "Manual weekly payouts", "No video uploads"]
  },
  {
    name: "Silver",
    split: "82.5 / 17.5",
    creatorShare: "82.5% creator share",
    platformShare: "17.5% platform share",
    benefits: ["Everything in Bronze", "Video uploads when media systems are enabled", "Profile badges", "Highlighted creator tiers", "Priority application review"]
  },
  {
    name: "Platinum",
    split: "85 / 15",
    creatorShare: "85% creator share",
    platformShare: "15% platform share",
    benefits: ["Everything in Silver", "Advanced profile customization", "Pinned posts", "Audience insights", "Higher discovery priority"]
  },
  {
    name: "Diamond",
    split: "90 / 10",
    creatorShare: "90% creator share",
    platformShare: "10% platform share",
    benefits: ["Everything in Platinum", "Premium profile themes", "Launch-feature access", "Lower platform share", "Top-tier creator status"]
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-fan-black px-5 py-6 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between"><Logo /><ButtonLink href="/signup">Create account</ButtonLink></header>
        <section className="py-14">
          <Badge>Pricing</Badge>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight md:text-6xl">Simple creator tiers with clear platform splits.</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">FanSpot’s creator rank system starts stricter to protect quality, then rewards consistent approved creators with better platform splits and more tools.</p>
        </section>
        <section className="grid gap-4 lg:grid-cols-4">
          {creatorTiers.map((tier) => (
            <Card key={tier.name} className={tier.name === "Silver" ? "border-blue-500 bg-blue-600/10" : undefined}>
              {tier.name === "Silver" ? <Badge tone="blue">Founding creator start</Badge> : null}
              <h2 className="mt-4 text-2xl font-black text-white">{tier.name}</h2>
              <p className="mt-3 text-3xl font-black text-white">{tier.split}</p>
              <p className="mt-1 text-sm text-slate-400">{tier.creatorShare} · {tier.platformShare}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {tier.benefits.map((benefit) => <li key={benefit} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" aria-hidden="true" /> {benefit}</li>)}
              </ul>
            </Card>
          ))}
        </section>
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <Card><h3 className="font-black text-white">Fan accounts</h3><p className="mt-2 text-sm leading-6 text-slate-400">Fans can create accounts for free, follow creators, comment on accessible posts, and subscribe once payment processing is enabled.</p></Card>
          <Card><h3 className="font-black text-white">Creator applications</h3><p className="mt-2 text-sm leading-6 text-slate-400">Creator tools unlock after application review. Fans do not receive posting or wallet privileges by default.</p></Card>
          <Card><h3 className="font-black text-white">Payments</h3><p className="mt-2 text-sm leading-6 text-slate-400">Paid subscriptions, chargeback reserves, and payout rules should be connected to the approved payment processor before public monetization.</p></Card>
        </section>
        <SectionHeader title="Ready to join?" description="Create a fan account now, or apply for creator tools after verifying your email." />
        <div className="flex gap-3"><ButtonLink href="/signup">Create account</ButtonLink><Link href="/creator/apply" className="rounded-2xl border border-slate-800 px-5 py-3 text-sm font-black text-white hover:bg-white/5">Apply as creator</Link></div>
      </div>
    </main>
  );
}
