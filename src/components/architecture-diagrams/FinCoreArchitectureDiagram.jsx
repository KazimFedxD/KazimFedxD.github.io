// src/components/architecture-diagrams/FinCoreArchitectureDiagram.jsx
// 7-service stack — same shape as the standard web stack, with finance-
// specific annotations in the callout below.

import DiagramFrame from "./DiagramFrame";
import StandardWebStackDiagram from "./StandardWebStackDiagram";

export default function FinCoreArchitectureDiagram() {
  return (
    <DiagramFrame
      title="FinCore · System Architecture"
      subtitle="7 services · Docker Compose"
    >
      <StandardWebStackDiagram project="FinCore" />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono text-ink-2">
        <div className="rounded-sm border border-rule p-3">
          <div className="text-ink-3 uppercase text-[10px] mb-1">Auth</div>
          JWT access + refresh; protected routes
        </div>
        <div className="rounded-sm border border-rule p-3">
          <div className="text-ink-3 uppercase text-[10px] mb-1">Async</div>
          Email + report generation via Celery
        </div>
        <div className="rounded-sm border border-rule p-3">
          <div className="text-ink-3 uppercase text-[10px] mb-1">Cache</div>
          Redis-backed dashboard aggregates
        </div>
      </div>
    </DiagramFrame>
  );
}
