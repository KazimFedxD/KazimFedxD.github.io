import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { GraduationCap, BookOpen, Award, Calendar, MapPin, CheckCircle2, Sparkles, Brain } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedGradientText from '../components/AnimatedGradientText';

const Education = () => {
  const education = [
    {
      degree: "Intermediate (11-12), Computer Science",
      institution: 'Fatimiyah Boys College',
      location: 'Karachi, Pakistan',
      period: '2024 - Present',
      status: 'Currently in 12th Grade',
      description: 'Advanced study in Computer Science with focus on programming fundamentals, algorithms, and software development principles.',
      courses: [
        'Computer Science',
        'Mathematics',
        'Physics',
        'Programming Fundamentals',
        'Data Structures',
        'Web Development'
      ],
      icon: GraduationCap,
      color: 'from-blue-600 to-cyan-600',
      current: true
    },
    {
      degree: "Matriculation, Computer Science",
      institution: 'Happy Home High School (HHS)',
      location: 'Karachi, Pakistan',
      period: '2016 - 2024',
      status: 'Completed',
      description: 'Foundation in Computer Science with comprehensive coverage of basic programming concepts and computer fundamentals.',
      courses: [
        'Computer Science',
        'Mathematics',
        'Science',
        'Basic Programming',
        'Computer Fundamentals',
        'English'
      ],
      icon: Award,
      color: 'from-green-600 to-emerald-600',
      current: false
    }
  ];

  const selfLearning = [
    {
      category: 'Backend Development',
      topics: [
        'Django & Django REST Framework',
        'Python Advanced Concepts',
        'PostgreSQL & Database Design',
        'API Development & Best Practices',
        'Celery & Task Queues',
        'MinIO Object Storage'
      ],
      icon: '🔧',
      color: 'from-purple-600 to-pink-600'
    },
    {
      category: 'Frontend Development',
      topics: [
        'React & Modern JavaScript',
        'State Management (Context, Redux)',
        'Tailwind CSS & Responsive Design',
        'Framer Motion Animations',
        'Component Architecture',
        'Performance Optimization'
      ],
      icon: '🎨',
      color: 'from-blue-600 to-purple-600'
    },
    {
      category: 'DevOps & Tools',
      topics: [
        'Docker & Containerization',
        'Git Version Control',
        'Linux System Administration',
        'CI/CD Pipelines',
        'Deployment Strategies',
        'Cloud Platforms'
      ],
      icon: '⚙️',
      color: 'from-orange-600 to-red-600'
    },
    {
      category: 'Computer Science Fundamentals',
      topics: [
        'Data Structures & Algorithms',
        'Design Patterns',
        'System Design',
        'Problem Solving',
        'Code Optimization',
        'Software Architecture'
      ],
      icon: '💻',
      color: 'from-green-600 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
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
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <AnimatedGradientText gradient="from-blue-400 via-purple-400 to-blue-600">
              Education
            </AnimatedGradientText>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            My academic journey and continuous learning path
          </p>
        </AnimatedSection>

        {/* Formal Education */}
        <AnimatedSection delay={0.2}>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <AnimatedGradientText>Formal Education</AnimatedGradientText>
          </h2>

          <div className="space-y-6 mb-16">
            {education.map((edu, index) => (
              <Tilt key={index} tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className={`glass rounded-3xl p-8 border border-purple-500/10 ${
                    edu.current ? 'ring-2 ring-blue-500/30' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`p-4 bg-gradient-to-r ${edu.color} rounded-2xl flex items-center justify-center self-start`}
                    >
                      <edu.icon className="w-10 h-10 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      {/* Header */}
                      <div className="mb-4">
                        {edu.current && (
                          <motion.span
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-block px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-xs text-blue-300 mb-3"
                          >
                            Currently Studying
                          </motion.span>
                        )}
                        <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">{edu.degree}</h3>
                        <h4 className="text-xl text-purple-300 font-semibold mb-2">{edu.institution}</h4>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {edu.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {edu.location}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            edu.current 
                              ? 'bg-blue-900/30 border border-blue-500/30 text-blue-300'
                              : 'bg-green-900/30 border border-green-500/30 text-green-300'
                          }`}>
                            {edu.status}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 leading-relaxed mb-6">{edu.description}</p>

                      {/* Courses */}
                      <div>
                        <h5 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          Key Subjects
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1 glass rounded-full text-sm text-blue-300 border border-blue-500/30"
                            >
                              {course}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </AnimatedSection>

        {/* Self Learning */}
        <AnimatedSection delay={0.4}>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            <AnimatedGradientText>Self-Taught Skills</AnimatedGradientText>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {selfLearning.map((category, index) => (
              <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-3xl p-8 border border-purple-500/10 h-full"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                      className="text-4xl"
                    >
                      {category.icon}
                    </motion.span>
                    <h3 className="text-2xl font-bold gradient-text">{category.category}</h3>
                  </div>

                  {/* Topics */}
                  <ul className="space-y-3">
                    {category.topics.map((topic, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-2 text-slate-300"
                      >
                        <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
                        <span>{topic}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </AnimatedSection>

        {/* Learning Philosophy */}
        <AnimatedSection delay={0.6} className="mt-16">
          <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass rounded-3xl p-8 border border-purple-500/10 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4"
              >
                <Sparkles className="w-12 h-12 text-purple-400" />
              </motion.div>

              <h3 className="text-3xl font-bold gradient-text mb-4">Continuous Learning</h3>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Beyond formal education, I believe in continuous self-improvement through hands-on projects, 
                online courses, and staying updated with the latest technologies. Every project is an opportunity 
                to learn something new and push the boundaries of what I can create.
              </p>

              <motion.div
                className="mt-6 flex flex-wrap justify-center gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {['Learn by Doing', 'Stay Curious', 'Never Stop Growing'].map((text, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="px-4 py-2 glass rounded-full text-sm text-purple-300 border border-purple-500/30"
                  >
                    {text}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </Tilt>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Education;
