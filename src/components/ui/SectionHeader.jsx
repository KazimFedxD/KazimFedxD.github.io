// src/components/ui/SectionHeader.jsx
// Section eyebrow + headline + optional lede. Eyebrow is uppercase mono with
// a small `$` prompt. Title is 700-weight with a thin terminal-green rule
// underneath — the editorial "dropped mark" for each section.
//
// `kind` controls the title typography:
//   "sans"  (default) — fluid-headline, current behaviour
//   "bold"  — section-display, used on the project case-study first-class
//             sections where the title is a chapter heading
//   "ghost" — eyebrow + title, no rule, no lede (used for in-flow sub-sections)

import { cn } from "../../lib/cn";

export default function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Title = "h2",
  className,
  ruleWidth = "w-8",
  kind = "sans",
  hideRule = false,
}) {
  return (
    <div
      className={cn(
        "max-w-prose",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3 mb-3">
          <span className="text-terminal">$</span> {eyebrow}
        </div>
      )}
      <Title
        className={cn(
          "font-bold text-ink text-balance",
          kind === "bold" ? "text-section-display" : "text-fluid-headline"
        )}
      >
        {title}
      </Title>
      {/* The one decorative mark on every section: 24px terminal-green rule. */}
      {!hideRule && (
        <div className={cn("mt-3 h-px bg-terminal", ruleWidth)} aria-hidden="true" />
      )}
      {lede && (
        <p className="mt-3 text-lg md:text-xl text-ink-2 leading-relaxed text-pretty">
          {lede}
        </p>
      )}
    </div>
  );
}
