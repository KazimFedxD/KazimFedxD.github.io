// src/pages/About.jsx
// Brand surface (about). Bio, "What I do", values, journey timeline, GitHub
// activity, resume download. Content preserved verbatim from
// portfolio_data/content/about.md (prose) and the structured fields.

import { useEffect, useState } from "react";
import { FileText, MapPin, Sparkles } from "lucide-react";

import { Section } from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Prose from "../components/ui/Prose";
import Card, { CardBody, CardHeader } from "../components/ui/Card";
import Chip from "../components/ui/Chip";
import Button from "../components/ui/Button";
import GitHubHeatmap from "../components/ui/GitHubHeatmap";

// ── Preserved content (verbatim from portfolio_data/content/about.md) ──
// The NASA sentence is wrapped in <em> at render time as a "voice aside."
const BIO_PARAGRAPHS = [
  "I'm a passionate Software Developer from Karachi, Pakistan, specializing in backend engineering and full-stack development. Currently in 12th grade at Fatimiyah Boys College studying Computer Science, I combine academic knowledge with hands-on experience in building real-world applications.",
  null, // sentinel: the NASA aside is rendered as <em> below
  "As a self-taught developer supplementing my formal education, I've developed a strong foundation in modern web technologies, with a particular focus on Python, Django, and building scalable systems.",
];

const NASA_ASIDE =
  'My journey in tech is driven by curiosity and a desire to create solutions that make a difference. From winning 2nd place at NASA Space Apps Challenge 2025 with Skyntel, to managing KayzBlog with 40,000+ views, to building Discord bots deployed across 10+ servers — I thrive on challenges that push me to learn and grow.';

const INTERESTS = [
  { name: "Backend Development",         note: "Building robust and scalable server-side applications" },
  { name: "Automation",                  note: "Creating efficient workflows and automated solutions" },
  { name: "Hardware-Software Integration", note: "Bridging physical and digital worlds" },
  { name: "Innovation",                  note: "Exploring cutting-edge technologies and methodologies" },
];

const VALUES = [
  { name: "Problem Solver",     note: "Analytical approach to complex challenges" },
  { name: "Passionate Learner", note: "Constantly expanding my skillset" },
  { name: "Professional",       note: "Committed to quality and best practices" },
  { name: "Team Player",        note: "Collaborative and communicative" },
];

const TIMELINE = [
  { year: "2025", event: "NASA Space Apps Challenge Winner" },
  { year: "2024", event: "Started KayzBlog Management" },
  { year: "2023", event: "Began Self-Taught Developer Journey" },
];

/* ── GitHub stats card ─────────────────────────────────────────────── */
function GitHubCard() {
  const [stats, setStats] = useState({ repos: null, followers: null });

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/users/KazimFedxD")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return;
        setStats({ repos: d.public_repos, followers: d.followers });
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="font-mono text-xs text-ink-3">
          <span className="text-terminal">$</span> git log --oneline --graph
        </div>
        <Chip size="sm" variant="muted">github.com/KazimFedxD</Chip>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="rounded-sm border border-rule p-3 bg-carbon-2">
            <div className="font-mono text-xl text-ink leading-none">
              {stats.repos ?? "—"}
            </div>
            <div className="font-mono text-[10px] text-ink-3 mt-1 uppercase">
              Public repos
            </div>
          </div>
          <div className="rounded-sm border border-rule p-3 bg-carbon-2">
            <div className="font-mono text-xl text-ink leading-none">
              {stats.followers ?? "—"}
            </div>
            <div className="font-mono text-[10px] text-ink-3 mt-1 uppercase">
              Followers
            </div>
          </div>
          <div className="rounded-sm border border-rule p-3 bg-carbon-2">
            <div className="font-mono text-xl text-ink leading-none">
              500+
            </div>
            <div className="font-mono text-[10px] text-ink-3 mt-1 uppercase">
              Contributions
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-rule p-3 overflow-x-auto no-scrollbar">
          <GitHubHeatmap username="KazimFedxD" />
        </div>
      </CardBody>
    </Card>
  );
}

