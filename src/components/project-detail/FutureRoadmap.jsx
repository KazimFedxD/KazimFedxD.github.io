import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Clock, ChevronDown, Target, Lightbulb, Code, TrendingUp, Zap } from 'lucide-react';
import CodeSnippet from './CodeSnippet';

const FutureRoadmap = ({ enhancements }) => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'low':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'hard':
        return 'text-red-400 bg-red-500/20 border-red-500/50';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const toggleExpand = (versionIdx, featureIdx) => {
    const key = `${versionIdx}-${featureIdx}`;
    setExpandedFeature(expandedFeature === key ? null : key);
  };

  return (
    <div className="space-y-8">
      {enhancements.map((version, versionIdx) => (
        <motion.div
          key={versionIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: versionIdx * 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700"
        >
          {/* Version Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-gray-700 gap-3">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Rocket className="text-purple-400" size={24} />
                <h3 className="text-xl sm:text-2xl font-bold text-white">Version {version.version}</h3>
              </div>
              <p className="text-purple-400 font-semibold text-sm sm:text-base">{version.theme}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={16} />
              <span className="text-xs sm:text-sm">{version.timeline}</span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            {version.features.map((feature, featureIdx) => {
              const isExpanded = expandedFeature === `${versionIdx}-${featureIdx}`;
              
              return (
                <div
                  key={featureIdx}
                  className="bg-gray-900/50 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors overflow-hidden"
                >
                  {/* Clickable Feature Header */}
                  <button
                    onClick={() => toggleExpand(versionIdx, featureIdx)}
                    className="w-full p-3 sm:p-4 flex items-start gap-3 hover:bg-white/5 transition-colors text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="text-white font-semibold text-sm sm:text-base">{feature.name}</h4>
                        
                        {feature.priority && (
                          <span className={`px-2 py-1 rounded border text-xs font-semibold ${getPriorityColor(feature.priority)}`}>
                            {feature.priority}
                          </span>
                        )}
                        
                        {feature.difficulty && (
                          <span className={`px-2 py-1 rounded border text-xs font-semibold ${getDifficultyColor(feature.difficulty)}`}>
                            {feature.difficulty}
                          </span>
                        )}
                      </div>
                      
                      {feature.description && (
                        <p className="text-gray-400 text-xs sm:text-sm mb-2">{feature.description}</p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        {feature.effort && (
                          <span>Effort: {feature.effort}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={20} className="text-gray-400" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0 border-t border-gray-700 space-y-3 sm:space-y-4">
                          {/* Why We Need It */}
                          {feature.whyWeNeed && (
                            <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                              <h5 className="text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
                                <Target size={16} />
                                Why We Need This
                              </h5>
                              <p className="text-sm text-gray-300">{feature.whyWeNeed}</p>
                            </div>
                          )}

                          {/* How to Implement */}
                          {feature.howToImplement && (
                            <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                              <h5 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                                <Code size={16} />
                                Implementation Guide
                              </h5>
                              {typeof feature.howToImplement === 'string' ? (
                                // If it's a string, split by ". " to separate steps (handles "1. Step one. 2. Step two." format)
                                feature.howToImplement.includes('. ') && /^\d+\./.test(feature.howToImplement) ? (
                                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                                    {feature.howToImplement
                                      .split(/\d+\.\s+/)
                                      .filter(step => step.trim())
                                      .map((step, stepIdx) => (
                                        <li key={stepIdx}>{step.replace(/\.\s*$/, '').trim()}</li>
                                      ))
                                    }
                                  </ol>
                                ) : (
                                  <p className="text-sm text-gray-300">{feature.howToImplement}</p>
                                )
                              ) : Array.isArray(feature.howToImplement) ? (
                                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                                  {feature.howToImplement.map((step, stepIdx) => (
                                    <li key={stepIdx}>{step}</li>
                                  ))}
                                </ol>
                              ) : null}
                            </div>
                          )}

                          {/* Benefits */}
                          {feature.benefits && (
                            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-3 sm:p-4">
                              <h5 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                                <TrendingUp size={16} />
                                Benefits
                              </h5>
                              {Array.isArray(feature.benefits) ? (
                                <ul className="space-y-1 text-sm text-gray-300">
                                  {feature.benefits.map((benefit, benefitIdx) => (
                                    <li key={benefitIdx} className="flex items-start gap-2">
                                      <span className="text-green-400 mt-0.5">✓</span>
                                      <span>{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-gray-300">{feature.benefits}</p>
                              )}
                            </div>
                          )}

                          {/* Impact on Project */}
                          {feature.impactOnProject && (
                            <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-3 sm:p-4">
                              <h5 className="text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
                                <Zap size={16} />
                                Impact on Project
                              </h5>
                              <p className="text-sm text-gray-300">{feature.impactOnProject}</p>
                            </div>
                          )}

                          {/* Code Snippet */}
                          {feature.codeSnippet && (
                            <div>
                              <h5 className="text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
                                <Code size={16} />
                                Code Example
                              </h5>
                              {typeof feature.codeSnippet === 'string' ? (
                                <CodeSnippet
                                  code={feature.codeSnippet}
                                  language="python"
                                  title="Implementation Example"
                                />
                              ) : (
                                <CodeSnippet
                                  code={feature.codeSnippet.code}
                                  language={feature.codeSnippet.language}
                                  title={feature.codeSnippet.title}
                                />
                              )}
                            </div>
                          )}

                          {/* Difficulty Explanation */}
                          {feature.difficulty && (
                            <div className="flex items-start gap-2 text-xs text-gray-400 bg-gray-800/30 rounded p-2">
                              <Lightbulb size={14} className="mt-0.5 flex-shrink-0" />
                              <span>
                                <strong className="text-white">Difficulty Rating:</strong> This feature is rated as{' '}
                                <span className={getDifficultyColor(feature.difficulty).split(' ')[0]}>
                                  {feature.difficulty}
                                </span>
                                {feature.effort && ` and estimated to take ${feature.effort}`}.
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FutureRoadmap;
