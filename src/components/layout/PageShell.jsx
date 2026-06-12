// src/components/layout/PageShell.jsx
// Vertical rhythm wrapper. Every page is wrapped in <PageShell> + <main>.
// Sections inside the page set their own breathing; PageShell sets the page
// rhythm: top padding under the fixed nav, horizontal max-width, a skip-to-
// content link, and a Section primitive for consistent vertical breathing.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "../../lib/cn";

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function PageShell({ children, className, padTop = true }) {
  return (
    <div
      className={cn(
        "mx-auto max-w-page px-5 md:px-8",
        // Fixed nav is h-14; 14 gives breathing room, 16 for the wide layout.
        padTop && "pt-14 md:pt-16",
        className
      )}
    >
      <a href="#main" className="skip-link">Skip to content</a>
      <main id="main" className="pb-16">
        {children}
      </main>
    </div>
  );
}

const DENSITY_CLASSES = {
  quiet:     "py-10 md:py-14",  // default
  tight:     "py-6 md:py-10",   // a denser beat (stat rows, socials)
  spacious:  "py-16 md:py-24",  // the hero moment, the resume CTA
};

export function Section({ children, className, as = "section", id, density = "quiet" }) {
  const Tag = as;
  return (
    <Tag id={id} className={cn(DENSITY_CLASSES[density] || DENSITY_CLASSES.quiet, className)}>
      {children}
    </Tag>
  );
}
