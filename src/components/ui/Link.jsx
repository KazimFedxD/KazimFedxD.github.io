// src/components/ui/Link.jsx
// Internal link (chevron) and external link (arrow-up-right). Always with
// terminal-green hover. Color is never the only affordance — the icon is.

import { Link as RouterLink } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";

export function InternalLink({ to, children, className, ...rest }) {
  return (
    <RouterLink
      to={to}
      className={cn(
        "inline-flex items-center gap-1.5 text-ink hover:text-terminal-1",
        "transition-colors duration-180 ease-out",
        className
      )}
      {...rest}
    >
      {children}
      <ChevronRight size={14} strokeWidth={1.75} />
    </RouterLink>
  );
}

export function ExternalLink({ href, children, className, ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 text-ink hover:text-terminal-1",
        "transition-colors duration-180 ease-out",
        className
      )}
      {...rest}
    >
      {children}
      <ArrowUpRight size={14} strokeWidth={1.75} />
    </a>
  );
}

export default ExternalLink;
