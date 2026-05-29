import { InfoPage } from "@/components/InfoPage";

export default function Page() {
  return (
    <InfoPage
      eyebrow="FanSpot"
      title="Creator agreement section"
      description="This is a product section, not legal advice. A real creator agreement should be reviewed before launch."
      cards={[
        { title: "Creator responsibilities", body: "Creators must follow platform rules, payout requirements, content rules, and tax/payment requirements.", badge: "Draft" },
{ title: "Platform responsibilities", body: "FanSpot should provide clear payout timing, support flow, moderation process, and account status rules.", badge: "Draft" },
{ title: "Review required", body: "Replace this section with a lawyer-reviewed agreement before public launch.", badge: "Required" }
      ]}
    />
  );
}
