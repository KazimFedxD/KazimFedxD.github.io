import React from 'react';

export const ProjectCardSkeleton = () => {
  return (
    <div className="card-gradient p-6 rounded-2xl animate-pulse">
      {/* Title */}
      <div className="h-7 bg-slate-700/50 rounded-md w-3/4 mb-3"></div>
      
      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-700/50 rounded w-full"></div>
        <div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
      </div>
      
      {/* Tech Stack */}
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-slate-700/50 rounded-full w-20"></div>
        <div className="h-6 bg-slate-700/50 rounded-full w-24"></div>
        <div className="h-6 bg-slate-700/50 rounded-full w-16"></div>
      </div>
      
      {/* Features */}
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-slate-700/50 rounded w-full"></div>
        <div className="h-3 bg-slate-700/50 rounded w-4/5"></div>
        <div className="h-3 bg-slate-700/50 rounded w-5/6"></div>
      </div>
      
      {/* Button */}
      <div className="h-12 bg-slate-700/50 rounded-full w-full"></div>
    </div>
  );
};

export const PageSkeleton = () => {
  return (
    <div className="min-h-screen pt-24 px-4 pb-12 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="h-14 bg-slate-700/50 rounded-lg w-64 mx-auto mb-4"></div>
          <div className="h-6 bg-slate-700/50 rounded w-96 mx-auto"></div>
        </div>
        
        {/* Content */}
        <div className="space-y-6">
          <div className="h-32 bg-slate-700/50 rounded-2xl"></div>
          <div className="h-32 bg-slate-700/50 rounded-2xl"></div>
          <div className="h-32 bg-slate-700/50 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};
