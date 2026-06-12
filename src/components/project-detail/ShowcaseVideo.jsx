// src/components/project-detail/ShowcaseVideo.jsx
// YouTube embed with a terminal-style title above.

import { Play } from "lucide-react";
import { youtubeId } from "../../lib/format";

export default function ShowcaseVideo({ video }) {
  if (!video) return null;
  const url = video.url || video;
  const id = youtubeId(url);
  if (!id) return null;
  return (
    <figure className="rounded-sm border border-rule overflow-hidden bg-carbon-1">
      <div className="px-4 py-3 border-b border-rule flex items-center gap-2">
        <Play size={14} strokeWidth={1.75} className="text-terminal" aria-hidden="true" />
        <div className="font-mono text-xs text-ink-2">
          {video.title || "Showcase video"}
          {video.duration && (
            <span className="text-ink-3 ml-2">· {video.duration}</span>
          )}
        </div>
      </div>
      <div className="aspect-video bg-carbon-2">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={video.title || "Showcase video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          loading="lazy"
        />
      </div>
      {video.description && (
        <figcaption className="px-4 py-3 text-sm text-ink-2 border-t border-rule">
          {video.description}
        </figcaption>
      )}
    </figure>
  );
}
