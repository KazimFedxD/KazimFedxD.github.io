// src/components/ui/Tabs.jsx
// Horizontal scroll tab strip. Wheel-to-horizontal, arrow-key nav, active
// tab is a 1px terminal-green underline.

import { useEffect, useRef } from "react";
import { cn } from "../../lib/cn";

export default function Tabs({ items, value, onChange, className }) {
  const stripRef = useRef(null);

  // Wheel-to-horizontal scroll.
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Arrow-key navigation between tabs.
  const onKeyDown = (e) => {
    const idx = items.findIndex((it) => it.value === value);
    if (idx < 0) return;
    if (e.key === "ArrowRight") {
      const next = items[Math.min(items.length - 1, idx + 1)];
      onChange?.(next.value);
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      const prev = items[Math.max(0, idx - 1)];
      onChange?.(prev.value);
      e.preventDefault();
    } else if (e.key === "Home") {
      onChange?.(items[0].value);
      e.preventDefault();
    } else if (e.key === "End") {
      onChange?.(items[items.length - 1].value);
      e.preventDefault();
    }
  };

  return (
    <div
      ref={stripRef}
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={onKeyDown}
      className={cn(
        "relative flex items-stretch gap-1 overflow-x-auto no-scrollbar",
        "border-b border-rule",
        className
      )}
    >
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={`tabpanel-${it.value}`}
            id={`tab-${it.value}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange?.(it.value)}
            className={cn(
              "relative inline-flex items-center gap-1.5 px-3 py-2.5",
              "font-mono text-xs whitespace-nowrap shrink-0",
              "transition-colors duration-180 ease-out",
              "border-b-2 -mb-px",
              active
                ? "text-ink border-terminal"
                : "text-ink-2 border-transparent hover:text-ink"
            )}
          >
            {it.label}
            {it.count != null && (
              <span className="text-ink-3 text-[10px]">{it.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
