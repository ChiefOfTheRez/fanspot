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
          <h1 className="text-3xl font-black tracking-tight text-white">Post drafts</h1>
          <p className="mt-2 text-sm text-slate-400">Prepare posts, schedule publishing, and review visibility before release.</p>
        </div>
        <StudioNav active="/studio/drafts" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Draft posts" value="7" change="Ready" />
<MetricCard label="Scheduled" value="4" change="This week" />
<MetricCard label="Needs review" value="1" change="Policy" />
<MetricCard label="Templates" value="6" change="Saved" />
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
