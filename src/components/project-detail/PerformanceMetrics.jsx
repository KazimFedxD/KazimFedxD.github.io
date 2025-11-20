import React from 'react';
import { motion } from 'framer-motion';

const PerformanceMetrics = ({ performance }) => {
  return (
    <div className="space-y-8">
      {/* Container Startup Times */}
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

      {/* API Response Times */}
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

      {/* Frontend Metrics */}
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

      {/* Bundle Size */}
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
    </div>
  );
};

export default PerformanceMetrics;
