/**
 * Project data accessors — single source of truth for SEO routes, sitemap,
 * and machine-readable endpoints.
 *
 * Imports every `<project>-data.js` bundle statically (the OS engine does
 * the same — webpack picks them up at build time and tree-shakes unused
 * fields). Projects that don't have a bundle (FxChange, Webstore, FedxD-PiPy,
 * Skyntel) are resolved from `projectsData.js` + `links.json` only.
 */

import { projectsData, projectsWithDetails } from "@/portfolio_data/projectsData"
import links from "@/portfolio_data/links.json"

import { fedxdDataContainerData } from "@/portfolio_data/fedxd-data-container-data"
import { fexobotData } from "@/portfolio_data/fexobot-data"
import { fincoreData } from "@/portfolio_data/fincore-data"
import { fullStackTemplateData } from "@/portfolio_data/fullstack-template-data"
import { fxpyData } from "@/portfolio_data/fxpy-data"
import { fxquestData } from "@/portfolio_data/fxquest-data"
import { portfolioWebsiteData } from "@/portfolio_data/portfolio-website-data"
import { teachbackData } from "@/portfolio_data/teachback-data"
import { voiceMatterData } from "@/portfolio_data/voicematter-data"

import { findProjectBySlug, getAllProjectSlugs, projectPath, slugify } from "@/lib/portfolio/slugs"
import type { ProjectDetail, ProjectFeature, ProjectSummary } from "@/lib/portfolio/types"

// ============================================================
// Long-form bundles keyed by URL slug. Static imports — typed loosely
// because real-world project bundles each have distinct shapes
// (VoiceMatter has TODO stubs, Full-Stack Template has `showcaseVideo`, etc.).
// We normalise to ProjectDetail below.
// ============================================================

type RawBundle = Record<string, unknown> & {
  title?: string
  shortDescription?: string
  github?: string
  liveDemo?: string
}

const LONG_FORM: Record<string, RawBundle> = {
  "fedxd-data-container-fxdc": fedxdDataContainerData as unknown as RawBundle,
  "fexobot": fexobotData as unknown as RawBundle,
  "fincore": fincoreData as unknown as RawBundle,
  "fullstack-template": fullStackTemplateData as unknown as RawBundle,
  "fxpy": fxpyData as unknown as RawBundle,
  "fxquest": fxquestData as unknown as RawBundle,
  "portfolio-website": portfolioWebsiteData as unknown as RawBundle,
  "teachback": teachbackData as unknown as RawBundle,
  "voicematter": voiceMatterData as unknown as RawBundle,
}

// ============================================================
// Public accessor API
// ============================================================

function inferStatus(title: string): ProjectSummary["status"] {
  const lower = title.toLowerCase()
  if (lower.includes("alpha") || lower.includes("v0.1") || lower.includes("v0.2")) return "alpha"
  if (lower === "voicematter") return "alpha"
  if (lower.includes("fincore") || lower.includes("webstore") || lower.includes("fxchange")) return "in-development"
  return "shipped"
}

function getRowFeatureTitles(title: string): string[] {
  return projectsData.find((p) => p.title === title)?.features ?? []
}

function projectHasBundle(title: string): boolean {
  return projectsWithDetails.includes(title)
}

function arr<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : []
}

function emptyBundle(title: string): RawBundle {
  const row = projectsData.find((p) => p.title === title)
  return {
    title,
    shortDescription: row?.description ?? "",
    github: row?.github ?? "",
    overview: { description: row?.description ?? "" },
  }
}

function pickFeatures(bundle: RawBundle): ProjectFeature[] {
  const raw = bundle.features as Array<{ id?: number; title?: string; icon?: string; description?: string }> | undefined
  if (!Array.isArray(raw)) return []
  return raw
    .filter((f) => f.title && f.description)
    .map((f) => ({
      id: typeof f.id === "number" ? f.id : 0,
      title: String(f.title),
      icon: String(f.icon ?? "Sparkles"),
      description: String(f.description),
    }))
}

function normaliseFeatureTitles(bundle: RawBundle, fallback: string[]): string[] {
  const fromBundle = pickFeatures(bundle).map((f) => f.title)
  if (fromBundle.length > 0) return fromBundle
  return fallback
}

export function getAllProjects(): ProjectSummary[] {
  return getAllProjectSlugs().map((slug) => {
    const row = findProjectBySlug(slug)
    const bundle = LONG_FORM[slug] ?? emptyBundle(row?.title ?? slug)
    const title = bundle.title ?? row?.title ?? slug
    const detail = normaliseToProjectDetail(slug, bundle, row)
    return {
      slug: detail.slug,
      title: detail.title,
      shortDescription: detail.shortDescription,
      description: detail.description,
      github: detail.github,
      tech: detail.tech,
      features: detail.featureTitles,
      badge: detail.badge,
      status: detail.status,
      hasLongForm: detail.hasLongForm,
    }
  })
}

export function getProject(slug: string): ProjectDetail | null {
  const row = findProjectBySlug(slug)
  if (!row) return null
  const bundle = LONG_FORM[slug] ?? emptyBundle(row.title)
  return normaliseToProjectDetail(slug, bundle, row)
}

