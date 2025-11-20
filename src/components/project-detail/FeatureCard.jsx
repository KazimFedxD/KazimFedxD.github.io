import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ feature, index }) => {
  const getIcon = (iconEmoji) => {
    return (
      <div className="text-4xl mb-4">
        {iconEmoji}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
    >
      {getIcon(feature.icon)}
      
      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
      
      <p className="text-gray-300 mb-4 leading-relaxed">
        {feature.description}
      </p>

      {feature.whyItMatters && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-purple-400 mb-2">Why It Matters</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            {feature.whyItMatters}
          </p>
        </div>
      )}

      {feature.howItWorks && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-purple-400 mb-2">How It Works</h4>
          <ol className="text-sm text-gray-400 space-y-2">
            {feature.howItWorks.map((step, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-purple-500 font-bold">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {feature.services && (
        <div className="mt-4 space-y-2">
          {feature.services.map((service, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm bg-gray-900/50 px-3 py-2 rounded">
              <span className="text-white font-medium">{service.name}</span>
              <span className="text-gray-400">{service.purpose}</span>
            </div>
          ))}
        </div>
      )}

      {feature.screenshots && feature.screenshots.length > 0 && (
        <div className="mt-4">
          <img
            src={feature.screenshot || feature.screenshots[0]}
            alt={feature.title}
            className="w-full rounded-lg border border-gray-700"
          />
        </div>
      )}
    </motion.div>
  );
};

export default FeatureCard;
