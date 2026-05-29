import { AdminNav } from "@/components/AdminNav";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";

const settings = ["Require manual creator approval", "Enable upload review queue", "Enable weekly payout review", "Rate-limit new accounts", "Hold suspicious earnings"];

export default function AdminSettingsPage() {
  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Admin" title="Platform controls" description="Operational switches for launch safety, approvals, payments, and review workflows." />
        <AdminNav active="/admin/settings" />
        <Card>
          <div className="space-y-3">{settings.map((setting) => <label key={setting} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-white/[0.03] p-4"><span className="font-bold text-white">{setting}</span><input type="checkbox" defaultChecked className="h-5 w-5 accent-blue-600" /></label>)}</div>
        </Card>
      </div>
    </Shell>
  );
}
