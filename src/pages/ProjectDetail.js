import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { fullStackTemplateData } from '../data/fullstack-template-data';
import { fedxdDataContainerData } from '../data/fedxd-data-container-data';
import { fxpyData } from '../data/fxpy-data';
import { fexobotData } from '../data/fexobot-data';
import { fxquestData } from '../data/fxquest-data';
import { portfolioWebsiteData } from '../data/portfolio-website-data';
import { fincoreData } from '../data/fincore-data';
import FeatureCard from '../components/project-detail/FeatureCard';
import TechStackTable from '../components/project-detail/TechStackTable';
import CodeSnippet from '../components/project-detail/CodeSnippet';
import PerformanceMetrics from '../components/project-detail/PerformanceMetrics';
import KnownIssuesPanel from '../components/project-detail/KnownIssuesPanel';
import FutureRoadmap from '../components/project-detail/FutureRoadmap';
import ScreenshotGallery from '../components/project-detail/ScreenshotGallery';
import ArchitectureDiagram from '../components/project-detail/ArchitectureDiagram';
import ApiReference from '../components/project-detail/ApiReference';
import CommandReference from '../components/project-detail/CommandReference';
import ProjectBadges from '../components/project-detail/ProjectBadges';
import RelatedProjects from '../components/project-detail/RelatedProjects';
import SetupGuide from '../components/project-detail/SetupGuide';

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(false);
  const tabsRef = React.useRef(null);
  const activeTabRef = React.useRef(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add scroll-on-hover functionality
  useEffect(() => {
    const tabsContainer = tabsRef.current;
    if (!tabsContainer) return;

    const handleWheel = (e) => {
      e.preventDefault();
      tabsContainer.scrollLeft += e.deltaY;
    };

    tabsContainer.addEventListener('wheel', handleWheel, { passive: false });
    return () => tabsContainer.removeEventListener('wheel', handleWheel);
  }, []);

  // Map project names to their data
  const projectDataMap = useMemo(() => ({
    'Full-Stack-Template': fullStackTemplateData,
    'FedxD-Data-Container-FxDC': fedxdDataContainerData,
    'FxPy': fxpyData,
    'FeXoBot': fexobotData,
    'FxQuest': fxquestData,
    'Portfolio-Website': portfolioWebsiteData,
    'FinCore': fincoreData,
  }), []);
  
  const projectData = projectDataMap[projectName] || null;

  // Build tabs array based on available data
  const tabs = useMemo(() => [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'architecture', label: 'Architecture' },
    // Show API/Commands tab based on project type
    ...(projectData?.apiEndpoints && projectData.apiEndpoints.length > 0 
      ? [{ id: 'api', label: 'API Reference' }] 
      : projectData?.commands && projectData.commands.length > 0
      ? [{ id: 'api', label: 'Commands' }]
      : []
    ),
    { id: 'setup', label: 'Setup Guide' },
    { id: 'screenshots', label: 'Screenshots' },
    { id: 'performance', label: 'Performance' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'issues', label: 'Known Issues' },
    { id: 'future', label: 'Roadmap' },
  ], [projectData]);

  // Keyboard navigation for tabs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        
        const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
        let newIndex;
        
        if (e.key === 'ArrowLeft') {
          newIndex = Math.max(0, currentIndex - 1);
        } else {
          newIndex = Math.min(tabs.length - 1, currentIndex + 1);
        }
        
        setActiveTab(tabs[newIndex].id);
        
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, tabs]);

  // Scroll active tab into view in the tab bar
  useEffect(() => {
    if (activeTabRef.current && tabsRef.current) {
      const tabsContainer = tabsRef.current;
      const activeTabElement = activeTabRef.current;
      
      const containerRect = tabsContainer.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();
      
      // Calculate scroll position to center the active tab
      const scrollLeft = tabRect.left - containerRect.left + tabsContainer.scrollLeft - (containerRect.width / 2) + (tabRect.width / 2);
      
      tabsContainer.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeTab]);

  if (!projectData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-6">The project you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-invert max-w-none"
            >
              <p className="text-lg text-slate-300 leading-relaxed">
                {projectData.overview.description}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.01, y: -3 }}
              className="glass rounded-xl p-4 sm:p-6 border border-purple-500/30"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Problem Statement</h3>
              {projectData.overview.problemIntro && (
                <p className="text-slate-300 mb-4 text-sm sm:text-base">
                  {projectData.overview.problemIntro}
                </p>
              )}
              <ul className="space-y-3">
                {projectData.overview.problemStatement.map((problem, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-purple-400 mt-1 text-lg">•</span>
                    <span className="text-slate-300 text-sm sm:text-base">{problem}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* How We Solve Section */}
            {projectData.overview.howWeSolve && (
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-500/30">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl">💡</span>
                  How We Solve These Problems
                </h3>
                <div className="space-y-4">
                  {projectData.overview.howWeSolve.map((solution, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-all"
                    >
                      <h4 className="text-base sm:text-lg font-bold text-purple-400 mb-2">
                        ✓ {solution.problem}
                      </h4>
                      <p className="text-gray-300 mb-2 text-sm sm:text-base">
                        <span className="font-semibold text-white">Solution:</span> {solution.solution}
                      </p>
                      <p className="text-green-400 text-sm">
                        <span className="font-semibold">Benefit:</span> {solution.benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">What Makes This Project Unique</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectData.overview.uniqueFeatures.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="glass rounded-xl p-6 border border-slate-700/50"
                  >
                    <div className="text-4xl mb-3">
                      {(() => {
                        if (typeof feature.icon === 'string' && feature.icon.length > 2) {
                          const IconComponent = LucideIcons[feature.icon];
                          if (IconComponent) {
                            return <IconComponent className="w-10 h-10 text-purple-400" />;
                          }
                        }
                        return <span>{feature.icon}</span>;
                      })()}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                    <ul className="space-y-2">
                      {feature.points.map((point, pointIdx) => (
                        <li key={pointIdx} className="flex items-start gap-2 text-sm">
                          <span className="text-purple-400 mt-1">✓</span>
                          <span className="text-slate-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.01, y: -3 }}
              className="glass rounded-xl p-6 border border-slate-700/50"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Target Audience</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projectData.overview.targetAudience.map((audience, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <span className="text-purple-400">→</span>
                    <span>{audience}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.01, y: -3 }}
              className="glass rounded-xl p-6 border border-slate-700/50"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Use Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {projectData.overview.useCases.map((useCase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    className="glass px-4 py-3 rounded-lg border border-slate-700/50 text-slate-300"
                  >
                    {useCase}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Project Badges & Stats */}
            <ProjectBadges projectData={projectData} />

            {/* Related Projects */}
            <RelatedProjects currentProject={projectName} />
          </div>
        );

      case 'features':
        return (
          <div className="space-y-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-3">
                {projectData.features.length} Production-Ready Features
              </h2>
              <p className="text-gray-300">
                Each feature represents a core architectural decision that makes this template enterprise-ready.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projectData.features.map((feature, idx) => (
                <FeatureCard key={feature.id} feature={feature} index={idx} />
              ))}
            </div>

            {projectData.features
              .filter(f => f.codeSnippets)
              .map((feature) => (
                <div key={feature.id} className="mt-12">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    {feature.title} - Implementation
                  </h3>
                  {feature.codeSnippets.map((snippet, idx) => (
                    <CodeSnippet
                      key={idx}
                      title={snippet.title}
                      code={snippet.code}
                      language={snippet.language}
                    />
                  ))}
                </div>
              ))}
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">System Architecture</h2>
              {projectData.architecture?.description && (
                <p className="text-gray-300 text-lg">
                  {projectData.architecture.description}
                </p>
              )}
            </div>

            <ArchitectureDiagram projectName={projectName} />

            <TechStackTable techStack={projectData.techStack} />

            {projectData.architecture?.services && projectData.architecture.services.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {projectData.architecture.servicesTitle || 'Service Architecture'}
                </h3>
                {projectData.architecture.servicesIntro && (
                  <p className="text-gray-300 mb-4">{projectData.architecture.servicesIntro}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectData.architecture.services.map((service, idx) => (
                    <div key={idx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-white">{service.name}</h4>
                        {service.port && service.port !== '-' && (
                          <span className="text-sm text-purple-400">Port {service.port}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{service.purpose || service.description}</p>
                      {service.technologies && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {service.technologies.map((tech, tidx) => (
                            <span key={tidx} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'api':
        // Show Commands for Discord bots, API Reference for backend projects
        if (projectData.commands && projectData.commands.length > 0) {
          // Commands tab for Discord bots
          return <CommandReference commands={projectData.commands} />;
        } else {
          // API Reference for backend projects
          return (
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-3">API Reference</h2>
                <p className="text-gray-300">
                  Complete REST API documentation with request/response examples.
                </p>
              </div>
              
              <ApiReference endpoints={projectData.apiEndpoints || []} />
            </div>
          );
        }

      case 'setup':
        return (
          <div className="space-y-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-3">Setup & Installation Guide</h2>
              <p className="text-gray-300">
                Step-by-step guide to get the project running on your machine.
              </p>
            </div>

            <SetupGuide setupSteps={projectData.setupSteps} />
          </div>
        );

      case 'screenshots':
        // Special handling for Portfolio Website (meta-project)
        if (projectName === 'Portfolio-Website') {
          return (
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-3">Screenshots</h2>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-gradient p-8 md:p-12 rounded-2xl border border-purple-500/30 text-center"
              >
                <div className="text-6xl md:text-8xl mb-6">🎨</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  This IS the Project!
                </h3>
                <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                  This project <strong className="text-purple-400">IS</strong> this very website you're browsing right now! 
                  Look around to see all the features in action.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="text-2xl mb-2">⚡</div>
                    <h4 className="font-semibold text-white mb-1">Smooth Animations</h4>
                    <p className="text-sm text-gray-400">Notice the page transitions and hover effects throughout</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="text-2xl mb-2">📱</div>
                    <h4 className="font-semibold text-white mb-1">Responsive Design</h4>
                    <p className="text-sm text-gray-400">Try resizing your browser or viewing on mobile</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="text-2xl mb-2">🗂️</div>
                    <h4 className="font-semibold text-white mb-1">Project Showcases</h4>
                    <p className="text-sm text-gray-400">This very page shows the detailed project system</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="text-2xl mb-2">📧</div>
                    <h4 className="font-semibold text-white mb-1">Contact Form</h4>
                    <p className="text-sm text-gray-400">Visit the Contact page to see EmailJS integration</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="text-2xl mb-2">📊</div>
                    <h4 className="font-semibold text-white mb-1">GitHub Stats</h4>
                    <p className="text-sm text-gray-400">Check the About page for live GitHub contribution graph</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="text-2xl mb-2">🎨</div>
                    <h4 className="font-semibold text-white mb-1">Custom Animations</h4>
                    <p className="text-sm text-gray-400">Scroll through any page to see fade-in and slide effects</p>
                  </div>
                </div>
                <p className="text-gray-400 mt-8 italic">
                  Navigate through different sections to explore all features mentioned in the tabs above!
                </p>
              </motion.div>
            </div>
          );
        }
        
        // Regular screenshot gallery for other projects
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">Project Screenshots</h2>
              <p className="text-gray-300">
                Browse through screenshots showcasing the modern design and features.
              </p>
            </div>
            
            <ScreenshotGallery 
              screenshots={projectData.screenshots} 
              projectName={projectName}
            />
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">Performance Metrics</h2>
              <p className="text-gray-300">
                {projectData.performance.overview?.philosophy || 
                 "Detailed performance characteristics and benchmarks."}
              </p>
            </div>
            
            <PerformanceMetrics performance={projectData.performance} />
          </div>
        );

      case 'requirements':
        return (
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h2 className="text-3xl font-bold text-white mb-3">System Requirements</h2>
              <p className="text-slate-300">
                Hardware and software requirements for running this project.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.01, y: -3 }}
              className="glass rounded-xl p-6 border border-purple-500/30"
            >
              <h3 className="text-xl font-bold text-white mb-4">Operating Systems</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left text-purple-400 font-semibold py-3 px-4">OS</th>
                      <th className="text-left text-purple-400 font-semibold py-3 px-4">Minimum Version</th>
                      <th className="text-left text-purple-400 font-semibold py-3 px-4">Support</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.requirements.os.map((os, idx) => (
                      <motion.tr 
                        key={idx} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-slate-800/50 hover:bg-purple-500/10 transition-colors"
                      >
                        <td className="py-3 px-4 text-white font-medium">{os.name}</td>
                        <td className="py-3 px-4 text-slate-300">{os.version}</td>
                        <td className="py-3 px-4 text-green-400">{os.support}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="glass rounded-xl p-6 border border-slate-700/50"
              >
                <h3 className="text-xl font-bold text-white mb-4">Minimum Hardware</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-purple-400 font-semibold">CPU:</span>
                    <span className="text-slate-300 ml-2">{projectData.requirements.hardware.minimum.cpu}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-semibold">RAM:</span>
                    <span className="text-slate-300 ml-2">{projectData.requirements.hardware.minimum.ram}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-semibold">Disk:</span>
                    <span className="text-slate-300 ml-2">{projectData.requirements.hardware.minimum.disk}</span>
                  </div>
                  <p className="text-sm text-slate-400 italic mt-3">{projectData.requirements.hardware.minimum.note}</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="glass rounded-xl p-6 border border-green-500/30"
              >
                <h3 className="text-xl font-bold text-white mb-4">Recommended Hardware</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-green-400 font-semibold">CPU:</span>
                    <span className="text-slate-300 ml-2">{projectData.requirements.hardware.recommended.cpu}</span>
                  </div>
                  <div>
                    <span className="text-green-400 font-semibold">RAM:</span>
                    <span className="text-slate-300 ml-2">{projectData.requirements.hardware.recommended.ram}</span>
                  </div>
                  <div>
                    <span className="text-green-400 font-semibold">Disk:</span>
                    <span className="text-slate-300 ml-2">{projectData.requirements.hardware.recommended.disk}</span>
                  </div>
                  <p className="text-sm text-slate-400 italic mt-3">{projectData.requirements.hardware.recommended.note}</p>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.01, y: -3 }}
              className="glass rounded-xl p-6 border border-slate-700/50"
            >
              <h3 className="text-xl font-bold text-white mb-4">Software Dependencies</h3>
              <div className="space-y-3">
                {projectData.requirements.software.map((software, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between glass px-4 py-3 rounded-lg border border-slate-700/50"
                  >
                    <div>
                      <span className="text-white font-medium">{software.name}</span>
                      {software.note && (
                        <span className="text-sm text-slate-400 ml-2">({software.note})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-purple-400">{software.version}</span>
                      <motion.span 
                        whileHover={{ scale: 1.1 }}
                        className={`text-xs px-2 py-1 rounded ${software.required ? 'bg-red-900/30 text-red-400 border border-red-500/50' : 'bg-blue-900/30 text-blue-400 border border-blue-500/50'}`}
                      >
                        {software.required ? 'Required' : 'Optional'}
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {projectData.requirements.browsers && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.01, y: -3 }}
                className="glass rounded-xl p-6 border border-slate-700/50"
              >
                <h3 className="text-xl font-bold text-white mb-4">Browser Compatibility</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {projectData.requirements.browsers.map((browser, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="glass rounded-lg p-4 text-center border border-slate-700/50"
                    >
                      <div className="text-white font-semibold mb-1">{browser.name}</div>
                      <div className="text-sm text-slate-400">{browser.version}</div>
                      <div className="text-xs text-green-400 mt-2">{browser.status}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        );

      case 'issues':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">Known Issues & Limitations</h2>
              <p className="text-gray-300">
                Current limitations and workarounds for known issues.
              </p>
            </div>
            
            <KnownIssuesPanel issues={projectData.knownIssues} />
          </div>
        );

      case 'future':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">Future Enhancements & Roadmap</h2>
              <p className="text-gray-300">
                Planned features and improvements for upcoming versions.
              </p>
            </div>
            
            <FutureRoadmap enhancements={projectData.futureEnhancements} />
          </div>
        );

      default:
        return <div className="text-gray-400">Select a tab to view content.</div>;
    }
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl space-y-6 relative z-10">
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: -20 }}
          animate={isMobile ? false : { opacity: 1, y: 0 }}
          transition={isMobile ? {} : { duration: 0.5 }}
        >
          <motion.button
            onClick={() => navigate('/projects')}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft size={20} /> Back to Projects
          </motion.button>

          <motion.div
            className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-purple-500/20"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div className="flex-1">
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {projectData.title}
                </motion.h1>
                <motion.p
                  className="text-base sm:text-lg lg:text-xl text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {projectData.shortDescription}
                </motion.p>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {projectData.github && (
                  <motion.a
                    href={projectData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg transition-all flex items-center gap-2 text-white text-sm sm:text-base shadow-lg"
                  >
                    <Github size={18} className="sm:w-5 sm:h-5" /> 
                    <span className="hidden sm:inline">GitHub</span>
                    <span className="sm:hidden">Code</span>
                  </motion.a>
                )}
                {projectData.liveDemo && projectData.liveDemo !== 'N/A (Template Project)' && (
                  <motion.a
                    href={projectData.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg transition-all flex items-center gap-2 text-white text-sm sm:text-base shadow-lg"
                  >
                    <ExternalLink size={18} className="sm:w-5 sm:h-5" /> 
                    <span className="hidden sm:inline">Live Demo</span>
                    <span className="sm:hidden">Demo</span>
                  </motion.a>
                )}
              </div>
            </div>

            {projectData.badges && projectData.badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {projectData.badges.map((badge, index) => {
                  const IconComponent = typeof badge.icon === 'string' && badge.icon.length > 2 ? LucideIcons[badge.icon] : null;
                  
                  return (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 glass border border-purple-500/30 text-purple-300 rounded-full text-sm flex items-center gap-2"
                    >
                      {IconComponent ? (
                        <IconComponent className="w-4 h-4" />
                      ) : (
                        <span>{badge.icon}</span>
                      )}
                      <span>{badge.text}</span>
                    </motion.span>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          animate={isMobile ? false : { opacity: 1, y: 0 }}
          transition={isMobile ? {} : { duration: 0.5, delay: 0.2 }}
          className="min-h-[60vh]"
        >
          <div className="glass rounded-xl sm:rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
            {/* Tabs with scroll indicator */}
            <div 
              ref={tabsRef}
              className="border-b border-purple-500/30 overflow-x-auto overflow-y-hidden relative scrollbar-thin"
            >
              {/* Scroll hint for mobile */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900/80 to-transparent pointer-events-none md:hidden z-10"></div>
              <div className="flex min-w-max">
                {tabs.map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    ref={activeTab === tab.id ? activeTabRef : null}
                    onClick={() => setActiveTab(tab.id)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ y: -2 }}
                    className={`px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap text-xs sm:text-sm md:text-base flex-shrink-0 relative ${
                      activeTab === tab.id
                        ? 'text-purple-300 bg-purple-900/30'
                        : 'text-slate-400 hover:text-purple-400 hover:bg-purple-900/10'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 min-h-[50vh]">
              <motion.div
                key={activeTab}
                initial={isMobile ? false : { opacity: 0, x: 20 }}
                animate={isMobile ? false : { opacity: 1, x: 0 }}
                exit={isMobile ? {} : { opacity: 0, x: -20 }}
                transition={isMobile ? {} : { duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
