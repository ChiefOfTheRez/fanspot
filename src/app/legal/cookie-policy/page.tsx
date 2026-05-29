import { InfoPage } from "@/components/InfoPage";

export default function Page() {
  return (
    <InfoPage
      eyebrow="FanSpot"
      title="Cookie policy section"
      description="This section explains the future cookie and analytics disclosure page for production."
      cards={[
        { title: "Essential cookies", body: "Authentication, sessions, fraud prevention, and security.", badge: "Required" },
{ title: "Analytics cookies", body: "Only enable after consent and privacy review.", badge: "Optional" },
{ title: "Preference controls", body: "Give users a clear way to manage non-essential tracking.", badge: "Control" }
      ]}
    />
  );
}
