import { Card, SectionHeader } from "@/components/Card";
import { MetricCard } from "@/components/MetricCard";
import { Shell } from "@/components/Shell";
import { StudioNav } from "@/components/StudioNav";
import { WorkflowColumn } from "@/components/WorkflowColumn";

export default function Page() {
  return (
    <Shell active="/studio">
      <div className="space-y-5 pb-24">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Creator analytics</h1>
          <p className="mt-2 text-sm text-slate-400">Track supporter growth, engagement rate, post performance, and conversion health.</p>
        </div>
        <StudioNav active="/studio/analytics" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Engagement rate" value="6.8%" change="+1.2%" />
<MetricCard label="Profile visits" value="8.4k" change="+18%" />
<MetricCard label="Supporter conversion" value="3.1%" change="Private beta" />
<MetricCard label="Churn risk" value="Low" change="Stable" />
        </div>
        <WorkflowColumn
          title="Recommended workflow"
          subtitle="This page is wired as a final-draft operational surface. Replace demo values with Prisma queries in the next implementation pass."
          items={[
            { label: "Review", body: "Check the highest-risk or highest-impact items first.", status: "Ready" },
            { label: "Decide", body: "Use a consistent action, note, and audit event for every important change.", status: "Ready" },
            { label: "Follow up", body: "Notify fans, creators, or admins when a decision changes access, money, or trust.", status: "Draft" }
          ]}
        />
        <Card>
          <SectionHeader title="Build note" description="This surface is intentionally separated from the fan feed so creator tools can scale without cluttering the main app." />
        </Card>
      </div>
    </Shell>
  );
}
