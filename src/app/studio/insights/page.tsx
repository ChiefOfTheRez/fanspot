import { BarChart3 } from "lucide-react";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { StatGrid } from "@/components/StatGrid";
import { StudioNav } from "@/components/StudioNav";

export default function StudioInsightsPage() {
  return (
    <Shell active="/studio">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Creator Studio" title="Creator insights" description="High-level analytics section for posts, followers, conversion, and supporter retention." />
        <StudioNav active="/studio/insights" />
        <StatGrid items={[{ label: "Profile views", value: "4.8k", change: "+12%" }, { label: "Post engagement", value: "8.4%", change: "last 30 days" }, { label: "Supporter conversion", value: "3.1%", change: "pending" }, { label: "Retention", value: "92%", change: "pending" }]} />
        <Card><div className="flex items-center gap-3"><BarChart3 className="h-6 w-6 text-blue-200" /><h2 className="text-xl font-black text-white">Analytics overview</h2></div><div className="mt-6 h-72 rounded-3xl border border-slate-800 bg-[linear-gradient(180deg,rgba(30,107,255,0.18),transparent)]" /></Card>
      </div>
    </Shell>
  );
}
