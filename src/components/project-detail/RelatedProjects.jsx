// src/components/project-detail/RelatedProjects.jsx
// 2–3 link cards to other project pages.

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { slugify } from "../../lib/format";

export default function RelatedProjects({ related }) {
  if (!related || related.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {related.map((r, i) => {
        const title = r.title || r;
        const slug = slugify(title);
        return (
          <Link
            key={i}
            to={`/projects/${slug}`}
            className="block rounded-sm border border-rule bg-carbon-1 p-4 hover:border-terminal/50 hover:bg-carbon-2 transition-[border-color,background-color] duration-180"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-ink-3 uppercase">Related</span>
              <ArrowRight size={14} strokeWidth={1.75} className="text-ink-3" />
            </div>
            <div className="mt-2 text-base font-medium text-ink">{title}</div>
            {r.description && (
              <p className="mt-1 text-sm text-ink-2 leading-relaxed">{r.description}</p>
            )}
          </Link>
        );
      })}
    </div>
  );
}
