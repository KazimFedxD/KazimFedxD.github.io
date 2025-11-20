import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, Clock } from 'lucide-react';

const KnownIssuesPanel = ({ issues }) => {
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

  return (
    <div className="space-y-6">
      {issues.map((issue, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`rounded-xl p-6 border ${getSeverityColor(issue.severity)}`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              {getSeverityIcon(issue.severity)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-white">{issue.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(issue.severity)}`}>
                  {issue.severity}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4">{issue.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-purple-400 mb-1">Impact</h4>
                  <p className="text-sm text-gray-400">{issue.impact}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-purple-400 mb-1">Workaround</h4>
                  <p className="text-sm text-gray-400">{issue.workaround}</p>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-gray-400">Status:</span>
                  <span className="text-white font-medium">{issue.status}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KnownIssuesPanel;
