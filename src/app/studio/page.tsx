import Link from "next/link";
import { BarChart3, CheckCircle2, ClipboardList, DollarSign, Image as ImageIcon, Users } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card, SectionHeader } from "@/components/Card";
import { MetricCard } from "@/components/MetricCard";
import { PostComposer } from "@/components/PostComposer";
import { RevenuePanel } from "@/components/RevenuePanel";
import { Shell } from "@/components/Shell";
import { studioMetrics } from "@/lib/mock-data";

const actions = [
  { href: "/studio/posts", icon: ClipboardList, title: "Manage posts", text: "Draft, schedule, review, and publish updates." },
  { href: "/studio/audience", icon: Users, title: "Audience", text: "Track followers, supporters, and engagement." },
  { href: "/studio/earnings", icon: DollarSign, title: "Earnings", text: "Track balances, payouts, and ledger activity." },
  { href: "/creator/apply", icon: CheckCircle2, title: "Application", text: "Creator review and onboarding checklist." }
];

export default function StudioPage() {
  return (
    <Shell active="/studio">
      <div className="space-y-6 pb-24">
        <SectionHeader eyebrow="Creator studio" title="Creator dashboard" description="A creator control center for posts, audience growth, onboarding, earnings, and profile quality." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {studioMetrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <PostComposer />
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">Profile quality checklist</h2>
                  <p className="mt-1 text-sm text-slate-400">Creators should finish this before applications are approved.</p>
                </div>
                <Badge tone="yellow">72%</Badge>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  "Add profile photo",
                  "Add banner image",
                  "Write creator intro",
                  "Create first three posts",
                  "Review community rules",
                  "Set payout details"
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-white/5 p-3 text-sm text-slate-300">
                    <CheckCircle2 className={index < 4 ? "h-4 w-4 text-blue-300" : "h-4 w-4 text-slate-600"} /> {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <RevenuePanel />
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <Card className="transition hover:border-blue-500 hover:bg-blue-600/10">
                    <div className="flex gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600/20 text-blue-200"><Icon className="h-5 w-5" /></div>
                      <div>
                        <h3 className="font-black text-white">{action.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{action.text}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
            <Card>
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-blue-600/20 text-blue-200"><ImageIcon className="h-5 w-5" aria-hidden="true" /></div>
              <h3 className="font-black text-white">Media uploads</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Uploads are intentionally disabled until S3, file validation, scanning, and moderation are connected.</p>
            </Card>
            <Card>
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-blue-600/20 text-blue-200"><BarChart3 className="h-5 w-5" /></div>
              <h3 className="font-black text-white">Growth hint</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Founding creators should post consistently before subscriptions go live.</p>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  );
}
