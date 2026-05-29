import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

export function CreatorTierCard({ name, price, description, features, highlighted }: { name: string; price: string; description: string; features: string[]; highlighted?: boolean }) {
  return (
    <Card className={highlighted ? "border-blue-500 bg-blue-600/10" : undefined}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-white">{name}</h3>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
        {highlighted ? <Badge>Popular</Badge> : null}
      </div>
      <p className="mt-5 text-3xl font-black text-white">{price}</p>
      <div className="mt-5 space-y-3">
        {features.map((feature) => (
          <p key={feature} className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-200" /> {feature}</p>
        ))}
      </div>
    </Card>
  );
}
