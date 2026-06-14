// src/pages/Home.jsx
// Brand surface. The voice leads; the work supports. The single expressive
// moment on the page is the ASCII monogram in the hero — the only place a
// non-text element appears above the fold.

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Code2, Sparkles, Rocket, Award, ArrowRight, ArrowUpRight,
  Github, Linkedin, Mail, Trophy, MapPin,
} from "lucide-react";

import { Section } from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Card, { CardBody, CardHeader } from "../components/ui/Card";
import Chip from "../components/ui/Chip";
import Button from "../components/ui/Button";
import SectionRule from "../components/ui/SectionRule";
import { useReducedMotion } from "../lib/motion";
import { cn } from "../lib/cn";
import { getSortedProjects } from "../data/registry";
import homeContent from "../portfolio_data/content/home.json";

const ICON_FOR = { Code2, Sparkles, Rocket, Award, Trophy };

/* ── Typing rotation, re-implemented inline (no third-party lib) ──────── */
function useTyping(sequences) {
  const [idx, setIdx] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return; // show the first one only
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % sequences.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [sequences.length, reduced]);

  return sequences[idx] || sequences[0];
}

function TypingRole() {
  const seq = useTyping(homeContent.typingAnimation.sequences);
  return (
    <span className="font-mono text-base md:text-lg text-ink-2 inline-flex items-center">
      <span className="text-terminal mr-2">$</span>
      <span className="text-ink-1">{seq.text}</span>
      <span className="typing-cursor animate-caret-blink motion-reduce:opacity-0" aria-hidden="true" />
    </span>
  );
}

/* ── Amber "open to work" status badge with ping dot ─────────────────── */
function StatusBadge() {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 h-7 px-2.5 rounded-sm",
        "border border-amber/40 bg-amber/[0.08] text-amber",
        "font-mono text-xs font-medium uppercase tracking-[0.04em]"
      )}
    >
      <span className="relative inline-flex w-1.5 h-1.5">
        <span className="absolute inset-0 rounded-full bg-amber animate-ping opacity-60 motion-reduce:hidden" />
        <span className="relative w-1.5 h-1.5 rounded-full bg-amber" />
      </span>
      Open to Opportunities
    </span>
  );
}

/* ── ASCII monogram — the single expressive moment on this page ─────── */
function AsciiMonogram() {
  // Box-drawing characters render most consistently in Geist Mono. The cursor
  // block █ at the end animates via caret-blink to suggest an active shell.
  return (
    <div
      className={cn(
        "rounded-sm border border-rule bg-carbon-1 p-4 shadow-lift",
        "transition-colors duration-180 ease-out"
      )}
    >
      <div className="font-mono text-[10px] leading-[1.45] text-ink-2 select-none">
        <pre className="m-0">
{`╔════════════════════════╗
║  ~/kazim               ║
║  $ whoami              ║
║  > Kazim Abbas         ║
║  > Backend Engineer    ║
║  > Django · Python     ║
║  > NASA Winner '25     ║
║  $ █                   ║
╚════════════════════════╝`}
        </pre>
      </div>
      <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-ink-3">
        <span>interactive</span>
        <span>v2026.06</span>
      </div>
    </div>
  );
}

