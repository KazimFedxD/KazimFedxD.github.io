import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedGradientText = ({ 
  children, 
  className = '', 
  gradient = 'from-purple-400 via-pink-400 to-purple-600',
  animateOnHover = false 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const textVariants = {
    initial: {
      backgroundPosition: '0% 50%',
    },
    animate: isMobile ? {} : {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 5,
        ease: 'linear',
        repeat: Infinity,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] ${className}`}
      style={{
        backgroundSize: '200% 200%',
        textShadow: '0 0 1px rgba(168, 85, 247, 0.5)',
        WebkitTextStroke: '0.5px rgba(168, 85, 247, 0.1)',
      }}
      initial="initial"
      animate="animate"
      whileHover={animateOnHover ? 'hover' : undefined}
      variants={textVariants}
    >
      {children}
    </motion.span>
  );
};

export default AnimatedGradientText;
