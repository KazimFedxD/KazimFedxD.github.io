// src/components/layout/TopNav.jsx
// Terminal-style top nav. Eight links + a ⌘K hint that opens the command
// palette. Active state: 1px leading dot + 2px terminal bar. Mobile sheet.

import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "../../lib/cn";
import { useCommandPalette } from "./CommandPalette";

const links = [
  { name: "Home",         path: "/" },
  { name: "About",        path: "/about" },
  { name: "Skills",       path: "/skills" },
  { name: "Projects",     path: "/projects" },
  { name: "Achievements", path: "/achievements" },
  { name: "Experience",   path: "/experience" },
  { name: "Education",    path: "/education" },
  { name: "Contact",      path: "/contact" },
];

const socials = [
  { icon: Github,   href: "https://github.com/KazimFedxD",                                        label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/kazim-abbas-60b1b5257/",                   label: "LinkedIn" },
  { icon: Mail,     href: "mailto:abbaskazim135@gmail.com",                                       label: "Email" },
];

// Detect Mac for the ⌘ vs Ctrl glyph.
const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform);

export default function TopNav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openPalette } = useCommandPalette();

  // Auto-close the mobile sheet on route change.
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Track scroll for the hairline rule.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-[border-color] duration-180 ease-out",
        "border-b",
        scrolled ? "border-rule" : "border-transparent"
      )}
      style={{ background: "color-mix(in oklch, var(--carbon) 88%, transparent)", backdropFilter: "saturate(140%)" }}
    >
      <nav
        className="mx-auto max-w-page px-5 md:px-8 h-14 flex items-center justify-between"
        aria-label="Primary"
      >
        {/* Brand wordmark — terminal path + version pin on hover. */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-sm"
          aria-label="Home — Kazim Abbas"
        >
          <span className="text-terminal">~/</span>
          <span className="text-ink">kazim</span>
          <span className="w-px h-3 bg-rule" aria-hidden="true" />
          <span className="font-mono text-[10px] text-ink-3 opacity-0 group-hover:opacity-100 transition-opacity duration-180">
            v2026.06
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.path}>
              <NavLink
                to={l.path}
                end={l.path === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative text-sm transition-colors duration-180 ease-out",
                    "py-4", // enough vertical room for the active bar
                    isActive
                      ? "text-ink nav-active"
                      : "text-ink-2 hover:text-ink"
                  )
                }
              >
                {l.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right rail: ⌘K hint + socials */}
        <div className="hidden md:flex items-center gap-3 text-ink-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="inline-flex items-center gap-1.5 h-7 px-2 rounded-sm border border-rule bg-carbon-1 hover:border-ink-3 hover:text-ink-1 transition-colors duration-180 ease-out"
          >
            <span className="font-mono text-[10px] text-ink-3">Search</span>
            <kbd className="font-mono text-[10px] text-ink-3 border border-rule rounded-sm px-1 h-4 inline-flex items-center">
              {isMac ? "⌘" : "Ctrl"}K
            </kbd>
          </button>
          <span className="w-px h-4 bg-rule" aria-hidden="true" />
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="hover:text-terminal-1 transition-colors duration-180 ease-out"
            >
              <Icon size={16} strokeWidth={1.75} />
            </a>
          ))}
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden h-9 w-9 inline-flex items-center justify-center text-ink hover:text-terminal-1"
        >
          {open ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
        </button>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-rule"
          style={{ background: "var(--carbon)" }}
        >
          <ul className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.path}>
                <NavLink
                  to={l.path}
                  end={l.path === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 px-3 py-2.5 rounded-sm font-mono text-sm transition-colors duration-180 ease-out",
                      isActive
                        ? "text-ink bg-carbon-1"
                        : "text-ink-2 hover:text-ink hover:bg-carbon-1"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span aria-hidden="true" className={cn("text-terminal", !isActive && "opacity-0")}>
                        →
                      </span>
                      <span>{l.name}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
            <li className="mt-3 pt-3 border-t border-rule flex items-center gap-4 px-3 text-ink-2">
              <button
                type="button"
                onClick={openPalette}
                className="inline-flex items-center gap-1.5 h-7 px-2 rounded-sm border border-rule bg-carbon-1 hover:border-ink-3 hover:text-ink-1 transition-colors"
              >
                <span className="font-mono text-[10px]">Search</span>
                <kbd className="font-mono text-[10px] border border-rule rounded-sm px-1 h-4 inline-flex items-center">
                  {isMac ? "⌘" : "Ctrl"}K
                </kbd>
              </button>
              <span className="w-px h-4 bg-rule" aria-hidden="true" />
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="hover:text-terminal-1"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
