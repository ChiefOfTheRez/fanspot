import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";

export function DataList({ title, description, rows }: { title: string; description?: string; rows: Array<{ label: string; value: string; badge?: string }> }) {
  return (
    <Card>
      <h3 className="text-lg font-black text-white">{title}</h3>
      {description ? <p className="mt-1 text-sm text-slate-400">{description}</p> : null}
      <div className="mt-5 divide-y divide-slate-800">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 py-3">
            <p className="text-sm font-bold text-slate-300">{row.label}</p>
            <div className="text-right">
              <p className="text-sm font-black text-white">{row.value}</p>
              {row.badge ? <div className="mt-1"><Badge tone="blue">{row.badge}</Badge></div> : null}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
