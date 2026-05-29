import { InfoPage } from "@/components/InfoPage";

export default function Page() {
  return (
    <InfoPage
      eyebrow="FanSpot"
      title="Payment terms section"
      description="Payments should not go live until processor approval, refund terms, chargeback handling, payout holds, and tax requirements are finalized."
      cards={[
        { title: "Subscription billing", body: "Clearly display price, billing period, renewal rules, and cancellation path.", badge: "Billing" },
{ title: "Payout timing", body: "Weekly payouts can be supported after holds, dispute windows, and minimum payout thresholds are implemented.", badge: "Payouts" },
{ title: "Disputes", body: "Chargebacks should place related creator funds on hold until review is complete.", badge: "Risk" }
      ]}
    />
  );
}
