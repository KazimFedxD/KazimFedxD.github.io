// src/components/project-detail/ProjectBadges.jsx
// Chip row of badges.

import Chip from "../ui/Chip";

export default function ProjectBadges({ badges }) {
  if (!badges || badges.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((b, i) => (
        <Chip
          key={i}
          variant={i === 0 ? "solid" : "outline"}
          size="md"
        >
          {b.text || b}
        </Chip>
      ))}
    </div>
  );
}
