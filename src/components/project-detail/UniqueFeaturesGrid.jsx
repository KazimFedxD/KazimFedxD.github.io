// src/components/project-detail/UniqueFeaturesGrid.jsx
// Renders project.overview.uniqueFeatures as a 2-col grid. Each card has
// a bold title + bullet list. Cards that have codeSnippets defer to the
// existing FeatureCard component which knows how to render them inline.

import { Section } from "../layout/PageShell";
import Card, { CardBody } from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { Reveal } from "../../lib/motion";
import FeatureCard from "./FeatureCard";

export default function UniqueFeaturesGrid({ project }) {
  const items = project.overview?.uniqueFeatures;
  if (!items || items.length === 0) return null;

  return (
    <Reveal as="section">
      <Section className="pt-10 md:pt-14 pb-2" id="unique-features">
        <SectionHeader
          eyebrow="what makes it different"
          title="The features that set it apart"
          kind="bold"
          hideRule
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
          {items.map((f, i) => {
            const hasSnippets =
              Array.isArray(f.codeSnippets) && f.codeSnippets.length > 0;
            if (hasSnippets) {
              return <FeatureCard key={i} feature={f} />;
            }
            return (
              <Card key={i}>
                <CardBody>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-xs text-terminal-1 shrink-0 mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <div className="text-base font-semibold text-ink">
                        {f.title}
                      </div>
                      {Array.isArray(f.points) && f.points.length > 0 && (
                        <ul className="mt-2.5 flex flex-col gap-1.5 text-sm text-ink-1">
                          {f.points.map((p, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <span className="text-terminal mt-1.5 shrink-0 w-1 h-1 rounded-full bg-terminal" aria-hidden="true" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {typeof f.description === "string" && (
                        <p className="mt-2 text-sm text-ink-1 leading-relaxed">
                          {f.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </Section>
    </Reveal>
  );
}
