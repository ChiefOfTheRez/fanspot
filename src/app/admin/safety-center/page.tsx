import { AdminNav } from "@/components/AdminNav";
import { MetricCard } from "@/components/MetricCard";
import { Shell } from "@/components/Shell";
import { WorkflowColumn } from "@/components/WorkflowColumn";

export default function Page() {
  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Safety center</h1>
          <p className="mt-2 text-sm text-slate-400">Central operating hub for reports, restrictions, content labels, and user trust decisions.</p>
        </div>
        <AdminNav active="/admin/safety-center" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Open safety cases" value="12" change="Queue" />
<MetricCard label="High priority" value="2" change="Today" />
<MetricCard label="Avg response" value="3h" change="Target" />
<MetricCard label="Repeat flags" value="4" change="Review" />
        </div>
        
        <WorkflowColumn
          title="Admin decision workflow"
          subtitle="Every meaningful admin action should create an audit event and clear user-facing outcome."
          items={[
            { label: "Triage", body: "Sort by severity, deadline, financial impact, and user trust risk.", status: "Ready" },
            { label: "Investigate", body: "Review records, related reports, payment status, and previous audit events.", status: "Ready" },
            { label: "Resolve", body: "Record the decision, notify affected users, and schedule follow-up if needed.", status: "Draft" }
          ]}
        />
      </div>
    </Shell>
  );
}
