import { Tabs } from "@/components/Tabs";

const studioTabs = [
  { label: "Overview", href: "/studio" },
  { label: "Posts", href: "/studio/posts" },
  { label: "Drafts", href: "/studio/drafts" },
  { label: "Media", href: "/studio/media" },
  // Added an Edit Media tab so creators can edit their uploaded photos and videos.
  // Rename the edit tab to clarify that it handles both photo and video editing
  { label: "Edit photo/video", href: "/studio/media/edit" },
  { label: "Calendar", href: "/studio/calendar" },
  { label: "Tiers", href: "/studio/tiers" },
  { label: "Subscribers", href: "/studio/subscribers" },
  { label: "Audience", href: "/studio/audience" },
  { label: "Inbox", href: "/studio/inbox" },
  { label: "Insights", href: "/studio/insights" },
  { label: "Analytics", href: "/studio/analytics" },
  { label: "Earnings", href: "/studio/earnings" },
  { label: "Payouts", href: "/studio/payouts" },
  { label: "Resources", href: "/studio/resources" },
  { label: "Moderation", href: "/studio/moderation" },
  { label: "Automations", href: "/studio/automations" },
  { label: "Settings", href: "/studio/settings" }
];

export function StudioNav({ active }: { active: string }) {
  return <Tabs tabs={studioTabs} active={active} />;
}
