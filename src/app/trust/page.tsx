import { Lock, Scale, ShieldCheck } from "lucide-react";
import { ActionCard } from "@/components/ActionCard";
import { Card, SectionHeader } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";

export default function TrustPage() {
  return (
    <Shell active="/settings">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Trust center" title="Safety, privacy, and platform rules" description="A trust-center section for policies, moderation transparency, data handling, and compliance documentation." />
        <div className="grid gap-4 md:grid-cols-3"><ActionCard title="Safety" text="Moderation queues, reporting, enforcement, and blocked-user controls." href="/safety" icon={ShieldCheck} /><ActionCard title="Privacy" text="Data controls, privacy notices, and account deletion flows." href="/privacy" icon={Lock} /><ActionCard title="Terms" text="Platform rules, creator responsibilities, and acceptable-use terms." href="/terms" icon={Scale} /></div>
        <Card><SectionHeader title="Pre-launch requirements" description="Before any public launch, finish legal review, tax/payment obligations, processor approval, moderation staffing, incident response, and backup/restore testing." /></Card>
      </div>
    </Shell>
  );
}
