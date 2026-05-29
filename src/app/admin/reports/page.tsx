import { ReportsTable } from "@/components/AdminTable";
import { Badge } from "@/components/Badge";
import { Card, SectionHeader } from "@/components/Card";
import { Shell } from "@/components/Shell";
import { reports } from "@/lib/mock-data";

export default function AdminReportsPage() {
  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <SectionHeader eyebrow="Admin" title="Reports queue" description="Review reports, prioritize cases, and preserve an audit trail." />
        <div className="grid gap-4 md:grid-cols-3">
          <Card><Badge tone="yellow">Open</Badge><p className="mt-3 text-3xl font-black">8</p></Card>
          <Card><Badge tone="red">High priority</Badge><p className="mt-3 text-3xl font-black">4</p></Card>
          <Card><Badge tone="green">Resolved today</Badge><p className="mt-3 text-3xl font-black">3</p></Card>
        </div>
        <ReportsTable reports={reports} />
      </div>
    </Shell>
  );
}
