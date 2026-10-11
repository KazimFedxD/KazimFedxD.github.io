/**
 * Shared layout shell for SEO/portfolio HTML routes. Provides:
 *  - skip-link target (`#main-content`)
 *  - top nav linking every public HTML route
 *  - footer with an "Open Interactive Portfolio" call-back to /
 *  - JSON-LD slot (children render into it via the page-level metadata API)
 *
 * No client-side JS; layout components are server-rendered.
 */

import Link from "next/link"
import type { ReactNode } from "react"
import { SITE_URL } from "@/config/constants"

interface NavItem {
  href: string
  label: string
}

const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" },
]

interface Props {
  children: ReactNode
  /** Prevents rendering the default nav when the page renders inside the
   *  homepage fallback (where BoxComputer provides its own nav). */
  showNav?: boolean
}

export function PageShell({ children, showNav = true }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {showNav && <SiteHeader />}
      <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 lg:px-8" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

function SiteHeader() {
  return (
    <header className="border-b border-border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-foreground hover:text-primary"
        >
          <span className="text-primary">~</span> kazim@fedxd
        </Link>
        <nav aria-label="Primary" className="overflow-x-auto">
          <ul className="flex items-center gap-3 text-xs font-mono sm:gap-5 sm:text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p className="text-muted-foreground">
          <span className="font-mono text-primary">~</span> Kazim Abbas (FedxD) · {new Date().getFullYear()}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link
            href={`${SITE_URL}?utm_source=seo_footer`}
            className="rounded-md border border-primary px-4 py-2 font-mono text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Open Interactive Portfolio →
          </Link>
        </div>
      </div>
    </footer>
  )
}

/** Small breadcrumb bar reused by all SEO sub-routes. */
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted-foreground">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-foreground/80">
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden>/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
