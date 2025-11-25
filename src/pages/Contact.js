import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import emailjs from '@emailjs/browser';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, MessageSquare, User as UserIcon, AtSign } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedGradientText from '../components/AnimatedGradientText';
import { useToast, ToastContainer } from '../components/Toast';

const Contact = () => {
  const { toasts, addToast, removeToast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill in all required fields.', 'error');
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      addToast('Please enter a valid email address.', 'error');
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    addToast('Sending your message...', 'info', 2000);
    
    try {
      const timestamp = new Date().toLocaleString();
      
      await emailjs.send(
        'service_quay1th',
        'template_4fsca3d',
        {
          user_name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact',
          message: formData.message,
          timestamp: timestamp,
        },
        'Si2AYHuddQeZRlp7G'
      );

      await emailjs.send(
        'service_quay1th',
        'template_i0a3otb',
        {
          user_name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact',
          message: formData.message,
          timestamp: timestamp,
        },
        'Si2AYHuddQeZRlp7G'
      );

      addToast('Message sent successfully! Check your email for confirmation.', 'success', 5000);
      setStatus({ type: 'success', message: 'Thank you for your message! I\'ll get back to you soon. Check your email for confirmation.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      addToast('Failed to send message. Please try again or email me directly.', 'error', 5000);
      setStatus({ type: 'error', message: 'Failed to send message. Please email me directly at abbaskazim135@gmail.com' });
    } finally {
      setIsSubmitting(false);
    }
    
    setTimeout(() => setStatus({ type: '', message: '' }), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'abbaskazim135@gmail.com',
      link: 'mailto:abbaskazim135@gmail.com',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'KazimFedxD',
      link: 'https://github.com/KazimFedxD',
      color: 'from-pink-600 to-purple-600'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'Kazim Abbas',
      link: 'https://www.linkedin.com/in/kazim-abbas-60b1b5257/',
      color: 'from-blue-600 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 relative overflow-hidden">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <AnimatedGradientText>Get In Touch</AnimatedGradientText>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <AnimatedSection delay={0.2}>
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass rounded-3xl p-8 border border-purple-500/10"
              >
                <h2 className="text-3xl font-bold gradient-text mb-6 flex items-center gap-2">
                  <Send className="w-8 h-8" />
                  Send Me a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      Name *
                    </label>
                    <div className="relative">
                      <UserIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        focusedField === 'name' ? 'text-purple-400' : 'text-slate-500'
                      }`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                        className="w-full pl-12 pr-4 py-4 glass rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        placeholder="Your name"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <AtSign className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        focusedField === 'email' ? 'text-purple-400' : 'text-slate-500'
                      }`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        className="w-full pl-12 pr-4 py-4 glass rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      Subject (Optional)
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-4 glass rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="What's this about?"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="w-full px-4 py-4 glass rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                      placeholder="Tell me about your project or just say hi!"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
                      isSubmitting
                        ? 'bg-slate-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Status Messages */}
                <AnimatePresence>
                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
                        status.type === 'success'
                          ? 'bg-green-900/30 border border-green-500/30'
                          : 'bg-red-900/30 border border-red-500/30'
                      }`}
                    >
                      {status.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <p className={status.type === 'success' ? 'text-green-300' : 'text-red-300'}>
                        {status.message}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Tilt>
          </AnimatedSection>

          {/* Contact Info */}
          <div className="space-y-6">
            <AnimatedSection delay={0.3}>
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass rounded-3xl p-8 border border-purple-500/10"
                >
                  <h2 className="text-3xl font-bold gradient-text mb-6">Contact Information</h2>
                  
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <motion.a
                        key={index}
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="flex items-center gap-4 p-4 rounded-xl glass hover:bg-purple-900/30 transition-all group cursor-pointer"
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`p-3 bg-gradient-to-r ${info.color} rounded-xl`}
                        >
                          <info.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-400">{info.title}</div>
                          <div className="text-purple-200 font-medium group-hover:text-purple-300 transition-colors">
                            {info.value}
                          </div>
                        </div>
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          className="text-purple-400"
                        >
                          →
                        </motion.div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </Tilt>
            </AnimatedSection>

            {/* Additional Info */}
            <AnimatedSection delay={0.5}>
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass rounded-3xl p-8 border border-purple-500/10"
                >
                  <h3 className="text-2xl font-bold gradient-text mb-4">Let's Build Something Amazing</h3>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    I'm always interested in hearing about new projects and opportunities. Whether you have a 
                    question or just want to say hi, I'll try my best to get back to you!
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Backend Development', 'Django', 'Python', 'APIs', 'Automation'].map((tag, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="px-3 py-1 glass rounded-full text-sm text-purple-300"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </Tilt>
            </AnimatedSection>
          </div>
        </div>

        {/* Response Time */}
        <AnimatedSection delay={0.7}>
          <div className="text-center glass rounded-3xl p-8 border border-purple-500/10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-bold gradient-text mb-2">Quick Response Time</h3>
            <p className="text-slate-300">
              I typically respond within <span className="text-purple-400 font-semibold">24-48 hours</span>. 
              Looking forward to connecting with you!
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Contact;
