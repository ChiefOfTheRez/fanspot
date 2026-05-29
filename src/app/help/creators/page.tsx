import { InfoPage } from "@/components/InfoPage";

export default function Page() {
  return (
    <InfoPage
      eyebrow="FanSpot"
      title="Creator help"
      description="Help for applications, studio setup, content planning, and audience growth."
      cards={[
        { title: "Applications", body: "Founding creator spots are capped and manually reviewed.", badge: "Apply" },
{ title: "Studio setup", body: "Complete profile, tiers, posting cadence, media library, and payout settings.", badge: "Setup" },
{ title: "Growth", body: "Use discovery, public posts, consistent updates, and strong community behavior.", badge: "Growth" }
      ]}
    />
  );
}
