import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Youtube } from 'lucide-react';

/**
 * ShowcaseVideo Component
 * Displays a YouTube video embed for project showcase
 * Only renders if showcaseVideo prop is provided
 */
const ShowcaseVideo = ({ showcaseVideo }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  if (!showcaseVideo || !showcaseVideo.url) {
    return null;
  }

  // Extract video ID from various YouTube URL formats
  const getYouTubeVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const videoId = getYouTubeVideoId(showcaseVideo.url);
  
  if (!videoId) {
    return null;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`;
  const thumbnailUrl = showcaseVideo.thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="glass rounded-xl overflow-hidden border border-purple-500/30"
    >
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-700/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600/20 rounded-lg">
            <Youtube className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {showcaseVideo.title || 'Project Demo'}
            </h3>
            {showcaseVideo.duration && (
              <span className="text-sm text-gray-400">{showcaseVideo.duration}</span>
            )}
          </div>
        </div>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="hidden sm:inline">Watch on YouTube</span>
        </a>
      </div>

      {/* Video Container */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {!showEmbed ? (
          // Thumbnail with play button
          <div 
            className="absolute inset-0 cursor-pointer group"
            onClick={() => setShowEmbed(true)}
          >
            <img
              src={thumbnailUrl}
              alt={showcaseVideo.title || 'Video thumbnail'}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to hqdefault if maxresdefault doesn't exist
                e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Play button */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-red-500 transition-colors">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="white" />
              </div>
            </motion.div>

            {/* Click to play text */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="text-white/80 text-sm bg-black/50 px-3 py-1 rounded-full">
                Click to play
              </span>
            </div>
          </div>
        ) : (
          // YouTube embed
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title={showcaseVideo.title || 'Project Demo'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          />
        )}

        {/* Loading spinner when embed is loading */}
        {showEmbed && !isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Description */}
      {showcaseVideo.description && (
        <div className="px-4 sm:px-6 py-4 border-t border-gray-700/50">
          <p className="text-gray-300 text-sm sm:text-base">
            {showcaseVideo.description}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ShowcaseVideo;
