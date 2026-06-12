// src/components/project-detail/SetupGuide.jsx
// Numbered steps with commands rendered as code snippets.

import CodeSnippet from "./CodeSnippet";

export default function SetupGuide({ steps }) {
  if (!steps || steps.length === 0) return null;
  return (
    <ol className="flex flex-col gap-5 max-w-3xl">
      {steps.map((step, i) => (
        <li key={i} className="rounded-sm border border-rule bg-carbon-1 p-4">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-terminal-1">
              Step {String(i + 1).padStart(2, "0")}
            </span>
            {step.title && (
              <h3 className="text-base font-semibold text-ink">{step.title}</h3>
            )}
          </div>
          {step.description && (
            <p className="mt-2 text-sm text-ink-1 leading-relaxed">
              {step.description}
            </p>
          )}
          {step.code && (
            <div className="mt-3">
              <CodeSnippet
                code={step.code}
                language={step.language || "bash"}
                filename={step.filename}
              />
            </div>
          )}
          {step.commands && Array.isArray(step.commands) && (
            <div className="mt-3 flex flex-col gap-2">
              {step.commands.map((c, j) => (
                <div key={j}>
                  <CodeSnippet
                    code={c.code}
                    language={c.language || "bash"}
                    filename={c.description}
                  />
                </div>
              ))}
            </div>
          )}
          {step.items && Array.isArray(step.items) && (
            <ul className="mt-3 flex flex-col gap-1.5 text-sm text-ink-1">
              {step.items.map((it, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="text-terminal shrink-0 mt-0.5" aria-hidden="true">›</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
