import { InfoPage } from "@/components/InfoPage";

export default function Page() {
  return (
    <InfoPage
      eyebrow="FanSpot"
      title="Billing help"
      description="Help for subscriptions, receipts, refunds, and payout questions."
      cards={[
        { title: "Subscriptions", body: "Fans can view billing status and manage subscription plans once payments are connected.", badge: "Fans" },
{ title: "Refunds", body: "Refund requests should be reviewed with payment history and platform policy.", badge: "Support" },
{ title: "Payouts", body: "Creators can view ledger entries, holds, release dates, and payout batch status.", badge: "Creators" }
      ]}
    />
  );
}
