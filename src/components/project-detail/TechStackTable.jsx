import React from 'react';
import { motion } from 'framer-motion';

const TechStackTable = ({ techStack }) => {
  // Group by category
  const groupedStack = techStack.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {});

  const categories = Object.keys(groupedStack);

  return (
    <div className="space-y-6">
      {categories.map((category, idx) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="glass rounded-xl p-6 border border-purple-500/20"
        >
          <h3 className="text-lg font-bold text-purple-400 mb-4">{category}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupedStack[category].map((tech, techIdx) => (
              <motion.div
                key={techIdx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 + techIdx * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="glass flex items-center justify-between px-4 py-3 rounded-lg border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <span className="text-white font-medium">{tech.name}</span>
                {tech.version && (
                  <span className="text-sm text-slate-400 px-2 py-1 rounded bg-purple-600/20 border border-purple-500/30">v{tech.version}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TechStackTable;
