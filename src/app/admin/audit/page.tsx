import { AdminNav } from "@/components/AdminNav";
import { Card } from "@/components/Card";
import { DataTable } from "@/components/DataTable";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { auditLogs } from "@/lib/mock-data";

export default function AdminAuditPage() {
  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Admin" title="Audit log" description="Track sensitive admin actions, policy decisions, automated checks, and payout approvals." />
        <AdminNav active="/admin/audit" />
        <Card><DataTable columns={[{ key: "id", label: "ID" }, { key: "actor", label: "Actor" }, { key: "action", label: "Action" }, { key: "entity", label: "Entity" }, { key: "severity", label: "Severity" }, { key: "createdAt", label: "Created" }]} rows={auditLogs} /></Card>
      </div>
    </Shell>
  );
}
