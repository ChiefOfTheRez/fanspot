import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { cx } from "@/lib/format";

export function RiskScoreCard({ title, score, body }: { title: string; score: number; body: string }) {
  const tone = score >= 75 ? "red" : score >= 45 ? "yellow" : "green";
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-400">Risk score</p>
          <h3 className="mt-1 text-lg font-black text-white">{title}</h3>
        </div>
        <Badge tone={tone}>{score}/100</Badge>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
        <div className={cx("h-full rounded-full", score >= 75 ? "bg-rose-400" : score >= 45 ? "bg-amber-300" : "bg-emerald-300")} style={{ width: `${score}%` }} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-400">{body}</p>
    </Card>
  );
}
