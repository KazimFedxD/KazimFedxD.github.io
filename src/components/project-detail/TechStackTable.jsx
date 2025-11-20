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
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-bold text-purple-400 mb-4">{category}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupedStack[category].map((tech, techIdx) => (
              <div
                key={techIdx}
                className="flex items-center justify-between bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors"
              >
                <span className="text-white font-medium">{tech.name}</span>
                {tech.version && (
                  <span className="text-sm text-gray-400">v{tech.version}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TechStackTable;
