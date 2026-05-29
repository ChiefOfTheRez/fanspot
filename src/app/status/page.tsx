import { InfoPage } from "@/components/InfoPage";

export default function Page() {
  return (
    <InfoPage
      eyebrow="FanSpot"
      title="System status"
      description="A status center for future uptime, incident posts, maintenance windows, and admin health checks."
      cards={[
        { title: "App", body: "Operational.", badge: "Green" },
{ title: "Database", body: "PostgreSQL schema is ready; production database needs AWS RDS provisioning.", badge: "Pending" },
{ title: "Media", body: "S3/CloudFront upload flow is scaffolded; credentials must be configured.", badge: "Pending" }
      ]}
    />
  );
}
