import { BarChart3, Heart, MessageCircle, Users } from "lucide-react";
import { Card, SectionHeader } from "@/components/Card";
import { MetricCard } from "@/components/MetricCard";
import { Shell } from "@/components/Shell";

export default function AudiencePage() {
  return (
    <Shell active="/studio">
      <div className="space-y-5 pb-24">
        <SectionHeader eyebrow="Studio" title="Audience insights" description="Understand audience growth, engagement, and creator performance." />
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Followers" value="1.2K" change="+84 this week" />
          <MetricCard label="Supporters" value="0" change="payments disabled" />
          <MetricCard label="Avg likes" value="94" change="pending" />
          <MetricCard label="Comments" value="44" change="pending" />
        </div>
        <Card>
          <h2 className="text-xl font-black text-white">Engagement overview</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Insight icon={<Users />} title="Follower growth" />
            <Insight icon={<Heart />} title="Like rate" />
            <Insight icon={<MessageCircle />} title="Comment health" />
          </div>
        </Card>
      </div>
    </Shell>
  );
}

function Insight({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-white/5 p-5">
      <div className="mb-4 text-blue-300">{icon}</div>
      <h3 className="font-black text-white">{title}</h3>
      <div className="mt-4 h-28 rounded-2xl bg-gradient-to-t from-blue-600/40 to-transparent" />
      <p className="mt-3 text-xs text-slate-500"><BarChart3 className="mr-1 inline h-3 w-3" /> Audience trends update as activity grows</p>
    </div>
  );
}
