import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { launchGates } from "@/lib/launch-readiness";

export function FinalDraftBanner() {
  const complete = launchGates.filter((gate) => gate.status === "Ready").length;
  return (
    <Card className="border-blue-400/30 bg-blue-500/10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Badge tone="blue">FanSpot package</Badge>
          <h2 className="mt-4 text-2xl font-black text-white">FanSpot is structured like a launchable FanSpot.</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            This build includes the app section, creator studio, admin operations, API contracts, database schema, AWS deployment notes, compliance-first safety rails, and release checklists.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-700 bg-slate-950/70 p-5 text-center">
          <p className="text-4xl font-black text-white">{complete}/{launchGates.length}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Gates ready</p>
        </div>
      </div>
    </Card>
  );
}
