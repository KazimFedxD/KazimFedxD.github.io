// src/components/project-detail/PerformanceMetrics.jsx
// Renders key metrics as a 2/3/4-column grid. Optional "Strengths" and
// "Bottlenecks" callouts.

import Metric from "../ui/Metric";
import Callout from "../ui/Callout";
import { cn } from "../../lib/cn";

function MetricBlock({ title, metrics, cols = 3 }) {
  if (!metrics) return null;
  const entries = Object.entries(metrics);
  return (
    <div>
      {title && <div className="font-mono text-xs text-ink-3 uppercase mb-2">{title}</div>}
      <div className={cn(
        "grid gap-2",
        cols === 2 && "grid-cols-2",
        cols === 3 && "grid-cols-2 md:grid-cols-3",
        cols === 4 && "grid-cols-2 md:grid-cols-4"
      )}>
        {entries.map(([k, v]) => (
          <Metric
            key={k}
            value={typeof v === "number" ? v : String(v)}
            label={k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
            size="md"
          />
        ))}
      </div>
    </div>
  );
}

export default function PerformanceMetrics({ performance }) {
  if (!performance) return null;
  return (
    <div className="flex flex-col gap-6">
      {performance.keyMetrics && (
        <MetricBlock title="Key metrics" metrics={performance.keyMetrics} cols={3} />
      )}
      {performance.codebaseMetrics && (
        <MetricBlock title="Codebase" metrics={performance.codebaseMetrics} cols={3} />
      )}
      {performance.pageLoad && (
        <MetricBlock title="Page load" metrics={performance.pageLoad} cols={3} />
      )}
      {performance.apiResponseTimes && (
        <MetricBlock title="API response times" metrics={performance.apiResponseTimes} cols={3} />
      )}
      {performance.frontendMetrics && (
        <MetricBlock title="Frontend" metrics={performance.frontendMetrics} cols={3} />
      )}
      {performance.websocketLatency && (
        <MetricBlock title="WebSocket latency" metrics={performance.websocketLatency} cols={3} />
      )}
      {performance.lighthouse && (
        <MetricBlock title="Lighthouse" metrics={performance.lighthouse} cols={4} />
      )}
      {performance.bundleSize && (
        <MetricBlock title="Bundle size" metrics={performance.bundleSize} cols={3} />
      )}
      {performance.containerStartup && (
        <MetricBlock title="Container startup" metrics={performance.containerStartup} cols={3} />
      )}

      {performance.benchmarks && Array.isArray(performance.benchmarks) && (
        <div>
          <div className="font-mono text-xs text-ink-3 uppercase mb-2">Benchmarks</div>
          <div className="rounded-sm border border-rule overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-rule bg-carbon-2">
                  {Object.keys(performance.benchmarks[0] || {}).map((k) => (
                    <th key={k} className="text-left font-mono text-[10px] uppercase text-ink-3 px-3 py-2 font-medium">
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {performance.benchmarks.map((row, i) => (
                  <tr key={i} className="border-b border-rule last:border-b-0">
                    {Object.values(row).map((v, j) => (
                      <td key={j} className="px-3 py-2 font-mono text-ink-1">{String(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {performance.languageComparison && (
        <div>
          <div className="font-mono text-xs text-ink-3 uppercase mb-2">Language comparison</div>
          <div className="rounded-sm border border-rule overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-rule bg-carbon-2">
                  {Object.keys(performance.languageComparison[0] || {}).map((k) => (
                    <th key={k} className="text-left font-mono text-[10px] uppercase text-ink-3 px-3 py-2 font-medium">
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {performance.languageComparison.map((row, i) => (
                  <tr key={i} className="border-b border-rule last:border-b-0">
                    {Object.values(row).map((v, j) => (
                      <td key={j} className="px-3 py-2 font-mono text-ink-1">{String(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {performance.scalability && (
        <Callout kind="info" title="Scalability">
          <p>{performance.scalability}</p>
        </Callout>
      )}
      {performance.optimizationOpportunities && (
        <Callout kind="note" title="Optimization opportunities">
          <p>{performance.optimizationOpportunities}</p>
        </Callout>
      )}
      {performance.strengths && Array.isArray(performance.strengths) && (
        <Callout kind="ok" title="Strengths">
          <ul className="space-y-1.5">
            {performance.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-terminal shrink-0" aria-hidden="true">›</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Callout>
      )}
      {performance.bottlenecks && Array.isArray(performance.bottlenecks) && (
        <Callout kind="warn" title="Bottlenecks">
          <ul className="space-y-1.5">
            {performance.bottlenecks.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-terminal shrink-0" aria-hidden="true">›</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </Callout>
      )}
      {performance.bestUseCases && Array.isArray(performance.bestUseCases) && (
        <Callout kind="info" title="Best use cases">
          <ul className="space-y-1.5">
            {performance.bestUseCases.map((u, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-terminal shrink-0" aria-hidden="true">›</span>
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </Callout>
      )}
      {performance.notRecommendedFor && Array.isArray(performance.notRecommendedFor) && (
        <Callout kind="warn" title="Not recommended for">
          <ul className="space-y-1.5">
            {performance.notRecommendedFor.map((u, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-terminal shrink-0" aria-hidden="true">›</span>
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </Callout>
      )}
    </div>
  );
}
