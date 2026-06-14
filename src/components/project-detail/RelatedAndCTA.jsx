// src/components/project-detail/RelatedAndCTA.jsx
// Closes the case study with a RelatedProjects row and a "Want a project
// like this?" CTA pointing to /contact. Renders nothing if neither is
// available.

import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";

import { Section } from "../layout/PageShell";
import Card, { CardBody } from "../ui/Card";
import Button from "../ui/Button";
import RelatedProjects from "./RelatedProjects";
import SectionRule from "../ui/SectionRule";

export default function RelatedAndCTA({ project }) {
  const hasRelated =
    project.relatedProjects && project.relatedProjects.length > 0;
  const ctaEmail =
    project.contactEmail || "abbaskazim135@gmail.com";

  return (
    <>
      {hasRelated && (
        <>
          <SectionRule />
          <Section className="pt-2 pb-2" id="related">
            <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-4">
              <span className="text-terminal">$</span> ls ./related
            </div>
            <RelatedProjects related={project.relatedProjects} />
          </Section>
        </>
      )}

      <Section className="pt-12 md:pt-16 pb-4" id="cta">
        <Card accent className="bg-carbon-1">
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-terminal mb-2">
                  → next step
                </div>
                <h3 className="text-section-display font-bold text-ink">
                  Want a project like this?
                </h3>
                <p className="mt-2 text-sm text-ink-2 max-w-prose">
                  I build serious systems — Django, React, Discord bots,
                  custom languages, full-stack templates. If you have a
                  problem that needs a real solution, let's talk.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  as={Link}
                  to="/contact"
                  variant="primary"
                  size="md"
                >
                  <Mail size={14} strokeWidth={1.75} />
                  Get in touch
                </Button>
                <Button
                  as="a"
                  href={`mailto:${ctaEmail}`}
                  variant="ghost"
                  size="md"
                  external
                >
                  Email directly
                  <ArrowRight size={14} strokeWidth={1.75} />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Section>
    </>
  );
}
