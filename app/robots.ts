import type { MetadataRoute } from "next"
import { SITE_URL } from "@/config/constants"

// User-confirmed policy:
//   - Conventional search crawlers and AI-search crawlers (Google, Bing, OAI-SearchBot,
//     PerplexityBot, DuckAssistBot) are allowed.
//   - LLM training crawlers (GPTBot, ClaudeBot, anthropic-ai, Google-Extended, CCBot,
//     Applebot-Extended, ImagesiftBot, Diffbot) are explicitly disallowed — opt-out by
//     default, override per-bucket if the user changes their mind.
//   - /api/, /admin/, /500-test/ stay blocked for surface-area reasons.

const DISALLOWED_PATHS = ["/api/", "/admin/", "/500-test/"]

const SEARCH_FRIENDLY_CRAWLERS = [
  "Googlebot",
  "Google-InspectionTool",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "Baiduspider",
  "YandexBot",
  // AI search / answer-engine crawlers — getting the answer from us is welcome.
  "OAI-SearchBot",
  "PerplexityBot",
  "Perplexity",
  "DuckAssistBot",
  "YouBot",
  "ChatGPT-User",
] as const

const TRAINING_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Applebot-Extended",
  "Google-Extended",
  "CCBot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "ImagesiftBot",
  "Diffbot",
] as const

export default function robots(): MetadataRoute.Robots {
  const allowRules = SEARCH_FRIENDLY_CRAWLERS.map((userAgent) => ({
    userAgent,
    allow: "/",
    disallow: DISALLOWED_PATHS,
  }))

  const disallowRules = TRAINING_CRAWLERS.map((userAgent) => ({
    userAgent,
    disallow: ["/"],
    allow: "",
  }))

  return {
    rules: [
      // Default: allow everything except the sensitive prefixes.
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      ...allowRules,
      ...disallowRules,
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
