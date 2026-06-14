// src/components/project-detail/CommandOrApiSection.jsx
// Picks ApiReference or CommandReference based on which data field the
// project exposes. Single eyebrow header. Renders nothing if neither
// is set.

import { Section } from "../layout/PageShell";
import SectionHeader from "../ui/SectionHeader";
import ApiReference from "./ApiReference";
import CommandReference from "./CommandReference";
import { Reveal } from "../../lib/motion";

export default function CommandOrApiSection({ project }) {
  const hasApi = project.apiEndpoints && project.apiEndpoints.length > 0;
  const hasCommands = project.commands && project.commands.length > 0;
  if (!hasApi && !hasCommands) return null;

  return (
    <Reveal as="section">
      <Section className="pt-10 md:pt-14 pb-2" id={hasApi ? "api" : "commands"}>
        <SectionHeader
          eyebrow={hasApi ? "api reference" : "commands"}
          title={hasApi ? "How the system talks" : "What the bot can do"}
          kind="bold"
          hideRule
        />
        <div className="mt-8 max-w-5xl">
          {hasApi && <ApiReference endpoints={project.apiEndpoints} />}
          {hasCommands && <CommandReference commands={project.commands} />}
        </div>
      </Section>
    </Reveal>
  );
}
