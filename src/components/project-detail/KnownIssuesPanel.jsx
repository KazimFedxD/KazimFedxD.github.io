// src/components/project-detail/KnownIssuesPanel.jsx
// Table of issue/severity/status/explanation. Severity is a monospace tag.

import Chip from "../ui/Chip";
import CodeSnippet from "./CodeSnippet";

const SEVERITY_VARIANT = {
  low: "muted",
  medium: "warn",
  high: "err",
  critical: "err",
};

const STATUS_VARIANT = {
  open: "warn",
  investigating: "info",
  resolved: "success",
  wontfix: "muted",
  "wont-fix": "muted",
  "in-progress": "info",
};

export default function KnownIssuesPanel({ issues }) {
  if (!issues || issues.length === 0) {
    return <p className="text-sm text-ink-2">No known issues documented.</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      {issues.map((it, i) => (
        <article key={i} className="rounded-sm border border-rule bg-carbon-1 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Chip
              variant={SEVERITY_VARIANT[(it.severity || "").toLowerCase()] || "muted"}
              size="sm"
            >
              {(it.severity || "issue").toLowerCase()}
            </Chip>
            {it.status && (
              <Chip
                variant={STATUS_VARIANT[(it.status || "").toLowerCase()] || "muted"}
                size="sm"
              >
                {it.status}
              </Chip>
            )}
            <h3 className="text-base font-semibold text-ink ml-1">
              {it.title || `Issue ${i + 1}`}
            </h3>
          </div>
          {it.impact && (
            <div className="mt-3 text-sm text-ink-1">
              <span className="font-mono text-[10px] text-ink-3 uppercase mr-2">Impact</span>
              {it.impact}
            </div>
          )}
          {it.explanation && (
            <p className="mt-3 text-sm text-ink-1 leading-relaxed">{it.explanation}</p>
          )}
          {it.workaround && (
            <div className="mt-3 text-sm text-ink-1">
              <span className="font-mono text-[10px] text-ink-3 uppercase mr-2">Workaround</span>
              {it.workaround}
            </div>
          )}
          {it.codeExample && (
            <div className="mt-3">
              <CodeSnippet
                language={it.codeExample.language || "text"}
                code={it.codeExample.code || it.codeExample}
                filename={it.codeExample.filename}
              />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
