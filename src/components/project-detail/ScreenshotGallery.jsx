import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const ScreenshotGallery = ({ screenshots, projectName }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {screenshots.map((screenshot, idx) => (
          <motion.div
            key={idx}
            initial={isMobile ? false : { opacity: 0, scale: 0.9 }}
            animate={isMobile ? false : { opacity: 1, scale: 1 }}
            transition={isMobile ? {} : { delay: idx * 0.05 }}
            className="group relative bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer"
            onClick={() => openLightbox(idx)}
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={`/screenshots/${projectName}/${screenshot.filename}`}
                alt={screenshot.caption}
                loading="lazy"
                className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Overlay - only on desktop */}
              {!isMobile && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white" size={32} />
                </div>
              )}
            </div>
            
            <div className="p-3 md:p-4">
              <p className="text-xs md:text-sm text-gray-300 line-clamp-2">{screenshot.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isMobile ? 0.2 : 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 md:p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-white hover:text-purple-400 transition-colors z-10 p-2 bg-gray-800/50 rounded-lg"
            >
              <X size={isMobile ? 24 : 32} />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-2 md:left-4 text-white hover:text-purple-400 transition-colors z-10 p-2 bg-gray-800/50 rounded-lg"
            >
              <ChevronLeft size={isMobile ? 32 : 48} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 md:right-4 text-white hover:text-purple-400 transition-colors z-10 p-2 bg-gray-800/50 rounded-lg"
            >
              <ChevronRight size={isMobile ? 32 : 48} />
            </button>

            {/* Image */}
            <motion.div
              initial={isMobile ? false : { scale: 0.9 }}
              animate={isMobile ? false : { scale: 1 }}
              exit={isMobile ? false : { scale: 0.9 }}
              className="max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/screenshots/${projectName}/${screenshots[selectedIndex].filename}`}
                alt={screenshots[selectedIndex].caption}
                className="w-full h-full object-contain rounded-lg"
              />
              
              <div className="mt-2 md:mt-4 text-center">
                <p className="text-white text-sm md:text-lg">{screenshots[selectedIndex].caption}</p>
                <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2">
                  {selectedIndex + 1} / {screenshots.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScreenshotGallery;
