/**
 * /content.txt — Plain-text mirror of the portfolio for crawlers and AI
 * agents that prefer plain text over JSON or HTML.
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
import { getAllProjects } from "@/lib/portfolio/projects"
import { SITE_URL } from "@/config/constants"

export const dynamic = "force-static"

export function GET() {
  const identity = getIdentity()
  const projects = getAllProjects()
  const skills = getSkills()
  const experience = getExperience()
  const education = getEducation()
  const achievements = getAchievements()
  const contact = getContact()
  const biography = getBiography()

  const lines: string[] = []
  const push = (s = "") => {
    if (s) lines.push(s)
    lines.push("")
  }

  lines.push("FEDXD.NET — PORTFOLIO CONTENT")
  lines.push("=".repeat(60))
  push()
  push(`Site URL: ${SITE_URL}`)
  push(`Canonical name: ${identity.canonicalName}`)
  push(`Alternate names: ${identity.alternateName.join(", ")}`)
  push(`Role: ${identity.jobTitle}`)
  push(`Location: ${identity.location.city}, ${identity.location.country}`)
  push(`Email: ${identity.email}`)
  push(`SameAs:`)
  identity.sameAs.forEach((s) => push(`  - ${s}`))
  push(`Knows about:`)
  identity.knowsAbout.forEach((s) => push(`  - ${s}`))

  push("Biography")
  push("-".repeat(60))
  push(biography)

  push("Projects")
  push("-".repeat(60))
  projects.forEach((p) => {
    push(`${p.title}${p.badge ? ` — ${p.badge}` : ""}`)
    push(`URL: ${SITE_URL}/projects/${p.slug}`)
    push(`Description: ${p.shortDescription}`)
    if (p.github) push(`Repository: ${p.github}`)
    push(`Tech: ${p.tech.join(", ")}`)
    if (p.features.length) push(`Features:`)
    p.features.slice(0, 6).forEach((f) => {
      const feature = typeof f === "string" ? f : f
      push(`  - ${feature}`)
    })
    push()
  })

  push("Skills")
  push("-".repeat(60))
  skills.categories.forEach((cat) => {
    push(`${cat.title}:`)
    cat.skills.forEach((s) => push(`  - ${s.name} (${s.level}%)`))
    push()
  })

  push("Experience")
  push("-".repeat(60))
  experience.experiences.forEach((exp) => {
    push(`${exp.period} — ${exp.role}, ${exp.company}`)
    push(`Type: ${exp.type} · ${exp.location}`)
    push(exp.description)
    push(`Achievements:`)
    exp.achievements.forEach((a) => push(`  - ${a}`))
    push()
  })

  push("Education")
  push("-".repeat(60))
  education.formalEducation.forEach((ed) => {
    push(`${ed.period} — ${ed.degree} (${ed.institution}, ${ed.location})`)
    push(`Status: ${ed.status}`)
    push(ed.description)
    push()
  })

  push("Achievements")
  push("-".repeat(60))
  achievements.achievements.forEach((ach) => {
    push(`${ach.year} — ${ach.title}`)
    push(`Position: ${ach.position} · ${ach.badge}`)
    push(ach.description)
    if (ach.link) push(`Link: ${ach.link}`)
    push()
  })

  push("Contact")
  push("-".repeat(60))
  contact.contactInfo.forEach((c) => push(`${c.title}: ${c.value} (${c.link})`))
  push(`Response time: ${contact.responseTime}`)
  push(`Tags: ${contact.tags.join(", ")}`)

  push("Machine-readable endpoints")
  push("-".repeat(60))
  push(`/content.json — Structured JSON`)
  push(`/content.txt  — This file`)
  push(`/llms.txt      — Concise AI site index`)
  push(`/llms-full.txt — Extended AI site description`)

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
