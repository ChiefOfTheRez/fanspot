import { InfoPage } from "@/components/InfoPage";

export default function Page() {
  return (
    <InfoPage
      eyebrow="FanSpot"
      title="Community guidelines"
      description="FanSpot should launch with clear, safe, general creator-platform rules before accepting public users or paid creator activity."
      cards={[
        { title: "Respectful conduct", body: "No harassment, impersonation, spam, threats, or manipulation of platform systems.", badge: "Rule" },
{ title: "Safe content", body: "The FanSpot is structured as a general creator platform and does not include adult-content features.", badge: "Rule" },
{ title: "Report and review", body: "Fans can report content; moderators review and document decisions in audit logs.", badge: "Process" }
      ]}
    />
  );
}
