import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Award, Trophy, Star, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';
import TechIcon from '../components/TechIcon';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedGradientText from '../components/AnimatedGradientText';

const Achievements = () => {
  const achievements = [
    {
      year: '2025',
      title: 'NASA Space Apps Challenge - Karachi',
      position: '2nd Place',
      badge: 'Global Competition',
      description: 'Secured second place in the NASA Space Apps Challenge 2025 Karachi Local Event with Skyntel - an interactive weather app featuring AI query support, personalized alerts, email subscriptions, and live community reports.',
      highlights: [
        'Built full-stack weather application with Django REST Framework backend',
        'Integrated Groq AI for intelligent weather queries',
        'Implemented Celery automation and Redis caching for performance',
        'Deployed using Docker and Nginx reverse proxy',
        'Presented innovative solution to judges and competed against local teams'
      ],
      tech: ['Django', 'React', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'Nginx', 'Groq AI'],
      icon: Trophy,
      color: 'from-yellow-600 to-orange-600',
      link: 'https://github.com/KazimFedxD/Skyntel'
    }
  ];

  const certifications = [
    {
      title: 'Self-Taught Developer Journey',
      issuer: 'Independent Learning',
      year: '2023-Present',
      description: 'Comprehensive self-education in modern web technologies through projects and hands-on experience',
      skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker', 'REST APIs'],
      icon: Star,
      color: 'from-purple-600 to-pink-600'
    }
  ];

  const stats = [
    { value: '2nd', label: 'NASA Space Apps', icon: Trophy },
    { value: '40K+', label: 'Blog Views', icon: Award },
    { value: '10+', label: 'Projects', icon: Star },
    { value: '4K+', label: 'Followers', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="p-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <AnimatedGradientText gradient="from-yellow-400 via-orange-400 to-yellow-600">
              Achievements
            </AnimatedGradientText>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-orange-600 mx-auto rounded-full mb-6"></div>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Milestones and recognitions in my journey as a developer
          </p>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.2} className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-2xl p-6 text-center group cursor-pointer border border-yellow-500/10"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-3"
                >
                  <stat.icon className="w-8 h-8 text-yellow-400 group-hover:text-orange-400 transition-colors" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Main Achievement */}
        <AnimatedSection delay={0.3} className="mb-16">
          {achievements.map((achievement, index) => (
            <Tilt key={index} tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000}>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden border border-yellow-500/20"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-600/10 to-orange-600/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
                    <div className="flex items-start gap-4 flex-1">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex-shrink-0"
                      >
                        <div className={`p-4 bg-gradient-to-r ${achievement.color} rounded-2xl`}>
                          <achievement.icon className="w-12 h-12 text-white" />
                        </div>
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-yellow-400 font-semibold text-lg">{achievement.year}</span>
                          <span className="px-3 py-1 bg-yellow-900/30 border border-yellow-500/30 rounded-full text-xs text-yellow-300">
                            {achievement.badge}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">
                          <AnimatedGradientText gradient={achievement.color}>
                            {achievement.title}
                          </AnimatedGradientText>
                        </h2>
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className={`inline-block px-6 py-3 bg-gradient-to-r ${achievement.color} rounded-full font-bold text-white shadow-lg`}
                        >
                          {achievement.position}
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-lg leading-relaxed mb-8">
                    {achievement.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Key Achievements
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {achievement.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 p-4 glass rounded-xl hover:bg-yellow-900/20 transition-all group"
                        >
                          <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <span className="text-slate-300 text-sm">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-yellow-300 mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {achievement.tech.map((tech, idx) => (
                        <TechIcon key={idx} name={tech} />
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  {achievement.link && (
                    <motion.a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(234, 179, 8, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full font-semibold text-lg"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Project
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </AnimatedSection>

        {/* Certifications */}
        <AnimatedSection delay={0.5}>
          <h2 className="text-4xl font-bold text-center mb-8">
            <AnimatedGradientText>Learning Journey</AnimatedGradientText>
          </h2>

          <div className="grid md:grid-cols-1 gap-6">
            {certifications.map((cert, index) => (
              <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-3xl p-8 border border-purple-500/10"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`p-3 bg-gradient-to-r ${cert.color} rounded-xl flex-shrink-0`}
                    >
                      <cert.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold gradient-text mb-1">{cert.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        <span>{cert.issuer}</span>
                        <span>•</span>
                        <span>{cert.year}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">{cert.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="px-3 py-1 glass rounded-full text-sm text-purple-300"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Achievements;
