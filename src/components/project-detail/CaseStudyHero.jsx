// src/components/project-detail/CaseStudyHero.jsx
// The full-width case-study hero. Varies from the list-page hero pattern
// (no 1px rule, no section eyebrow) so the project page reads as a chapter,
// not as another list page.
//
// Layout, top to bottom:
//   1. back link
//   2. mono eyebrow: `$ cat ./projects/<slug>/README.md`
//   3. display H1 in fluid-display (Geist 700, tight tracking)
//   4. 2px terminal-green hairline (the ONE "loud" rule on the site)
//   5. 1-paragraph lede (shortDescription)
//   6. badges row
//   7. 6-cell status strip (status · year · language · license · tech · features)
//   8. CTAs (Source, Live demo)
//   9. mono path line
//  10. 16:9 banner screenshot

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

import { Section } from "../layout/PageShell";
import { cn } from "../../lib/cn";
import Button from "../ui/Button";
import ProjectBadges from "./ProjectBadges";
import { firstScreenshot, screenshotExists } from "../../lib/screenshots";
import { displayUrl } from "../../lib/format";
import { useEffect, useState } from "react";

function MetaCell({ label, children, accent }) {
  return (
    <div className="px-3 py-2.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-1">
        {label}
      </div>
      <div className={cn("text-sm truncate", accent ? "text-amber" : "text-ink")}>
        {children}
      </div>
    </div>
  );
}

export default function CaseStudyHero({ project, meta, slug, bannerSrc: bannerProp }) {
  const navigate = useNavigate();
  const [bannerOk, setBannerOk] = useState(true);

  // Resolve banner: prefer explicit prop, then first screenshot from data,
  // then firstScreenshot() helper for projects that only have the folder.
  const candidateBanner =
    bannerProp ||
    (project.screenshots?.[0]?.filename
      ? `/screenshots/${project.screenshotsFolder || ""}/${project.screenshots[0].filename}`
      : firstScreenshot(project.title));

  useEffect(() => {
    let cancelled = false;
    if (candidateBanner) {
      screenshotExists(candidateBanner).then((ok) => {
        if (!cancelled) setBannerOk(ok);
      });
    } else {
      setBannerOk(false);
    }
    return () => {
      cancelled = true;
    };
  }, [candidateBanner]);

  return (
    <Section as="section" className="pt-2 md:pt-4 pb-10" density="spacious">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-3 hover:text-terminal-1 transition-colors duration-180 mb-4"
      >
        <ArrowLeft size={12} strokeWidth={1.75} />
        back
      </button>

      <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
        <span className="text-terminal">$</span> cat ./projects/{slug.toLowerCase()}/README.md
      </div>

      <h1 className="text-fluid-display font-bold text-ink leading-[0.98] text-balance">
        {project.title}
      </h1>

      {/* The ONE "loud" rule on the site: 2px terminal-green, only here. */}
      <div className="mt-5 h-0.5 w-12 md:w-16 bg-terminal" aria-hidden="true" />

      {project.shortDescription && (
        <p className="mt-5 max-w-3xl text-base md:text-lg text-ink-2 leading-relaxed text-pretty">
          {project.shortDescription}
        </p>
      )}

      {project.badges && project.badges.length > 0 && (
        <div className="mt-5">
          <ProjectBadges badges={project.badges} />
        </div>
      )}

      <dl className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 max-w-4xl border border-rule rounded-sm divide-x divide-y md:divide-y-0 divide-rule">
        <MetaCell label="status">
          {meta.status === "In Development" ? (
            <span className="text-amber">{meta.status}</span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-terminal-1">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal animate-ping" aria-hidden="true" />
              {meta.status}
            </span>
          )}
        </MetaCell>
        <MetaCell label="year">{meta.year}</MetaCell>
        <MetaCell label="language">{meta.language}</MetaCell>
        <MetaCell label="license">MIT</MetaCell>
        <MetaCell label="tech">{meta.toolCount} tools</MetaCell>
        <MetaCell label="features">{project.features?.length ?? 0}</MetaCell>
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {project.github && (
          <Button as="a" href={project.github} variant="ghost" size="md" external>
            <Github size={14} strokeWidth={1.75} />
            Source
          </Button>
        )}
        {project.liveDemo && (
          <Button as="a" href={project.liveDemo} variant="primary" size="md" external>
            <ExternalLink size={14} strokeWidth={1.75} />
            {displayUrl(project.liveDemo)}
          </Button>
        )}
      </div>

      <div className="mt-4 font-mono text-xs text-ink-3">
        path: /projects/{slug} · last updated{" "}
        <span className="text-ink-1">June 2026</span>
      </div>

      {bannerOk && candidateBanner && (
        <div className="mt-8 border border-rule rounded-sm overflow-hidden bg-carbon-2-5">
          <img
            src={candidateBanner}
            alt={`${project.title} preview`}
            loading="lazy"
            className="w-full h-auto object-cover"
            onError={() => setBannerOk(false)}
          />
        </div>
      )}
    </Section>
  );
}
