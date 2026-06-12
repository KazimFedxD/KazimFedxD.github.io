// src/pages/ProjectDetail.jsx
// Tabbed project documentation. Loads data by URL slug, resolves tabs
// dynamically based on what the data contains. Includes a "Project at a
// glance" sticky sidebar on the overview tab for at-a-glance metadata.

import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, ChevronRight, Trophy, Star, GitFork, Boxes, Calendar } from "lucide-react";

import { Section } from "../components/layout/PageShell";
import Prose from "../components/ui/Prose";
import Card, { CardBody } from "../components/ui/Card";
import Chip from "../components/ui/Chip";
import Tabs from "../components/ui/Tabs";
import Button from "../components/ui/Button";
import Callout from "../components/ui/Callout";
import SectionRule from "../components/ui/SectionRule";

import { getProjectBySlug } from "../data/registry";
import { SCREENSHOT_FOLDER } from "../lib/screenshots";

import FeatureCard from "../components/project-detail/FeatureCard";
import TechStackTable from "../components/project-detail/TechStackTable";
import PerformanceMetrics from "../components/project-detail/PerformanceMetrics";
import KnownIssuesPanel from "../components/project-detail/KnownIssuesPanel";
import FutureRoadmap from "../components/project-detail/FutureRoadmap";
import ScreenshotGallery from "../components/project-detail/ScreenshotGallery";
import ArchitectureDiagram from "../components/project-detail/ArchitectureDiagram";
import ApiReference from "../components/project-detail/ApiReference";
import CommandReference from "../components/project-detail/CommandReference";
import EnvironmentVariables from "../components/project-detail/EnvironmentVariables";
import ProjectBadges from "../components/project-detail/ProjectBadges";
import RelatedProjects from "../components/project-detail/RelatedProjects";
import SetupGuide from "../components/project-detail/SetupGuide";
import ShowcaseVideo from "../components/project-detail/ShowcaseVideo";
import { displayUrl, slugify } from "../lib/format";

// Derive at-a-glance meta from the project's data — never hardcoded.
function deriveMeta(project) {
  // Status: prefer a badge that contains "In Development"/"WIP"; else "Shipped".
  const status = (() => {
    if (!project.badges) return "Shipped";
    const inDev = project.badges.find(
      (b) => typeof b === "string"
        ? /In Development|WIP|Coming Soon/i.test(b)
        : /In Development|WIP|Coming Soon/i.test(b.text || "")
    );
    if (inDev) return "In Development";
    return "Shipped";
  })();

  // Year: 4-digit year from any badge.
  const year = (() => {
    if (!project.badges) return "—";
    for (const b of project.badges) {
      const t = typeof b === "string" ? b : b.text || "";
      const m = t.match(/(\d{4})/);
      if (m) return m[1];
    }
    return "—";
  })();

  // Language: from the first item in techStack, otherwise the first tech tag.
  const language = (() => {
    if (project.techStack && project.techStack[0]) {
      const ts = project.techStack[0];
      if (typeof ts === "string") return ts;
      if (ts.name) return ts.name;
    }
    if (project.tech && project.tech[0]) return project.tech[0];
    return "—";
  })();

  // Award indicator: any badge matches /NASA|Best Use/i.
  const hasAward = (project.badges || []).some((b) => {
    const t = typeof b === "string" ? b : b.text || "";
    return /NASA|Best Use|Winner/i.test(t);
  });

  // Tool count: techStack (preferred) or tech array.
  const toolCount = (project.techStack && project.techStack.length)
    || (project.tech && project.tech.length)
    || 0;

  return { status, year, language, hasAward, toolCount };
}

// Reusable mono-labeled cell for the project header meta strip.
function Meta({ label, children }) {
  return (
    <div className="px-3 py-2.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-1">
        {label}
      </div>
      <div className="text-sm text-ink truncate">{children}</div>
    </div>
  );
}

