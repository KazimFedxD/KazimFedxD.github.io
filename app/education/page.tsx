import type { Metadata } from "next"
import Link from "next/link"
import { PageShell, Breadcrumbs } from "@/components/seo/page-shell"
import { JsonLd, breadcrumbsSchema } from "@/lib/portfolio/json-ld"
import { getEducation } from "@/lib/portfolio/content"
import { SITE_URL } from "@/config/constants"

export const metadata: Metadata = {
  title: "Education",
  description:
    "Education path of Kazim Abbas (FedxD): BSe Software Engineering at Bahria University Karachi Campus (BUKC, 2026-2030), Intermediate Computer Science (Fatimiyah Boys College), and parallel self-taught learning.",
  alternates: { canonical: "/education" },
  openGraph: {
    title: "Education — Kazim Abbas (FedxD)",
    description: "Bachelor's program and self-taught learning trajectory.",
    url: `${SITE_URL}/education`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Education — Kazim Abbas (FedxD)",
    description: "Bachelor's program and self-taught learning trajectory.",
  },
}

export default function EducationPage() {
  const education = getEducation()

  const breadcrumbs = breadcrumbsSchema([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
  ])

  return (
    <PageShell>
      <JsonLd schema={breadcrumbs} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Education" }]} />

      <header className="mb-12">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Education
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          {education.header.subtitle}
        </p>
      </header>

      <section aria-labelledby="formal-heading" className="mb-16">
        <h2 id="formal-heading" className="mb-6 font-mono text-sm font-semibold tracking-wide text-primary uppercase">
          Formal education
        </h2>
        <ul className="space-y-8">
          {education.formalEducation.map((ed) => (
            <li key={ed.degree} className="rounded-xl border border-border bg-card p-6">
              <div className="text-sm font-mono text-muted-foreground">{ed.period}{ed.current && " · Current"}</div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{ed.degree}</h3>
              <p className="mt-1 text-sm text-foreground/85">
                <span className="font-medium">{ed.institution}</span> · {ed.location}
              </p>
              <p className="mt-3 max-w-3xl text-sm text-foreground/80">{ed.description}</p>
              {ed.courses.length > 0 && (
                <>
                  <h4 className="mt-4 text-xs font-semibold text-primary uppercase tracking-wide font-mono">Coursework</h4>
                  <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-foreground/85">
                    {ed.courses.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </>
              )}
              <p className="mt-4 inline-block rounded-full bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground">
                {ed.status}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="self-heading" className="mb-16">
        <h2 id="self-heading" className="mb-6 font-mono text-sm font-semibold tracking-wide text-primary uppercase">
          Self-taught learning
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {education.selfLearning.map((sl) => (
            <article key={sl.category} className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-mono text-sm font-semibold text-primary uppercase tracking-wide">{sl.category}</h3>
              <ul className="mt-3 ml-5 list-disc space-y-1 text-sm text-foreground/85">
                {sl.topics.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="philosophy-heading" className="rounded-xl border border-primary/40 bg-primary/5 p-6">
        <h2 id="philosophy-heading" className="text-xl font-semibold tracking-tight">
          {education.philosophy.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-foreground/85">{education.philosophy.body}</p>
        <ul className="mt-4 flex flex-wrap gap-2 text-xs">
          {education.philosophy.tags.map((t) => (
            <li key={t} className="rounded-full bg-secondary px-3 py-1 font-mono text-secondary-foreground">
              {t}
            </li>
          ))}
        </ul>
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
