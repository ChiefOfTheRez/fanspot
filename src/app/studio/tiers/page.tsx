import { CreatorTierCard } from "@/components/CreatorTierCard";
import { PageHero } from "@/components/PageHero";
import { SafetyNotice } from "@/components/SafetyNotice";
import { Shell } from "@/components/Shell";
import { StudioNav } from "@/components/StudioNav";

export default function StudioTiersPage() {
  return (
    <Shell active="/studio">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Creator Studio" title="Membership tiers" description="Set supporter tiers, benefits, prices, and visibility rules." />
        <StudioNav active="/studio/tiers" />
        <SafetyNotice text="Tier rules should be clear, compliant, and easy to refund or cancel. Keep benefits simple until payments are stable." />
        <div className="grid gap-4 md:grid-cols-3"><CreatorTierCard name="Bronze" price="$4.99/mo" description="Entry supporter tier." features={["Supporter badge", "Follower posts", "Monthly recap"]} /><CreatorTierCard name="Silver" price="$9.99/mo" description="Main supporter tier." features={["Supporter posts", "Creator updates", "Community polls"]} highlighted /><CreatorTierCard name="Diamond" price="$19.99/mo" description="Premium supporter tier." features={["Priority updates", "Early previews", "Limited beta features"]} /></div>
      </div>
    </Shell>
  );
}
