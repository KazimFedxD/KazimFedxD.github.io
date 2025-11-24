import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronDown, ChevronRight } from 'lucide-react';
import CodeSnippet from './CodeSnippet';

const SetupGuide = ({ setupSteps }) => {
  const [expandedStep, setExpandedStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setExpandedStep((prev) => {
          const next = prev === null ? 0 : Math.min((prev + 1), setupSteps.length - 1);
          return next;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setExpandedStep((prev) => {
          const next = prev === null ? 0 : Math.max((prev - 1), 0);
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setupSteps.length]);

  useEffect(() => {
    if (expandedStep !== null && stepRefs.current[expandedStep]) {
      // Delay scroll to allow animation to complete
      setTimeout(() => {
        stepRefs.current[expandedStep]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 350);
    }
  }, [expandedStep]);

  return (
    <div className="space-y-6">
      {setupSteps.map((step, index) => (
        <motion.div
          key={index}
          ref={(el) => (stepRefs.current[index] = el)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-xl border border-purple-500/20 overflow-hidden"
        >
          {/* Step Header */}
          <button
            onClick={() => setExpandedStep(expandedStep === index ? null : index)}
            className="w-full flex items-center justify-between p-6 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 transition-all duration-300 border-b border-slate-700/30"
          >
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 text-white font-black shadow-xl shadow-purple-500/50 text-lg"
              >
                {index + 1}
              </motion.div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expandedStep === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {expandedStep === index ? (
                <ChevronDown className="w-6 h-6 text-purple-400" />
              ) : (
                <ChevronRight className="w-6 h-6 text-slate-400" />
              )}
            </motion.div>
          </button>

          {/* Step Content */}
          <AnimatePresence>
            {expandedStep === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6 space-y-4"
              >
                {step.content && (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-slate-300">{step.content}</p>
                  </div>
                )}

                {/* Support both 'commands' array and direct 'code' property */}
                {step.code && (
                  <div className="space-y-3">
                    <CodeSnippet
                      code={step.code}
                      language={step.language || 'bash'}
                      title={step.codeTitle}
                    />
                  </div>
                )}

                {step.commands && (
                  <div className="space-y-3">
                    {step.commands.map((cmd, cmdIdx) => (
                      <div key={cmdIdx}>
                        {cmd.description && (
                          <p className="text-sm text-slate-400 mb-2">{cmd.description}</p>
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
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <span className="text-2xl">🔐</span>
                      Environment Variables
                    </h4>
                    <div className="glass rounded-lg p-4 border-2 border-purple-500/30 shadow-lg shadow-purple-500/10">
                      {step.envVariables.map((envVar, envIdx) => (
                        <div key={envIdx} className="mb-4 last:mb-0">
                          <div className="flex items-center gap-2 mb-1">
                            <code className="text-purple-400 font-mono text-sm">{envVar.key}</code>
                            {envVar.required && (
                              <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded border border-red-500/30">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mb-1">{envVar.description}</p>
                          {envVar.example && (
                            <code className="text-xs text-slate-500 block glass px-2 py-1 rounded border border-slate-700/30">
                              {envVar.example}
                            </code>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step.notes && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/40 rounded-lg p-4 shadow-lg shadow-blue-500/10"
                  >
                    <h4 className="text-sm font-bold text-blue-300 mb-2 flex items-center gap-2">
                      <span className="text-lg">📝</span>
                      Important Notes
                    </h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      {step.notes.map((note, noteIdx) => (
                        <li key={noteIdx} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {step.warnings && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/40 rounded-lg p-4 shadow-lg shadow-yellow-500/10"
                  >
                    <h4 className="text-sm font-bold text-yellow-300 mb-2 flex items-center gap-2">
                      <span className="text-lg">⚠️</span>
                      Warnings
                    </h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      {step.warnings.map((warning, warnIdx) => (
                        <li key={warnIdx} className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default SetupGuide;
