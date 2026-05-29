import { InfoPage } from "@/components/InfoPage";

export default function Page() {
  return (
    <InfoPage
      eyebrow="FanSpot"
      title="Copyright policy section"
      description="This page gives the future shape for copyright claims, takedowns, counter-notices, and repeat-infringer handling."
      cards={[
        { title: "Claim intake", body: "Collect claimant info, affected URLs, ownership statement, and contact information.", badge: "Workflow" },
{ title: "Temporary action", body: "Restrict disputed material while the admin team reviews validity.", badge: "Workflow" },
{ title: "Audit trail", body: "Log every copyright decision and related account action.", badge: "Workflow" }
      ]}
    />
  );
}
