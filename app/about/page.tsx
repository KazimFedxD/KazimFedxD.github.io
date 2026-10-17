import type { Metadata } from "next"
import Link from "next/link"
import { PageShell, Breadcrumbs } from "@/components/seo/page-shell"
import { JsonLd, breadcrumbsSchema, personSchema, websiteSchema } from "@/lib/portfolio/json-ld"
import { getAchievements, getBiography, getContact, getExperience, getSkills } from "@/lib/portfolio/content"
import { getIdentity } from "@/lib/portfolio/identity"
import { SITE_URL } from "@/config/constants"

export const metadata: Metadata = {
  title: "About",
  description:
    "Kazim Abbas (FedxD) — backend and applied-AI engineer based in Karachi, Pakistan. Backend developer shipping production systems in Django, Python, and PostgreSQL; won Best Use of AI at AI Preneur '26 (TeachBack) and 2nd Place at NASA Space Apps '25 (Skyntel).",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Kazim Abbas (FedxD)",
    description:
      "Backend and applied-AI engineer based in Karachi, Pakistan. Bachelor of Software Engineering at Bahria University Karachi Campus. Open to remote backend roles.",
    url: `${SITE_URL}/about`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Kazim Abbas (FedxD)",
    description: "Backend and applied-AI engineer based in Karachi, Pakistan.",
  },
}

