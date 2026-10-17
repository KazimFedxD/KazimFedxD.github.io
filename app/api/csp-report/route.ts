import { NextRequest, NextResponse } from "next/server"

// Real CSP reports are a few hundred bytes; anything past this is not a
// browser-generated report and isn't worth logging.
const MAX_REPORT_BYTES = 8 * 1024

export async function POST(request: NextRequest) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0)
  if (declaredLength > MAX_REPORT_BYTES) {
    return new NextResponse(null, { status: 413 })
  }

  try {
    const text = await request.text()
    if (text.length > MAX_REPORT_BYTES) {
      return new NextResponse(null, { status: 413 })
    }
    const body = JSON.parse(text)
    // Log CSP violations server-side - swap for a real reporting service if needed
    console.warn("[CSP Violation]", JSON.stringify(body, null, 2))
  } catch {
    // ignore malformed bodies
  }

  return new NextResponse(null, { status: 204 })
}


