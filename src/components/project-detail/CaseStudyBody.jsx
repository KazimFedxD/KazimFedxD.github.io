// src/components/project-detail/CaseStudyBody.jsx
// Top-level orchestrator for the case-study layout. Reads the project
// and composes sections in the documented scroll order, skipping any
// section whose data is missing. Renders nothing if the project has
// no body content at all.

import { Section } from "../layout/PageShell";
import SectionHeader from "../ui/SectionHeader";
import TechStackTable from "./TechStackTable";
import { Reveal } from "../../lib/motion";

import ProblemSection from "./ProblemSection";
import SolutionSection from "./SolutionSection";
import UniqueFeaturesGrid from "./UniqueFeaturesGrid";
import ArchitectureSection from "./ArchitectureSection";
import StackRationale from "./StackRationale";
import PerformanceSection from "./PerformanceSection";
import CommandOrApiSection from "./CommandOrApiSection";
import SetupSection from "./SetupSection";
import ScreenshotWall from "./ScreenshotWall";
import IssuesAndFutureSection from "./IssuesAndFutureSection";

function TechStackSection({ project }) {
  if (!project.techStack || project.techStack.length === 0) return null;
  return (
    <Reveal as="section">
      <Section className="pt-10 md:pt-14 pb-2" id="tech-stack">
        <SectionHeader
          eyebrow="tech stack"
          title="The tools and frameworks in use"
          kind="bold"
          hideRule
        />
        <div className="mt-8 max-w-5xl">
          <TechStackTable stack={project.techStack} />
        </div>
      </Section>
    </Reveal>
  );
}

function FeaturesSection({ project }) {
  if (!project.features || project.features.length === 0) return null;
  return (
    <Reveal as="section">
      <Section className="pt-10 md:pt-14 pb-2" id="features">
        <SectionHeader
          eyebrow="features in detail"
          title="What the system actually does"
          kind="bold"
          hideRule
        />
        <div className="mt-8 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.features.map((f, i) => (
            <div
              key={i}
              className="border border-rule rounded-sm p-4 bg-carbon-1/40"
            >
              <div className="flex items-start gap-2">
                <span className="font-mono text-xs text-terminal-1 shrink-0 mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="text-base font-semibold text-ink">
                    {typeof f === "string" ? f : f.title}
                  </div>
                  {typeof f === "object" && f.description && (
                    <p className="mt-1.5 text-sm text-ink-1 leading-relaxed">
                      {f.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Reveal>
  );
}

export default function CaseStudyBody({ project }) {
  const o = project.overview || {};
  const hasOverview = o.description || o.problemIntro || o.problemStatement;

  return (
    <>
      {hasOverview && (
        <Reveal as="section">
          <Section className="pt-8 md:pt-12 pb-2" id="overview">
            <SectionHeader
              eyebrow="overview"
              title="What this is, in plain terms"
              kind="bold"
              hideRule
            />
            {o.description && (
              <p className="mt-6 max-w-3xl text-base md:text-lg text-ink-1 leading-relaxed text-pretty">
                {o.description}
              </p>
            )}
          </Section>
        </Reveal>
      )}

      <ProblemSection project={project} />
      <SolutionSection project={project} />
      <UniqueFeaturesGrid project={project} />
      <ArchitectureSection project={project} />
      <TechStackSection project={project} />
      <StackRationale project={project} />
      <FeaturesSection project={project} />
      <PerformanceSection project={project} />
      <CommandOrApiSection project={project} />
      <SetupSection project={project} />
      <ScreenshotWall project={project} />
      <IssuesAndFutureSection project={project} />
    </>
  );
}
