// src/components/layout/ThemeToggle.jsx
// Sun/moon toggle. aria-label, aria-pressed, persists to localStorage.

import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/cn";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      className={cn(
        "fixed bottom-5 left-5 z-40 h-9 w-9 inline-flex items-center justify-center",
        "rounded-sm border border-rule bg-carbon-1 text-ink-2",
        "hover:border-terminal hover:text-terminal-1",
        "transition-colors duration-180 ease-out"
      )}
    >
      {isDark ? <Moon size={15} strokeWidth={1.75} /> : <Sun size={15} strokeWidth={1.75} />}
    </button>
  );
}
