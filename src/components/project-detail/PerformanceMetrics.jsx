import React from 'react';
import { motion } from 'framer-motion';

const PerformanceMetrics = ({ performance }) => {
  return (
    <div className="space-y-8">
      {/* Benchmark Overview - For interpreter/language projects */}
      {performance.overview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01, y: -3 }}
          className="glass rounded-xl p-6 border border-purple-500/30"
        >
          <h3 className="text-xl font-bold text-white mb-4">Benchmark Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {performance.overview.benchmarkDate && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="glass rounded-lg p-3 border border-slate-700/50"
              >
                <div className="text-xs text-slate-400 mb-1">Benchmark Date</div>
                <div className="text-white font-medium">{performance.overview.benchmarkDate}</div>
              </motion.div>
            )}
            {performance.overview.interpreterVersion && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="glass rounded-lg p-3 border border-slate-700/50"
              >
                <div className="text-xs text-slate-400 mb-1">Version</div>
                <div className="text-white font-medium">{performance.overview.interpreterVersion}</div>
              </motion.div>
            )}
            {performance.overview.pythonVersion && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="glass rounded-lg p-3 border border-slate-700/50"
              >
                <div className="text-xs text-slate-400 mb-1">Python Version</div>
                <div className="text-white font-medium">{performance.overview.pythonVersion}</div>
              </motion.div>
            )}
            {performance.overview.testEnvironment && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="glass rounded-lg p-3 border border-slate-700/50"
              >
                <div className="text-xs text-slate-400 mb-1">Environment</div>
                <div className="text-white font-medium">{performance.overview.testEnvironment}</div>
              </motion.div>
            )}
          </div>
          {performance.overview.philosophy && (
            <div className="mt-4 p-4 glass rounded-lg border border-purple-500/30">
              <p className="text-slate-300 text-sm italic">{performance.overview.philosophy}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Key Metrics - For interpreter/language projects */}
      {performance.keyMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.01, y: -3 }}
          className="glass rounded-xl p-6 border border-purple-500/30"
        >
          <h3 className="text-xl font-bold text-white mb-4">Key Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(performance.keyMetrics).map(([key, value], idx) => (
              <motion.div 
                key={key} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="glass rounded-lg p-4 text-center border border-slate-700/50"
              >
                <div className="text-2xl font-bold text-purple-400 mb-1">{value}</div>
                <div className="text-xs text-slate-400">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Benchmark Summary - For interpreter/language projects */}
      {performance.benchmarkSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Benchmark Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Benchmark</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Mean Time</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Memory</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Throughput</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Std Dev</th>
                </tr>
              </thead>
              <tbody>
                {performance.benchmarkSummary.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{item.benchmark}</td>
                    <td className="py-3 px-4 text-green-400">{item.meanTime}</td>
                    <td className="py-3 px-4 text-yellow-400">{item.memory}</td>
                    <td className="py-3 px-4 text-purple-400">{item.throughput}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{item.stdDev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Strengths & Bottlenecks - For interpreter/language projects */}
      {(performance.strengths || performance.bottlenecks) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {performance.strengths && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-700">
              <h3 className="text-xl font-bold text-white mb-4">✅ Strengths</h3>
              <ul className="space-y-2">
                {performance.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">▸</span>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {performance.bottlenecks && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-orange-700">
              <h3 className="text-xl font-bold text-white mb-4">⚠️ Bottlenecks</h3>
              <ul className="space-y-2">
                {performance.bottlenecks.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">▸</span>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Language Comparison - For interpreter/language projects */}
      {performance.languageComparison && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Language Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Language</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Implementation</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Relative Speed</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Loop Benchmark</th>
                </tr>
              </thead>
              <tbody>
                {performance.languageComparison.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{item.language}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{item.implementation}</td>
                    <td className="py-3 px-4 text-purple-400">{item.relativeSpeed}</td>
                    <td className="py-3 px-4 text-green-400">{item.loopBenchmark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Scalability - For interpreter/language projects */}
      {performance.scalability && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Scalability Guide</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Lines of Code</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Performance</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Execution Time</th>
                </tr>
              </thead>
              <tbody>
                {performance.scalability.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{item.linesOfCode}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.performance === 'Excellent' ? 'bg-green-900 text-green-300' :
                        item.performance === 'Good' ? 'bg-blue-900 text-blue-300' :
                        item.performance === 'Acceptable' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-red-900 text-red-300'
                      }`}>
                        {item.performance}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{item.executionTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Optimization Opportunities - For interpreter/language projects */}
      {performance.optimizationOpportunities && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Optimization Opportunities</h3>
          <div className="space-y-4">
            {performance.optimizationOpportunities.map((opt, idx) => (
              <div key={idx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-semibold">{opt.name}</h4>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      opt.complexity === 'Low' ? 'bg-green-900 text-green-300' :
                      opt.complexity === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {opt.complexity}
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-purple-900 text-purple-300">
                      {opt.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400">Current: </span>
                    <span className="text-gray-300">{opt.current}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Improved: </span>
                    <span className="text-gray-300">{opt.improved}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-green-400 font-semibold">Benefit: </span>
                  <span className="text-gray-300">{opt.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Use Cases - For interpreter/language projects */}
      {(performance.bestUseCases || performance.notRecommendedFor) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {performance.bestUseCases && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-700">
              <h3 className="text-xl font-bold text-white mb-4">✅ Best Use Cases</h3>
              <ul className="space-y-2">
                {performance.bestUseCases.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {performance.notRecommendedFor && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-700">
              <h3 className="text-xl font-bold text-white mb-4">❌ Not Recommended For</h3>
              <ul className="space-y-2">
                {performance.notRecommendedFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Codebase Metrics - For interpreter/language projects */}
      {performance.codebaseMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Codebase Metrics</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Component</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Value</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Category</th>
                </tr>
              </thead>
              <tbody>
                {performance.codebaseMetrics.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{item.component}</td>
                    <td className="py-3 px-4 text-green-400">{item.value}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Language Features - For interpreter/language projects */}
      {performance.languageFeatures && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Language Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {performance.languageFeatures.map((item, idx) => (
              <div key={idx} className="bg-gray-900/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">{item.count}</div>
                <div className="text-xs text-gray-400 mb-2">{item.feature}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Container Startup Times - Only for web apps */}
      {performance.containerStartup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Container Startup Times</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Service</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Startup Time</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                {performance.containerStartup.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{item.service}</td>
                    <td className="py-3 px-4 text-green-400">{item.time}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
            <p className="text-gray-300 text-sm">
              <span className="text-purple-400 font-semibold">Total Stack Startup: </span>
              ~30-45 seconds on first run, ~10-15 seconds on subsequent runs (cached images)
            </p>
          </div>
        </motion.div>
      )}

      {/* Parse Performance - For libraries/parsers */}
      {performance.parsePerformance && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Parse & Serialization Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Operation</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Iterations</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Avg Time</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Throughput</th>
                </tr>
              </thead>
              <tbody>
                {performance.parsePerformance.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{item.operation}</td>
                    <td className="py-3 px-4 text-gray-400">{item.iterations}</td>
                    <td className="py-3 px-4 text-green-400">{item.avgTime}</td>
                    <td className="py-3 px-4 text-purple-400">{item.throughput}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Round Trip Performance - For libraries */}
      {performance.roundTripPerformance && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Round-Trip Performance (Serialize + Parse)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Data Type</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Iterations</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Total Time</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Avg Time</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Throughput</th>
                </tr>
              </thead>
              <tbody>
                {performance.roundTripPerformance.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{item.dataType}</td>
                    <td className="py-3 px-4 text-gray-400">{item.iterations}</td>
                    <td className="py-3 px-4 text-yellow-400">{item.totalTime}</td>
                    <td className="py-3 px-4 text-green-400">{item.avgTime}</td>
                    <td className="py-3 px-4 text-purple-400">{item.throughput}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Comparison with JSON - For libraries */}
      {performance.comparisonWithJSON && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Comparison with JSON</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="bg-gray-900/50 rounded-lg p-4 border border-purple-700">
              <h4 className="text-purple-400 font-semibold mb-3">FxDC Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Time</span>
                  <span className="text-white font-medium">{performance.comparisonWithJSON.fxdc.totalTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Avg Time</span>
                  <span className="text-white font-medium">{performance.comparisonWithJSON.fxdc.avgTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Throughput</span>
                  <span className="text-purple-400 font-medium">{performance.comparisonWithJSON.fxdc.throughput}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-green-700">
              <h4 className="text-green-400 font-semibold mb-3">JSON Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Time</span>
                  <span className="text-white font-medium">{performance.comparisonWithJSON.json.totalTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Avg Time</span>
                  <span className="text-white font-medium">{performance.comparisonWithJSON.json.avgTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Throughput</span>
                  <span className="text-green-400 font-medium">{performance.comparisonWithJSON.json.throughput}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-900/50 rounded-lg border border-yellow-700">
            <p className="text-gray-300 text-sm">
              <span className="text-yellow-400 font-semibold">Performance Difference: </span>
              {performance.comparisonWithJSON.difference}
            </p>
          </div>
        </motion.div>
      )}

      {/* Large File Handling - For libraries */}
      {performance.largeFileHandling && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Large File Handling</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">File Size</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Tokenization</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Parsing</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Total Time</th>
                </tr>
              </thead>
              <tbody>
                {performance.largeFileHandling.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{item.size}</td>
                    <td className="py-3 px-4 text-green-400">{item.tokenization}</td>
                    <td className="py-3 px-4 text-yellow-400">{item.parsing}</td>
                    <td className="py-3 px-4 text-purple-400">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* API Response Times - Only for web apps */}
      {performance.apiResponseTimes && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">API Response Times</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Endpoint</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">Average</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">P95</th>
                  <th className="text-left text-purple-400 font-semibold py-3 px-4">P99</th>
                </tr>
              </thead>
              <tbody>
                {performance.apiResponseTimes.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 text-white font-mono text-sm">{item.endpoint}</td>
                    <td className="py-3 px-4 text-green-400">{item.avg}</td>
                    <td className="py-3 px-4 text-yellow-400">{item.p95}</td>
                    <td className="py-3 px-4 text-orange-400">{item.p99}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Frontend Metrics - Only for web apps */}
      {performance.frontendMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Frontend Performance</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Development Mode */}
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h4 className="text-purple-400 font-semibold mb-3">Development Mode</h4>
              <div className="space-y-2">
                {Object.entries(performance.frontendMetrics.development).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-gray-400 uppercase text-xs">{key}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Mode */}
            <div className="bg-gray-900/50 rounded-lg p-4 border border-green-700">
              <h4 className="text-green-400 font-semibold mb-3">Production Mode</h4>
              <div className="space-y-2">
                {Object.entries(performance.frontendMetrics.production).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-gray-400 uppercase text-xs">{key}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bundle Size - Only for web apps */}
      {performance.bundleSize && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Bundle Size (Production)</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {performance.bundleSize.mainJS}
              </div>
              <div className="text-xs text-gray-400">Main JS</div>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {performance.bundleSize.mainJSGzipped}
              </div>
              <div className="text-xs text-gray-400">Main JS (Gzipped)</div>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {performance.bundleSize.css}
              </div>
              <div className="text-xs text-gray-400">CSS</div>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {performance.bundleSize.totalGzipped}
              </div>
              <div className="text-xs text-gray-400">Total (Gzipped)</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Performance Notes - For all project types */}
      {performance.notes && performance.notes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Performance Notes</h3>
          <div className="space-y-3">
            {performance.notes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-purple-400 text-lg mt-1">•</span>
                <p className="text-gray-300 text-sm leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PerformanceMetrics;
