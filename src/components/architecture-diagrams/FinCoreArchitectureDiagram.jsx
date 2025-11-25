import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Shield, 
  Server, 
  Database, 
  Zap, 
  Clock, 
  GitBranch,
  Layers,
  Users,
  Lock,
  Mail
} from 'lucide-react';

const FinCoreArchitectureDiagram = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  // Reusable components
  const LayerBox = ({ title, children, color = "purple" }) => {
    const colorClasses = {
      purple: "border-purple-500/30",
      blue: "border-blue-500/30",
      green: "border-green-500/30",
      indigo: "border-indigo-500/30",
      pink: "border-pink-500/30",
      orange: "border-orange-500/30"
    };

    return (
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className={`glass border-2 rounded-lg p-6 ${colorClasses[color]}`}
      >
        <h4 className="text-sm font-semibold text-slate-400 mb-4 text-center uppercase tracking-wider">
          {title}
        </h4>
        {children}
      </motion.div>
    );
  };

  const ServiceBox = ({ icon: Icon, name, port, description, color = "white" }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        className={`
          glass
          border border-${color}-500/30
          rounded-lg p-4 
          flex flex-col items-center justify-center
          text-center
          min-h-[140px]
        `}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Icon className={`text-${color}-400 mb-2`} size={32} />
        </motion.div>
        <h5 className="text-white font-semibold text-sm mb-1">{name}</h5>
        {port && (
          <span className="text-xs text-slate-400 mb-2">:{port}</span>
        )}
        <p className="text-xs text-slate-500">{description}</p>
      </motion.div>
    );
  };

  const ArrowDown = ({ label = "" }) => {
    return (
      <motion.div 
        className="flex flex-col items-center my-3"
        animate={{ opacity: 1, y: [0, 5, 0] }}
        transition={{ y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-transparent"></div>
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-purple-500"></div>
        {label && (
          <span className="text-xs text-purple-400 mt-1 font-mono">{label}</span>
        )}
      </motion.div>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <motion.div 
        className="min-w-[900px] p-8 glass rounded-2xl border border-purple-500/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent text-center mb-8">
          FinCore System Architecture
        </h3>

        {/* Layer 1: Client Layer */}
        <LayerBox title="Client Layer" color="blue">
          <div className="grid grid-cols-2 gap-4">
            <ServiceBox
              icon={Globe}
              name="Web Browser"
              description="React 19 SPA with Tailwind CSS"
              color="blue"
            />
            <ServiceBox
              icon={Users}
              name="Mobile Browser"
              description="Responsive UI on mobile devices"
              color="blue"
            />
          </div>
        </LayerBox>

        <ArrowDown label="HTTPS" />

        {/* Layer 2: Nginx Proxy */}
        <LayerBox title="Nginx Reverse Proxy" color="purple">
          <div className="grid grid-cols-1 gap-4">
            <ServiceBox
              icon={Shield}
              name="Nginx"
              port="80/443"
              description="SSL termination, static files, API gateway"
              color="purple"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="glass rounded p-2 border border-purple-500/20">
              <code className="text-purple-400">{'/* → React Frontend'}</code>
              <p className="text-slate-500 mt-1">Serve static files</p>
            </div>
            <div className="glass rounded p-2 border border-purple-500/20">
              <code className="text-purple-400">/api/* → Django Backend</code>
              <p className="text-slate-500 mt-1">Proxy API requests</p>
            </div>
          </div>
        </LayerBox>

        <ArrowDown />

        {/* Layer 3: Application Layer */}
        <LayerBox title="Application Layer" color="green">
          <div className="grid grid-cols-2 gap-4">
            <ServiceBox
              icon={Server}
              name="Django Backend"
              port="8000"
              description="RESTful API with DRF + JWT Auth"
              color="green"
            />
            <ServiceBox
              icon={Layers}
              name="React Frontend"
              port="3000"
              description="SPA with React Router & Context API"
              color="green"
            />
          </div>
          
          {/* API Endpoints Preview */}
          <div className="mt-4 glass rounded p-3 border border-green-500/20">
            <h5 className="text-green-400 font-semibold text-xs mb-2">🔑 Key API Endpoints</h5>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="text-slate-400">
                <span className="text-blue-400">POST</span> /api/auth/login/
              </div>
              <div className="text-slate-400">
                <span className="text-green-400">GET</span> /api/report/
              </div>
              <div className="text-slate-400">
                <span className="text-green-400">GET</span> /api/income/
              </div>
              <div className="text-slate-400">
                <span className="text-green-400">GET</span> /api/expense/
              </div>
              <div className="text-slate-400">
                <span className="text-blue-400">POST</span> /api/categories/
              </div>
              <div className="text-slate-400">
                <span className="text-orange-400">DELETE</span> /api/income/:id/
              </div>
            </div>
          </div>
        </LayerBox>

        <ArrowDown />

        {/* Layer 4: Background Services */}
        <LayerBox title="Background Services" color="orange">
          <div className="grid grid-cols-2 gap-4">
            <ServiceBox
              icon={Mail}
              name="Celery Worker"
              description="Async email sending & task processing"
              color="orange"
            />
            <ServiceBox
              icon={Clock}
              name="Celery Beat"
              description="Scheduled tasks (token cleanup)"
              color="orange"
            />
          </div>
          
          {/* Task Examples */}
          <div className="mt-4 glass rounded p-3 border border-orange-500/20">
            <h5 className="text-orange-400 font-semibold text-xs mb-2">⚙️ Background Tasks</h5>
            <div className="space-y-1 text-xs text-slate-400">
              <div>• <code className="text-orange-300">send_verification_email()</code> - Email delivery</div>
              <div>• <code className="text-orange-300">clear_verification_tokens()</code> - Cleanup expired tokens</div>
              <div>• <code className="text-orange-300">generate_monthly_report()</code> - Scheduled reports (planned)</div>
            </div>
          </div>
        </LayerBox>

        <ArrowDown />

        {/* Layer 5: Data Layer */}
        <LayerBox title="Data Layer" color="indigo">
          <div className="grid grid-cols-2 gap-4">
            <ServiceBox
              icon={Database}
              name="PostgreSQL"
              port="5432"
              description="Primary data storage (users, transactions)"
              color="indigo"
            />
            <ServiceBox
              icon={Zap}
              name="Redis"
              port="6379"
              description="Message broker + caching"
              color="indigo"
            />
          </div>
          
          {/* Database Schema Preview */}
          <div className="mt-4 glass rounded p-3 border border-indigo-500/20">
            <h5 className="text-indigo-400 font-semibold text-xs mb-2">🗄️ Database Models</h5>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
              <div>• <span className="text-indigo-300">AuthAcc</span> (Users)</div>
              <div>• <span className="text-indigo-300">Category</span> (Hierarchical)</div>
              <div>• <span className="text-indigo-300">Income</span> (Transactions)</div>
              <div>• <span className="text-indigo-300">Expense</span> (Transactions)</div>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              All models have <code className="text-indigo-400">user</code> FK for data isolation
            </div>
          </div>
        </LayerBox>

        <ArrowDown />

        {/* Layer 6: Build & Development */}
        <LayerBox title="Build Pipeline & DevOps" color="pink">
          <div className="grid grid-cols-3 gap-4">
            <ServiceBox
              icon={GitBranch}
              name="Docker Compose"
              description="Multi-container orchestration"
              color="pink"
            />
            <ServiceBox
              icon={Lock}
              name="JWT Middleware"
              description="Cookie-based auth validation"
              color="pink"
            />
            <ServiceBox
              icon={Server}
              name="Hot Reload"
              description="Dev mode with live updates"
              color="pink"
            />
          </div>
        </LayerBox>

        {/* Request Flow Summary */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 glass bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-6"
        >
          <h4 className="text-white font-semibold mb-4 text-center">📊 Request Flow Example: Login</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-blue-400 font-mono">1.</span>
              <span className="text-slate-300">User submits email/password from React login form</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-purple-400 font-mono">2.</span>
              <span className="text-slate-300">Nginx forwards <code className="text-purple-300">/api/auth/login/</code> to Django backend</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400 font-mono">3.</span>
              <span className="text-slate-300">Django validates credentials against PostgreSQL AuthAcc table</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-orange-400 font-mono">4.</span>
              <span className="text-slate-300">Django generates JWT access (5 min) & refresh (7 days) tokens</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-indigo-400 font-mono">5.</span>
              <span className="text-slate-300">Tokens set in HTTP-only cookies and returned to React app</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-pink-400 font-mono">6.</span>
              <span className="text-slate-300">React stores user state and redirects to dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-400 font-mono">7.</span>
              <span className="text-slate-300">Subsequent requests auto-include cookies for authentication</span>
            </div>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div 
          variants={itemVariants}
          className="mt-6 grid grid-cols-3 gap-4 text-xs"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -3 }}
            className="glass rounded p-3 border border-green-500/20"
          >
            <h5 className="text-green-400 font-semibold mb-2">✅ Scalability</h5>
            <p className="text-slate-400">Stateless JWT allows horizontal scaling. Each container independent.</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -3 }}
            className="glass rounded p-3 border border-blue-500/20"
          >
            <h5 className="text-blue-400 font-semibold mb-2">🔒 Security</h5>
            <p className="text-slate-400">HTTP-only cookies prevent XSS. User-specific data isolation in DB.</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -3 }}
            className="glass rounded p-3 border border-purple-500/20"
          >
            <h5 className="text-purple-400 font-semibold mb-2">⚡ Performance</h5>
            <p className="text-slate-400">Redis caching, connection pooling, indexed queries for speed.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FinCoreArchitectureDiagram;
