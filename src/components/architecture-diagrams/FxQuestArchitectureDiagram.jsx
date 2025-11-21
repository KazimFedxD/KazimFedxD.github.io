import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Radio, 
  Zap, 
  Bot, 
  Gamepad2, 
  Target, 
  Database, 
  Coins,
  MessageSquare,
  Shield,
  TrendingUp,
  Settings,
  Pickaxe,
  DollarSign,
  Trophy,
  HelpCircle
} from 'lucide-react';

const FxQuestArchitectureDiagram = () => {
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
        staggerChildren: isMobile ? 0 : 0.05
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

  const CogBox = ({ icon: Icon, title, description }) => (
    <motion.div
      variants={itemVariants}
      className={`p-2 md:p-3 rounded-lg border-2 border-green-500 bg-green-500/10 ${isMobile ? '' : 'backdrop-blur-sm'}`}
    >
      <div className="flex items-center gap-2 mb-1 md:mb-2">
        <Icon className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0" />
        <div className="font-semibold text-white text-xs md:text-sm truncate">{title}</div>
      </div>
      <div className="text-xs text-gray-400 line-clamp-1">{description}</div>
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
          FxQuest Bot Architecture
        </h3>
        <p className="text-xs md:text-sm text-gray-400 text-center mb-4 md:mb-8">
          Async Gaming & Leveling Bot with Custom Database Abstraction Layer
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
              subtitle="Server members playing games, earning XP, and managing economy"
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
              title="Discord.py 2.0+ Event Handler"
              subtitle="Processes Discord events and routes to bot core"
              color="purple"
            />
          </div>
        </div>

        <ArrowDown />

        {/* Layer 4: MyBot Core */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-orange-400 mb-3 md:mb-4 text-center">
            BOT CORE LAYER
          </h4>
          <div className="flex justify-center">
            <ComponentBox
              icon={Bot}
              title="MyBot Class (Custom Discord.py Extension)"
              subtitle="Custom database methods: maketable, inserttable, selecttable, updatetable, deletetable"
              color="orange"
            />
          </div>
        </div>

        <ArrowDown />

        {/* Layer 5: Command & Handler Cogs */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-green-400 mb-3 md:mb-4 text-center">
            COMMAND & HANDLER LAYER (12+ Modular Cogs)
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Game Cogs */}
            <div>
              <h5 className="text-xs font-semibold text-gray-400 mb-2 md:mb-3 text-center">
                GAME COGS
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                <CogBox
                  icon={Gamepad2}
                  title="UNO Cog"
                  description="uno.py - 2-4 player card game"
                />
                <CogBox
                  icon={Gamepad2}
                  title="Poker Cog"
                  description="poker.py - Texas Hold'em"
                />
                <CogBox
                  icon={Gamepad2}
                  title="Blackjack Cog"
                  description="blackjack.py - Casino game"
                />
                <CogBox
                  icon={Gamepad2}
                  title="Hangman Cog"
                  description="hangman.py - Word guessing"
                />
                <CogBox
                  icon={Gamepad2}
                  title="Tic-Tac-Toe Cog"
                  description="tictactoe.py - 2-player grid"
                />
                <CogBox
                  icon={Gamepad2}
                  title="Bluff/RPS Cog"
                  description="bluff.py, rps.py - Quick games"
                />
                <CogBox
                  icon={Gamepad2}
                  title="Akinator Cog"
                  description="akinator.py - Guessing game"
                />
                <CogBox
                  icon={Gamepad2}
                  title="Chat Games"
                  description="chatgames.py - Auto mini-games"
                />
              </div>
            </div>

            {/* Command & Handler Cogs */}
            <div>
              <h5 className="text-xs font-semibold text-gray-400 mb-2 md:mb-3 text-center">
                FEATURE COGS
              </h5>
              <div className="space-y-2 md:space-y-3">
                <CogBox
                  icon={Settings}
                  title="Setup Cog"
                  description="setup.py - Server configuration"
                />
                <CogBox
                  icon={DollarSign}
                  title="Gambling Cog"
                  description="gambling.py - Coinflip, dice"
                />
                <CogBox
                  icon={MessageSquare}
                  title="Feedback Cog"
                  description="feedback.py - Suggestions, bugs"
                />
                <CogBox
                  icon={HelpCircle}
                  title="Help Cog"
                  description="help.py - Interactive help system"
                />
                <CogBox
                  icon={Shield}
                  title="Owner Cog"
                  description="owner.py - Admin controls"
                />
                <CogBox
                  icon={TrendingUp}
                  title="Level Cog"
                  description="level.py - XP tracking, role rewards"
                />
                <CogBox
                  icon={Coins}
                  title="Money Cog"
                  description="money.py - Economy, profiles"
                />
                <CogBox
                  icon={Pickaxe}
                  title="Mine/Inventory Cog"
                  description="mine.py, inventory.py - Minecraft"
                />
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
              icon={Trophy}
              title="Game Engines"
              subtitle="PyPokerEngine for poker, Easy-PIL for images"
              color="indigo"
            />
            <ComponentBox
              icon={Target}
              title="Background Tasks"
              subtitle="Asyncio loops for chat games, level tracking"
              color="indigo"
            />
          </div>
        </div>

        <ArrowDown />

        {/* Layer 7: Data Layer */}
        <div className="mb-4 md:mb-8">
          <h4 className="text-xs md:text-sm font-semibold text-purple-400 mb-3 md:mb-4 text-center">
            DATA LAYER
          </h4>
          <div className="flex justify-center">
            <ComponentBox
              icon={Database}
              title="SQLite Database (main.db)"
              subtitle="Tables: profiles, guilds, inventory, poker, helpcommands, errors - Async via asyncsqlite3"
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
              <div className="text-3xl font-bold text-purple-400">8+</div>
              <div className="text-sm text-gray-400">Games</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">12</div>
              <div className="text-sm text-gray-400">Features</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">15+</div>
              <div className="text-sm text-gray-400">Cog Modules</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">∞</div>
              <div className="text-sm text-gray-400">Concurrent Games</div>
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
                <li>Concurrent game sessions</li>
                <li>Async database operations (asyncsqlite3)</li>
                <li>Background tasks for chat games</li>
              </ul>
            </div>
            <div>
              <div className="text-green-400 font-semibold mb-2">Custom Database Layer</div>
              <ul className="text-gray-400 space-y-1 list-disc list-inside">
                <li>ORM-like abstraction over SQLite</li>
                <li>Simple API (maketable, selecttable, etc.)</li>
                <li>Dictionary returns for easy access</li>
                <li>Automatic schema creation</li>
              </ul>
            </div>
            <div>
              <div className="text-blue-400 font-semibold mb-2">Interactive Gaming</div>
              <ul className="text-gray-400 space-y-1 list-disc list-inside">
                <li>Turn-based mechanics</li>
                <li>Real-time state management</li>
                <li>Professional game engines (PyPokerEngine)</li>
                <li>8+ multiplayer games</li>
              </ul>
            </div>
            <div>
              <div className="text-orange-400 font-semibold mb-2">Progression Systems</div>
              <ul className="text-gray-400 space-y-1 list-disc list-inside">
                <li>XP-based leveling (quadratic formula)</li>
                <li>Virtual economy with gambling</li>
                <li>Minecraft mining & inventory</li>
                <li>Role rewards at milestones</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FxQuestArchitectureDiagram;
