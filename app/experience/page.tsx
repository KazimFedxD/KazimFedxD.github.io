import type { Metadata } from "next"
import Link from "next/link"
import { PageShell, Breadcrumbs } from "@/components/seo/page-shell"
import { JsonLd, breadcrumbsSchema } from "@/lib/portfolio/json-ld"
import { getExperience } from "@/lib/portfolio/content"
import { SITE_URL } from "@/config/constants"

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Kazim Abbas (FedxD): backend and content creation roles across KayzBlog and Disutils, plus leadership and growth skills gained.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience — Kazim Abbas (FedxD)",
    description: "Backend engineering and content creation experience timeline.",
    url: `${SITE_URL}/experience`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience — Kazim Abbas (FedxD)",
    description: "Backend engineering and content creation timeline.",
  },
}

export default function ExperiencePage() {
  const experience = getExperience()

  const breadcrumbs = breadcrumbsSchema([
    { name: "Home", path: "/" },
    { name: "Experience", path: "/experience" },
  ])

  return (
    <PageShell>
      <JsonLd schema={breadcrumbs} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Experience" }]} />

      <header className="mb-12">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Experience
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          {experience.header.subtitle}
        </p>
      </header>

      <ol className="space-y-10 border-l border-border pl-6">
        {experience.experiences.map((exp) => (
          <li key={`${exp.company}-${exp.role}`} className="relative">
            <span className="absolute -left-[27px] top-1 inline-block h-3 w-3 rounded-full bg-primary ring-4 ring-background" aria-hidden />
            <div className="text-sm font-mono text-muted-foreground">{exp.period}{exp.current && " · Current"}</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">{exp.role}</h2>
            <p className="mt-1 text-base text-foreground/80">
              <span className="font-medium">{exp.company}</span> · <span className="text-muted-foreground">{exp.type}</span> · {exp.location}
            </p>
            <p className="mt-3 max-w-3xl leading-7 text-foreground/85">{exp.description}</p>

            <h3 className="mt-5 text-sm font-semibold text-primary uppercase tracking-wide font-mono">Responsibilities</h3>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-foreground/85">
              {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
            </ul>

            <h3 className="mt-5 text-sm font-semibold text-primary uppercase tracking-wide font-mono">Achievements</h3>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-foreground/85">
              {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
            </ul>

            <p className="mt-4 flex flex-wrap gap-1.5 text-xs">
              {exp.tech.map((t) => (
                <span key={t} className="rounded-md bg-muted px-2 py-0.5 font-mono text-muted-foreground">
                  {t}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ol>

      <section aria-labelledby="skills-gained-heading" className="mt-16">
        <h2 id="skills-gained-heading" className="mb-4 text-2xl font-semibold tracking-tight">
          Skills gained
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {experience.skillsGained.map((sg) => (
            <div key={sg.category} className="rounded-lg border border-border bg-card p-5">
              <h3 className="mb-3 font-mono text-sm font-semibold tracking-wide text-primary uppercase">
                {sg.category}
              </h3>
              <ul className="space-y-1 text-sm text-foreground/85">
                {sg.items.map((it) => <li key={it}>· {it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-xl border border-primary/40 bg-primary/5 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Open the interactive portfolio</h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/85">
          Run <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">about</code> in the OS terminal
          for an in-window timeline.
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
