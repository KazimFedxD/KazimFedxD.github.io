import type { MetadataRoute } from "next"
import { SITE_URL, SITEMAP_ROUTES } from "@/config/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return SITEMAP_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
