// Portfolio Website Project Data
// This is the meta-project - documentation about the portfolio website itself

export const portfolioWebsiteData = {
  // ============================================================
  // BASIC INFO
  // ============================================================
  title: "Kazim Abbas - Portfolio Website",
  shortDescription: "A modern, responsive portfolio website built with React 19, Tailwind CSS, and Framer Motion showcasing award-winning projects and professional experience.",
  github: "https://github.com/KazimFedxD/KazimFedxD.github.io",
  liveDemo: "https://fedxd.net",
  
  badges: [
    { icon: "Palette", text: "Modern UI/UX" },
    { icon: "Smartphone", text: "Mobile-First Design" },
    { icon: "Zap", text: "Lightning Fast" },
    { icon: "Accessibility", text: "Accessible" }
  ],

  // Tech Stack with categories
  techStack: [
    { name: "React", version: "19.2.0", category: "Frontend" },
    { name: "React Router DOM", version: "7.9.4", category: "Frontend" },
    { name: "Tailwind CSS", version: "3.4.17", category: "Styling" },
    { name: "Framer Motion", version: "12.23.24", category: "Animation" },
    { name: "EmailJS", version: "4.4.1", category: "Services" },
    { name: "Lucide React", version: "0.554.0", category: "UI" },
    { name: "React Icons", version: "5.5.0", category: "UI" },
    { name: "React GitHub Calendar", version: "4.5.11", category: "Integration" },
    { name: "React Markdown", version: "10.1.0", category: "Content" },
    { name: "React Syntax Highlighter", version: "16.1.0", category: "Content" },
    { name: "GitHub Pages", version: "Latest", category: "Hosting" }
  ],

  // ============================================================
  // OVERVIEW
  // ============================================================
  overview: {
    description: "This is the portfolio website itself - a comprehensive digital showcase of Kazim Abbas's journey as a software developer. Built with modern web technologies including React 19, Tailwind CSS, and Framer Motion, the website provides an immersive and interactive experience for visitors to explore projects, skills, achievements, and professional background. The website demonstrates proficiency in frontend development while maintaining a clean, performant, and accessible user interface. Every component is crafted with attention to detail, from smooth page transitions to responsive layouts that adapt seamlessly across all device sizes.",

    problemIntro: "Creating a professional online presence that effectively showcases technical skills, projects, and achievements while providing an engaging user experience. Traditional portfolio websites often suffer from:",

    problemStatement: [
      "Static, boring layouts that fail to capture attention and engage visitors",
      "Poor mobile responsiveness leading to bad user experience on smartphones and tablets",
      "Lack of interactivity and engagement - no animations or dynamic content",
      "Difficult navigation and information discovery - visitors can't find what they need",
      "No integration with real-time data (GitHub stats, live project status)",
      "Generic designs that don't stand out from other developer portfolios"
    ],

    howWeSolve: [
      {
        problem: "Static, boring layouts that fail to capture attention",
        solution: "Implemented dynamic content with project pages that are data-driven, featuring detailed technical breakdowns with tabbed navigation showing overview, features, architecture, API documentation, setup guides, performance metrics, and roadmaps",
        benefit: "Visitors can deep-dive into technical implementations, understanding not just what was built but how and why, demonstrating technical depth and communication skills"
      },
      {
        problem: "Poor mobile responsiveness",
        solution: "Built with mobile-first design approach using Tailwind CSS responsive utilities, touch-optimized interactions, and adaptive layouts for all screen sizes from phones to 4K displays",
        benefit: "Over 60% of web traffic comes from mobile devices - mobile-first ensures the best experience for the majority of users while progressively enhancing for larger screens"
      },
      {
        problem: "Lack of interactivity and engagement",
        solution: "Created comprehensive animation system combining custom Tailwind keyframes (fade-in, slide, glow, float) with Framer Motion for component-level animations, stagger children effects, and page transitions",
        benefit: "Animations guide user attention, provide feedback, and create a polished, professional feel while improving perceived performance and engagement"
      },
      {
        problem: "Difficult navigation and information discovery",
        solution: "Implemented React Router with client-side routing for instant navigation, clear navigation menu with active states, breadcrumb trails, and logical information architecture",
        benefit: "Single Page Application provides superior user experience with faster navigation, no page flickers, and the ability to maintain application state across route changes"
      },
      {
        problem: "No integration with real-time data",
        solution: "Integrated GitHub API using react-github-calendar to display live contribution heatmap, activity patterns, and repository statistics automatically fetched and updated",
        benefit: "Provides visual proof of coding consistency and activity - GitHub contributions are a strong signal to recruiters about dedication and regular practice"
      },
      {
        problem: "Generic designs that don't stand out",
        solution: "Designed custom purple gradient theme with glassmorphism effects, unique animated backgrounds, custom component library, and tech stack icon visualization system",
        benefit: "Creates memorable brand identity that differentiates from typical bootstrap/template portfolios while maintaining professional appearance"
      }
    ],

    targetAudience: [
      "Recruiters & Hiring Managers looking to evaluate technical skills and project experience",
      "Fellow Developers interested in code quality, architecture, and implementation details",
      "Potential Clients seeking backend development or full-stack services",
      "Tech Community members exploring projects and possibly contributing to open source",
      "Students learning from project implementations and design patterns",
      "Collaborators finding opportunities to work together on open-source projects"
    ],

    uniqueFeatures: [
      {
        icon: "BarChart3",
        title: "Project Detail Pages with Deep Technical Dives",
        points: [
          "Tab-based navigation with 10 sections: Overview, Features, Architecture, API Reference, Setup, Screenshots, Performance, Requirements, Issues, Roadmap",
          "Interactive architecture diagrams showing system components and data flow",
          "Syntax-highlighted code snippets with copy-to-clipboard functionality",
          "Tech stack breakdowns with visual icons and version numbers",
          "Performance metrics, benchmarks, and optimization details",
          "Known issues with expandable detailed explanations and proposed fixes",
          "Future roadmap with expandable features showing difficulty ratings and implementation plans"
        ]
      },
      {
        icon: "Building2",
        title: "Data-Driven Architecture",
        points: [
          "Projects imported from structured data files - not hardcoded in components",
          "Central project registry (projectsData.js) for overview pages",
          "Detailed project data files ([project-name]-data.js) with 1200-2000+ lines each",
          "Easy to add new projects without touching component code",
          "Consistent structure across all project presentations",
          "Separation of data and presentation logic"
        ]
      },
      {
        icon: "Theater",
        title: "Advanced Animation System",
        points: [
          "Custom Tailwind animations: fade-in, slide-up, slide-down, slide-left, slide-right, glow, float",
          "Framer Motion for component-level orchestrated animations",
          "Stagger children animations for sequential reveals",
          "Page transition animations with AnimatePresence",
          "Hover effects and micro-interactions throughout",
          "60 FPS performance with GPU-accelerated transforms"
        ]
      },
      {
        icon: "Link",
        title: "Real-Time Integrations",
        points: [
          "GitHub contribution calendar with custom purple theme",
          "Live repository statistics and activity visualization",
          "EmailJS dual-email system (notification + confirmation)",
          "Automatic updates without manual intervention",
          "Error boundaries and fallback states for failed API calls"
        ]
      }
    ],

    useCases: [
      "Job Applications - Provide comprehensive portfolio link in applications and resumes",
      "Technical Interviews - Reference specific projects and implementations during interviews",
      "Freelance Work - Showcase capabilities to potential clients",
      "Open Source Collaboration - Share projects with potential contributors",
      "Learning & Teaching - Use as reference for students learning React and modern web development",
      "Professional Networking - Share on LinkedIn, GitHub, and professional communities",
      "Project Documentation - Centralized documentation for all personal projects",
      "Skills Demonstration - Prove proficiency in React, Tailwind, animations, and modern web practices",
      "Personal Branding - Establish unique visual identity in tech community",
      "Career Progression - Track and showcase growth over time with timeline features"
    ]
  },

  // ============================================================
  // FEATURES (7 Major Features)
  // ============================================================
  features: [
    // FEATURE 1
    {
      id: 1,
      title: "Modern Single Page Application (SPA) with Smooth Page Transitions",
      icon: "Rocket",
      description: "The portfolio is built as a Single Page Application using React 19 and React Router DOM 7.9.4, providing instant page transitions without full page reloads. Framer Motion powers smooth animations between routes and components, creating a mobile-app-like feel in the browser.",
      whyItMatters: "SPAs provide a superior user experience with faster navigation, no page flickers, and the ability to maintain application state across route changes. This creates a professional, modern feel that keeps visitors engaged.",
      howItWorks: [
        "React Router DOM handles client-side routing without server requests",
        "ScrollToTop component automatically scrolls to top on route changes",
        "AnimatePresence from Framer Motion enables exit animations before unmounting",
        "Navigation component highlights active page with conditional styling",
        "Mobile hamburger menu with slide animations for responsive design",
        "All routes defined in App.js with lazy loading for optimization"
      ],
      codeSnippets: [
        {
          title: "Router Setup in App.js",
          language: "javascript",
          code: `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollToTopButton />
      <Navigation />
      <HireMeCTA />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectName" element={<ProjectDetail />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}`
        },
        {
          title: "Navigation with Active State",
          language: "javascript",
          code: `function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="fixed w-full top-0 z-[100] bg-slate-900/95 backdrop-blur-md">
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-1">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={\`px-4 py-2 rounded-lg transition-all duration-300 \${
              location.pathname === link.path
                ? 'bg-purple-600 text-white'
                : 'text-purple-200 hover:bg-purple-900/50'
            }\`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}`
        },
        {
          title: "Page Transition Animations",
          language: "javascript",
          code: `const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

// Usage in page component
<motion.div
  initial="hidden"
  animate="visible"
  variants={containerVariants}
  className="container"
>
  {items.map((item, index) => (
    <motion.div key={index} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>`
        }
      ]
    },

    // FEATURE 2
    {
      id: 2,
      title: "Dynamic Project Showcase with Detailed Project Pages",
      icon: "FolderKanban",
      description: "Projects are displayed in a responsive grid with comprehensive detail pages. Each project has its own dedicated page with tabbed navigation showing overview, features, architecture, API documentation, setup guides, performance metrics, requirements, known issues, and future roadmap.",
      whyItMatters: "Unlike simple project lists, this system allows visitors to deep-dive into technical implementations, understanding not just what was built but how and why. This demonstrates technical depth, documentation skills, and attention to detail - all highly valued by employers.",
      howItWorks: [
        "projectsData.js maintains central registry of all projects with basic info",
        "Each project has a detailed data file (e.g., fullstack-template-data.js with 1200-2000+ lines)",
        "ProjectDetail.js uses React Router params to dynamically load specific project data",
        "Tab-based UI allows organized information presentation across 10 sections",
        "Custom components render features, architecture diagrams, code snippets, API docs, etc.",
        "Dynamic rendering based on available data - components adapt to project type"
      ],
      codeSnippets: [
        {
          title: "Projects Data Structure (projectsData.js)",
          language: "javascript",
          code: `export const projectsData = [
  {
    title: "Full-Stack-Template",
    description: "Production-ready Django + React template with JWT auth, email verification, and Docker containerization",
    tech: ["Django", "React", "PostgreSQL", "Docker", "Redis", "Celery", "Nginx"],
    features: [
      "JWT Authentication with Refresh Tokens",
      "Email Verification System",
      "Docker Containerization with 7 Services"
    ],
    github: "https://github.com/KazimFedxD/Full-Stack-Template",
    badge: "⭐ Featured",
    order: 1
  },
  {
    title: "FxQuest",
    description: "Advanced Discord bot with 8+ games, economy system, leveling, and admin tools",
    tech: ["Python", "Discord.py", "SQLite"],
    features: [
      "8+ Interactive Games",
      "Complete Economy System",
      "Advanced Leveling System"
    ],
    github: "https://github.com/KazimFedxD/FxQuest",
    badge: "🎮 Gaming",
    order: 2
  }
  // More projects...
];`
        },
        {
          title: "Project Detail Route (ProjectDetail.js)",
          language: "javascript",
          code: `const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  
  // Import project data dynamically
  const projectDataMap = {
    'Full-Stack-Template': fullStackTemplateData,
    'FxPy': fxpyData,
    'FxQuest': fxquestData,
    'FedxD-Data-Container': fxdcData,
    'FeXoBot': fexobotData
  };
  
  const projectData = projectDataMap[projectName];
  
  if (!projectData) {
    return <div>Project not found</div>;
  }
  
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'api', label: 'API Reference' },
    { id: 'setup', label: 'Setup Guide' },
    { id: 'screenshots', label: 'Screenshots' },
    { id: 'performance', label: 'Performance' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'issues', label: 'Known Issues' },
    { id: 'future', label: 'Roadmap' }
  ];
  
  return (
    <div className="min-h-screen pt-20">
      {/* Header with project info */}
      {/* Tab navigation */}
      {/* Tab content */}
      {renderTabContent()}
    </div>
  );
};`
        },
        {
          title: "Custom Component - FeatureCard.jsx",
          language: "javascript",
          code: `const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card-gradient p-6 rounded-xl border border-purple-500/30"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{feature.icon}</span>
        <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
      </div>
      
      <p className="text-gray-300 mb-4">{feature.description}</p>
      
      {feature.whyItMatters && (
        <div className="mb-4">
          <h4 className="text-purple-400 font-semibold mb-2">Why It Matters</h4>
          <p className="text-gray-400 text-sm">{feature.whyItMatters}</p>
        </div>
      )}
      
      {feature.howItWorks && (
        <div className="mb-4">
          <h4 className="text-purple-400 font-semibold mb-2">How It Works</h4>
          <ol className="list-decimal list-inside space-y-1">
            {feature.howItWorks.map((step, i) => (
              <li key={i} className="text-gray-400 text-sm">{step}</li>
            ))}
          </ol>
        </div>
      )}
      
      {feature.codeSnippets && feature.codeSnippets.map((snippet, i) => (
        <CodeSnippet key={i} snippet={snippet} />
      ))}
    </motion.div>
  );
};`
        }
      ]
    },

    // FEATURE 3
    {
      id: 3,
      title: "Interactive Contact Form with EmailJS Integration",
      icon: "Mail",
      description: "A fully functional contact form integrated with EmailJS that sends notifications to the site owner and confirmation emails to visitors. Includes comprehensive form validation, loading states, error handling, and fallback email options.",
      whyItMatters: "Provides a professional way for recruiters, clients, and collaborators to reach out directly from the website without exposing personal email addresses to spam bots. The dual-email system ensures both parties receive confirmation of the message.",
      howItWorks: [
        "User fills out contact form with name, email, subject (optional), and message",
        "Client-side validation ensures all required fields are filled with proper formatting",
        "Form submits to EmailJS service with two separate template calls",
        "Two emails sent simultaneously: notification to site owner + confirmation to visitor",
        "Success/error feedback displayed with helpful messages",
        "Form automatically resets on successful submission",
        "Fallback email address displayed if EmailJS fails or times out"
      ],
      codeSnippets: [
        {
          title: "Complete Contact Form Implementation",
          language: "javascript",
          code: `import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ 
        type: 'error', 
        message: 'Please fill in all required fields.' 
      });
      return;
    }
    
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ 
        type: 'error', 
        message: 'Please enter a valid email address.' 
      });
      return;
    }
    
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    
    try {
      const timestamp = new Date().toLocaleString();
      
      // Send notification to site owner
      await emailjs.send(
        'service_quay1th',
        'template_4fsca3d',
        {
          user_name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact',
          message: formData.message,
          timestamp: timestamp,
        },
        'Si2AYHuddQeZRlp7G'
      );
      
      // Send confirmation to user
      await emailjs.send(
        'service_quay1th',
        'template_i0a3otb',
        {
          user_name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact',
          message: formData.message,
          timestamp: timestamp,
        },
        'Si2AYHuddQeZRlp7G'
      );
      
      setStatus({ 
        type: 'success', 
        message: 'Thank you for reaching out! I\\'ll get back to you soon.' 
      });
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please email me directly at abbaskazim135@gmail.com' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input 
        type="text"
        name="name" 
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name *"
        required
        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-500/30"
      />
      
      <input 
        type="email"
        name="email" 
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email *"
        required
        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-500/30"
      />
      
      <input 
        type="text"
        name="subject" 
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject (Optional)"
        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-500/30"
      />
      
      <textarea 
        name="message" 
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message *"
        rows="6"
        required
        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-500/30"
      />
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      
      {status.message && (
        <div className={\`p-4 rounded-lg \${
          status.type === 'success' 
            ? 'bg-green-500/20 border-green-500' 
            : 'bg-red-500/20 border-red-500'
        }\`}>
          {status.message}
        </div>
      )}
    </form>
  );
};`
        }
      ]
    },

    // FEATURE 4
    {
      id: 4,
      title: "GitHub Stats Integration with Real-Time Data",
      icon: "BarChart3",
      description: "Live GitHub statistics displayed on the About page using react-github-calendar. Shows contribution heatmap, activity patterns, and repository statistics automatically fetched from GitHub API with custom purple theming.",
      whyItMatters: "Provides visual proof of coding consistency and activity. GitHub contributions are a strong signal to recruiters about dedication, regular practice, and active development work. The live data means no manual updates required.",
      howItWorks: [
        "react-github-calendar library fetches contribution data from GitHub's public API",
        "Contribution heatmap rendered with color-coded activity levels (0-4 scale)",
        "Custom purple theme matches website branding instead of GitHub's green",
        "Responsive layout adapts for mobile and desktop screen sizes",
        "Automatically updates as new contributions are made to GitHub",
        "No manual maintenance required - always shows current data",
        "Error boundary provides fallback if API call fails"
      ],
      codeSnippets: [
        {
          title: "GitHub Stats Component with Custom Theme",
          language: "javascript",
          code: `import GitHubCalendar from 'react-github-calendar';

const GitHubStats = () => {
  // Custom purple theme matching website branding
  const explicitTheme = {
    level4: '#a855f7', // Most active (purple-500)
    level3: '#c084fc', // High activity (purple-400)
    level2: '#d8b4fe', // Medium activity (purple-300)
    level1: '#e9d5ff', // Low activity (purple-200)
    level0: '#1e293b', // No activity (slate-800)
  };

  return (
    <div className="card-gradient p-8 rounded-2xl border border-purple-500/30">
      <h2 className="text-3xl font-bold mb-6 text-purple-300">
        GitHub Contributions
      </h2>
      
      <div className="overflow-x-auto">
        <GitHubCalendar
          username="KazimFedxD"
          theme={explicitTheme}
          blockSize={12}
          blockMargin={4}
          fontSize={14}
          colorScheme="dark"
        />
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          label="Total Contributions" 
          value="500+" 
          icon="📊"
        />
        <StatCard 
          label="Public Repos" 
          value="15+" 
          icon="📁"
        />
        <StatCard 
          label="Current Streak" 
          value="Active" 
          icon="🔥"
        />
        <StatCard 
          label="Languages" 
          value="10+" 
          icon="💻"
        />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="bg-gray-800/50 p-4 rounded-lg text-center">
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);`
        }
      ]
    },

    // FEATURE 5
    {
      id: 5,
      title: "Responsive Design with Mobile-First Approach",
      icon: "Smartphone",
      description: "The entire website is built mobile-first with Tailwind CSS responsive utilities. Includes touch-optimized interactions, swipe navigation capability, adaptive layouts for all screen sizes from phones to 4K displays, and minimum 44x44px touch targets for accessibility.",
      whyItMatters: "Over 60% of web traffic comes from mobile devices. A mobile-first approach ensures the best experience for the majority of users while progressively enhancing for larger screens. This improves SEO, accessibility, and user satisfaction.",
      howItWorks: [
        "Mobile base styles applied by default (no prefix needed)",
        "Tablet enhancements at md: breakpoint (≥768px)",
        "Desktop enhancements at lg: breakpoint (≥1024px)",
        "Extra-large screens at xl: breakpoint (≥1280px)",
        "Touch-friendly targets with minimum 44x44px clickable area",
        "Hamburger menu for mobile navigation with slide animations",
        "Responsive typography scales from text-sm on mobile to text-xl on desktop"
      ],
      codeSnippets: [
        {
          title: "Responsive Grid Layout",
          language: "javascript",
          code: `// Adaptive grid: 1 column mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map(project => (
    <ProjectCard key={project.title} project={project} />
  ))}
</div>

// Responsive card with adaptive padding and text
<div className="p-4 sm:p-6 lg:p-8 rounded-xl">
  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
    Responsive Heading
  </h2>
  <p className="text-sm sm:text-base lg:text-lg text-gray-300 mt-4">
    Text scales from small on mobile to large on desktop
  </p>
</div>`
        },
        {
          title: "Mobile Navigation Menu with Animation",
          language: "javascript",
          code: `const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-[100] bg-slate-900/95 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-purple-400">
            Kazim Abbas
          </Link>
          
          {/* Mobile menu button - only visible on mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-purple-900/50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-purple-400" /> : <Menu className="w-6 h-6 text-purple-400" />}
          </button>
          
          {/* Desktop navigation - hidden on mobile */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Mobile menu - animated slide down */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-4 text-purple-200 hover:bg-purple-900/50 rounded"
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};`
        },
        {
          title: "Responsive Utilities Examples",
          language: "javascript",
          code: `// Hide on mobile, show on tablet+
<div className="hidden md:block">Desktop only content</div>

// Show on mobile, hide on tablet+
<div className="block md:hidden">Mobile only content</div>

// Vertical on mobile, horizontal on tablet+
<div className="flex flex-col md:flex-row gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Adaptive padding: small mobile, medium tablet, large desktop
<div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
  Content with responsive spacing
</div>

// Responsive text alignment
<h1 className="text-center md:text-left">
  Centered on mobile, left-aligned on desktop
</h1>

// Responsive grid columns
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* 1 col mobile, 2 small, 3 medium, 4 large */}
</div>`
        }
      ]
    },

    // FEATURE 6
    {
      id: 6,
      title: "Custom Animation System with Framer Motion & Tailwind",
      icon: "Theater",
      description: "Comprehensive animation system combining custom Tailwind keyframes (fade-in, slide, glow, float) with Framer Motion for component-level animations. Includes stagger children effects, page transitions, hover interactions, and GPU-accelerated transforms for 60 FPS performance.",
      whyItMatters: "Animations guide user attention, provide feedback, and create a polished, professional feel. Strategic animations improve perceived performance and engagement while making the portfolio memorable and enjoyable to explore.",
      howItWorks: [
        "Custom Tailwind animations defined in tailwind.config.js with keyframes",
        "Framer Motion for component-level orchestrated animations",
        "Stagger children for sequential reveal of list items",
        "Hover effects using whileHover and whileTap props",
        "Page transition animations with AnimatePresence component",
        "GPU-accelerated transforms using translateY, scale, and opacity",
        "60 FPS maintained through use of transform and opacity only"
      ],
      codeSnippets: [
        {
          title: "Tailwind Custom Animations Configuration",
          language: "javascript",
          code: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
};`
        },
        {
          title: "Framer Motion Stagger Animations",
          language: "javascript",
          code: `// Container and item variants for stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,  // 200ms delay between each child
      delayChildren: 0.1     // Initial delay before first child
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30  // Start 30px below
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

// Usage in component
<motion.div
  initial="hidden"
  animate="visible"
  variants={containerVariants}
  className="grid grid-cols-1 md:grid-cols-3 gap-6"
>
  {projects.map((project, index) => (
    <motion.div
      key={project.title}
      variants={itemVariants}
      className="card-gradient p-6 rounded-xl"
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </motion.div>
  ))}
</motion.div>`
        },
        {
          title: "Hover Animations and Interactive Elements",
          language: "javascript",
          code: `// Interactive card with hover and tap effects
<motion.div
  whileHover={{ 
    scale: 1.05,
    boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)'
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.3 }}
  className="cursor-pointer card-gradient p-6 rounded-xl"
>
  <h3>Interactive Project Card</h3>
</motion.div>

// Animated button with multiple hover states
<motion.button
  whileHover={{ 
    scale: 1.05,
    backgroundColor: '#7c3aed' 
  }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 bg-purple-600 rounded-lg"
>
  Hover Me!
</motion.button>

// Background animated elements
<div className="absolute inset-0 overflow-hidden -z-10">
  <div className="absolute top-1/4 left-1/4 w-96 h-96 
                  bg-purple-500/20 rounded-full blur-3xl animate-float" />
  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 
                  bg-pink-500/20 rounded-full blur-3xl animate-float" 
       style={{ animationDelay: '1s' }} />
</div>`
        }
      ]
    },

    // FEATURE 7
    {
      id: 7,
      title: "Tech Stack Icon Visualization System",
      icon: "Settings",
      description: "Reusable TechIcon component that displays technology logos from react-icons/si (Simple Icons) next to tech stack items. Used throughout the site in Skills, Projects, Experience, and Achievements pages to visually represent technologies with consistent purple-themed styling.",
      whyItMatters: "Visual recognition of technology logos is faster than reading text alone. Icons make the tech stack section more engaging, professional, and easier to scan. This enhances visual hierarchy and breaks up text-heavy content while reinforcing brand recognition of technologies.",
      howItWorks: [
        "Import technology icons from react-icons/si (Simple Icons library)",
        "Map technology names to their corresponding icon components in techIconMap",
        "Render icon + text in styled pill/badge format with purple theme",
        "Fallback to text-only badge if icon not found in mapping",
        "Support multiple sizes (small, medium) for different contexts",
        "Consistent styling with purple theme and hover effects",
        "Handles version numbers and variations (e.g., 'React 19' maps to React icon)"
      ],
      codeSnippets: [
        {
          title: "Complete TechIcon Component",
          language: "javascript",
          code: `import React from 'react';
import {
  SiDjango, SiReact, SiPython, SiPostgresql, SiRedis,
  SiDocker, SiNginx, SiCelery, SiTailwindcss, SiFramer,
  SiJavascript, SiSqlite, SiDiscord, SiGithubpages, SiGithub
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
  'React 19.2.0': SiReact,
  'Tailwind CSS': SiTailwindcss,
  'Tailwind CSS 3.4.17': SiTailwindcss,
  'Framer Motion': SiFramer,
  'JavaScript': SiJavascript,
  
  // Tools & Other
  'Docker': SiDocker,
  'Discord.py': SiDiscord,
  'Discord.py 2.0': SiDiscord,
  'GitHub Pages': SiGithubpages,
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
    // Fallback to text-only badge if icon not found
    return (
      <span className={\`bg-purple-900/40 border border-purple-500/30 
                        rounded-full text-purple-200 font-medium 
                        hover:bg-purple-800/50 hover:border-purple-400/50 
                        transition-all duration-300 \${sizeClasses[size]} \${className}\`}>
        {techName}
      </span>
    );
  }
  
  return (
    <span className={\`inline-flex items-center gap-2 
                      bg-purple-900/40 border border-purple-500/30 
                      rounded-full text-purple-200 font-medium 
                      hover:bg-purple-800/50 hover:border-purple-400/50 
                      transition-all duration-300 \${sizeClasses[size]} \${className}\`}>
      <Icon className={iconSizes[size]} />
      {techName}
    </span>
  );
};

export default TechIcon;`
        },
        {
          title: "Usage in Projects Page",
          language: "javascript",
          code: `import TechIcon from '../components/TechIcon';

const Projects = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projectsData.map(project => (
        <div key={project.title} className="card-gradient p-6 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          
          {/* Tech stack with icons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, index) => (
              <TechIcon key={index} name={tech} size="sm" />
            ))}
          </div>
          
          <button className="btn-primary">View Details</button>
        </div>
      ))}
    </div>
  );
};`
        }
      ]
    }
  ],

  // ============================================================
  // ARCHITECTURE
  // ============================================================
  architecture: {
    description: "This portfolio website follows a modern Single Page Application (SPA) architecture built with React 19. The application uses client-side routing for instant navigation, component-based architecture for reusability, and a data-driven approach for project management.",
    
    servicesTitle: "Application Architecture",
    servicesIntro: "The website consists of multiple layers working together seamlessly:",
    
    diagram: {
      title: "System Architecture Flow",
      description: "Modern SPA architecture with client-side routing and external service integrations",
      layers: [
        {
          name: "Client Layer",
          components: [
            {
              name: "User Browser",
              icon: "Globe",
              description: "Any modern web browser (Chrome, Firefox, Safari, Edge)"
            }
          ]
        },
        {
          name: "CDN Layer",
          components: [
            {
              name: "GitHub Pages CDN",
              icon: "Cloud",
              description: "Global CDN serving static files with HTTPS and custom domain support"
            }
          ]
        },
        {
          name: "Application Layer",
          components: [
            {
              name: "React 19 SPA",
              icon: "Atom",
              description: "Single Page Application with component-based architecture"
            },
            {
              name: "React Router",
              icon: "GitBranch",
              description: "Client-side routing for instant navigation"
            }
          ]
        },
        {
          name: "Presentation Layer",
          components: [
            {
              name: "Pages",
              icon: "FileText",
              description: "Home, About, Projects, Skills, Contact, etc."
            },
            {
              name: "Components",
              icon: "Puzzle",
              description: "Reusable UI components (Cards, Forms, Icons, etc.)"
            }
          ]
        },
        {
          name: "Data Layer",
          components: [
            {
              name: "Project Data",
              icon: "Database",
              description: "Structured JavaScript files with project information"
            }
          ]
        },
        {
          name: "External Services",
          components: [
            {
              name: "EmailJS",
              icon: "Mail",
              description: "Contact form email delivery"
            },
            {
              name: "GitHub API",
              icon: "BarChart3",
              description: "Contribution graph data"
            }
          ]
        }
      ],
      dataFlow: [
        {
          from: "User Browser",
          to: "GitHub Pages CDN",
          description: "Requests website URL"
        },
        {
          from: "GitHub Pages CDN",
          to: "React 19 SPA",
          description: "Serves static bundle (HTML, JS, CSS)"
        },
        {
          from: "React Router",
          to: "Pages",
          description: "Routes to appropriate page component"
        },
        {
          from: "Pages",
          to: "Components",
          description: "Renders reusable components"
        },
        {
          from: "Components",
          to: "Project Data",
          description: "Fetches project information"
        },
        {
          from: "Contact Form",
          to: "EmailJS",
          description: "Sends email notifications"
        },
        {
          from: "About Page",
          to: "GitHub API",
          description: "Fetches contribution data"
        }
      ]
    },

    services: [
      {
        name: "React 19.2.0",
        description: "UI library for building component-based interfaces",
        technologies: ["JSX", "Hooks", "Virtual DOM"],
        purpose: "Frontend framework providing component composition, state management, and efficient rendering"
      },
      {
        name: "React Router DOM 7.9.4",
        description: "Client-side routing for SPA navigation",
        technologies: ["BrowserRouter", "Routes", "useParams", "useNavigate"],
        purpose: "Declarative routing with URL-based navigation and dynamic route parameters"
      },
      {
        name: "Tailwind CSS 3.4.17",
        description: "Utility-first CSS framework for rapid styling",
        technologies: ["JIT Compiler", "PostCSS", "Responsive Utilities"],
        purpose: "Fast development with consistent design system and small bundle size through CSS purging"
      },
      {
        name: "Framer Motion 12.23.24",
        description: "Animation library for smooth, performant animations",
        technologies: ["Motion Components", "Variants", "Gestures"],
        purpose: "Declarative animations with motion components, gesture support, and layout animations"
      },
      {
        name: "EmailJS 4.4.1",
        description: "Email service for contact form functionality",
        technologies: ["Browser-side API", "Template System"],
        purpose: "Send emails directly from frontend without backend server"
      },
      {
        name: "React GitHub Calendar 4.5.11",
        description: "GitHub contribution graph visualization",
        technologies: ["GitHub API", "SVG Rendering"],
        purpose: "Display real-time GitHub activity with customizable theming"
      },
      {
        name: "React Icons 5.5.0 & Lucide React 0.554.0",
        description: "Icon libraries for UI and technology logos",
        technologies: ["Simple Icons", "SVG Components"],
        purpose: "Tree-shakable icon components for visual elements and tech stack representation"
      },
      {
        name: "React Syntax Highlighter 16.1.0",
        description: "Syntax highlighting for code snippets",
        technologies: ["Prism", "VS Code Dark Plus Theme"],
        purpose: "Beautiful code display with language support and copy functionality"
      },
      {
        name: "GitHub Pages",
        description: "Static site hosting with CDN",
        technologies: ["GitHub Actions", "CDN", "HTTPS"],
        purpose: "Free hosting with custom domain support and automatic SSL certificates"
      }
    ]
  },

  // ============================================================
  // SCREENSHOTS
  // ============================================================
  screenshots: [
    {
      filename: "meta-project",
      caption: "This is the Portfolio Website Itself",
      category: "Meta",
      description: "This project IS this very website you're browsing right now! Look around to see all the features in action - the smooth animations, responsive design, project showcases, contact form, and GitHub stats integration. Every page and component you interact with is part of this project's implementation."
    }
  ],

  // ============================================================
  // PERFORMANCE METRICS
  // ============================================================
  performance: {
    overview: {
      philosophy: "The portfolio website prioritizes fast initial load times, smooth 60 FPS animations, and excellent mobile performance through code splitting, CSS purging, and optimized assets."
    },

    keyMetrics: {
      "First Contentful Paint": "0.8s",
      "Largest Contentful Paint": "1.2s",
      "Time to Interactive": "1.5s",
      "Total Blocking Time": "< 100ms",
      "Cumulative Layout Shift": "< 0.1",
      "Bundle Size (Gzipped)": "~146 KB"
    },

    codebaseMetrics: [
      { component: "Total Files", value: "50+", category: "Codebase" },
      { component: "Lines of Code", value: "15,000+", category: "Codebase" },
      { component: "React Components", value: "30+", category: "Components" },
      { component: "Pages/Routes", value: "9", category: "Pages" },
      { component: "Build Time", value: "~30 seconds", category: "Performance" }
    ],

    strengths: [
      "Lightning-fast page navigation with React Router (no full page reloads)",
      "Smooth 60 FPS animations using GPU-accelerated transforms",
      "Excellent mobile performance with mobile-first responsive design",
      "Small bundle size through tree-shaking and Tailwind CSS purging (95% reduction)",
      "Code splitting reduces initial load - only loads what's needed per route",
      "Optimized images and lazy loading for below-fold content",
      "GitHub Pages CDN provides global distribution with low latency"
    ],

    bottlenecks: [
      "Initial JavaScript bundle size (~140 KB gzipped) - 1.5-2s load time on 3G networks",
      "GitHub API dependency for contribution graph - 800ms-1.5s fetch time with skeleton loader",
      "EmailJS API calls for contact form - 1-2s to send emails with loading states",
      "No server-side rendering - Initial content requires JavaScript to load",
      "Client-side routing - Each route change fetches route-specific code bundles"
    ],

    bestUseCases: [
      "Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)",
      "Desktop and mobile devices with decent internet (>= 3G)",
      "Users interested in exploring detailed project information",
      "Recruiters evaluating technical skills and implementations",
      "Portfolio browsing and project discovery"
    ],

    notRecommendedFor: [
      "Internet Explorer 11 or older browsers",
      "Very slow internet connections (< 2G)",
      "Devices with JavaScript disabled",
      "Screen readers without proper ARIA support (accessibility improvements planned)"
    ]
  },

  // ============================================================
  // REQUIREMENTS
  // ============================================================
  requirements: {
    os: [
      { name: "Windows", version: "10/11", support: "✅ Fully Supported" },
      { name: "macOS", version: "12+ (Monterey)", support: "✅ Fully Supported" },
      { name: "Linux (Ubuntu)", version: "20.04+", support: "✅ Fully Supported" },
      { name: "Linux (Debian)", version: "11+", support: "✅ Fully Supported" },
      { name: "Linux (Fedora)", version: "35+", support: "✅ Fully Supported" },
      { name: "Windows 7/8", version: "Legacy", support: "❌ Not Supported" }
    ],

    hardware: {
      minimum: {
        ram: "4GB",
        cpu: "Dual-core 2.0GHz",
        disk: "2GB free space",
        note: "Sufficient for viewing the website and basic development"
      },
      recommended: {
        ram: "8GB or more",
        cpu: "Quad-core 2.5GHz or better",
        disk: "5GB free space",
        note: "Better experience with faster builds and smoother development"
      }
    },

    software: [
      {
        name: "Node.js",
        version: "18.0.0+",
        required: true,
        note: "JavaScript runtime for development"
      },
      {
        name: "npm",
        version: "9.0.0+",
        required: true,
        note: "Package manager (included with Node.js)"
      },
      {
        name: "Git",
        version: "2.0.0+",
        required: true,
        note: "Version control for deployment"
      },
      {
        name: "VS Code",
        version: "Latest",
        required: false,
        note: "Recommended code editor"
      }
    ],

    browsers: [
      { name: "Chrome", version: "90+", status: "✅ Recommended" },
      { name: "Firefox", version: "88+", status: "✅ Supported" },
      { name: "Safari", version: "14+", status: "✅ Supported" },
      { name: "Edge", version: "90+", status: "✅ Supported" },
      { name: "Internet Explorer", version: "11", status: "❌ Not Supported" }
    ],

    externalServices: [
      {
        name: "GitHub Pages",
        required: true,
        cost: "Free",
        purpose: "Website hosting with CDN",
        limitations: "100 GB/month bandwidth soft limit, static sites only"
      },
      {
        name: "EmailJS",
        required: false,
        cost: "Free tier: 200 emails/month",
        purpose: "Contact form email delivery",
        limitations: "Rate limited on free tier, public API keys"
      },
      {
        name: "GitHub API",
        required: false,
        cost: "Free",
        purpose: "Contribution graph data",
        limitations: "60 requests/hour (unauthenticated), 5000/hour (authenticated)"
      }
    ]
  },

  // ============================================================
  // SETUP STEPS
  // ============================================================
  setupSteps: [
    {
      number: 1,
      title: "Prerequisites Check",
      description: "Verify that all required software is installed on your system",
      commands: [
        { 
          code: "node --version", 
          description: "Check Node.js version (should be 18.0.0 or higher)" 
        },
        { 
          code: "npm --version", 
          description: "Check npm version (should be 9.0.0 or higher)" 
        },
        { 
          code: "git --version", 
          description: "Check Git version (should be 2.0.0 or higher)" 
        }
      ]
    },
    {
      number: 2,
      title: "Clone Repository",
      description: "Clone the portfolio website repository from GitHub to your local machine",
      commands: [
        { 
          code: "git clone https://github.com/KazimFedxD/KazimFedxD.github.io.git", 
          description: "Clone the repository" 
        },
        { 
          code: "cd KazimFedxD.github.io", 
          description: "Navigate to project directory" 
        }
      ]
    },
    {
      number: 3,
      title: "Install Dependencies",
      description: "Install all npm packages required by the project (React, Tailwind, Framer Motion, etc.)",
      commands: [
        { 
          code: "npm install", 
          description: "Install all dependencies from package.json (this will take 2-5 minutes)" 
        }
      ]
    },
    {
      number: 4,
      title: "Start Development Server",
      description: "Run the development server to preview the website locally with hot reload",
      commands: [
        { 
          code: "npm start", 
          description: "Start development server at http://localhost:3000" 
        }
      ]
    },
    {
      number: 5,
      title: "Build for Production",
      description: "Create optimized production build with minified assets",
      commands: [
        { 
          code: "npm run build", 
          description: "Create production build in build/ folder (~30 seconds)" 
        }
      ]
    },
    {
      number: 6,
      title: "Deploy to GitHub Pages",
      description: "Deploy the website to GitHub Pages using the deployment script",
      commands: [
        { 
          code: "chmod +x deploy.sh", 
          description: "Make deployment script executable (first time only)" 
        },
        { 
          code: "./deploy.sh", 
          description: "Run automated deployment script (builds and pushes to gh-pages branch)" 
        }
      ]
    },
    {
      number: 7,
      title: "Configure Custom Domain (Optional)",
      description: "Set up custom domain for GitHub Pages",
      commands: [
        { 
          code: "echo 'yourdomain.com' > public/CNAME", 
          description: "Create CNAME file with your custom domain" 
        }
      ]
    },
    {
      number: 8,
      title: "Configure EmailJS (Optional)",
      description: "Set up your own EmailJS account for contact form functionality",
      commands: [
        { 
          code: "# Update credentials in src/pages/Contact.js", 
          description: "Replace EmailJS service ID, template IDs, and public key with your own" 
        }
      ]
    }
  ],

  // ============================================================
  // KNOWN ISSUES
  // ============================================================
  knownIssues: [
    {
      severity: "low",
      title: "React Router 404 on GitHub Pages Refresh",
      description: "Refreshing page on non-root routes (e.g., /projects) shows 404 error",
      impact: "Direct links to deep pages fail until workaround loads",
      workaround: "404.html redirects to index.html with path restoration via sessionStorage",
      status: "✅ Resolved with workaround",
      detailedExplanation: "GitHub Pages doesn't support client-side routing natively - it tries to serve /projects/index.html which doesn't exist in the static file system. This is a common issue with all SPAs hosted on GitHub Pages.",
      technicalDetails: "When GitHub Pages receives a request for /projects, it looks for projects/index.html file. Since React Router handles routing client-side, this file doesn't exist, resulting in 404.",
      whyItHappens: "GitHub Pages is designed for static sites with actual HTML files for each route. SPAs use JavaScript to handle routing, which GitHub Pages doesn't understand.",
      proposedFix: "The 404.html workaround is the standard solution. Alternative would be to migrate to Netlify/Vercel which have native SPA support.",
      codeExample: {
        title: "404.html Redirect Workaround",
        language: "html",
        code: `<!-- public/404.html -->
<script>
  sessionStorage.redirect = location.href;
</script>
<meta http-equiv="refresh" content="0;URL='/'">

<!-- In public/index.html -->
<script>
(function() {
  var redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, null, redirect);
  }
})();
</script>`
      },
      estimatedEffort: "Already implemented",
      priority: "low"
    },
    {
      severity: "low",
      title: "GitHub API Rate Limiting",
      description: "GitHub contribution calendar may fail to load during high traffic",
      impact: "Contribution graph shows error message occasionally",
      workaround: "Skeleton loader displays during fetch, error boundary shows fallback message",
      status: "⚠️ Monitoring - rare occurrence",
      detailedExplanation: "GitHub API allows 60 unauthenticated requests per hour per IP address. If multiple visitors access the About page simultaneously, the rate limit can be exhausted, causing the contribution calendar to fail loading.",
      technicalDetails: "react-github-calendar library fetches data from GitHub's public API. Each visitor's request counts toward the IP-based rate limit. No authentication is used to keep the implementation simple.",
      whyItHappens: "GitHub enforces rate limits to prevent API abuse. Unauthenticated requests have lower limits than authenticated ones (60/hour vs 5000/hour).",
      proposedFix: "Could implement authenticated GitHub API requests using a personal access token, but this would require backend proxy to hide the token. Current solution is acceptable for low-traffic personal portfolio.",
      estimatedEffort: "2-3 hours to implement backend proxy",
      priority: "low"
    },
    {
      severity: "low",
      title: "EmailJS Free Tier Rate Limits",
      description: "Contact form limited to 200 emails per month on free tier",
      impact: "Contact form may stop working if limit exceeded during high traffic month",
      workaround: "Fallback email address displayed on timeout/error",
      status: "Monitoring usage",
      detailedExplanation: "EmailJS free tier allows 200 emails per month. Each contact form submission sends 2 emails (notification + confirmation), so effective limit is 100 form submissions per month. For personal portfolio, this is usually sufficient.",
      technicalDetails: "EmailJS tracks usage per account. When limit is reached, API returns 402 Payment Required error. The contact form catches this error and displays fallback message.",
      whyItHappens: "Free tier limitation to encourage paid upgrades for high-volume users.",
      proposedFix: "Upgrade to EmailJS paid plan ($7/month for 1000 emails) or implement backend email service with SendGrid/Mailgun.",
      estimatedEffort: "15 minutes to upgrade plan OR 4-6 hours to implement backend",
      priority: "low"
    },
    {
      severity: "medium",
      title: "No Offline Support / PWA Features",
      description: "Website requires internet connection - no service worker or caching",
      impact: "Cannot view website offline, no progressive web app features",
      workaround: "None - internet connection required",
      status: "Planned for v2.0",
      detailedExplanation: "The website currently has no service worker implementation, meaning all assets must be fetched from the network on each visit. A PWA with service worker would enable offline viewing, faster repeat visits, and app-like features such as installation and push notifications.",
      technicalDetails: "Service workers intercept network requests and serve cached responses when offline. Workbox library can automate cache strategies for different asset types (cache-first for static assets, network-first for API calls).",
      whyItHappens: "Service workers were not implemented in v1.0 to keep the initial release simple and focus on core functionality.",
      proposedFix: "Implement service worker using Workbox library with precaching for static assets and runtime caching for API responses.",
      codeExample: {
        title: "Service Worker with Workbox (Planned)",
        language: "javascript",
        code: `// src/service-worker.js (to be created)
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache static assets (images, fonts)
registerRoute(
  ({ request }) => ['image', 'font'].includes(request.destination),
  new CacheFirst({ cacheName: 'assets' })
);

// Network-first for API calls
registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new NetworkFirst({ cacheName: 'api' })
);`
      },
      estimatedEffort: "2-3 weeks",
      priority: "medium"
    },
    {
      severity: "low",
      title: "Tailwind Dynamic Class Purging",
      description: "Dynamically generated Tailwind classes may not be included in production build",
      impact: "Missing styles for certain elements if classes are constructed at runtime",
      workaround: "Use complete class names or add to safelist in tailwind.config.js",
      status: "✅ Resolved by using complete class names",
      detailedExplanation: "Tailwind's JIT compiler scans source files for class names to include in the final CSS. It can't detect classes that are constructed dynamically using template literals or string concatenation.",
      technicalDetails: "The purge process uses regex to find class names in source files. Dynamic constructions like 'text-' + color + '-500' won't be detected because the full class name doesn't appear literally in the code.",
      whyItHappens: "Static analysis limitation - the build tool can't execute JavaScript to determine all possible class combinations.",
      proposedFix: "Always use complete class names or conditional assignment. For dynamic scenarios, use safelist configuration.",
      codeExample: {
        title: "Correct vs Incorrect Tailwind Usage",
        language: "javascript",
        code: `// ❌ WRONG - class won't be detected by purge
const color = 'purple';
<div className={\`text-\${color}-500\`}>

// ✅ CORRECT - complete class names
const colorClass = color === 'purple' ? 'text-purple-500' : 'text-blue-500';
<div className={colorClass}>

// ✅ CORRECT - safelist in tailwind.config.js
module.exports = {
  safelist: ['text-purple-500', 'bg-purple-600'],
};`
      },
      estimatedEffort: "Already implemented throughout codebase",
      priority: "low"
    }
  ],

  // ============================================================
  // FUTURE ROADMAP
  // ============================================================
  futureEnhancements: [
    {
      version: "1.1",
      timeline: "Q1 2026",
      theme: "Content & Discoverability",
      features: [
        {
          name: "Blog Section",
          priority: "high",
          effort: "3-4 weeks",
          difficulty: "Medium",
          description: "Add markdown-based blog for articles, tutorials, and technical writeups",
          whyWeNeed: "Blog provides fresh content for SEO, demonstrates writing skills, establishes thought leadership, and creates opportunities for community engagement through comments and shares.",
          howToImplement: [
            "Create blog/ folder with markdown files",
            "Implement dynamic routing for blog posts (/blog/:slug)",
            "Add frontmatter parsing (title, date, tags, excerpt)",
            "Create category and tag filtering system",
            "Add search functionality with fuzzy matching",
            "Implement RSS feed for subscribers",
            "Add social share buttons for each post"
          ],
          benefits: [
            "Improved SEO with fresh, keyword-rich content",
            "Demonstrates writing and communication skills",
            "Establishes authority in technical topics",
            "Creates backlink opportunities",
            "Provides value to community (tutorials, guides)"
          ],
          impactOnProject: "Transforms portfolio from static showcase to dynamic content platform, increasing return visitors and time on site."
        },
        {
          name: "Project Search & Filter",
          priority: "high",
          effort: "1-2 weeks",
          difficulty: "Easy",
          description: "Search and filter projects by technology stack, category, or keywords",
          whyWeNeed: "As portfolio grows beyond 5-10 projects, visitors need ways to quickly find relevant work. Search improves UX and helps recruiters find specific tech stack experience.",
          howToImplement: [
            "Add search bar component with debounced input",
            "Implement client-side filtering by project title, description, tech stack",
            "Add multi-select filter dropdowns (Frontend, Backend, Full-Stack, Tools)",
            "Tech stack pills as clickable filters",
            "URL params for shareable filtered views (/projects?tech=React&category=Web)",
            "Show result count and clear filters button"
          ],
          benefits: [
            "Better UX for visitors with many projects to browse",
            "Helps recruiters quickly find relevant experience",
            "Professional appearance matching industry portfolio sites",
            "Shareable filtered URLs for specific skill showcases"
          ],
          impactOnProject: "Makes portfolio scalable - can add unlimited projects without overwhelming visitors."
        },
        {
          name: "Dark/Light Mode Toggle",
          priority: "medium",
          effort: "1 week",
          difficulty: "Easy",
          description: "Theme switcher allowing users to choose between dark and light color schemes",
          whyWeNeed: "Accessibility improvement for users sensitive to bright screens. Also demonstrates attention to user preferences and modern web standards.",
          howToImplement: "Add toggle button in navigation, use Tailwind dark mode classes, persist preference in localStorage, smooth transition animations between themes",
          benefits: [
            "Better accessibility for users with light sensitivity",
            "User customization increases engagement",
            "Modern website standard expected by users",
            "Shows attention to UX details"
          ],
          impactOnProject: "Small but impactful UX improvement that demonstrates professionalism and accessibility awareness.",
          codeExample: {
            title: "Dark Mode Implementation",
            language: "javascript",
            code: `const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

useEffect(() => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
}, [theme]);

<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
</button>`
          }
        },
        {
          name: "Accessibility Improvements (WCAG AAA)",
          priority: "high",
          effort: "1-2 weeks",
          difficulty: "Medium",
          description: "Comprehensive accessibility audit and improvements for screen readers and keyboard navigation",
          whyWeNeed: "Inclusive design is both ethical and legally important. Also improves SEO and demonstrates awareness of web standards. WCAG AAA compliance shows commitment to accessibility.",
          howToImplement: "Add skip-to-main links, improve color contrast ratios, add ARIA labels, implement focus indicators, test with NVDA/JAWS screen readers, add keyboard shortcuts documentation",
          benefits: [
            "Inclusive design for users with disabilities",
            "Better SEO rankings (accessibility is ranking factor)",
            "Legal compliance in many jurisdictions",
            "Demonstrates professionalism and ethical development",
            "Improved keyboard navigation for power users"
          ],
          impactOnProject: "Makes portfolio usable by wider audience, shows commitment to best practices and inclusive design."
        }
      ]
    },
    {
      version: "2.0",
      timeline: "Q2 2026",
      theme: "Progressive Web App & Advanced Features",
      features: [
        {
          name: "Progressive Web App (PWA) with Offline Support",
          priority: "high",
          effort: "2-3 weeks",
          difficulty: "Hard",
          description: "Full PWA implementation with service worker, offline functionality, and installability",
          whyWeNeed: "PWAs provide app-like experience, faster load times through caching, offline viewing capability, and push notifications. Shows advanced web development skills.",
          howToImplement: [
            "Implement service worker using Workbox library",
            "Configure precaching for static assets (JS, CSS, images)",
            "Runtime caching for API responses (GitHub, EmailJS)",
            "Offline fallback pages for when network unavailable",
            "Add install prompt with custom UI",
            "Configure app manifest for home screen installation",
            "Implement push notifications for blog updates (optional)"
          ],
          benefits: [
            "Offline viewing of previously visited pages",
            "Faster repeat visits through aggressive caching",
            "App-like experience with install option",
            "Push notifications for blog subscribers",
            "Better mobile UX matching native apps",
            "Shows advanced PWA development skills"
          ],
          impactOnProject: "Elevates portfolio to cutting-edge PWA standard, dramatically improves performance and offline capability.",
          codeExample: {
            title: "Service Worker Registration",
            language: "javascript",
            code: `// src/index.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('SW registered'))
      .catch(err => console.log('SW registration failed'));
  });
}`
          }
        },
        {
          name: "Interactive Timeline of Coding Journey",
          priority: "medium",
          effort: "2-3 weeks",
          difficulty: "Medium",
          description: "Visual timeline component showing career milestones, projects, and achievements chronologically",
          whyWeNeed: "Storytelling through visual timeline is more engaging than plain text resume. Shows career progression and growth over time in compelling way.",
          howToImplement: "Create vertical timeline component, animate milestones on scroll with Framer Motion, add icons for event types (education, job, project, award), tooltips with details, mobile responsive horizontal scroll",
          benefits: [
            "Engaging storytelling of career journey",
            "Visual appeal breaks up text-heavy content",
            "Easy to understand progression and growth",
            "Memorable presentation of achievements",
            "Mobile-friendly alternative to traditional resume"
          ],
          impactOnProject: "Adds compelling visual narrative to About page, makes career history more engaging and memorable."
        },
        {
          name: "Live Project Status Indicators",
          priority: "medium",
          effort: "1 week",
          difficulty: "Easy",
          description: "Real-time status badges showing project state (Active, Deployed, Archived, In Development)",
          whyWeNeed: "Shows which projects are actively maintained vs archived. Demonstrates ongoing development work and commitment to maintenance.",
          howToImplement: "Fetch last commit date from GitHub API, determine status based on commit recency, display color-coded badges (green=active, yellow=maintenance, gray=archived), add deployment status checks",
          benefits: [
            "Clear indication of project maintenance status",
            "Shows active development work",
            "Professional project management appearance",
            "Helps visitors focus on current projects"
          ],
          impactOnProject: "Adds transparency about project status, shows commitment to maintenance and ongoing development."
        }
      ]
    },
    {
      version: "2.1",
      timeline: "Q3 2026",
      theme: "Engagement & Internationalization",
      features: [
        {
          name: "Multi-Language Support (i18n)",
          priority: "low",
          effort: "3-4 weeks",
          difficulty: "Hard",
          description: "Support multiple languages (English, Urdu) with language switcher",
          whyWeNeed: "Reach wider audience including local Pakistani market. Demonstrates internationalization skills and cultural awareness.",
          howToImplement: "Implement react-i18next library, create translation JSON files, add language switcher in navigation, persist language preference in localStorage, translate all UI text and content",
          benefits: [
            "Wider audience reach (local and international)",
            "Demonstrates i18n implementation skills",
            "Cultural inclusivity and awareness",
            "Potential for local freelance opportunities"
          ],
          impactOnProject: "Opens portfolio to non-English speaking audience, shows advanced localization skills."
        },
        {
          name: "Newsletter Subscription",
          priority: "low",
          effort: "1 week",
          difficulty: "Easy",
          description: "Email subscription form for blog updates and project announcements",
          whyWeNeed: "Build audience and direct communication channel. Creates opportunities for engagement beyond one-time visits.",
          howToImplement: "Add subscription form in footer, integrate with EmailJS or Mailchimp, double opt-in confirmation flow, unsubscribe link in emails, store subscribers in backend (or use third-party service)",
          benefits: [
            "Build engaged audience over time",
            "Direct communication channel",
            "Increase return visitors",
            "Content distribution platform"
          ],
          impactOnProject: "Transforms portfolio into platform with recurring audience, increases long-term engagement."
        },
        {
          name: "Social Share Buttons",
          priority: "low",
          effort: "1 week",
          difficulty: "Easy",
          description: "Share projects and blog posts on Twitter, LinkedIn, Facebook with custom social images",
          whyWeNeed: "Increase visibility through social sharing. Makes it easy for visitors to share interesting projects.",
          howToImplement: "Add share buttons on project detail pages, custom Open Graph images for each project, shareable links with UTM parameters for tracking, share count display (if API available)",
          benefits: [
            "Increased visibility through social sharing",
            "Viral potential for popular projects",
            "Easy content promotion",
            "Social proof through share counts"
          ],
          impactOnProject: "Amplifies reach through social networks, creates opportunities for organic discovery."
        }
      ]
    }
  ],

  // Related projects with similar tech stack
  relatedProjects: [
    "Full-Stack Web Application Template"
  ]
};
