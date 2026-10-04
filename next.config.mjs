// Site configuration - import from centralized config
const SITE_URL = "https://fedxd.net"
const isDev = process.env.NODE_ENV !== "production"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // /api/avatar?url=... proxies external avatars through our own origin -
    // Next.js treats query strings on local image paths as untrusted by
    // default, so it needs an explicit opt-in.
    localPatterns: [
      { pathname: "/api/avatar", search: "?url=*" },
    ],
    // Mirrors config/constants.ts AVATAR_ALLOWED_HOSTS - duplicated here since
    // next.config.mjs can't import the .ts config module at load time.
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "unavatar.io" },
      { protocol: "https", hostname: "www.gravatar.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "cdn.discordapp.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "yt3.ggpht.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "giffiles.alphacoders.com" },
      { protocol: "https", hostname: "spotify-github-profile.kittinanx.com" },
      { protocol: "https", hostname: "spotify-recently-played-readme.vercel.app" },
    ],
  },
  // Sandbox tunnels allowed to access Next.js dev resources (HMR, etc.).
  allowedDevOrigins: ["sandbox.fedxd.net"],
  // Note: the about page content is consumed by the CRT engine as
  // `@/portfolio_data/content/about.ts` (a typed string module), not as a
  // raw .md import. That keeps the project Turbopack-compatible with no
  // custom loader rules. See portfolio_data/content/about.ts for the
  // human-edited source.
  async headers() {
    return [
      {
        // Security headers apply to every route, pages and API alike.
        // Cache-Control is deliberately NOT set here - it's scoped per
        // route type below so a response only ever carries one value.
        source: "/(.*)",
        headers: [
          // ── XSS / injection ─────────────────────────────────────
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              // All GitHub/Spotify data is fetched server-side through our own
              // /api/* routes - the browser itself never talks to those hosts.
              "connect-src 'self'",
              "media-src 'self'",
              "object-src 'none'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // ── Clickjacking ─────────────────────────────────────────
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // ── MIME sniffing ────────────────────────────────────────
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // ── Referrer ─────────────────────────────────────────────
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // ── Browser features ─────────────────────────────────────
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          // ── HSTS — preload-ready ──────────────────────────────────
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // ── Cross-origin isolation ───────────────────────────────
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            // In dev, allow the sandbox proxy to load resources
            value: isDev ? "cross-origin" : "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
          // ── Reporting ────────────────────────────────────────────
          {
            key: "Report-To",
            value: JSON.stringify({
              group: "default",
              max_age: 86400,
              endpoints: [{ url: `${SITE_URL}/api/csp-report` }],
            }),
          },
          {
            key: "NEL",
            value: JSON.stringify({
              report_to: "default",
              max_age: 86400,
              include_subdomains: true,
            }),
          },
        ],
      },
      // Pages - 2-4hr cache. Excludes /api (each route sets its own
      // Cache-Control) and /_next/static (Next.js already serves those
      // immutable by default - a custom override here breaks dev mode).
      {
        source: "/((?!api/|_next/static/).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=7200, s-maxage=7200, stale-while-revalidate=14400",
          },
        ],
      },
      // API routes — CORS only; Cache-Control comes from each route handler
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            // In dev, allow all origins (sandbox proxy, localhost, etc.)
            value: isDev ? "*" : SITE_URL,
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
        ],
      },
    ]
  },
}

export default nextConfig
