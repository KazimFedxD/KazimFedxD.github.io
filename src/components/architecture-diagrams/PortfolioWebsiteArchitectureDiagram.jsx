import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowDown as ArrowDownIcon } from 'lucide-react';
import { Monitor, Smartphone, Cloud, Code, Package, Mail, Github, Palette, Zap } from 'lucide-react';

const PortfolioWebsiteArchitectureDiagram = () => {

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px] p-4 md:p-8 glass rounded-2xl border border-purple-500/20">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent text-center mb-4 md:mb-8">
          Portfolio Website Architecture
        </h3>

        {/* User/Client Layer */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">USER LAYER</h4>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
            <LayerBox icon={Monitor} title="Desktop Browser" subtitle="Chrome, Firefox, Safari, Edge" color="blue" />
            <LayerBox icon={Smartphone} title="Mobile Browser" subtitle="Responsive Design" color="blue" />
          </div>
          <ArrowDown />
        </div>

        {/* CDN / Hosting Layer */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">HOSTING & CDN</h4>
          <div className="flex justify-center">
            <ServiceBox
              icon={Cloud}
              title="GitHub Pages"
              subtitle="Static Hosting"
              features={['Global CDN', 'HTTPS/SSL', 'Custom Domain']}
              color="purple"
            />
          </div>
          <ArrowDown />
        </div>

        {/* Application Layer */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">APPLICATION LAYER</h4>
          <div className="flex justify-center">
            <ServiceBox
              icon={Code}
              title="React Application"
              subtitle="Single Page App"
              features={['React 19', 'React Router', 'Context API', 'Hooks']}
              color="cyan"
            />
          </div>
          <ArrowDown />
        </div>

        {/* UI Framework Layer */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">UI & STYLING</h4>
          <div className="flex justify-center gap-4 md:gap-8">
            <ServiceBox
              icon={Palette}
              title="Tailwind CSS"
              subtitle="Utility-First CSS"
              features={['Responsive', 'Dark Theme', 'Custom Colors']}
              color="teal"
            />
            <ServiceBox
              icon={Zap}
              title="Framer Motion"
              subtitle="Animations"
              features={['Page Transitions', 'Scroll Effects', 'Hover Animations']}
              color="pink"
            />
          </div>
          <ArrowDown />
        </div>

        {/* Core Components Layer */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">CORE COMPONENTS</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            <ComponentBox title="Navbar" subtitle="Navigation" />
            <ComponentBox title="Hero Section" subtitle="Landing" />
            <ComponentBox title="About Me" subtitle="Profile" />
            <ComponentBox title="Skills" subtitle="Tech Stack" />
            <ComponentBox title="Projects" subtitle="Portfolio" />
            <ComponentBox title="Contact Form" subtitle="Communication" />
          </div>
          <ArrowDown />
        </div>

        {/* External Services Layer */}
        <div>
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">EXTERNAL SERVICES</h4>
          <div className="flex justify-center gap-4 md:gap-8">
            <ServiceBox
              icon={Mail}
              title="EmailJS"
              subtitle="Email Service"
              features={['Contact Form', 'Email Delivery', 'Free Tier']}
              color="orange"
            />
            <ServiceBox
              icon={Github}
              title="GitHub API"
              subtitle="Data Source"
              features={['Contribution Graph', 'Public Stats', 'Profile Data']}
              color="gray"
            />
          </div>
        </div>

        {/* Build & Deploy Flow */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-700/50">
          <h4 className="text-xs md:text-sm font-semibold text-green-400 mb-3 md:mb-4 text-center">BUILD & DEPLOYMENT PIPELINE</h4>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            <PipelineStep title="Code Push" subtitle="Git Commit" />
            <PipelineArrow />
            <PipelineStep title="GitHub Actions" subtitle="CI/CD" />
            <PipelineArrow />
            <PipelineStep title="Build Process" subtitle="npm run build" />
            <PipelineArrow />
            <PipelineStep title="Deploy" subtitle="gh-pages" />
            <PipelineArrow />
            <PipelineStep title="Live Site" subtitle="Production" />
          </div>
        </div>

        {/* Data Flow Legend */}
        <div className="mt-6 md:mt-8 p-3 md:p-4 glass rounded-lg border border-slate-700/50">
          <h4 className="text-xs md:text-sm font-semibold text-white mb-2">Architecture Notes:</h4>
          <ul className="text-xs md:text-sm text-slate-300 space-y-1">
            <li>• <strong>Static Site:</strong> Pre-built HTML/CSS/JS served directly from GitHub Pages CDN</li>
            <li>• <strong>No Backend:</strong> Purely frontend application with external API integrations</li>
            <li>• <strong>Client-Side Routing:</strong> React Router handles navigation without page reloads</li>
            <li>• <strong>Build Optimization:</strong> Webpack bundling, code splitting, and tree shaking</li>
            <li>• <strong>Responsive Design:</strong> Mobile-first approach with Tailwind breakpoints</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const LayerBox = ({ icon: Icon, title, subtitle, color }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, y: 20 }}
      animate={isMobile ? false : { opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`glass flex flex-col items-center justify-center p-3 md:p-4 rounded-lg border border-${color}-500/30 min-w-[120px] md:min-w-[150px]`}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <Icon className={`w-6 h-6 md:w-8 md:h-8 text-${color}-400 mb-2`} />
      </motion.div>
      <div className="text-xs md:text-sm font-semibold text-white">{title}</div>
      <div className="text-[10px] md:text-xs text-slate-400">{subtitle}</div>
    </motion.div>
  );
};

const ServiceBox = ({ icon: Icon, title, subtitle, features, color }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, scale: 0.9 }}
      animate={isMobile ? false : { opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`glass flex flex-col items-center p-3 md:p-4 rounded-lg border border-${color}-500/30 min-w-[140px] md:min-w-[180px]`}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <Icon className={`w-8 h-8 md:w-10 md:h-10 text-${color}-400 mb-2`} />
      </motion.div>
      <div className="text-xs md:text-sm font-bold text-white text-center">{title}</div>
      <div className="text-[10px] md:text-xs text-slate-400 mb-2 text-center">{subtitle}</div>
      <div className="space-y-1">
        {features.map((feature, idx) => (
          <div key={idx} className="text-[10px] md:text-xs text-slate-300 text-center">
            • {feature}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ComponentBox = ({ title, subtitle }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -3 }}
      className="glass flex flex-col items-center justify-center p-2 md:p-3 rounded-lg border border-indigo-500/30"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
      >
        <Package className="w-5 h-5 md:w-6 md:h-6 text-indigo-400 mb-1" />
      </motion.div>
      <div className="text-xs md:text-sm font-semibold text-white text-center">{title}</div>
      <div className="text-[10px] md:text-xs text-slate-400 text-center">{subtitle}</div>
    </motion.div>
  );
};

const PipelineStep = ({ title, subtitle }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -3 }}
      className="glass flex flex-col items-center justify-center p-2 md:p-3 rounded-lg border border-green-500/30 min-w-[80px] md:min-w-[100px]"
    >
      <div className="text-xs md:text-sm font-semibold text-white text-center">{title}</div>
      <div className="text-[10px] md:text-xs text-slate-400 text-center">{subtitle}</div>
    </motion.div>
  );
};

const PipelineArrow = () => {
  return (
    <div className="text-green-400">
      <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
    </div>
  );
};

const ArrowDown = ({ label }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center my-2 md:my-3"
      animate={{ opacity: 1, y: [0, 5, 0] }}
      transition={{ y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
    >
      <div className="text-purple-400">
        <ArrowDownIcon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      {label && (
        <span className="text-[10px] md:text-xs text-slate-400 mt-1">{label}</span>
      )}
    </motion.div>
  );
};

export default PortfolioWebsiteArchitectureDiagram;
