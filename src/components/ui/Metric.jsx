// src/components/ui/Metric.jsx
// Big monospace number, small label below. Optional one-time mount tween
// gated on prefers-reduced-motion.

import { useEffect, useState } from "react";
import { useReducedMotion } from "../../lib/motion";
import { cn } from "../../lib/cn";

/** Tween a numeric value from 0 → target over `ms` (no easing beyond
 *  ease-out). Returns the current string. */
function useTween(target, ms = 900) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    let raf;
    let start;
    const step = (t) => {
      if (start === undefined) start = t;
      const elapsed = t - start;
      const p = Math.min(1, elapsed / ms);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, reduced]);

  return value;
}

/** Format a number, preserving the "+" or "%" suffix and string-passthrough. */
function format(value, suffix, precision = 0) {
  if (typeof value === "string") return value;
  if (Number.isNaN(value)) return "0";
  const rounded = precision > 0 ? value.toFixed(precision) : Math.round(value);
  return `${rounded}${suffix || ""}`;
}

export default function Metric({
  value,
  label,
  suffix = "",
  icon: Icon,
  tween = false,
  className,
  size = "md",
}) {
  const numeric =
    typeof value === "number"
      ? value
      : parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
  const tweened = useTween(tween ? numeric : numeric);
  const display = tween ? tweened : numeric;

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 p-4 md:p-5 rounded-sm border border-rule bg-carbon-1",
        className
      )}
    >
      <div className="flex items-baseline gap-2">
        {Icon && (
          <Icon
            size={size === "lg" ? 18 : 14}
            strokeWidth={1.75}
            className="text-terminal"
            aria-hidden="true"
          />
        )}
        <div
          className={cn(
            "font-mono font-medium text-ink leading-none",
            size === "lg" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
          )}
        >
          {format(display, suffix)}
        </div>
      </div>
      {label && (
        <div className="font-mono text-xs text-ink-3 uppercase tracking-normal">
          {label}
        </div>
      )}
    </div>
  );
}
