import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedGradientText from '../components/AnimatedGradientText';
import { Code2, Database, Server, Wrench, Award, TrendingUp, CheckCircle2, Zap } from 'lucide-react';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const skillCategories = [
    {
      title: 'Languages',
      icon: Code2,
      color: 'from-purple-600 to-pink-600',
      skills: [
        { name: 'Python', level: 95, icon: '🐍' },
        { name: 'JavaScript', level: 85, icon: '⚡' },
        { name: 'C++', level: 75, icon: '⚙️' },
        { name: 'C', level: 75, icon: '💻' },
        { name: 'SQL', level: 85, icon: '🗄️' },
        { name: 'Bash', level: 80, icon: '🐚' }
      ]
    },
    {
      title: 'Frameworks & Libraries',
      icon: Zap,
      color: 'from-pink-600 to-purple-600',
      skills: [
        { name: 'Django', level: 95, icon: '🎸' },
        { name: 'Django REST Framework', level: 90, icon: '🚀' },
        { name: 'React', level: 85, icon: '⚛️' },
        { name: 'Framer Motion', level: 80, icon: '🎬' },
        { name: 'Tailwind CSS', level: 90, icon: '🎨' }
      ]
    },
    {
      title: 'Databases',
      icon: Database,
      color: 'from-blue-600 to-purple-600',
      skills: [
        { name: 'PostgreSQL', level: 90, icon: '🐘' },
        { name: 'SQLite', level: 85, icon: '💾' },
        { name: 'Redis', level: 75, icon: '🔴' },
        { name: 'MinIO', level: 70, icon: '📦' }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: Server,
      color: 'from-green-600 to-blue-600',
      skills: [
        { name: 'Docker', level: 85, icon: '🐳' },
        { name: 'Git', level: 90, icon: '🌿' },
        { name: 'GitHub', level: 90, icon: '🐙' },
        { name: 'Nginx', level: 80, icon: '🌐' },
        { name: 'Celery', level: 80, icon: '🌱' },
        { name: 'Linux', level: 85, icon: '🐧' }
      ]
    }
  ];

  const filters = ['All', ...skillCategories.map(cat => cat.title)];

  const getFilteredCategories = () => {
    if (selectedCategory === 'All') return skillCategories;
    return skillCategories.filter(cat => cat.title === selectedCategory);
  };

  const proficiencyColors = {
    90: 'from-green-500 to-emerald-600',
    80: 'from-blue-500 to-cyan-600',
    70: 'from-yellow-500 to-orange-600',
    60: 'from-orange-500 to-red-600'
  };

  const getColorByLevel = (level) => {
    if (level >= 90) return proficiencyColors[90];
    if (level >= 80) return proficiencyColors[80];
    if (level >= 70) return proficiencyColors[70];
    return proficiencyColors[60];
  };

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
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-xl" />
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
              <Wrench className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <AnimatedGradientText gradient="from-purple-400 via-pink-400 to-purple-600">
              Skills & Expertise
            </AnimatedGradientText>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and impactful applications
          </p>
        </AnimatedSection>

        {/* Filter Buttons */}
        <AnimatedSection delay={0.2} className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            {filters.map((filter, index) => (
              <motion.button
                key={filter}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(filter)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === filter
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'glass text-purple-300 hover:bg-purple-900/30'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Skills Categories */}
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <AnimatePresence mode="wait">
            {getFilteredCategories().map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                layout
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  perspective={1000}
                  transitionSpeed={1500}
                  className="h-full"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass rounded-3xl p-8 h-full border border-purple-500/10 hover:border-purple-500/30 transition-all"
                  >
                    {/* Category Header */}
                    <div className="flex items-center mb-6">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`p-3 bg-gradient-to-r ${category.color} rounded-xl mr-4`}
                      >
                        <category.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h2 className="text-2xl font-bold gradient-text">{category.title}</h2>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: skillIndex * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{skill.icon}</span>
                              <span className="text-slate-300 font-medium">{skill.name}</span>
                            </div>
                            <span className="text-purple-400 font-semibold">{skill.level}%</span>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1,
                                delay: skillIndex * 0.1,
                                ease: "easeOut"
                              }}
                              className={`h-full bg-gradient-to-r ${getColorByLevel(skill.level)} rounded-full relative`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats Section */}
        <AnimatedSection className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Code2, value: '6+', label: 'Languages', color: 'from-purple-600 to-pink-600' },
              { icon: Zap, value: '10+', label: 'Frameworks', color: 'from-pink-600 to-purple-600' },
              { icon: Database, value: '4+', label: 'Databases', color: 'from-blue-600 to-purple-600' },
              { icon: Award, value: '15+', label: 'Tools', color: 'from-green-600 to-blue-600' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-2xl p-6 text-center group cursor-pointer"
              >
                <motion.div
                  className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Proficiency Legend */}
        <AnimatedSection className="mb-16">
          <Tilt
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            perspective={1000}
          >
            <div className="glass rounded-3xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold gradient-text mb-6 text-center flex items-center justify-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Proficiency Levels
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { range: '90-100%', label: 'Expert', color: 'from-green-500 to-emerald-600' },
                  { range: '80-89%', label: 'Advanced', color: 'from-blue-500 to-cyan-600' },
                  { range: '70-79%', label: 'Proficient', color: 'from-yellow-500 to-orange-600' },
                  { range: '60-69%', label: 'Intermediate', color: 'from-orange-500 to-red-600' }
                ].map((level, index) => (
                  <motion.div
                    key={level.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`h-2 bg-gradient-to-r ${level.color} rounded-full mb-2`} />
                    <div className="text-sm font-semibold text-slate-300 mb-1">{level.label}</div>
                    <div className="text-xs text-slate-500">{level.range}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Tilt>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection>
          <Tilt
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            perspective={1000}
          >
            <div className="glass rounded-3xl p-8 md:p-12 text-center border border-purple-500/20">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-6"
              >
                <CheckCircle2 className="w-16 h-16 text-green-400" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <AnimatedGradientText>
                  Always Learning, Always Growing
                </AnimatedGradientText>
              </h2>

              <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
                I'm constantly expanding my skillset and staying updated with the latest technologies and best practices.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a
                  href="/projects"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg"
                >
                  <Code2 className="w-6 h-6" />
                  View Projects
                </motion.a>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 glass hover:bg-purple-900/30 rounded-full font-semibold text-lg"
                >
                  Let's Connect
                </motion.a>
              </div>
            </div>
          </Tilt>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Skills;
