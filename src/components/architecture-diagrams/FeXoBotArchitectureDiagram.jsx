import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Radio, 
  Zap, 
  Bot, 
  FileText, 
  Target, 
  Database, 
  Globe, 
  Link,
  MessageSquare,
  Shield,
  GamepadIcon,
  TrendingUp,
  Ticket,
  Calculator,
  Image as ImageIcon,
  Brain,
  Server
} from 'lucide-react';

const FeXoBotArchitectureDiagram = () => {
  const ArrowDown = () => (
    <motion.div 
      className="flex justify-center my-4"
      animate={{ opacity: 1, y: [0, 5, 0] }}
      transition={{ y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
    >
      <div className="text-purple-400 text-2xl">↓</div>
    </motion.div>
  );

  const ComponentBox = ({ icon: Icon, title, subtitle, color = "blue", delay = 0 }) => {
    const colorMap = {
      blue: "border-blue-500/30 bg-blue-500/10",
      green: "border-green-500/30 bg-green-500/10",
      purple: "border-purple-500/30 bg-purple-500/10",
      indigo: "border-indigo-500/30 bg-indigo-500/10",
      orange: "border-orange-500/30 bg-orange-500/10",
      pink: "border-pink-500/30 bg-pink-500/10"
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        whileHover={{ scale: 1.05, y: -5 }}
        className={`glass p-4 rounded-lg border-2 ${colorMap[color]}`}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Icon className="w-6 h-6 text-white flex-shrink-0" />
          </motion.div>
          <div className="min-w-0">
            <div className="font-semibold text-white text-base truncate">{title}</div>
            {subtitle && <div className="text-xs text-slate-400 mt-1 line-clamp-2">{subtitle}</div>}
          </div>
        </div>
      </motion.div>
    );
  };

  const CogBox = ({ icon: Icon, title, commands, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -3 }}
      className="glass p-3 rounded-lg border-2 border-green-500/30 bg-green-500/10"
    >
      <div className="flex items-center gap-2 mb-2">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, delay }}
        >
          <Icon className="w-5 h-5 text-green-400 flex-shrink-0" />
        </motion.div>
        <div className="font-semibold text-white text-sm truncate">{title}</div>
      </div>
      <div className="text-xs text-slate-400 line-clamp-1">{commands}</div>
    </motion.div>
  );

  const HandlerBox = ({ icon: Icon, title, events, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -3 }}
      className="glass p-3 rounded-lg border-2 border-pink-500/30 bg-pink-500/10"
    >
      <div className="flex items-center gap-2 mb-2">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, delay }}
        >
          <Icon className="w-5 h-5 text-pink-400" />
        </motion.div>
        <div className="font-semibold text-white text-sm truncate">{title}</div>
      </div>
      <div className="text-xs text-slate-400 line-clamp-1">{events}</div>
    </motion.div>
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px] p-8 glass rounded-2xl border border-purple-500/20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent text-center mb-2">
            FeXoBot Architecture
          </h3>
          <p className="text-sm text-slate-400 text-center mb-8">
            Modular Cog-Based Discord Bot with Event-Driven Architecture
          </p>
        </motion.div>

        {/* Layer 1: Discord User */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-sm font-semibold text-blue-400 mb-4 text-center">
            USER INTERFACE LAYER
          </h4>
          <div className="flex justify-center">
            <ComponentBox
              icon={User}
              title="Discord Users"
              subtitle="Server members using slash commands and interacting with bot"
              color="blue"
              delay={0.3}
            />
          </div>
        </motion.div>

        <ArrowDown />

        {/* Layer 2: Discord Gateway */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-sm font-semibold text-indigo-400 mb-4 text-center">
            COMMUNICATION LAYER
          </h4>
          <div className="flex justify-center">
            <ComponentBox
              icon={Radio}
              title="Discord Gateway (WebSocket)"
              subtitle="Real-time bidirectional event stream from Discord API"
              color="indigo"
              delay={0.4}
            />
          </div>
        </motion.div>

        <ArrowDown />

        {/* Layer 3: Discord.py Event Handler */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-sm font-semibold text-purple-400 mb-4 text-center">
            FRAMEWORK LAYER
          </h4>
          <div className="flex justify-center">
            <ComponentBox
              icon={Zap}
              title="Discord.py Event Handler"
              subtitle="Processes Discord events and routes to bot core"
              color="purple"
              delay={0.5}
            />
          </div>
        </motion.div>

        <ArrowDown />

        {/* Layer 4: FeXoBot Core */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-sm font-semibold text-orange-400 mb-4 text-center">
            BOT CORE LAYER
          </h4>
          <div className="flex justify-center">
            <ComponentBox
              icon={Bot}
              title="FeXoBot Core (main.py)"
              subtitle="Bot initialization, cog loading, command tree syncing, global events"
              color="orange"
              delay={0.6}
            />
          </div>
        </motion.div>

        <ArrowDown />

        {/* Layer 5: Command & Handler Cogs */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="text-sm font-semibold text-green-400 mb-4 text-center">
            COMMAND & HANDLER LAYER (15+ Modular Cogs)
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Command Cogs */}
            <div>
              <h5 className="text-xs font-semibold text-slate-400 mb-3 text-center">
                COMMAND COGS
              </h5>
              <div className="grid grid-cols-2 gap-3">
                <CogBox
                  icon={Shield}
                  title="Admin Cog"
                  commands="/warn, /ban, /kick, /mute"
                  delay={0.7}
                />
                <CogBox
                  icon={GamepadIcon}
                  title="Games Cog"
                  commands="/hangman, /tictactoe, /trivia"
                  delay={0.75}
                />
                <CogBox
                  icon={TrendingUp}
                  title="Levels Cog"
                  commands="/level, /leaderboard, /setlevel"
                  delay={0.8}
                />
                <CogBox
                  icon={Ticket}
                  title="Tickets Cog"
                  commands="/ticket, /close, /transcript"
                  delay={0.85}
                />
                <CogBox
                  icon={Calculator}
                  title="Math Cog"
                  commands="/calculate, /calculator, /factorial"
                  delay={0.9}
                />
                <CogBox
                  icon={Globe}
                  title="API Cog"
                  commands="/nasa, /pokemon, /translate, /currency"
                  delay={0.95}
                />
                <CogBox
                  icon={Brain}
                  title="AI Cog"
                  commands="/chatgpt, /ask, context menus"
                  delay={1.0}
                />
                <CogBox
                  icon={FileText}
                  title="Utility Cog"
                  commands="/poll, /giveaway, /embed, /announce"
                  delay={1.05}
                />
              </div>
            </div>

            {/* Handler Cogs */}
            <div>
              <h5 className="text-xs font-semibold text-slate-400 mb-3 text-center">
                EVENT HANDLER COGS
              </h5>
              <div className="space-y-3">
                <HandlerBox
                  icon={Target}
                  title="Welcome Handler"
                  events="on_member_join, on_member_remove"
                  delay={0.7}
                />
                <HandlerBox
                  icon={MessageSquare}
                  title="Logging Handler"
                  events="on_message_delete, on_message_edit"
                  delay={0.8}
                />
                <HandlerBox
                  icon={TrendingUp}
                  title="Leveling Handler"
                  events="on_message (XP tracking)"
                  delay={0.9}
                />
                <HandlerBox
                  icon={Zap}
                  title="Error Handler"
                  events="on_error, on_command_error"
                  delay={1.0}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <ArrowDown />

        {/* Layer 6: Supporting Systems */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h4 className="text-sm font-semibold text-indigo-400 mb-4 text-center">
            SUPPORTING SYSTEMS
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ComponentBox
              icon={MessageSquare}
              title="View System"
              subtitle="Interactive buttons, select menus, modals for UI"
              color="indigo"
              delay={0.8}
            />
            <ComponentBox
              icon={ImageIcon}
              title="Image Generation"
              subtitle="Easy-PIL for level cards, welcome images"
              color="indigo"
              delay={0.85}
            />
            <ComponentBox
              icon={Brain}
              title="AI Integration"
              subtitle="GPT-4 Free (g4f) for intelligent responses"
              color="indigo"
              delay={0.9}
            />
          </div>
        </motion.div>

        <ArrowDown />

        {/* Layer 7: Data Layer */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h4 className="text-sm font-semibold text-purple-400 mb-4 text-center">
            DATA & EXTERNAL LAYER
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ComponentBox
              icon={Database}
              title="SQLite Databases"
              subtitle="main.db + server-specific databases for persistence"
              color="purple"
              delay={0.9}
            />
            <ComponentBox
              icon={Globe}
              title="External APIs (12+)"
              subtitle="NASA, PokeAPI, Google Translate, Currency, Weather, etc."
              color="purple"
              delay={0.95}
            />
            <ComponentBox
              icon={Link}
              title="Discord REST API"
              subtitle="Send messages, manage roles, create channels"
              color="purple"
              delay={1.0}
            />
          </div>
        </motion.div>

        {/* Stats Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-8 p-6 glass rounded-lg border border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-indigo-900/20"
        >
          <h4 className="text-lg font-bold text-white mb-4 text-center">
            Architecture Statistics
          </h4>
          <div className="grid grid-cols-4 gap-4 text-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-bold text-purple-400">100+</div>
              <div className="text-sm text-slate-400">Commands</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-bold text-green-400">15+</div>
              <div className="text-sm text-slate-400">Cog Modules</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-bold text-blue-400">12+</div>
              <div className="text-sm text-slate-400">API Integrations</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-bold text-orange-400">99.5%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Technical Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-6 p-6 glass rounded-lg border border-slate-700/50"
        >
          <h4 className="text-lg font-bold text-white mb-4">Technical Highlights</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-purple-400 font-semibold mb-2">Async Architecture</div>
              <ul className="text-slate-400 space-y-1 list-disc list-inside">
                <li>Non-blocking I/O with asyncio</li>
                <li>Concurrent event handling</li>
                <li>Async HTTP requests (aiohttp)</li>
                <li>Thread pool for CPU-bound operations</li>
              </ul>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-green-400 font-semibold mb-2">Modular Design</div>
              <ul className="text-slate-400 space-y-1 list-disc list-inside">
                <li>Hot-reload capability for cogs</li>
                <li>Isolated feature testing</li>
                <li>Independent cog development</li>
                <li>Clear separation of concerns</li>
              </ul>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-blue-400 font-semibold mb-2">Data Persistence</div>
              <ul className="text-slate-400 space-y-1 list-disc list-inside">
                <li>SQLite with ACID compliance</li>
                <li>Per-server database isolation</li>
                <li>Parameterized queries (SQL injection prevention)</li>
                <li>Automatic schema creation</li>
              </ul>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-orange-400 font-semibold mb-2">Interactive UI</div>
              <ul className="text-slate-400 space-y-1 list-disc list-inside">
                <li>Discord buttons and select menus</li>
                <li>Context menu commands (right-click)</li>
                <li>Modal forms for input</li>
                <li>Timeout and callback handling</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeXoBotArchitectureDiagram;
