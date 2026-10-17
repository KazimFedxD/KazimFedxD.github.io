import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell, Breadcrumbs } from "@/components/seo/page-shell"
import { JsonLd, breadcrumbsSchema, projectSchema } from "@/lib/portfolio/json-ld"
import { getAllProjectSlugs, getProject } from "@/lib/portfolio/projects"
import { SITE_URL } from "@/config/constants"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.description.slice(0, 220),
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${project.shortDescription.split(".")[0]}`,
      description: project.description.slice(0, 220),
      url: `${SITE_URL}/projects/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Kazim Abbas (FedxD)`,
      description: project.description.slice(0, 220),
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  // ponytail: defensive defaults — projects without a complete -data.js
  // bundle (e.g. Skyntel, FedxD-PiPy, FxChange) intentionally render with
  // sparse sections rather than crashing the prerender pass.
  const safe = {
    tech: project.tech ?? [],
    features: project.features ?? [],
    overview: project.overview ?? {
      description: project.description,
      problemIntro: "",
      problemStatement: [] as string[],
      howWeSolve: [] as { problem: string; solution: string; benefit: string }[],
      targetAudience: [] as string[],
      uniqueFeatures: [] as { icon: string; title: string; points: string[] }[],
      useCases: [] as string[],
    },
    mainFlow: project.mainFlow ?? { title: "", subtitle: "", description: "", oneLiner: "", steps: [], corePrinciples: [] },
    requirements: project.requirements ?? { os: [], hardware: { minimum: { ram: "", cpu: "", disk: "" }, recommended: { ram: "", cpu: "", disk: "" } }, software: [], externalServices: [] },
  }

  const schema = projectSchema(project)
  const breadcrumbs = breadcrumbsSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${project.slug}` },
  ])

  return (
    <PageShell>
      <JsonLd schema={schema} />
      <JsonLd schema={breadcrumbs} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />

      <article>
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {project.badge && (
              <span className="rounded-full bg-secondary px-3 py-1 font-mono text-secondary-foreground">
                {project.badge}
              </span>
            )}
            <span className="rounded-full bg-muted px-3 py-1 font-mono text-muted-foreground capitalize">
              {project.status === "shipped" ? "Live / Open Source" : project.status.replace("-", " ")}
            </span>
          </div>
          <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-7 text-muted-foreground">
            {project.shortDescription}
          </p>
          {project.github && (
            <p className="mt-4 text-sm">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-primary underline-offset-4 hover:underline"
              >
                Source on GitHub ↗
              </a>
            </p>
          )}
        </header>

        <section aria-labelledby="overview-heading" className="rounded-xl border border-border bg-card p-6">
          <h2 id="overview-heading" className="text-2xl font-semibold tracking-tight">
            Overview
          </h2>
          <p className="mt-3 leading-7 text-foreground/90">{project.description}</p>
        </section>

        {safe.tech.length > 0 && (
          <section aria-labelledby="tech-heading" className="mt-10">
            <h2 id="tech-heading" className="mb-3 text-xl font-semibold tracking-tight">
              Technology stack
            </h2>
            <ul className="flex flex-wrap gap-2">
              {safe.tech.map((t) => (
                <li key={t} className="rounded-md bg-secondary px-3 py-1 font-mono text-sm text-secondary-foreground">
                  {t}
                </li>
              ))}
            </ul>
          </section>
        )}

        {safe.overview.problemStatement.length > 0 && (
          <section aria-labelledby="problem-heading" className="mt-10">
            <h2 id="problem-heading" className="mb-3 text-xl font-semibold tracking-tight">
              Problem it solves
            </h2>
            {safe.overview.problemIntro && (
              <p className="mb-3 text-sm text-muted-foreground">{safe.overview.problemIntro}</p>
            )}
            <ul className="ml-5 list-disc space-y-1 text-foreground/85">
              {safe.overview.problemStatement.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </section>
        )}

        {safe.overview.howWeSolve.length > 0 && (
          <section aria-labelledby="solution-heading" className="mt-10">
            <h2 id="solution-heading" className="mb-4 text-xl font-semibold tracking-tight">
              How it solves the problem
            </h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              {(safe.overview.howWeSolve ?? []).map((s, i) => (
                <div key={i} className="rounded-lg border border-border bg-card/60 p-4">
                  <dt className="font-mono text-xs uppercase tracking-wide text-primary">Problem</dt>
                  <dd className="mt-1 text-sm text-foreground/85">{s.problem}</dd>
                  <dt className="mt-3 font-mono text-xs uppercase tracking-wide text-primary">Solution</dt>
                  <dd className="mt-1 text-sm text-foreground/85">{s.solution}</dd>
                  <dt className="mt-3 font-mono text-xs uppercase tracking-wide text-primary">Benefit</dt>
                  <dd className="mt-1 text-sm text-foreground/85">{s.benefit}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {safe.features.length > 0 && (
          <section aria-labelledby="features-heading" className="mt-10">
            <h2 id="features-heading" className="mb-4 text-xl font-semibold tracking-tight">
              Features
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {safe.features.slice(0, 8).map((f) => (
                <li key={f.id} className="rounded-lg border border-border p-4">
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-foreground/80">{f.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.architecture.description && (
          <section aria-labelledby="architecture-heading" className="mt-10">
            <h2 id="architecture-heading" className="mb-3 text-xl font-semibold tracking-tight">
              Technical architecture
            </h2>
            <p className="max-w-3xl leading-7 text-foreground/85">{project.architecture.description}</p>
          </section>
        )}

        {safe.mainFlow.steps.length > 0 && (
          <section aria-labelledby="flow-heading" className="mt-10">
            <h2 id="flow-heading" className="mb-3 text-xl font-semibold tracking-tight">
              {safe.mainFlow.title || "How it works"}
            </h2>
            {safe.mainFlow.description && (
              <p className="mb-3 text-sm text-muted-foreground">{safe.mainFlow.description}</p>
            )}
            {safe.mainFlow.oneLiner && (
              <p className="mb-4 max-w-3xl rounded-md bg-muted/40 p-3 font-mono text-sm text-foreground">
                {safe.mainFlow.oneLiner}
              </p>
            )}
            <ol className="space-y-2 text-sm">
              {safe.mainFlow.steps.map((s) => (
                <li key={s.step} className="rounded-md border border-border bg-card/30 p-3">
                  <span className="font-mono text-xs font-semibold text-primary">Step {s.step} · </span>
                  <span className="font-semibold">{s.action}</span>
                  {s.description && <span className="ml-1 text-muted-foreground">— {s.description}</span>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {safe.overview.targetAudience.length > 0 && (
          <section aria-labelledby="audience-heading" className="mt-10">
            <h2 id="audience-heading" className="mb-3 text-xl font-semibold tracking-tight">
              Who it&apos;s for
            </h2>
            <ul className="ml-5 list-disc space-y-1 text-foreground/85">
              {safe.overview.targetAudience.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </section>
        )}

        {safe.requirements.os.length > 0 && (
          <section aria-labelledby="requirements-heading" className="mt-10">
            <h2 id="requirements-heading" className="mb-3 text-xl font-semibold tracking-tight">
              Requirements
            </h2>
            <ul className="ml-5 list-disc space-y-1 text-foreground/85">
              {(safe.requirements.os ?? []).map((o, i) => (
                <li key={i}>
                  <span className="font-medium">{o.name}</span>
                  {o.notes && <span className="text-muted-foreground"> — {o.notes}</span>}
                </li>
              ))}
              {(safe.requirements.software ?? []).map((s, i) => (
                <li key={`sw-${i}`}>
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted-foreground"> {s.version}</span>
                </li>
              ))}
              {(safe.requirements.externalServices ?? []).map((s, i) => (
                <li key={`es-${i}`}>
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted-foreground"> — {s.purpose}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(project.status === "alpha" || project.hasLongForm === false) && (
          <aside className="mt-10 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-foreground/85">
            <strong className="font-mono text-yellow-400">Note</strong> · This project page is rendered from
            fields that are populated in the project&apos;s data source. Sections that were not yet authored are
            intentionally omitted rather than fabricated.
          </aside>
        )}

        <section className="mt-16 rounded-xl border border-primary/40 bg-primary/5 p-6">
          <h2 className="text-xl font-semibold tracking-tight">Open the interactive portfolio</h2>
          <p className="mt-2 max-w-2xl text-sm text-foreground/85">
            These same project details are also browsable inside the simulated OS — windows, scrollback,
            resume download, and a terminal command set.
          </p>
          <Link
            href={SITE_URL}
            className="mt-4 inline-block rounded-md border border-primary bg-primary px-4 py-2 font-mono text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Open Interactive Portfolio →
          </Link>
        </section>
      </article>
    </PageShell>
  )
}
