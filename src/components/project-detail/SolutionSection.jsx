// src/components/project-detail/SolutionSection.jsx
// Renders project.overview.howWeSolve as an asymmetric 3-column "problem →
// solution → benefit" layout. Each row gets a 1px hairline below it. The
// benefit column is mono and tinted with terminal-1 to make the payoff
// readable at a glance.

import { Section } from "../layout/PageShell";
import SectionHeader from "../ui/SectionHeader";
import { Reveal } from "../../lib/motion";

function SolutionRow({ problem, solution, benefit, index }) {
  return (
    <li className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-5 border-b border-rule last:border-b-0">
      <div className="md:col-span-1">
        <span className="font-mono text-xs text-terminal-1">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="md:col-span-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-1">
          problem
        </div>
        <p className="text-sm text-ink-1 leading-relaxed">{problem}</p>
      </div>
      <div className="md:col-span-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-1">
          solution
        </div>
        <p className="text-sm text-ink leading-relaxed">{solution}</p>
      </div>
      <div className="md:col-span-3">
        {benefit && (
          <>
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-1">
              benefit
            </div>
            <p className="text-sm text-terminal-1 font-mono leading-relaxed">
              → {benefit}
            </p>
          </>
        )}
      </div>
    </li>
  );
}

export default function SolutionSection({ project }) {
  const items = project.overview?.howWeSolve;
  if (!items || items.length === 0) return null;

  return (
    <Reveal as="section">
      <Section className="pt-10 md:pt-14 pb-2" id="solution">
        <SectionHeader
          eyebrow="how it solves it"
          title="From problem to working system"
          kind="bold"
          hideRule
        />
        <ol className="mt-8 max-w-5xl">
          {items.map((s, i) => (
            <SolutionRow
              key={i}
              index={i}
              problem={s.problem}
              solution={s.solution}
              benefit={s.benefit}
            />
          ))}
        </ol>
      </Section>
    </Reveal>
  );
}
