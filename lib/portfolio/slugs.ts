/**
 * URL slug helpers — single source for canonical slugs used by
 * `/projects/[slug]`, the sitemap, and machine-readable endpoints.
 *
 * Slugs are lowercase kebab-case, derived deterministically from the title
 * exposed by `projectsData.js`. Mapping is mirrored from
 * `portfolio_data/project_route_mapping.json` so adding/removing a project
 * updates the sitemap and routes automatically.
 */

import { projectsData } from "@/portfolio_data/projectsData"

const MANUAL_SLUG_OVERRIDES: Record<string, string> = {
  // FedxD-Data-Container-FxDC — preserve canonical alias in URL
  "FedxD Data Container (FxDC)": "fedxd-data-container-fxdc",
  // Full-Stack Template — drop parenthetical ambiguity
  "Full-Stack Template": "fullstack-template",
  // Portfolio Website is the meta project
  "Portfolio Website": "portfolio-website",
  // FxDC exists twice in coverage (a paragraph reference) but is the same as above
  "FxDC": "fedxd-data-container-fxdc",
}

/**
 * Convert any title to a deterministic lowercase kebab-case slug.
 * Uses `MANUAL_SLUG_OVERRIDES` first so branded names map predictably.
 */
export function slugify(title: string): string {
  if (MANUAL_SLUG_OVERRIDES[title]) return MANUAL_SLUG_OVERRIDES[title]
  return title
    .toLowerCase()
    .replace(/[\(\)\[\]]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

/** All slugs derived from authoritative projectsData, in their natural order. */
export function getAllProjectSlugs(): string[] {
  const seen = new Set<string>()
  const slugs: string[] = []
  for (const project of projectsData) {
    const slug = slugify(project.title)
    if (!seen.has(slug)) {
      seen.add(slug)
      slugs.push(slug)
    }
  }
  return slugs
}

/** Reverse lookup: find the projectsData row whose slug matches. */
export function findProjectBySlug(slug: string) {
  return projectsData.find((project) => slugify(project.title) === slug) ?? null
}

/** Path to the project page for a given slug, absolute URL if siteUrl given. */
export function projectPath(slug: string, siteUrl?: string): string {
  const path = `/projects/${slug}`
  return siteUrl ? `${siteUrl}${path}` : path
}
