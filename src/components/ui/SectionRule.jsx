// src/components/ui/SectionRule.jsx
// A small hairline + center dot divider, used between major page sections.
// Reads as "a beat, then we change the subject."

import { cn } from "../../lib/cn";

export default function SectionRule({ className, glyph = "·" }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 my-2",
        className
      )}
      role="separator"
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-rule" />
      <span className="text-ink-3 text-[10px] font-mono leading-none">{glyph}</span>
      <span className="h-px w-12 bg-rule" />
    </div>
  );
}
