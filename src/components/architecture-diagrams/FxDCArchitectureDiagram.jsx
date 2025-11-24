import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Code, Zap, Package, RefreshCw, CheckCircle } from 'lucide-react';

const FxDCArchitectureDiagram = () => {
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
      <div className="min-w-[900px] p-4 md:p-8 glass rounded-2xl border border-purple-500/20">
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl md:text-2xl font-bold gradient-text text-center mb-4 md:mb-8"
        >
          FxDC Pipeline Architecture
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-center mb-4 md:mb-8 text-xs md:text-sm"
        >
          Data flows through distinct stages: Raw Text → Tokens → AST → Python Objects
        </motion.p>

        {/* Input Layer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 md:mb-8"
        >
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">INPUT LAYER</h4>
          <div className="flex justify-center">
            <StageBox
              icon={FileText}
              title="FxDC File/String"
              subtitle="Raw Text Input"
              features={['Human-readable format', 'Indentation-based', 'Type hints']}
              color="blue"
            />
          </div>
          <ArrowDown label="Character stream" />
        </motion.div>

        {/* Lexical Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4 md:mb-8"
        >
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">LEXICAL ANALYSIS</h4>
          <div className="flex justify-center gap-4 md:gap-8">
            <StageBox
              icon={Search}
              title="Lexer"
              subtitle="Tokenization Engine"
              features={['Character scanning', 'Token generation', 'Keyword detection']}
              color="green"
            />
            <StageBox
              icon={Package}
              title="Class Registry"
              subtitle="Custom Classes"
              features={['@Config.add_class', 'Class metadata', 'Type mapping']}
              color="cyan"
            />
          </div>
          <ArrowDown label="Token stream" />
        </motion.div>

        {/* Syntactic Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-4 md:mb-8"
        >
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">SYNTACTIC ANALYSIS</h4>
          <div className="flex justify-center gap-4 md:gap-8">
            <StageBox
              icon={Code}
              title="Parser"
              subtitle="Recursive Descent"
              features={['AST construction', 'Syntax validation', 'Nesting handling']}
              color="purple"
            />
            <StageBox
              icon={Zap}
              title="Type Resolution"
              subtitle="Type Conversion"
              features={['Type hints parsing', 'Python type mapping', 'Generic support']}
              color="orange"
            />
          </div>
          <ArrowDown label="Parsed structure" />
        </motion.div>

        {/* Object Construction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h4 className="text-sm font-semibold text-purple-400 mb-4 text-center">OBJECT CONSTRUCTION</h4>
          <div className="flex justify-center gap-4 md:gap-8">
            <StageBox
              icon={RefreshCw}
              title="FxDCObject"
              subtitle="Data Structure"
              features={['Field mapping', 'Nested objects', 'List/Dict support']}
              color="pink"
            />
            <StageBox
              icon={CheckCircle}
              title="Class Instantiation"
              subtitle="Constructor Mapping"
              features={['__init__ params', 'Field validation', 'Type checking']}
              color="indigo"
            />
          </div>
          <ArrowDown label="Final output" />
        </motion.div>

        {/* Output Layer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">OUTPUT LAYER</h4>
          <div className="flex justify-center">
            <StageBox
              icon={Package}
              title="Python Objects"
              subtitle="Fully Reconstructed"
              features={['Custom class instances', 'Type integrity', 'Ready to use']}
              color="green"
            />
          </div>
        </motion.div>

        {/* Bidirectional Flow Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 md:mt-8 p-3 md:p-4 glass border border-purple-500/30 rounded-lg"
        >
          <p className="text-xs md:text-sm text-slate-300 text-center">
            <span className="text-purple-400 font-semibold">Round-Trip Serialization:</span> Python objects can be dumped back to FxDC format using the Serialization Engine (write.py)
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Reusable Components
const StageBox = ({ icon: Icon, title, subtitle, features, color }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
  }, []);

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, scale: 0.9 }}
      animate={isMobile ? false : { opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`p-3 md:p-4 rounded-lg glass border border-${color}-500/30 min-w-[180px] md:min-w-[220px]`}
    >
      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Icon className={`w-5 h-5 md:w-6 md:h-6 text-${color}-400`} />
        </motion.div>
        <div>
          <div className="text-xs md:text-sm font-bold text-white">{title}</div>
          <div className="text-[10px] md:text-xs text-slate-400">{subtitle}</div>
        </div>
      </div>
      <div className="space-y-1">
        {features.map((feature, idx) => (
          <div key={idx} className="text-[10px] md:text-xs text-slate-300 flex items-center gap-1">
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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
  }, []);

  return (
    <div className="flex flex-col items-center my-2">
      <div className="text-[10px] md:text-xs text-slate-500 mb-1">{label}</div>
      <motion.div
        initial={isMobile ? false : { opacity: 0 }}
        animate={isMobile ? false : { 
          opacity: 1,
          y: [0, 5, 0]
        }}
        transition={isMobile ? {} : { 
          opacity: { delay: 0.3 },
          y: { duration: 1.5, repeat: Infinity }
        }}
      >
        <svg className="w-5 h-6 md:w-6 md:h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 16v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
};

export default FxDCArchitectureDiagram;
