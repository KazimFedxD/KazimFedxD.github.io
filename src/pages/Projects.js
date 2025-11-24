import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { getSortedProjects, getFeaturedLabel, hasProjectDetails } from '../data/projectsData';
import TechIcon from '../components/TechIcon';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedGradientText from '../components/AnimatedGradientText';
import { Filter, Search, Award, Code2, ExternalLink, Github, Sparkles } from 'lucide-react';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const projects = getSortedProjects();
  const featuredLabel = getFeaturedLabel();

  // Extract unique tech categories for filters
  const allTechs = [...new Set(projects.flatMap(p => p.tech))];
  const filters = ['All', 'Featured', ...allTechs.slice(0, 8)]; // Top 8 technologies

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedFilter === 'All' || 
                         (selectedFilter === 'Featured' && project.badge) ||
                         project.tech.includes(selectedFilter);
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
              <Code2 className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <AnimatedGradientText gradient="from-purple-400 via-pink-400 to-purple-600">
              My Projects
            </AnimatedGradientText>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-2">
            Transforming ideas into functional, impactful solutions with cutting-edge technologies
          </p>
          
          <div className="flex items-center justify-center gap-2 text-purple-400 font-medium">
            <Sparkles className="w-5 h-5" />
            <span>{featuredLabel}</span>
          </div>
        </AnimatedSection>

        {/* Search and Filter Section */}
        <AnimatedSection delay={0.2} className="mb-12">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 glass rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-slate-400 font-medium">Filter by:</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {filters.map((filter, index) => (
                <motion.button
                  key={filter}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                      : 'glass text-purple-300 hover:bg-purple-900/30'
                  }`}
                >
                  {filter === 'Featured' && <Award className="w-4 h-4 inline-block mr-2" />}
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Results Count */}
        <AnimatedSection delay={0.3} className="mb-8">
          <div className="text-center">
            <p className="text-slate-400">
              Showing <span className="text-purple-400 font-semibold">{filteredProjects.length}</span> of{' '}
              <span className="text-purple-400 font-semibold">{projects.length}</span> projects
            </p>
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <motion.div
          key={selectedFilter + searchTerm}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  perspective={1000}
                  transitionSpeed={1500}
                  scale={1.02}
                  className="h-full"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass rounded-3xl p-6 h-full flex flex-col group cursor-pointer border border-purple-500/10 hover:border-purple-500/30 transition-all"
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl"
                        >
                          <Code2 className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        {project.badge && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full text-xs font-semibold text-white flex items-center gap-1"
                          >
                            <Award className="w-3 h-3" />
                            Featured
                          </motion.div>
                        )}
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                        {project.title}
                      </h2>
                      
                      {project.badge && (
                        <p className="text-sm text-yellow-400 mb-2">{project.badge}</p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 leading-relaxed mb-4 flex-grow">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 6).map((tech, techIndex) => (
                          <TechIcon key={techIndex} name={tech} />
                        ))}
                        {project.tech.length > 6 && (
                          <span className="px-3 py-1 bg-slate-900/50 border border-slate-700 rounded-full text-sm text-slate-400">
                            +{project.tech.length - 6}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Key Features
                      </h3>
                      <ul className="space-y-1">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm">
                            <span className="text-purple-400 mr-2">✦</span>
                            <span className="text-slate-400">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      {hasProjectDetails(project.title) && (
                        <Link
                          to={`/projects/${project.title.replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                          className="flex-1"
                        >
                          <motion.div
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold flex items-center justify-center gap-2 transition-all"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Details
                          </motion.div>
                        </Link>
                      )}

                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${hasProjectDetails(project.title) ? '' : 'flex-1'} px-6 py-3 glass hover:bg-purple-900/30 rounded-full font-semibold flex items-center justify-center gap-2 transition-all`}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </motion.a>
                    </div>
                  </motion.div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="glass rounded-3xl p-12 max-w-md mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4"
              >
                <Search className="w-16 h-16 text-purple-400" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2 gradient-text">No projects found</h3>
              <p className="text-slate-400 mb-6">
                Try adjusting your filters or search term
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedFilter('All');
                  setSearchTerm('');
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold"
              >
                Reset Filters
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <AnimatedSection delay={0.5} className="mt-20">
          <Tilt
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            perspective={1000}
          >
            <div className="glass rounded-3xl p-8 md:p-12 text-center border border-purple-500/20">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-6"
              >
                <Github className="w-16 h-16 text-purple-400" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <AnimatedGradientText>
                  More Projects Coming Soon!
                </AnimatedGradientText>
              </h2>
              
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
                I'm constantly working on new projects. Check out my GitHub for the latest updates and contributions.
              </p>
              
              <motion.a
                href="https://github.com/KazimFedxD"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                <Github className="w-6 h-6" />
                Visit My GitHub
              </motion.a>
            </div>
          </Tilt>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Projects;
