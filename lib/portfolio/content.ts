/**
 * Server-only accessors over portfolio_data/content/*. Re-exported as
 * fully-typed shapes so SEO routes and machine-readable endpoints see one
 * normalised view of the content. Keeps fields close to the JSON sources —
 * no fields invented, no fields dropped.
 */

import skillsRaw from "@/portfolio_data/content/skills.json"
import experienceRaw from "@/portfolio_data/content/experience.json"
import educationRaw from "@/portfolio_data/content/education.json"
import achievementsRaw from "@/portfolio_data/content/achievements.json"
import contactRaw from "@/portfolio_data/content/contact.json"
import homeRaw from "@/portfolio_data/content/home.json"
import aboutRaw from "@/portfolio_data/content/about"

export interface PortfolioSkills {
  header: { title: string; subtitle: string }
  categories: {
    title: string
    icon: string
    color: string
    skills: { name: string; level: number; icon: string }[]
  }[]
  stats: { value: string; label: string; icon: string }[]
}

export interface PortfolioExperience {
  header: { title: string; subtitle: string }
  experiences: {
    period: string
    role: string
    company: string
    type: string
    location: string
    description: string
    responsibilities: string[]
    achievements: string[]
    tech: string[]
    icon: string
    color: string
    current: boolean
  }[]
  skillsGained: { category: string; items: string[] }[]
}

export interface PortfolioEducation {
  header: { title: string; subtitle: string }
  formalEducation: {
    degree: string
    institution: string
    location: string
    period: string
    status: string
    description: string
    courses: string[]
    icon: string
    color: string
    current: boolean
  }[]
  selfLearning: { category: string; topics: string[]; icon: string; color: string }[]
  philosophy: { title: string; body: string; tags: string[] }
}

export interface PortfolioAchievements {
  header: { title: string; subtitle: string }
  achievements: {
    year: string
    title: string
    position: string
    badge: string
    description: string
    highlights: string[]
    tech: string[]
    icon: string
    color: string
    link: string
  }[]
  certifications: {
    title: string
    issuer: string
    year: string
    description: string
    skills: string[]
    icon: string
    color: string
  }[]
  stats: { value: string; label: string; icon: string }[]
}

export interface PortfolioContact {
  header: { title: string; subtitle: string }
  contactInfo: { title: string; icon: string; value: string; link: string }[]
  responseTime: string
  tags: string[]
}

export interface PortfolioHome {
  header: { name: string }
  summary: string
  typingAnimation: { sequences: { text: string }[] }
  quickLinks: { title: string; description: string; link: string; icon: string }[]
  stats: { value: string; label: string }[]
}

export function getHome(): PortfolioHome {
  return homeRaw as PortfolioHome
}

export function getBiography(): string {
  return typeof aboutRaw === "string" ? aboutRaw : (aboutRaw as { default: string }).default ?? ""
}

export function getSkills(): PortfolioSkills {
  return skillsRaw as PortfolioSkills
}

export function getExperience(): PortfolioExperience {
  return experienceRaw as PortfolioExperience
}

export function getEducation(): PortfolioEducation {
  return educationRaw as PortfolioEducation
}

export function getAchievements(): PortfolioAchievements {
  return achievementsRaw as PortfolioAchievements
}

export function getContact(): PortfolioContact {
  // EmailJS keys are intentionally excluded from public endpoints
  const { form, ...publicContact } = contactRaw as PortfolioContact & { form: unknown }
  return publicContact
}
