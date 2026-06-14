// src/components/project-detail/IssuesAndFutureSection.jsx
// Renders KnownIssuesPanel + FutureRoadmap side by side on lg+, stacked
// on mobile. SectionRule between them.

import { Section } from "../layout/PageShell";
import SectionHeader from "../ui/SectionHeader";
import KnownIssuesPanel from "./KnownIssuesPanel";
import FutureRoadmap from "./FutureRoadmap";
import { Reveal } from "../../lib/motion";

export default function IssuesAndFutureSection({ project }) {
  const hasIssues = project.knownIssues && project.knownIssues.length > 0;
  const hasFuture = project.futureEnhancements && project.futureEnhancements.length > 0;
  if (!hasIssues && !hasFuture) return null;

  return (
    <Reveal as="section">
      <Section className="pt-10 md:pt-14 pb-2" id="issues-future">
        <SectionHeader
          eyebrow="issues & future"
          title="What's hard, and what's next"
          kind="bold"
          hideRule
        />
        <div className="mt-8 max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10">
          {hasIssues && (
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-4">
                <span className="text-amber">$</span> known issues
              </div>
              <KnownIssuesPanel issues={project.knownIssues} />
            </div>
          )}
          {hasFuture && (
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-4">
                <span className="text-terminal">$</span> future
              </div>
              <FutureRoadmap roadmap={project.futureEnhancements} />
            </div>
          )}
        </div>
      </Section>
    </Reveal>
  );
}
