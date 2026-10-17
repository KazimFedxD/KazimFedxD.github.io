"use client"

import { useEffect, useRef } from "react"
import { initBoxComputer } from "./box-computer-engine"
import { BOX_COMPUTER_MARKUP } from "./box-computer-markup"
import "./box-computer.css"

// Full-screen retro CRT boot simulation - BIOS -> kernel -> login -> shell,
// `startx` launches a small desktop (window manager, Terminal, a file
// manager, a handful of games, and per-page "browser" windows for the
// site's real content). This IS the site now (rendered from app/page.tsx),
// not an add-on route - see MEMORY.md / project memory for the full history
// of that decision. Entirely client-driven: canvas rendering, a synthesized
// Web Audio engine, and imperative window management, none of which has any
// use for server rendering. See box-computer-engine.ts for why this stays
// one large ported module instead of many small components.
export function BoxComputer() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanup = initBoxComputer(root)
    return () => {
      cleanup?.()
    }
  }, [])

  return (
    <div
      id="main-content" // target of the root layout's "skip to main content" link
      className="rm-machine"
      ref={rootRef}
      // Safe: BOX_COMPUTER_MARKUP is a static, author-written constant with
      // no user input ever interpolated into it - see box-computer-markup.ts.
      dangerouslySetInnerHTML={{ __html: BOX_COMPUTER_MARKUP }}
    />
  )
}
