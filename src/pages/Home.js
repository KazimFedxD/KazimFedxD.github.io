import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import Tilt from 'react-parallax-tilt';
import { Github, Linkedin, Mail, Download, ArrowRight, Code2, Sparkles, Rocket, Award, Star } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedGradientText from '../components/AnimatedGradientText';
import { projectsData } from '../data/projectsData';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only enable mouse tracking on desktop
    if (isMobile) return;
    
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 20,
          y: (e.clientY - rect.top - rect.height / 2) / 20,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/KazimFedxD', label: 'GitHub', color: 'hover:text-purple-400' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kazim-abbas-60b1b5257/', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Mail, href: 'mailto:kazimfedxd@gmail.com', label: 'Email', color: 'hover:text-pink-400' },
  ];

  const stats = [
    { value: '11+', label: 'Projects', icon: Code2 },
    { value: '5+', label: 'Tech Stacks', icon: Sparkles },
    { value: '2+', label: 'Years Exp', icon: Rocket },
    { value: 'NASA', label: 'Winner', icon: Award },
  ];

  const featuredProjects = projectsData
    .filter(p => p.badge && p.badge.includes('NASA'))
    .slice(0, 1);

  return (
    <div ref={containerRef} className="min-h-screen pt-16 relative overflow-hidden">
      {/* Particles Background */}
      <ParticlesBackground />
      
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="min-h-[90vh] flex items-center justify-center">
          <div className="text-center max-w-5xl mx-auto">
            {/* Profile Image with 3D Tilt */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1
              }}
              className="mb-8 inline-block"
            >
              <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                perspective={1000}
                transitionSpeed={1500}
                scale={1.05}
                gyroscope={true}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-50 animate-pulse-glow"></div>
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 p-1.5 animate-glow">
                    <div className="w-full h-full rounded-full bg-slate-900 p-1">
                      <img
                        src="/dp.jpg"
                        alt="Kazim Abbas"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <motion.div
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-3"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    }}
                  >
                    <Star className="w-6 h-6 text-white fill-white" />
                  </motion.div>
                </div>
              </Tilt>
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <span className="text-lg md:text-xl text-purple-300 font-medium">
                👋 Hello, I'm
              </span>
            </motion.div>

            {/* Name with Animated Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6"
              style={!isMobile ? {
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: 'transform 0.1s ease-out',
              } : {}}
            >
              <AnimatedGradientText 
                gradient="from-purple-400 via-pink-400 to-purple-600"
                animateOnHover={true}
              >
                Kazim Abbas
              </AnimatedGradientText>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl md:text-4xl text-purple-300 mb-8 h-16 md:h-20 font-light"
            >
              <TypeAnimation
                sequence={[
                  'Software Developer 💻',
                  2000,
                  'Backend Engineer 🚀',
                  2000,
                  'Python Specialist 🐍',
                  2000,
                  'Django Expert ⚡',
                  2000,
                  'NASA Challenge Winner 🏆',
                  2000,
                  'Problem Solver 🧩',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text"
              />
            </motion.div>

            {/* Summary */}
            <AnimatedSection delay={0.8}>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                🏆 <span className="text-purple-400 font-semibold">NASA Space Apps Challenge 2025 Winner</span> | 
                Building scalable applications with <span className="text-pink-400">Python</span>, <span className="text-purple-400">Django</span>, 
                and modern web technologies. From award-winning weather apps to Discord bots and e-commerce platforms.
              </p>
            </AnimatedSection>

            {/* Status Badge */}
            <AnimatedSection delay={0.9}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/50 rounded-full mb-12 glass"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-300 font-medium">Open to Opportunities</span>
              </motion.div>
            </AnimatedSection>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex flex-wrap gap-4 justify-center mb-12"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Get In Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-full font-semibold text-purple-300 flex items-center gap-2 hover:bg-slate-800/70 hover:border-purple-500/50 transition-all glass"
              >
                <Download className="w-5 h-5" />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex gap-4 justify-center mb-16"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className={`p-4 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-full ${social.color} transition-all glass hover:shadow-lg hover:shadow-purple-500/30`}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <AnimatedSection className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
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
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-3"
                >
                  <stat.icon className="w-8 h-8 text-purple-400 group-hover:text-pink-400 transition-colors" />
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

        {/* Featured Project Highlight */}
        {featuredProjects.length > 0 && (
          <AnimatedSection className="py-16">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-center mb-12"
              >
                <AnimatedGradientText>
                  Featured Achievement
                </AnimatedGradientText>
              </motion.h2>
              
              {featuredProjects.map((project, index) => (
                <Tilt
                  key={index}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  perspective={1000}
                  transitionSpeed={1500}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="glass rounded-3xl p-8 group cursor-pointer"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Award className="w-12 h-12 text-yellow-400" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-sm text-yellow-400 font-semibold mb-2">
                          {project.badge}
                        </div>
                        <h3 className="text-3xl font-bold gradient-text mb-3">
                          {project.title}
                        </h3>
                        <p className="text-slate-300 mb-4 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.slice(0, 4).map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded-full text-sm text-purple-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="px-3 py-1 bg-slate-900/50 border border-slate-700 rounded-full text-sm text-slate-400">
                              +{project.tech.length - 4} more
                            </span>
                          )}
                        </div>
                        <Link
                          to="/projects"
                          className="inline-flex items-center gap-2 text-purple-400 hover:text-pink-400 transition-colors group"
                        >
                          View All Projects
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </Tilt>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Quick Links */}
        <AnimatedSection className="py-16 pb-24">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            <AnimatedGradientText>
              Explore More
            </AnimatedGradientText>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Projects', description: 'Browse my portfolio of amazing projects', link: '/projects', icon: Code2, color: 'from-purple-600 to-pink-600' },
              { title: 'Skills', description: 'Discover my technical expertise', link: '/skills', icon: Sparkles, color: 'from-pink-600 to-purple-600' },
              { title: 'Experience', description: 'Learn about my professional journey', link: '/experience', icon: Rocket, color: 'from-purple-600 to-blue-600' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Link to={item.link} className="block">
                  <div className="glass rounded-2xl p-6 h-full group cursor-pointer">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold gradient-text mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-purple-400 group-hover:gap-3 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-purple-400 rounded-full p-1 cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-purple-400 rounded-full mx-auto"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
