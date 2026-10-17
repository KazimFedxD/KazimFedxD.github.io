"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"

// Throws on the client side to test the error.tsx boundary
export default function ErrorTest() {
  const [boom, setBoom] = useState(false)

  useEffect(() => {
    // Short delay so the page renders first, then throws into the error boundary
    const t = setTimeout(() => setBoom(true), 100)
    return () => clearTimeout(t)
  }, [])

  if (boom) {
    throw new Error("Test 500: /500-test intentionally crashes to verify the error boundary UI.")
  }

  return (
    <div className="flex min-h-screen items-center justify-center font-mono text-sm text-muted-foreground">
      Triggering error…
    </div>
  )
}
