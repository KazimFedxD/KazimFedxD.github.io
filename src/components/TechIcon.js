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

const TechIcon = ({ tech, name, size = 'md', className = '' }) => {
  const techName = tech || name;
  const Icon = techIconMap[techName];
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm'
  };
  
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4'
  };
  
  if (!Icon) {
    // Fallback to text if no icon found
    return (
      <span className={`bg-purple-900/40 border border-purple-500/30 rounded-full text-purple-200 font-medium hover:bg-purple-800/50 hover:border-purple-400/50 transition-all duration-300 ${sizeClasses[size]} ${className}`}>
        {techName}
      </span>
    );
  }
  
  return (
    <span className={`inline-flex items-center gap-2 bg-purple-900/40 border border-purple-500/30 rounded-full text-purple-200 font-medium hover:bg-purple-800/50 hover:border-purple-400/50 transition-all duration-300 ${sizeClasses[size]} ${className}`}>
      <Icon className={iconSizes[size]} />
      {techName}
    </span>
  );
};

export default TechIcon;
