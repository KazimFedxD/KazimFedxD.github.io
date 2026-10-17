/**
 * Homepage semantic fallback — `sr-only` section that ships meaningful HTML
 * alongside the OS so crawlers, AI search systems, and screen-reader users
 * can navigate to non-OS entry points. Tailwind `sr-only` keeps the block
 * hidden to sighted users so the OS monitor stays the dominant visual.
 *
 * The OS engine sets `cursor-none` only at runtime when BoxComputer boots;
 * the fallback itself never touches `body`.
 */

import Link from "next/link"

export function SemanticFallback() {
  return (
    <div className="sr-only">
      <h1>Kazim Abbas — Backend / Applied AI Engineer · Karachi, Pakistan</h1>
      <p>
        Kazim Abbas, also indexed as Kasim Abbas and known online as FedxD, is a backend and
        applied-AI engineer based in Karachi, Pakistan. He builds production systems in
        Python, Django, and PostgreSQL, and ships voice-first interfaces powered by
        Deepgram, Groq, ElevenLabs, and Anthropic-compatible APIs.
      </p>
      <p>
        His projects include TeachBack (winner of Best Use of AI at AI Preneur &apos;26),
        Skyntel (2nd place at NASA Space Apps Challenge Karachi 2025), FedxD Data
        Container (FxDC), FxPy, FeXoBot, FxQuest, FinCore, Full-Stack Template,
        VoiceMatter, and Portfolio Website.
      </p>
      <nav aria-label="Site sections">
        <ul>
          <li>
            <Link href="/portfolio">Accessible portfolio index — all projects, skills, achievements, and contact</Link>
          </li>
          <li>
            <Link href="/about">About — biography, skills, experience, achievements</Link>
          </li>
          <li>
            <Link href="/projects">Projects — full list with individual project pages</Link>
          </li>
          <li>
            <Link href="/skills">Skills — complete toolkit breakdown</Link>
          </li>
          <li>
            <Link href="/experience">Experience — professional timeline</Link>
          </li>
          <li>
            <Link href="/education">Education — academic and self-taught learning</Link>
          </li>
          <li>
            <Link href="/achievements">Achievements — awards and recognition</Link>
          </li>
          <li>
            <Link href="/contact">Contact — email, GitHub, LinkedIn</Link>
          </li>
        </ul>
      </nav>
      <p>
        The interactive portfolio at <Link href="/">https://fedxd.net</Link> renders a
        simulated operating system: boot sequence, terminal command set, project windows,
        contact form, and a few games. The same data is also exposed through machine-readable
        endpoints (<Link href="/content.json">/content.json</Link>,{" "}
        <Link href="/llms.txt">/llms.txt</Link>, <Link href="/llms-full.txt">/llms-full.txt</Link>,{" "}
        <Link href="/content.txt">/content.txt</Link>) for AI agents.
      </p>
    </div>
  )
}
