import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images, alt = 'Feature screenshot' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Handle single image or array
  const imageArray = Array.isArray(images) ? images : [images];
  const hasMultipleImages = imageArray.length > 1;

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % imageArray.length);
  }, [imageArray.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  }, [imageArray.length]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, handleNext]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative w-full h-64 sm:h-80 overflow-hidden rounded-lg bg-slate-900/30 border border-slate-700/50">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.img
          key={currentIndex}
          src={imageArray[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
        />
      </AnimatePresence>

      {hasMultipleImages && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-600 rounded-full transition-all duration-200 backdrop-blur-sm group"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-600 rounded-full transition-all duration-200 backdrop-blur-sm group"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {imageArray.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-purple-500 w-6'
                    : 'bg-slate-500 hover:bg-slate-400'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-slate-900/80 border border-slate-600 rounded-full backdrop-blur-sm">
            <span className="text-xs text-slate-300">
              {currentIndex + 1} / {imageArray.length}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
