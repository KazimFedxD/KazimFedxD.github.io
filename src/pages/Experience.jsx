// src/pages/Experience.jsx
// Product surface. Two timeline entries (KayzBlog, Disutils). Each shows
// period, role, company, location, description, responsibilities,
// achievements, tech chips, and an ACTIVE / ENDED status pill.

import { MapPin, Calendar, Check } from "lucide-react";

import { Section } from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Card, { CardBody, CardHeader } from "../components/ui/Card";
import Chip from "../components/ui/Chip";

import expJson from "../portfolio_data/content/experience.json";
import { formatPeriod } from "../lib/format";

function StatusPill({ current }) {
  if (current === true) {
    return (
      <Chip variant="success" size="sm">
        <span className="w-1.5 h-1.5 rounded-full bg-signal-ok" aria-hidden="true" />
        ACTIVE
      </Chip>
    );
  }
  if (current === false) {
    return <Chip variant="muted" size="sm">ENDED</Chip>;
  }
  return null;
}

function ExperienceCard({ exp }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-ink-3">
            <Calendar size={12} strokeWidth={1.75} />
            <span>{formatPeriod(exp.period)}</span>
            <span className="text-ink-3/60">·</span>
            <MapPin size={12} strokeWidth={1.75} />
            <span>{exp.location}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-ink">
            {exp.role}{" "}
            <span className="text-ink-2 font-normal">at</span>{" "}
            <span className="text-ink">{exp.company}</span>
          </h3>
          <p className="mt-0.5 text-sm text-ink-2">{exp.type}</p>
        </div>
        <StatusPill current={exp.current} />
      </CardHeader>
      <CardBody>
        <p className="text-sm text-ink-1 leading-relaxed">{exp.description}</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mono-label mb-2">Responsibilities</div>
            <ul className="flex flex-col gap-1.5">
              {exp.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-1">
                  <span className="text-terminal mt-1 shrink-0" aria-hidden="true">›</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mono-label mb-2">Outcomes</div>
            <ul className="flex flex-col gap-1.5">
              {exp.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-1">
                  <Check size={13} strokeWidth={1.75} className="text-terminal mt-0.5 shrink-0" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {exp.tech.map((t) => (
            <Chip key={t} size="sm">{t}</Chip>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

export default function Experience() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <Section as="section" className="pt-2 md:pt-6 pb-10">
        <div className="font-mono text-xs text-ink-3 mb-3">
          <span className="text-terminal">$</span> history --work
        </div>
        <h1 className="text-fluid-display font-semibold text-ink">
          {expJson.header.title}
        </h1>
        <p className="mt-3 max-w-prose text-base md:text-lg text-ink-2 leading-relaxed">
          {expJson.header.subtitle}
        </p>
      </Section>

      {/* ── TIMELINE ──────────────────────────────────────────── */}
      <Section className="pt-6 pb-10">
        <ol className="max-w-4xl flex flex-col gap-6">
          {expJson.experiences.map((exp) => (
            <li key={`${exp.company}-${exp.period}`}>
              <ExperienceCard exp={exp} />
            </li>
          ))}
        </ol>
      </Section>

      {/* ── SKILLS GAINED ─────────────────────────────────────── */}
      <Section className="pt-2 pb-4">
        <SectionHeader
          eyebrow="what I learned"
          title="Skills gained"
          lede="The capabilities each role sharpened."
        />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl">
          {expJson.skillsGained.map((cat) => (
            <Card key={cat.category}>
              <CardBody>
                <div className="font-mono text-xs text-terminal-1 mb-3 uppercase tracking-normal">
                  {cat.category}
                </div>
                <ul className="flex flex-col gap-1.5">
                  {cat.items.map((it) => (
                    <li key={it} className="text-sm text-ink-1">
                      {it}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
