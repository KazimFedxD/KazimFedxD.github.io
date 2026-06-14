// src/components/layout/Footer.jsx
// Three columns: brand+resume, sitemap, socials. Hairline rule above, mono
// metadata line below. Quiet, never decorative.

import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, FileText, ArrowUpRight } from "lucide-react";

const sections = [
  {
    title: "Navigate",
    items: [
      { label: "Home",         to: "/" },
      { label: "Projects",     to: "/projects" },
      { label: "Experience",   to: "/experience" },
      { label: "Contact",      to: "/contact" },
    ],
  },
  {
    title: "Work",
    items: [
      { label: "Skills",       to: "/skills" },
      { label: "Achievements", to: "/achievements" },
      { label: "About",        to: "/about" },
      { label: "Education",    to: "/education" },
    ],
  },
];

const socials = [
  { icon: Github,   href: "https://github.com/KazimFedxD",                                      label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/kazim-abbas-60b1b5257/",                 label: "LinkedIn" },
  { icon: Mail,     href: "mailto:abbaskazim135@gmail.com",                                     label: "Email" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto max-w-page px-5 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div>
            <div className="font-mono text-sm text-terminal">
              ~/kazim
            </div>
            <p className="mt-3 text-sm text-ink-2 max-w-prose">
              Backend developer from Karachi. Django, Python, PostgreSQL,
              and shipping. Open to remote backend opportunities.
            </p>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">
              updated 2026.06
            </div>
            <a
              href="/Kazim%20Abbas%20CV.pdf"
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink hover:text-terminal-1 transition-colors duration-180 ease-out"
              target="_blank"
              rel="noreferrer"
            >
              <FileText size={14} strokeWidth={1.75} />
              <span>Resume</span>
              <span className="text-ink-3 font-mono text-xs">.pdf</span>
            </a>
          </div>

          {/* Sitemap */}
          {sections.map((s) => (
            <div key={s.title}>
              <div className="mono-label mb-3">{s.title}</div>
              <ul className="flex flex-col gap-2">
                {s.items.map((it) => (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      className="text-sm text-ink-1 hover:text-terminal-1 transition-colors duration-180 ease-out"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom rail */}
        <div className="mt-12 pt-6 border-t border-rule flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-mono text-xs text-ink-3">
            <span className="text-terminal">●</span>{" "}
            fedxd.net · Karachi · 2026
          </div>
          <div className="flex items-center gap-4 text-ink-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="hover:text-terminal-1 transition-colors duration-180 ease-out inline-flex items-center gap-1.5"
              >
                <Icon size={14} strokeWidth={1.75} />
                <span className="font-mono text-xs hidden sm:inline">{label}</span>
                <ArrowUpRight size={12} strokeWidth={1.75} className="text-ink-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
