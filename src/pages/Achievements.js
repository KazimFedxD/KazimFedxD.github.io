import React from 'react';
import { motion } from 'framer-motion';
import TechIcon from '../components/TechIcon';

const Achievements = () => {
  const achievements = [
    {
      year: '2025',
      title: 'NASA Space Apps Challenge - Karachi',
      position: '2nd Place',
      description: 'Secured second place in the NASA Space Apps Challenge 2025 Karachi Local Event with Skyntel - an interactive weather app featuring AI query support, personalized alerts, email subscriptions, and live community reports.',
      highlights: [
        'Built full-stack weather application with Django REST Framework backend',
        'Integrated Groq AI for intelligent weather queries',
        'Implemented Celery automation and Redis caching for performance',
        'Deployed using Docker and Nginx reverse proxy',
        'Presented innovative solution to judges and competed against local teams'
      ],
      tech: ['Django', 'React', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'Nginx'],
      icon: '🏆',
      color: 'from-yellow-600 to-orange-600'
    }
  ];

  const certifications = [
    {
      title: 'Self-Taught Developer',
      issuer: 'Independent Learning',
      description: 'Comprehensive self-education in modern web technologies',
      skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Achievements</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Milestones and recognitions in my journey
            </p>
          </motion.div>

          {/* Main Achievement */}
          <div className="mb-16">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="card-gradient p-8 md:p-12 rounded-2xl relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
                    <div className="flex items-start gap-4 w-full">
                      <span className="text-5xl sm:text-6xl flex-shrink-0">{achievement.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-purple-400 font-semibold mb-1">{achievement.year}</div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2 break-words">
                          {achievement.title}
                        </h2>
                        <div className={`inline-block px-4 py-2 bg-gradient-to-r ${achievement.color} rounded-full font-bold text-white`}>
                          {achievement.position}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    {achievement.description}
                  </p>

                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-purple-300 mb-4">Highlights</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {achievement.highlights.map((highlight, hIndex) => (
                        <motion.div
                          key={hIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + hIndex * 0.1 }}
                          className="flex items-start bg-purple-900/20 p-4 rounded-lg"
                        >
                          <span className="text-purple-400 mr-3 text-xl">✦</span>
                          <span className="text-slate-300">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {achievement.tech && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-purple-300 mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {achievement.tech.map((tech, techIndex) => (
                          <TechIcon key={techIndex} tech={tech} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications & Learning */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Learning & Development</h2>
            <div className="grid md:grid-cols-1 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="card-gradient p-6 rounded-2xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-purple-300 mb-2">{cert.title}</h3>
                      <p className="text-purple-400 font-medium">{cert.issuer}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-4">{cert.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <TechIcon key={skillIndex} tech={skill} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants}>
            <div className="card-gradient p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-8 text-center gradient-text">By The Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: '🏆', number: '1', label: 'Hackathon Win' },
                  { icon: '💻', number: '50+', label: 'Projects Built' },
                  { icon: '📚', number: '15+', label: 'Tech Stacks' },
                  { icon: '⭐', number: '1000+', label: 'Hours Learning' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-center"
                  >
                    <div className="text-5xl mb-3">{stat.icon}</div>
                    <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Future Goals */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="card-gradient p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-6 gradient-text">What's Next?</h2>
              <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                This is just the beginning. I'm committed to continuous learning, taking on challenging projects, 
                and contributing to the tech community. The next chapter is being written every day.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Achievements;
