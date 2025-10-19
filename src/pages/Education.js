import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
  const education = [
    {
      degree: "Bachelor's in Software/Computer Science",
      institution: 'University',
      location: 'Karachi, Pakistan',
      period: 'In Progress',
      status: 'Currently Pursuing',
      description: 'Comprehensive study of computer science fundamentals, software engineering principles, and modern development practices.',
      courses: [
        'Data Structures & Algorithms',
        'Object-Oriented Programming',
        'Database Management Systems',
        'Software Engineering',
        'Web Development',
        'Operating Systems'
      ],
      icon: '🎓',
      color: 'from-blue-600 to-cyan-600'
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
      icon: '🔧'
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
      icon: '🎨'
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
      icon: '⚙️'
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
      icon: '💻'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Education</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Formal education combined with continuous self-learning
            </p>
          </motion.div>

          {/* Formal Education */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 gradient-text">Formal Education</h2>
            {education.map((edu, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                className="card-gradient p-8 rounded-2xl relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-5xl">{edu.icon}</span>
                    <div>
                      <div className={`inline-block px-4 py-1 mb-2 bg-gradient-to-r ${edu.color} rounded-full text-sm font-semibold`}>
                        {edu.status}
                      </div>
                      <h3 className="text-3xl font-bold text-purple-300 mb-2">{edu.degree}</h3>
                      <div className="text-slate-400">
                        <span className="font-semibold">{edu.institution}</span> • {edu.location}
                      </div>
                      <div className="text-purple-400 font-medium mt-1">{edu.period}</div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                    {edu.description}
                  </p>

                  <div>
                    <h4 className="text-xl font-semibold text-purple-300 mb-4">Key Courses</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      {edu.courses.map((course, courseIndex) => (
                        <motion.div
                          key={courseIndex}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center bg-purple-900/20 p-3 rounded-lg"
                        >
                          <span className="text-purple-400 mr-2">✓</span>
                          <span className="text-slate-300 text-sm">{course}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Self-Learning */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-8 gradient-text">Self-Taught Learning</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {selfLearning.map((category, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="card-gradient p-6 rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{category.icon}</span>
                    <h3 className="text-2xl font-bold text-purple-300">{category.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start text-slate-400">
                        <span className="text-purple-400 mr-2 mt-1">▸</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Philosophy */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="card-gradient p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-6 text-center gradient-text">Learning Approach</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Hands-On Practice',
                    description: 'Building real projects to apply theoretical knowledge',
                    icon: '🛠️'
                  },
                  {
                    title: 'Continuous Learning',
                    description: 'Staying updated with latest technologies and best practices',
                    icon: '📖'
                  },
                  {
                    title: 'Problem Solving',
                    description: 'Tackling challenges through coding practice and projects',
                    icon: '🧩'
                  }
                ].map((approach, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-purple-900/20 p-6 rounded-xl text-center"
                  >
                    <div className="text-5xl mb-4">{approach.icon}</div>
                    <h3 className="text-xl font-semibold text-purple-300 mb-2">{approach.title}</h3>
                    <p className="text-slate-400 text-sm">{approach.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="card-gradient p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-center gradient-text">Learning Resources</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {[
                  'Official Documentation',
                  'Online Courses',
                  'YouTube Tutorials',
                  'Technical Blogs',
                  'GitHub Projects',
                  'Stack Overflow',
                  'Dev Communities',
                  'Coding Challenges'
                ].map((resource, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-purple-900/50 border border-purple-500/30 rounded-full text-purple-200 text-sm font-medium hover-glow cursor-default"
                  >
                    {resource}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="card-gradient p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Never Stop Learning</h2>
              <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                The journey of learning never ends. Every day brings new opportunities to grow, 
                improve, and master new skills in this ever-evolving field of technology.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;
