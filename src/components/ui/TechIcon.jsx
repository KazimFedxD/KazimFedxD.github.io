// src/components/ui/TechIcon.jsx
// Maps a tech label to a Simple Icon. Falls back to a plain monospace tag.

import { SiDjango, SiPython, SiJavascript, SiPostgresql, SiSqlite, SiRedis, SiDocker, SiNginx, SiTailwindcss, SiReact, SiGithub, SiCplusplus, SiC, SiGit, SiLinux, SiOpenai, SiCelery, SiNodedotjs, SiGnubash } from "react-icons/si";
import { cn } from "../../lib/cn";

const ICON_MAP = {
  "Django": SiDjango,
  "Django REST Framework": SiDjango,
  "Python": SiPython,
  "JavaScript": SiJavascript,
  "C++": SiCplusplus,
  "C": SiC,
  "SQL": SiPostgresql,
  "Bash": SiGnubash,
  "PostgreSQL": SiPostgresql,
  "SQLite": SiSqlite,
  "Redis": SiRedis,
  "Docker": SiDocker,
  "Nginx": SiNginx,
  "Celery": SiCelery,
  "Tailwind CSS": SiTailwindcss,
  "React": SiReact,
  "Git": SiGit,
  "GitHub": SiGithub,
  "Linux": SiLinux,
  "OpenAI": SiOpenai,
  "Groq AI": SiOpenai,
  "Groq": SiOpenai,
  "WebSockets": SiNodedotjs,
  "Django Channels": SiDjango,
};

export default function TechIcon({ tech, name, size = "md", className, showIcon = true }) {
  const Icon = ICON_MAP[name || tech];
  const sizes = {
    sm: { box: "h-6 px-2 text-[11px]", icon: 12 },
    md: { box: "h-7 px-2.5 text-xs",     icon: 14 },
    lg: { box: "h-8 px-3 text-sm",       icon: 16 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm font-mono whitespace-nowrap",
        "bg-carbon-1 text-ink-2 border border-rule",
        s.box,
        className
      )}
    >
      {showIcon && Icon ? (
        <Icon size={s.icon} className="text-terminal-1 shrink-0" aria-hidden="true" />
      ) : null}
      <span>{name || tech}</span>
    </span>
  );
}
