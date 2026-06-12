// src/pages/Achievements.jsx
// Brand surface. One NASA award, one self-taught certification, four stats.
// Voice leads; the trophy is earned, not decorative.

import { Trophy, Award, Star, Sparkles, ArrowUpRight, Calendar } from "lucide-react";

import { Section } from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Card, { CardBody, CardHeader } from "../components/ui/Card";
import Chip from "../components/ui/Chip";
import Metric from "../components/ui/Metric";

import achJson from "../portfolio_data/content/achievements.json";

const ICON_FOR = { Trophy, Award, Star, Sparkles };

export default function Achievements() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <Section as="section" className="pt-2 md:pt-6 pb-10">
        <div className="font-mono text-xs text-ink-3 mb-3">
          <span className="text-terminal">$</span> ls ./awards
        </div>
        <h1 className="text-fluid-display font-semibold text-ink">
          {achJson.header.title}
        </h1>
        <p className="mt-3 max-w-prose text-base md:text-lg text-ink-2 leading-relaxed">
          {achJson.header.subtitle}
        </p>
      </Section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <Section className="pt-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achJson.stats.map((s) => {
            const Icon = ICON_FOR[s.icon] || Sparkles;
            return <Metric key={s.label} value={s.value} label={s.label} icon={Icon} />;
          })}
        </div>
      </Section>

      {/* ── ACHIEVEMENTS ──────────────────────────────────────── */}
      <Section className="pt-6 pb-10">
        <SectionHeader
          eyebrow="recognition"
          title="Awards & milestones"
          lede="A few things I'm proud of. The work behind each is in the Projects and Experience pages."
        />
        <div className="mt-6 max-w-3xl flex flex-col gap-4">
          {achJson.achievements.map((a, i) => (
            <Card key={i}>
              <CardHeader>
                <div>
                  <div className="font-mono text-xs text-ink-3 flex items-center gap-2">
                    <Calendar size={12} strokeWidth={1.75} />
                    <span>{a.year}</span>
                    <span className="text-ink-3/60">·</span>
                    <span>{a.badge}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{a.title}</h3>
                  <p className="mt-0.5 text-sm text-terminal-1 font-medium">{a.position}</p>
                </div>
                <Chip variant="solid" size="sm">{a.position}</Chip>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-ink-1 leading-relaxed">{a.description}</p>
                <ul className="mt-4 flex flex-col gap-1.5">
                  {a.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-ink-1">
                      <span className="text-terminal mt-0.5 shrink-0" aria-hidden="true">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {a.tech.map((t) => (
                    <Chip key={t} size="sm">{t}</Chip>
                  ))}
                </div>
                {a.link && (
                  <div className="mt-4">
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-ink-1 hover:text-terminal-1"
                    >
                      <Trophy size={14} strokeWidth={1.75} />
                      View on GitHub
                      <ArrowUpRight size={12} strokeWidth={1.75} />
                    </a>
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── CERTIFICATIONS ────────────────────────────────────── */}
      <Section className="pt-2 pb-4">
        <SectionHeader
          eyebrow="self-cert"
          title="Certifications & learning"
          lede="Self-education counts. Below is a record of the structured, self-directed learning I've committed to."
        />
        <div className="mt-6 max-w-3xl flex flex-col gap-4">
          {achJson.certifications.map((c, i) => (
            <Card key={i}>
              <CardHeader>
                <div>
                  <div className="font-mono text-xs text-ink-3">
                    {c.year} · {c.issuer}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{c.title}</h3>
                </div>
                <Chip variant="muted" size="sm">Self-directed</Chip>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-ink-1 leading-relaxed">{c.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <Chip key={s} size="sm">{s}</Chip>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
