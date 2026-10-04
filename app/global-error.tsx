"use client"

import { useEffect, useState } from "react"
import { RefreshCw, Home } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [cursor, setCursor] = useState(true)
  const [tick, setTick] = useState(0)
  const errorMsg = (error.message ?? "Unknown critical error").slice(0, 60)
  const lineNum  = Math.floor(Math.random() * 300) + 1

  useEffect(() => {
    console.error("[GlobalError]", error)
    const t = setInterval(() => { setCursor(v => !v); setTick(v => v + 1) }, 600)
    return () => clearInterval(t)
  }, [error])

  const lines = [
    { prompt: true,  text: " bash --login",                                   color: "#e2e8f0" },
    { prompt: false, text: "  ⨯ [CRITICAL] Application shell crashed",        color: "#3cf28a" },
    { prompt: false, text: `  Error: ${errorMsg}`,                            color: "#3cf28a" },
    { prompt: false, text: `  at Object.<anonymous> (app/layout.tsx:${lineNum}:8)`, color: "#64748b" },
    { prompt: false, text: "",                                                  color: "" },
    { prompt: false, text: "  HTTP/2 500  Internal Server Error",             color: "#3cf28a" },
    ...(error.digest ? [{ prompt: false, text: `  digest: ${error.digest}`,   color: "#475569" }] : []),
    { prompt: false, text: "",                                                  color: "" },
    { prompt: false, text: "  Top-level crash. Retry or go home.",            color: "var(--primary)" },
  ]

  const s = {
    page: {
      margin: 0, minHeight: "100dvh", display: "flex", flexDirection: "column" as const,
      alignItems: "center", justifyContent: "center",
      backgroundColor: "oklch(0.08 0.01 295)", color: "oklch(0.88 0.02 152)",
      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
      padding: "1.5rem", textAlign: "center" as const, position: "relative" as const, overflow: "hidden",
    },
    glow: {
      position: "absolute" as const, left: "50%", top: "50%",
      transform: "translate(-50%,-50%)", width: "32rem", height: "32rem",
      borderRadius: "50%", pointerEvents: "none" as const, zIndex: 0,
      background: "radial-gradient(circle, oklch(0.65 0.16 295 / 0.08) 0%, transparent 70%)",
    },
    grid: {
      position: "absolute" as const, inset: 0, opacity: 0.06, zIndex: 0,
      backgroundImage: "linear-gradient(oklch(0.93 0.005 90 / 0.15) 1px, transparent 1px), linear-gradient(90deg, oklch(0.93 0.005 90 / 0.15) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
    },
  }

  return (
    <html lang="en">
      <body style={s.page}>
        <div style={s.grid} />
        <div style={s.glow} />

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "32rem" }}>
          <p style={{ margin: 0, fontSize: "0.7rem", color: "#3cf28a", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            // 500 · critical error
          </p>
          <h1 style={{ margin: "0.25rem 0 0", fontSize: "clamp(4.5rem, 18vw, 8rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em" }}>
            500
          </h1>
          <p style={{ margin: "0.5rem 0 0", fontSize: "clamp(0.8rem, 3vw, 1rem)", color: "#64748b" }}>
            A critical error occurred in the application shell.
          </p>

          {/* Terminal card */}
          <div style={{ marginTop: "2rem", borderRadius: "0.75rem", border: "1px solid #1e293b", backgroundColor: "#0a0f14", textAlign: "left", overflow: "hidden" }}>
            {/* Title bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1rem", borderBottom: "1px solid #1e293b", backgroundColor: "#070c14" }}>
              <div style={{ width: "0.7rem", height: "0.7rem", borderRadius: "50%", backgroundColor: "#ff5f57", flexShrink: 0 }} />
              <div style={{ width: "0.7rem", height: "0.7rem", borderRadius: "50%", backgroundColor: "#febc2e", flexShrink: 0 }} />
              <div style={{ width: "0.7rem", height: "0.7rem", borderRadius: "50%", backgroundColor: "#28c840", flexShrink: 0 }} />
              <span style={{ marginLeft: "0.4rem", fontSize: "0.65rem", color: "#475569" }}>crash log - kazim@fedxd.net</span>
            </div>
            {/* Lines */}
            <div style={{ padding: "1rem 1.25rem", fontSize: "clamp(0.65rem, 2.5vw, 0.8rem)", lineHeight: 1.9 }}>
              {lines.map((line, i) => (
                <div key={i} style={{ display: "flex", gap: "0.4rem", flexWrap: "nowrap" }}>
                  {line.prompt && (
                    <span style={{ flexShrink: 0, whiteSpace: "nowrap" }}>
                      <span style={{ color: "#4ade80" }}>kazim</span>
                      <span style={{ color: "#475569" }}>@</span>
                      <span style={{ color: "#22d3ee" }}>fedxd.net</span>
                      <span style={{ color: "#475569" }}>:~$</span>
                    </span>
                  )}
                  <span style={{ color: line.color, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{line.text || "\u00a0"}</span>
                </div>
              ))}
              <span style={{
                display: "inline-block", width: "0.45rem", height: "1rem",
                borderRadius: "2px", backgroundColor: "#3cf28a",
                opacity: cursor ? 1 : 0, transition: "opacity 0.1s",
              }} />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.65rem 1.25rem", borderRadius: "0.5rem",
                border: "1px solid rgba(60,242,138,0.5)", backgroundColor: "rgba(60,242,138,0.1)",
                color: "#3cf28a", fontFamily: "inherit", fontSize: "0.8125rem",
                fontWeight: 600, cursor: "pointer", transition: "background 0.2s",
              }}
            >
              <RefreshCw style={{ width: "0.9rem", height: "0.9rem" }} />
              retry
            </button>
            <a
              href="/"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.65rem 1.25rem", borderRadius: "0.5rem",
                border: "1px solid #1e293b", backgroundColor: "#0a0f14",
                color: "#e2e8f0", fontFamily: "inherit", fontSize: "0.8125rem",
                fontWeight: 600, textDecoration: "none",
              }}
            >
              <Home style={{ width: "0.9rem", height: "0.9rem" }} />
              back home
            </a>
          </div>

          <p style={{ marginTop: "1.5rem", fontSize: "0.65rem", color: "#334155" }}>
            persistent?{" "}
            <a href="https://github.com/KazimFedxD/fedxd.github.io/issues"
              target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--primary)", opacity: 0.6, textDecoration: "underline" }}>
              open an issue
            </a>
          </p>
        </div>
      </body>
    </html>
  )
}
