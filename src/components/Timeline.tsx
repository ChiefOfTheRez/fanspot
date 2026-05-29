import { Badge } from "@/components/Badge";

export function Timeline({ items }: { items: Array<{ phase: string; title: string; status: string; notes: string }> }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.phase} className="rounded-3xl border border-slate-800 bg-white/[0.03] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-black text-white">{item.phase}: {item.title}</p>
            <Badge tone={item.status === "Done" ? "green" : item.status === "Next" ? "blue" : "gray"}>{item.status}</Badge>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-400">{item.notes}</p>
        </div>
      ))}
    </div>
  );
}
