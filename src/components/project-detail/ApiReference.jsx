import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, Check } from 'lucide-react';

const ApiReference = ({ endpoints }) => {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getMethodColor = (method) => {
    const colors = {
      'GET': 'bg-green-500/20 text-green-400 border-green-500',
      'POST': 'bg-blue-500/20 text-blue-400 border-blue-500',
      'PUT': 'bg-orange-500/20 text-orange-400 border-orange-500',
      'DELETE': 'bg-red-500/20 text-red-400 border-red-500',
      'PATCH': 'bg-purple-500/20 text-purple-400 border-purple-500',
    };
    return colors[method] || 'bg-gray-500/20 text-gray-400 border-gray-500';
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass border border-purple-500/30 rounded-lg p-6"
      >
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 3 }}
          >
            <Code className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
          </motion.div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">API Documentation</h3>
            <p className="text-slate-300">
              Complete REST API reference for the backend. All endpoints require JWT authentication 
              unless otherwise specified. Include the token in the Authorization header: 
              <code className="ml-2 px-2 py-1 glass text-purple-400 rounded">
                Authorization: Bearer &lt;your_token&gt;
              </code>
            </p>
          </div>
        </div>
      </motion.div>

      {endpoints.map((endpoint, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ scale: 1.01, y: -3 }}
          className="glass border border-slate-700/50 rounded-lg overflow-hidden"
        >
          {/* Endpoint Header */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-4 mb-3">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-1 rounded-md font-mono text-sm border ${getMethodColor(endpoint.method)}`}
              >
                {endpoint.method}
              </motion.span>
              <code className="text-lg text-purple-400 font-mono">{endpoint.path}</code>
            </div>
            <p className="text-slate-300 mb-2">{endpoint.description}</p>
            {endpoint.authentication && (
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-md border border-orange-500"
              >
                🔒 Authentication Required
              </motion.span>
            )}
          </div>

          {/* Request Body */}
          {endpoint.requestBody && (
            <div className="p-6 border-b border-slate-700/50">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-purple-400">→</span> Request Body
              </h4>
              {Array.isArray(endpoint.requestBody) ? (
                <div className="space-y-3">
                  {endpoint.requestBody.map((field, fieldIdx) => (
                    <motion.div 
                      key={fieldIdx} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: fieldIdx * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="glass rounded-lg p-4 border-l-4 border-purple-500"
                    >
                      <div className="flex items-start gap-2">
                        <code className="text-purple-400 font-mono">{field.name}</code>
                        <span className="text-slate-500">:</span>
                        <span className="text-blue-400">{field.type}</span>
                        {field.required && (
                          <span className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded border border-red-500">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm mt-2">{field.description}</p>
                      {field.example && (
                        <div className="mt-2">
                          <span className="text-slate-500 text-xs">Example: </span>
                          <code className="text-green-400 text-sm">{JSON.stringify(field.example)}</code>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="relative">
                  <motion.button
                    onClick={() => copyToClipboard(endpoint.requestBody, `req-${idx}`)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-3 right-3 p-2 glass hover:bg-slate-600/50 rounded-md transition-colors"
                    title="Copy code"
                  >
                    {copiedId === `req-${idx}` ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </motion.button>
                  <pre className="glass rounded-lg p-4 overflow-x-auto border border-slate-700/50">
                    <code className="text-sm text-slate-300">{endpoint.requestBody}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Response */}
          {endpoint.response && (
            <div className="p-6 border-b border-slate-700/50">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-green-400">←</span> Response ({endpoint.responseCode || '200 OK'})
              </h4>
              <div className="relative">
                <motion.button
                  onClick={() => copyToClipboard(endpoint.response, `res-${idx}`)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-3 right-3 p-2 glass hover:bg-slate-600/50 rounded-md transition-colors"
                  title="Copy code"
                >
                  {copiedId === `res-${idx}` ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </motion.button>
                <pre className="glass rounded-lg p-4 overflow-x-auto border border-slate-700/50">
                  <code className="text-sm text-slate-300">{endpoint.response}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Responses Array (if present) */}
          {endpoint.responses && Array.isArray(endpoint.responses) && (
            <div className="p-6 border-b border-slate-700/50">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-green-400">←</span> Responses
              </h4>
              <div className="space-y-4">
                {endpoint.responses.map((resp, respIdx) => (
                  <motion.div 
                    key={respIdx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: respIdx * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="glass rounded-lg overflow-hidden border border-slate-700/50"
                  >
                    <div className={`px-4 py-2 ${resp.status >= 200 && resp.status < 300 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      <div className="flex items-center gap-3">
                        <span className={`font-mono font-bold ${resp.status >= 200 && resp.status < 300 ? 'text-green-400' : 'text-red-400'}`}>
                          {resp.status}
                        </span>
                        <span className="text-slate-300">{resp.description}</span>
                      </div>
                    </div>
                    <div className="relative">
                      <motion.button
                        onClick={() => copyToClipboard(JSON.stringify(resp.example, null, 2), `resp-${idx}-${respIdx}`)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute top-3 right-3 p-2 glass hover:bg-slate-600/50 rounded-md transition-colors z-10"
                        title="Copy code"
                      >
                        {copiedId === `resp-${idx}-${respIdx}` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-400" />
                        )}
                      </motion.button>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm text-slate-300">{JSON.stringify(resp.example, null, 2)}</code>
                      </pre>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Error Response */}
          {endpoint.errorResponse && (
            <div className="p-6">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-red-400">⚠</span> Error Response ({endpoint.errorCode || '400 Bad Request'})
              </h4>
              <div className="relative">
                <motion.button
                  onClick={() => copyToClipboard(endpoint.errorResponse, `err-${idx}`)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-3 right-3 p-2 glass hover:bg-slate-600/50 rounded-md transition-colors"
                  title="Copy code"
                >
                  {copiedId === `err-${idx}` ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </motion.button>
                <pre className="glass rounded-lg p-4 overflow-x-auto border border-slate-700/50">
                  <code className="text-sm text-slate-300">{endpoint.errorResponse}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Example Request */}
          {endpoint.exampleRequest && (
            <div className="p-6 border-t border-gray-700">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-400" />
                Example Request
              </h4>
              <div className="relative">
                <motion.button
                  onClick={() => copyToClipboard(endpoint.exampleRequest, `ex-${idx}`)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-3 right-3 p-2 glass hover:bg-slate-600/50 rounded-md transition-colors z-10"
                  title="Copy code"
                >
                  {copiedId === `ex-${idx}` ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </motion.button>
                <pre className="glass rounded-lg p-4 overflow-x-auto border border-slate-700/50">
                  <code className="text-sm text-yellow-300">{endpoint.exampleRequest}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Notes */}
          {endpoint.notes && Array.isArray(endpoint.notes) && endpoint.notes.length > 0 && (
            <div className="p-6 glass border-t border-slate-700/50">
              <h4 className="text-white font-semibold mb-3">📝 Notes</h4>
              <ul className="space-y-2">
                {endpoint.notes.map((note, noteIdx) => (
                  <motion.li 
                    key={noteIdx} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: noteIdx * 0.05 }}
                    className="flex items-start gap-2 text-slate-300"
                  >
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{note}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ApiReference;
