// src/components/project-detail/FutureRoadmap.jsx
// Version timeline. Each version: number, theme, feature list.
// Features can be either plain strings or rich objects with
// { name, priority, effort, difficulty, description, whyWeNeed,
//   howToImplement, benefits }.

function FeatureItem({ f }) {
  // Object feature — render as a titled card.
  if (f && typeof f === "object") {
    return (
      <li className="flex flex-col gap-1.5 py-2 border-t border-rule first:border-t-0 first:pt-0">
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <span className="text-sm font-medium text-ink">{f.name || f.title || "Feature"}</span>
          {f.priority && (
            <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-amber">
              {String(f.priority).toLowerCase()}
            </span>
          )}
        </div>
        {f.description && (
          <p className="text-xs text-ink-2 leading-relaxed">{f.description}</p>
        )}
        {Array.isArray(f.benefits) && f.benefits.length > 0 && (
          <ul className="mt-1 flex flex-col gap-0.5 text-xs text-ink-3">
            {f.benefits.map((b, k) => (
              <li key={k} className="flex items-start gap-1.5">
                <span className="text-terminal shrink-0" aria-hidden="true">›</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {f.effort && (
          <span className="font-mono text-[10px] text-ink-3">
            effort · {f.effort}{f.difficulty ? ` · ${f.difficulty}` : ""}
          </span>
        )}
      </li>
    );
  }
  // Plain string feature.
  return (
    <li className="flex items-start gap-2 py-1">
      <span className="text-terminal shrink-0 mt-0.5" aria-hidden="true">›</span>
      <span>{String(f)}</span>
    </li>
  );
}

export default function FutureRoadmap({ roadmap }) {
  if (!roadmap || roadmap.length === 0) return null;
  return (
    <ol className="flex flex-col gap-4 max-w-3xl">
      {roadmap.map((v, i) => (
        <li
          key={i}
          className="rounded-sm border border-rule bg-carbon-1 p-4 md:p-5"
        >
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <h3 className="text-base font-semibold text-ink">
              <span className="font-mono text-terminal-1 mr-2">v{v.version}</span>
              {v.theme || v.title}
            </h3>
            {(v.targetDate || v.timeline) && (
              <span className="font-mono text-xs text-ink-3">{v.targetDate || v.timeline}</span>
            )}
          </div>
          {v.description && (
            <p className="mt-1.5 text-sm text-ink-2 leading-relaxed">
              {v.description}
            </p>
          )}
          {Array.isArray(v.features) && v.features.length > 0 && (
            <ul className="mt-3 flex flex-col text-sm text-ink-1">
              {v.features.map((f, j) => (
                <FeatureItem key={j} f={f} />
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
