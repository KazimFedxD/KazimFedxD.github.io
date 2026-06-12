// src/components/project-detail/TechStackTable.jsx
// Plain table, monospace cells, 1px hairlines.

import TechIcon from "../ui/TechIcon";

export default function TechStackTable({ stack }) {
  if (!stack || stack.length === 0) return null;
  return (
    <div className="rounded-sm border border-rule overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-rule bg-carbon-2">
            <th className="text-left font-mono text-[10px] uppercase text-ink-3 px-3 py-2 font-medium">
              Tech
            </th>
            <th className="text-left font-mono text-[10px] uppercase text-ink-3 px-3 py-2 font-medium hidden sm:table-cell">
              Version
            </th>
            <th className="text-left font-mono text-[10px] uppercase text-ink-3 px-3 py-2 font-medium">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {stack.map((s, i) => (
            <tr
              key={`${s.name}-${i}`}
              className="border-b border-rule last:border-b-0 hover:bg-carbon-1"
            >
              <td className="px-3 py-2 text-ink">
                <TechIcon name={s.name} size="sm" showIcon={false} />
              </td>
              <td className="px-3 py-2 font-mono text-ink-2 hidden sm:table-cell">
                {s.version || "—"}
              </td>
              <td className="px-3 py-2 font-mono text-xs text-ink-2">
                {s.category || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
