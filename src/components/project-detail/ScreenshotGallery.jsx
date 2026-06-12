// src/components/project-detail/ScreenshotGallery.jsx
// Grid of project screenshots. Click opens a modal lightbox.

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { cn } from "../../lib/cn";

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const it = items[index];
  if (!it) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={it.caption || it.alt || "Screenshot"}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/95"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        className="absolute top-4 right-4 p-2 text-ink-2 hover:text-ink-1"
      >
        <X size={18} strokeWidth={1.75} />
      </button>
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-ink-2 hover:text-ink-1"
          >
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-ink-2 hover:text-ink-1"
          >
            <ChevronRight size={20} strokeWidth={1.75} />
          </button>
        </>
      )}
      <figure
        className="max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={it.src}
          alt={it.alt || it.caption || ""}
          className="w-full h-auto rounded-sm border border-rule"
        />
        <figcaption className="mt-3 font-mono text-xs text-ink-3 text-center">
          {it.caption || it.alt}
          {items.length > 1 && (
            <> · <span className="text-ink-2">{index + 1}/{items.length}</span></>
          )}
        </figcaption>
      </figure>
    </div>
  );
}

export default function ScreenshotGallery({ screenshots }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  if (!screenshots || screenshots.length === 0) {
    return (
      <div className="rounded-sm border border-rule bg-carbon-1 p-6 text-center">
        <ImageIcon size={20} strokeWidth={1.75} className="mx-auto text-ink-3" />
        <p className="mt-2 text-sm text-ink-2">No screenshots yet.</p>
      </div>
    );
  }
  const goto = (i) => setIndex(((i % screenshots.length) + screenshots.length) % screenshots.length);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {screenshots.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setIndex(i); setOpen(true); }}
            className={cn(
              "group block text-left rounded-sm border border-rule bg-carbon-1 overflow-hidden",
              "hover:border-terminal/50 transition-[border-color] duration-180"
            )}
          >
            <div className="aspect-video bg-carbon-2 overflow-hidden">
              <img
                src={s.src}
                alt={s.alt || s.caption || ""}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-180"
              />
            </div>
            {(s.caption || s.alt) && (
              <div className="px-3 py-2 border-t border-rule">
                <div className="font-mono text-xs text-ink-2 truncate">
                  {s.caption || s.alt}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
      {open && (
        <Lightbox
          items={screenshots}
          index={index}
          onClose={() => setOpen(false)}
          onPrev={() => goto(index - 1)}
          onNext={() => goto(index + 1)}
        />
      )}
    </>
  );
}
