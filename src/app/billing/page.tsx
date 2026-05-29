import { CreditCard, Landmark, Receipt, ShieldCheck } from "lucide-react";
import { Card } from "@/components/Card";
import { CreatorTierCard } from "@/components/CreatorTierCard";
import { PageHero } from "@/components/PageHero";
import { SafetyNotice } from "@/components/SafetyNotice";
import { Shell } from "@/components/Shell";

export default function BillingPage() {
  return (
    <Shell active="/settings">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Billing" title="Subscriptions and receipts" description="Manage subscriptions, receipts, billing details, and account purchases." />
        <SafetyNotice text="Payment processor is not connected in this test build. Keep all payment flows in placeholder mode until processor approval, webhook verification, fraud checks, and payout controls are complete." />
        <Card>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-5"><ShieldCheck className="h-6 w-6 text-blue-200" /><h3 className="mt-4 font-black text-white">Processor direction</h3><p className="mt-2 text-sm leading-6 text-slate-300">Segpay remains the preferred test direction for higher-risk creator commerce. Keep Stripe/PayPal style processors as backup for mainstream-only flows.</p></div>
            <div className="rounded-3xl border border-slate-800 bg-white/[0.03] p-5"><Landmark className="h-6 w-6 text-blue-200" /><h3 className="mt-4 font-black text-white">Creator payouts</h3><p className="mt-2 text-sm leading-6 text-slate-400">Manual weekly payout tracking stays in admin until automated payout rails are selected.</p></div>
            <div className="rounded-3xl border border-slate-800 bg-white/[0.03] p-5"><Receipt className="h-6 w-6 text-blue-200" /><h3 className="mt-4 font-black text-white">Receipts</h3><p className="mt-2 text-sm leading-6 text-slate-400">Receipts will be generated from payment events after webhooks are live.</p></div>
          </div>
        </Card>
        <div className="grid gap-4 md:grid-cols-3">
          <CreatorTierCard name="Follower" price="Free" description="Public posts and creator discovery." features={["Follow creators", "Save posts", "Public updates"]} />
          <CreatorTierCard name="Supporter" price="$9.99/mo" description="Support your favorite creators with recurring access." features={["Supporter posts", "Community updates", "Receipt history"]} highlighted />
          <CreatorTierCard name="VIP" price="Coming soon" description="Premium creator access and special updates." features={["Early access", "Priority replies", "Special updates"]} />
        </div>
        <Card>
          <div className="rounded-3xl border border-slate-800 bg-white/[0.03] p-5"><CreditCard className="h-6 w-6 text-blue-200" /><h3 className="mt-4 font-black text-white">Payment methods</h3><p className="mt-2 text-sm leading-6 text-slate-400">Saved methods stay disabled until the processor integration is approved and tested.</p></div>
        </Card>
      </div>
    </Shell>
  );
}
