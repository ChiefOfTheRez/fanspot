import { InfoPage } from "@/components/InfoPage";

export default function Page() {
  return (
    <InfoPage
      eyebrow="FanSpot"
      title="Product roadmap"
      description="FanSpot is organized around creator onboarding, fan community growth, safety systems, and scalable infrastructure."
      cards={[
        { title: "Phase 0: foundation", body: "Core app experience, account creation, profiles, feed, and creator tools.", badge: "Done" },
{ title: "Phase 1: real accounts", body: "Signup, login, protected routes, Prisma reads/writes, user settings, and creator applications.", badge: "Next" },
{ title: "Phase 2: paid beta", body: "Payments, subscriptions, webhook processing, entitlements, creator ledger, and payout review.", badge: "Soon" }
      ]}
    />
  );
}
