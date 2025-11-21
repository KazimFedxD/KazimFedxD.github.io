import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Server, Cloud, Smartphone, Monitor, Mail, Clock } from 'lucide-react';

const FullStackArchitectureDiagram = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px] p-4 md:p-8 bg-gray-900 rounded-lg border border-gray-700">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-4 md:mb-8">
          System Architecture Overview
        </h3>

        {/* Client Layer */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">CLIENT LAYER</h4>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
            <LayerBox icon={Monitor} title="Web Browser" subtitle="Desktop" color="blue" />
            <LayerBox icon={Smartphone} title="Mobile Device" subtitle="Responsive" color="blue" />
          </div>
          <ArrowDown />
        </div>

        {/* Reverse Proxy */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">REVERSE PROXY</h4>
          <div className="flex justify-center">
            <ServiceBox
              icon={Cloud}
              title="Nginx"
              subtitle="Port 80/443"
              features={['Load Balancing', 'SSL Termination', 'Static Files']}
              color="purple"
            />
          </div>
          <div className="flex justify-center gap-16 md:gap-32 mt-3 md:mt-4">
            <ArrowDown label="/api/*" />
            <ArrowDown label="/*" />
          </div>
        </div>

        {/* Application Layer */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">APPLICATION LAYER</h4>
          <div className="flex justify-center gap-4 md:gap-8">
            <ServiceBox
              icon={Server}
              title="Django Backend"
              subtitle="Port 8000"
              features={['REST API', 'JWT Auth', 'Admin Panel']}
              color="green"
            />
            <ServiceBox
              icon={Monitor}
              title="React Frontend"
              subtitle="Port 3000"
              features={['SPA', 'React 19', 'Context API']}
              color="cyan"
            />
          </div>
          <ArrowDown />
        </div>

        {/* Background Services */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">BACKGROUND SERVICES</h4>
          <div className="flex justify-center gap-4 md:gap-8">
            <ServiceBox
              icon={Mail}
              title="Celery Worker"
              subtitle="Background Tasks"
              features={['Email Sending', 'Async Jobs']}
              color="orange"
            />
            <ServiceBox
              icon={Clock}
              title="Celery Beat"
              subtitle="Scheduler"
              features={['Periodic Tasks', 'Token Cleanup']}
              color="orange"
            />
          </div>
          <ArrowDown />
        </div>

        {/* Data Layer */}
        <div>
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">DATA LAYER</h4>
          <div className="flex justify-center gap-4 md:gap-8">
            <ServiceBox
              icon={Database}
              title="PostgreSQL"
              subtitle="Port 5432"
              features={['User Data', 'Persistent Storage']}
              color="indigo"
            />
            <ServiceBox
              icon={Database}
              title="Redis"
              subtitle="Port 6379"
              features={['Message Broker', 'Cache']}
              color="red"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const LayerBox = ({ icon: Icon, title, subtitle, color }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, y: 20 }}
      animate={isMobile ? false : { opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-lg bg-${color}-900/20 border border-${color}-500/30 min-w-[120px] md:min-w-[150px]`}
    >
      <Icon className={`w-6 h-6 md:w-8 md:h-8 text-${color}-400 mb-2`} />
      <div className="text-xs md:text-sm font-semibold text-white">{title}</div>
      <div className="text-[10px] md:text-xs text-gray-400">{subtitle}</div>
    </motion.div>
  );
};

const ServiceBox = ({ icon: Icon, title, subtitle, features, color }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, scale: 0.9 }}
      animate={isMobile ? false : { opacity: 1, scale: 1 }}
      className={`p-3 md:p-4 rounded-lg bg-${color}-900/20 border border-${color}-500/30 min-w-[160px] md:min-w-[200px]`}
    >
      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
        <Icon className={`w-5 h-5 md:w-6 md:h-6 text-${color}-400`} />
        <div>
          <div className="text-xs md:text-sm font-bold text-white">{title}</div>
          <div className="text-[10px] md:text-xs text-gray-400">{subtitle}</div>
        </div>
      </div>
      <div className="space-y-1">
        {features.map((feature, idx) => (
          <div key={idx} className="text-[10px] md:text-xs text-gray-300 flex items-center gap-1">
            <span className={`text-${color}-400`}>•</span>
            {feature}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ArrowDown = ({ label }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col items-center my-1 md:my-2">
      <div className="text-[10px] md:text-xs text-gray-500 mb-1">{label}</div>
      <motion.div
        initial={isMobile ? false : { opacity: 0 }}
        animate={isMobile ? false : { opacity: 1 }}
        transition={isMobile ? {} : { delay: 0.3 }}
      >
        <svg className="w-5 h-6 md:w-6 md:h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 16v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
};

export default FullStackArchitectureDiagram;
