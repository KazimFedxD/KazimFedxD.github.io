// src/components/ui/Button.jsx
// Three variants. No glow, no shadow, no transform. Solid green for primary,
// hairline border for ghost, text-with-arrow for link.

import { forwardRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/cn";

const variantClasses = {
  primary:
    "bg-terminal text-carbon hover:bg-terminal-1 active:bg-terminal-2 " +
    "border border-terminal",
  ghost:
    "bg-transparent text-ink border border-rule " +
    "hover:border-terminal hover:text-terminal-1",
  link:
    "bg-transparent text-ink-1 hover:text-terminal-1 " +
    "border-0 p-0 h-auto",
  danger:
    "bg-transparent text-signal-err border border-signal-err/40 " +
    "hover:bg-signal-err/10",
};

const sizeClasses = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

const Button = forwardRef(function Button(
  {
    as: As = "button",
    variant = "primary",
    size = "md",
    trailingArrow = false,
    external = false,
    className,
    children,
    ...rest
  },
  ref
) {
  return (
    <As
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm font-medium",
        "transition-colors duration-180 ease-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        variant !== "link" && sizeClasses[size],
        className
      )}
      {...rest}
    >
      {children}
      {trailingArrow && (
        external || (rest.href && String(rest.href).startsWith("http"))
          ? <ArrowUpRight size={14} strokeWidth={1.75} />
          : <ArrowRight size={14} strokeWidth={1.75} />
      )}
    </As>
  );
});

export default Button;
