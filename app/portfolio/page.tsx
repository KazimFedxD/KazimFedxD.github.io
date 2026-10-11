/**
 * /portfolio — accessible hub page that mirrors the OS shell in semantic HTML.
 * Linked from the homepage sr-only fallback and the not-found page. Acts as
 * the primary entry point for search engines and AI crawlers.
 */

import type { Metadata } from "next"
import Link from "next/link"
import { PageShell, Breadcrumbs } from "@/components/seo/page-shell"
import { JsonLd, breadcrumbsSchema, personSchema, websiteSchema } from "@/lib/portfolio/json-ld"
import { getAchievements, getBiography, getExperience, getSkills } from "@/lib/portfolio/content"
import { getIdentity } from "@/lib/portfolio/identity"
import { getAllProjects } from "@/lib/portfolio/projects"
import { SITE_URL } from "@/config/constants"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "An accessible, no-JS index of Kazim Abbas's (FedxD) portfolio: identity, projects, skills, experience, education, achievements, and contact details. The same content is also available as an interactive OS-style portfolio at the homepage.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio — Kazim Abbas (FedxD)",
    description: "An accessible index of projects, skills, achievements, experience, and contact details.",
    url: `${SITE_URL}/portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Kazim Abbas (FedxD)",
    description: "Accessible portfolio index — same data as the OS, no JS required.",
  },
}

export default function PortfolioHubPage() {
  const identity = getIdentity()
  const biography = getBiography()
  const skills = getSkills()
  const experience = getExperience()
  const achievements = getAchievements()
  const projects = getAllProjects()

  const breadcrumbs = breadcrumbsSchema([
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
  ])

  const topSkills = skills.categories.flatMap((c) => c.skills.map((s) => s.name)).slice(0, 16)

  return (
    <PageShell>
      <JsonLd schema={breadcrumbs} />
      <JsonLd schema={personSchema()} />
      <JsonLd schema={websiteSchema()} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Portfolio" }]} />

      <header className="mb-12">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          {identity.canonicalName} · Portfolio
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {identity.jobTitle} · {identity.location.city}, Pakistan
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-foreground/90">
          {identity.shortBio}
        </p>
      </header>

      <Section
        title="Who I am"
        summary="Backend engineer and applied-AI builder based in Karachi, Pakistan. Self-taught through 2023-24, then shipped NASA-grade projects by 2025."
        href="/about"
        cta="Full biography"
      >
        <p className="leading-7 text-foreground/85">{extractLead(biography)}</p>
      </Section>

      <Section title="Projects" summary={`${projects.length} open-source projects. Built in Python, TypeScript, and C++ across web backends, AI/voice pipelines, Discord bots, custom languages, and Linux desktop tools.`} href="/projects" cta="Browse all projects">
        <ul className="grid gap-2 sm:grid-cols-2">
          {projects.slice(0, 6).map((p) => (
            <li key={p.slug} className="text-sm">
              <Link href={`/projects/${p.slug}`} className="text-primary underline-offset-4 hover:underline">
                {p.title}
              </Link>
              <span className="text-muted-foreground"> — {p.shortDescription.split(".")[0]}.</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Skills" summary={`${topSkills.length} highlighted skills across ${skills.categories.length} categories.`} href="/skills" cta="Full skill breakdown">
        <ul className="flex flex-wrap gap-2">
          {topSkills.map((s) => (
            <li key={s} className="rounded-md bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground">
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Experience"
        summary={`${experience.experiences.length} documented roles`}
        href="/experience"
        cta="Full timeline"
      >
        <ul className="space-y-1 text-sm text-foreground/85">
          {experience.experiences.map((exp) => (
            <li key={`${exp.company}-${exp.role}`}>
              <span className="font-mono text-xs text-muted-foreground">{exp.period}</span> — {exp.role}, {exp.company}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Achievements"
        summary={`${achievements.achievements.length} awards.`}
        href="/achievements"
        cta="Full achievements"
      >
        <ul className="space-y-1 text-sm text-foreground/85">
          {achievements.achievements.map((a) => (
            <li key={a.title}>
              <span className="font-mono text-xs text-muted-foreground">{a.year}</span> —{" "}
              <span className="font-semibold">{a.title}</span>
              <span className="text-muted-foreground"> · {a.position}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Education" summary="Bachelor of Software Engineering in progress (BUKC, 2026-2030), intermediate and matriculation, plus parallel self-taught learning." href="/education" cta="Full education">
        <p className="text-sm text-foreground/85">Currently in Semester 1 of the BSe program at Bahria University Karachi Campus (2026-2030), enrolled in parallel with continuous self-teaching since 2023.</p>
      </Section>

      <Section title="Contact" summary="Email, GitHub, LinkedIn — replies within 24-48 hours." href="/contact" cta="Contact details">
        <p className="text-sm text-foreground/85">Open to remote backend roles, freelance work, contract assignments, and interesting collaborations.</p>
      </Section>

      <section className="mt-16 rounded-xl border border-primary/40 bg-primary/5 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Open the interactive portfolio</h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/85">
          The full experience — including the boot sequence, terminal command set, and project windows —
          lives inside a simulated operating system at the homepage.
        </p>
        <Link
          href={SITE_URL}
          className="mt-4 inline-block rounded-md border border-primary bg-primary px-4 py-2 font-mono text-sm font-semibold text-primary-foreground transition hover:brightness-110"
        >
          Open Interactive Portfolio →
        </Link>
      </section>
    </PageShell>
  )
}

function Section({
  title,
  summary,
  href,
  cta,
  children,
}: {
  title: string
  summary: string
  href: string
  cta: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{summary}</p>
      <div className="mt-4 max-w-3xl">{children}</div>
      <p className="mt-4">
        <Link href={href} className="font-mono text-sm text-primary underline-offset-4 hover:underline">
          {cta} →
        </Link>
      </p>
    </section>
  )
}

// Read the first paragraph of about.md.
function extractLead(md: string): string {
  const lines = (md ?? "").split(/\r?\n/)
  const collected: string[] = []
  let inHeading = true
  for (const line of lines) {
    const t = line.trim()
    if (!t) {
      if (collected.length > 0) break
      continue
    }
    if (t.startsWith("# ")) {
      inHeading = true
      collected.length = 0
      continue
    }
    if (t.startsWith("## ")) break
    if (t.startsWith("> ")) continue
    collected.push(t.replace(/\*\*([^*]+)\*\*/g, "$1"))
  }
  return collected.join(" ").trim()
}
