import { Card } from "@/components/Card";

export function StatGrid({ items }: { items: Array<{ label: string; value: string; change?: string }> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="p-5">
          <p className="text-sm font-bold text-slate-400">{item.label}</p>
          <p className="mt-3 text-3xl font-black text-white">{item.value}</p>
          {item.change ? <p className="mt-2 text-xs text-blue-200">{item.change}</p> : null}
        </Card>
      ))}
    </div>
  );
}
