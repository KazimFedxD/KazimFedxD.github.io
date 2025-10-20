import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';

const GitHubStats = ({ username = 'KazimFedxD' }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, [username]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card-gradient p-4 rounded-xl">
            <div className="h-8 bg-slate-700/50 rounded mb-2"></div>
            <div className="h-4 bg-slate-700/50 rounded w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statItems = [
    { label: 'Public Repos', value: stats.public_repos, icon: '📦' },
    { label: 'Followers', value: stats.followers, icon: '👥' },
    { label: 'Following', value: stats.following, icon: '🤝' },
    { label: 'Public Gists', value: stats.public_gists, icon: '📝' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-gradient p-4 rounded-xl text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="text-3xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* GitHub Profile Link */}
      <motion.a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-2 card-gradient p-4 rounded-xl hover:scale-105 transition-transform duration-300"
      >
        <SiGithub className="w-5 h-5" />
        <span className="font-medium">View Full GitHub Profile</span>
      </motion.a>
    </div>
  );
};

export default GitHubStats;
