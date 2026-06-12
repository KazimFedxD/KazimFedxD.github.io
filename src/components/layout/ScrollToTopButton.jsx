// src/components/layout/ScrollToTopButton.jsx
// Floating "↑" button. Appears after 600px scroll. Carbon fill, 1px rule
// border, terminal-green hover. No glow, no shadow, no transform.

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "../../lib/cn";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-5 right-5 z-40 h-9 w-9 inline-flex items-center justify-center",
        "rounded-sm border border-rule bg-carbon-1 text-ink-2",
        "hover:border-terminal hover:text-terminal-1",
        "transition-all duration-180 ease-out",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <ArrowUp size={15} strokeWidth={1.75} />
    </button>
  );
}
