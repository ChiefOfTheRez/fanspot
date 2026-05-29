import type { ReactNode } from "react";
import { Card } from "@/components/Card";

export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description: string; action?: ReactNode }) {
  return (
    <Card className="grid place-items-center py-12 text-center">
      {icon ? <div className="mb-4 text-blue-300">{icon}</div> : null}
      <h3 className="text-xl font-black text-white">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  );
}
