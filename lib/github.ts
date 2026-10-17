// Shared helper for the /api/github* route handlers.
export function ghHeaders(label: string): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
  if (process.env.GITHUB_TOKEN) {
    h["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`
    console.log(`[${label}] Using GITHUB_TOKEN (authenticated)`)
  } else {
    console.warn(`[${label}] No GITHUB_TOKEN - unauthenticated (60 req/hr limit)`)
  }
  return h
}
