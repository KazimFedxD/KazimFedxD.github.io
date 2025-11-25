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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass border border-purple-500/30 rounded-lg p-6"
      >
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 3 }}
          >
            <Terminal className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
          </motion.div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Discord Bot Commands</h3>
            <p className="text-slate-300">
              Complete command reference for the Discord bot. Commands use Discord's slash command system.
              Type <code className="ml-1 px-2 py-1 glass rounded text-purple-400">/</code> in Discord
              to see available commands. Some commands require specific permissions.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Command Categories */}
      {Object.entries(commandsByCategory).map(([category, categoryCommands], categoryIdx) => (
        <div key={category} className="space-y-4">
          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIdx * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`glass border rounded-lg p-4 ${getCategoryColor(category)}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="text-2xl">{getCategoryIcon(category)}</span>
                {category}
              </h3>
              <motion.span 
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 glass text-slate-300 rounded-full text-sm font-semibold border border-slate-700/50"
              >
                {categoryCommands.length} {categoryCommands.length === 1 ? 'command' : 'commands'}
              </motion.span>
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
                whileHover={{ scale: 1.02, y: -3 }}
                className="glass border border-slate-700/50 rounded-lg overflow-hidden hover:border-purple-500/50 transition-colors"
              >
                {/* Command Header */}
                <div className="p-4 border-b border-slate-700/50 glass">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <code className="text-lg font-mono text-purple-400 font-bold">
                      /{command.name}
                    </code>
                    {command.permissions && command.permissions !== "None" && (
                      <motion.span 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded border border-orange-500 flex items-center gap-1 flex-shrink-0"
                      >
                        <Shield className="w-3 h-3" />
                        {command.permissions}
                      </motion.span>
                    )}
                  </div>
                  <p className="text-slate-300 text-sm">{command.description}</p>
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
                      <motion.button
                        onClick={() => copyToClipboard(command.usage, `usage-${category}-${cmdIdx}`)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute top-2 right-2 p-1.5 glass hover:bg-slate-600/50 rounded-md transition-colors"
                        title="Copy usage"
                      >
                        {copiedId === `usage-${category}-${cmdIdx}` ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                      </motion.button>
                      <pre className="glass rounded-lg p-3 pr-10 overflow-x-auto border border-slate-700/50">
                        <code className="text-sm text-green-400 font-mono">{command.usage}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Location */}
                  {command.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400">Location:</span>
                      <span className="text-slate-300">{command.location}</span>
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
