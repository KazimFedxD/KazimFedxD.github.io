import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiGithub, FiExternalLink, FiArrowLeft } from 'react-icons/fi';

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [projectData, setProjectData] = useState(null);
  const [markdownContent, setMarkdownContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview', file: 'overview.md' },
    { id: 'features', label: 'Features', file: 'features.md' },
    { id: 'architecture', label: 'Architecture', file: 'architecture.md' },
    { id: 'setup', label: 'Setup & Config', file: 'setup.md' },
    { id: 'performance', label: 'Performance', file: 'performance.md' },
    { id: 'requirements', label: 'Requirements', file: 'requirements.md' },
    { id: 'env-vars', label: 'Environment', file: 'environment-variables.md' },
    { id: 'issues', label: 'Known Issues', file: 'known-issues.md' },
    { id: 'awards', label: 'Awards', file: 'awards.md' },
    { id: 'future', label: 'Roadmap', file: 'future.md' },
    { id: 'media', label: 'Media', file: 'media.md' },
  ];

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        setLoading(true);
        
        // Load metadata.json
        const metadataResponse = await fetch(`/projects/${projectName}/metadata.json`);
        if (!metadataResponse.ok) {
          throw new Error('Project not found');
        }
        const metadata = await metadataResponse.json();
        setProjectData(metadata);

        // Load all markdown files
        const markdownPromises = tabs.map(async (tab) => {
          try {
            const response = await fetch(`/projects/${projectName}/${tab.file}`);
            if (response.ok) {
              const text = await response.text();
              return { [tab.id]: text };
            }
            return { [tab.id]: null };
          } catch (err) {
            return { [tab.id]: null };
          }
        });

        const markdownResults = await Promise.all(markdownPromises);
        const markdownData = Object.assign({}, ...markdownResults);
        setMarkdownContent(markdownData);

        setLoading(false);
      } catch (err) {
        console.error('Error loading project:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadProjectData();
  }, [projectName]);

  // Custom markdown components for better rendering
  const markdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          className="rounded-lg my-4"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-purple-900/30 px-2 py-1 rounded text-purple-300" {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 gradient-text">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-8 mb-4 text-purple-300">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-6 mb-3 text-purple-400">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-4 mb-2 text-purple-500">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:text-purple-300 underline"
      >
        {children}
      </a>
    ),
    img: ({ src, alt }) => (
      <img
        src={`/projects/${projectName}/${src}`}
        alt={alt}
        className="rounded-lg my-6 max-w-full h-auto shadow-2xl"
        loading="lazy"
      />
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 italic my-4 text-gray-400">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-purple-800">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-purple-900/50">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody>{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="border-b border-purple-800">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 text-left text-purple-300 font-semibold">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 text-gray-300">{children}</td>
    ),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-purple-300 text-xl">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">Error Loading Project</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
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
            <FiArrowLeft /> Back to Projects
          </button>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-800/30">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
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
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <FiGithub /> GitHub
                  </a>
                )}
                {projectData.liveDemo && projectData.liveDemo !== 'N/A (Template Project)' && (
                  <a
                    href={projectData.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Badges */}
            {projectData.badges && projectData.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {projectData.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-800/50 text-purple-300 rounded-full text-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {/* Tech Stack */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {projectData.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm border border-purple-800/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Features */}
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-3">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {projectData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-gray-300"
                  >
                    <span className="text-purple-400 mt-1">•</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-800/30 overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-purple-800/30 overflow-x-auto">
              <div className="flex min-w-max">
                {tabs.map((tab) => {
                  // Only show tab if content exists
                  if (!markdownContent[tab.id]) return null;
                  
                  return (
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
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="prose prose-invert max-w-none"
              >
                {markdownContent[activeTab] ? (
                  <ReactMarkdown components={markdownComponents}>
                    {markdownContent[activeTab]}
                  </ReactMarkdown>
                ) : (
                  <p className="text-gray-400 italic">No content available for this section.</p>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
