/**
 * Centralized configuration for fedxd.net
 * All repeated values should be imported from this file.
 */

// ── Domain Configuration ─────────────────────────────────────────────────────
export const SITE_URL = "https://fedxd.net"
export const LEGACY_DOMAIN = "https://kazimfedxd.github.io"

// ── Site Metadata ────────────────────────────────────────────────────────────
export const SITE_NAME = "Kazim Abbas"
export const SITE_TITLE = "Kazim Abbas — Backend Developer"
export const SITE_DESCRIPTION = "Backend developer from Karachi, Pakistan — Django, Python, PostgreSQL. NASA Space Apps '25 2nd place. Open to remote backend roles."
export const SITE_KEYWORDS = ["Kazim Abbas", "fedxd", "backend developer", "Django", "Python", "PostgreSQL", "NASA Space Apps", "portfolio"]
export const SITE_AUTHOR = "Kazim Abbas"
export const SITE_LOCATION = "Karachi, Pakistan"

// ── Theme Configuration ──────────────────────────────────────────────────────
export const THEME_COLOR = "#7a6aa8"

// ── External Links ───────────────────────────────────────────────────────────
export const GITHUB_URL = "https://github.com/KazimFedxD"
export const GITHUB_USERNAME = "KazimFedxD"
export const GITHUB_REPO_URL = "https://github.com/KazimFedxD/fedxd.github.io"

// Orgs whose repos count toward the "ecosystem" repo/star totals shown across
// the site, and repos to exclude from those totals (this repo itself, forks).
export const GITHUB_ORGS = [] as const
export const GITHUB_SKIP_REPOS = ["KazimFedxD", ".github", "LICENSE"] as const

// ── Contact Information ──────────────────────────────────────────────────────
// Email is split to deter scrapers - assemble at runtime
export const EMAIL_USER = "kazim"
export const EMAIL_DOMAIN = "fedxd.net"
export const getEmail = () => `${EMAIL_USER}@${EMAIL_DOMAIN}`

// ── API Endpoints ────────────────────────────────────────────────────────────
export const GITHUB_API_URL = "https://api.github.com"

// ── Caching Configuration ────────────────────────────────────────────────────
// Website content: 2-4 hours (7200-14400 seconds). Page Cache-Control lives in
// next.config.mjs directly - it can't import this .ts file at config-load time,
// so these values are the source of truth in prose, not in code.

// GitHub Actions / API: 5-10 minutes (300-600 seconds)
export const CACHE_DURATION_API = 600 // 10 minutes
export const CACHE_DURATION_API_STALE = 1200 // 20 minutes stale-while-revalidate

// Avatar caching
export const CACHE_DURATION_AVATAR = 7200 // 2 hours
export const CACHE_DURATION_AVATAR_STALE = 14400 // 4 hours stale-while-revalidate

// ── Navigation Links ─────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "/", external: false },
  { label: "About", href: "/about", external: false },
  { label: "Projects", href: "/projects", external: false },
  { label: "Spotify", href: "/spotify", external: false },
  { label: "Contact", href: "/#contact", external: false },
] as const

export const FOOTER_NAV_LINKS = [
  { href: "/", label: "Home", external: false },
  { href: "/about", label: "About", external: false },
  { href: "/projects", label: "Projects", external: false },
  { href: GITHUB_URL, label: "GitHub", external: true },
] as const

// ── Sitemap Configuration ────────────────────────────────────────────────────
export const SITEMAP_ROUTES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/admin", changeFrequency: "never" as const, priority: 0.1 },
] as const

// ── Skills / Languages ───────────────────────────────────────────────────────
export const TECH_TAGS = ["Python", "C / C++", "JavaScript", "TypeScript", "Bash"] as const

// ── Avatar Proxy Allowlist ───────────────────────────────────────────────────
export const AVATAR_ALLOWED_HOSTS = [
  // GitHub avatars
  "avatars.githubusercontent.com",
  "github.com",
  // Social avatars
  "unavatar.io",
  "www.gravatar.com",
  "pbs.twimg.com",
  "cdn.discordapp.com",
  // YouTube thumbnails
  "i.ytimg.com",
  "yt3.ggpht.com",
  // Image hosts
  "i.imgur.com",
  "giffiles.alphacoders.com",
  // Spotify stats cards
  "spotify-github-profile.kittinanx.com",
  "spotify-recently-played-readme.vercel.app",
] as const

export type AllowedHost = typeof AVATAR_ALLOWED_HOSTS[number]

// ── Feature Flags ────────────────────────────────────────────────────────────
export const FEATURES = {
  enableScrollToTop: true,
  enableLegacyDomainWarning: true,
} as const
