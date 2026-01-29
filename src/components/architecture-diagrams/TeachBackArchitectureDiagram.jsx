import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Radio, 
  Wifi, 
  FileText, 
  Database, 
  Brain, 
  Volume2, 
  Speaker, 
  RefreshCw,
  Server,
  Cloud,
  Clock,
  Zap,
  Monitor,
  ArrowDown
} from 'lucide-react';

const TeachBackArchitectureDiagram = () => {
  return (
    <div className="w-full space-y-8">
      {/* Main Real-Time Teaching Flow - THE GOLD */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[900px] p-4 md:p-8 glass rounded-2xl border-2 border-yellow-500/40 bg-gradient-to-br from-yellow-500/5 to-purple-500/5">
          {/* Title with Award Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 mb-3">
              <span className="text-yellow-400">🏆</span>
              <span className="text-yellow-400 text-sm font-semibold">Core Innovation</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold gradient-text">
              Main Real-Time Teaching Flow
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Voice → Text → State → Reasoning → State → Voice → Repeat
            </p>
          </motion.div>

          {/* The Flow Diagram */}
          <div className="flex flex-col items-center gap-2">
            {/* User Input */}
            <FlowStep 
              icon={Mic} 
              title="User Speaks" 
              subtitle="Explain topic verbally"
              color="blue"
              delay={0.1}
              isStart
            />
            <FlowArrow delay={0.15} />

            {/* Frontend Capture */}
            <FlowStep 
              icon={Radio} 
              title="Audio Capture" 
              subtitle="Web Audio API, 250ms chunks"
              color="cyan"
              delay={0.2}
            />
            <FlowArrow delay={0.25} />

            {/* WebSocket Stream */}
            <FlowStep 
              icon={Wifi} 
              title="WebSocket Stream" 
              subtitle="Binary audio frames"
              color="purple"
              delay={0.3}
            />
            <FlowArrow delay={0.35} />

            {/* STT Processing */}
            <FlowStep 
              icon={FileText} 
              title="Speech-to-Text" 
              subtitle="Deepgram streaming"
              color="green"
              delay={0.4}
              external="Deepgram"
            />
            <FlowArrow delay={0.45} />

            {/* Session State Update 1 */}
            <FlowStep 
              icon={Database} 
              title="SessionState Update" 
              subtitle="Transcript + understanding"
              color="indigo"
              delay={0.5}
              highlight
            />
            <FlowArrow delay={0.55} />

            {/* AI Reasoning */}
            <FlowStep 
              icon={Brain} 
              title="AI Reasoning" 
              subtitle="Detect confusion, decide interruption"
              color="orange"
              delay={0.6}
              external="OpenAI"
            />
            <FlowArrow delay={0.65} />

            {/* Session State Update 2 */}
            <FlowStep 
              icon={Database} 
              title="SessionState Update" 
              subtitle="Questions, confidence, gaps"
              color="indigo"
              delay={0.7}
              highlight
            />
            <FlowArrow delay={0.75} />

            {/* TTS */}
            <FlowStep 
              icon={Volume2} 
              title="Text-to-Speech" 
              subtitle="ElevenLabs / Deepgram"
              color="pink"
              delay={0.8}
              external="ElevenLabs"
            />
            <FlowArrow delay={0.85} />

            {/* User Hears */}
            <FlowStep 
              icon={Speaker} 
              title="Audio Playback" 
              subtitle="User hears AI response"
              color="blue"
              delay={0.9}
            />
            
            {/* Loop Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
            >
              <RefreshCw className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-yellow-400 font-semibold">Loop Repeats</span>
            </motion.div>
          </div>

          {/* Core Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            <PrincipleCard text="SessionState updated AFTER STT and AFTER AI reasoning" />
            <PrincipleCard text="AI responses grounded in current session state" />
            <PrincipleCard text="Interruptions cancelable if user starts speaking" />
            <PrincipleCard text="Fully real-time, NOT turn-based interaction" />
          </motion.div>
        </div>
      </div>

      {/* System Architecture Overview */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[900px] p-4 md:p-8 glass rounded-2xl border border-purple-500/20">
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl font-bold gradient-text text-center mb-6"
          >
            System Architecture Overview
          </motion.h3>

          {/* Client Layer */}
          <ArchitectureLayer
            title="CLIENT LAYER"
            delay={0.1}
            components={[
              { icon: Monitor, name: "React SPA", subtitle: "UI/State", color: "blue" },
              { icon: Wifi, name: "WebSocket", subtitle: "Real-time", color: "blue" },
              { icon: Volume2, name: "Web Audio", subtitle: "Playback", color: "blue" }
            ]}
          />
          <LayerArrow />

          {/* Reverse Proxy */}
          <ArchitectureLayer
            title="REVERSE PROXY"
            delay={0.2}
            components={[
              { icon: Cloud, name: "Nginx", subtitle: "Port 80", color: "purple", wide: true }
            ]}
          />
          <LayerArrow labels={["/api/*", "/*", "/ws/*"]} />

          {/* Application Layer */}
          <ArchitectureLayer
            title="APPLICATION LAYER"
            delay={0.3}
            components={[
              { icon: Server, name: "Django + Channels", subtitle: "API + WebSocket", color: "green" },
              { icon: Zap, name: "Celery Worker", subtitle: "Background", color: "orange" },
              { icon: Clock, name: "Celery Beat", subtitle: "Scheduler", color: "orange" }
            ]}
          />
          <LayerArrow />

          {/* Data Layer */}
          <ArchitectureLayer
            title="DATA LAYER"
            delay={0.4}
            components={[
              { icon: Database, name: "PostgreSQL", subtitle: "Port 5432", color: "indigo" },
              { icon: Database, name: "Redis", subtitle: "Port 6379", color: "red" }
            ]}
          />
          <LayerArrow />

          {/* External Services */}
          <ArchitectureLayer
            title="EXTERNAL SERVICES"
            delay={0.5}
            components={[
              { icon: Mic, name: "Deepgram", subtitle: "STT", color: "green" },
              { icon: Brain, name: "Groq", subtitle: "AI/LLM", color: "orange" },
              { icon: Volume2, name: "ElevenLabs", subtitle: "TTS", color: "pink" }
            ]}
            isExternal
          />
        </div>
      </div>
    </div>
  );
};

// Flow Step Component
const FlowStep = ({ icon: Icon, title, subtitle, color, delay, isStart, external, highlight }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, scale: 0.8 }}
      animate={isMobile ? false : { opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className={`
        flex items-center gap-4 p-4 rounded-xl w-full max-w-md
        glass border transition-all duration-300
        ${highlight ? 'border-yellow-500/40 bg-yellow-500/10' : `border-${color}-500/30`}
        ${isStart ? 'ring-2 ring-blue-500/30' : ''}
      `}
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className={`p-3 rounded-lg bg-${color}-500/20`}
      >
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </motion.div>
      <div className="flex-1">
        <div className="font-semibold text-white">{title}</div>
        <div className="text-xs text-slate-400">{subtitle}</div>
      </div>
      {external && (
        <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
          {external}
        </span>
      )}
    </motion.div>
  );
};

// Flow Arrow Component
const FlowArrow = ({ delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <ArrowDown className="w-5 h-5 text-purple-400" />
    </motion.div>
  );
};

// Principle Card Component
const PrincipleCard = ({ text }) => (
  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
    <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
    <span className="text-sm text-slate-300">{text}</span>
  </div>
);

// Architecture Layer Component
const ArchitectureLayer = ({ title, delay, components, isExternal }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, y: 20 }}
      animate={isMobile ? false : { opacity: 1, y: 0 }}
      transition={{ delay }}
      className="mb-4"
    >
      <h4 className="text-xs font-semibold text-purple-400 mb-3 text-center">{title}</h4>
      <div className="flex justify-center flex-wrap gap-4">
        {components.map((comp, idx) => (
          <ServiceBox
            key={idx}
            icon={comp.icon}
            name={comp.name}
            subtitle={comp.subtitle}
            color={comp.color}
            wide={comp.wide}
            isExternal={isExternal}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Service Box Component
const ServiceBox = ({ icon: Icon, name, subtitle, color, wide, isExternal }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, scale: 0.9 }}
      animate={isMobile ? false : { opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`
        p-4 rounded-lg glass border border-${color}-500/30
        ${wide ? 'min-w-[300px]' : 'min-w-[150px]'}
        ${isExternal ? 'bg-gradient-to-br from-purple-500/10 to-transparent' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Icon className={`w-5 h-5 text-${color}-400`} />
        </motion.div>
        <div>
          <div className="text-sm font-bold text-white">{name}</div>
          <div className="text-xs text-slate-400">{subtitle}</div>
        </div>
      </div>
    </motion.div>
  );
};

// Layer Arrow Component
const LayerArrow = ({ labels }) => (
  <div className="flex justify-center items-center gap-8 my-3">
    {labels ? (
      labels.map((label, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <span className="text-xs text-slate-500 mb-1">{label}</span>
          <ArrowDown className="w-4 h-4 text-purple-400" />
        </div>
      ))
    ) : (
      <ArrowDown className="w-5 h-5 text-purple-400" />
    )}
  </div>
);

export default TeachBackArchitectureDiagram;
