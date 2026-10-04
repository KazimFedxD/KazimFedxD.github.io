import { NextResponse } from "next/server"
import { SITE_NAME, SITE_URL, GITHUB_API_URL, CACHE_DURATION_API, CACHE_DURATION_API_STALE } from "@/config/constants"

// Cache status for 10 minutes (600 seconds)
export const revalidate = 600

const BUILD_TIME = new Date().toISOString()

// A liveness ping that always says "ok" isn't a health check - it just means
// the Node process is up. This actually probes the one real external
// dependency the site has (GitHub's API), bounded so a slow/dead upstream
// can't hang this endpoint.
async function checkGithub(): Promise<"ok" | "degraded" | "down"> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 2500)
  try {
    // Cached for the same 600s window as this whole route segment (see
    // `revalidate` above) - a health check that hits GitHub on every request
    // would itself be a load-bearing dependency on GitHub's rate limit.
    const res = await fetch(`${GITHUB_API_URL}/zen`, { signal: controller.signal, next: { revalidate: 600 } })
    return res.ok ? "ok" : "degraded"
  } catch {
    return "down"
  } finally {
    clearTimeout(timeout)
  }
}

export async function GET() {
  const github = await checkGithub()

  return NextResponse.json(
    {
      status: github === "down" ? "degraded" : "ok",
      owner: SITE_NAME,
      site: SITE_URL.replace("https://", ""),
      dependencies: { github },
      github_token_configured: Boolean(process.env.GITHUB_TOKEN),
      build_time: BUILD_TIME,
      timestamp: new Date().toISOString(),
      uptime_since: BUILD_TIME,
    },
    {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_DURATION_API}, stale-while-revalidate=${CACHE_DURATION_API_STALE}`,
      },
    }
  )
}

