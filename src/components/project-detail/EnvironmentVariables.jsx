import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Database, Mail, Server, AlertTriangle } from 'lucide-react';

const EnvironmentVariables = ({ variables }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Variables', icon: Server },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'optional', label: 'Optional', icon: Key },
  ];

  const getSecurityIcon = (level) => {
    const icons = {
      critical: '🔒',
      high: '⚠️',
      medium: '✅',
      low: '📝',
    };
    return icons[level] || '📝';
  };

  const getSecurityColor = (level) => {
    const colors = {
      critical: 'border-red-500 bg-red-500/10',
      high: 'border-orange-500 bg-orange-500/10',
      medium: 'border-yellow-500 bg-yellow-500/10',
      low: 'border-green-500 bg-green-500/10',
    };
    return colors[level] || 'border-gray-500 bg-gray-500/10';
  };

  const filteredVariables = selectedCategory === 'all'
    ? variables
    : variables.filter(v => v.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-purple-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Variables List */}
      <div className="space-y-4">
        {filteredVariables.map((variable, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-lg border-2 p-6 ${getSecurityColor(variable.security)}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{getSecurityIcon(variable.security)}</span>
                  <code className="text-lg font-mono font-bold text-purple-400">
                    {variable.name}
                  </code>
                  {variable.required && (
                    <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded border border-red-500/30">
                      REQUIRED
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-sm">{variable.description}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Type</p>
                <p className="text-sm text-white font-mono">{variable.type}</p>
              </div>
              {variable.format && (
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Format</p>
                  <p className="text-sm text-gray-300 font-mono">{variable.format}</p>
                </div>
              )}
              {variable.default && (
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Default</p>
                  <code className="text-sm text-gray-400 bg-gray-900 px-2 py-1 rounded">
                    {variable.default}
                  </code>
                </div>
              )}
              {variable.example && (
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Example</p>
                  <code className="text-sm text-green-400 bg-gray-900 px-2 py-1 rounded">
                    {variable.example}
                  </code>
                </div>
              )}
            </div>

            {/* Purpose */}
            {variable.purpose && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase mb-1">Purpose</p>
                <p className="text-sm text-gray-300">{variable.purpose}</p>
              </div>
            )}

            {/* Code Usage */}
            {variable.usage && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase mb-2">Usage in Code</p>
                <div className="bg-gray-900 rounded p-3 border border-gray-700">
                  <code className="text-xs text-gray-300 font-mono whitespace-pre">
                    {variable.usage}
                  </code>
                </div>
              </div>
            )}

            {/* Security Notes */}
            {variable.securityNotes && (
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-yellow-400 mb-1">Security Note</p>
                    <p className="text-xs text-gray-300">{variable.securityNotes}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Production Notes */}
            {variable.production && (
              <div className="mt-3 bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 text-sm">🚀</span>
                  <div>
                    <p className="text-xs font-semibold text-blue-400 mb-1">Production</p>
                    <p className="text-xs text-gray-300">{variable.production}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredVariables.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No variables found in this category.
        </div>
      )}
    </div>
  );
};

export default EnvironmentVariables;
