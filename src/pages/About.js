import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { User, Briefcase, Heart, Lightbulb, Target, Globe, Award, Code2, Rocket } from 'lucide-react';
import GitHubStats from '../components/GitHubStats';
import ResumeDownload from '../components/ResumeDownload';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedGradientText from '../components/AnimatedGradientText';

const About = () => {
  const interests = [
    { icon: Code2, title: 'Backend Development', desc: 'Building robust and scalable server-side applications', color: 'from-purple-600 to-pink-600' },
    { icon: Rocket, title: 'Automation', desc: 'Creating efficient workflows and automated solutions', color: 'from-pink-600 to-purple-600' },
    { icon: Globe, title: 'Hardware-Software Integration', desc: 'Bridging physical and digital worlds', color: 'from-blue-600 to-purple-600' },
    { icon: Lightbulb, title: 'Innovation', desc: 'Exploring cutting-edge technologies and methodologies', color: 'from-green-600 to-blue-600' }
  ];

  const values = [
    { icon: Target, title: 'Problem Solver', desc: 'Analytical approach to complex challenges' },
    { icon: Heart, title: 'Passionate Learner', desc: 'Constantly expanding my skillset' },
    { icon: Briefcase, title: 'Professional', desc: 'Committed to quality and best practices' },
    { icon: User, title: 'Team Player', desc: 'Collaborative and communicative' }
  ];

  const timeline = [
    { year: '2025', event: 'NASA Space Apps Challenge Winner', icon: Award, color: 'from-yellow-600 to-orange-600' },
    { year: '2024', event: 'Started KayzBlog Management', icon: Briefcase, color: 'from-blue-600 to-purple-600' },
    { year: '2023', event: 'Began Self-Taught Developer Journey', icon: Code2, color: 'from-purple-600 to-pink-600' }
  ];

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
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
            <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
              <User className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <AnimatedGradientText>About Me</AnimatedGradientText>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Passionate developer turning ideas into impactful solutions
          </p>
        </AnimatedSection>

        {/* Main Bio Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Bio Card */}
          <AnimatedSection delay={0.2}>
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass rounded-3xl p-8 h-full border border-purple-500/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"
                  >
                    <User className="w-6 h-6 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold gradient-text">Who I Am</h2>
                </div>

                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    I'm a passionate <span className="text-purple-400 font-semibold">Software Developer</span> from Karachi, Pakistan, 
                    specializing in backend engineering and full-stack development. Currently in 12th grade at Fatimiyah Boys College 
                    studying Computer Science, I combine academic knowledge with hands-on experience in building real-world applications.
                  </p>
                  <p>
                    My journey in tech is driven by curiosity and a desire to create solutions that make a difference. 
                    From winning <span className="text-yellow-400 font-semibold">2nd place at NASA Space Apps Challenge 2025</span> with 
                    Skyntel, to managing KayzBlog with <span className="text-green-400 font-semibold">40,000+ views</span>, to building 
                    Discord bots deployed across 10+ servers - I thrive on challenges that push me to learn and grow.
                  </p>
                  <p>
                    As a <span className="text-pink-400 font-semibold">self-taught developer</span> supplementing my formal education, 
                    I've developed a strong foundation in modern web technologies, with a particular focus on Python, Django, and 
                    building scalable systems.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 glass rounded-xl border border-green-500/30"
                >
                  <p className="text-green-300 font-medium flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Open to Remote Backend Development Opportunities
                  </p>
                </motion.div>
              </motion.div>
            </Tilt>
          </AnimatedSection>

          {/* What I Do Card */}
          <AnimatedSection delay={0.3}>
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass rounded-3xl p-8 h-full border border-purple-500/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl"
                  >
                    <Briefcase className="w-6 h-6 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold gradient-text">What I Do</h2>
                </div>

                <div className="space-y-3">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="flex items-start gap-4 p-4 rounded-xl glass hover:bg-purple-900/30 transition-all cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`p-2 bg-gradient-to-r ${interest.color} rounded-lg flex-shrink-0`}
                      >
                        <interest.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-purple-200 mb-1">{interest.title}</h3>
                        <p className="text-slate-400 text-sm">{interest.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          </AnimatedSection>
        </div>

        {/* Core Values */}
        <AnimatedSection delay={0.4} className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">
            <AnimatedGradientText>Core Values</AnimatedGradientText>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000}>
                  <div className="glass rounded-2xl p-6 text-center h-full border border-purple-500/10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="inline-block mb-4"
                    >
                      <value.icon className="w-12 h-12 text-purple-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold gradient-text mb-2">{value.title}</h3>
                    <p className="text-slate-400 text-sm">{value.desc}</p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <AnimatedSection delay={0.5} className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            <AnimatedGradientText>My Journey</AnimatedGradientText>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 via-pink-600 to-purple-600"></div>

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-slate-900 z-10 bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse-glow"></div>

                  {/* Content */}
                  <div className={`md:w-[calc(50%-2rem)] ml-20 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="glass rounded-2xl p-6 border border-purple-500/10"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 bg-gradient-to-r ${item.color} rounded-lg`}>
                            <item.icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-2xl font-bold text-purple-400">{item.year}</span>
                        </div>
                        <h3 className="text-xl font-bold text-purple-200">{item.event}</h3>
                      </motion.div>
                    </Tilt>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* GitHub Stats */}
        <AnimatedSection delay={0.6} className="mb-16">
          <GitHubStats />
        </AnimatedSection>

        {/* Resume Download */}
        <AnimatedSection delay={0.7}>
          <ResumeDownload />
        </AnimatedSection>
      </div>
    </div>
  );
};

export default About;
