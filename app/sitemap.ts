import type { MetadataRoute } from "next";
import { PROJECTS } from "./lib/projects";
import { listBlogPosts } from "./lib/data";

const SITE_URL = "https://codlinx.com";

const STATIC_ROUTES = [
  "",
  "/work",
  "/work/case-studies",
  "/work/clients",
  "/work/industries",
  "/services/web",
  "/services/mobile",
  "/services/cloud",
  "/services/ai",
  "/services/design",
  "/services/strategy",
  "/about",
  "/careers",
  "/blog",
  "/contact",
  "/pricing",
  "/login",
  "/privacy",
  "/terms",
  "/security",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await listBlogPosts();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...caseStudyEntries, ...blogEntries];
}
