"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Terminal } from "lucide-react"

const LINES = [
  { text: "SSH-2.0-OpenSSH_9.3p1 Ubuntu-1ubuntu3.6", delay: 0.2 },
  { text: "", delay: 0.5 },
  { text: "fedxd.net login: admin", delay: 0.8 },
  { text: "Password: ", delay: 1.4 },
  { text: "", delay: 2.0 },
  { text: "Access denied.", delay: 2.2, color: "text-emerald-400" },
  { text: "", delay: 2.5 },
  { text: "fedxd.net login: root", delay: 2.7 },
  { text: "Password: ", delay: 3.3 },
  { text: "", delay: 3.9 },
  { text: "Access denied.", delay: 4.1, color: "text-emerald-400" },
  { text: "", delay: 4.4 },
  { text: "fedxd.net login: kazim", delay: 4.6 },
  { text: "Password: ", delay: 5.2 },
  { text: "", delay: 5.8 },
  { text: "Access denied.", delay: 6.0, color: "text-emerald-400" },
  { text: "", delay: 6.3 },
  { text: "Connection closed by remote host.", delay: 6.5, color: "text-yellow-400" },
  { text: "", delay: 6.8 },
  { text: "# nice try though.", delay: 7.0, color: "text-primary" },
  { text: "# there is no admin panel here.", delay: 7.3, color: "text-muted-foreground" },
  { text: "# this is a Next.js static site.", delay: 7.6, color: "text-muted-foreground" },
  { text: "# go home. → /", delay: 8.0, color: "text-green-400" },
]

export default function AdminPage() {
  const [visible, setVisible] = useState<number[]>([])
  const [blink, setBlink] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisible(v => [...v, i])
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
      }, line.delay * 1000)
    })
    const t = setInterval(() => setBlink(b => !b), 600)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl font-mono text-sm"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
          <Terminal className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">ssh admin@fedxd.net</span>
        </div>

        {/* Terminal output */}
        <div className="min-h-96 space-y-1 p-6">
          {LINES.map((line, i) =>
            visible.includes(i) ? (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                className={line.color ?? "text-foreground"}
              >
                {line.text || "\u00a0"}
              </motion.div>
            ) : null
          )}
          {visible.length >= LINES.length && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-green-400">kazim</span>
              <span className="text-muted-foreground">@</span>
              <span className="text-cyan-400">fedxd.net</span>
              <span className="text-muted-foreground">:~$</span>
              <span
                className="inline-block h-4 w-2 rounded-sm bg-primary"
                style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}
              />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-3 text-xs text-muted-foreground/50">
          <a href="/" className="hover:text-primary transition-colors">← back to fedxd.net</a>
        </div>
      </motion.div>
    </div>
  )
}