/* ── Featured project (NASA winner) ─────────────────────────────────── */
function FeaturedProject() {
  const featured = useMemo(
    () => getSortedProjects().filter((p) => p.badge && p.badge.includes("NASA")).slice(0, 1)[0],
    []
  );
  if (!featured) return null;

  // K7: extract the year from any of the project's badges that match a 4-digit year.
  const year = (() => {
    if (!featured.badge) return null;
    const m = featured.badge.match(/(\d{4})/);
    return m ? m[1] : null;
  })();

  return (
    // K1: replaced the hardcoded <Card as="a" href="/projects/Skyntel"> with a
    // non-link card containing explicit Source + "case study coming soon" labels.
    <Card raised accent className="block max-w-3xl surface-elev-accent">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy size={14} strokeWidth={1.75} className="text-amber" />
          <span className="font-mono text-xs text-ink-3 uppercase tracking-[0.05em]">
            Featured Achievement
          </span>
        </div>
        <Chip variant="achievement" size="sm">
          {featured.badge}
        </Chip>
      </CardHeader>
      <CardBody>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3 className="text-2xl font-bold text-ink tracking-tight">{featured.title}</h3>
          {year && (
            <span className="font-mono text-xs text-ink-3">
              NASA Space Apps {year}
            </span>
          )}
        </div>
        <hr className="mt-3 border-0 h-px bg-rule" aria-hidden="true" />
        <p className="mt-3 text-sm text-ink-1 leading-relaxed">
          {featured.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {featured.tech.slice(0, 6).map((t) => (
            <Chip key={t} size="sm" variant="tech">{t}</Chip>
          ))}
          {featured.tech.length > 6 && (
            <Chip size="sm" variant="muted">+{featured.tech.length - 6}</Chip>
          )}
        </div>
        <div className="mt-5 flex items-center gap-4 text-sm">
          <Link
            to={`/projects/${featured.title}`}
            className="inline-flex items-center gap-1.5 text-terminal-1 hover:text-terminal-2 transition-colors duration-180"
          >
            Read the case study
            <ArrowRight size={12} strokeWidth={1.75} />
          </Link>
          {featured.github && (
            <a
              href={featured.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-ink-1 hover:text-terminal-1 transition-colors duration-180"
            >
              Source
              <ArrowUpRight size={12} strokeWidth={1.75} />
            </a>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

/* ── Quick links ────────────────────────────────────────────────────── */
const QUICK_LINKS = homeContent.quickLinks.map((q) => ({
  ...q,
  Icon: ICON_FOR[q.icon] || ArrowRight,
}));

function QuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {QUICK_LINKS.map((q) => (
        <Link
          key={q.title}
          to={q.link}
          className={cn(
            "group block p-4 md:p-5 rounded-sm border border-rule bg-carbon-1",
            "hover:border-terminal/60 hover:bg-carbon-2",
            "transition-[border-color,background-color,box-shadow] duration-180 ease-out",
            "hover:shadow-hover-lift focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-terminal focus-visible:ring-offset-2 focus-visible:ring-offset-carbon"
          )}
        >
          <div className="flex items-center justify-between">
            <q.Icon
              size={16}
              strokeWidth={1.75}
              className="text-terminal"
              aria-hidden="true"
            />
            <ArrowRight
              size={14}
              strokeWidth={1.75}
              className="text-ink-3 group-hover:text-terminal-1 group-hover:translate-x-0.5 transition-transform duration-180"
            />
          </div>
          <div className="mt-3 text-base font-medium text-ink">{q.title}</div>
          <p className="mt-1 text-sm text-ink-2 leading-relaxed">
            {q.description}
          </p>
        </Link>
      ))}
    </div>
  );
}

/* ── Stats row — single mono "by the numbers" line, not 4 cards ─────── */
function StatRow() {
  return (
    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-sm text-ink-2 border-t border-b border-rule py-3">
      {homeContent.stats.map((s, i) => (
        <div key={s.label} className="inline-flex items-baseline gap-1.5">
          <span className="text-base md:text-lg font-bold text-ink">
            {s.value}
          </span>
          <span className="text-ink-3 text-xs uppercase tracking-[0.05em]">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Social row (K2: primary email) ─────────────────────────────────── */
function SocialRow() {
  return (
    <div className="flex items-center gap-2">
      {[
        { icon: Github,   href: "https://github.com/KazimFedxD",                          label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/kazim-abbas-60b1b5257/",     label: "LinkedIn" },
        { icon: Mail,     href: "mailto:abbaskazim135@gmail.com",                         label: "Email" },
      ].map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          aria-label={label}
          className="inline-flex items-center gap-2 h-9 px-3 rounded-sm border border-rule bg-carbon-1 text-ink-2 hover:border-terminal hover:text-terminal-1 transition-colors duration-180 ease-out"
        >
          <Icon size={14} strokeWidth={1.75} />
          <span className="font-mono text-xs hidden sm:inline">{label}</span>
        </a>
      ))}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <Section as="section" className="pt-2 md:pt-6 pb-12 md:pb-16" density="spacious">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* Left: text content. */}
          <div className="md:col-span-7 max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
              <span className="text-terminal">$</span> whoami
            </div>
            <h1 className="text-fluid-display font-bold text-ink">
              {homeContent.header.name}
            </h1>
            <div className="mt-3 h-px w-10 bg-terminal" aria-hidden="true" />
            <div className="mt-4 h-7">
              <TypingRole />
            </div>
            <p className="mt-6 max-w-prose text-base md:text-lg text-ink-2 leading-relaxed text-pretty">
              {homeContent.summary}
            </p>

            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <StatusBadge />
              <span className="inline-flex items-center gap-1.5 text-sm text-ink-2">
                <MapPin size={14} strokeWidth={1.75} />
                Karachi, Pakistan
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button as={Link} to="/contact" variant="primary" size="md" trailingArrow>
                Get in touch
              </Button>
              <Button as="a" href="/Kazim%20Abbas%20CV.pdf" variant="ghost" size="md" external>
                Download resume
              </Button>
            </div>

            {/* B4: "now" strip — single mono line under the CTAs. */}
            <div className="mt-8 font-mono text-xs text-ink-2">
              <span className="text-terminal">▸</span> now: shipping FinCore backend rewrite · open to remote backend roles · 24–48h reply
            </div>
          </div>

          {/* Right: ASCII monogram (md+ only). The single expressive moment. */}
          <div className="hidden md:block md:col-span-5">
            <AsciiMonogram />
          </div>
        </div>
      </Section>

      <SectionRule />

      {/* ── STATS ─────────────────────────────────────────────── */}
      <Section className="pt-2 pb-10" density="tight">
        <StatRow />
      </Section>

      {/* ── FEATURED ACHIEVEMENT ──────────────────────────────── */}
      <Section className="pt-6 pb-10">
        <SectionHeader
          eyebrow="latest work"
          title="Featured Achievement"
          lede="The 2nd-place project from NASA Space Apps Challenge 2025 — Karachi local event, judged against other teams presenting solutions to a NASA-defined challenge."
        />
        <div className="mt-8">
          <FeaturedProject />
        </div>
      </Section>

      {/* ── QUICK LINKS ───────────────────────────────────────── */}
      <Section className="pt-6 pb-10">
        <SectionHeader
          eyebrow="explore"
          title="Three places to start"
          lede="Projects to look at, the technical toolkit, and a timeline of work so far."
        />
        <div className="mt-8">
          <QuickLinks />
        </div>
      </Section>

      {/* ── SOCIALS ───────────────────────────────────────────── */}
      <Section className="pt-6 pb-4" density="tight">
        <div className="rounded-sm border border-rule bg-carbon-1 p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-1.5">
              <span className="text-terminal">$</span> ls ./socials
            </div>
            <div className="text-ink">Find me elsewhere</div>
          </div>
          <SocialRow />
        </div>
      </Section>
    </>
  );
}
