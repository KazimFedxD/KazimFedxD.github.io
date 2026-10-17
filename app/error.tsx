"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Terminal, Home, RefreshCw } from "lucide-react"

const EASE = [0.215, 0.61, 0.355, 1] as const

function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-12 opacity-[0.035]"
      style={{ background: "linear-gradient(to bottom, transparent, oklch(0.93 0.005 90), transparent)" }}
      animate={{ top: ["-3rem", "105%"] }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
    />
  )
}

function Glitch({ text, color = "text-emerald-400" }: { text: string; color?: string }) {
  const [g, setG] = useState(false)
  useEffect(() => {
    const id = setInterval(() => { setG(true); setTimeout(() => setG(false), 120) }, 3000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-block select-none">
      <span className={g ? "opacity-0" : "opacity-100"}>{text}</span>
      {g && (
        <>
          <span className={`absolute inset-0 translate-x-[3px] opacity-70 ${color}`}>{text}</span>
          <span className="absolute inset-0 -translate-x-[3px] text-blue-400/70">{text}</span>
        </>
      )}
    </span>
  )
}

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [copied, setCopied] = useState(false)
  const errorId  = error.digest ?? "unknown"
  const errorMsg = (error.message ?? "An unexpected error occurred.").slice(0, 60)
  const lineNum  = Math.floor(Math.random() * 300) + 1

  const lines = [
    { text: "$ node server.js",                                        delay: 0.3,  color: "text-foreground/90" },
    { text: "  ▲ Next.js 16.1.6 (Turbopack)",                         delay: 0.5,  color: "text-muted-foreground" },
    { text: "  ✓ Ready on http://localhost:3000",                      delay: 0.7,  color: "text-green-400" },
    { text: "",                                                         delay: 0.85, color: "" },
    { text: "  ⨯ [FATAL] Unhandled runtime exception",                delay: 0.95, color: "text-emerald-400 font-semibold" },
    { text: `  Error: ${errorMsg}`,                                    delay: 1.1,  color: "text-emerald-400" },
    { text: `  at Object.<anonymous> (server.js:${lineNum}:12)`,      delay: 1.25, color: "text-muted-foreground" },
    { text: `  at Module._compile (internal/modules:678:30)`,         delay: 1.35, color: "text-muted-foreground/60" },
    { text: "",                                                         delay: 1.5,  color: "" },
    { text: "  HTTP/2 500  Internal Server Error",                     delay: 1.6,  color: "text-emerald-400 font-semibold" },
    ...(errorId !== "unknown" ? [
      { text: `  digest: ${errorId}`,                                  delay: 1.75, color: "text-muted-foreground" },
    ] : []),
    { text: "",                                                         delay: 1.85, color: "" },
    { text: "  Logged. Retry below or return home.",                   delay: 1.95, color: "text-primary" },
  ]

  function copyDigest() {
    navigator.clipboard.writeText(errorId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16" style={{ overflow: "clip" }}>
      <div className="absolute inset-0 grid-bg opacity-10" />
      <ScanLine />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.16 295 / 0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-lg text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
          <span className="font-mono text-xs tracking-widest text-emerald-400/80 uppercase">// 500 · internal server error</span>
          <h1 className="mt-1 font-mono text-[6rem] font-bold leading-none tracking-tight text-foreground sm:text-[8rem]">
            <Glitch text="500" color="text-emerald-400" />
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground sm:text-base">
            Something broke on our end.
          </p>
        </motion.div>

        {/* Terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12, ease: EASE }}
          className="mt-8 overflow-hidden rounded-xl border border-border bg-card text-left shadow-xl"
        >
          <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            <Terminal className="ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
            <span className="font-mono text-xs text-muted-foreground/70">crash log - kazim@fedxd.net</span>
          </div>
          <div className="p-4 font-mono text-xs space-y-1 sm:p-5 sm:text-sm">
            {lines.map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: line.delay, duration: 0.2 }}
                className={line.color || "text-transparent select-none"}>
                {line.text || "\u00a0"}
              </motion.div>
            ))}
            <motion.span
              animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}
              className="inline-block h-3.5 w-2 rounded-sm bg-emerald-400 mt-1"
            />
          </div>
        </motion.div>

        {/* Error ID copy */}
        {errorId !== "unknown" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-3 flex items-center justify-center gap-2">
            <span className="font-mono text-xs text-muted-foreground/50">error id:</span>
            <button onClick={copyDigest}
              className="font-mono text-xs text-primary/60 underline underline-offset-2 transition hover:text-primary">
              {copied ? "copied!" : errorId}
            </button>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28, ease: EASE }}
          className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:items-center"
        >
          <button onClick={reset}
            className="group inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/60 bg-emerald-500/10 px-6 py-3 font-mono text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20 active:scale-95">
            <RefreshCw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
            retry
          </button>
          <Link href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-mono text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-secondary active:scale-95">
            <Home className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
            back home
          </Link>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-6 font-mono text-xs text-muted-foreground/40">
          persistent issue?{" "}
          <a href="https://github.com/KazimFedxD/fedxd.github.io/issues"
            target="_blank" rel="noopener noreferrer"
            className="text-primary/50 underline underline-offset-2 hover:text-primary transition-colors">
            open an issue
          </a>
        </motion.p>
      </div>
    </div>
  )
}
