import { NextResponse } from "next/server"
import { GITHUB_USERNAME, GITHUB_API_URL, GITHUB_ORGS, GITHUB_SKIP_REPOS, CACHE_DURATION_API, CACHE_DURATION_API_STALE } from "@/config/constants"
import { ghHeaders } from "@/lib/github"

interface GHRepo { id: number; fork: boolean; archived: boolean; name: string; owner: { login: string } }

async function fetchJSON(url: string): Promise<GHRepo[]> {
  console.log(`[github/repos] Fetching: ${url}`)
  try {
    const res = await fetch(url, { headers: ghHeaders("github/repos"), next: { revalidate: CACHE_DURATION_API, tags: ["github"] } })
    console.log(`[github/repos] ${url} -> HTTP ${res.status} ${res.statusText}`)
    if (!res.ok) {
      const body = await res.text().catch(() => "(unreadable)")
      console.error(`[github/repos] Failed ${url}: ${body.slice(0, 200)}`)
      return []
    }
    const data = await res.json()
    console.log(`[github/repos] ${url} -> ${Array.isArray(data) ? data.length : "?"} repos`)
    return data
  } catch (err) {
    console.error(`[github/repos] Network error fetching ${url}:`, err)
    return []
  }
}

export async function GET() {
  try {
    console.log("[github/repos] GET /api/github")
    const results = await Promise.all([
      fetchJSON(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=public`),
      ...GITHUB_ORGS.map(org => fetchJSON(`${GITHUB_API_URL}/orgs/${org}/repos?sort=updated&per_page=100&type=public`)),
    ])

    const all: GHRepo[] = results.flat()
    const seen = new Set<number>()
    const unique = all.filter(r => {
      if (seen.has(r.id)) return false
      seen.add(r.id)
      return !r.fork && !(GITHUB_SKIP_REPOS as readonly string[]).includes(r.name)
    })

    console.log(`[github/repos] Returning ${unique.length} unique repos (from ${all.length} total)`)

    return NextResponse.json(unique, {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_DURATION_API}, stale-while-revalidate=${CACHE_DURATION_API_STALE}`,
        "CDN-Cache-Control": `public, s-maxage=${CACHE_DURATION_API}, stale-while-revalidate=${CACHE_DURATION_API_STALE}`,
      },
    })
  } catch (err) {
    console.error("[github/repos] Unhandled error:", err)
    return NextResponse.json([], { status: 500 })
  }
}