// Sticky "Project at a glance" sidebar shown on the overview tab.
function GlanceSidebar({ project, meta }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20">
        <Card raised className="shadow-lift">
          <CardBody>
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-amber mb-3">
              <span className="text-amber">▸</span> at a glance
            </div>
            <dl className="text-sm text-ink-1 space-y-3">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">status</dt>
                <dd className="mt-0.5">
                  {meta.status === "In Development" ? (
                    <Chip variant="status" size="sm">{meta.status}</Chip>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-terminal-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-terminal" aria-hidden="true" />
                      {meta.status}
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">tech</dt>
                <dd className="mt-0.5 flex items-center gap-1.5">
                  <Boxes size={12} strokeWidth={1.75} className="text-ink-3" />
                  {meta.toolCount} tools
                </dd>
              </div>
              {project.features && (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">features</dt>
                  <dd className="mt-0.5 flex items-center gap-1.5">
                    <Star size={12} strokeWidth={1.75} className="text-ink-3" />
                    {project.features.length}
                  </dd>
                </div>
              )}
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">year</dt>
                <dd className="mt-0.5 flex items-center gap-1.5">
                  <Calendar size={12} strokeWidth={1.75} className="text-ink-3" />
                  {meta.year}
                </dd>
              </div>
              {meta.hasAward && (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">award</dt>
                  <dd className="mt-0.5">
                    <span className="inline-flex items-center gap-1.5 text-amber">
                      <Trophy size={12} strokeWidth={1.75} />
                      Recognized
                    </span>
                  </dd>
                </div>
              )}
              {project.github && (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">repo</dt>
                  <dd className="mt-0.5 flex items-center gap-1.5">
                    <GitFork size={12} strokeWidth={1.75} className="text-ink-3" />
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink-1 hover:text-terminal-1 truncate"
                    >
                      {project.github.replace("https://github.com/", "")}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </CardBody>
        </Card>
      </div>
    </aside>
  );
}

export default function ProjectDetail() {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(projectName);

  const tabItems = useMemo(() => {
    if (!project) return [];
    const items = [
      { value: "overview",     label: "Overview" },
      { value: "features",     label: "Features", count: project.features?.length },
    ];
    if (project.architecture) {
      items.push({ value: "architecture", label: "Architecture" });
    }
    if (project.apiEndpoints && project.apiEndpoints.length) {
      items.push({ value: "api", label: "API", count: project.apiEndpoints.length });
    } else if (project.commands && project.commands.length) {
      items.push({ value: "commands", label: "Commands", count: project.commands.length });
    }
    if (project.setupSteps && project.setupSteps.length) {
      items.push({ value: "setup", label: "Setup", count: project.setupSteps.length });
    }
    if (project.screenshots && project.screenshots.length) {
      items.push({ value: "screenshots", label: "Screenshots", count: project.screenshots.length });
    }
    if (project.performance && Object.keys(project.performance).length) {
      items.push({ value: "performance", label: "Performance" });
    }
    if (project.requirements) {
      items.push({ value: "requirements", label: "Requirements" });
    }
    if (project.knownIssues && project.knownIssues.length) {
      items.push({ value: "issues", label: "Issues", count: project.knownIssues.length });
    }
    if (project.futureEnhancements && project.futureEnhancements.length) {
      items.push({ value: "future", label: "Future" });
    }
    return items;
  }, [project]);

  const [tab, setTab] = useState("overview");

  if (!project) {
    return (
      <Section className="pt-12 md:pt-20 pb-12">
        <div className="font-mono text-xs text-ink-3 mb-3">
          <span className="text-terminal">$</span> cd /404
        </div>
        <h1 className="text-fluid-display font-bold text-ink">Project not found</h1>
        <div className="mt-3 h-px w-10 bg-terminal" aria-hidden="true" />
        <p className="mt-4 max-w-prose text-base text-ink-2 leading-relaxed">
          The slug <code className="font-mono text-terminal-1">{projectName}</code>{" "}
          doesn't map to a project in the registry. It may have been renamed, or the
          link is stale.
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

  const meta = deriveMeta(project);
  const bannerSrc = project.screenshots?.[0]?.filename
    ? `/screenshots/${SCREENSHOT_FOLDER[project.title] || slugify(project.title)}/${project.screenshots[0].filename}`
    : null;

  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────── */}
      <Section as="section" className="pt-2 md:pt-6 pb-8" density="spacious">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-3 hover:text-terminal-1 transition-colors duration-180 mb-4"
        >
          <ArrowLeft size={12} strokeWidth={1.75} />
          back
        </button>

        <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
          <span className="text-terminal">$</span> cat{" "}
          ./projects/{projectName.toLowerCase()}/README.md
        </div>

        <h1 className="text-fluid-display font-bold text-ink leading-[1.05]">
          {project.title}
        </h1>
        <div className="mt-3 h-px w-10 bg-terminal" aria-hidden="true" />
        {project.shortDescription && (
          <p className="mt-4 max-w-prose text-base md:text-lg text-ink-2 leading-relaxed">
            {project.shortDescription}
          </p>
        )}

        <div className="mt-5">
          <ProjectBadges badges={project.badges} />
        </div>

        {/* E2: hero meta strip — status / language / year / license. */}
        <dl className="mt-5 grid grid-cols-2 md:grid-cols-4 max-w-3xl border border-rule rounded-sm divide-x divide-rule">
          <Meta label="status">
            {meta.status === "In Development"
              ? <span className="text-amber">{meta.status}</span>
              : <span className="inline-flex items-center gap-1.5 text-terminal-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-terminal" aria-hidden="true" />
                  {meta.status}
                </span>}
          </Meta>
          <Meta label="language">{meta.language}</Meta>
          <Meta label="year">{meta.year}</Meta>
          <Meta label="license">MIT</Meta>
        </dl>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {project.github && (
            <Button
              as="a"
              href={project.github}
              variant="ghost"
              size="md"
              external
            >
              <Github size={14} strokeWidth={1.75} />
              Source
            </Button>
          )}
          {project.liveDemo && (
            <Button
              as="a"
              href={project.liveDemo}
              variant="primary"
              size="md"
              external
            >
              <ExternalLink size={14} strokeWidth={1.75} />
              {displayUrl(project.liveDemo)}
            </Button>
          )}
        </div>

        {/* Banner image — first screenshot. */}
        {bannerSrc && (
          <div className="mt-8 border border-rule rounded-sm overflow-hidden bg-carbon-2-5">
            <img
              src={bannerSrc}
              alt={`${project.title} preview`}
              loading="lazy"
              className="w-full h-auto object-cover"
              onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
            />
          </div>
        )}
      </Section>

      {/* ── TABS ───────────────────────────────────────────── */}
      <Section className="pt-2 pb-2">
        <Tabs items={tabItems} value={tab} onChange={setTab} />
      </Section>

      {/* ── TAB PANELS ────────────────────────────────────── */}
      <Section className="pt-6 pb-10">
        <div
          role="tabpanel"
          id={`tabpanel-${tab}`}
          aria-labelledby={`tab-${tab}`}
        >
          {tab === "overview" && (
            <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-8">
              <div>
                <OverviewPanel project={project} />
              </div>
              <GlanceSidebar project={project} meta={meta} />
            </div>
          )}
          {tab === "features" && <FeaturesPanel project={project} />}
          {tab === "architecture" && <ArchitecturePanel project={project} />}
          {tab === "api" && <ApiPanel project={project} />}
          {tab === "commands" && <CommandsPanel project={project} />}
          {tab === "setup" && <SetupPanel project={project} />}
          {tab === "screenshots" && <ScreenshotsPanel project={project} />}
          {tab === "performance" && <PerformancePanel project={project} />}
          {tab === "requirements" && <RequirementsPanel project={project} />}
          {tab === "issues" && <IssuesPanel project={project} />}
          {tab === "future" && <FuturePanel project={project} />}
        </div>
      </Section>

      <SectionRule />

      {/* ── RELATED ─────────────────────────────────────────── */}
      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <Section className="pt-2 pb-4">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-4">
            <span className="text-terminal">$</span> ls ./related
          </h2>
          <RelatedProjects related={project.relatedProjects} />
        </Section>
      )}
    </>
  );
}

/* ───────────────────── Tab panels ───────────────────── */

function OverviewPanel({ project }) {
  const o = project.overview || {};
  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      {o.description && (
        <Prose>
          <p>{o.description}</p>
        </Prose>
      )}

      {o.problemStatement && Array.isArray(o.problemStatement) && o.problemStatement.length > 0 && (
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
            <span className="text-terminal">$</span> problem
          </h2>
          <ul className="flex flex-col gap-2">
            {o.problemStatement.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-1 leading-relaxed">
                <span className="font-mono text-xs text-terminal-1 shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {o.howWeSolve && Array.isArray(o.howWeSolve) && o.howWeSolve.length > 0 && (
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
            <span className="text-terminal">$</span> how it solves it
          </h2>
          <div className="flex flex-col gap-3">
            {o.howWeSolve.map((s, i) => (
              <Card key={i}>
                <CardBody>
                  <div className="text-sm font-medium text-ink">
                    {s.problem}
                  </div>
                  <p className="mt-1.5 text-sm text-ink-1 leading-relaxed">
                    {s.solution}
                  </p>
                  {s.benefit && (
                    <p className="mt-2 text-xs text-terminal-1 font-mono">
                      {s.benefit}
                    </p>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      {o.uniqueFeatures && Array.isArray(o.uniqueFeatures) && o.uniqueFeatures.length > 0 && (
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
            <span className="text-terminal">$</span> what makes it different
          </h2>
          <div className="flex flex-col gap-3">
            {o.uniqueFeatures.map((f, i) => (
              <Card key={i}>
                <CardBody>
                  <div className="text-base font-semibold text-ink">{f.title}</div>
                  {Array.isArray(f.points) && (
                    <ul className="mt-2 flex flex-col gap-1.5 text-sm text-ink-1">
                      {f.points.map((p, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <ChevronRight size={12} strokeWidth={1.75} className="text-terminal mt-0.5 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      {o.targetAudience && Array.isArray(o.targetAudience) && o.targetAudience.length > 0 && (
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
            <span className="text-terminal">$</span> who it's for
          </h2>
          <ul className="flex flex-col gap-1.5 text-sm text-ink-1">
            {o.targetAudience.map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-terminal mt-0.5 shrink-0" aria-hidden="true">›</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {o.useCases && Array.isArray(o.useCases) && o.useCases.length > 0 && (
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
            <span className="text-terminal">$</span> use cases
          </h2>
          <ul className="flex flex-col gap-1.5 text-sm text-ink-1">
            {o.useCases.map((u, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-terminal mt-0.5 shrink-0" aria-hidden="true">›</span>
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {o.mainFlow && Array.isArray(o.mainFlow) && o.mainFlow.length > 0 && (
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
            <span className="text-terminal">$</span> main flow
          </h2>
          <ol className="flex flex-col gap-2">
            {o.mainFlow.map((step, i) => (
              <li
                key={i}
                className="flex items-baseline gap-3 text-sm text-ink-1"
              >
                <span className="font-mono text-xs text-terminal-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{typeof step === "string" ? step : step.description || step.title || JSON.stringify(step)}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {project.showcaseVideo && (
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
            <span className="text-terminal">$</span> showcase
          </h2>
          <ShowcaseVideo video={project.showcaseVideo} />
        </div>
      )}

      {o.comparison && typeof o.comparison === "string" && (
        <Callout kind="info" title="Comparison">
          <p>{o.comparison}</p>
        </Callout>
      )}
      {o.comparison && typeof o.comparison === "object" && Array.isArray(o.comparison.traditional) && Array.isArray(o.comparison.teachback) && (
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
            <span className="text-terminal">$</span> comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card>
              <CardBody>
                <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-2">
                  Traditional
                </div>
                <ul className="text-sm text-ink-1 space-y-1.5">
                  {o.comparison.traditional.map((row, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-ink-3 mt-0.5 shrink-0" aria-hidden>·</span>
                      <span>{row}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
            <Card accent>
              <CardBody>
                <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-amber mb-2">
                  This project
                </div>
                <ul className="text-sm text-ink-1 space-y-1.5">
                  {o.comparison.teachback.map((row, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber mt-0.5 shrink-0" aria-hidden>›</span>
                      <span>{row}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function FeaturesPanel({ project }) {
  if (!project.features || project.features.length === 0) {
    return <p className="text-sm text-ink-2">No features documented.</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {project.features.map((f, i) => (
        <FeatureCard key={i} feature={f} />
      ))}
    </div>
  );
}

function ArchitecturePanel({ project }) {
  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {project.architecture?.description && (
        <Prose>
          <p>{project.architecture.description}</p>
        </Prose>
      )}
      <ArchitectureDiagram title={project.title} architecture={project.architecture} />
      {project.architecture?.servicesTitle && (
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
            <span className="text-terminal">$</span> services
          </h3>
          <p className="text-sm text-ink-2 leading-relaxed mb-3">
            {project.architecture.servicesIntro}
          </p>
        </div>
      )}
      {project.architecture?.services && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {project.architecture.services.map((s, i) => (
            <Card key={i}>
              <CardBody>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-ink">{s.name}</span>
                  {s.port && (
                    <span className="font-mono text-[10px] text-ink-3">
                      :{s.port}
                    </span>
                  )}
                </div>
                {s.purpose && (
                  <p className="mt-1 text-xs text-ink-2">{s.purpose}</p>
                )}
                {s.description && (
                  <p className="mt-1 text-xs text-ink-2">{s.description}</p>
                )}
                {s.technologies && Array.isArray(s.technologies) && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {s.technologies.map((t) => (
                      <Chip key={t} size="sm" variant="tech">{t}</Chip>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      {project.techStack && project.techStack.length > 0 && (
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
            <span className="text-terminal">$</span> tech stack
          </h3>
          <TechStackTable stack={project.techStack} />
        </div>
      )}
      {project.environmentVariables && project.environmentVariables.length > 0 && (
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
            <span className="text-terminal">$</span> env
          </h3>
          <EnvironmentVariables vars={project.environmentVariables} />
        </div>
      )}
    </div>
  );
}

function ApiPanel({ project }) {
  return <ApiReference endpoints={project.apiEndpoints} />;
}

function CommandsPanel({ project }) {
  return <CommandReference commands={project.commands} />;
}

function SetupPanel({ project }) {
  return <SetupGuide steps={project.setupSteps} />;
}

function ScreenshotsPanel({ project }) {
  const folder = SCREENSHOT_FOLDER[project.title];
  if (!folder) {
    return (
      <div className="rounded-sm border border-rule bg-carbon-1 p-6 text-center">
        <p className="text-sm text-ink-2">No screenshot folder mapped for this project.</p>
      </div>
    );
  }
  const shots = (project.screenshots || []).map((s) => ({
    src: `/screenshots/${folder}/${s.filename || s.src || s}`,
    alt: s.caption || s.alt || s.description || s.filename,
    caption: s.caption || s.description,
  }));
  return <ScreenshotGallery screenshots={shots} />;
}

function PerformancePanel({ project }) {
  return <PerformanceMetrics performance={project.performance} />;
}

// Render a single requirement entry that can be:
//   - a string
//   - an object like { name, version, required, purpose } (used by software)
function RequirementEntry({ item }) {
  if (item && typeof item === "object") {
    return (
      <li className="flex items-start gap-2 text-sm text-ink-1">
        <span className="text-ink-3 shrink-0" aria-hidden="true">·</span>
        <span>
          {item.name && <span className="text-ink font-medium">{item.name}</span>}
          {item.version && <span className="font-mono text-[11px] text-ink-3 ml-1.5">v{item.version}</span>}
          {item.purpose && <span className="text-ink-2"> — {item.purpose}</span>}
          {item.required === true && (
            <span className="ml-2 inline-flex items-center font-mono text-[10px] uppercase tracking-[0.05em] text-amber">
              required
            </span>
          )}
        </span>
      </li>
    );
  }
  return (
    <li className="text-sm text-ink-1">· {String(item)}</li>
  );
}

// Render a hardware object: { minimum: { ram, cpu, disk }, recommended: { ... } }
function HardwareCard({ hardware }) {
  const tiers = [];
  if (hardware.minimum)    tiers.push({ label: "Minimum",    data: hardware.minimum });
  if (hardware.recommended) tiers.push({ label: "Recommended", data: hardware.recommended });
  // Also support the legacy array-of-strings shape.
  if (tiers.length === 0 && Array.isArray(hardware)) {
    return (
      <ul className="text-sm text-ink-1 space-y-1">
        {hardware.map((it, i) => <RequirementEntry key={i} item={it} />)}
      </ul>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {tiers.map(({ label, data }) => (
        <div key={label}>
          <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-amber mb-1">
            {label}
          </div>
          <ul className="text-sm text-ink-1 space-y-0.5">
            {Object.entries(data).map(([k, v]) => (
              <li key={k} className="flex items-start gap-2">
                <span className="text-ink-3 shrink-0 font-mono text-[11px] uppercase min-w-[3.5rem]">{k}</span>
                <span>{String(v)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function RequirementsPanel({ project }) {
  const r = project.requirements;
  if (!r) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
      {r.operatingSystem && (
        <Card>
          <CardBody>
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-2">OS</div>
            <ul className="space-y-1">
              {(Array.isArray(r.operatingSystem) ? r.operatingSystem : [r.operatingSystem]).map((it, i) => (
                <RequirementEntry key={i} item={it} />
              ))}
            </ul>
          </CardBody>
        </Card>
      )}
      {r.hardware && (
        <Card>
          <CardBody>
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-2">Hardware</div>
            <HardwareCard hardware={r.hardware} />
          </CardBody>
        </Card>
      )}
      {r.software && (
        <Card>
          <CardBody>
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-2">Software</div>
            <ul className="space-y-1">
              {(Array.isArray(r.software) ? r.software : [r.software]).map((it, i) => (
                <RequirementEntry key={i} item={it} />
              ))}
            </ul>
          </CardBody>
        </Card>
      )}
      {r.browsers && (
        <Card>
          <CardBody>
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-2">Browsers</div>
            <ul className="space-y-1">
              {(Array.isArray(r.browsers) ? r.browsers : [r.browsers]).map((it, i) => (
                <RequirementEntry key={i} item={it} />
              ))}
            </ul>
          </CardBody>
        </Card>
      )}
      {r.externalServices && (
        <Card className="md:col-span-2">
          <CardBody>
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-2">External services</div>
            <ul className="space-y-1">
              {(Array.isArray(r.externalServices) ? r.externalServices : [r.externalServices]).map((it, i) => (
                <RequirementEntry key={i} item={it} />
              ))}
            </ul>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

function IssuesPanel({ project }) {
  return <KnownIssuesPanel issues={project.knownIssues} />;
}

function FuturePanel({ project }) {
  return <FutureRoadmap roadmap={project.futureEnhancements} />;
}
