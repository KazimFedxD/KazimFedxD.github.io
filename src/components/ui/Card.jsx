// src/components/ui/Card.jsx
// Surface card. Flat carbon-1 fill, 1px rule border, no shadow at rest.
// Optional interactive variant: hover lift via 1px shadow, no transform.
// New: `raised` (static elevated tier) and `accent` (1px amber top border).

import { forwardRef } from "react";
import { cn } from "../../lib/cn";

const Card = forwardRef(function Card(
  {
    interactive = false,
    raised = false,
    accent = false,
    as: As = "div",
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
        "rounded-sm border border-rule bg-carbon-1",
        "transition-[box-shadow,border-color,background-color] duration-180 ease-out",
        // Elevated (static, always shows the lift)
        raised && "bg-carbon-2-5 shadow-lift",
        // Accent (1px amber top border) — can stack with raised or interactive
        accent && "border-t-amber/70",
        // Interactive (hover affordance)
        interactive &&
          "hover:border-terminal/60 hover:bg-carbon-2 hover:shadow-hover-lift " +
            "cursor-pointer focus-visible:outline-none focus-visible:ring-2 " +
            "focus-visible:ring-terminal focus-visible:ring-offset-2 focus-visible:ring-offset-carbon",
        className
      )}
      {...rest}
    >
      {children}
    </As>
  );
});

export function CardHeader({ className, children, ...rest }) {
  return (
    <div
      className={cn("px-5 pt-5 pb-3 flex items-start justify-between gap-3", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...rest }) {
  return (
    <div className={cn("px-5 pb-5", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...rest }) {
  return (
    <div
      className={cn("px-5 py-3 border-t border-rule", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
