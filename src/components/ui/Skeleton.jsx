// src/components/ui/Skeleton.jsx
// Minimal skeleton. A single rule-tinted pulse, 1.6s, ease-out, infinite.
// Gated on prefers-reduced-motion at the global CSS layer.

import { cn } from "../../lib/cn";

export default function Skeleton({ className, ...rest }) {
  return (
    <div
      className={cn(
        "rounded-sm bg-carbon-1",
        "animate-pulse motion-reduce:animate-none",
        className
      )}
      aria-hidden="true"
      {...rest}
    />
  );
}
