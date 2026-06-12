// src/components/layout/CommandPalette.jsx
// Cmd+K / Ctrl+K command palette. A small modal that lists every nav
// destination + 3 social links, with fuzzy filtering and full keyboard nav.
// Mounted once at the app root via the useCommandPalette context.

import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, CornerDownLeft, X, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "../../lib/cn";

const CommandPaletteContext = createContext({
  open: false,
  openPalette: () => {},
  closePalette: () => {},
});

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}

const NAV = [
  { kind: "page",   label: "Home",         path: "/" },
  { kind: "page",   label: "About",        path: "/about" },
  { kind: "page",   label: "Skills",       path: "/skills" },
  { kind: "page",   label: "Projects",     path: "/projects" },
  { kind: "page",   label: "Achievements", path: "/achievements" },
  { kind: "page",   label: "Experience",   path: "/experience" },
  { kind: "page",   label: "Education",    path: "/education" },
  { kind: "page",   label: "Contact",      path: "/contact" },
  { kind: "social", label: "GitHub",       path: "https://github.com/KazimFedxD", icon: Github },
  { kind: "social", label: "LinkedIn",     path: "https://www.linkedin.com/in/kazim-abbas-60b1b5257/", icon: Linkedin },
  { kind: "social", label: "Email",        path: "mailto:abbaskazim135@gmail.com", icon: Mail },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const openPalette = useCallback(() => {
    setQuery("");
    setActiveIdx(0);
    setOpen(true);
  }, []);
  const closePalette = useCallback(() => setOpen(false), []);

  // Global ⌘K / Ctrl+K listener.
  useEffect(() => {
    const onKey = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setActiveIdx(0);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Auto-focus the search input when opened.
  useEffect(() => {
    if (open && inputRef.current) {
      // Defer to the next frame so the dialog mounts.
      const t = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV;
    return NAV.filter((it) => it.label.toLowerCase().includes(q));
  }, [query]);

  // Keep active index in range when query changes.
  useEffect(() => {
    setActiveIdx((i) => Math.min(Math.max(0, i), Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  const go = (item) => {
    setOpen(false);
    if (!item) return;
    if (item.kind === "page") {
      navigate(item.path);
    } else {
      // External — open in a new tab.
      window.open(item.path, item.path.startsWith("http") ? "_blank" : "_self", "noreferrer");
    }
  };

  const onListKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(filtered[activeIdx]);
    }
  };

  return (
    <CommandPaletteContext.Provider value={{ open, openPalette, closePalette }}>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-carbon/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className="w-full max-w-md rounded-sm border border-rule bg-carbon-1 shadow-lift"
            onKeyDown={onListKey}
          >
            {/* Search input */}
            <div className="flex items-center gap-2 px-3 h-11 border-b border-rule">
              <Search size={14} strokeWidth={1.75} className="text-ink-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a page or social…"
                aria-label="Command palette query"
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-3 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-ink-3 hover:text-ink-1"
              >
                <X size={14} strokeWidth={1.75} />
              </button>
            </div>

            {/* Results */}
            <ul className="max-h-72 overflow-y-auto py-1" role="listbox">
              {filtered.length === 0 ? (
                <li className="px-3 py-3 text-sm text-ink-3 font-mono">
                  No results for "{query}"
                </li>
              ) : (
                filtered.map((it, i) => {
                  const Icon = it.icon || ArrowRight;
                  const isActive = i === activeIdx;
                  return (
                    <li key={`${it.kind}-${it.path}`} role="option" aria-selected={isActive}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIdx(i)}
                        onClick={() => go(it)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 h-9 text-left",
                          "transition-colors duration-120",
                          isActive ? "bg-carbon-2 text-ink" : "text-ink-1 hover:bg-carbon-2/50"
                        )}
                      >
                        <Icon size={14} strokeWidth={1.75} className="text-terminal-1 shrink-0" />
                        <span className="flex-1 text-sm">{it.label}</span>
                        {it.kind === "social" ? (
                          <span className="font-mono text-[10px] text-ink-3 uppercase">link</span>
                        ) : (
                          <span className="font-mono text-[10px] text-ink-3">{it.path}</span>
                        )}
                        {isActive && (
                          <CornerDownLeft size={12} strokeWidth={1.75} className="text-ink-3" />
                        )}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>

            {/* Footer hint */}
            <div className="flex items-center justify-between gap-3 px-3 h-8 border-t border-rule font-mono text-[10px] text-ink-3">
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span>esc close</span>
            </div>
          </div>
        </div>
      )}
    </CommandPaletteContext.Provider>
  );
}
