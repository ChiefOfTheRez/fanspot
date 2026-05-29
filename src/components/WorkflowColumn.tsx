import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";

export function WorkflowColumn({ title, subtitle, items }: { title: string; subtitle?: string; items: Array<{ label: string; body: string; status?: string }> }) {
  return (
    <Card>
      <h3 className="text-lg font-black text-white">{title}</h3>
      {subtitle ? <p className="mt-1 text-sm leading-6 text-slate-400">{subtitle}</p> : null}
      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-white"><span className="mr-2 text-blue-300">{String(index + 1).padStart(2, "0")}</span>{item.label}</p>
              {item.status ? <Badge tone={item.status === "Ready" ? "green" : "blue"}>{item.status}</Badge> : null}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
