// src/components/project-list/MetricsStrip.jsx
// 3-cell mono metrics strip for the deep project card on the projects
// list page. Reads from the registry project + the matching detail data
// module (if any). Derives real metrics from the actual data shape —
// lighthouseScores, bundleSize, pageLoad, codebaseMetrics.
//
// Falls back gracefully: if no metrics, renders a single "case study
// metrics coming soon" line.

import { cn } from "../../lib/cn";

function Stat({ label, value, suffix, accent }) {
  return (
    <div className="flex-1 border-l border-rule pl-3 first:border-l-0 first:pl-0">
      <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3 mb-0.5">
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={cn(
            "text-lg font-bold leading-none",
            accent ? "text-terminal" : "text-ink"
          )}
        >
          {value}
        </span>
        {suffix && (
          <span className="text-xs text-ink-2 font-mono">{suffix}</span>
        )}
      </div>
    </div>
  );
}

// Extract real metrics from the project's actual data shape. Each
// candidate is checked against the real field; only present values
// produce a cell.
function deriveMetrics(detailData, project) {
  const cells = [];
  const perf = detailData?.performance || {};

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
    // "~148 kB" → "148", " kB"
    const m = bundle.total.match(/([\d.]+)\s*(.*)/);
    if (m) {
      cells.push({
        label: "bundle",
        value: m[1],
        suffix: (m[2] || "").trim() || "kB",
      });
    }
  }

  // 3. First Contentful Paint (or other page-load metric).
  if (Array.isArray(perf.pageLoad) && perf.pageLoad[0]) {
    const fcp = perf.pageLoad[0];
    if (fcp.actual) {
      cells.push({
        label: fcp.metric?.toLowerCase().includes("interactive")
          ? "tti"
          : "fcp",
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

  // 5. WebSocket / API latency (take the first non-empty).
  if (Array.isArray(perf.webSocketLatency) && perf.webSocketLatency[0]) {
    cells.push({
      label: "ws",
      value: perf.webSocketLatency[0].latency || "—",
    });
  }

  // 6. Feature count (always available).
  if (project.features?.length) {
    cells.push({
      label: "features",
      value: project.features.length,
    });
  }

  // 7. Stack size (always available).
  if (project.tech?.length) {
    cells.push({
      label: "stack",
      value: project.tech.length,
      suffix: "tools",
    });
  }

  return cells.slice(0, 3);
}

export default function MetricsStrip({ project, detailData }) {
  const cells = deriveMetrics(detailData, project);

  if (cells.length === 0) {
    return (
      <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">
        <span className="text-terminal">▸</span>
        <span>case study metrics coming soon</span>
      </div>
    );
  }

  return (
    <div className="mt-4 flex items-stretch gap-3 border-t border-rule pt-4">
      {cells.map((c, i) => (
        <Stat
          key={`${c.label}-${i}`}
          label={c.label}
          value={c.value}
          suffix={c.suffix}
          accent={c.accent}
        />
      ))}
    </div>
  );
}
