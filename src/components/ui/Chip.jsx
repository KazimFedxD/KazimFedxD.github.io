// src/components/ui/Chip.jsx
// Monospace pill. Carries tech, status, achievements, categories, severity.
// Variants give each call-site a meaningful visual identity.

import { cn } from "../../lib/cn";

const variants = {
  // Tech: hairline border, neutral text — the everyday tag.
  tech:      "bg-transparent text-ink-2 border border-rule hover:text-ink hover:border-ink-3",
  // Status: amber tint — for "active", "open to work", live indicators.
  status:    "bg-amber/[0.08] text-amber border border-amber/30",
  // Achievement: amber solid — for awards, badges, ribbons.
  achievement: "bg-amber/[0.12] text-amber border border-amber/40 font-medium tracking-wide uppercase",
  // Existing variants (kept for backward-compat):
  solid:   "bg-terminal/15 text-terminal-1 border border-terminal/30",
  outline: "bg-transparent text-ink-2 border border-rule",
  muted:   "bg-carbon-1 text-ink-2 border border-rule",
  success: "bg-signal-ok/10 text-signal-ok border border-signal-ok/30",
  warn:    "bg-signal-warn/10 text-signal-warn border border-signal-warn/30",
  err:     "bg-signal-err/10 text-signal-err border border-signal-err/30",
};

const sizes = {
  sm: "h-6 px-2 text-[11px]",
  md: "h-7 px-2.5 text-xs",
  lg: "h-8 px-3 text-sm",
};

export default function Chip({
  variant = "tech",
  size = "md",
  className,
  as: As = "span",
  children,
  ...rest
}) {
  return (
    <As
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm font-mono whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
    </As>
  );
}
