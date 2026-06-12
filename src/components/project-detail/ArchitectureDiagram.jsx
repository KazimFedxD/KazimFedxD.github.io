// src/components/project-detail/ArchitectureDiagram.jsx
// Dispatches to the right per-project diagram based on the project title.

import TeachBack from "../architecture-diagrams/TeachBackArchitectureDiagram";
import FinCore from "../architecture-diagrams/FinCoreArchitectureDiagram";
import FullStack from "../architecture-diagrams/FullStackArchitectureDiagram";
import FxDC from "../architecture-diagrams/FxDCArchitectureDiagram";
import FxPy from "../architecture-diagrams/FxPyArchitectureDiagram";
import FeXoBot from "../architecture-diagrams/FeXoBotArchitectureDiagram";
import FxQuest from "../architecture-diagrams/FxQuestArchitectureDiagram";
import Portfolio from "../architecture-diagrams/PortfolioWebsiteArchitectureDiagram";

const DIAGRAMS = {
  "TeachBack": TeachBack,
  "FinCore": FinCore,
  "Full-Stack Template": FullStack,
  "Full-Stack-Template": FullStack,
  "FedxD Data Container (FxDC)": FxDC,
  "FedxD-Data-Container-FxDC": FxDC,
  "FxPy": FxPy,
  "FeXoBot": FeXoBot,
  "FxQuest": FxQuest,
  "Portfolio Website": Portfolio,
  "Portfolio-Website": Portfolio,
};

export default function ArchitectureDiagram({ title, architecture }) {
  let Diagram = DIAGRAMS[title];
  if (!Diagram) {
    // Try the slug form (`/` → `-`, drop parens).
    const slug = String(title || "")
      .replace(/\s*\(([^)]+)\)/g, "-$1")
      .replace(/[()]/g, "")
      .replace(/\s+/g, "-")
      .trim();
    Diagram = DIAGRAMS[slug];
  }
  if (Diagram) return <Diagram />;

  // Fallback: a simple services list if no diagram exists for this project.
  if (architecture?.services) {
    return (
      <div className="rounded-sm border border-rule bg-carbon-1 p-4">
        <div className="font-mono text-xs text-ink-3 mb-3">
          <span className="text-terminal">$</span> {architecture.servicesTitle || "Services"}
        </div>
        {architecture.description && (
          <p className="text-sm text-ink-1 leading-relaxed mb-3">
            {architecture.description}
          </p>
        )}
        <ul className="flex flex-col gap-2">
          {architecture.services.map((s, i) => (
            <li
              key={i}
              className="rounded-sm border border-rule p-3 bg-carbon-2"
            >
              <div className="text-sm font-medium text-ink">
                {s.name}
                {s.port && (
                  <span className="ml-2 font-mono text-xs text-ink-3">:{s.port}</span>
                )}
              </div>
              {s.purpose && (
                <div className="mt-1 text-xs text-ink-2">{s.purpose}</div>
              )}
              {s.description && (
                <div className="mt-1 text-xs text-ink-2">{s.description}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}
