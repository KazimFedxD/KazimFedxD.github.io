// src/components/project-detail/PerformanceSection.jsx
// Wraps the existing PerformanceMetrics component for the case-study
// layout. The 3 trailing callouts (strengths / bottlenecks / best-use)
// are compressed into a single 2-col "what works / what's slow" block
// so the case study doesn't end on three stacked summaries.

import { Section } from "../layout/PageShell";
import SectionHeader from "../ui/SectionHeader";
import PerformanceMetrics from "./PerformanceMetrics";
import { Reveal } from "../../lib/motion";

export default function PerformanceSection({ project }) {
  const perf = project.performance;
  if (!perf || Object.keys(perf).length === 0) return null;

  // Strip the trailing 3 callouts so we can render them ourselves.
  const stripped = { ...perf };
  delete stripped.strengths;
  delete stripped.bottlenecks;
  delete stripped.bestUseCases;
  delete stripped.notRecommendedFor;

  return (
    <Reveal as="section">
      <Section className="pt-10 md:pt-14 pb-2" id="performance">
        <SectionHeader
          eyebrow="performance"
          title="How the system holds up under load"
          kind="bold"
          hideRule
        />
        <div className="mt-8 max-w-5xl">
          <PerformanceMetrics performance={stripped} />
        </div>

        {(perf.strengths || perf.bottlenecks) && (
          <div className="mt-10 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {perf.strengths && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-terminal mb-3">
                  → what works
                </div>
                <ul className="flex flex-col gap-2 text-sm text-ink-1">
                  {perf.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-terminal mt-0.5 shrink-0" aria-hidden="true">+</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {perf.bottlenecks && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-amber mb-3">
                  → what's slow
                </div>
                <ul className="flex flex-col gap-2 text-sm text-ink-1">
                  {perf.bottlenecks.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber mt-0.5 shrink-0" aria-hidden="true">−</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Section>
    </Reveal>
  );
}
