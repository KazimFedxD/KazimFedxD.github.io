import React, { useState, useEffect, useMemo } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.05  // Reduced from 0.1 to 0.05
      }
    }
  }), [isMobile]);

  const itemVariants = useMemo(() => ({
    hidden: isMobile ? {} : { opacity: 0, y: 20 },
    visible: isMobile ? {} : { opacity: 1, y: 0 }
  }), [isMobile]);

  const ArrowDown = () => (
    <div className="flex justify-center my-2 md:my-4">
      <div className="text-purple-400 text-xl md:text-2xl">↓</div>
    </div>
  );

  const ArrowRight = () => (
    <div className="flex items-center mx-1 md:mx-2">
      <div className="text-purple-400 text-lg md:text-xl">→</div>
    </div>
  );

  const ComponentBox = ({ icon: Icon, title, subtitle, color = "blue" }) => {
    const colorMap = {
      blue: "border-blue-500 bg-blue-500/10",
      green: "border-green-500 bg-green-500/10",
      purple: "border-purple-500 bg-purple-500/10",
      indigo: "border-indigo-500 bg-indigo-500/10",
      orange: "border-orange-500 bg-orange-500/10",
      pink: "border-pink-500 bg-pink-500/10"
    };

    return (
      <motion.div
        variants={itemVariants}
        className={`p-3 md:p-4 rounded-lg border-2 ${colorMap[color]} ${isMobile ? '' : 'backdrop-blur-sm'}`}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0" />
          <div className="min-w-0">
            <div className="font-semibold text-white text-sm md:text-base truncate">{title}</div>
            {subtitle && <div className="text-xs text-gray-400 mt-1 line-clamp-2">{subtitle}</div>}
          </div>
        </div>
      </motion.div>
    );
  };

  const CogBox = ({ icon: Icon, title, commands }) => (
    <motion.div
      variants={itemVariants}
      className={`p-2 md:p-3 rounded-lg border-2 border-green-500 bg-green-500/10 ${isMobile ? '' : 'backdrop-blur-sm'}`}
    >
      <div className="flex items-center gap-2 mb-1 md:mb-2">
        <Icon className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0" />
        <div className="font-semibold text-white text-xs md:text-sm truncate">{title}</div>
      </div>
      <div className="text-xs text-gray-400 line-clamp-1">{commands}</div>
    </motion.div>
  );

  return (
    <div className="w-full overflow-x-auto">
      <motion.div
        variants={isMobile ? {} : containerVariants}
        initial={isMobile ? false : "hidden"}
        animate={isMobile ? false : "visible"}
        className="min-w-[900px] p-4 md:p-8 bg-gray-900 rounded-lg border border-gray-700"
      >
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-2">
          FeXoBot Architecture
        </h3>
        <p className="text-xs md:text-sm text-gray-400 text-center mb-4 md:mb-8">
          Modular Cog-Based Discord Bot with Event-Driven Architecture
        </p>

        {/* Layer 1: Discord User */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-blue-400 mb-3 md:mb-4 text-center">
            USER INTERFACE LAYER
          </h4>
          <div className="flex justify-center">
            <ComponentBox
              icon={User}
              title="Discord Users"
              subtitle="Server members using slash commands and interacting with bot"
              color="blue"
            />
          </div>
        </div>

        <ArrowDown />

        {/* Layer 2: Discord Gateway */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-indigo-400 mb-3 md:mb-4 text-center">
            COMMUNICATION LAYER
          </h4>
          <div className="flex justify-center">
            <ComponentBox
              icon={Radio}
              title="Discord Gateway (WebSocket)"
              subtitle="Real-time bidirectional event stream from Discord API"
              color="indigo"
            />
          </div>
        </div>

        <ArrowDown />

        {/* Layer 3: Discord.py Event Handler */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">
            FRAMEWORK LAYER
          </h4>
          <div className="flex justify-center">
            <ComponentBox
              icon={Zap}
              title="Discord.py Event Handler"
              subtitle="Processes Discord events and routes to bot core"
              color="purple"
            />
          </div>
        </div>

        <ArrowDown />

        {/* Layer 4: FeXoBot Core */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-orange-400 mb-3 md:mb-4 text-center">
            BOT CORE LAYER
          </h4>
          <div className="flex justify-center">
            <ComponentBox
              icon={Bot}
              title="FeXoBot Core (main.py)"
              subtitle="Bot initialization, cog loading, command tree syncing, global events"
              color="orange"
            />
          </div>
        </div>

        <ArrowDown />

        {/* Layer 5: Command & Handler Cogs */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-green-400 mb-3 md:mb-4 text-center">
            COMMAND & HANDLER LAYER (15+ Modular Cogs)
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Command Cogs */}
            <div>
              <h5 className="text-xs font-semibold text-gray-400 mb-2 md:mb-3 text-center">
                COMMAND COGS
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                <CogBox
                  icon={Shield}
                  title="Admin Cog"
                  commands="/warn, /ban, /kick, /mute"
                />
                <CogBox
                  icon={GamepadIcon}
                  title="Games Cog"
                  commands="/hangman, /tictactoe, /trivia"
                />
                <CogBox
                  icon={TrendingUp}
                  title="Levels Cog"
                  commands="/level, /leaderboard, /setlevel"
                />
                <CogBox
                  icon={Ticket}
                  title="Tickets Cog"
                  commands="/ticket, /close, /transcript"
                />
                <CogBox
                  icon={Calculator}
                  title="Math Cog"
                  commands="/calculate, /calculator, /factorial"
                />
                <CogBox
                  icon={Globe}
                  title="API Cog"
                  commands="/nasa, /pokemon, /translate, /currency"
                />
                <CogBox
                  icon={Brain}
                  title="AI Cog"
                  commands="/chatgpt, /ask, context menus"
                />
                <CogBox
                  icon={FileText}
                  title="Utility Cog"
                  commands="/poll, /giveaway, /embed, /announce"
                />
              </div>
            </div>

            {/* Handler Cogs */}
            <div>
              <h5 className="text-xs font-semibold text-gray-400 mb-2 md:mb-3 text-center">
                EVENT HANDLER COGS
              </h5>
              <div className="space-y-2 md:space-y-3">
                <motion.div
                  variants={itemVariants}
                  className="p-2 md:p-3 rounded-lg border-2 border-pink-500 bg-pink-500/10"
                >
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <Target className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
                    <div className="font-semibold text-white text-xs md:text-sm truncate">Welcome Handler</div>
                  </div>
                  <div className="text-xs text-gray-400 line-clamp-1">on_member_join, on_member_remove</div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="p-2 md:p-3 rounded-lg border-2 border-pink-500 bg-pink-500/10"
                >
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
                    <div className="font-semibold text-white text-xs md:text-sm truncate">Logging Handler</div>
                  </div>
                  <div className="text-xs text-gray-400 line-clamp-1">on_message_delete, on_message_edit</div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="p-2 md:p-3 rounded-lg border-2 border-pink-500 bg-pink-500/10"
                >
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
                    <div className="font-semibold text-white text-xs md:text-sm truncate">Leveling Handler</div>
                  </div>
                  <div className="text-xs text-gray-400 line-clamp-1">on_message (XP tracking)</div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="p-2 md:p-3 rounded-lg border-2 border-pink-500 bg-pink-500/10"
                >
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
                    <div className="font-semibold text-white text-xs md:text-sm truncate">Error Handler</div>
                  </div>
                  <div className="text-xs text-gray-400 line-clamp-1">on_error, on_command_error</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <ArrowDown />

        {/* Layer 6: Supporting Systems */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-indigo-400 mb-3 md:mb-4 text-center">
            SUPPORTING SYSTEMS
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <ComponentBox
              icon={MessageSquare}
              title="View System"
              subtitle="Interactive buttons, select menus, modals for UI"
              color="indigo"
            />
            <ComponentBox
              icon={ImageIcon}
              title="Image Generation"
              subtitle="Easy-PIL for level cards, welcome images"
              color="indigo"
            />
            <ComponentBox
              icon={Brain}
              title="AI Integration"
              subtitle="GPT-4 Free (g4f) for intelligent responses"
              color="indigo"
            />
          </div>
        </div>

        <ArrowDown />

        {/* Layer 7: Data Layer */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">
            DATA & EXTERNAL LAYER
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <ComponentBox
              icon={Database}
              title="SQLite Databases"
              subtitle="main.db + server-specific databases for persistence"
              color="purple"
            />
            <ComponentBox
              icon={Globe}
              title="External APIs (12+)"
              subtitle="NASA, PokeAPI, Google Translate, Currency, Weather, etc."
              color="purple"
            />
            <ComponentBox
              icon={Link}
              title="Discord REST API"
              subtitle="Send messages, manage roles, create channels"
              color="purple"
            />
          </div>
        </div>

        {/* Stats Panel */}
        <motion.div
          variants={itemVariants}
          className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-lg border border-purple-500/50"
        >
          <h4 className="text-lg font-bold text-white mb-4 text-center">
            Architecture Statistics
          </h4>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-400">100+</div>
              <div className="text-sm text-gray-400">Commands</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">15+</div>
              <div className="text-sm text-gray-400">Cog Modules</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">12+</div>
              <div className="text-sm text-gray-400">API Integrations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">99.5%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
          </div>
        </motion.div>

        {/* Technical Highlights */}
        <motion.div
          variants={itemVariants}
          className="mt-6 p-6 bg-gray-800/50 rounded-lg border border-gray-700"
        >
          <h4 className="text-lg font-bold text-white mb-4">Technical Highlights</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-purple-400 font-semibold mb-2">Async Architecture</div>
              <ul className="text-gray-400 space-y-1 list-disc list-inside">
                <li>Non-blocking I/O with asyncio</li>
                <li>Concurrent event handling</li>
                <li>Async HTTP requests (aiohttp)</li>
                <li>Thread pool for CPU-bound operations</li>
              </ul>
            </div>
            <div>
              <div className="text-green-400 font-semibold mb-2">Modular Design</div>
              <ul className="text-gray-400 space-y-1 list-disc list-inside">
                <li>Hot-reload capability for cogs</li>
                <li>Isolated feature testing</li>
                <li>Independent cog development</li>
                <li>Clear separation of concerns</li>
              </ul>
            </div>
            <div>
              <div className="text-blue-400 font-semibold mb-2">Data Persistence</div>
              <ul className="text-gray-400 space-y-1 list-disc list-inside">
                <li>SQLite with ACID compliance</li>
                <li>Per-server database isolation</li>
                <li>Parameterized queries (SQL injection prevention)</li>
                <li>Automatic schema creation</li>
              </ul>
            </div>
            <div>
              <div className="text-orange-400 font-semibold mb-2">Interactive UI</div>
              <ul className="text-gray-400 space-y-1 list-disc list-inside">
                <li>Discord buttons and select menus</li>
                <li>Context menu commands (right-click)</li>
                <li>Modal forms for input</li>
                <li>Timeout and callback handling</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeXoBotArchitectureDiagram;
