import React from 'react';
import { motion } from 'framer-motion';
import { HiDownload } from 'react-icons/hi';

const ResumeDownload = ({ className = '' }) => {
  const handleDownload = () => {
    // Create a link to download the resume PDF from the public folder
    const link = document.createElement('a');
    link.href = '/Kazim Abbas CV.pdf';
    link.download = 'Kazim_Abbas_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
