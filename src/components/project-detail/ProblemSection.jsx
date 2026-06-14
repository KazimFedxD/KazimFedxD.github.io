// src/components/project-detail/ProblemSection.jsx
// Reads project.overview.problemIntro (Callout) + project.overview.problemStatement
// (numbered list with mono 01-NN markers). Renders as the first-class
// "The problem" section of the case study.

import { Section } from "../layout/PageShell";
import Callout from "../ui/Callout";
import SectionHeader from "../ui/SectionHeader";
import { Reveal } from "../../lib/motion";

export default function ProblemSection({ project }) {
  const o = project.overview || {};
  const intro = o.problemIntro;
  const statements = o.problemStatement;

  if (!intro && (!statements || statements.length === 0)) return null;

  return (
    <Reveal as="section">
      <Section className="pt-12 md:pt-16 pb-2" id="problem">
        <SectionHeader
          eyebrow="the problem"
          title="What was wrong with the status quo"
          kind="bold"
          hideRule
        />
        <div className="mt-8 max-w-3xl flex flex-col gap-6">
          {intro && (
            <Callout kind="info" title="Context">
              <p>{intro}</p>
            </Callout>
          )}
          {statements && statements.length > 0 && (
            <ol className="flex flex-col gap-3">
              {statements.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base text-ink-1 leading-relaxed"
                >
                  <span className="font-mono text-xs text-terminal-1 shrink-0 mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </Section>
    </Reveal>
  );
}
