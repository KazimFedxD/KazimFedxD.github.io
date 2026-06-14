// src/pages/ProjectDetail.jsx
// Case-study project detail page. Loads data by URL slug, resolves the
// page to either:
//   1. <CaseStudyHero /> + <AtAGlance /> + <CaseStudyBody /> + <RelatedAndCTA />
//      for the 8 projects with full detail data
//   2. <DetailEmptyState /> for the 4 detail-less projects (Skyntel,
//      FedxD-PiPy, FxChange, Webstore) — still renders a real page, not
//      a placeholder
//   3. A terminal-style 404 for unknown slugs
//
// No more tabs. The case study is a long-form, scrollable narrative that
// leads with the architecture diagram and the strongest material.

import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Section } from "../components/layout/PageShell";
import Button from "../components/ui/Button";

import { getProjectBySlug, detailSlugs } from "../data/registry";
import CaseStudyHero from "../components/project-detail/CaseStudyHero";
import AtAGlance from "../components/project-detail/AtAGlance";
import CaseStudyBody from "../components/project-detail/CaseStudyBody";
import DetailEmptyState from "../components/project-detail/DetailEmptyState";
import RelatedAndCTA from "../components/project-detail/RelatedAndCTA";

// Derive at-a-glance meta from the project's data — never hardcoded.
function deriveMeta(project) {
  const status = (() => {
    if (!project.badges) return "Shipped";
    const inDev = project.badges.find((b) =>
      typeof b === "string"
        ? /In Development|WIP|Coming Soon/i.test(b)
        : /In Development|WIP|Coming Soon/i.test(b.text || "")
    );
    if (inDev) return "In Development";
    return "Shipped";
  })();

  const year = (() => {
    if (!project.badges) return "—";
    for (const b of project.badges) {
      const t = typeof b === "string" ? b : b.text || "";
      const m = t.match(/(\d{4})/);
      if (m) return m[1];
    }
    return "—";
  })();

  const language = (() => {
    if (project.techStack && project.techStack[0]) {
      const ts = project.techStack[0];
      if (typeof ts === "string") return ts;
      if (ts.name) return ts.name;
    }
    if (project.tech && project.tech[0]) return project.tech[0];
    return "—";
  })();

  const hasAward = (project.badges || []).some((b) => {
    const t = typeof b === "string" ? b : b.text || "";
    return /NASA|Best Use|Winner/i.test(t);
  });

  const toolCount =
    (project.techStack && project.techStack.length) ||
    (project.tech && project.tech.length) ||
    0;

  return { status, year, language, hasAward, toolCount };
}

// Slugs that don't have detail data — render the empty state instead.
const EMPTY_STATE_SLUGS = new Set([
  "Skyntel",
  "FedxD-PiPy",
  "FxChange",
  "Webstore",
]);

function NotFound({ projectName }) {
  return (
    <Section className="pt-12 md:pt-20 pb-12">
      <div className="font-mono text-xs text-ink-3 mb-3">
        <span className="text-terminal">$</span> cd /404
      </div>
      <h1 className="text-fluid-display font-bold text-ink">Project not found</h1>
      <div className="mt-3 h-px w-10 bg-terminal" aria-hidden="true" />
      <p className="mt-4 max-w-prose text-base text-ink-2 leading-relaxed">
        The slug{" "}
        <code className="font-mono text-terminal-1">{projectName}</code>{" "}
        doesn't map to a project in the registry. It may have been renamed,
        or the link is stale.
      </p>
      <div className="mt-6">
        <Button as={Link} to="/projects" variant="ghost" size="md">
          <ArrowLeft size={14} strokeWidth={1.75} />
          Back to projects
        </Button>
      </div>
    </Section>
  );
}

export default function ProjectDetail() {
  const { projectName } = useParams();

  // Detail-less slug → empty state (checked FIRST so we render a real
  // page even when there's no detail data module)
  if (EMPTY_STATE_SLUGS.has(projectName)) {
    return (
      <DetailEmptyState
        project={{ title: projectName }}
        slug={projectName}
      />
    );
  }

  const project = getProjectBySlug(projectName);

  // Unknown slug → 404
  if (!project) {
    return <NotFound projectName={projectName} />;
  }

  // Full case study
  const meta = deriveMeta(project);

  return (
    <>
      <CaseStudyHero
        project={project}
        meta={meta}
        slug={projectName}
      />
      <AtAGlance project={project} />
      <CaseStudyBody project={project} />
      <RelatedAndCTA project={project} />
    </>
  );
}

// Re-export detailSlugs for any consumer that needs to know the list.
export { detailSlugs };
