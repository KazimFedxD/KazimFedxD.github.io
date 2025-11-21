import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, Shield, MapPin } from 'lucide-react';

const CommandReference = ({ commands }) => {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Group commands by category
  const commandsByCategory = commands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  const getCategoryColor = (category) => {
    const colors = {
      'Moderator': 'from-red-500/20 to-orange-500/20 border-red-500/30',
      'Games': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      'Utility': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      'Fun': 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
      'Math': 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
      'API Integration': 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30',
      'Context Menu': 'from-teal-500/20 to-cyan-500/20 border-teal-500/30',
    };
    return colors[category] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Moderator': '🛡️',
      'Games': '🎮',
      'Utility': '🔧',
      'Fun': '🎉',
      'Math': '🔢',
      'API Integration': '🌐',
      'Context Menu': '📋',
    };
    return icons[category] || '⚡';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <Terminal className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Discord Bot Commands</h3>
            <p className="text-gray-300">
              Complete command reference for the Discord bot. Commands use Discord's slash command system.
              Type <code className="ml-1 px-2 py-1 bg-gray-800 rounded text-purple-400">/</code> in Discord
              to see available commands. Some commands require specific permissions.
            </p>
          </div>
        </div>
      </div>

      {/* Command Categories */}
      {Object.entries(commandsByCategory).map(([category, categoryCommands], categoryIdx) => (
        <div key={category} className="space-y-4">
          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIdx * 0.1 }}
            className={`bg-gradient-to-r ${getCategoryColor(category)} border rounded-lg p-4`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="text-2xl">{getCategoryIcon(category)}</span>
                {category}
              </h3>
              <span className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm font-semibold">
                {categoryCommands.length} {categoryCommands.length === 1 ? 'command' : 'commands'}
              </span>
            </div>
          </motion.div>

          {/* Commands Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {categoryCommands.map((command, cmdIdx) => (
              <motion.div
                key={`${category}-${cmdIdx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (categoryIdx * 0.1) + (cmdIdx * 0.05) }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-purple-500/50 transition-colors"
              >
                {/* Command Header */}
                <div className="p-4 border-b border-gray-700 bg-gray-900/50">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <code className="text-lg font-mono text-purple-400 font-bold">
                      /{command.name}
                    </code>
                    {command.permissions && command.permissions !== "None" && (
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded border border-orange-500 flex items-center gap-1 flex-shrink-0">
                        <Shield className="w-3 h-3" />
                        {command.permissions}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm">{command.description}</p>
                </div>

                {/* Command Body */}
                <div className="p-4 space-y-3">
                  {/* Usage */}
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-blue-400" />
                      Usage
                    </h4>
                    <div className="relative">
                      <button
                        onClick={() => copyToClipboard(command.usage, `usage-${category}-${cmdIdx}`)}
                        className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                        title="Copy usage"
                      >
                        {copiedId === `usage-${category}-${cmdIdx}` ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                      <pre className="bg-gray-900 rounded-lg p-3 pr-10 overflow-x-auto border border-gray-700">
                        <code className="text-sm text-green-400 font-mono">{command.usage}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Location */}
                  {command.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">Location:</span>
                      <span className="text-gray-300">{command.location}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommandReference;