export default function About() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <Section as="section" className="pt-2 md:pt-6 pb-10">
        <div className="font-mono text-xs text-ink-3 mb-3">
          <span className="text-terminal">$</span> cat about.md
        </div>
        <h1 className="text-fluid-display font-semibold text-ink">
          Who I am
        </h1>
        <p className="mt-3 max-w-prose text-base md:text-lg text-ink-2 leading-relaxed">
          Backend developer from Karachi. Building production systems in Django,
          Python, and PostgreSQL. Open to remote backend opportunities.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Chip variant="solid" size="md">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-ok" aria-hidden="true" />
            Open to Remote Backend Development Opportunities
          </Chip>
          <span className="inline-flex items-center gap-1.5 text-sm text-ink-2">
            <MapPin size={14} strokeWidth={1.75} />
            Karachi, Pakistan
          </span>
        </div>
      </Section>

      {/* ── BIO ────────────────────────────────────────────────── */}
      <Section className="pt-6 pb-10">
        <SectionHeader eyebrow="bio" title="The work, briefly" />
        <div className="mt-6">
          <Prose>
            {BIO_PARAGRAPHS.map((p, i) =>
              p === null ? (
                <p key={i}><em>{NASA_ASIDE}</em></p>
              ) : (
                <p key={i}>{p}</p>
              )
            )}
          </Prose>
        </div>
      </Section>

      {/* ── WHAT I DO ─────────────────────────────────────────── */}
      <Section className="pt-6 pb-10">
        <SectionHeader eyebrow="focus areas" title="What I do" />
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
          {INTERESTS.map((it) => (
            <li
              key={it.name}
              className="flex items-start gap-3 p-3 rounded-sm border border-rule bg-carbon-1"
            >
              <Sparkles size={14} strokeWidth={1.75} className="text-terminal mt-0.5 shrink-0" />
              <div>
                <div className="text-sm text-ink font-medium">{it.name}</div>
                <div className="mt-0.5 text-xs text-ink-2">{it.note}</div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── CORE VALUES ───────────────────────────────────────── */}
      <Section className="pt-6 pb-10">
        <SectionHeader eyebrow="principles" title="Core values" />
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
          {VALUES.map((v) => (
            <li
              key={v.name}
              className="p-3 rounded-sm border border-rule bg-carbon-1"
            >
              <div className="text-sm text-ink font-medium">{v.name}</div>
              <div className="mt-0.5 text-xs text-ink-2">{v.note}</div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── MY JOURNEY ────────────────────────────────────────── */}
      <Section className="pt-6 pb-10">
        <SectionHeader eyebrow="timeline" title="My journey" />
        <ol className="mt-6 max-w-2xl">
          {TIMELINE.map((t) => (
            <li
              key={t.year}
              className="relative pl-7 pb-6 last:pb-0 border-l border-rule ml-2"
            >
              <span
                className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full border border-terminal bg-carbon"
                aria-hidden="true"
              />
              <div className="font-mono text-xs text-terminal-1">{t.year}</div>
              <div className="mt-1 text-ink">{t.event}</div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── GITHUB STATS ──────────────────────────────────────── */}
      <Section className="pt-6 pb-10">
        <SectionHeader
          eyebrow="open source"
          title="What I'm committing to"
          lede="A live view of contributions to public repositories. The full history is on GitHub."
        />
        <div className="mt-6 max-w-3xl">
          <GitHubCard />
        </div>
      </Section>

      {/* ── RESUME CTA ────────────────────────────────────────── */}
      <Section className="pt-6 pb-4">
        <Card>
          <CardBody className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-ink-3 mb-1.5">
                <span className="text-terminal">$</span> open ./resume.pdf
              </div>
              <div className="text-ink">Want the printable version?</div>
              <p className="mt-1 text-sm text-ink-2 max-w-prose">
                One-page CV with full experience, education, and tech stack.
              </p>
            </div>
            <Button
              as="a"
              href="/Kazim%20Abbas%20CV.pdf"
              variant="primary"
              size="md"
              external
              trailingArrow
            >
              <FileText size={14} strokeWidth={1.75} />
              Download Resume
            </Button>
          </CardBody>
        </Card>
      </Section>
    </>
  );
}
