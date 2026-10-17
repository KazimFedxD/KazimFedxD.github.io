import type { MetadataRoute } from "next"
import { SITE_URL } from "@/config/constants"
import { getAllProjectSlugs } from "@/lib/portfolio/slugs"

// Static export: snapshot sitemap at build time.
export const dynamic = "force-static"

interface SitemapEntry {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}

const CORE_ROUTES: SitemapEntry[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.9 },
  { path: "/skills", changeFrequency: "monthly", priority: 0.7 },
  { path: "/experience", changeFrequency: "yearly", priority: 0.6 },
  { path: "/education", changeFrequency: "yearly", priority: 0.6 },
  { path: "/achievements", changeFrequency: "yearly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const projectSlugs = getAllProjectSlugs()

  const entries: MetadataRoute.Sitemap = CORE_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  for (const slug of projectSlugs) {
    entries.push({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  }

  return entries
}
