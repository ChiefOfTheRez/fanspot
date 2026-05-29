export const routeGroups = {
  marketing: ["/", "/about", "/pricing", "/roadmap", "/trust", "/safety"],
  fan: ["/feed", "/discover", "/search", "/notifications", "/bookmarks", "/messages", "/billing", "/profile", "/settings", "/support"],
  creatorApply: ["/creator/apply"],
  creator: ["/studio", "/studio/posts", "/studio/media", "/studio/tiers", "/studio/insights", "/studio/payouts", "/studio/settings", "/studio/calendar", "/studio/inbox", "/studio/analytics", "/studio/moderation", "/studio/resources", "/studio/automations", "/studio/subscribers", "/studio/drafts", "/studio/live", "/wallet"],
  admin: ["/admin"]
};

export const protectedRoutes = [...routeGroups.fan, ...routeGroups.creatorApply, ...routeGroups.creator, ...routeGroups.admin];
export const creatorRoutes = routeGroups.creator;
export const adminRoutes = routeGroups.admin;
