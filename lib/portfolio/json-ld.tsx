/**
 * Server-side JSON-LD helpers. Each builder returns a plain object you can
 * stringify into a `<script type="application/ld+json">` block.
 *
 * Why not a library?
 *   - The schema.org types we touch are < 30 lines each.
 *   - Next 16 ships <script type="application/ld+json" /> as idiomatic
 *     structured-data delivery — no extra dependency needed.
 */

import type { ProjectDetail } from "@/lib/portfolio/types"
import {
  type BreadcrumbListSchema,
  type CollectionPageSchema,
  type PersonSchema,
  type SoftwareSourceCodeSchema,
  type WebSiteSchema,
} from "@/lib/portfolio/types"
import { getIdentity } from "@/lib/portfolio/identity"
import { SITE_URL } from "@/config/constants"

// ============================================================
// Schema builders (objects — stringified at render time)
// ============================================================

export function personSchema(): PersonSchema {
  const id = getIdentity()
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": id["@id"],
    name: id.canonicalName,
    alternateName: id.alternateName,
    givenName: id.givenName,
    familyName: id.familyName,
    additionalName: id.additionalName,
    description: id.shortBio,
    url: id.url,
    image: id.image,
    jobTitle: id.jobTitle,
    knowsAbout: id.knowsAbout,
    email: id.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: id.location.city,
      addressCountry: id.location.country,
    },
    sameAs: id.sameAs,
  }
}

export function websiteSchema(): WebSiteSchema {
  const id = getIdentity()
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: id.canonicalName,
    alternateName: id.alternateName,
    url: SITE_URL,
    description:
      "Interactive retro-CRT portfolio of Kazim Abbas (FedxD) — backend engineer building production systems in Django, Python, and PostgreSQL.",
    inLanguage: "en",
    author: { "@id": id["@id"] },
    publisher: { "@id": id["@id"] },
  }
}

export function projectSchema(project: ProjectDetail): SoftwareSourceCodeSchema {
  const id = getIdentity()
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${SITE_URL}/projects/${project.slug}#software`,
    name: project.title,
    alternateName: extractAliases(project.title),
    description: project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
    codeRepository: project.github ?? undefined,
    programmingLanguage: project.tech.length ? project.tech : project.techStack.map((t) => t.name),
    author: { "@id": id["@id"] },
    keywords: [project.title, "Kazim Abbas", "FedxD", ...project.tech].filter(Boolean).join(", "),
  }
}

export function collectionSchema(opts: {
  name: string
  description: string
  urlPath: string
  items: { slug: string; name: string; type: "SoftwareSourceCode" | "CreativeWork" }[]
}): CollectionPageSchema {
  const id = getIdentity()
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${opts.urlPath}#collection`,
    name: opts.name,
    url: `${SITE_URL}${opts.urlPath}`,
    description: opts.description,
    isPartOf: { "@id": `${SITE_URL}#website` },
    author: { "@id": id["@id"] },
    hasPart: opts.items.map((item) => ({
      "@type": item.type,
      "@id": `${SITE_URL}/projects/${item.slug}#software`,
      name: item.name,
      url: `${SITE_URL}/projects/${item.slug}`,
    })),
  }
}

export function breadcrumbsSchema(items: { name: string; path: string }[]): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

// ============================================================
// Server-component renderer
// ============================================================

/**
 * Render any schema.org object as a <script type="application/ld+json">
 * block. Idempotent and dependency-free — works inside any Server Component.
 */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here: schema objects are created from our own
      // builders above, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================================
// Helpers
// ============================================================

function extractAliases(title: string): string[] {
  const aliases: string[] = []
  // FxDC has a stable alias; pull it out for alternateName when relevant.
  if (/fxdc/i.test(title)) {
    aliases.push("FxDC", "FedxD Data Container")
  }
  return aliases
}
