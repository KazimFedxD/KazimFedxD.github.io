// src/components/project-detail/SetupSection.jsx
// Wraps the existing SetupGuide and prepends a "Prerequisites" mini-block
// read from project.requirements.software + requirements.externalServices.

import { Section } from "../layout/PageShell";
import SectionHeader from "../ui/SectionHeader";
import SetupGuide from "./SetupGuide";
import EnvironmentVariables from "./EnvironmentVariables";
import { Reveal } from "../../lib/motion";

export default function SetupSection({ project }) {
  const hasSetup = project.setupSteps && project.setupSteps.length > 0;
  const hasEnv = project.environmentVariables && project.environmentVariables.length > 0;
  const req = project.requirements || {};
  const hasReqs =
    req.software || req.externalServices || req.browsers || req.operatingSystem;
  if (!hasSetup && !hasEnv && !hasReqs) return null;

  return (
    <Reveal as="section">
      <Section className="pt-10 md:pt-14 pb-2" id="setup">
        <SectionHeader
          eyebrow="getting started"
          title="Run it locally"
          kind="bold"
          hideRule
        />

        {hasReqs && (
          <div className="mt-8 max-w-5xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-3">
              <span className="text-terminal">$</span> prerequisites
            </div>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 border-l-2 border-rule pl-4">
              {req.operatingSystem && (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-0.5">
                    os
                  </dt>
                  <dd className="text-sm text-ink-1">
                    {typeof req.operatingSystem === "string"
                      ? req.operatingSystem
                      : Array.isArray(req.operatingSystem)
                      ? req.operatingSystem.join(" · ")
                      : req.operatingSystem.name || "—"}
                  </dd>
                </div>
              )}
              {req.software && (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-0.5">
                    software
                  </dt>
                  <dd className="text-sm text-ink-1">
                    {Array.isArray(req.software) ? req.software.join(" · ") : req.software}
                  </dd>
                </div>
              )}
              {req.browsers && (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-0.5">
                    browsers
                  </dt>
                  <dd className="text-sm text-ink-1">
                    {Array.isArray(req.browsers) ? req.browsers.join(" · ") : req.browsers}
                  </dd>
                </div>
              )}
              {req.externalServices && (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-0.5">
                    external services
                  </dt>
                  <dd className="text-sm text-ink-1">
                    {Array.isArray(req.externalServices)
                      ? req.externalServices.join(" · ")
                      : req.externalServices}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}

        {hasSetup && (
          <div className="mt-10 max-w-5xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-3">
              <span className="text-terminal">$</span> step by step
            </div>
            <SetupGuide steps={project.setupSteps} />
          </div>
        )}

        {hasEnv && (
          <div className="mt-10 max-w-5xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-3">
              <span className="text-terminal">$</span> environment variables
            </div>
            <EnvironmentVariables vars={project.environmentVariables} />
          </div>
        )}
      </Section>
    </Reveal>
  );
}
