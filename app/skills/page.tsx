import type { Metadata } from "next"
import Link from "next/link"
import { PageShell, Breadcrumbs } from "@/components/seo/page-shell"
import { JsonLd, breadcrumbsSchema, personSchema } from "@/lib/portfolio/json-ld"
import { getSkills } from "@/lib/portfolio/content"
import { SITE_URL } from "@/config/constants"

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skillset of Kazim Abbas (FedxD): Python, Django, Django REST Framework, PostgreSQL, Redis, Celery, Docker, React 19, TypeScript, WebSockets, Deepgram, ElevenLabs, Groq, Anthropic, PySide6, Wayland/PipeWire.",
  alternates: { canonical: "/skills" },
  openGraph: {
    title: "Skills — Kazim Abbas (FedxD)",
    description: "Backend, AI/voice, Linux desktop, and DevOps toolkit in one place.",
    url: `${SITE_URL}/skills`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills — Kazim Abbas (FedxD)",
    description: "Backend, AI/voice, Linux desktop, and DevOps toolkit.",
  },
}

export default function SkillsPage() {
  const skills = getSkills()

  const breadcrumbs = breadcrumbsSchema([
    { name: "Home", path: "/" },
    { name: "Skills", path: "/skills" },
  ])

  return (
    <PageShell>
      <JsonLd schema={personSchema()} />
      <JsonLd schema={breadcrumbs} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Skills" }]} />

      <header className="mb-12">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Skills & Expertise
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          {skills.header.subtitle}
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {skills.stats.map((s) => (
            <li key={s.label} className="rounded-lg border border-border bg-card p-4 text-center">
              <div className="font-mono text-2xl font-bold text-primary">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </li>
          ))}
        </ul>
      </header>

      <div className="space-y-10">
        {skills.categories.map((cat) => (
          <section key={cat.title} aria-labelledby={`skill-${cat.title}`}>
            <h2 id={`skill-${cat.title}`} className="mb-4 font-mono text-sm font-semibold tracking-wide text-primary uppercase">
              {cat.title}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cat.skills.map((s) => (
                <li key={s.name} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-medium">{s.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{s.level}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.max(0, Math.min(100, s.level))}%` }}
                      aria-hidden
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-xl border border-primary/40 bg-primary/5 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Open the interactive portfolio</h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/85">
          The same skills are also browseable inside the OS — open the Hire window or type{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">about</code> in the terminal.
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
