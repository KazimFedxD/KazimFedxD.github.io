import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: 'Skyntel',
      badge: '🏆 2nd Place - NASA Space Apps Challenge 2025',
      description: 'Interactive weather app with AI query support, personalized alerts, daily email subscriptions, and live weather reports from users.',
      tech: ['Django REST Framework', 'Celery', 'PostgreSQL', 'Redis', 'Docker', 'Nginx', 'Groq AI'],
      github: 'https://github.com/KazimFedxD',
      features: [
        'AI-powered weather queries using Groq AI',
        'Personalized weather alerts and notifications',
        'Daily email subscriptions with weather updates',
        'Live weather reports from community users',
        'Backend powered by Django REST Framework with Celery automation',
        'Deployed using Docker and Nginx reverse proxy'
      ]
    },
    {
      title: 'FedxD Data Container (FxDC)',
      description: 'Open-source Python library that converts Python objects into a readable .fxdc format and restores them to their original classes.',
      tech: ['Python', 'Lexer', 'Parser', 'Custom Object System', 'Decorators'],
      github: 'https://github.com/KazimFedxD',
      features: [
        'Custom lexer and parser implementation',
        'Converts Python objects to .fxdc format',
        'Restores objects to original classes',
        'Support for user-defined classes with decorators',
        'Built entirely with core Python'
      ]
    },
    {
      title: 'FxChange',
      description: 'Demo stock and crypto exchange where users can trade with virtual currency, track portfolios, and grow their profiles.',
      tech: ['Django', 'SQLite', 'JavaScript', 'External APIs', 'Email Verification'],
      github: 'https://github.com/KazimFedxD',
      features: [
        'Virtual currency trading for stocks and crypto',
        'Portfolio tracking and profile growth system',
        'Custom admin panels for management',
        'Live graphs with real-time data',
        'Secure email verification',
        'API integrations for market data'
      ]
    },
    {
      title: 'Webstore',
      description: 'Complete e-commerce platform featuring inventory control, discounts, carts, and checkout systems with real-time calculations.',
      tech: ['Django', 'SQLite', 'JavaScript', 'Admin Panels', 'Email Verification'],
      github: 'https://github.com/KazimFedxD',
      features: [
        'Inventory control and management',
        'Discount system and cart functionality',
        'Checkout with real-time calculations',
        'Custom admin panels',
        'Email verification for security',
        'Search system for smooth UX'
      ]
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Projects</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Transforming ideas into functional, impactful solutions
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="card-gradient p-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-3 gradient-text">{project.title}</h2>
                    {project.badge && (
                      <div className="mb-3">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full text-sm font-semibold text-white">
                          {project.badge}
                        </span>
                      </div>
                    )}
                    <p className="text-slate-300 text-lg leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="md:ml-6 mt-4 md:mt-0 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-full font-semibold flex items-center gap-2 w-fit transition-all duration-300 hover-glow"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View Code
                  </motion.a>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-4 py-1 bg-purple-900/50 border border-purple-500/30 rounded-full text-purple-200 text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-3">Key Features</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-purple-400 mr-2">✦</span>
                        <span className="text-slate-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="card-gradient p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 gradient-text">More Projects Coming Soon!</h2>
              <p className="text-slate-400 mb-6">
                I'm constantly working on new projects. Check out my GitHub for the latest updates.
              </p>
              <motion.a
                href="https://github.com/KazimFedxD"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Visit My GitHub
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
