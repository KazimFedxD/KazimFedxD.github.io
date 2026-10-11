import type { Metadata } from "next"
import Link from "next/link"
import { PageShell, Breadcrumbs } from "@/components/seo/page-shell"
import { JsonLd, breadcrumbsSchema, collectionSchema } from "@/lib/portfolio/json-ld"
import { getAllProjects } from "@/lib/portfolio/projects"
import { SITE_URL } from "@/config/constants"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open-source projects by Kazim Abbas (FedxD): TeachBack (Best Use of AI '26), Skyntel (NASA Space Apps '25, 2nd place), FedxD Data Container (FxDC), FxPy, FeXoBot, FxQuest, FinCore, Full-Stack Template, and more.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Kazim Abbas (FedxD)",
    description: "Open-source projects spanning web backends, AI voice pipelines, Discord bots, custom languages, and Linux desktop tools.",
    url: `${SITE_URL}/projects`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Kazim Abbas (FedxD)",
    description: "Open-source projects by Kazim Abbas (FedxD).",
  },
}

export default function ProjectsIndexPage() {
  const projects = getAllProjects()

  const collection = collectionSchema({
    name: "Projects by Kazim Abbas (FedxD)",
    description:
      "A curated list of open-source projects built by Kazim Abbas (FedxD): voice-first learning, weather AI, Python serialization, custom language interpreters, Discord game bots, and full-stack templates.",
    urlPath: "/projects",
    items: projects.map((p) => ({
      slug: p.slug,
      name: p.title,
      type: p.github ? "SoftwareSourceCode" : "CreativeWork",
    })),
  })
  const breadcrumbs = breadcrumbsSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ])

  return (
    <PageShell>
      <JsonLd schema={collection} />
      <JsonLd schema={breadcrumbs} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />

      <header className="mb-12">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          {projects.length} open-source projects built by Kazim Abbas (FedxD) — production-grade systems,
          award winners, and language runtimes. Each project page has its own URL with full context, tech
          stack, and engineering notes.
        </p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug} className="rounded-xl border border-border bg-card p-6 transition hover:border-primary/50">
            <article>
              <header className="mb-3 flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {project.title}
                  </Link>
                </h2>
                {project.badge && (
                  <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 font-mono text-xs text-secondary-foreground">
                    {project.badge}
                  </span>
                )}
              </header>
              <p className="text-sm leading-6 text-foreground/85">{project.shortDescription}</p>
              <p className="mt-3 flex flex-wrap gap-1.5 text-xs">
                {project.tech.slice(0, 6).map((t) => (
                  <span key={t} className="rounded-md bg-muted px-2 py-0.5 font-mono text-muted-foreground">
                    {t}
                  </span>
                ))}
              </p>
              <p className="mt-4 flex items-center justify-between text-sm">
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-mono font-semibold text-primary underline-offset-4 hover:underline"
                  aria-label={`Read more about ${project.title}`}
                >
                  Read more →
                </Link>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Source ↗
                  </a>
                )}
              </p>
            </article>
          </li>
        ))}
      </ul>

      <section className="mt-16 rounded-xl border border-primary/40 bg-primary/5 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Open the interactive portfolio</h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/85">
          The same projects are also browsable inside the simulated OS — open windows, scroll long descriptions,
          and play with the controls.
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
