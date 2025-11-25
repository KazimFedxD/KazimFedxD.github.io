import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Briefcase, Calendar, MapPin, TrendingUp, Users, Target, CheckCircle2 } from 'lucide-react';
import TechIcon from '../components/TechIcon';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedGradientText from '../components/AnimatedGradientText';

const Experience = () => {
  const experiences = [
    {
      period: 'July 2024 - Present',
      role: 'Manager & Content Creator',
      company: 'KayzBlog',
      type: 'Medical Blog Platform',
      location: 'Karachi, Pakistan',
      description: 'Managing and maintaining a comprehensive medical blog platform with advanced features and growing audience engagement.',
      responsibilities: [
        'Edited 6-8 videos per month and produced 12-15 research-based articles monthly',
        'Grew social media page to 4,000+ followers with strategic content planning',
        'Achieved over 40,000+ views and 1,200+ likes on top-performing videos',
        'Developed custom admin panels and handled website updates',
        'Improved SEO visibility and content optimization strategies'
      ],
      achievements: [
        '40,000+ total views',
        '4,000+ social media followers',
        '1,200+ video likes',
        '12-15 articles/month'
      ],
      tech: ['Content Management', 'SEO', 'Video Editing', 'Social Media', 'Admin Panels'],
      icon: Briefcase,
      color: 'from-blue-600 to-purple-600',
      current: true
    },
    {
      period: 'Nov 2024 - Jan 2025',
      role: 'Lead Developer',
      company: 'Disutils',
      type: 'Discord Gaming Bot',
      location: 'Remote',
      description: 'Architected and developed a feature-rich Discord bot with advanced gaming mechanics and virtual economy systems.',
      responsibilities: [
        'Designed database-backed user management and currency systems',
        'Implemented asynchronous task handling for efficient command processing',
        'Bot deployed in 10+ servers, executing hundreds of commands daily',
        'Achieved minimal downtime with robust error handling',
        'Created engaging game mechanics and virtual economy features'
      ],
      achievements: [
        '10+ active servers',
        'Hundreds of daily commands',
        '99%+ uptime',
        'Advanced game logic'
      ],
      tech: ['Python', 'Discord.py', 'SQLite', 'Async Programming', 'Game Logic', 'Database Design'],
      icon: Target,
      color: 'from-purple-600 to-pink-600',
      current: false
    }
  ];

  const skills = [
    { category: 'Management', items: ['Team Leadership', 'Content Strategy', 'Project Planning'] },
    { category: 'Development', items: ['Backend Systems', 'Database Design', 'API Development'] },
    { category: 'Growth', items: ['SEO Optimization', 'Community Building', 'Analytics'] }
  ];

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
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
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Briefcase className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <AnimatedGradientText gradient="from-blue-400 via-purple-400 to-blue-600">
              Experience
            </AnimatedGradientText>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            My professional journey and growth as a developer and content creator
          </p>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative mb-16">
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-blue-600"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <AnimatedSection key={index} delay={0.2 + index * 0.2}>
                <div className={`relative flex flex-col lg:flex-row gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}>
                  {/* Timeline dot */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className={`w-12 h-12 rounded-full border-4 border-slate-900 z-10 bg-gradient-to-r ${exp.color} flex items-center justify-center animate-pulse-glow`}
                    >
                      <exp.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div className={`lg:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
                      <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={`glass rounded-3xl p-8 border border-purple-500/10 ${
                          exp.current ? 'ring-2 ring-purple-500/30' : ''
                        }`}
                      >
                        {/* Header */}
                        <div className={`flex items-start gap-4 mb-6 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className={`p-3 bg-gradient-to-r ${exp.color} rounded-xl flex-shrink-0 lg:hidden`}
                          >
                            <exp.icon className="w-6 h-6 text-white" />
                          </motion.div>
                          
                          <div className="flex-1">
                            {exp.current && (
                              <motion.span
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="inline-block px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-xs text-green-300 mb-2"
                              >
                                Current Position
                              </motion.span>
                            )}
                            <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">{exp.role}</h3>
                            <h4 className="text-xl text-purple-300 font-semibold mb-2">{exp.company}</h4>
                            <div className={`flex flex-wrap gap-3 mb-2 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                              <span className="flex items-center gap-1 text-slate-400 text-sm">
                                <Calendar className="w-4 h-4" />
                                {exp.period}
                              </span>
                              <span className="flex items-center gap-1 text-slate-400 text-sm">
                                <MapPin className="w-4 h-4" />
                                {exp.location}
                              </span>
                            </div>
                            <p className="text-purple-400 text-sm font-medium">{exp.type}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-300 leading-relaxed mb-6">{exp.description}</p>

                        {/* Responsibilities */}
                        <div className="mb-6">
                          <h4 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5" />
                            Key Responsibilities
                          </h4>
                          <ul className="space-y-2">
                            {exp.responsibilities.map((resp, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`flex items-start gap-2 text-sm text-slate-400 ${
                                  index % 2 === 0 ? 'lg:flex-row-reverse lg:text-right' : ''
                                }`}
                              >
                                <span className="text-purple-400 flex-shrink-0">✦</span>
                                <span>{resp}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Achievements */}
                        <div className="mb-6">
                          <h4 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            Achievements
                          </h4>
                          <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                            {exp.achievements.map((achievement, idx) => (
                              <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="px-3 py-1 glass rounded-full text-sm text-green-300 border border-green-500/30"
                              >
                                {achievement}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-lg font-bold text-purple-300 mb-3">Technologies</h4>
                          <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                            {exp.tech.map((tech, idx) => (
                              <TechIcon key={idx} name={tech} />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </Tilt>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <AnimatedSection delay={0.6}>
          <h2 className="text-4xl font-bold text-center mb-8">
            <AnimatedGradientText>Skills Gained</AnimatedGradientText>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6 border border-purple-500/10"
                >
                  <h3 className="text-xl font-bold gradient-text mb-4">{skillGroup.category}</h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Experience;
