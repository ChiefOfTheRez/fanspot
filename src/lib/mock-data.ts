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

// Pre-populated creators for testing the right rail and discovery flows.
export const creators: Creator[] = [
  {
    id: "creator1",
    username: "snowy",
    displayName: "Snowy",
    headline: "Digital artist and streamer",
    category: "Art",
    intro: "Hi I'm Snowy and I love drawing and streaming my art sessions!",
    price: "$4.99/mo",
    followers: 120,
    posts: 25,
    isVerified: true,
    isFoundingCreator: true,
    accent: "blue",
    location: "Toronto, Canada",
    responseTime: "1h",
    completion: 90
  },
  {
    id: "creator2",
    username: "fitguru",
    displayName: "Fit Guru",
    headline: "Your daily fitness inspiration",
    category: "Fitness",
    intro: "Join me as we explore workouts, nutrition, and motivation.",
    price: "$9.99/mo",
    followers: 200,
    posts: 50,
    isVerified: true,
    isFoundingCreator: false,
    accent: "green",
    location: "New York, USA",
    responseTime: "2h",
    completion: 85
  },
  {
    id: "creator3",
    username: "comedian",
    displayName: "Comedy King",
    headline: "Laughs and behind‑the‑scenes humour",
    category: "Comedy",
    intro: "I'm here to make your day brighter with jokes and skits.",
    price: "$0.00/mo",
    followers: 500,
    posts: 80,
    isVerified: false,
    isFoundingCreator: false,
    accent: "yellow",
    location: "London, UK",
    responseTime: "3h",
    completion: 75
  }
];
// Example feed posts so the home feed and admin content sections display content in this test build.
export const feedPosts: FeedPost[] = [
  {
    id: "post1",
    authorUsername: "snowy",
    author: "Snowy",
    avatar: "SN",
    headline: "Creator",
    title: "Welcome to my page!",
    body: "This is my first post on FanSpot. Excited to share my art journey!",
    visibility: "Public",
    createdAt: new Date().toLocaleDateString("en", { month: "short", day: "numeric" }),
    likes: 5,
    comments: 2,
    bookmarks: 3
  },
  {
    id: "post2",
    authorUsername: "fitguru",
    author: "Fit Guru",
    avatar: "FG",
    headline: "Creator",
    title: "Morning workout tips",
    body: "Start your day with a quick cardio and stretching routine. What do you do for morning fitness?",
    visibility: "Public",
    createdAt: new Date().toLocaleDateString("en", { month: "short", day: "numeric" }),
    likes: 8,
    comments: 1,
    bookmarks: 1
  }
];

// Example conversations so the messages page shows some threads.
export const conversations: Array<{ id: string; name: string; handle: string; lastMessage: string; time: string; unread: boolean }> = [
  {
    id: "conv1",
    name: "Snowy",
    handle: "@snowy",
    lastMessage: "Thanks for your support!",
    time: "1d",
    unread: true
  },
  {
    id: "conv2",
    name: "Fit Guru",
    handle: "@fitguru",
    lastMessage: "Let's schedule a training session.",
    time: "2d",
    unread: false
  }
];
// Example thread messages for the messaging modal. Not currently displayed but available for extension.
export const threadMessages: Array<{ id: string; from: "creator" | "fan"; body: string; time: string }> = [
  { id: "msg1", from: "fan", body: "Hey there! Loving your content.", time: "10:00 AM" },
  { id: "msg2", from: "creator", body: "Thanks so much! More coming soon.", time: "10:05 AM" }
];
// Example moderation report so the admin reports section isn't empty.
export const reports: ReportItem[] = [
  {
    id: "report1",
    reason: "Harassment",
    status: "Open",
    target: "Post by Comedian",
    submittedBy: "fan1",
    createdAt: new Date().toLocaleDateString("en", { month: "short", day: "numeric" }),
    priority: "High"
  }
];
// Example creator application so the admin applications queue isn't empty.
export const creatorApplications: ApplicationItem[] = [
  {
    id: "application1",
    creatorName: "Jane Doe",
    handle: "janedoe",
    category: "Art",
    status: "Submitted",
    audience: "Art lovers",
    submittedAt: new Date().toLocaleDateString("en", { month: "short", day: "numeric" }),
    score: 85
  }
];
export const auditLogs: AuditLogItem[] = [];
// Example notifications so the alerts page displays messages.
export const notifications: NotificationItem[] = [
  {
    id: "notif1",
    title: "Welcome to FanSpot!",
    body: "Thanks for joining FanSpot. Start exploring creators today.",
    createdAt: new Date().toLocaleDateString("en", { month: "short", day: "numeric" }),
    read: false,
    href: "/feed"
  },
  {
    id: "notif2",
    title: "New post from Snowy",
    body: "Snowy just shared a new art piece.",
    createdAt: new Date().toLocaleDateString("en", { month: "short", day: "numeric" }),
    read: false,
    href: "/feed"
  }
];
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
