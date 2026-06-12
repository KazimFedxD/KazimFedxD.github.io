// src/components/ui/Prose.jsx
// Wraps long-form content with the body type ramp, 65–75ch ceiling, and
// tight rhythm. Used by About and the long-form prose blocks in project
// detail.

import { cn } from "../../lib/cn";

export default function Prose({ as: As = "div", className, children, ...rest }) {
  return (
    <As
      className={cn(
        "max-w-prose",
        "text-ink-1 text-base leading-relaxed",
        "[&_p+p]:mt-4 [&_ul]:mt-3 [&_ol]:mt-3",
        "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_li+li]:mt-1.5",
        "[&_strong]:text-ink [&_strong]:font-semibold",
        "[&_a]:text-terminal [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-1",
        "[&_a:hover]:text-terminal-1",
        "[&_code]:font-mono [&_code]:text-[0.9em] [&_code]:bg-carbon-1",
        "[&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-sm",
        "[&_code]:border [&_code]:border-rule [&_code]:text-ink",
        className
      )}
      {...rest}
    >
      {children}
    </As>
  );
}
