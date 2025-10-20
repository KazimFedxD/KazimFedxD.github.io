import React from 'react';
import {
  SiDjango,
  SiReact,
  SiPython,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiNginx,
  SiCelery,
  SiTailwindcss,
  SiFramer,
  SiJavascript,
  SiSqlite,
  SiDiscord,
  SiGithubpages,
  SiGithub
} from 'react-icons/si';

const techIconMap = {
  // Backend
  'Django': SiDjango,
  'Django REST Framework': SiDjango,
  'Django 5.2': SiDjango,
  'Python': SiPython,
  'Python 3.12': SiPython,
  'PostgreSQL': SiPostgresql,
  'SQLite': SiSqlite,
  'Redis': SiRedis,
  'Celery': SiCelery,
  'Nginx': SiNginx,
  
  // Frontend
  'React': SiReact,
  'React 19': SiReact,
  'Tailwind CSS': SiTailwindcss,
  'Framer Motion': SiFramer,
  'JavaScript': SiJavascript,
  
  // Tools & Other
  'Docker': SiDocker,
  'Discord.py': SiDiscord,
  'Discord.py 2.0': SiDiscord,
  'GitHub Pages': SiGithubpages,
  'discord.py': SiDiscord,
  'GitHub': SiGithub
};

const TechIcon = ({ name, className = '' }) => {
  const Icon = techIconMap[name];
  
  if (!Icon) {
    // Fallback to text if no icon found
    return (
      <span className={`px-3 py-1 bg-purple-900/50 border border-purple-500/30 rounded-full text-purple-200 text-xs font-medium ${className}`}>
        {name}
      </span>
    );
  }
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 bg-purple-900/50 border border-purple-500/30 rounded-full text-purple-200 text-xs font-medium ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      {name}
    </span>
  );
};

export default TechIcon;
