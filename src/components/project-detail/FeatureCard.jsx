import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const FeatureCard = ({ feature, index }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getIcon = (iconEmoji) => {
    return (
      <motion.div
        className="text-3xl md:text-4xl mb-3 md:mb-4"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        {iconEmoji}
      </motion.div>
    );
  };

  return (
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02}>
      <motion.div
        initial={isMobile ? false : { opacity: 0, y: 20 }}
        animate={isMobile ? false : { opacity: 1, y: 0 }}
        transition={isMobile ? {} : { delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="glass rounded-xl p-4 md:p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all h-full"
      >
        {getIcon(feature.icon)}
      
        <h3 className="text-lg md:text-xl font-bold gradient-text mb-2 md:mb-3">{feature.title}</h3>
      
        <p className="text-sm md:text-base text-slate-300 mb-3 md:mb-4 leading-relaxed">
          {feature.description}
        </p>

        {feature.whyItMatters && (
          <div className="mb-3 md:mb-4">
            <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-2">Why It Matters</h4>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              {feature.whyItMatters}
            </p>
          </div>
        )}

        {feature.howItWorks && (
          <div className="mb-3 md:mb-4">
            <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-2">How It Works</h4>
            <ol className="text-xs md:text-sm text-slate-400 space-y-1 md:space-y-2">
              {feature.howItWorks.map((step, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-purple-500 font-bold flex-shrink-0">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {feature.services && (
          <div className="mt-3 md:mt-4 space-y-2">
            {feature.services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
                className="flex flex-col md:flex-row md:justify-between md:items-center text-xs md:text-sm glass px-2 md:px-3 py-2 rounded gap-1 border border-purple-500/10"
              >
                <span className="text-white font-medium">{service.name}</span>
                <span className="text-slate-400">{service.purpose}</span>
              </motion.div>
            ))}
          </div>
        )}

        {feature.screenshots && feature.screenshots.length > 0 && (
          <motion.div
            className="mt-3 md:mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <img
              src={feature.screenshot || feature.screenshots[0]}
              alt={feature.title}
              loading="lazy"
              className="w-full rounded-lg border border-purple-500/20 shadow-lg"
            />
          </motion.div>
        )}
      </motion.div>
    </Tilt>
  );
};

export default FeatureCard;
