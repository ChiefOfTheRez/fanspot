import { HelpCircle, Mail, ShieldAlert } from "lucide-react";
import { ActionCard } from "@/components/ActionCard";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { TextAreaField, TextField } from "@/components/FormField";
import { Shell } from "@/components/Shell";

export default function SupportPage() {
  return (
    <Shell active="/settings">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Support" title="Help center and tickets" description="Support flows for fans, creators, reports, billing questions, and creator onboarding." />
        <div className="grid gap-4 md:grid-cols-3"><ActionCard title="Safety issue" text="Report harassment, impersonation, spam, or content concerns." href="/safety" icon={ShieldAlert} /><ActionCard title="Billing question" text="Receipts, subscription status, and refund workflows." href="/billing" icon={Mail} /><ActionCard title="Creator help" text="Application and studio setup guidance." href="/creator/apply" icon={HelpCircle} /></div>
        <Card>
          <h2 className="text-xl font-black text-white">Open a support ticket</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2"><TextField label="Subject" placeholder="What do you need help with?" /><TextField label="Account email" placeholder="you@example.com" /></div>
          <div className="mt-4"><TextAreaField label="Message" placeholder="Describe the issue..." /></div>
          <button className="mt-5 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">Save ticket draft</button>
        </Card>
      </div>
    </Shell>
  );
}
