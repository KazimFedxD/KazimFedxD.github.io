import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileCode, Hash, GitBranch, Play, Box, Zap, Terminal } from 'lucide-react';

const FxPyArchitectureDiagram = () => {
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
          FxPy 3-Phase Interpreter Pipeline
        </h3>
        <p className="text-gray-400 text-center mb-4 md:mb-8 text-xs md:text-sm">
          Source Code → Tokens → Abstract Syntax Tree → Execution
        </p>

        {/* Input Layer */}
        <div className="mb-4 md:mb-8">
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
        </div>

        {/* Phase 1: Lexical Analysis */}
        <div className="mb-4 md:mb-8">
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
          <div className="text-center text-gray-500 text-xs mt-2 mb-2 font-mono">
            Output: Token stream with position metadata
          </div>
          <div className="flex justify-center gap-2 mb-2">
            <TokenBadge text="LET" color="purple" />
            <TokenBadge text="IDENTIFIER(x)" color="blue" />
            <TokenBadge text="EQUALS" color="orange" />
            <TokenBadge text="NUMBER(42)" color="green" />
          </div>
          <ArrowDown label="Token[] → Parser" />
        </div>

        {/* Phase 2: Syntactic Analysis */}
        <div className="mb-4 md:mb-8">
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
          <div className="text-center text-gray-500 text-xs mt-2 mb-2 font-mono">
            Output: Abstract Syntax Tree (hierarchical structure)
          </div>
          <div className="flex justify-center">
            <div className="bg-gray-800 p-3 rounded border border-gray-700 text-xs font-mono text-gray-300">
              <div>VarAssignNode</div>
              <div className="ml-4">├─ name: "x"</div>
              <div className="ml-4">└─ value: NumberNode(42)</div>
            </div>
          </div>
          <ArrowDown label="AST → Interpreter" />
        </div>

        {/* Phase 3: Execution */}
        <div className="mb-4 md:mb-8">
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
        </div>

        {/* Output Layer */}
        <div className="mb-4">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">OUTPUT LAYER</h4>
          <div className="flex justify-center gap-3 md:gap-4">
            <StageBox
              icon={Zap}
              title="Runtime Values"
              subtitle="Execution Results"
              features={['Variables updated', 'Functions defined', 'Output printed']}
              color="green"
            />
            <StageBox
              icon={Box}
              title="Error Reporting"
              subtitle="Visual Feedback"
              features={['Line/column arrows', 'Stack traces', 'Helpful messages']}
              color="red"
            />
          </div>
        </div>

        {/* Supporting Components */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">SUPPORTING COMPONENTS</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <SupportBox
              title="Symbol Tables"
              desc="Manage variable scopes"
              features={['Global scope', 'Local scopes', 'Context chaining']}
            />
            <SupportBox
              title="Error Handler"
              desc="errors.py - 88 lines"
              features={['IllegalCharError', 'InvalidSyntaxError', 'RTError']}
            />
            <SupportBox
              title="Position Tracker"
              desc="Track code locations"
              features={['Line numbers', 'Column offsets', 'File names']}
            />
            <SupportBox
              title="String Arrows"
              desc="Visual error markers"
              features={['Extract lines', 'Add arrows (^)', 'Show context']}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 md:mt-8 grid grid-cols-3 gap-3 md:gap-4">
          <StatBox label="Total Code" value="~3,300 lines" color="purple" />
          <StatBox label="Token Types" value="40+" color="blue" />
          <StatBox label="AST Nodes" value="20+" color="green" />
        </div>
      </div>
    </div>
  );
};

