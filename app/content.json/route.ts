/**
 * /content.json — Structured portfolio data for AI agents and crawlers.
 * EmailJS and other internal credentials are deliberately omitted.
 */

import { getIdentity } from "@/lib/portfolio/identity"
import {
  getAchievements,
  getBiography,
  getContact,
  getEducation,
  getExperience,
  getSkills,
} from "@/lib/portfolio/content"
import { getAllProjects } from "@/lib/portfolio/projects"
import { SITE_URL } from "@/config/constants"

export const dynamic = "force-static"

export function GET() {
  const identity = getIdentity()
  const data = {
    "$schema": "https://fedxd.net/schemas/portfolio.json",
    generated: new Date().toISOString(),
    site: {
      url: SITE_URL,
      name: identity.canonicalName,
      alternateNames: identity.alternateName,
      jobTitle: identity.jobTitle,
      description: identity.description,
      email: identity.email,
      location: identity.location,
    },
    identity: {
      "@id": identity["@id"],
      canonicalName: identity.canonicalName,
      alternateName: identity.alternateName,
      givenName: identity.givenName,
      familyName: identity.familyName,
      additionalName: identity.additionalName,
      knowsAbout: identity.knowsAbout,
      sameAs: identity.sameAs,
    },
    biography: getBiography(),
    projects: getAllProjects(),
    skills: getSkills(),
    experience: getExperience(),
    education: getEducation(),
    achievements: getAchievements(),
    contact: getContact(),
    pages: {
      home: `${SITE_URL}/`,
      portfolio: `${SITE_URL}/portfolio`,
      about: `${SITE_URL}/about`,
      projects: `${SITE_URL}/projects`,
      skills: `${SITE_URL}/skills`,
      experience: `${SITE_URL}/experience`,
      education: `${SITE_URL}/education`,
      achievements: `${SITE_URL}/achievements`,
      contact: `${SITE_URL}/contact`,
    },
    machineReadables: {
      content_json: `${SITE_URL}/content.json`,
      content_txt: `${SITE_URL}/content.txt`,
      llms_txt: `${SITE_URL}/llms.txt`,
      llms_full_txt: `${SITE_URL}/llms-full.txt`,
    },
  }

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
