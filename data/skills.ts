export interface Skill {
  name: string
  /** Actual self-rated level - may exceed 100 (shown as label, bar capped at 100%) */
  level: number
}

export const SKILLS: Skill[] = [
  { name: "Python",           level: 100 },
  { name: "Git / GitHub",     level: 100 },
  { name: "Discord Bot Dev",  level: 100 },
  { name: "Cybersecurity",    level: 70  },
  { name: "JavaScript",       level: 70  },
  { name: "TypeScript",       level: 65  },
  { name: "Linux",            level: 65  },
  { name: "SQL",              level: 65  },
  { name: "C / C++",          level: 45  },
  { name: "Bash",             level: 40  },
  { name: "C#",               level: 20  },
]
