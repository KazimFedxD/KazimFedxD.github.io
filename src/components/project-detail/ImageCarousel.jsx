// src/components/project-detail/ImageCarousel.jsx
// Keyboard-navigable carousel. Prev/next buttons + monospace counter.

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageCarousel({ items, caption }) {
  const [i, setI] = useState(0);
  if (!items || items.length === 0) return null;
  const total = items.length;
  const goto = (n) => setI(((n % total) + total) % total);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goto(i - 1);
      else if (e.key === "ArrowRight") goto(i + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  const cur = items[i];
  return (
    <div className="rounded-sm border border-rule overflow-hidden bg-carbon-1">
      <div className="relative aspect-video bg-carbon-2">
        <img
          src={cur.src}
          alt={cur.alt || cur.caption || ""}
          className="w-full h-full object-contain"
        />
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => goto(i - 1)}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-sm bg-carbon/80 text-ink-2 hover:text-ink-1 border border-rule"
            >
              <ChevronLeft size={16} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => goto(i + 1)}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-sm bg-carbon/80 text-ink-2 hover:text-ink-1 border border-rule"
            >
              <ChevronRight size={16} strokeWidth={1.75} />
            </button>
          </>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-rule">
        <div className="font-mono text-xs text-ink-2 truncate">
          {caption || cur.caption || cur.alt}
        </div>
        <div className="font-mono text-xs text-ink-3 shrink-0">
          {i + 1}/{total}
        </div>
      </div>
    </div>
  );
}
