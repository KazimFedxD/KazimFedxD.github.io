// src/pages/Skills.jsx
// Product surface. Categorized skills with proficiency. Hairline bars in
// terminal-green, no animations, monospace throughout.

import { useMemo, useState } from "react";
import { Code2, Zap, Database, Server, Award } from "lucide-react";

import { Section } from "../components/layout/PageShell";
import Card, { CardBody } from "../components/ui/Card";
import Metric from "../components/ui/Metric";
import { cn } from "../lib/cn";

import skillsJson from "../portfolio_data/content/skills.json";

const CAT_ICONS = { Code2, Zap, Database, Server };

const PROF_LABEL = (n) => {
  if (n >= 90) return "Expert";
  if (n >= 80) return "Advanced";
  if (n >= 70) return "Proficient";
  if (n >= 60) return "Intermediate";
  return "Familiar";
};

function SkillRow({ name, level, icon }) {
  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {icon && <span aria-hidden="true" className="text-sm shrink-0">{icon}</span>}
          <span className="text-sm text-ink truncate">{name}</span>
        </div>
        <div className="flex items-baseline gap-2 shrink-0">
          <span className="font-mono text-xs text-ink-3 uppercase">
            {PROF_LABEL(level)}
          </span>
          <span className="font-mono text-xs text-ink-1 tabular-nums w-9 text-right">
            {level}%
          </span>
        </div>
      </div>
      <div
        className="mt-2 h-px bg-rule relative"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency ${level}%`}
      >
        <div
          className="absolute inset-y-0 left-0 bg-terminal"
          style={{ width: `${level}%`, height: "1px", top: "0" }}
        />
      </div>
    </li>
  );
}

function CategoryCard({ category, isOpen }) {
  const Icon = CAT_ICONS[category.icon] || Code2;
  return (
    <Card>
      <div className="px-5 pt-5 pb-3 flex items-center gap-2">
        <Icon size={14} strokeWidth={1.75} className="text-terminal" aria-hidden="true" />
        <h3 className="text-base font-medium text-ink">{category.title}</h3>
        <span className="ml-auto font-mono text-xs text-ink-3">
          {category.skills.length} skills
        </span>
      </div>
      <CardBody>
        <ul className={cn(isOpen ? "" : "hidden")}>
          {category.skills.map((s) => (
            <SkillRow key={s.name} {...s} />
          ))}
        </ul>
        {!isOpen && (
          <p className="text-xs text-ink-3">Hidden by filter</p>
        )}
      </CardBody>
    </Card>
  );
}

export default function Skills() {
  const [active, setActive] = useState("All");
  const stats = skillsJson.stats || [];

  const filters = useMemo(
    () => ["All", ...skillsJson.categories.map((c) => c.title)],
    []
  );

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <Section as="section" className="pt-2 md:pt-6 pb-10">
        <div className="font-mono text-xs text-ink-3 mb-3">
          <span className="text-terminal">$</span> cat ./skills.json
        </div>
        <h1 className="text-fluid-display font-semibold text-ink">
          {skillsJson.header.title}
        </h1>
        <p className="mt-3 max-w-prose text-base md:text-lg text-ink-2 leading-relaxed">
          {skillsJson.header.subtitle}
        </p>
      </Section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <Section className="pt-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s) => {
            const Icon = CAT_ICONS[s.icon] || Award;
            return (
              <Metric key={s.label} value={s.value} label={s.label} icon={Icon} />
            );
          })}
        </div>
      </Section>

      {/* ── FILTER CHIPS ──────────────────────────────────────── */}
      <Section className="pt-2 pb-2">
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {filters.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f)}
                className={cn(
                  "h-7 px-3 rounded-sm font-mono text-xs",
                  "border transition-colors duration-180 ease-out",
                  isActive
                    ? "border-terminal text-terminal-1 bg-terminal/10"
                    : "border-rule text-ink-2 hover:border-ink-3 hover:text-ink-1"
                )}
              >
                {f}
              </button>
            );
          })}
        </div>
      </Section>

      {/* ── CATEGORIES ────────────────────────────────────────── */}
      <Section className="pt-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillsJson.categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              category={cat}
              isOpen={active === "All" || active === cat.title}
            />
          ))}
        </div>
      </Section>

      {/* ── PROFICIENCY LEGEND ────────────────────────────────── */}
      <Section className="pt-2 pb-4">
        <div className="rounded-sm border border-rule bg-carbon-1 p-4 max-w-2xl">
          <div className="font-mono text-xs text-ink-3 mb-3">
            <span className="text-terminal">$</span> legend --proficiency
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal-ok" aria-hidden="true" />
              <span className="text-ink-1">90–100 · Expert</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal-info" aria-hidden="true" />
              <span className="text-ink-1">80–89 · Advanced</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal-warn" aria-hidden="true" />
              <span className="text-ink-1">70–79 · Proficient</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal-err" aria-hidden="true" />
              <span className="text-ink-1">60–69 · Intermediate</span>
            </li>
          </ul>
        </div>
      </Section>
    </>
  );
}
