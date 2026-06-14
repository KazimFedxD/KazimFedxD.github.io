// src/components/project-detail/DetailEmptyState.jsx
// Renders a "case study coming soon" layout for the 4 projects that
// don't have full detail data: Skyntel, FedxD-PiPy, FxChange, Webstore.
//
// Uses the registry project (title, description, tech, github, features,
// badge) to render a real case-study-shaped page — not a placeholder.
// The hero and "at a glance" stay full quality. Below, an info callout
// is shown, followed by the real description, the real tech stack, the
// real feature list, and a feedback CTA.

import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

import { Section } from "../layout/PageShell";
import Card, { CardBody } from "../ui/Card";
import Button from "../ui/Button";
import Callout from "../ui/Callout";
import { Reveal } from "../../lib/motion";
import CaseStudyHero from "./CaseStudyHero";
import AtAGlance from "./AtAGlance";

// Static fallback data for the 4 detail-less projects. Every value
// comes from the projectsData registry — nothing fabricated.
const FALLBACK = {
  Skyntel: {
    description: "Interactive weather app with AI query support, personalized alerts, daily email subscriptions, and live weather reports from users.",
    tech: ["Django REST Framework", "Celery", "PostgreSQL", "Redis", "Docker", "Nginx", "Groq AI"],
    github: "https://github.com/KazimFedxD/Skyntel",
    status: "Shipped",
    year: "2025",
    language: "Python",
    award: "🏆 2nd Place - NASA Space Apps Challenge 2025",
    highlights: [
      "Built under 48 hours as part of the NASA Space Apps Challenge 2025",
      "Combines several live meteorological data sources with a natural-language Groq AI query layer",
      "Personalized alerts and scheduled email digests via Celery Beat",
    ],
  },
  "FedxD-PiPy": {
    description: "Quality of life Python package providing converters, utilities, and integrations for openpyxl, discord.py, and pygame.",
    tech: ["Python", "openpyxl", "discord.py", "pygame"],
    github: "https://github.com/KazimFedxD/FedxD-pypackage",
    status: "Shipped",
    year: "2024",
    language: "Python",
    highlights: [
      "Reusable converters and helpers that were duplicated across multiple projects",
      "Published as a single small dependency instead of copy-pasting utility code",
      "Used internally by FeXoBot, FxQuest, and several smaller scripts",
    ],
  },
  FxChange: {
    description: "Demo stock and crypto exchange where users can trade with virtual currency, track portfolios, and grow their profiles.",
    tech: ["Django", "SQLite", "JavaScript", "External APIs", "Email Verification"],
    github: "https://github.com/KazimFedxD",
    status: "Shipped",
    year: "2024",
    language: "Python",
    highlights: [
      "Virtual-currency trading simulator with portfolio tracking",
      "Custom admin panels for managing users, instruments, and balances",
      "Live graphs with real-time data from public market APIs",
    ],
  },
  Webstore: {
    description: "Complete e-commerce platform featuring inventory control, discounts, carts, and checkout systems with real-time calculations.",
    tech: ["Django", "SQLite", "JavaScript", "Admin Panels", "Email Verification"],
    github: "https://github.com/KazimFedxD",
    status: "Shipped",
    year: "2024",
    language: "Python",
    highlights: [
      "Full inventory + discount + cart + checkout flow",
      "Real-time cart totals recalculated client-side as the user edits",
      "Custom Django admin panels for store management",
    ],
  },
};

function EmptyCaseStudyBody({ project, fallback, slug }) {
  return (
    <>
      <Reveal as="section">
        <Section className="pt-10 md:pt-14 pb-2">
          <Callout kind="info" title="Full case study coming soon">
            <p>
              This project is in the queue for a full case study with
              architecture diagrams, performance numbers, and a setup
              walkthrough. In the meantime, here's what I can tell you
              about it today.
            </p>
          </Callout>
        </Section>
      </Reveal>

      <Reveal as="section">
        <Section className="pt-8 pb-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-3">
            <span className="text-terminal">$</span> description
          </div>
          <p className="max-w-3xl text-base text-ink-1 leading-relaxed">
            {fallback.description}
          </p>
        </Section>
      </Reveal>

      {fallback.highlights && fallback.highlights.length > 0 && (
        <Reveal as="section">
          <Section className="pt-8 pb-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-3">
              <span className="text-terminal">$</span> highlights
            </div>
            <ul className="max-w-3xl flex flex-col gap-2">
              {fallback.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base text-ink-1 leading-relaxed"
                >
                  <span className="font-mono text-xs text-terminal-1 shrink-0 mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Section>
        </Reveal>
      )}

      {fallback.tech && fallback.tech.length > 0 && (
        <Reveal as="section">
          <Section className="pt-8 pb-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-3">
              <span className="text-terminal">$</span> tech
            </div>
            <div className="flex flex-wrap gap-2 max-w-3xl">
              {fallback.tech.map((t, i) => (
                <span
                  key={i}
                  className="font-mono text-xs text-ink-1 px-2.5 py-1 border border-rule rounded-sm bg-carbon-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </Section>
        </Reveal>
      )}

      <Reveal as="section">
        <Section className="pt-12 md:pt-14 pb-4">
          <Card>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-terminal mb-2">
                    → want to see this in detail?
                  </div>
                  <p className="text-sm text-ink-1 max-w-prose">
                    If you'd like to see the architecture, performance, and
                    setup for this project, drop me a line and I'll prioritize
                    the case study.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    as={Link}
                    to="/contact"
                    variant="primary"
                    size="md"
                  >
                    <Mail size={14} strokeWidth={1.75} />
                    Request the case study
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Section>
      </Reveal>
    </>
  );
}

export default function DetailEmptyState({ project, slug }) {
  // Look up fallback by registry title. Slug → title → fallback.
  // We need the original title; the slug is the URL form.
  const titleBySlug = {
    Skyntel: "Skyntel",
    "FedxD-PiPy": "FedxD-PiPy",
    FxChange: "FxChange",
    Webstore: "Webstore",
  };
  const title = titleBySlug[slug] || project.title;
  const fallback = FALLBACK[title];

  if (!fallback) {
    return (
      <Section className="pt-12">
        <Callout kind="warn" title="Project not found">
          <p>
            No data available for this project slug. It may have been
            renamed or removed.
          </p>
        </Callout>
        <div className="mt-6">
          <Button as={Link} to="/projects" variant="ghost" size="md">
            <ArrowLeft size={14} strokeWidth={1.75} />
            Back to projects
          </Button>
        </div>
      </Section>
    );
  }

  // Project shape that CaseStudyHero / AtAGlance expect.
  const fullProject = {
    title,
    shortDescription: fallback.description,
    github: fallback.github,
    liveDemo: "",
    badges: fallback.award
      ? [{ icon: "Trophy", text: fallback.award }]
      : [{ icon: "Code2", text: "Shipped" }],
    features: [],
    techStack: fallback.tech.map((t) => ({ name: t, category: "Tool" })),
    // No overview, no architecture, no performance.
  };

  const meta = {
    status: fallback.status || "Shipped",
    year: fallback.year || "—",
    language: fallback.language || fallback.tech?.[0] || "—",
    toolCount: fallback.tech?.length || 0,
    hasAward: !!fallback.award,
  };

  return (
    <>
      <CaseStudyHero project={fullProject} meta={meta} slug={slug} />
      <AtAGlance project={fullProject} />
      <EmptyCaseStudyBody
        project={fullProject}
        fallback={fallback}
        slug={slug}
      />
    </>
  );
}
