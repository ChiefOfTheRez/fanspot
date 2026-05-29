export type Creator = {
  id: string;
  username: string;
  displayName: string;
  headline: string;
  category: string;
  intro: string;
  price: string;
  followers: number;
  posts: number;
  isVerified: boolean;
  isFoundingCreator: boolean;
  accent: string;
  location?: string;
  responseTime?: string;
  completion?: number;
};

export type FeedPost = {
  id: string;
  authorUsername: string;
  author: string;
  avatar: string;
  headline: string;
  title: string;
  body: string;
  visibility: "Public" | "Followers" | "Supporters";
  createdAt: string;
  likes: number;
  comments: number;
  bookmarks: number;
  mediaLabel?: string;
};

export type ReportItem = {
  id: string;
  reason: string;
  status: "Open" | "In review" | "Resolved";
  target: string;
  submittedBy: string;
  createdAt: string;
  priority: "Low" | "Medium" | "High";
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  href: string;
};

export type AuditLogItem = {
  id: string;
  actor: string;
  action: string;
  entity: string;
  createdAt: string;
  severity: "Info" | "Warning" | "Critical";
};

export type ApplicationItem = {
  id: string;
  creatorName: string;
  handle: string;
  category: string;
  status: "Submitted" | "Needs info" | "Approved" | "Rejected";
  audience: string;
  submittedAt: string;
  score: number;
};

export type LedgerItem = {
  id: string;
  date: string;
  description: string;
  type: "Credit" | "Hold" | "Release" | "Payout" | "Adjustment";
  amount: string;
  status: "Available" | "Pending" | "Paid" | "Review";
};



export const roadmapItems: string[] = [];

export const creators: Creator[] = [];
export const feedPosts: FeedPost[] = [];

export const conversations: Array<{ id: string; name: string; handle: string; lastMessage: string; time: string; unread: boolean }> = [];
export const threadMessages: Array<{ id: string; from: "creator" | "fan"; body: string; time: string }> = [];
export const reports: ReportItem[] = [];
export const creatorApplications: ApplicationItem[] = [];
export const auditLogs: AuditLogItem[] = [];
export const notifications: NotificationItem[] = [];
export const ledger: LedgerItem[] = [];

export const platformMetrics = [
  { label: "Users", value: "0", change: "New community" },
  { label: "Creators", value: "0", change: "Apply when ready" },
  { label: "Posts", value: "0", change: "No posts yet" },
  { label: "Reports", value: "0", change: "Clean queue" }
];

export const studioMetrics = [
  { label: "Posts", value: "0", change: "No posts yet" },
  { label: "Subscribers", value: "0", change: "No subscribers yet" },
  { label: "Revenue", value: "$0", change: "Billing not connected" },
  { label: "Profile", value: "0%", change: "Complete setup" }
];

export const payoutRows: Array<{ creator: string; amount: string; status: string; method: string; risk: string }> = [];
export const contentCalendar: Array<{ day: string; title: string; status: string; visibility: string }> = [];

export const roadmap = [
  { phase: "Community", title: "Account creation", status: "Ready", notes: "Fans can create accounts and begin building their home feed." },
  { phase: "Community", title: "Creator tools", status: "In progress", notes: "Creator applications, profiles, posts, and studio tools are part of the foundation." },
  { phase: "Platform", title: "Cloud scaling", status: "Planned", notes: "The architecture is prepared for managed database, media storage, and CDN deployment." }
];

export const creatorTiers: Array<{ name: string; price: string; description: string; features: string[]; highlighted?: boolean }> = [];
