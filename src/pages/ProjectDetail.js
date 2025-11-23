import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
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

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed">
                {projectData.overview.description}
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Problem Statement</h3>
              {projectData.overview.problemIntro && (
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  {projectData.overview.problemIntro}
                </p>
              )}
              <ul className="space-y-3">
                {projectData.overview.problemStatement.map((problem, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1 text-lg">•</span>
                    <span className="text-gray-300 text-sm sm:text-base">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

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

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">What Makes This Project Unique</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectData.overview.uniqueFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                  >
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                    <ul className="space-y-2">
                      {feature.points.map((point, pointIdx) => (
                        <li key={pointIdx} className="flex items-start gap-2 text-sm">
                          <span className="text-purple-400 mt-1">✓</span>
                          <span className="text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">Target Audience</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projectData.overview.targetAudience.map((audience, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-300">
                    <span className="text-purple-400">→</span>
                    <span>{audience}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">Use Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {projectData.overview.useCases.map((useCase, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-700 text-gray-300"
                  >
                    {useCase}
                  </div>
                ))}
              </div>
            </div>
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

            {projectData.setupSteps?.map((step, idx) => (
              <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300 mb-4">{step.description}</p>
                    
                    {step.code && (
                      <CodeSnippet 
                        title={step.codeTitle || "Code"}
                        code={step.code}
                        language={step.language || "bash"}
                      />
                    )}

                    {step.notes && (
                      <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <p className="text-sm text-blue-300">{step.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-3">System Requirements</h2>
              <p className="text-gray-300">
                Hardware and software requirements for running this project.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Operating Systems</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-purple-400 font-semibold py-3 px-4">OS</th>
                      <th className="text-left text-purple-400 font-semibold py-3 px-4">Minimum Version</th>
                      <th className="text-left text-purple-400 font-semibold py-3 px-4">Support</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.requirements.os.map((os, idx) => (
                      <tr key={idx} className="border-b border-gray-800">
                        <td className="py-3 px-4 text-white font-medium">{os.name}</td>
                        <td className="py-3 px-4 text-gray-300">{os.version}</td>
                        <td className="py-3 px-4 text-green-400">{os.support}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Minimum Hardware</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-purple-400 font-semibold">CPU:</span>
                    <span className="text-gray-300 ml-2">{projectData.requirements.hardware.minimum.cpu}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-semibold">RAM:</span>
                    <span className="text-gray-300 ml-2">{projectData.requirements.hardware.minimum.ram}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-semibold">Disk:</span>
                    <span className="text-gray-300 ml-2">{projectData.requirements.hardware.minimum.disk}</span>
                  </div>
                  <p className="text-sm text-gray-400 italic mt-3">{projectData.requirements.hardware.minimum.note}</p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-700">
                <h3 className="text-xl font-bold text-white mb-4">Recommended Hardware</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-green-400 font-semibold">CPU:</span>
                    <span className="text-gray-300 ml-2">{projectData.requirements.hardware.recommended.cpu}</span>
                  </div>
                  <div>
                    <span className="text-green-400 font-semibold">RAM:</span>
                    <span className="text-gray-300 ml-2">{projectData.requirements.hardware.recommended.ram}</span>
                  </div>
                  <div>
                    <span className="text-green-400 font-semibold">Disk:</span>
                    <span className="text-gray-300 ml-2">{projectData.requirements.hardware.recommended.disk}</span>
                  </div>
                  <p className="text-sm text-gray-400 italic mt-3">{projectData.requirements.hardware.recommended.note}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Software Dependencies</h3>
              <div className="space-y-3">
                {projectData.requirements.software.map((software, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-700"
                  >
                    <div>
                      <span className="text-white font-medium">{software.name}</span>
                      {software.note && (
                        <span className="text-sm text-gray-400 ml-2">({software.note})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-purple-400">{software.version}</span>
                      <span className={`text-xs px-2 py-1 rounded ${software.required ? 'bg-red-900/30 text-red-400' : 'bg-blue-900/30 text-blue-400'}`}>
                        {software.required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {projectData.requirements.browsers && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Browser Compatibility</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {projectData.requirements.browsers.map((browser, idx) => (
                    <div key={idx} className="bg-gray-900/50 rounded-lg p-4 text-center border border-gray-700">
                      <div className="text-white font-semibold mb-1">{browser.name}</div>
                      <div className="text-sm text-gray-400">{browser.version}</div>
                      <div className="text-xs text-green-400 mt-2">{browser.status}</div>
                    </div>
                  ))}
                </div>
              </div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-20 sm:pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl space-y-6">
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: -20 }}
          animate={isMobile ? false : { opacity: 1, y: 0 }}
          transition={isMobile ? {} : { duration: 0.5 }}
        >
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft size={20} /> Back to Projects
          </button>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-purple-800/30">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                  {projectData.title}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-300">
                  {projectData.shortDescription}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {projectData.github && (
                  <a
                    href={projectData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2 text-white text-sm sm:text-base"
                  >
                    <Github size={18} className="sm:w-5 sm:h-5" /> 
                    <span className="hidden sm:inline">GitHub</span>
                    <span className="sm:hidden">Code</span>
                  </a>
                )}
                {projectData.liveDemo && projectData.liveDemo !== 'N/A (Template Project)' && (
                  <a
                    href={projectData.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2 text-white text-sm sm:text-base"
                  >
                    <ExternalLink size={18} className="sm:w-5 sm:h-5" /> 
                    <span className="hidden sm:inline">Live Demo</span>
                    <span className="sm:hidden">Demo</span>
                  </a>
                )}
              </div>
            </div>

            {projectData.badges && projectData.badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {projectData.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-800/50 text-purple-300 rounded-full text-sm flex items-center gap-2"
                  >
                    <span>{badge.icon}</span>
                    <span>{badge.text}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          animate={isMobile ? false : { opacity: 1, y: 0 }}
          transition={isMobile ? {} : { duration: 0.5, delay: 0.2 }}
          className="min-h-[60vh]"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl border border-purple-800/30 overflow-hidden">
            {/* Mobile-friendly tabs with visible scroll indicator */}
            <div className="border-b border-purple-800/30 overflow-x-auto overflow-y-hidden relative">
              {/* Scroll hint for mobile */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900/80 to-transparent pointer-events-none md:hidden z-10"></div>
              <div className="flex min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-colors whitespace-nowrap text-xs sm:text-sm md:text-base flex-shrink-0 ${
                      activeTab === tab.id
                        ? 'text-purple-300 border-b-2 border-purple-500 bg-purple-900/30'
                        : 'text-gray-400 hover:text-purple-400 hover:bg-purple-900/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 min-h-[50vh]">
              <motion.div
                key={activeTab}
                initial={isMobile ? false : { opacity: 0, x: 20 }}
                animate={isMobile ? false : { opacity: 1, x: 0 }}
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
