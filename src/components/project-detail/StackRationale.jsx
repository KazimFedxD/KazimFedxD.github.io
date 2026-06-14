// src/components/project-detail/StackRationale.jsx
// 2-col "Why this stack" block. Reads project.stackRationale (added in
// Phase 5). Each sentence is grounded in the project's actual code and
// architecture — not fabricated. Gracefully hides keys that aren't set.

import { Section } from "../layout/PageShell";
import SectionHeader from "../ui/SectionHeader";
import { Reveal } from "../../lib/motion";

export default function StackRationale({ project }) {
  const rationale = project.stackRationale;
  if (!rationale) return null;

  const entries = Object.entries(rationale).filter(
    ([, v]) => typeof v === "string" && v.trim().length > 0
  );
  if (entries.length === 0) return null;

  return (
    <Reveal as="section">
      <Section className="pt-10 md:pt-14 pb-2" id="stack-rationale">
        <SectionHeader
          eyebrow="why this stack"
          title="The choices behind the build"
          kind="bold"
          hideRule
        />
        <dl className="mt-8 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {entries.map(([category, reason]) => (
            <div
              key={category}
              className="border-l-2 border-rule pl-4"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.05em] text-terminal mb-1.5">
                {category}
              </dt>
              <dd className="text-sm text-ink-1 leading-relaxed">
                {reason}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </Reveal>
  );
}
