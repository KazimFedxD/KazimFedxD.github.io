// src/components/project-detail/ScreenshotWall.jsx
// Masonry grid of screenshots with captions + category labels. Click
// opens a top-positioned <dialog> (native HTML element) with the full
// image and arrow-key nav. The page stays scrollable past the dialog.
//
// Falls back to a simple <img> grid (no dialog) if the browser doesn't
// support HTMLDialogElement.

import { useEffect, useMemo, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { Section } from "../layout/PageShell";
import SectionHeader from "../ui/SectionHeader";
import { screenshotExists, SCREENSHOT_FOLDER } from "../../lib/screenshots";
import { slugify } from "../../lib/format";
import { Reveal } from "../../lib/motion";
import { cn } from "../../lib/cn";

function imgSrcFor(project, filename) {
  const folder = SCREENSHOT_FOLDER[project.title] || slugify(project.title);
  return `/screenshots/${folder}/${filename}`;
}

export default function ScreenshotWall({ project }) {
  const shots = useMemo(() => project.screenshots || [], [project.screenshots]);
  const [exists, setExists] = useState({});
  const [open, setOpen] = useState(null);
  const dialogRef = useRef(null);
  const supportsDialog =
    typeof window !== "undefined" && typeof window.HTMLDialogElement !== "undefined";

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      shots.map((s) => screenshotExists(imgSrcFor(project, s.filename)))
    ).then((results) => {
      if (cancelled) return;
      const next = {};
      shots.forEach((s, i) => (next[s.filename] = results[i]));
      setExists(next);
    });
    return () => {
      cancelled = true;
    };
  }, [project, shots]);

  useEffect(() => {
    if (!supportsDialog || !dialogRef.current) return;
    if (open !== null) {
      dialogRef.current.showModal?.();
    } else {
      dialogRef.current.close?.();
    }
  }, [open, supportsDialog]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowLeft") setOpen((i) => (i > 0 ? i - 1 : shots.length - 1));
      else if (e.key === "ArrowRight") setOpen((i) => (i < shots.length - 1 ? i + 1 : 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, shots.length]);

  if (shots.length === 0) return null;

  // Filter to only the ones that exist on disk.
  const visible = shots.filter((s) => exists[s.filename] !== false);
  if (visible.length === 0) return null;

  return (
    <Reveal as="section">
      <Section className="pt-10 md:pt-14 pb-2" id="screenshots">
        <SectionHeader
          eyebrow="screenshots"
          title="The system in action"
          kind="bold"
          hideRule
        />

        <div className="mt-8 max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((s, i) => (
            <button
              key={s.filename}
              type="button"
              onClick={() => setOpen(shots.indexOf(s))}
              className={cn(
                "group text-left border border-rule rounded-sm overflow-hidden bg-carbon-1",
                "transition-shadow duration-180 hover:shadow-lift",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-terminal"
              )}
            >
              <div className="aspect-video bg-carbon-2-5 overflow-hidden">
                <img
                  src={imgSrcFor(project, s.filename)}
                  alt={s.caption || s.filename}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-360 ease-out"
                />
              </div>
              <div className="p-3">
                {s.category && (
                  <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-terminal mb-1">
                    {s.category}
                  </div>
                )}
                {(s.caption || s.description) && (
                  <p className="text-sm text-ink-1 leading-snug">
                    {s.caption || s.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox — native <dialog>. Page remains scrollable past it. */}
        {supportsDialog && (
          <dialog
            ref={dialogRef}
            className="bg-transparent backdrop:bg-carbon/90 backdrop:backdrop-blur-sm p-0 m-0 max-w-none max-h-none w-full h-full"
            onClose={() => setOpen(null)}
            onClick={(e) => {
              // Click on backdrop area closes
              if (e.target === dialogRef.current) setOpen(null);
            }}
          >
            <div className="fixed inset-0 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-rule">
                <div className="font-mono text-xs text-ink-2">
                  {open !== null && ((shots[open] && shots[open].caption) || (shots[open] && shots[open].filename))}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="text-ink-2 hover:text-terminal-1 transition-colors"
                  aria-label="Close"
                >
                  <X size={18} strokeWidth={1.75} />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center p-4 relative">
                {open !== null && (
                  <>
                    <img
                      src={imgSrcFor(project, shots[open].filename)}
                      alt={shots[open].caption || shots[open].filename}
                      className="max-h-full max-w-full object-contain border border-rule"
                    />
                    {visible.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setOpen((i) => (i > 0 ? i - 1 : shots.length - 1))
                          }
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 border border-rule rounded-sm bg-carbon-1 text-ink-2 hover:text-terminal-1"
                          aria-label="Previous"
                        >
                          <ChevronLeft size={18} strokeWidth={1.75} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setOpen((i) => (i < shots.length - 1 ? i + 1 : 0))
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 border border-rule rounded-sm bg-carbon-1 text-ink-2 hover:text-terminal-1"
                          aria-label="Next"
                        >
                          <ChevronRight size={18} strokeWidth={1.75} />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
              {open !== null && visible.length > 1 && (
                <div className="p-3 border-t border-rule text-center">
                  <span className="font-mono text-xs text-ink-3">
                    {open + 1} / {visible.length}
                  </span>
                </div>
              )}
            </div>
          </dialog>
        )}
      </Section>
    </Reveal>
  );
}
