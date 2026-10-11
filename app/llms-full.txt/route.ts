/**
 * /llms-full.txt — Extended description of the portfolio for AI agents.
 * Markdown formatted. Sections mirror the HTML route structure so an LLM
 * can cross-reference between formats.
 */

import { getIdentity } from "@/lib/portfolio/identity"
import {
  getAchievements,
  getBiography,
  getContact,
  getEducation,
  getExperience,
  getSkills,
} from "@/lib/portfolio/content"
import { getAllProjectDetails } from "@/lib/portfolio/projects"
import { SITE_URL } from "@/config/constants"

export const dynamic = "force-static"

export function GET() {
  const identity = getIdentity()
  const biography = getBiography()
  const skills = getSkills()
  const experience = getExperience()
  const education = getEducation()
  const achievements = getAchievements()
  const contact = getContact()
  const projects = getAllProjectDetails()

  const lines: string[] = []
  const push = (s?: string) => {
    if (s !== undefined) lines.push(s)
    lines.push("")
  }

  lines.push(`# ${identity.canonicalName} — Portfolio`)
  push()
  lines.push(`Site URL: ${SITE_URL}`)
  lines.push(`Also indexed as: ${identity.alternateName.join(", ")}.`)
  push(`> ${identity.shortBio}`)
  push()

  lines.push("## Identity")
  push(`- Canonical name: ${identity.canonicalName}`)
  push(`- Alternate names: ${identity.alternateName.join(", ")}`)
  push(`- Role: ${identity.jobTitle}`)
  push(`- Location: ${identity.location.city}, ${identity.location.country}`)
  push(`- Email: ${identity.email}`)
  push(`- GitHub: ${identity.sameAs.find((u) => u.includes("github")) ?? ""}`)
  push(`- LinkedIn: ${identity.sameAs.find((u) => u.includes("linkedin")) ?? ""}`)
  push(`- See structured data: ${SITE_URL}/about (with JSON-LD Person schema)`)
  push()

  lines.push("## Biography")
  push()
  lines.push(biography)
  push()

  lines.push("## Projects")
  push()

  for (const project of projects) {
    lines.push(`### ${project.title}`)
    if (project.badge) lines.push(`*${project.badge}*`)
    push()
    lines.push(project.description || project.shortDescription)
    push()
    lines.push(`- URL: ${SITE_URL}/projects/${project.slug}`)
    if (project.github) lines.push(`- Source: ${project.github}`)
    if (project.tech.length) lines.push(`- Tech: ${project.tech.join(", ")}`)
    push()
    lines.push("**What it does:**")
    push()
    lines.push(project.shortDescription)
    if (project.overview.problemStatement.length) {
      push()
      lines.push("**Problems it solves:**")
      push()
      for (const p of project.overview.problemStatement) lines.push(`- ${p}`)
    }
    if (project.features.length) {
      push()
      lines.push("**Features:**")
      push()
      for (const f of project.features.slice(0, 8)) {
        lines.push(`- **${f.title}**: ${f.description}`)
      }
    }
    push()
    lines.push("---")
    push()
  }

  lines.push("## Skills")
  push()
  for (const cat of skills.categories) {
    lines.push(`### ${cat.title}`)
    push()
    for (const s of cat.skills) lines.push(`- ${s.name} (${s.level}%)`)
    push()
  }
  push()
  lines.push(`Full breakdown: ${SITE_URL}/skills`)
  push()

  lines.push("## Experience")
  push()
  for (const exp of experience.experiences) {
    lines.push(`### ${exp.period} — ${exp.role}, ${exp.company}`)
    push()
    lines.push(exp.description)
    push()
    lines.push("**Achievements:**")
    push()
    for (const a of exp.achievements) lines.push(`- ${a}`)
    push()
    lines.push(`**Tech:** ${exp.tech.join(", ")}`)
    push()
  }
  push()
  lines.push(`Full timeline: ${SITE_URL}/experience`)
  push()

  lines.push("## Education")
  push()
  for (const ed of education.formalEducation) {
    lines.push(`### ${ed.degree} — ${ed.institution}`)
    lines.push(`*${ed.period}${ed.current ? " · Current" : ""}*`)
    push()
    lines.push(ed.description)
    push()
  }
  lines.push("### Self-taught learning")
  push()
  for (const sl of education.selfLearning) {
    lines.push(`**${sl.category}:**`)
    push()
    lines.push(sl.topics.join(", "))
    push()
  }
  push()
  lines.push(`Full details: ${SITE_URL}/education`)
  push()

  lines.push("## Achievements")
  push()
  for (const ach of achievements.achievements) {
    lines.push(`### ${ach.year} — ${ach.title}`)
    lines.push(`*${ach.position} · ${ach.badge}*`)
    push()
    lines.push(ach.description)
    push()
    if (ach.link) lines.push(`Project: ${ach.link}`)
    push()
  }
  push()

  lines.push("## Contact")
  push()
  for (const c of contact.contactInfo) lines.push(`- **${c.title}** — ${c.value} (${c.link})`)
  push()
  lines.push(`Response time: ${contact.responseTime}`)
  push()
  lines.push(`Interests: ${contact.tags.join(", ")}`)
  push()
  lines.push(`Full contact details: ${SITE_URL}/contact`)
  push()

  lines.push("## Machine-readable endpoints")
  push()
  lines.push(`- JSON: ${SITE_URL}/content.json`)
  lines.push(`- Plain text: ${SITE_URL}/content.txt`)
  lines.push(`- LLM index (this file): ${SITE_URL}/llms.txt`)
  lines.push(`- LLM full description: ${SITE_URL}/llms-full.txt`)
  push()

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
