import { AlertTriangle, Banknote, Clock, FileText } from "lucide-react";
import { Card, SectionHeader } from "@/components/Card";
import { MetricCard } from "@/components/MetricCard";
import { Shell } from "@/components/Shell";

export default function EarningsPage() {
  return (
    <Shell active="/studio">
      <div className="space-y-5 pb-24">
        <SectionHeader eyebrow="Studio" title="Earnings and payouts" description="Section for future payment processor events, creator ledger entries, holds, and weekly payouts." />
        <Card className="border-amber-400/30 bg-amber-500/10">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-200" />
            <p className="text-sm leading-6 text-amber-100">Earnings become available after payments, account eligibility, review holds, and payout settings are complete.</p>
          </div>
        </Card>
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Available" value="$0.00" change="disabled" />
          <MetricCard label="Pending hold" value="$0.00" change="risk window" />
          <MetricCard label="Next payout" value="Manual" change="weekly future" />
          <MetricCard label="Chargebacks" value="0" change="track soon" />
        </div>
        <Card>
          <h2 className="text-xl font-black text-white">Future ledger timeline</h2>
          <div className="mt-5 space-y-3">
            {[
              { icon: FileText, text: "Payment webhook records event" },
              { icon: Clock, text: "Funds enter pending hold" },
              { icon: Banknote, text: "Admin approves weekly payout batch" }
            ].map((item) => {
              const Icon = item.icon;
              return <div key={item.text} className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-white/5 p-4 text-sm text-slate-300"><Icon className="h-4 w-4 text-blue-300" /> {item.text}</div>;
            })}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
