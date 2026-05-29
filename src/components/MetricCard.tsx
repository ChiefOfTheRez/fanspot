import { Card } from "@/components/Card";

export function MetricCard({ label, value, change }: { label: string; value: string; change?: string }) {
  return (
    <Card className="p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
      {change ? <p className="mt-2 text-xs font-semibold text-blue-300">{change}</p> : null}
    </Card>
  );
}
