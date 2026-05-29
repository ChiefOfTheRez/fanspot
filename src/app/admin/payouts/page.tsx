import { AlertTriangle, Banknote, CheckCircle2, Clock } from "lucide-react";
import { Card, SectionHeader } from "@/components/Card";
import { MetricCard } from "@/components/MetricCard";
import { Shell } from "@/components/Shell";

export default function AdminPayoutsPage() {
  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <SectionHeader eyebrow="Admin" title="Payout review" description="Review creator payout batches, holds, adjustments, and payment status." />
        <Card className="border-amber-400/30 bg-amber-500/10">
          <div className="flex gap-3"><AlertTriangle className="h-5 w-5 text-amber-200" /><p className="text-sm leading-6 text-amber-100">Do not enable payouts until identity, tax, fraud, ledger, refunds, and chargeback workflows are fully designed and reviewed.</p></div>
        </Card>
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Draft batches" value="1" change="manual" />
          <MetricCard label="Creators payable" value="0" change="disabled" />
          <MetricCard label="Held balance" value="$0.00" change="future" />
          <MetricCard label="Issues" value="0" change="future" />
        </div>
        <Card>
          <h2 className="text-xl font-black text-white">Payout batch steps</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Step icon={<Clock />} title="Draft" text="Pull eligible ledger entries." />
            <Step icon={<CheckCircle2 />} title="Review" text="Admin checks risk, refunds, and disputes." />
            <Step icon={<Banknote />} title="Pay" text="Send manually first, then record result." />
          </div>
        </Card>
      </div>
    </Shell>
  );
}

function Step({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="rounded-3xl border border-slate-800 bg-white/5 p-5"><div className="text-blue-300">{icon}</div><h3 className="mt-3 font-black text-white">{title}</h3><p className="mt-2 text-sm text-slate-400">{text}</p></div>;
}
