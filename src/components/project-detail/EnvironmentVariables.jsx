// src/components/project-detail/EnvironmentVariables.jsx
// Table of name/required/default/description.

import Chip from "../ui/Chip";

export default function EnvironmentVariables({ vars }) {
  if (!vars || vars.length === 0) return null;
  return (
    <div className="rounded-sm border border-rule overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-rule bg-carbon-2">
            <th className="text-left font-mono text-[10px] uppercase text-ink-3 px-3 py-2 font-medium">
              Variable
            </th>
            <th className="text-left font-mono text-[10px] uppercase text-ink-3 px-3 py-2 font-medium">
              Required
            </th>
            <th className="text-left font-mono text-[10px] uppercase text-ink-3 px-3 py-2 font-medium hidden md:table-cell">
              Default
            </th>
            <th className="text-left font-mono text-[10px] uppercase text-ink-3 px-3 py-2 font-medium">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {vars.map((v, i) => (
            <tr key={i} className="border-b border-rule last:border-b-0">
              <td className="px-3 py-2 font-mono text-ink align-top">
                {v.name}
              </td>
              <td className="px-3 py-2 align-top">
                {v.required ? (
                  <Chip size="sm" variant="warn">REQUIRED</Chip>
                ) : (
                  <Chip size="sm" variant="muted">OPTIONAL</Chip>
                )}
              </td>
              <td className="px-3 py-2 font-mono text-xs text-ink-2 align-top hidden md:table-cell">
                {v.default || "—"}
              </td>
              <td className="px-3 py-2 text-ink-1 align-top">
                {v.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
