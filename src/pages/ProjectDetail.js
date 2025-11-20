import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { fullStackTemplateData } from '../data/fullstack-template-data';
import FeatureCard from '../components/project-detail/FeatureCard';
import TechStackTable from '../components/project-detail/TechStackTable';
import CodeSnippet from '../components/project-detail/CodeSnippet';
import PerformanceMetrics from '../components/project-detail/PerformanceMetrics';
import KnownIssuesPanel from '../components/project-detail/KnownIssuesPanel';
import FutureRoadmap from '../components/project-detail/FutureRoadmap';
import ScreenshotGallery from '../components/project-detail/ScreenshotGallery';

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // For now, we only have Full-Stack-Template data
  const projectData = projectName === 'Full-Stack-Template' 
    ? fullStackTemplateData 
    : null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'screenshots', label: 'Screenshots' },
    { id: 'performance', label: 'Performance' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'issues', label: 'Known Issues' },
    { id: 'future', label: 'Roadmap' },
  ];

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

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">Problem Statement</h3>
              <p className="text-gray-300 mb-4">
                Starting a new full-stack web application involves significant overhead:
              </p>
              <ul className="space-y-3">
                {projectData.overview.problemStatement.map((problem, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-gray-300">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

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
              <p className="text-gray-300 text-lg">
                This full-stack application follows a modern microservices-inspired architecture.
              </p>
            </div>

            <TechStackTable techStack={projectData.techStack} />

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">Service Architecture</h3>
              <p className="text-gray-300 mb-4">The application consists of 7 containerized services:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectData.features.find(f => f.id === 4)?.services?.map((service, idx) => (
                  <div key={idx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-white">{service.name}</h4>
                      {service.port !== '-' && (
                        <span className="text-sm text-purple-400">Port {service.port}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{service.purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'screenshots':
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
              projectName="FullStack-Template"
            />
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">Performance Metrics</h2>
              <p className="text-gray-300">
                Detailed performance characteristics including load times and API response times.
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors"
          >
            <ArrowLeft size={20} /> Back to Projects
          </button>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-800/30">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                  {projectData.title}
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                  {projectData.shortDescription}
                </p>
              </div>
              <div className="flex gap-3">
                {projectData.github && (
                  <a
                    href={projectData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2 text-white"
                  >
                    <Github size={20} /> GitHub
                  </a>
                )}
                {projectData.liveDemo && projectData.liveDemo !== 'N/A (Template Project)' && (
                  <a
                    href={projectData.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2 text-white"
                  >
                    <ExternalLink size={20} /> Live Demo
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-800/30 overflow-hidden">
            <div className="border-b border-purple-800/30 overflow-x-auto">
              <div className="flex min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
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

            <div className="p-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
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
