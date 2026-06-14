// src/components/project-detail/AtAGlance.jsx
// 4-up metrics grid for the case study. Reads from real project data:
//   - performance.keyMetrics (per-project array of {label, value, suffix})
//   - feature count, screenshot count, tech stack count, LOC from codebaseMetrics
//   - graceful "—" for fields that aren't set

import { Section } from "../layout/PageShell";
import { cn } from "../../lib/cn";

function StatCell({ label, value, suffix, accent }) {
  return (
    <div className="border-l border-rule pl-4 py-2 first:border-l-0 first:pl-0 md:first:pl-0 md:border-l md:pl-4 md:first:border-l md:first:pl-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-1.5">
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={cn(
            "text-2xl md:text-3xl font-bold text-balance leading-none",
            accent ? "text-terminal" : "text-ink"
          )}
        >
          {value}
        </span>
        {suffix && (
          <span className="text-sm text-ink-2 font-mono">{suffix}</span>
        )}
      </div>
    </div>
  );
}

// Extract up to 4 real metrics from project data, falling back gracefully.
function pickMetrics(project) {
  const cells = [];
  const perf = project.performance || {};

  // 1. Lighthouse score (desktop).
  const desktop = perf.lighthouseScores?.desktop;
  if (desktop && typeof desktop.performance === "number") {
    cells.push({
      label: "lighthouse",
      value: desktop.performance,
      accent: true,
    });
  }

  // 2. Bundle size.
  const bundle = perf.bundleSize;
  if (bundle && typeof bundle.total === "string") {
    const m = bundle.total.match(/([\d.]+)\s*(.*)/);
    if (m) {
      cells.push({
        label: "bundle",
        value: m[1],
        suffix: (m[2] || "").trim() || "kB",
      });
    }
  }

  // 3. First Contentful Paint (or first page-load metric).
  if (Array.isArray(perf.pageLoad) && perf.pageLoad[0]) {
    const fcp = perf.pageLoad[0];
    if (fcp.actual) {
      cells.push({
        label: fcp.metric?.toLowerCase().includes("interactive") ? "tti" : "fcp",
        value: fcp.actual,
      });
    }
  }

  // 4. Lines of code.
  const loc = perf.codebaseMetrics?.linesOfCode;
  if (typeof loc === "number" && loc > 0) {
    cells.push({
      label: "code",
      value: `${(loc / 1000).toFixed(1)}`,
      suffix: "k LoC",
    });
  }

  // 5. WebSocket latency (first entry).
  if (Array.isArray(perf.webSocketLatency) && perf.webSocketLatency[0]) {
    cells.push({
      label: "ws latency",
      value: perf.webSocketLatency[0].latency || "—",
    });
  }

  // 6. Feature count.
  if (project.features?.length) {
    cells.push({
      label: "features",
      value: project.features.length,
    });
  }

  // 7. Stack size.
  if (project.techStack?.length) {
    cells.push({
      label: "stack",
      value: project.techStack.length,
      suffix: "tools",
    });
  }

  // 8. Screenshot count.
  if (project.screenshots?.length) {
    cells.push({
      label: "screens",
      value: project.screenshots.length,
    });
  }

  // Pad with dashes so the layout is stable.
  while (cells.length < 4) {
    cells.push({ label: "metric", value: "—" });
  }

  return cells.slice(0, 4);
}

export default function AtAGlance({ project }) {
  const metrics = pickMetrics(project);
  const isEmpty = metrics.every((m) => m.value === "—");

  return (
    <Section as="section" className="pt-2 pb-2" density="tight">
      <div className="border border-rule rounded-sm bg-carbon-1/40 px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-terminal">
            ▸
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">
            at a glance
          </span>
        </div>
        {isEmpty ? (
          <p className="text-sm text-ink-2 italic">
            Detailed metrics for this project are still being documented.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
            {metrics.map((m, i) => (
              <StatCell
                key={i}
                label={m.label}
                value={m.value}
                suffix={m.suffix}
                accent={i === 0}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
