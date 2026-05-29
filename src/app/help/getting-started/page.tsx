import { InfoPage } from "@/components/InfoPage";

export default function Page() {
  return (
    <InfoPage
      eyebrow="FanSpot"
      title="Getting started help"
      description="Guidance for first-time fans and creators."
      cards={[
        { title: "Fans", body: "Create an account, follow creators, browse discovery, bookmark posts, and manage billing.", badge: "Guide" },
{ title: "Creators", body: "Apply for a founding spot, complete studio setup, create tiers, and post updates.", badge: "Guide" },
{ title: "Admins", body: "Review applications, reports, payouts, and platform settings.", badge: "Guide" }
      ]}
    />
  );
}
