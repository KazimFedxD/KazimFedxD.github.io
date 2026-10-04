import { NextRequest, NextResponse } from "next/server"
import {
  AVATAR_ALLOWED_HOSTS,
  CACHE_DURATION_AVATAR,
  CACHE_DURATION_AVATAR_STALE,
  AllowedHost
} from "@/config/constants"

// Cache avatars for 2 hours - Next.js Data Cache keeps the upstream fetch result
export const revalidate = 7200

// Avatars are small; anything bigger than this is not a profile picture and
// isn't worth buffering into memory on a self-hosted box.
const MAX_AVATAR_BYTES = 5 * 1024 * 1024

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const url = searchParams.get("url")

  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return new NextResponse("Invalid url", { status: 400 })
  }

  if (!AVATAR_ALLOWED_HOSTS.includes(parsed.hostname as AllowedHost)) {
    return new NextResponse("Host not allowed", { status: 403 })
  }

  try {
    const upstream = await fetch(url, {
      next: { revalidate: CACHE_DURATION_AVATAR, tags: ["avatars"] },
      headers: {
        "User-Agent": "fedxd.net image-cache/1.0",
      },
      // Some allow-listed hosts (e.g. unavatar.io) are themselves URL-fetching
      // proxies that will redirect to an arbitrary caller-supplied location.
      // Following that redirect would turn this route into an open SSRF proxy,
      // so redirects are rejected rather than silently followed.
      redirect: "manual",
    })

    if (upstream.status >= 300 && upstream.status < 400) {
      return new NextResponse("Upstream redirect not allowed", { status: 502 })
    }

    if (!upstream.ok) {
      return new NextResponse("Upstream fetch failed", { status: 502 })
    }

    const contentType = upstream.headers.get("content-type") ?? "image/png"
    if (!contentType.startsWith("image/")) {
      return new NextResponse("Upstream did not return an image", { status: 502 })
    }

    const declaredLength = Number(upstream.headers.get("content-length") ?? 0)
    if (declaredLength > MAX_AVATAR_BYTES) {
      return new NextResponse("Upstream image too large", { status: 502 })
    }

    const buffer = await upstream.arrayBuffer()
    if (buffer.byteLength > MAX_AVATAR_BYTES) {
      return new NextResponse("Upstream image too large", { status: 502 })
    }

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": `public, max-age=${CACHE_DURATION_AVATAR}, s-maxage=${CACHE_DURATION_AVATAR}, stale-while-revalidate=${CACHE_DURATION_AVATAR_STALE}`,
        "Vary": "Accept",
      },
    })
  } catch {
    return new NextResponse("Failed to fetch image", { status: 502 })
  }
}

