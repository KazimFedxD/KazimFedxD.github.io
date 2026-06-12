// src/pages/NotFound.jsx
// Terminal-style 404. The rest of the site routes through BrowserRouter,
// so this catches true 404s (bad URL, deep link to a renamed slug).

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Section } from "../components/layout/PageShell";

export default function NotFound() {
  return (
    <Section className="pt-12 md:pt-20 pb-12">
      <div className="font-mono text-xs text-ink-3 mb-3">
        <span className="text-terminal">$</span> cd /404
      </div>
      <h1 className="text-fluid-display font-semibold text-ink">
        Route not found
      </h1>
      <p className="mt-3 max-w-prose text-base text-ink-2 leading-relaxed">
        The path you requested doesn't exist. It may have been renamed, or the
        link is from an older version of this site.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-sm bg-terminal text-carbon hover:bg-terminal-1 transition-colors duration-180"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          Back to home
        </Link>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-sm border border-rule text-ink-1 hover:border-terminal hover:text-terminal-1 transition-colors duration-180"
        >
          Browse projects
        </Link>
      </div>
    </Section>
  );
}