export default function AboutPage() {
  const identity = getIdentity()
  const skills = getSkills()
  const experience = getExperience()
  const achievements = getAchievements()
  const contact = getContact()
  const biography = getBiography()

  const breadcrumbs = breadcrumbsSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ])

  // Lightweight markdown → paragraph rendering. Preserves headings, lists,
  // and emphasis. Conservative on purpose — no HTML/script allowed.
  const sections = splitMarkdown(biography)

  return (
    <PageShell>
      <JsonLd schema={breadcrumbs} />
      <JsonLd schema={personSchema()} />
      <JsonLd schema={websiteSchema()} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <header className="mb-10">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          {identity.canonicalName}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{identity.jobTitle} · {identity.location.city}, Pakistan</p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-foreground/90">{identity.shortBio}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Also indexed as:&nbsp;
          {identity.alternateName.slice(0, 4).map((alias, i, arr) => (
            <span key={alias}>
              <span className="text-foreground/80">{alias}</span>
              {i < arr.length - 1 && <span aria-hidden> · </span>}
            </span>
          ))}.
        </p>
      </header>

      <section aria-labelledby="biography-heading" className="prose-invert max-w-none space-y-6">
        <h2 id="biography-heading" className="text-2xl font-semibold tracking-tight">
          Biography
        </h2>
        {sections.map((section, idx) => (
          <article key={idx}>
            {section.heading && (
              <h3 className="mb-3 mt-8 text-xl font-semibold tracking-tight text-foreground">
                {section.heading}
              </h3>
            )}
            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="leading-7 text-foreground/85">
                {p}
              </p>
            ))}
            {section.listItems.length > 0 && (
              <ul className="ml-5 list-disc space-y-1 text-foreground/85">
                {section.listItems.map((li, lIdx) => (
                  <li key={lIdx}>{li}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>

      <section aria-labelledby="skills-heading" className="mt-16">
        <h2 id="skills-heading" className="mb-4 text-2xl font-semibold tracking-tight">
          Skills & Tech
        </h2>
        <p className="mb-6 max-w-3xl text-sm text-muted-foreground">
          A working toolkit spanning backend systems, applied AI, and Linux desktop development.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.categories.slice(0, 4).map((cat) => (
            <article key={cat.title} className="rounded-lg border border-border bg-card p-5">
              <h3 className="mb-3 font-mono text-sm font-semibold tracking-wide text-primary uppercase">
                {cat.title}
              </h3>
              <ul className="flex flex-wrap gap-2 text-sm">
                {cat.skills.map((s) => (
                  <li key={s.name} className="rounded-full bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground">
                    {s.name}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm">
          <Link href="/skills" className="font-mono text-primary underline-offset-4 hover:underline">
            View all {skills.categories.length} categories →
          </Link>
        </p>
      </section>

      <section aria-labelledby="experience-heading" className="mt-16">
        <h2 id="experience-heading" className="mb-6 text-2xl font-semibold tracking-tight">
          Experience
        </h2>
        <ol className="space-y-6 border-l border-border pl-6">
          {experience.experiences.map((exp) => (
            <li key={`${exp.company}-${exp.role}`} className="relative">
              <span className="absolute -left-[27px] top-1 inline-block h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
              <div className="text-sm font-mono text-muted-foreground">{exp.period}</div>
              <h3 className="mt-1 text-lg font-semibold">{exp.role} · {exp.company}</h3>
              <p className="mt-1 text-sm text-foreground/80">{exp.description}</p>
              <ul className="mt-2 ml-5 list-disc text-sm text-foreground/80">
                {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
              <p className="mt-3 flex flex-wrap gap-2 text-xs">
                {exp.tech.map((t) => (
                  <span key={t} className="rounded-md bg-muted px-2 py-0.5 font-mono text-muted-foreground">
                    {t}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm">
          <Link href="/experience" className="font-mono text-primary underline-offset-4 hover:underline">
            Full experience timeline →
          </Link>
        </p>
      </section>

      <section aria-labelledby="achievements-heading" className="mt-16">
        <h2 id="achievements-heading" className="mb-6 text-2xl font-semibold tracking-tight">
          Awards & Recognition
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {achievements.achievements.map((ach) => (
            <li key={ach.title} className="rounded-lg border border-border bg-card p-5">
              <div className="text-sm font-mono text-muted-foreground">{ach.year}</div>
              <h3 className="mt-1 text-base font-semibold">{ach.title}</h3>
              <p className="mt-2 text-sm text-foreground/80">{ach.description}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm">
          <Link href="/achievements" className="font-mono text-primary underline-offset-4 hover:underline">
            More on achievements →
          </Link>
        </p>
      </section>

      <section aria-labelledby="contact-heading" className="mt-16">
        <h2 id="contact-heading" className="mb-4 text-2xl font-semibold tracking-tight">
          Get in touch
        </h2>
        <p className="max-w-2xl text-sm text-foreground/80">{contact.header.subtitle}</p>
        <p className="mt-4 text-sm">
          <Link href="/contact" className="font-mono text-primary underline-offset-4 hover:underline">
            Contact details →
          </Link>
        </p>
      </section>

      <section className="mt-16 rounded-xl border border-primary/40 bg-primary/5 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Open the interactive portfolio</h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/85">
          The same content above also lives inside a retro CRT-style operating system. Boot screen, terminal,
          project windows, and a few games.
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

// ============================================================
// Minimal markdown splitter for the bio page. The about.md file is the same
// shape used by the OS engine, so we never duplicate prose.
// ============================================================

interface BioSection {
  heading: string | null
  paragraphs: string[]
  listItems: string[]
}

function splitMarkdown(md: string): BioSection[] {
  if (!md) return []
  const lines = md.split(/\r?\n/)
  const sections: BioSection[] = []
  let current: BioSection = { heading: null, paragraphs: [], listItems: [] }
  let inList = false

  const flush = () => {
    if (current.heading || current.paragraphs.length || current.listItems.length) {
      sections.push(current)
    }
    current = { heading: null, paragraphs: [], listItems: [] }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim()) {
      if (inList) {
        inList = false
      }
      continue
    }
    if (line.startsWith("# ")) {
      flush()
      current.heading = line.slice(2).trim()
      continue
    }
    if (line.startsWith("## ")) {
      flush()
      current.heading = line.slice(3).trim()
      continue
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      inList = true
      current.listItems.push(line.slice(2).trim())
      continue
    }
    if (line.startsWith("> ")) {
      // Quote — treat as part of the running paragraph
      current.paragraphs.push(line.slice(2).trim())
      continue
    }
    current.paragraphs.push(line)
  }
  flush()
  return sections
}
