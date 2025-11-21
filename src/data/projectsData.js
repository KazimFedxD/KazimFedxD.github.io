// ========================================
// PROJECTS DATA
// Total Featured Projects: 11
// ========================================
// 
// ORDERING SYSTEM:
// ----------------
// Positive numbers: 1, 2, 3, ... (first, second, third, ...)
// Negative numbers: -1, -2, -3, ... (last, second last, third last, ...)
// 
// Examples:
//   order: 1   → First position
//   order: 2   → Second position
//   order: -1  → Last position
//   order: -2  → Second last position
// 
// To reorder projects, simply change the 'order' number.
// Projects will be displayed in ascending order.
// 
// ========================================

export const projectsData = [
  // ============================================================
  // ORDER 1: TOP PROJECT - NASA WINNER
  // ============================================================
  {
    order: 2,
    title: 'Skyntel',
    badge: '🏆 2nd Place - NASA Space Apps Challenge 2025',
    description: 'Interactive weather app with AI query support, personalized alerts, daily email subscriptions, and live weather reports from users.',
    tech: ['Django REST Framework', 'Celery', 'PostgreSQL', 'Redis', 'Docker', 'Nginx', 'Groq AI'],
    github: 'https://github.com/KazimFedxD/Skyntel',
    features: [
      'AI-powered weather queries using Groq AI',
      'Personalized weather alerts and notifications',
      'Daily email subscriptions with weather updates',
      'Live weather reports from community users',
      'Backend powered by Django REST Framework with Celery automation',
      'Deployed using Docker and Nginx reverse proxy'
    ]
  },

  // ============================================================
  // ORDER 2: CURRENT WORKING PROJECT
  // ============================================================
  {
    order: 1,
    title: 'FinCore',
    badge: '🚧 In Development',
    description: 'Personal finance and Islamic wealth management system for tracking income, expenses, and assets with Khums and Zakat calculations.',
    tech: ['Django 5.2', 'React 19', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'Tailwind CSS'],
    github: 'https://github.com/KazimFedxD/FinCore',
    features: [
      'Income and expense tracking with categories',
      'Islamic finance integration (Khums & Zakat)',
      'Real-time financial reports and analytics',
      'Category management with parent/child hierarchy',
      'JWT authentication with Celery task queue',
      'Dockerized full-stack architecture'
    ]
  },

  // ============================================================
  // ORDER 3: FxDC - DATA CONTAINER
  // ============================================================
  {
    order: 3,
    title: 'FedxD Data Container (FxDC)',
    description: 'Open-source Python library that converts Python objects into a readable .fxdc format and restores them to their original classes.',
    tech: ['Python', 'Lexer', 'Parser', 'Custom Object System', 'Decorators'],
    github: 'https://github.com/KazimFedxD/FedxD-Data-Container',
    features: [
      'Custom lexer and parser implementation',
      'Converts Python objects to .fxdc format',
      'Restores objects to original classes',
      'Support for user-defined classes with decorators',
      'Built entirely with core Python'
    ]
  },

  // ============================================================
  // ORDER 4: FxPy - PROGRAMMING LANGUAGE
  // ============================================================
  {
    order: 4,
    title: 'FxPy',
    description: 'Custom dynamically-typed, interpreted programming language with Python-like syntax, featuring functions, control flow, and imports.',
    tech: ['Python', 'Lexer', 'Parser', 'Interpreter', 'AST'],
    github: 'https://github.com/KazimFedxD/FxPy',
    features: [
      'Custom lexer and parser implementation',
      'Support for functions with variadic arguments',
      'Control flow (if/elif/else, for, while)',
      'Data types (numbers, strings, lists, dictionaries)',
      'Interactive REPL and file execution',
      'Built-in functions and operations'
    ]
  },

  // ============================================================
  // ORDER 5: FeXoBot - DISCORD BOT
  // ============================================================
  {
    order: 7,
    title: 'FeXoBot',
    description: 'Feature-rich Discord bot with moderation, games, utilities, API integrations, leveling system, and support tickets.',
    tech: ['Python 3.12', 'Discord.py 2.0', 'SQLite', 'Celery', 'Multiple APIs'],
    github: 'https://github.com/KazimFedxD/FeXoBot',
    features: [
      'Comprehensive moderation tools (warnings, bans, mutes)',
      'Multiple games (Hangman, Tic-Tac-Toe, Pokémon, Trivia)',
      'Advanced leveling system with role rewards',
      'Support ticket system with transcripts',
      'API integrations (NASA, ChatGPT, PokeAPI)',
      'Advanced math calculator and utilities'
    ]
  },

  // ============================================================
  // ORDER 6: FxQuest - DISCORD GAMING BOT
  // ============================================================
  {
    order: 8,
    title: 'FxQuest',
    description: 'Advanced Discord gaming bot with economy system, Minecraft-inspired mining, interactive games, and comprehensive leveling mechanics.',
    tech: ['Python 3.12', 'Discord.py 2.0', 'SQLite', 'PyPokerEngine', 'Discord UI'],
    github: 'https://github.com/KazimFedxD/FxQuest',
    features: [
      '8+ interactive games (UNO, Poker, Blackjack, Hangman)',
      'Economy system with virtual currency',
      'Minecraft mining and crafting mechanics',
      'Gambling commands (Coinflip, Dice)',
      'Automated chat games with rewards',
      'Advanced XP and leveling system'
    ]
  },

  // ============================================================
  // ORDER 7: PORTFOLIO WEBSITE (META PROJECT)
  // ============================================================
  {
    order: 6,
    title: 'Portfolio Website',
    badge: '🎨 This Website',
    description: 'Modern, responsive portfolio website built with React 19, Tailwind CSS, and Framer Motion showcasing award-winning projects and professional experience.',
    tech: ['React 19', 'Tailwind CSS', 'Framer Motion', 'EmailJS', 'React Router', 'GitHub Pages'],
    github: 'https://github.com/KazimFedxD/KazimFedxD.github.io',
    features: [
      'Modern SPA with smooth page transitions',
      'Dynamic project showcase with detailed pages',
      'Interactive contact form with EmailJS',
      'GitHub stats integration with live data',
      'Responsive mobile-first design',
      'Custom animation system with 60 FPS performance'
    ]
  },

  // ============================================================
  // ORDER 8: FULL-STACK TEMPLATE
  // ============================================================
  {
    order: 5,
    title: 'Full-Stack Template',
    description: 'Production-ready full-stack template with Django REST Framework backend and React frontend, featuring JWT auth and Docker deployment.',
    tech: ['Django 5.2', 'React 19', 'PostgreSQL', 'Redis', 'Nginx', 'Docker', 'Celery'],
    github: 'https://github.com/KazimFedxD/FullStack-Template',
    features: [
      'JWT authentication with refresh tokens',
      'Email verification system with templates',
      'Celery task queue for async operations',
      'Docker Compose for easy deployment',
      'Nginx reverse proxy configuration',
      'Production and development environments'
    ]
  },

  // ============================================================
  // ORDER 9: FedxD-PiPy - PYTHON PACKAGE
  // ============================================================
  {
    order: -1,
    title: 'FedxD-PiPy',
    description: 'Quality of life Python package providing converters, utilities, and integrations for openpyxl, discord.py, and pygame.',
    tech: ['Python', 'openpyxl', 'discord.py', 'pygame'],
    github: 'https://github.com/KazimFedxD/FedxD-pypackage',
    features: [
      'Color converters (RGB, Hex)',
      'Unit converters (time, temperature, weight, length)',
      'Excel utilities (cell formatting, protection)',
      'Discord.py helpers (swear detection)',
      'Pygame utilities (collision, rendering)',
      'Random generators (dates, names, facts)'
    ]
  },

  // ============================================================
  // ORDER 10: FxChange - CRYPTO/STOCK EXCHANGE
  // ============================================================
  {
    order: 9,
    title: 'FxChange',
    description: 'Demo stock and crypto exchange where users can trade with virtual currency, track portfolios, and grow their profiles.',
    tech: ['Django', 'SQLite', 'JavaScript', 'External APIs', 'Email Verification'],
    github: 'https://github.com/KazimFedxD',
    features: [
      'Virtual currency trading for stocks and crypto',
      'Portfolio tracking and profile growth system',
      'Custom admin panels for management',
      'Live graphs with real-time data',
      'Secure email verification',
      'API integrations for market data'
    ]
  },

  // ============================================================
  // ORDER 11: Webstore - E-COMMERCE PLATFORM
  // ============================================================
  {
    order: 10,
    title: 'Webstore',
    description: 'Complete e-commerce platform featuring inventory control, discounts, carts, and checkout systems with real-time calculations.',
    tech: ['Django', 'SQLite', 'JavaScript', 'Admin Panels', 'Email Verification'],
    github: 'https://github.com/KazimFedxD',
    features: [
      'Inventory control and management',
      'Discount system and cart functionality',
      'Checkout with real-time calculations',
      'Custom admin panels',
      'Email verification for security',
      'Search system for smooth UX'
    ]
  }
];

// Helper function to get sorted projects
// Supports negative indexing: -1 = last, -2 = second last, etc.
export const getSortedProjects = () => {
  const totalProjects = projectsData.length;
  
  return [...projectsData].sort((a, b) => {
    // Convert negative indices to positive
    const orderA = a.order < 0 ? totalProjects + a.order + 1 : a.order;
    const orderB = b.order < 0 ? totalProjects + b.order + 1 : b.order;
    
    return orderA - orderB;
  });
};

// Helper function to get total project count
export const getTotalProjects = () => {
  return projectsData.length;
};

// Get featured projects label
export const getFeaturedLabel = () => {
  return `${getTotalProjects()} Featured Projects`;
};

// Track which projects have detailed data files
// Add project titles here when you create their data files
export const projectsWithDetails = [
  'Full-Stack Template',
  'FedxD Data Container (FxDC)',
  'FxPy',
  'FeXoBot',
  'FxQuest',
  'Portfolio Website',
  // Add more project names as you create their data files
  // Example: 'Skyntel', 'FinCore', etc.
];

// Helper to check if a project has detailed data
export const hasProjectDetails = (projectTitle) => {
  return projectsWithDetails.includes(projectTitle);
};
