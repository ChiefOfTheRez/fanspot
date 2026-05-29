import { AdminNav } from "@/components/AdminNav";
import { MetricCard } from "@/components/MetricCard";
import { Shell } from "@/components/Shell";
import { WorkflowColumn } from "@/components/WorkflowColumn";

export default function Page() {
  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Legal operations</h1>
          <p className="mt-2 text-sm text-slate-400">Keep legal sections, policy review, copyright cases, and creator agreement versions organized.</p>
        </div>
        <AdminNav active="/admin/legal" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Policy drafts" value="5" change="Review" />
<MetricCard label="Copyright cases" value="1" change="Open" />
<MetricCard label="Terms version" value="v0.1" change="Draft" />
<MetricCard label="Review owner" value="Needed" change="Legal" />
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