export function getAllProjectDetails(): ProjectDetail[] {
  return getAllProjectSlugs().flatMap((slug) => {
    const detail = getProject(slug)
    return detail ? [detail] : []
  })
}

export function getRepoUrl(titleOrSlug: string): string | null {
  const slugMatch = projectsData.find((p) => slugify(p.title) === titleOrSlug)
  const fromRow = slugMatch?.github ?? null
  if (fromRow) return fromRow
  const byLinks = links as Record<string, string>
  return byLinks[titleOrSlug] ?? byLinks[slugMatch?.title ?? ""] ?? null
}

export { getAllProjectSlugs, projectPath }

// ============================================================
// Normalisation (raw bundle → ProjectDetail)
// ============================================================

function normaliseToProjectDetail(
  slug: string,
  bundle: RawBundle,
  fallbackRow: ReturnType<typeof findProjectBySlug>
): ProjectDetail {
  const title = bundle.title ?? fallbackRow?.title ?? slug
  const overview = (bundle.overview as Record<string, unknown> | undefined) ?? {}
  const architecture = (bundle.architecture as Record<string, unknown> | undefined) ?? {}
  const diagram = (architecture.diagram as Record<string, unknown> | undefined) ?? {}
  const howWeSolveRaw = arr<{ problem: string; solution: string; benefit: string }>(overview.howWeSolve)
  const uniqueFeaturesRaw = arr<{ icon: string; title: string; points: string[] }>(overview.uniqueFeatures)

  const featureObjects = pickFeatures(bundle)
  const fallbackFeatures = getRowFeatureTitles(title)
  const featureTitles = normaliseFeatureTitles(bundle, fallbackFeatures)

  return {
    slug,
    title,
    shortDescription: (bundle.shortDescription as string | undefined) ?? fallbackRow?.description ?? "",
    description:
      (typeof overview.description === "string" && overview.description.trim()) ||
      (bundle.shortDescription as string | undefined) ||
      fallbackRow?.description ||
      "",
    github: (bundle.github as string | undefined) || fallbackRow?.github || null,
    tech: (fallbackRow?.tech ?? []) as string[],
    features: featureObjects,
    featureTitles,
    badge: ((bundle.badges as { text: string }[] | undefined)?.[0]?.text ??
      (fallbackRow as { badge?: string } | null)?.badge ??
      null),
    status: inferStatus(title),
    hasLongForm: projectHasBundle(title),
    techStack: (bundle.techStack as { name: string; version: string; category: string }[] | undefined) ?? [],
    overview: {
      description:
        (typeof overview.description === "string" && overview.description.trim()) ||
        (fallbackRow?.description ?? ""),
      problemIntro: (overview.problemIntro as string | undefined) ?? "",
      problemStatement: arr<string>(overview.problemStatement),
      howWeSolve: howWeSolveRaw.filter((s) => s.problem && s.solution),
      targetAudience: arr<string>(overview.targetAudience),
      uniqueFeatures: uniqueFeaturesRaw.filter((u) => u.title),
      useCases: arr<string>(overview.useCases),
    },
    mainFlow: (() => {
      const mf = (bundle.mainFlow as Record<string, unknown> | undefined) ?? {}
      return {
        title: (mf.title as string | undefined) ?? "",
        subtitle: (mf.subtitle as string | undefined) ?? "",
        description: (mf.description as string | undefined) ?? "",
        oneLiner: (mf.oneLiner as string | undefined) ?? "",
        steps: arr<{ step: number; action: string; icon: string; description: string }>(mf.steps),
        corePrinciples: arr<string>(mf.corePrinciples),
      }
    })(),
    architecture: {
      description: (architecture.description as string | undefined) ?? "",
      servicesTitle: (architecture.servicesTitle as string | undefined) ?? "Services",
      servicesIntro: (architecture.servicesIntro as string | undefined) ?? "",
      diagram: {
        title: (diagram.title as string | undefined) ?? "",
        description: (diagram.description as string | undefined) ?? "",
        layers: (diagram.layers as unknown) ?? [],
      },
      services: arr<{ name: string; description: string; tech: string[] }>(architecture.services),
    },
    apiEndpoints: (bundle.apiEndpoints as ProjectDetail["apiEndpoints"] | undefined) ?? [],
    setupSteps: (bundle.setupSteps as ProjectDetail["setupSteps"] | undefined) ?? [],
    requirements: ((bundle.requirements as ProjectDetail["requirements"] | undefined) ?? {
      os: [],
      hardware: {
        minimum: { ram: "", cpu: "", disk: "" },
        recommended: { ram: "", cpu: "", disk: "" },
      },
      software: [],
      externalServices: [],
    }),
    knownIssues: arr<string>(bundle.knownIssues),
    futureEnhancements: arr<string>(bundle.futureEnhancements),
    relatedProjects: arr<string>(bundle.relatedProjects),
  }
}

// mainFlow typing quirk: every project has different fields; thin to a partial
// of the expected shape at call sites.
type _Guard = ProjectDetail["mainFlow"]
const _guard: _Guard = {} as _Guard
void _guard
