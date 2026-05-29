import type { MetadataRoute } from "next";

const publicRoutes = [
  "",
  "/about",
  "/pricing",
  "/roadmap",
  "/status",
  "/discover",
  "/safety",
  "/trust",
  "/terms",
  "/privacy",
  "/creator/apply",
  "/legal/community-guidelines",
  "/legal/copyright",
  "/help/getting-started",
  "/help/billing",
  "/help/creators",
  "/help/safety"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7
  }));
}
