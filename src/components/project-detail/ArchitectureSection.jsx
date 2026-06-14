// src/components/project-detail/ArchitectureSection.jsx
// The CENTERPIECE of every case study. Wraps the existing
// ArchitectureDiagram + DiagramFrame with the new `case-study` shadow,
// adds a 1-sentence caption drawn from architecture.description, then
// renders the services grid in a 2-col layout.
//
// Renders nothing if the project has no `architecture` data.

import { Section } from "../layout/PageShell";
import Card, { CardBody } from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { Reveal } from "../../lib/motion";

export default function ArchitectureSection({ project }) {
  const arch = project.architecture;
  if (!arch) return null;

  return (
    <Reveal as="section">
      <Section className="pt-10 md:pt-14 pb-2" id="architecture">
        <SectionHeader
          eyebrow="architecture"
          title="How the system fits together"
          kind="bold"
          hideRule
        />

        <div className="mt-8 max-w-5xl">
          <div className="case-study-frame rounded-sm bg-carbon-1 p-2 md:p-3">
            <ArchitectureDiagram title={project.title} architecture={arch} />
          </div>
          {arch.description && (
            <p className="mt-3 text-sm text-ink-2 italic max-w-3xl">
              {arch.description}
            </p>
          )}
        </div>

        {arch.services && arch.services.length > 0 && (
          <div className="mt-10 max-w-5xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-4">
              <span className="text-terminal">$</span> {arch.servicesTitle || "services"}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {arch.services.map((svc, i) => (
                <Card key={i}>
                  <CardBody>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="text-sm font-semibold text-ink">{svc.name}</div>
                      {svc.category && (
                        <span className="font-mono text-[9px] uppercase tracking-[0.05em] text-ink-3 shrink-0">
                          {svc.category}
                        </span>
                      )}
                    </div>
                    {svc.description && (
                      <p className="text-sm text-ink-1 leading-relaxed">
                        {svc.description}
                      </p>
                    )}
                    {Array.isArray(svc.responsibilities) && svc.responsibilities.length > 0 && (
                      <ul className="mt-2.5 flex flex-col gap-1.5 text-xs text-ink-2">
                        {svc.responsibilities.map((r, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-terminal mt-0.5 shrink-0" aria-hidden="true">›</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {svc.tech && Array.isArray(svc.tech) && svc.tech.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {svc.tech.map((t, j) => (
                          <span
                            key={j}
                            className="font-mono text-[10px] text-ink-2 px-1.5 py-0.5 border border-rule rounded-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Section>
    </Reveal>
  );
}
