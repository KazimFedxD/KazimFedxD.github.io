import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: '💻',
      skills: ['Python', 'C', 'C++', 'SQL', 'Bash', 'JavaScript']
    },
    {
      title: 'Frameworks & Libraries',
      icon: '⚛️',
      skills: ['Django', 'Django REST Framework', 'React', 'Framer Motion', 'Tailwind CSS']
    },
    {
      title: 'Databases',
      icon: '💾',
      skills: ['PostgreSQL', 'SQLite', 'MinIO']
    },
    {
      title: 'DevOps & Tools',
      icon: '🛠️',
      skills: ['Docker', 'Git', 'GitHub', 'Celery', 'Linux']
    }
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Skills & Technologies</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="card-gradient p-8 rounded-2xl"
              >
                <div className="flex items-center mb-6">
                  <span className="text-4xl mr-4">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-purple-300">{category.title}</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-purple-900/40 border border-purple-500/30 rounded-full text-purple-200 font-medium hover:bg-purple-800/50 hover:border-purple-400/50 transition-all duration-300 cursor-pointer hover-glow"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Proficiency Levels */}
          <motion.div variants={itemVariants} className="card-gradient p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Proficiency Levels</h2>
            <div className="space-y-6">
              {[
                { skill: 'Python & Django', level: 90 },
                { skill: 'React & Frontend', level: 85 },
                { skill: 'PostgreSQL & Databases', level: 85 },
                { skill: 'Docker & DevOps', level: 80 },
                { skill: 'C/C++', level: 75 },
                { skill: 'System Design', level: 70 }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300 font-medium">{item.skill}</span>
                    <span className="text-purple-400 font-semibold">{item.level}%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Learning Section */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <div className="card-gradient p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Currently Exploring</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {['Microservices', 'Kubernetes', 'GraphQL', 'Machine Learning', 'System Architecture'].map((tech, index) => (
                  <motion.span
                    key={index}
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                    className="px-5 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/50 rounded-full text-purple-200 font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
