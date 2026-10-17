import { NextResponse } from "next/server"
import { GITHUB_USERNAME, GITHUB_API_URL, GITHUB_ORGS, GITHUB_SKIP_REPOS, CACHE_DURATION_API, CACHE_DURATION_API_STALE } from "@/config/constants"
import { ghHeaders } from "@/lib/github"

async function safeFetch(label: string, url: string, opts: RequestInit) {
  console.log(`[github/stats] Fetching ${label}: ${url}`)
  try {
    const res = await fetch(url, opts)
    console.log(`[github/stats] ${label} -> HTTP ${res.status}`)
    if (!res.ok) {
      const body = await res.text().catch(() => "(unreadable)")
      console.error(`[github/stats] ${label} failed: ${body.slice(0, 200)}`)
      return null
    }
    return res.json()
  } catch (err) {
    console.error(`[github/stats] Network error for ${label}:`, err)
    return null
  }
}

export async function GET() {
  try {
    console.log("[github/stats] GET /api/github/stats")
    const headers = ghHeaders("github/stats")
    const opts = { headers, next: { revalidate: CACHE_DURATION_API, tags: ["github-stats"] } }

    const [user, userRepos, ...orgRepos] = await Promise.all([
      safeFetch("user", `${GITHUB_API_URL}/users/${GITHUB_USERNAME}`, opts),
      safeFetch("userRepos", `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&type=public`, opts),
      ...GITHUB_ORGS.map(org =>
        safeFetch(`org:${org}`, `${GITHUB_API_URL}/orgs/${org}/repos?per_page=100`, opts)
      ),
    ])

    const allRepos = [
      ...(Array.isArray(userRepos) ? userRepos : []),
      ...orgRepos.flatMap(r => Array.isArray(r) ? r : []),
    ]

    console.log(`[github/stats] ${allRepos.length} total repos fetched`)

    // Same fork/skip-list filtering as /api/github, so this route's numbers
    // agree with what /projects actually lists instead of counting differently.
    const seen = new Set<number>()
    const filteredRepos = allRepos.filter((r: { id: number; fork?: boolean; name: string }) => {
      if (seen.has(r.id)) return false
      seen.add(r.id)
      return !r.fork && !(GITHUB_SKIP_REPOS as readonly string[]).includes(r.name)
    })
    const stars = filteredRepos.reduce((acc: number, r: { stargazers_count?: number }) => acc + (r.stargazers_count ?? 0), 0)

    const result = {
      public_repos: filteredRepos.length,
      followers: user?.followers ?? 0,
      following: user?.following ?? 0,
      avatar_url: user?.avatar_url ?? "",
      stars,
    }
    console.log("[github/stats] Result:", result)

    return NextResponse.json(result, {
      headers: { "Cache-Control": `public, s-maxage=${CACHE_DURATION_API}, stale-while-revalidate=${CACHE_DURATION_API_STALE}` },
    })
  } catch (err) {
    console.error("[github/stats] Unhandled error:", err)
    return NextResponse.json({ public_repos: 0, followers: 0, following: 0, avatar_url: "", stars: 0 }, { status: 500 })
  }
}
