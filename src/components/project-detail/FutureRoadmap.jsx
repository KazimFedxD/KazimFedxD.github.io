import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Clock } from 'lucide-react';

const FutureRoadmap = ({ enhancements }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {enhancements.map((version, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          {/* Version Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Rocket className="text-purple-400" size={24} />
                <h3 className="text-2xl font-bold text-white">Version {version.version}</h3>
              </div>
              <p className="text-purple-400 font-semibold">{version.theme}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={16} />
              <span className="text-sm">{version.timeline}</span>
            </div>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {version.features.map((feature, featureIdx) => (
              <div
                key={featureIdx}
                className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-semibold text-sm flex-1">{feature.name}</h4>
                  <span className={`text-xs font-semibold ${getPriorityColor(feature.priority)}`}>
                    {feature.priority}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Estimated: {feature.effort}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FutureRoadmap;
