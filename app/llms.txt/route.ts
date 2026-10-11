/**
 * /llms.txt — Concise AI-oriented site index. Follows the llms.txt convention
 * (https://llmstxt.org/). One section per major area, with absolute URLs.
 */

import { getIdentity } from "@/lib/portfolio/identity"
import { getAllProjects } from "@/lib/portfolio/projects"
import { SITE_URL } from "@/config/constants"

export const dynamic = "force-static"

export function GET() {
  const identity = getIdentity()
  const projects = getAllProjects()

  const lines: string[] = []
  lines.push(`# ${identity.canonicalName} — Portfolio`)
  lines.push("")
  lines.push(`> ${identity.shortBio}`)
  lines.push("")
  lines.push(`Also indexed as: ${identity.alternateName.join(", ")}.`)
  lines.push("")
  lines.push("## About")
  lines.push(`- [About](${SITE_URL}/about) — biography, identity, experience, achievements`)
  lines.push(`- [Accessible Portfolio Hub](${SITE_URL}/portfolio) — semantic, no-JS-required map of the entire site`)
  lines.push("")
  lines.push("## Projects")
  lines.push(`A curated list of ${projects.length} open-source projects. Each project has its own URL.`)
  lines.push(`- [All Projects](${SITE_URL}/projects)`)
  lines.push("")
  for (const project of projects) {
    const tagline = project.shortDescription.split(".")[0]
    lines.push(`- [${project.title}](${SITE_URL}/projects/${project.slug}) — ${tagline}`)
  }
  lines.push("")
  lines.push("## Skills, Experience, Achievements, Education, Contact")
  lines.push(`- [Skills](${SITE_URL}/skills)`)
  lines.push(`- [Experience](${SITE_URL}/experience)`)
  lines.push(`- [Education](${SITE_URL}/education)`)
  lines.push(`- [Achievements](${SITE_URL}/achievements)`)
  lines.push(`- [Contact](${SITE_URL}/contact)`)
  lines.push("")
  lines.push("## Optional machine-readable resources")
  lines.push(`- [content.json](${SITE_URL}/content.json)`)
  lines.push(`- [content.txt](${SITE_URL}/content.txt)`)
  lines.push(`- [llms-full.txt](${SITE_URL}/llms-full.txt)`)
  lines.push("")
  lines.push("## Top-level identity")
  lines.push(`- Canonical name: ${identity.canonicalName}`)
  lines.push(`- Role: ${identity.jobTitle}`)
  lines.push(`- Location: ${identity.location.city}, ${identity.location.country}`)
  lines.push(`- Email: ${identity.email}`)
  lines.push(`- GitHub: ${identity.sameAs.find((u) => u.includes("github")) ?? ""}`)
  lines.push(`- LinkedIn: ${identity.sameAs.find((u) => u.includes("linkedin")) ?? ""}`)
  lines.push("")

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
