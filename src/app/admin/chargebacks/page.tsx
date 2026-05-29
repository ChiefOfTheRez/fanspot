import { AdminNav } from "@/components/AdminNav";
import { MetricCard } from "@/components/MetricCard";
import { Shell } from "@/components/Shell";
import { WorkflowColumn } from "@/components/WorkflowColumn";

export default function Page() {
  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Chargeback center</h1>
          <p className="mt-2 text-sm text-slate-400">Track disputes, evidence status, ledger holds, and processor outcomes.</p>
        </div>
        <AdminNav active="/admin/chargebacks" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Open cases" value="3" change="Action" />
<MetricCard label="Evidence due" value="2" change="48h" />
<MetricCard label="Funds on hold" value="$910" change="Risk" />
<MetricCard label="Win rate" value="72%" change="Demo" />
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
