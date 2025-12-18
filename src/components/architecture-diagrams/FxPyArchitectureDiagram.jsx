import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoveDown } from 'lucide-react';
import { FileCode, Hash, GitBranch, Play, Terminal, Zap } from 'lucide-react';

const FxPyArchitectureDiagram = () => {

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px] p-4 md:p-8 glass rounded-2xl border border-purple-500/20">
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl md:text-2xl font-bold gradient-text text-center mb-4 md:mb-8"
        >
          FxPy 3-Phase Interpreter Pipeline
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-center mb-4 md:mb-8 text-xs md:text-sm"
        >
          Source Code → Tokens → Abstract Syntax Tree → Execution
        </motion.p>

        {/* Input Layer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 md:mb-8"
        >
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">INPUT LAYER</h4>
          <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
            <StageBox
              icon={FileCode}
              title=".fx Source Files"
              subtitle="FxPy Code"
              features={['Functions & Variables', 'Control Flow', 'Module Imports']}
              color="blue"
            />
            <StageBox
              icon={Terminal}
              title="REPL Input"
              subtitle="Interactive Shell"
              features={['Live Code', 'Immediate Feedback', 'Persistent State']}
              color="cyan"
            />
          </div>
          <ArrowDown label="Raw source code (string)" />
        </motion.div>

        {/* Phase 1: Lexical Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4 md:mb-8"
        >
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">PHASE 1: LEXICAL ANALYSIS</h4>
          <div className="flex justify-center">
            <LargeStageBox
              icon={Hash}
              title="Lexer (lexer.py)"
              subtitle="305 lines - Tokenization Engine"
              leftFeatures={[
                'Character-by-character scanning',
                'Recognizes 40+ token types',
                'Tracks line/column positions',
                'Handles keywords & operators'
              ]}
              rightFeatures={[
                'KEYWORDS: let, fex, if, for, while',
                'OPERATORS: +, -, *, /, ^, ==, !=',
                'LITERALS: numbers, strings, lists',
                'DELIMITERS: (, ), {, }, [, ]'
              ]}
              color="green"
            />
          </div>
          <div className="text-center text-slate-500 text-xs mt-2 mb-2 font-mono">
            Output: Token stream with position metadata
          </div>
          <div className="flex justify-center gap-2 mb-2 flex-wrap">
            <TokenBadge text="LET" color="purple" />
            <TokenBadge text="IDENTIFIER(x)" color="blue" />
            <TokenBadge text="EQUALS" color="orange" />
            <TokenBadge text="NUMBER(42)" color="green" />
          </div>
          <ArrowDown label="Token[] → Parser" />
        </motion.div>

        {/* Phase 2: Syntactic Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-4 md:mb-8"
        >
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">PHASE 2: SYNTACTIC ANALYSIS</h4>
          <div className="flex justify-center">
            <LargeStageBox
              icon={GitBranch}
              title="Parser (fxparser.py)"
              subtitle="1,407 lines - Recursive Descent Parser"
              leftFeatures={[
                'Builds Abstract Syntax Tree',
                'Validates syntax correctness',
                'Handles operator precedence',
                'Processes nested structures'
              ]}
              rightFeatures={[
                '20+ AST Node Types:',
                'VarAssignNode, BinOpNode',
                'FuncDefNode, CallNode',
                'IfNode, ForNode, WhileNode',
                'ImportNode, ListNode, DictNode'
              ]}
              color="purple"
            />
          </div>
          <div className="text-center text-slate-500 text-xs mt-2 mb-2 font-mono">
            Output: Abstract Syntax Tree (hierarchical structure)
          </div>
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-3 rounded border border-purple-500/30 text-xs font-mono text-slate-300"
            >
              <div>VarAssignNode</div>
              <div className="ml-4">├─ name: "x"</div>
              <div className="ml-4">└─ value: NumberNode(42)</div>
            </motion.div>
          </div>
          <ArrowDown label="AST → Interpreter" />
        </motion.div>

        {/* Phase 3: Execution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-4 md:mb-8"
        >
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">PHASE 3: EXECUTION</h4>
          <div className="flex justify-center">
            <LargeStageBox
              icon={Play}
              title="Interpreter (interpreter.py)"
              subtitle="1,393 lines - Tree-Walking Interpreter"
              leftFeatures={[
                'Visitor pattern for AST traversal',
                'Symbol tables for scoping',
                'Dynamic type system',
                'Function call management'
              ]}
              rightFeatures={[
                'Runtime Values:',
                'Number, String, List, Dict',
                'Function, BuiltInFunction',
                'Context & error propagation',
                '25+ built-in functions'
              ]}
              color="indigo"
            />
          </div>
          <ArrowDown label="Execution results" />
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
              icon={Zap}
              title="Runtime Result"
              subtitle="Final Output"
              features={['Return values', 'Side effects', 'Error messages']}
              color="green"
            />
          </div>
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
      className={`p-3 md:p-4 rounded-lg glass border border-${color}-500/30 min-w-[160px] md:min-w-[200px]`}
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

const LargeStageBox = ({ icon: Icon, title, subtitle, leftFeatures, rightFeatures, color }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
  }, []);

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, scale: 0.9 }}
      animate={isMobile ? false : { opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`p-4 md:p-6 rounded-lg glass border border-${color}-500/30 max-w-4xl w-full`}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Icon className={`w-6 h-6 md:w-8 md:h-8 text-${color}-400`} />
        </motion.div>
        <div>
          <div className="text-base md:text-lg font-bold text-white">{title}</div>
          <div className="text-xs md:text-sm text-slate-400">{subtitle}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          {leftFeatures.map((feature, idx) => (
            <div key={idx} className="text-xs text-slate-300 flex items-center gap-2">
              <span className={`text-${color}-400`}>→</span>
              {feature}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {rightFeatures.map((feature, idx) => (
            <div key={idx} className="text-xs text-slate-300 flex items-center gap-2">
              <span className={`text-${color}-400`}>→</span>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const TokenBadge = ({ text, color }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.1 }}
    className={`px-2 py-1 rounded text-xs font-mono glass border border-${color}-500/30 text-${color}-300`}
  >
    {text}
  </motion.span>
);

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
        <MoveDown className="w-5 h-6 md:w-6 md:h-8 text-purple-400" />
      </motion.div>
    </div>
  );
};

export default FxPyArchitectureDiagram;
