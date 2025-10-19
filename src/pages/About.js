import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const interests = [
    { icon: '🔧', title: 'Backend Development', desc: 'Building robust and scalable server-side applications' },
    { icon: '⚡', title: 'Automation', desc: 'Creating efficient workflows and automated solutions' },
    { icon: '🔗', title: 'Hardware-Software Integration', desc: 'Bridging physical and digital worlds' },
    { icon: '🚀', title: 'Innovation', desc: 'Exploring cutting-edge technologies and methodologies' }
  ];

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
            <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">About Me</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Bio */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="card-gradient p-8 rounded-2xl">
                <h2 className="text-3xl font-bold mb-6 text-purple-300">Who I Am</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  I'm a passionate Software Developer from Karachi, Pakistan, specializing in backend engineering 
                  and full-stack development. Currently pursuing my bachelor's degree in Software/Computer Science, 
                  I combine academic knowledge with hands-on experience in building real-world applications.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  My journey in tech is driven by curiosity and a desire to create solutions that make a difference. 
                  Whether it's developing automation tools, building finance management systems, or working on 
                  innovative projects, I thrive on challenges that push me to learn and grow.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  As a self-taught developer supplementing my formal education, I've developed a strong foundation 
                  in modern web technologies, with a particular focus on Python, Django, and React ecosystems.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Interests */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="card-gradient p-8 rounded-2xl">
                <h2 className="text-3xl font-bold mb-6 text-purple-300">What I Do</h2>
                <div className="space-y-4">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="flex items-start space-x-4 p-4 rounded-xl bg-purple-900/20 hover:bg-purple-800/30 transition-all duration-300"
                    >
                      <span className="text-4xl">{interest.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-purple-200 mb-1">{interest.title}</h3>
                        <p className="text-slate-400 text-sm">{interest.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '10+', label: 'Projects Completed' },
              { number: '5+', label: 'Technologies' },
              { number: '2+', label: 'Years Coding' },
              { number: '1', label: 'Hackathon Win' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="card-gradient p-6 rounded-2xl text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Philosophy */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="card-gradient p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 gradient-text">My Philosophy</h2>
              <p className="text-xl text-slate-300 leading-relaxed italic">
                "Code is not just about making things work—it's about making them work beautifully, efficiently, 
                and sustainably. Every line should serve a purpose, every function should tell a story, 
                and every project should leave an impact."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
