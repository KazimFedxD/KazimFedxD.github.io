import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projectsData } from '../../data/projectsData';

const RelatedProjects = ({ currentProjectName, currentTechStack = [], limit = 3 }) => {
  // Find related projects based on tech stack overlap
  const getRelatedProjects = () => {
    // Get current tech stack tags
    const currentTechs = currentTechStack.map(t => (t.name || t).toLowerCase());
    
    // Score each project by tech stack overlap
    const scoredProjects = projectsData
      .filter(p => p.title !== currentProjectName) // Exclude current project
      .map(project => {
        const projectTechs = (project.techStack || []).map(t => t.toLowerCase());
        const overlap = currentTechs.filter(tech => 
          projectTechs.some(pt => pt.includes(tech) || tech.includes(pt))
        ).length;
        
        return {
          ...project,
          score: overlap
        };
      })
      .filter(p => p.score > 0) // Only projects with some overlap
      .sort((a, b) => b.score - a.score) // Sort by score
      .slice(0, limit);
    
    // If no matches by tech stack, return random projects
    if (scoredProjects.length === 0) {
      return projectsData
        .filter(p => p.title !== currentProjectName)
        .sort(() => 0.5 - Math.random())
        .slice(0, limit);
    }
    
    return scoredProjects;
  };

  const relatedProjects = getRelatedProjects();

  if (relatedProjects.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-16 pt-12 border-t border-slate-700/50"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          Related Projects
        </h2>
        <Link 
          to="/projects"
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <span className="text-sm">View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProjects.map((project, index) => (
          <ProjectCard key={project.id || index} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

// Project Card Component
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link 
        to={`/projects/${project.slug}`}
        className="block glass rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
      >
        {/* Project Image */}
        {project.image && (
          <div className="relative h-48 overflow-hidden bg-gray-800">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />
          </div>
        )}

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-slate-400 text-sm mb-4 line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack?.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-md bg-purple-600/20 text-purple-300 border border-purple-500/30"
              >
                {tech}
              </span>
            ))}
            {project.techStack?.length > 3 && (
              <span className="px-2 py-1 text-xs text-slate-400">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* View Project Link */}
          <div className="flex items-center gap-2 text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
            <span>View Project</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RelatedProjects;
