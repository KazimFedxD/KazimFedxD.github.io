import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HireMeCTA = ({ inline = false }) => {
  if (inline) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-gradient p-6 rounded-2xl border-2 border-green-500/50"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <h3 className="text-xl font-bold text-white">Available for Work</h3>
            </div>
            <p className="text-slate-300 font-medium">Looking for remote Backend Development opportunities</p>
          </div>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
            >
              Let's Talk
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50 hidden md:block"
    >
      <Link to="/contact">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-semibold shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-500/70 transition-all duration-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          Hire Me
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default HireMeCTA;
