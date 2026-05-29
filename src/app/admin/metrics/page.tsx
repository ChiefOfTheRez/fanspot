import { AdminNav } from "@/components/AdminNav";
import { MetricCard } from "@/components/MetricCard";
import { Shell } from "@/components/Shell";
import { WorkflowColumn } from "@/components/WorkflowColumn";

export default function Page() {
  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Admin metrics</h1>
          <p className="mt-2 text-sm text-slate-400">High-level platform health, creator acquisition, retention, support load, and risk indicators.</p>
        </div>
        <AdminNav active="/admin/metrics" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Creators" value="20" change="Cap" />
<MetricCard label="Fans" value="1.2k" change="Mock" />
<MetricCard label="Reports/1k posts" value="2.1" change="Healthy" />
<MetricCard label="Support SLA" value="92%" change="Target" />
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
