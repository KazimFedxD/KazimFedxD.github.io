// src/components/project-detail/CommandReference.jsx
// Discord command list. Grouped by category.

import { useMemo } from "react";
import Chip from "../ui/Chip";

function CategoryBlock({ category, commands }) {
  return (
    <div className="rounded-sm border border-rule bg-carbon-1">
      <div className="px-4 py-2.5 border-b border-rule flex items-center justify-between">
        <h3 className="text-sm font-mono uppercase text-terminal-1">
          {category}
        </h3>
        <span className="font-mono text-xs text-ink-3">
          {commands.length} command{commands.length === 1 ? "" : "s"}
        </span>
      </div>
      <ul>
        {commands.map((c, i) => (
          <li
            key={i}
            className="px-4 py-3 border-b border-rule last:border-b-0 flex flex-col gap-1.5"
          >
            <div className="flex flex-wrap items-baseline gap-2">
              <code className="font-mono text-sm text-ink">
                {c.prefix || "/"}{c.name}
              </code>
              {c.permissions && (
                <Chip size="sm" variant="muted">{c.permissions}</Chip>
              )}
              {c.location && (
                <Chip size="sm" variant="muted">{c.location}</Chip>
              )}
            </div>
            {c.description && (
              <p className="text-sm text-ink-1 leading-relaxed">{c.description}</p>
            )}
            {c.usage && (
              <pre className="mt-1 rounded-sm border border-rule bg-carbon-2 p-2 text-[12.5px] font-mono text-ink-1 overflow-x-auto">
                {c.usage}
              </pre>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CommandReference({ commands }) {
  const grouped = useMemo(() => {
    if (!commands || commands.length === 0) return [];
    const m = new Map();
    for (const c of commands) {
      const key = c.category || "General";
      if (!m.has(key)) m.set(key, []);
      m.get(key).push(c);
    }
    return Array.from(m.entries()).map(([category, list]) => ({ category, list }));
  }, [commands]);

  if (grouped.length === 0) return null;
  return (
    <div className="flex flex-col gap-4">
      {grouped.map((g) => (
        <CategoryBlock key={g.category} category={g.category} commands={g.list} />
      ))}
    </div>
  );
}
