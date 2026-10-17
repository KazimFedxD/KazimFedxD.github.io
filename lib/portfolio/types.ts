/**
 * Shared types for the SEO / AEO / GEO content layer.
 * Re-exports shape from portfolio_data/* without copying values.
 */

import type { PortfolioIdentity } from "@/lib/portfolio/identity"

export type { PortfolioIdentity } from "@/lib/portfolio/identity"

export interface ProjectSummary {
  slug: string
  title: string
  shortDescription: string
  description: string
  github: string | null
  tech: string[]
  features: string[]
  badge: string | null
  status: "shipped" | "alpha" | "in-development" | "unverified"
  hasLongForm: boolean
}

export interface ProjectFeature {
  id: number
  title: string
  icon: string
  description: string
  whyItMatters?: string
  howItWorks?: string[]
}

export interface ProjectDetail {
  slug: string
  title: string
  shortDescription: string
  description: string
  github: string | null
  tech: string[]
  features: ProjectFeature[]
  featureTitles: string[]
  badge: string | null
  status: ProjectSummary["status"]
  hasLongForm: boolean
  techStack: { name: string; version: string; category: string }[]
  overview: {
    description: string
    problemIntro: string
    problemStatement: string[]
    howWeSolve: { problem: string; solution: string; benefit: string }[]
    targetAudience: string[]
    uniqueFeatures: { icon: string; title: string; points: string[] }[]
    useCases: string[]
  }
  mainFlow: {
    title: string
    subtitle: string
    description: string
    oneLiner: string
    steps: { step: number; action: string; icon: string; description: string }[]
    corePrinciples: string[]
  }
  architecture: {
    description: string
    servicesTitle: string
    servicesIntro: string
    diagram: { title: string; description: string; layers: unknown }
    services: { name: string; description: string; tech: string[] }[]
  }
  apiEndpoints: { method: string; path: string; description: string }[]
  setupSteps: { step: number; title: string; description: string; command?: string }[]
  requirements: {
    os: { name: string; supported: boolean; notes?: string }[]
    hardware: { minimum: { ram: string; cpu: string; disk: string }; recommended: { ram: string; cpu: string; disk: string } }
    software: { name: string; version: string; required: boolean; purpose: string }[]
    externalServices: { name: string; purpose: string; freeTier: boolean }[]
  }
  knownIssues: string[]
  futureEnhancements: string[]
  relatedProjects: string[]
}

export interface PersonSchema {
  "@context": "https://schema.org"
  "@type": "Person"
  "@id": string
  name: string
  alternateName: string[]
  givenName: string
  familyName: string
  additionalName: string
  description: string
  url: string
  image: string
  jobTitle: string
  knowsAbout: string[]
  email: string
  address: { "@type": "PostalAddress"; addressLocality: string; addressCountry: string }
  sameAs: string[]
}

export interface WebSiteSchema {
  "@context": "https://schema.org"
  "@type": "WebSite"
  "@id": string
  name: string
  alternateName: string[]
  url: string
  description: string
  inLanguage: string
  author: { "@id": string }
  publisher: { "@id": string }
}

export interface SoftwareSourceCodeSchema {
  "@context": "https://schema.org"
  "@type": "SoftwareSourceCode"
  "@id": string
  name: string
  alternateName?: string[]
  description: string
  url: string
  codeRepository?: string
  programmingLanguage: string[]
  author: { "@id": string }
  keywords?: string
}

export interface CollectionPageSchema {
  "@context": "https://schema.org"
  "@type": "CollectionPage"
  "@id": string
  name: string
  url: string
  description: string
  isPartOf: { "@id": string }
  author: { "@id": string }
  hasPart: { "@type": "SoftwareSourceCode" | "CreativeWork"; "@id": string; name: string; url: string }[]
}

export interface BreadcrumbListSchema {
  "@context": "https://schema.org"
  "@type": "BreadcrumbList"
  itemListElement: { "@type": "ListItem"; position: number; name: string; item: string }[]
}
