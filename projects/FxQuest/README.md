# 🎮 FxQuest - Advanced Discord Gaming & Leveling Bot

[![Python](https://img.shields.io/badge/Python-3.12+-blue.svg)](https://www.python.org/)
[![Discord.py](https://img.shields.io/badge/discord.py-2.0+-blue.svg)](https://discordpy.readthedocs.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A feature-rich Discord bot offering interactive games, economy system, leveling mechanics, Minecraft-inspired mining, and comprehensive server management tools.

---

## 📑 Table of Contents

- [Features](#-features)
- [Core Architecture](#-core-architecture)
- [Games](#-games)
- [Economy & Gambling](#-economy--gambling)
- [Leveling System](#-leveling-system)
- [Minecraft Features](#-minecraft-features)
- [Setup & Configuration](#-setup--configuration)
- [Database Schema](#-database-schema)
- [APIs & Libraries](#-apis--libraries)
- [Installation](#-installation)
- [Commands](#-commands)
- [Development](#-development)

---

## ✨ Features

### 🎯 Core Features
- **Advanced Leveling System** - XP-based progression with role rewards
- **Economy System** - Virtual currency with profile tracking
- **Multi-Game Support** - 8+ interactive games
- **Minecraft Integration** - Mining, crafting, inventory management
- **Gambling Commands** - Coinflip, dice, and more
- **Chat Games** - Automatic timed games (scramble, number guessing)
- **Feedback System** - Bug reports, suggestions, and feedback
- **Server Setup** - Comprehensive guild configuration
- **Custom Help System** - Dynamic command documentation
- **Error Logging** - Database-driven error tracking

### 🎮 Interactive Elements
- Discord UI Components (Buttons, Select Menus, Modals)
- Real-time game state management
- Persistent game sessions
- Multi-player support
- Turn-based game mechanics

---

## 🏗️ Core Architecture

### Bot Structure
```
FxQuest/
├── main.py                 # Core bot class and database operations
├── commands/               # Command modules
│   ├── gambling.py        # Gambling commands
│   ├── setup.py           # Server configuration
│   ├── help.py            # Help command system
│   ├── feedback.py        # User feedback
│   └── owner.py           # Bot owner commands
├── games/                  # Game modules
│   ├── uno.py
│   ├── poker.py
│   ├── blackjack.py
│   ├── hangman.py
│   ├── tictactoe.py
│   ├── bluff.py
│   └── rockpaperscissors.py
├── handlers/               # Feature handlers
│   ├── level.py           # Leveling system
│   ├── money.py           # Economy system
│   ├── mine.py            # Minecraft features
│   ├── chatgames.py       # Automated chat games
│   ├── inventory.py       # Inventory management
│   └── views.py           # Discord UI components
└── main.db                # SQLite database
```

### Design Patterns
- **Cog-based Architecture** - Modular command organization
- **Event-Driven** - Discord event listeners for messages, interactions
- **Async/Await** - Non-blocking operations throughout
- **Database Abstraction** - Custom ORM-like methods for SQLite
- **View Components** - Reusable Discord UI classes
- **State Management** - In-memory and persistent state handling

### Custom Bot Class (`MyBot`)

The core `MyBot` class extends `discord.ext.commands.Bot` with:

```python
class MyBot(Bot):
    # Custom database methods
    async def maketable()      # Create database tables
    async def inserttable()    # Insert records
    async def selecttable()    # Query single record
    async def selectalltable() # Query multiple records
    async def updatetable()    # Update records
    async def deletetable()    # Delete records
    
    # Helper methods
    async def get_help_commands()  # Dynamic help system
    async def del_poker_channels() # Cleanup poker channels
```

---

## 🎮 Games

### 1. **UNO** (`games/uno.py`)
- 2-4 player support
- Full UNO rules (Wild, Draw 2, Draw 4, Skip, Reverse)
- Interactive card selection with Discord Select Menus
- Color picker for wild cards
- Turn-based mechanics
- UNO declaration system

### 2. **Poker** (`games/poker.py`)
- Texas Hold'em variant
- Uses `pypokerengine` for hand evaluation
- Dedicated poker channels per game
- Buy-in system with stakes
- Betting rounds (Pre-flop, Flop, Turn, River)
- Fold/Call/Raise mechanics
- Pot management
- Configurable max players (default 5)

### 3. **BlackJack** (`games/blackjack.py`)
- Single-player vs dealer
- Hit/Stand mechanics
- Ace value calculation (1 or 11)
- Betting system
- Bust detection
- Natural blackjack detection

### 4. **Bluff (Cheat)** (`games/bluff.py`)
- Multi-player card game
- Bluff calling mechanics
- Round-based gameplay
- Card passing system
- Last card detection

### 5. **Hangman** (`games/hangman.py`)
- Word guessing game
- ASCII art stages (7 lives)
- Uses `easy_pil` for visual representation
- Word database integration
- Letter tracking

### 6. **Tic-Tac-Toe** (`games/tictactoe.py`)
- 2-player support
- Custom emoji support
- Win/Tie detection
- Interactive button grid
- Accept/Deny invitations

### 7. **Rock Paper Scissors** (`games/rockpaperscissors.py`)
- PvP and PvE modes
- Bot opponent with random choices
- Simultaneous move submission
- Win/Loss/Tie detection

### 8. **Chat Games** (`handlers/chatgames.py`)
- **Number Guessing**: Guess number between 1-100
- **Word Scramble**: Unscramble words
- Automatic timed events (20-60 min intervals)
- Money rewards on correct answers
- Server-specific channels
- Leaderboard tracking

---

## 💰 Economy & Gambling

### Profile System (`handlers/money.py`)
- Virtual currency (starting balance: 1000)
- Profile tracking:
  - Current balance
  - Money lost
  - Level & XP
  - Messages sent
  - Chat games won
- Leaderboard (top 10 users)

### Gambling Commands (`commands/gambling.py`)

#### Coinflip
```
/gambling coinflip <bet> <choice:heads/tails>
```
- 50/50 odds
- Win doubles your bet
- Min bet: 100, Max bet: 5000

#### Dice
```
/gambling dice <bet> <choice:1-6>
```
- Guess the dice roll (1-6)
- Higher payout for correct guess

### Restrictions
- Server-configurable gambling channels
- Enable/disable gambling per server
- Bet limits (100-5000)

---

## 📊 Leveling System

### Features (`handlers/level.py`)
- **XP Gain**: 10-20 XP per message
- **Level Calculation**: `5 * level² + 50 * level + 100`
- **Rewards**: Money bonus on level up (`level * 500`)
- **Role Rewards**:
  - Level 5 role
  - Level 10 role
  - Level 25 role
  - Level 50 role
  - Level 100 role

### Configuration
- Toggle leveling system
- Set level-up announcement channel
- Configure role rewards per level milestone

---

## ⛏️ Minecraft Features

### Mining System (`handlers/mine.py`)

#### Features
- **Resource Mining**: Coal, Iron, Gold, Diamond, Emerald, etc.
- **Tool System**:
  - Wooden, Stone, Iron, Gold, Diamond tools
  - Durability tracking
  - Damage and speed stats
  - Enchantments support
- **Armor System**:
  - Helmet, Chestplate, Leggings, Boots
  - Defense stats
  - Durability
- **Inventory Management**:
  - Item storage
  - Equipped items tracking
  - Tool and armor management
- **Consumables**:
  - Food (health and hunger restoration)
  - Potions (effects with duration)
- **Player Stats**:
  - Health
  - Hunger
  - Active effects

#### Custom Classes
```python
Item          # Base item class
Tool          # Mining tools (pickaxe, sword, etc.)
Armor         # Protective equipment
Consumable    # Base consumable class
Food          # Food items
Potion        # Effect potions
Player        # Player data and methods
```

#### Custom Emojis
- Server emojis for items (coal, bedrock, etc.)
- Stored in `emojis.json`
- Dynamic emoji loading

---

## ⚙️ Setup & Configuration

### Server Setup Commands (`commands/setup.py`)

#### Leveling Configuration
- Enable/disable leveling
- Set level-up channel
- Configure role rewards (Levels 5, 10, 25, 50, 100)

#### Gambling Configuration
- Enable/disable gambling
- Set gambling channel

#### Chat Games Configuration
- Enable/disable chat games
- Set chat games channel

#### Gaming Configuration
- Set UNO channel
- Set Hangman channel

#### Poker Configuration
- Enable/disable poker
- Set poker category

### Interactive Setup
- Button-based UI
- Select menu navigation
- Real-time configuration updates
- Role and channel mentions

---

## 🗄️ Database Schema

### SQLite Database (`main.db`)

#### Tables

**profile**
```sql
userid INTEGER
guild INTEGER
money INTEGER
moneylost INTEGER
level INTEGER
xp INTEGER
messages INTEGER
chatgames INTEGER
```

**guilds**
```sql
id INTEGER
level BOOLEAN
levelchannel INTEGER
level5role INTEGER
level10role INTEGER
level25role INTEGER
level50role INTEGER
level100role INTEGER
poker BOOLEAN
pokercategory INTEGER
gambling BOOLEAN
gamblingchannel INTEGER
uno BOOLEAN
unochannel INTEGER
chatgames BOOLEAN
chatgameschannel INTEGER
hangman BOOLEAN
hangmanchannel INTEGER
```

**poker**
```sql
guild INTEGER
channel INTEGER
```

**helpcommands**
```sql
name TEXT
description TEXT
usage TEXT
category TEXT
required_permission TEXT
location TEXT
```

**inventory**
```sql
user INTEGER
guild INTEGER
items TEXT (JSON)
```

**errors**
```sql
errorid INTEGER PRIMARY KEY AUTOINCREMENT
errorname TEXT
command TEXT
guild INTEGER
datetime TEXT
```

---

## 📚 APIs & Libraries

### Core Dependencies

#### Discord API
- **discord.py** (v2.0+) - Discord API wrapper
  - Bot commands and events
  - Slash commands (app_commands)
  - UI Components (Buttons, Selects, Modals)
  - Cogs system
  - Permissions handling

#### Database
- **asyncsqlite3** - Async SQLite wrapper
  - Non-blocking database operations
  - Transaction support
  - Connection pooling

#### Game Libraries
- **pypokerengine** - Poker game engine
  - Hand evaluation
  - Card management
  - Texas Hold'em rules

#### Graphics
- **easy_pil** - PIL/Pillow wrapper
  - Image generation for games
  - ASCII art rendering
  - Custom game visuals

#### Utilities
- **python-dotenv** - Environment variable management
  - Token storage
  - Configuration management

### Standard Libraries
- `asyncio` - Asynchronous programming
- `random` - Random number generation
- `json` - JSON parsing for inventory/data
- `datetime` - Timestamp tracking
- `typing` - Type hints

---

## 🚀 Installation

### Prerequisites
- Python 3.12+
- Discord Bot Token
- Discord Server with appropriate permissions

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd FxQuest
```

### Step 2: Install Dependencies
```bash
pip install discord.py
pip install asyncsqlite3
pip install pypokerengine
pip install easy-pil
pip install python-dotenv
```

### Step 3: Configure Environment
Create a `.env` file or configure `TOKEN.py`:
```python
# TOKEN.py
TOKEN = "your_discord_bot_token_here"
```

Or `.env`:
```
DISCORD_TOKEN=your_discord_bot_token_here
```

### Step 4: Setup Database
The bot automatically creates database tables on first run.

### Step 5: Run Bot
```bash
python main.py
```

---

## 📝 Commands

### General Commands
- `/help` - View all commands with pagination
- `/profile [user]` - View user profile
- `/inventory [user]` - View inventory

### Economy Commands
- `/bal user [user]` - Check balance
- `/bal top` - View top 10 richest users

### Gambling Commands
- `/gambling coinflip <bet> <choice>` - Flip a coin
- `/gambling dice <bet> <choice>` - Roll a dice

### Games
- `/uno` - Start UNO game
- `/poker` - Poker commands
- `/blackjack <bet>` - Play blackjack
- `/hangman` - Play hangman
- `/tictactoe <opponent>` - Play tic-tac-toe
- `/rps <opponent>` - Rock Paper Scissors
- `/bluff` - Play bluff card game

### Chat Games
- `/chatgame` - View chat games leaderboard

### Feedback
- `/suggest <title> <description>` - Suggest a feature
- `/bug <title> <description>` - Report a bug
- `/feedback <title> <description>` - General feedback

### Setup (Admin Only)
- `/setup` - Configure server settings

### Owner Commands (Bot Owner Only)
- Restart cogs
- Sync commands (global/guild)
- Database management

---

## 🛠️ Development

### Adding New Games

1. Create game file in `games/` directory
2. Implement as a Cog:
```python
from discord.ext.commands import Cog
from discord.app_commands import command

class NewGame(Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @command(name="newgame", description="Play new game")
    async def newgame(self, interaction):
        # Game logic here
        pass

async def setup(bot):
    await bot.add_cog(NewGame(bot))
```

3. Register in `main.py`:
```python
cogs = [..., "newgame"]
extensions = {..., "newgame": "games.newgame"}
```

### Adding Database Tables

Use the bot's `maketable` method:
```python
await self.bot.maketable(
    "tablename",
    column1="TYPE",
    column2="TYPE",
)
```

### Custom Error Handling

The bot includes comprehensive error handling:
- Command errors logged to database
- User-friendly error messages
- Permission checks
- Cooldown management

---

## 🎨 Features Highlight

### Dynamic Help System
- Automatically generates help from database
- Category-based organization
- Pagination support
- Permission requirements displayed
- Usage examples

### Persistent State
- Game states stored in memory
- Profile data in database
- Inventory system with JSON storage
- Channel cleanup on restart

### Server Customization
- Per-server configuration
- Channel-specific features
- Role reward system
- Toggle features on/off

### Interactive UI
- Modern Discord UI components
- Accept/Deny views
- Button-based game controls
- Select menus for options
- Modals for input

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Credits

**Developer**: FedxD (ID: 608281985886191651)

**Support Server**: 
- Guild ID: 872413561895391262
- Support Channel: 1170019036948598884

---

## 🔮 Future Enhancements

- [ ] Additional games (Chess, Connect 4)
- [ ] Shop system for Minecraft items
- [ ] Crafting system
- [ ] PvP combat system
- [ ] Guild wars
- [ ] Trading system
- [ ] Achievement system
- [ ] Daily rewards
- [ ] Seasonal events

---

## 📞 Support

For bugs, suggestions, or feedback, use the in-bot commands:
- `/bug` - Report bugs
- `/suggest` - Suggest features  
- `/feedback` - General feedback

---

**Made with ❤️ using Discord.py**
