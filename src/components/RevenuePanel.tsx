import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { formatCurrency } from "@/lib/format";

const bars = [32, 48, 42, 64, 58, 72, 81, 76, 88, 93, 86, 96];

export function RevenuePanel() {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-white">Revenue preview</h3>
          <p className="mt-1 text-sm text-slate-400">Demo-only earning model for studio layout testing.</p>
        </div>
        <Badge tone="green">+18.4%</Badge>
      </div>
      <p className="mt-6 text-4xl font-black text-white">{formatCurrency(842000)}</p>
      <div className="mt-6 flex h-36 items-end gap-2 rounded-3xl border border-slate-800 bg-slate-950/60 p-4">
        {bars.map((bar, index) => (
          <div key={index} className="flex-1 rounded-t-2xl bg-blue-500/70" style={{ height: `${bar}%` }} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-slate-400">
        <div className="rounded-2xl bg-white/[0.03] p-3"><p className="font-black text-white">$6.7k</p><p>Net</p></div>
        <div className="rounded-2xl bg-white/[0.03] p-3"><p className="font-black text-white">$1.1k</p><p>Hold</p></div>
        <div className="rounded-2xl bg-white/[0.03] p-3"><p className="font-black text-white">$620</p><p>Fees</p></div>
      </div>
    </Card>
  );
}
