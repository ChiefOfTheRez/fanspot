import { HelpCircle, Mail, ShieldAlert } from "lucide-react";
import { ActionCard } from "@/components/ActionCard";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { SupportTicketForm } from "@/components/SupportTicketForm";

export default function SupportPage() {
  return (
    <Shell active="/support">
      <div className="space-y-5 pb-24">
        <PageHero title="Help center and tickets" description="Reach out for help with billing, safety, or creator onboarding." />
        <div className="grid gap-4 md:grid-cols-3">
          <ActionCard title="Safety issue" text="Report harassment, impersonation, spam, or content concerns." href="/safety" icon={ShieldAlert} />
          <ActionCard title="Billing question" text="Receipts, subscription status, and refund workflows." href="/billing" icon={Mail} />
          <ActionCard title="Creator help" text="Application and studio setup guidance." href="/creator/apply" icon={HelpCircle} />
        </div>
        <Card><SupportTicketForm /></Card>
      </div>
    </Shell>
  );
}
