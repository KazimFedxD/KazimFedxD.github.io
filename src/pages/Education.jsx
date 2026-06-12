// src/pages/Education.jsx
// Product surface. Formal schooling (Fatimiyah Boys College, Happy Home HS)
// and a self-taught learning grid. No decoration; structured information.

import { Section } from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Card, { CardBody, CardHeader } from "../components/ui/Card";
import Chip from "../components/ui/Chip";
import Callout from "../components/ui/Callout";

import eduJson from "../portfolio_data/content/education.json";
import { formatPeriod } from "../lib/format";

function EducationCard({ edu }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <div className="font-mono text-xs text-ink-3">
            {formatPeriod(edu.period)} · {edu.location}
          </div>
          <h3 className="mt-2 text-lg font-semibold text-ink">{edu.degree}</h3>
          <p className="mt-0.5 text-sm text-ink-2">{edu.institution}</p>
        </div>
        {edu.current ? (
          <Chip variant="success" size="sm">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-ok" aria-hidden="true" />
            ACTIVE
          </Chip>
        ) : (
          <Chip variant="muted" size="sm">COMPLETED</Chip>
        )}
      </CardHeader>
      <CardBody>
        <p className="text-sm text-ink-1 leading-relaxed">{edu.description}</p>
        <div className="mt-4">
          <div className="mono-label mb-2">Courses</div>
          <div className="flex flex-wrap gap-1.5">
            {edu.courses.map((c) => (
              <Chip key={c} size="sm">{c}</Chip>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function SelfLearnCard({ area }) {
  return (
    <Card>
      <CardBody>
        <div className="font-mono text-xs text-terminal-1 mb-3 uppercase tracking-normal">
          {area.category}
        </div>
        <ul className="flex flex-col gap-1.5">
          {area.topics.map((t) => (
            <li key={t} className="text-sm text-ink-1 flex items-start gap-2">
              <span className="text-terminal mt-0.5 shrink-0" aria-hidden="true">›</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

export default function Education() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <Section as="section" className="pt-2 md:pt-6 pb-10">
        <div className="font-mono text-xs text-ink-3 mb-3">
          <span className="text-terminal">$</span> history --education
        </div>
        <h1 className="text-fluid-display font-semibold text-ink">
          {eduJson.header.title}
        </h1>
        <p className="mt-3 max-w-prose text-base md:text-lg text-ink-2 leading-relaxed">
          {eduJson.header.subtitle}
        </p>
      </Section>

      {/* ── FORMAL EDUCATION ──────────────────────────────────── */}
      <Section className="pt-6 pb-10">
        <SectionHeader
          eyebrow="formal"
          title="Schooling"
          lede="Two schools, both in Karachi. Currently in 12th grade."
        />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {eduJson.formalEducation.map((edu) => (
            <EducationCard key={`${edu.institution}-${edu.period}`} edu={edu} />
          ))}
        </div>
      </Section>

      {/* ── SELF LEARNING ─────────────────────────────────────── */}
      <Section className="pt-6 pb-10">
        <SectionHeader
          eyebrow="self-taught"
          title="The other 80%"
          lede="What I learned outside the classroom — topics, ordered roughly by depth."
        />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
          {eduJson.selfLearning.map((area) => (
            <SelfLearnCard key={area.category} area={area} />
          ))}
        </div>
      </Section>

      {/* ── PHILOSOPHY CALLOUT ────────────────────────────────── */}
      <Section className="pt-2 pb-4">
        <Callout kind="note" title={eduJson.philosophy.title}>
          <p>{eduJson.philosophy.body}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {eduJson.philosophy.tags.map((t) => (
              <Chip key={t} size="sm">{t}</Chip>
            ))}
          </div>
        </Callout>
      </Section>
    </>
  );
}
