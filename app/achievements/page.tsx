import type { Metadata } from "next"
import Link from "next/link"
import { PageShell, Breadcrumbs } from "@/components/seo/page-shell"
import { JsonLd, breadcrumbsSchema } from "@/lib/portfolio/json-ld"
import { getAchievements } from "@/lib/portfolio/content"
import { SITE_URL } from "@/config/constants"

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Awards and recognitions earned by Kazim Abbas (FedxD): Best Use of AI at AI Preneur '26 (TeachBack) and 2nd Place at NASA Space Apps Challenge Karachi 2025 (Skyntel).",
  alternates: { canonical: "/achievements" },
  openGraph: {
    title: "Achievements — Kazim Abbas (FedxD)",
    description: "AI Preneur '26 (Best Use of AI) and NASA Space Apps '25 (2nd Place).",
    url: `${SITE_URL}/achievements`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievements — Kazim Abbas (FedxD)",
    description: "AI Preneur '26 (Best Use of AI) and NASA Space Apps '25 (2nd Place).",
  },
}

export default function AchievementsPage() {
  const achievements = getAchievements()

  const breadcrumbs = breadcrumbsSchema([
    { name: "Home", path: "/" },
    { name: "Achievements", path: "/achievements" },
  ])

  return (
    <PageShell>
      <JsonLd schema={breadcrumbs} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Achievements" }]} />

      <header className="mb-12">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Achievements
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          {achievements.header.subtitle}
        </p>
      </header>

      <ul className="grid gap-6 lg:grid-cols-2">
        {achievements.achievements.map((ach) => (
          <li key={ach.title} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-xs text-secondary-foreground">
                  {ach.year}
                </span>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">{ach.title}</h2>
                <p className="mt-1 text-sm text-primary font-mono">{ach.position} · {ach.badge}</p>
              </div>
              <span aria-hidden className="text-3xl">🏆</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-foreground/85">{ach.description}</p>

            {ach.highlights.length > 0 && (
              <>
                <h3 className="mt-5 text-xs font-semibold text-primary uppercase tracking-wide font-mono">Highlights</h3>
                <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-foreground/85">
                  {ach.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </>
            )}

            {ach.tech.length > 0 && (
              <p className="mt-4 flex flex-wrap gap-1.5 text-xs">
                {ach.tech.map((t) => (
                  <span key={t} className="rounded-md bg-muted px-2 py-0.5 font-mono text-muted-foreground">
                    {t}
                  </span>
                ))}
              </p>
            )}

            {ach.link && (
              <a
                href={ach.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-mono text-sm text-primary underline-offset-4 hover:underline"
              >
                Project source ↗
              </a>
            )}
          </li>
        ))}
      </ul>

      {achievements.certifications.length > 0 && (
        <section aria-labelledby="certs-heading" className="mt-16">
          <h2 id="certs-heading" className="mb-4 font-mono text-sm font-semibold tracking-wide text-primary uppercase">
            Continuous learning
          </h2>
          <ul>
            {achievements.certifications.map((c) => (
              <li key={c.title} className="rounded-lg border border-border bg-card p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-semibold">{c.title}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{c.year}</span>
                </div>
                <p className="mt-1 text-sm text-foreground/80">{c.description}</p>
                <p className="mt-2 text-sm text-foreground/70">Issuer: {c.issuer}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-16 rounded-xl border border-primary/40 bg-primary/5 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Open the interactive portfolio</h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/85">
          The trophy screen also lives inside the OS — open it from the About window.
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
