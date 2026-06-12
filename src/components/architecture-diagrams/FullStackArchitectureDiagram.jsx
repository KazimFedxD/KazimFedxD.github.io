// src/components/architecture-diagrams/FullStackArchitectureDiagram.jsx
// 7-service stack — same shape as the standard web stack.

import DiagramFrame from "./DiagramFrame";
import StandardWebStackDiagram from "./StandardWebStackDiagram";

export default function FullStackArchitectureDiagram() {
  return (
    <DiagramFrame
      title="Full-Stack Template · System Architecture"
      subtitle="7 services · Docker Compose"
    >
      <StandardWebStackDiagram project="Full-Stack Template" />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono text-ink-2">
        <div className="rounded-sm border border-rule p-3">
          <div className="text-ink-3 uppercase text-[10px] mb-1">Auth</div>
          JWT + email verification, refresh tokens
        </div>
        <div className="rounded-sm border border-rule p-3">
          <div className="text-ink-3 uppercase text-[10px] mb-1">Async</div>
          Email templates, scheduled cleanup
        </div>
        <div className="rounded-sm border border-rule p-3">
          <div className="text-ink-3 uppercase text-[10px] mb-1">Reverse proxy</div>
          Nginx routes /api and /static
        </div>
      </div>
    </DiagramFrame>
  );
}
