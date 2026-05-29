import { InboxThread } from "@/components/InboxThread";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { StudioNav } from "@/components/StudioNav";

export default function StudioInboxPage() {
  return (
    <Shell active="/studio">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Creator Studio" title="Creator inbox" description="A studio-specific messaging view for support, fan replies, and moderation controls." />
        <StudioNav active="/studio/inbox" />
        <InboxThread />
      </div>
    </Shell>
  );
}
