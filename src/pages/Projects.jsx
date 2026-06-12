// src/pages/Projects.jsx
// Brand surface. Search + filter. Project cards: 16:9 thumbnail, title, badge,
// tech chips, links. Featured projects render in a 2-col with thumbnails;
// the rest in a 3-col compact layout. No 3D tilt; varied card density.

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, ArrowUpRight, Star, X, Folder } from "lucide-react";

import { Section } from "../components/layout/PageShell";
import Card, { CardBody, CardHeader } from "../components/ui/Card";
import Chip from "../components/ui/Chip";
import { cn } from "../lib/cn";
import { slugify, techPreview } from "../lib/format";
import {
  getSortedProjects,
  hasProjectDetails,
} from "../data/registry";
import { SCREENSHOT_FOLDER } from "../lib/screenshots";

const ALL_TECH = (() => {
  const set = new Set();
  getSortedProjects().forEach((p) => (p.tech || []).forEach((t) => set.add(t)));
  return Array.from(set).sort();
})();

// Returns a 16:9 thumbnail src for a project, or null if no folder mapped.
function thumbFor(project) {
  const folder = SCREENSHOT_FOLDER[project.title];
  if (!folder) return null;
  return `/screenshots/${folder}/homepage.png`;
}

// A mono fallback tile for projects without a screenshot folder. Echoes the
// README-block vibe of the wide lead card so the page still has visual rhythm.
function MonoTile({ project }) {
  return (
    <div className="w-full h-full bg-carbon-2 p-4 flex flex-col justify-between">
      <div className="font-mono text-[10px] text-ink-3">
        <span className="text-terminal">$</span> cat {slugify(project.title).toLowerCase()}/README.md
      </div>
      <div className="font-mono text-[10px] text-ink-3 space-y-0.5">
        <div>title: <span className="text-ink-1">"{project.title}"</span></div>
        <div>tech: <span className="text-ink-1">[{project.tech.length}]</span></div>
        {project.badge && (
          <div>badge: <span className="text-amber">"{project.badge}"</span></div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, density = "standard" }) {
  const slug = slugify(project.title);
  const hasDetail = hasProjectDetails(project.title);
  const { visible, extra } = techPreview(project.tech, density === "compact" ? 4 : 6);
  const thumb = thumbFor(project);
  const compact = density === "compact";

  return (
    <Card
      interactive={hasDetail}
      className={cn("h-full flex flex-col overflow-hidden", compact && "shadow-lift")}
    >
      {/* Thumbnail (or fallback tile) — 16:9, top of card. */}
      <div className="aspect-video bg-carbon-2 border-b border-rule overflow-hidden">
        {thumb ? (
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <MonoTile project={project} />
        )}
      </div>

      <CardHeader>
        <div className="flex items-start gap-2 flex-wrap">
          <h3 className={cn("font-semibold text-ink leading-tight", compact ? "text-base" : "text-lg")}>
            {hasDetail ? (
              <Link to={`/projects/${slug}`} className="hover:text-terminal-1 transition-colors duration-180">
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>
          {project.badge && (
            <Chip
              variant={project.badge.includes("NASA") || project.badge.includes("AI") ? "achievement" : "tech"}
              size="sm"
            >
              {project.badge}
            </Chip>
          )}
        </div>
      </CardHeader>

      <CardBody className="flex-1 flex flex-col">
        <p className={cn("text-ink-1 leading-relaxed font-mono", compact ? "text-xs" : "text-sm")}>
          {project.description}
        </p>
        {!compact && project.features && project.features.length > 0 && (
          <ul className="mt-3 text-xs text-ink-2 space-y-1">
            {project.features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-terminal shrink-0" aria-hidden="true">·</span>
                <span>{f.replace(/^[^\w]+/, "").trim()}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {visible.map((t) => (
            <Chip key={t} size="sm" variant="tech">{t}</Chip>
          ))}
          {extra > 0 && <Chip size="sm" variant="muted">+{extra}</Chip>}
        </div>
        <div className="mt-5 pt-4 border-t border-rule flex items-center gap-4 text-sm">
          {hasDetail && (
            <Link
              to={`/projects/${slug}`}
              className="inline-flex items-center gap-1.5 text-ink-1 hover:text-terminal-1 transition-colors"
            >
              View details
              <ArrowRight size={14} strokeWidth={1.75} />
            </Link>
          )}
          {project.github && project.github !== "https://github.com/KazimFedxD" && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-ink-2 hover:text-terminal-1 transition-colors"
            >
              Code
              <ArrowUpRight size={12} strokeWidth={1.75} />
            </a>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = getSortedProjects();
    if (filter === "Featured") {
      list = list.filter((p) => p.badge);
    } else if (filter !== "All") {
      list = list.filter((p) => (p.tech || []).includes(filter));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p.tech || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [filter, search]);

  // F3: split into "featured" (NASA / AI winner / in-development) and the rest.
  // The featured set gets 2-col layout with full thumbnails; the rest is
  // 3-col compact.
  const FEATURED_BADGE_HINTS = ["NASA", "AI", "In Development"];
  const isFeatured = (p) =>
    p.badge && FEATURED_BADGE_HINTS.some((h) => p.badge.includes(h));
  const featured = filtered.filter(isFeatured);
  const rest = filtered.filter((p) => !isFeatured(p));

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <Section as="section" className="pt-2 md:pt-6 pb-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
          <span className="text-terminal">$</span> ls ./projects
        </div>
        <h1 className="text-fluid-display font-bold text-ink">Projects</h1>
        <div className="mt-3 h-px w-10 bg-terminal" aria-hidden="true" />
        <p className="mt-4 max-w-prose text-base md:text-lg text-ink-2 leading-relaxed">
          Production systems, libraries, and bots I've built and shipped. Filter by
          tech, or search for a name. Eight of these have full case studies.
        </p>
      </Section>

      {/* ── SEARCH + FILTERS ──────────────────────────────────── */}
      <Section className="pt-2 pb-4" density="tight">
        <div className="flex flex-col gap-3">
          {/* Search */}
          <div className="relative">
            <Search
              size={14}
              strokeWidth={1.75}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="grep projects..."
              aria-label="Search projects"
              className={cn(
                "w-full h-10 pl-9 pr-9 rounded-sm bg-carbon-1",
                "border border-rule text-ink text-sm placeholder:text-ink-3",
                "focus:border-terminal focus:outline-none",
                "transition-colors duration-180 ease-out"
              )}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-ink-3 hover:text-ink-1"
              >
                <X size={14} strokeWidth={1.75} />
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {["All", "Featured", ...ALL_TECH].map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "h-7 px-2.5 rounded-sm font-mono text-xs",
                    "border transition-colors duration-180 ease-out",
                    isActive
                      ? "border-terminal text-terminal-1 bg-terminal/10"
                      : "border-rule text-ink-2 hover:border-ink-3 hover:text-ink-1"
                  )}
                >
                  {f === "Featured" ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Star size={10} strokeWidth={1.75} />
                      {f}
                    </span>
                  ) : f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result count */}
        <div className="mt-3 font-mono text-xs text-ink-3">
          <span className="text-terminal">$</span> {filtered.length} result{filtered.length === 1 ? "" : "s"}
          {filter !== "All" && <> · filter=<span className="text-ink-1">{filter}</span></>}
          {search && <> · search="<span className="text-ink-1">{search}"</span></>}
        </div>
      </Section>

      {/* ── RESULTS ───────────────────────────────────────────── */}
      <Section className="pt-4 pb-10">
        {filtered.length === 0 ? (
          <div className="rounded-sm border border-rule bg-carbon-1 p-6 text-center">
            <div className="font-mono text-sm text-ink-2">No projects match the current filter.</div>
            <button
              type="button"
              onClick={() => { setFilter("All"); setSearch(""); }}
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-terminal hover:text-terminal-1"
            >
              Reset filters
              <ArrowRight size={12} strokeWidth={1.75} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {/* Featured grid (2-col, full cards with thumbnails). */}
            {featured.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4 font-mono text-[11px] uppercase tracking-[0.05em] text-amber">
                  <TrophyIcon />
                  Featured · {featured.length}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featured.map((p) => (
                    <ProjectCard key={p.title} project={p} density="standard" />
                  ))}
                </div>
              </div>
            )}

            {/* Compact grid (3-col, no feature list). */}
            {rest.length > 0 && (
              <div>
                {featured.length > 0 && (
                  <div className="flex items-center gap-2 mb-4 font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    <Folder size={11} strokeWidth={1.75} />
                    All · {rest.length}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rest.map((p) => (
                    <ProjectCard key={p.title} project={p} density="compact" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Section>
    </>
  );
}

// Local trophy icon import is delayed to keep this section near the JSX
// rather than in the import block at the top.
function TrophyIcon() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return <Star size={11} strokeWidth={1.75} />;
}
