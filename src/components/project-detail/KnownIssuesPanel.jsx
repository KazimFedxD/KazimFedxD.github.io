import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, Clock, ChevronDown, Wrench, Zap } from 'lucide-react';
import CodeSnippet from './CodeSnippet';

const KnownIssuesPanel = ({ issues }) => {
  const [expandedIssue, setExpandedIssue] = useState(null);

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'text-red-400 border-red-700 bg-red-900/20';
      case 'medium':
        return 'text-yellow-400 border-yellow-700 bg-yellow-900/20';
      case 'low':
        return 'text-blue-400 border-blue-700 bg-blue-900/20';
      default:
        return 'text-gray-400 border-gray-700 bg-gray-900/20';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return <AlertTriangle size={20} className="text-red-400" />;
      case 'medium':
        return <AlertTriangle size={20} className="text-yellow-400" />;
      default:
        return <Info size={20} className="text-blue-400" />;
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const toggleExpand = (idx) => {
    setExpandedIssue(expandedIssue === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {issues.map((issue, idx) => {
        const isExpanded = expandedIssue === idx;
        
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`rounded-xl border ${getSeverityColor(issue.severity)} overflow-hidden`}
          >
            {/* Clickable Header */}
            <button
              onClick={() => toggleExpand(idx)}
              className="w-full p-4 sm:p-6 flex items-start gap-4 hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex-shrink-0 mt-1">
                {getSeverityIcon(issue.severity)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">{issue.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(issue.severity)}`}>
                    {issue.severity}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-3 text-sm sm:text-base">{issue.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-500" />
                    <span className="text-gray-400">Status:</span>
                    <span className="text-white font-medium">{issue.status}</span>
                  </div>
                  
                  {issue.estimatedEffort && (
                    <div className="flex items-center gap-2">
                      <Wrench size={14} className="text-gray-500" />
                      <span className="text-gray-400">Effort:</span>
                      <span className="text-white font-medium">{issue.estimatedEffort}</span>
                    </div>
                  )}
                  
                  {issue.priority && (
                    <span className={`px-2 py-1 rounded border text-xs font-semibold ${getPriorityBadgeColor(issue.priority)}`}>
                      Priority: {issue.priority}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} className="text-gray-400" />
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
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 border-t border-gray-700 space-y-4">
                    {/* Detailed Explanation */}
                    {issue.detailedExplanation && (
                      <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                        <h4 className="text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
                          <Info size={16} />
                          Detailed Explanation
                        </h4>
                        <p className="text-sm text-gray-300">{issue.detailedExplanation}</p>
                      </div>
                    )}

                    {/* Technical Details */}
                    {issue.technicalDetails && (
                      <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                        <h4 className="text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
                          <Zap size={16} />
                          Technical Details
                        </h4>
                        <p className="text-sm text-gray-300">{issue.technicalDetails}</p>
                      </div>
                    )}

                    {/* Why It Happens */}
                    {issue.whyItHappens && (
                      <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                        <h4 className="text-sm font-semibold text-orange-400 mb-2">Why It Happens</h4>
                        <p className="text-sm text-gray-300">{issue.whyItHappens}</p>
                      </div>
                    )}

                    {/* Impact */}
                    <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                      <h4 className="text-sm font-semibold text-red-400 mb-2">Impact</h4>
                      <p className="text-sm text-gray-300">{issue.impact}</p>
                    </div>

                    {/* Workaround */}
                    <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                      <h4 className="text-sm font-semibold text-yellow-400 mb-2">Workaround</h4>
                      <p className="text-sm text-gray-300">{issue.workaround}</p>
                    </div>

                    {/* Proposed Fix */}
                    {issue.proposedFix && (
                      <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-3 sm:p-4">
                        <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                          <Wrench size={16} />
                          Proposed Fix
                        </h4>
                        <p className="text-sm text-gray-300">{issue.proposedFix}</p>
                      </div>
                    )}

                    {/* Code Example */}
                    {issue.codeExample && (
                      <div>
                        <h4 className="text-sm font-semibold text-purple-400 mb-2">Code Example</h4>
                        {typeof issue.codeExample === 'string' ? (
                          <CodeSnippet
                            code={issue.codeExample}
                            language="python"
                            title="Example"
                          />
                        ) : (
                          <CodeSnippet
                            code={issue.codeExample.code}
                            language={issue.codeExample.language}
                            title={issue.codeExample.title}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default KnownIssuesPanel;
