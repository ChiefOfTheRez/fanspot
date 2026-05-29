import { InfoPage } from "@/components/InfoPage";

export default function Page() {
  return (
    <InfoPage
      eyebrow="FanSpot"
      title="About FanSpot"
      description="FanSpot is a premium creator-social platform built around polished fan feeds, creator profiles, community tools, and safety-first operations."
      cards={[
        { title: "Creator-first platform", body: "Fans discover creators, follow posts, bookmark updates, send messages, and support creator communities.", badge: "Product" },
{ title: "Built for operations", body: "Admin tools, safety queues, payout review, audit logs, and release gates are part of the core product instead of an afterthought.", badge: "Ops" },
{ title: "AWS-ready structure", body: "The app is organized for Next.js hosting, PostgreSQL, S3 media storage, CloudFront delivery, and future workers.", badge: "AWS" }
      ]}
    />
  );
}
