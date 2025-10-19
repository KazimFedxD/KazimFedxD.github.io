import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      period: '2023 - Present',
      role: 'Independent Developer',
      type: 'Freelance',
      location: 'Karachi, Pakistan',
      description: 'Building custom software solutions for clients, focusing on backend development, automation, and full-stack applications.',
      responsibilities: [
        'Developing scalable backend systems using Django and PostgreSQL',
        'Creating automation tools to streamline business processes',
        'Building RESTful APIs for mobile and web applications',
        'Implementing Docker containerization for consistent deployment',
        'Database design and optimization for high-performance applications'
      ],
      tech: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker', 'Git'],
      icon: '💼'
    },
    {
      period: '2022 - 2023',
      role: 'Backend Developer',
      type: 'Project-Based',
      location: 'Remote',
      description: 'Contributed to various projects focusing on backend architecture, API development, and database management.',
      responsibilities: [
        'Designed and implemented RESTful APIs using Django REST Framework',
        'Optimized database queries for improved application performance',
        'Integrated third-party services and APIs',
        'Implemented user authentication and authorization systems',
        'Collaborated with frontend developers for seamless integration'
      ],
      tech: ['Django', 'DRF', 'PostgreSQL', 'Celery', 'MinIO'],
      icon: '⚙️'
    },
    {
      period: '2021 - 2022',
      role: 'Self-Taught Developer',
      type: 'Learning Journey',
      location: 'Karachi, Pakistan',
      description: 'Intensive self-learning period focused on mastering modern web development technologies and best practices.',
      responsibilities: [
        'Completed comprehensive Python and Django courses',
        'Built multiple personal projects to apply learned concepts',
        'Studied data structures, algorithms, and design patterns',
        'Contributed to open-source projects on GitHub',
        'Developed problem-solving skills through coding challenges'
      ],
      tech: ['Python', 'C', 'C++', 'SQL', 'Git', 'Linux'],
      icon: '📚'
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Experience</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              My professional journey and growth as a developer
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 via-pink-600 to-purple-600"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-600 rounded-full border-4 border-slate-900 z-10 animate-glow"></div>

                  {/* Content card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`md:w-[calc(50%-2rem)] card-gradient p-6 rounded-2xl ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4 justify-start md:justify-start">
                      <span className="text-4xl">{exp.icon}</span>
                      <div className="text-left">
                        <div className="text-purple-400 font-semibold text-sm">{exp.period}</div>
                        <h3 className="text-2xl font-bold text-purple-300">{exp.role}</h3>
                        <div className="text-slate-400 text-sm">{exp.type} • {exp.location}</div>
                      </div>
                    </div>

                    <p className="text-slate-300 mb-4 leading-relaxed text-left">
                      {exp.description}
                    </p>

                    <div className="mb-4 text-left">
                      <h4 className="text-lg font-semibold text-purple-300 mb-3">Key Responsibilities</h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="flex items-start text-slate-400 text-sm">
                            <span className="text-purple-400 mr-2 mt-1">▸</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-start">
                      {exp.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-purple-900/50 border border-purple-500/30 rounded-full text-purple-200 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Developed */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="card-gradient p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-6 text-center gradient-text">Core Competencies</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Backend Development',
                    skills: ['API Design', 'Database Optimization', 'Authentication', 'Microservices']
                  },
                  {
                    title: 'Full-Stack Development',
                    skills: ['React', 'Django', 'RESTful APIs', 'State Management']
                  },
                  {
                    title: 'DevOps & Tools',
                    skills: ['Docker', 'Git', 'CI/CD', 'Linux Administration']
                  }
                ].map((category, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-purple-900/20 p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-semibold text-purple-300 mb-4">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className="flex items-center text-slate-400 text-sm">
                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="card-gradient p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Let's Work Together</h2>
              <p className="text-slate-400 mb-6">
                I'm always interested in hearing about new projects and opportunities.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
