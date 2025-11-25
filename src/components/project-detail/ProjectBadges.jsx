import React from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Eye, Award, Zap, CheckCircle, Clock, Trophy } from 'lucide-react';

const ProjectBadges = ({ badges, stats, techStack }) => {
  // Badge type configurations
  const badgeConfig = {
    'production': { icon: CheckCircle, color: 'from-green-600 to-emerald-600', textColor: 'text-green-100' },
    'development': { icon: Zap, color: 'from-yellow-600 to-orange-600', textColor: 'text-yellow-100' },
    'archived': { icon: Clock, color: 'from-gray-600 to-slate-600', textColor: 'text-gray-100' },
    'award': { icon: Trophy, color: 'from-purple-600 to-pink-600', textColor: 'text-purple-100' },
    'featured': { icon: Star, color: 'from-blue-600 to-cyan-600', textColor: 'text-blue-100' },
  };

  const getBadgeType = (badgeText) => {
    const text = badgeText.toLowerCase();
    if (text.includes('production') || text.includes('ready')) return 'production';
    if (text.includes('development') || text.includes('beta') || text.includes('alpha')) return 'development';
    if (text.includes('archived')) return 'archived';
    if (text.includes('award') || text.includes('winner') || text.includes('🏆')) return 'award';
    if (text.includes('featured')) return 'featured';
    return 'featured'; // default
  };

  return (
    <div className="space-y-6">
      {/* Status Badges */}
      {badges && badges.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {badges.map((badge, index) => {
            const type = getBadgeType(badge.text || badge);
            const config = badgeConfig[type];
            const Icon = config.icon;
            const text = badge.text || badge;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`glass px-4 py-2 rounded-full bg-gradient-to-r ${config.color} border border-white/20 flex items-center gap-2 shadow-lg`}
              >
                <Icon className={`w-4 h-4 ${config.textColor}`} />
                <span className={`text-sm font-semibold ${config.textColor}`}>
                  {text}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* GitHub Stats */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-6 border border-purple-500/20"
        >
          <h3 className="text-lg font-bold text-white mb-4">Project Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.stars !== undefined && (
              <StatCard
                icon={Star}
                label="Stars"
                value={stats.stars}
                color="text-yellow-400"
              />
            )}
            {stats.forks !== undefined && (
              <StatCard
                icon={GitFork}
                label="Forks"
                value={stats.forks}
                color="text-blue-400"
              />
            )}
            {stats.watchers !== undefined && (
              <StatCard
                icon={Eye}
                label="Watchers"
                value={stats.watchers}
                color="text-green-400"
              />
            )}
            {stats.contributors !== undefined && (
              <StatCard
                icon={Award}
                label="Contributors"
                value={stats.contributors}
                color="text-purple-400"
              />
            )}
          </div>
        </motion.div>
      )}

      {/* Tech Stack Badges */}
      {techStack && techStack.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-6 border border-purple-500/20"
        >
          <h3 className="text-lg font-bold text-white mb-4">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.slice(0, 10).map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="glass px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-sm text-purple-200 font-medium"
              >
                {tech.name || tech}
              </motion.span>
            ))}
            {techStack.length > 10 && (
              <span className="px-3 py-1.5 text-sm text-slate-400">
                +{techStack.length - 10} more
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Helper component for stat cards
const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -3 }}
    className="glass rounded-lg p-4 border border-slate-700/50 text-center"
  >
    <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
    <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
    <div className="text-xs text-slate-400 mt-1">{label}</div>
  </motion.div>
);

export default ProjectBadges;