// Component Definitions
const StageBox = ({ icon: Icon, title, subtitle, features, color }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const colors = {
    blue: 'from-blue-600 to-blue-700 border-blue-500',
    green: 'from-green-600 to-green-700 border-green-500',
    purple: 'from-purple-600 to-purple-700 border-purple-500',
    indigo: 'from-indigo-600 to-indigo-700 border-indigo-500',
    orange: 'from-orange-600 to-orange-700 border-orange-500',
    cyan: 'from-cyan-600 to-cyan-700 border-cyan-500',
    red: 'from-red-600 to-red-700 border-red-500'
  };

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, y: 20 }}
      animate={isMobile ? false : { opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${colors[color]} border rounded-lg p-3 md:p-4 min-w-[160px] md:min-w-[200px] shadow-lg`}
    >
      <div className="flex items-center mb-2 md:mb-3">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white mr-2" />
        <div>
          <h5 className="text-white font-semibold text-xs md:text-sm">{title}</h5>
          <p className="text-gray-200 text-[10px] md:text-xs">{subtitle}</p>
        </div>
      </div>
      <ul className="space-y-0.5 md:space-y-1">
        {features.map((feature, idx) => (
          <li key={idx} className="text-gray-100 text-[10px] md:text-xs flex items-start">
            <span className="mr-1">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const LargeStageBox = ({ icon: Icon, title, subtitle, leftFeatures, rightFeatures, color }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const colors = {
    green: 'from-green-600 to-green-700 border-green-500',
    purple: 'from-purple-600 to-purple-700 border-purple-500',
    indigo: 'from-indigo-600 to-indigo-700 border-indigo-500'
  };

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, scale: 0.95 }}
      animate={isMobile ? false : { opacity: 1, scale: 1 }}
      className={`bg-gradient-to-br ${colors[color]} border-2 rounded-lg p-4 md:p-6 w-full max-w-3xl shadow-xl`}
    >
      <div className="flex items-center mb-3 md:mb-4">
        <Icon className="w-6 h-6 md:w-8 md:h-8 text-white mr-2 md:mr-3" />
        <div>
          <h5 className="text-white font-bold text-sm md:text-lg">{title}</h5>
          <p className="text-gray-200 text-xs md:text-sm">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <ul className="space-y-1 md:space-y-1.5">
            {leftFeatures.map((feature, idx) => (
              <li key={idx} className="text-gray-100 text-xs md:text-sm flex items-start">
                <span className="mr-2">▸</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="space-y-1 md:space-y-1.5">
            {rightFeatures.map((feature, idx) => (
              <li key={idx} className="text-gray-100 text-xs md:text-sm flex items-start">
                <span className="mr-2">▸</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const SupportBox = ({ title, desc, features }) => {
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
    <motion.div
      initial={isMobile ? false : { opacity: 0 }}
      animate={isMobile ? false : { opacity: 1 }}
      transition={isMobile ? {} : { delay: 0.2 }}
      className="bg-gray-800 border border-gray-700 rounded-lg p-3 md:p-4"
    >
      <h6 className="text-white font-semibold text-xs md:text-sm mb-1">{title}</h6>
      <p className="text-gray-400 text-[10px] md:text-xs mb-2">{desc}</p>
      <ul className="space-y-0.5">
        {features.map((feature, idx) => (
          <li key={idx} className="text-gray-300 text-[10px] md:text-xs">• {feature}</li>
        ))}
      </ul>
    </motion.div>
  );
};

const ArrowDown = ({ label }) => {
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
    <div className="flex flex-col items-center my-3 md:my-4">
      <div className="text-gray-500 text-[10px] md:text-xs mb-1">{label}</div>
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-4 md:h-6 bg-gradient-to-b from-purple-500 to-purple-600"></div>
        <div className="w-2 h-2 md:w-3 md:h-3 border-l-2 border-b-2 border-purple-500 transform rotate-[-45deg] translate-y-[-4px] md:translate-y-[-6px]"></div>
      </div>
    </div>
  );
};

const TokenBadge = ({ text, color }) => {
  const colors = {
    purple: 'bg-purple-600',
    blue: 'bg-blue-600',
    orange: 'bg-orange-600',
    green: 'bg-green-600'
  };
  
  return (
    <span className={`${colors[color]} text-white px-2 py-1 rounded text-xs font-mono`}>
      {text}
    </span>
  );
};

const StatBox = ({ label, value, color }) => {
  const colors = {
    purple: 'text-purple-400',
    blue: 'text-blue-400',
    green: 'text-green-400'
  };
  
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
      <div className={`text-2xl font-bold ${colors[color]}`}>{value}</div>
      <div className="text-gray-400 text-sm mt-1">{label}</div>
    </div>
  );
};

export default FxPyArchitectureDiagram;
