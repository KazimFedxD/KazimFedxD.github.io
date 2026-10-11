/**
 * Canonical identity for fedxd.net — single place where the persona is
 * defined for SEO/structured-data layers. The OS engine still imports
 * portfolio_data/content/{home,about,contact}.json directly.
 *
 * Adding alternateName entries expands discoverability for misspelt
 * searches (e.g. "Kasim Abbas") without inflating markup with the same
 * keywords.
 */

import { SITE_URL, GITHUB_URL, getEmail, SITE_NAME, SITE_DESCRIPTION, SITE_LOCATION } from "@/config/constants"

export interface PortfolioIdentity {
  "@id": string
  canonicalName: string
  alternateName: string[]
  givenName: string
  familyName: string
  additionalName: string
  jobTitle: string
  description: string
  shortBio: string
  url: string
  image: string
  email: string
  knowsAbout: string[]
  location: { city: string; country: string }
  sameAs: string[]
  homepageHandle: string
}

export function getIdentity(): PortfolioIdentity {
  return {
    "@id": `${SITE_URL}#person`,
    canonicalName: SITE_NAME,
    alternateName: ["Kasim Abbas", "FedxD", "FedXD", "Kazim FedxD", "Kasim Abbas FedxD"],
    givenName: "Kazim",
    familyName: "Abbas",
    additionalName: "FedxD",
    jobTitle: "Backend Engineer · Applied AI",
    description: SITE_DESCRIPTION,
    shortBio:
      "Kazim Abbas (FedxD) is a backend and applied-AI engineer based in Karachi, Pakistan. Builds production systems in Python, Django, and PostgreSQL; ships voice-first and AI-driven interfaces.",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    email: getEmail(),
    knowsAbout: [
      "Python",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Docker",
      "TypeScript",
      "React",
      "WebSockets",
      "Deepgram STT",
      "ElevenLabs TTS",
      "Anthropic / Groq LLM Tooling",
      "Linux (Arch / KDE Plasma)",
      "PySide6 / Qt 6",
      "Backend Engineering",
      "Applied AI",
    ],
    location: {
      city: SITE_LOCATION.replace(/,\s*Pakistan$/, "").trim(),
      country: "PK",
    },
    sameAs: [
      GITHUB_URL,
      "https://www.linkedin.com/in/kazim-abbas-60b1b5257/",
    ],
    homepageHandle: "@KazimFedxD",
  }
}
