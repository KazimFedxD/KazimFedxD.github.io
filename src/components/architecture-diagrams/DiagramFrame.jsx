// src/components/architecture-diagrams/DiagramFrame.jsx
// A consistent shell around every architecture diagram. Title, optional
// subtitle, 1px rule border, the diagram itself, and a small "scroll on
// mobile" hint when content overflows.

import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";

export default function DiagramFrame({ title, subtitle, children }) {
  const scrollerRef = useRef(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const check = () => setOverflow(el.scrollWidth > el.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <figure className="rounded-sm border border-rule overflow-hidden bg-carbon-1">
      {(title || subtitle) && (
        <figcaption className="px-4 py-2.5 border-b border-rule flex items-center justify-between gap-2 bg-carbon-2-5">
          <div>
            {title && (
              <div className="font-mono text-xs text-terminal-1 uppercase">
                {title}
              </div>
            )}
            {subtitle && (
              <div className="font-mono text-[10px] text-ink-3 mt-0.5">
                {subtitle}
              </div>
            )}
          </div>
          {overflow && (
            <span className="font-mono text-[10px] text-ink-3 inline-flex items-center gap-1">
              <ArrowLeftRight size={11} strokeWidth={1.75} />
              scroll
            </span>
          )}
        </figcaption>
      )}
      <div
        ref={scrollerRef}
        className="overflow-x-auto no-scrollbar"
      >
        <div className="min-w-fit min-h-[280px] p-4 md:p-6">
          {children}
        </div>
      </div>
    </figure>
  );
}
