"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Terminal, Home, Search } from "lucide-react"

const EASE = [0.215, 0.61, 0.355, 1] as const

function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-12 opacity-[0.035]"
      style={{ background: "linear-gradient(to bottom, transparent, oklch(0.85 0.18 152), transparent)" }}
      animate={{ top: ["-3rem", "105%"] }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
    />
  )
}

function Glitch({ text }: { text: string }) {
  const [g, setG] = useState(false)
  useEffect(() => {
    const id = setInterval(() => { setG(true); setTimeout(() => setG(false), 120) }, 3500)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-block select-none">
      <span className={g ? "opacity-0" : "opacity-100"}>{text}</span>
      {g && (
        <>
          <span className="absolute inset-0 translate-x-[3px] text-emerald-400/70">{text}</span>
          <span className="absolute inset-0 -translate-x-[3px] text-blue-400/70">{text}</span>
        </>
      )}
    </span>
  )
}

export default function NotFound() {
  const [path, setPath] = useState("")
  useEffect(() => { setPath(window.location.pathname) }, [])

  const lines = [
    { text: `$ curl -sI https://fedxd.net${path || "/???"}`, delay: 0.4,  color: "text-foreground/90" },
    { text: "  Resolving DNS...",                               delay: 0.75, color: "text-muted-foreground" },
    { text: "  Connected to 76.76.21.21",                      delay: 1.0,  color: "text-green-400" },
    { text: "",                                                 delay: 1.2,  color: "" },
    { text: "  HTTP/2 404  Not Found",                         delay: 1.3,  color: "text-emerald-400 font-semibold" },
    { text: "  content-type: text/html; charset=utf-8",        delay: 1.45, color: "text-muted-foreground" },
    { text: "  x-request-id: rm::iad1::fedxd",                delay: 1.6,  color: "text-muted-foreground" },
    { text: "",                                                 delay: 1.75, color: "" },
    { text: `$ traceroute ${path || "this-page"}`,             delay: 1.85, color: "text-foreground/90" },
    { text: "  1   gateway (192.168.1.1)      0.4 ms",         delay: 2.1,  color: "text-muted-foreground" },
    { text: "  2   * * *  (hop unreachable)",                  delay: 2.35, color: "text-yellow-400" },
    { text: "  3   * * *  (destination not found)",            delay: 2.6,  color: "text-emerald-400" },
    { text: "",                                                 delay: 2.8,  color: "" },
    { text: "  route not mapped - page does not exist.",       delay: 2.9,  color: "text-primary" },
  ]

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16" style={{ overflow: "clip" }}>
      <div className="absolute inset-0 grid-bg opacity-10" />
      <ScanLine />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 8%, transparent) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-lg text-center">
        {/* Code + number */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
          <span className="font-mono text-xs tracking-widest text-primary/80 uppercase">// 404 · not found</span>
          <h1 className="mt-1 font-mono text-[6rem] font-bold leading-none tracking-tight text-foreground sm:text-[8rem]">
            <Glitch text="404" />
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground sm:text-base">
            This route doesn&apos;t exist on the server.
          </p>
          {path && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="mt-1.5 font-mono text-xs text-primary/60"
            >
              <span className="text-muted-foreground/60">tried: </span>
              <span className="text-primary/80">{path}</span>
            </motion.p>
          )}
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
            <span className="font-mono text-xs text-muted-foreground/70">bash - diagnostic</span>
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
              className="inline-block h-3.5 w-2 rounded-sm bg-primary mt-1"
            />
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28, ease: EASE }}
          className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:items-center"
        >
          <Link href="/" className="group inline-flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-95">
            <Home className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
            back home
          </Link>
          <Link href="/projects" className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-mono text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-secondary active:scale-95">
            <Search className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
            browse projects
          </Link>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-6 font-mono text-xs text-muted-foreground/40">
          think this is a mistake?{" "}
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
