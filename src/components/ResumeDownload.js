import React from 'react';
import { motion } from 'framer-motion';
import { HiDownload } from 'react-icons/hi';

const ResumeDownload = ({ className = '' }) => {
  const handleDownload = () => {
    // For now, this will link to GitHub. You can add actual resume PDF later
    window.open('https://github.com/KazimFedxD', '_blank');
  };

  return (
    <motion.button
      onClick={handleDownload}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 ${className}`}
    >
      <HiDownload className="w-5 h-5" />
      Download Resume
    </motion.button>
  );
};

export default ResumeDownload;
