import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Server, Cloud, Smartphone, Monitor, Mail, Clock } from 'lucide-react';

const ArchitectureDiagram = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px] p-8 bg-gray-900 rounded-lg border border-gray-700">
        {/* Title */}
        <h3 className="text-2xl font-bold text-white text-center mb-8">
          System Architecture Overview
        </h3>

        {/* Client Layer */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-purple-400 mb-4 text-center">CLIENT LAYER</h4>
          <div className="flex justify-center gap-6">
            <LayerBox icon={Monitor} title="Web Browser" subtitle="Desktop" color="blue" />
            <LayerBox icon={Smartphone} title="Mobile Device" subtitle="Responsive" color="blue" />
          </div>
          <ArrowDown />
        </div>

        {/* Reverse Proxy */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-purple-400 mb-4 text-center">REVERSE PROXY</h4>
          <div className="flex justify-center">
            <ServiceBox
              icon={Cloud}
              title="Nginx"
              subtitle="Port 80/443"
              features={['Load Balancing', 'SSL Termination', 'Static Files']}
              color="purple"
            />
          </div>
          <div className="flex justify-center gap-32 mt-4">
            <ArrowDown label="/api/*" />
            <ArrowDown label="/*" />
          </div>
        </div>

        {/* Application Layer */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-purple-400 mb-4 text-center">APPLICATION LAYER</h4>
          <div className="flex justify-center gap-8">
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
              features={['SPA', 'Tailwind CSS', 'Framer Motion']}
              color="cyan"
            />
          </div>
          <div className="flex justify-center gap-32 mt-4">
            <ArrowDown />
            <div className="w-24"></div>
          </div>
        </div>

        {/* Service Layer */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-purple-400 mb-4 text-center">SERVICE LAYER</h4>
          <div className="flex justify-center gap-6">
            <ServiceBox
              icon={Database}
              title="PostgreSQL"
              subtitle="Port 5432"
              features={['User Data', 'Tokens', 'Sessions']}
              color="orange"
            />
            <ServiceBox
              icon={Server}
              title="Redis"
              subtitle="Port 6379"
              features={['Cache', 'Message Queue', 'Session Store']}
              color="red"
            />
            <ServiceBox
              icon={Clock}
              title="Celery Worker"
              subtitle="Background Tasks"
              features={['Async Jobs', 'Email Queue', 'Scheduling']}
              color="yellow"
            />
          </div>
        </div>

        {/* External Services */}
        <div>
          <h4 className="text-sm font-semibold text-purple-400 mb-4 text-center">EXTERNAL SERVICES</h4>
          <div className="flex justify-center gap-6">
            <ExternalBox icon={Mail} title="SMTP Server" subtitle="Gmail/Outlook" />
            <ExternalBox icon={Clock} title="Celery Beat" subtitle="Task Scheduler" />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Data Flow</h4>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-400">HTTP Request</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-400">Database Query</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-400">Cache/Queue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-gray-400">Async Task</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const LayerBox = ({ icon: Icon, title, subtitle, color }) => {
  const colors = {
    blue: 'border-blue-500 bg-blue-500/10',
    purple: 'border-purple-500 bg-purple-500/10',
    green: 'border-green-500 bg-green-500/10',
    cyan: 'border-cyan-500 bg-cyan-500/10',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`w-40 p-4 rounded-lg border-2 ${colors[color]} backdrop-blur-sm`}
    >
      <Icon className={`w-8 h-8 text-${color}-400 mx-auto mb-2`} />
      <p className="text-white font-semibold text-center text-sm">{title}</p>
      <p className="text-gray-400 text-center text-xs">{subtitle}</p>
    </motion.div>
  );
};

const ServiceBox = ({ icon: Icon, title, subtitle, features, color }) => {
  const colors = {
    purple: 'border-purple-500 bg-purple-500/10 text-purple-400',
    green: 'border-green-500 bg-green-500/10 text-green-400',
    cyan: 'border-cyan-500 bg-cyan-500/10 text-cyan-400',
    orange: 'border-orange-500 bg-orange-500/10 text-orange-400',
    red: 'border-red-500 bg-red-500/10 text-red-400',
    yellow: 'border-yellow-500 bg-yellow-500/10 text-yellow-400',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`w-56 p-4 rounded-lg border-2 ${colors[color]} backdrop-blur-sm`}
    >
      <Icon className={`w-10 h-10 ${colors[color].split(' ')[2]} mx-auto mb-2`} />
      <p className="text-white font-bold text-center mb-1">{title}</p>
      <p className="text-gray-400 text-center text-xs mb-3">{subtitle}</p>
      <div className="space-y-1">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center justify-center gap-1 text-xs text-gray-400">
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ExternalBox = ({ icon: Icon, title, subtitle }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="w-44 p-4 rounded-lg border-2 border-gray-600 bg-gray-800/50 backdrop-blur-sm"
    >
      <Icon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
      <p className="text-white font-semibold text-center text-sm">{title}</p>
      <p className="text-gray-500 text-center text-xs">{subtitle}</p>
    </motion.div>
  );
};

const ArrowDown = ({ label }) => {
  return (
    <div className="flex flex-col items-center my-2">
      {label && <span className="text-xs text-gray-500 mb-1">{label}</span>}
      <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-transparent"></div>
      <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-purple-500"></div>
    </div>
  );
};

export default ArchitectureDiagram;
