import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSnippet = ({ title, code, language = 'javascript' }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 mb-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-2 text-purple-400">
          <Code2 size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="font-semibold text-xs sm:text-sm">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs sm:text-sm text-gray-300 transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} className="sm:w-4 sm:h-4 text-green-400" />
              <span className="text-green-400 hidden sm:inline">Copied!</span>
              <span className="text-green-400 sm:hidden">✓</span>
            </>
          ) : (
            <>
              <Copy size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Block */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.75rem',
            lineHeight: '1.5'
          }}
          className="sm:text-sm"
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  );
};

export default CodeSnippet;
