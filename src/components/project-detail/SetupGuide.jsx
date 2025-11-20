import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';
import CodeSnippet from './CodeSnippet';

const SetupGuide = ({ setupSteps }) => {
  const [expandedStep, setExpandedStep] = useState(0);

  return (
    <div className="space-y-6">
      {setupSteps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
        >
          {/* Step Header */}
          <button
            onClick={() => setExpandedStep(expandedStep === index ? null : index)}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold">
                {index + 1}
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </div>
            {expandedStep === index ? (
              <ChevronDown className="w-6 h-6 text-purple-400" />
            ) : (
              <ChevronRight className="w-6 h-6 text-gray-400" />
            )}
          </button>

          {/* Step Content */}
          {expandedStep === index && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 pb-6 space-y-4"
            >
              {step.content && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300">{step.content}</p>
                </div>
              )}

              {step.commands && (
                <div className="space-y-3">
                  {step.commands.map((cmd, cmdIdx) => (
                    <div key={cmdIdx}>
                      {cmd.description && (
                        <p className="text-sm text-gray-400 mb-2">{cmd.description}</p>
                      )}
                      <CodeSnippet
                        code={cmd.code}
                        language={cmd.language || 'bash'}
                      />
                    </div>
                  ))}
                </div>
              )}

              {step.envVariables && (
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Environment Variables</h4>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    {step.envVariables.map((envVar, envIdx) => (
                      <div key={envIdx} className="mb-4 last:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-purple-400 font-mono text-sm">{envVar.key}</code>
                          {envVar.required && (
                            <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-1">{envVar.description}</p>
                        {envVar.example && (
                          <code className="text-xs text-gray-500 block bg-gray-950 px-2 py-1 rounded">
                            {envVar.example}
                          </code>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step.notes && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">📝 Important Notes</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {step.notes.map((note, noteIdx) => (
                      <li key={noteIdx} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {step.warnings && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-yellow-400 mb-2">⚠️ Warnings</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {step.warnings.map((warning, warnIdx) => (
                      <li key={warnIdx} className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default SetupGuide;
