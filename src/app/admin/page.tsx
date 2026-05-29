import Link from "next/link";
import { ClipboardCheck, CreditCard, FileWarning, ShieldCheck, UserCheck } from "lucide-react";
import { ReportsTable } from "@/components/AdminTable";
import { Badge } from "@/components/Badge";
import { Card, SectionHeader } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { MetricCard } from "@/components/MetricCard";
import { Shell } from "@/components/Shell";
import { platformMetrics, reports } from "@/lib/mock-data";

const adminLinks = [
  { href: "/admin/reports", icon: FileWarning, title: "Reports", text: "Review user-submitted reports and moderation cases." },
  { href: "/admin/users", icon: UserCheck, title: "Users", text: "View account status, roles, and restrictions." },
  { href: "/admin/content", icon: ClipboardCheck, title: "Content", text: "Review posts and media." },
  { href: "/admin/payouts", icon: CreditCard, title: "Payouts", text: "Review payout queues when payments are connected." }
];

export default function AdminPage() {
  return (
    <Shell active="/admin">
      <div className="space-y-6 pb-24">
        <SectionHeader eyebrow="Admin" title="Admin dashboard" description="Use this area to test admin-only access and prepare operational tools." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {platformMetrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {adminLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Card className="h-full transition hover:border-blue-500 hover:bg-blue-600/10">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-blue-600/20 text-blue-200"><Icon className="h-5 w-5" /></div>
                  <h2 className="font-black text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                </Card>
              </Link>
            );
          })}
        </div>
        <Card className="border-blue-400/30 bg-blue-600/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge><ShieldCheck className="mr-1 h-3 w-3" /> Admin-only</Badge>
              <h2 className="mt-3 text-xl font-black text-white">Protected by admin role</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">Restricted platform operations for authorized team members.</p>
            </div>
          </div>
        </Card>
        {reports.length ? <ReportsTable reports={reports} /> : <EmptyState icon={<ShieldCheck className="h-10 w-10" />} title="No reports yet" description="The admin queue starts empty. User reports will appear here after report submission is wired to the database." />}
      </div>
    </Shell>
  );
}
