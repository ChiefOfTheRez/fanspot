import { CheckCircle2, CircleDashed, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { launchGates } from "@/lib/launch-readiness";

export function LaunchChecklist() {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-white">Launch readiness gates</h3>
          <p className="mt-1 text-sm text-slate-400">Treat these as the final go/no-go checklist before public launch.</p>
        </div>
        <Badge tone="green">Operational</Badge>
      </div>
      <div className="space-y-3">
        {launchGates.map((gate) => {
          const Icon = gate.status === "Ready" ? CheckCircle2 : gate.status === "Needs owner" ? ShieldAlert : CircleDashed;
          const tone = gate.status === "Ready" ? "green" : gate.status === "Needs owner" ? "yellow" : "gray";
          return (
            <div key={gate.title} className="rounded-3xl border border-slate-800 bg-white/[0.03] p-4">
              <div className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 text-blue-200" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-black text-white">{gate.title}</p>
                    <Badge tone={tone}>{gate.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{gate.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
