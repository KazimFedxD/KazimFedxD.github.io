# FeXoBot - Feature-Rich Discord Bot

<div align="center">

![Python](https://img.shields.io/badge/python-3.12-blue.svg)
![Discord.py](https://img.shields.io/badge/discord.py-2.0+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

A comprehensive, feature-rich Discord bot built with Python and Discord.py, offering moderation, games, utilities, API integrations, and much more.

[Features](#-features) • [Installation](#-installation) • [Commands](#-commands) • [Configuration](#-configuration) • [APIs](#-apis-used)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Core Architecture](#-core-architecture)
- [Commands](#-commands)
- [APIs Used](#-apis-used)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [Technologies](#-technologies)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**FeXoBot** is a powerful, multi-purpose Discord bot designed to enhance server management and user engagement. Built with Python 3.12 and Discord.py 2.0+, it features a modular architecture with extensive functionality including moderation tools, interactive games, utility commands, and seamless API integrations.

### Key Highlights

- 🎮 **Multiple Interactive Games** (Hangman, Tic-Tac-Toe, Pokémon, Trivia)
- 🛡️ **Comprehensive Moderation System** (Warnings, Bans, Kicks, Mutes)
- 📊 **Advanced Leveling System** with role rewards
- 🎫 **Support Ticket System** with category management
- 🔧 **Extensive Utility Commands** (Translation, Currency, Timers, etc.)
- 🧮 **Advanced Math Operations** with interactive calculator
- 🌐 **Multiple API Integrations** (NASA, Google, JokeAPI, PokeAPI, etc.)
- 📝 **Message Logging & Analytics**
- 🎁 **Giveaway System** with automatic winner selection
- ⚡ **Reaction Roles** for self-role assignment

---

## ✨ Features

### 🛡️ Moderation & Administration

- **User Warnings System**: Track and manage user warnings with reasons
- **Ban/Kick Management**: Advanced ban and kick commands with reason logging
- **Mute System**: Temporary and permanent mute functionality
- **Role Management**: Create, delete, edit, and assign roles
- **Message Purging**: Bulk delete messages with customizable limits
- **Auto-Role Assignment**: Automatically assign roles to new members
- **Permission Management**: View and manage user/role permissions

### 🎮 Games & Entertainment

- **Hangman**: Classic word-guessing game with difficulty levels
- **Tic-Tac-Toe**: Play against other server members
- **Pokémon Info**: Comprehensive Pokémon data lookup
  - Pokémon stats and abilities
  - Type effectiveness charts
  - Move information
  - Evolution chains
  - Pokémon comparisons
- **Trivia**: Multi-category trivia questions with difficulty settings
- **8Ball**: Magic 8-ball predictions
- **Dice & Coin Flip**: Random chance games
- **Rock Paper Scissors**: Classic game against the bot

### 🔧 Utility Commands

- **Translation**: Multi-language text translation (powered by Google Translate)
- **Currency Converter**: Real-time currency conversion
- **Timer System**: Create custom countdown timers
- **Temporary Email**: Generate disposable email addresses
- **URL Shortener**: Create and track short URLs with TinyURL
- **Image Search**: Search for images using Google API
- **ASCII Art**: Convert text to ASCII art
- **Avatar Viewer**: Display user avatars in high resolution
- **Time Zones**: Get current time for any timezone

### 📊 Leveling & Progression

- **XP System**: Gain experience from chatting
- **Level Roles**: Automatic role rewards at levels 5, 10, 25, 50, and 100
- **Profile Cards**: Beautiful level cards with user stats
- **Leaderboards**: Server-wide ranking system
- **Customizable Level-Up Messages**: Announce level-ups in designated channels

### 🎁 Engagement Features

- **Giveaways**: Host timed giveaways with multiple winners
- **Polls**: Create interactive polls with up to 4 options
- **Reaction Roles**: Allow users to self-assign roles via reactions
- **Welcome System**: Greet new members with custom messages and images
- **AFK Status**: Set away-from-keyboard status
- **Feedback System**: Collect suggestions and bug reports

### 🎫 Support & Ticketing

- **Ticket Creation**: Users can create support tickets
- **Ticket Categories**: Organize tickets in dedicated categories
- **Ticket Logs**: Save full ticket transcripts
- **Staff Notifications**: Alert designated roles for new tickets
- **Close/Archive System**: Manage ticket lifecycle

### 🧮 Advanced Mathematics

- **Basic Operations**: Add, subtract, multiply, divide
- **Advanced Functions**: Power, root, factorial
- **Equation Solver**: Quadratic equations
- **Statistics**: Mean, median calculations
- **Geometry**: Area and volume calculators for shapes
- **Pythagorean Theorem**: Calculate triangle hypotenuse
- **Interactive Calculator**: Full GUI calculator in Discord

### 🔐 Security & Encryption

- **Message Encryption**: Encrypt sensitive messages
- **Message Decryption**: Decrypt encrypted content
- **Password Generator**: Create secure random passwords

### 📝 Logging & Analytics

- **Message Logging**: Track all messages sent in the server
- **Message Edit/Delete Logs**: Monitor message modifications
- **Command Usage Tracking**: Log command executions
- **Error Logging**: Comprehensive error tracking and reporting

### 🌐 API Integrations

- **ChatGPT**: AI-powered responses and explanations
- **NASA APOD**: Daily astronomy pictures and information
- **JokeAPI**: Random jokes with category filters
- **PokeAPI**: Complete Pokémon database
- **NinjaAPI**: Facts, quotes, and trivia
- **Edamam**: Recipe search and nutrition info
- **Currency Converter API**: Real-time exchange rates
- **TinyURL API**: URL shortening service
- **TestMail**: Temporary email creation
- **Unsplash**: High-quality image search
- **Google Translate**: Multi-language translation

---

## 🏗️ Core Architecture

### Design Pattern: Cog-Based Modular Architecture

FeXoBot follows Discord.py's recommended **Cog system** for organizing bot functionality into separate, reusable modules. This architecture provides:

- **Modularity**: Each feature is self-contained in its own cog
- **Maintainability**: Easy to update individual features
- **Scalability**: Simple to add new features without affecting existing ones
- **Hot-Reloading**: Load/unload cogs without restarting the bot

### Architecture Components

```
┌─────────────────────────────────────────────┐
│            FeXoBot Main Bot                 │
│  (main.py - Central Bot Instance)           │
└─────────────────┬───────────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
   ┌────▼────┐        ┌────▼────┐
   │  Cogs   │        │Handlers │
   └────┬────┘        └────┬────┘
        │                  │
   ┌────┴───────────┐  ┌──┴─────────┐
   │   Commands/    │  │  Events/   │
   │   Features     │  │  Systems   │
   └────────────────┘  └────────────┘
```

### Key Components

#### 1. **Main Bot Core** (`main.py`)
- Bot initialization and configuration
- Event handler setup
- Cog loading management
- Global error handling
- Database initialization

#### 2. **Command Modules** (`commands/`)
- **admin_commands.py**: Administrative functions
- **ban.py**: Ban/kick management
- **warn.py**: Warning system
- **embed.py**: Custom embed creator
- **tickets.py**: Support ticket system
- **roles.py**: Role management
- **poll.py**: Poll creation and management
- **giveaway.py**: Giveaway system
- **fun.py**: Entertainment commands
- **math.py**: Mathematical operations
- **encrypter.py**: Encryption/decryption
- **feedback.py**: Feedback collection
- **reactionroles.py**: Reaction role system
- **afk.py**: AFK status management
- **sudo.py**: Message spoofing
- **usercommands.py**: General user utilities

#### 3. **Game Modules** (`games/`)
- **hangman.py**: Hangman game logic
- **tictactoe.py**: Tic-Tac-Toe implementation
- **pokemon.py**: Pokémon information system
- **uno.py**: UNO card game (in development)

#### 4. **Handler Modules** (`handlers/`)
- **setup.py**: Server configuration wizard
- **levels.py**: XP and leveling system
- **welcome.py**: Welcome message handler
- **logs.py**: Message and event logging
- **api.py**: External API integrations
- **views.py**: Interactive UI components
- **chatbot.py**: AI chatbot integration

#### 5. **Utility Modules**
- **accessories.py**: Helper functions and utilities
- **mathinterpreter.py**: Mathematical expression parser
- **words.py**: Word lists for games
- **FeXoBotcommands.py**: Command registry

### Database Architecture

FeXoBot uses **SQLite** databases for data persistence:

- **main.db**: Guild configurations, warnings, errors
- **pokemon.db**: Pokémon game data
- **Server-specific databases**: Individual server settings

---

## 📜 Commands

### Moderation Commands

| Command | Description | Permissions |
|---------|-------------|-------------|
| `/setup` | Configure bot for your server | Administrator |
| `/warn <member> <reason>` | Warn a member | Manage Messages |
| `/warns <member>` | View member warnings | Manage Messages |
| `/clearwarns <member>` | Clear member warnings | Manage Messages |
| `/kick <member> <reason>` | Kick a member | Kick Members |
| `/ban <member> <reason>` | Ban a member | Ban Members |
| `/unban <member>` | Unban a member | Ban Members |
| `/mute <member> <reason>` | Mute a member | Manage Roles |
| `/clear <amount>` | Delete messages | Manage Messages |
| `/announcement <message>` | Send announcement | Administrator |
| `/perms <member>` | View permissions | Manage Roles |

### Role Management

| Command | Description | Permissions |
|---------|-------------|-------------|
| `/role add <member> <role>` | Add role to member | Manage Roles |
| `/role remove <member> <role>` | Remove role from member | Manage Roles |
| `/role create <name> <color>` | Create new role | Manage Roles |
| `/role delete <role>` | Delete a role | Manage Roles |
| `/role edit <role>` | Edit role properties | Manage Roles |
| `/role info <role>` | View role information | Manage Roles |
| `/role list` | List all roles | Manage Roles |
| `/role permissions <role>` | View role permissions | Manage Roles |
| `/role all <role> <add/remove>` | Bulk role assignment | Manage Roles |

### Game Commands

| Command | Description |
|---------|-------------|
| `/hangman` | Start a hangman game |
| `/tictactoe <opponent>` | Play tic-tac-toe |
| `/pokemon <name>` | Get Pokémon info |
| `/trivia <category> <difficulty>` | Start trivia game |
| `/8ball <question>` | Ask the magic 8-ball |
| `/coinflip` | Flip a coin |
| `/dice` | Roll a dice |
| `/rockpaperscissors` | Play RPS |

### Utility Commands

| Command | Description |
|---------|-------------|
| `/translate <text> <language>` | Translate text |
| `/invite` | Get bot invite link |
| `/avatar <user>` | Display user avatar |
| `/timer <time> <reason>` | Create a timer |
| `/ascii <text>` | Convert to ASCII art |
| `/currency <amount> <from> <to>` | Convert currency |
| `/ping` | Check bot latency |
| `/help [command]` | Show help message |

### Math Commands

| Command | Description |
|---------|-------------|
| `/math add <x> <y>` | Add numbers |
| `/math subtract <x> <y>` | Subtract numbers |
| `/math multiply <x> <y>` | Multiply numbers |
| `/math divide <x> <y>` | Divide numbers |
| `/math power <base> <exp>` | Calculate power |
| `/math root <num> <root>` | Calculate root |
| `/math factorial <num>` | Calculate factorial |
| `/math calculate <expression>` | Solve expression |
| `/math calculator` | Open GUI calculator |
| `/math quadratic <equation>` | Solve quadratic |
| `/math pythagorean <a> <b>` | Pythagorean theorem |
| `/math mean <numbers>` | Calculate mean |
| `/math median <numbers>` | Calculate median |

### API-Powered Commands

| Command | Description | API Used |
|---------|-------------|----------|
| `/chatgpt <message>` | Ask ChatGPT | GPT4Free |
| `/nasa apod` | Astronomy Picture of Day | NASA API |
| `/joke <type> <category>` | Get random joke | JokeAPI |
| `/fact` | Random fact | NinjaAPI |
| `/quote` | Inspirational quote | NinjaAPI |
| `/define <word>` | Define a word | NinjaAPI |
| `/recipe <food>` | Search recipes | Edamam API |
| `/image search <query>` | Search images | Unsplash/Google |
| `/tempmail create <tag>` | Create temp email | TestMail API |
| `/tempmail inbox <tag>` | Check temp inbox | TestMail API |
| `/tinyurl create <url>` | Shorten URL | TinyURL API |
| `/time zone <timezone>` | Get timezone info | WorldTimeAPI |

### Engagement Commands

| Command | Description | Permissions |
|---------|-------------|-------------|
| `/giveaway <prize> <days> <winners>` | Start giveaway | Manage Guild |
| `/poll <question> <options>` | Create poll | - |
| `/suggest <title> <description>` | Submit suggestion | - |
| `/feedback <title> <description>` | Send feedback | - |
| `/reactionrole <msg> <emoji> <role>` | Create reaction role | Manage Roles |
| `/ticket [reason]` | Create support ticket | - |
| `/report <message>` | Report message | - |

### Level System

| Command | Description |
|---------|-------------|
| `/level [user]` | View level card |

### Encryption

| Command | Description |
|---------|-------------|
| `/encrypt <text>` | Encrypt message |
| `/decrypt <text>` | Decrypt message |

### Context Menu Commands (Right-Click)

- **Report** - Report a message
- **Translate** - Translate a message
- **Bookmark** - Bookmark a message
- **Explain GPT** - Explain message with ChatGPT
- **Encrypt** - Encrypt a message
- **Warn User** - Warn a user

---

## 🌐 APIs Used

### External API Integrations

| API | Purpose | Commands Using It |
|-----|---------|-------------------|
| **NASA API** | Space data and imagery | `/nasa apod` |
| **PokeAPI** | Pokémon database | `/pokemon`, `/ability`, `/type`, `/move`, etc. |
| **GPT4Free** | AI responses | `/chatgpt`, Context: Explain GPT |
| **JokeAPI** | Jokes and humor | `/joke` |
| **NinjaAPI** | Facts, quotes, trivia | `/fact`, `/quote`, `/define`, `/insult` |
| **Google Translate API** | Translation | `/translate` |
| **Google Custom Search** | Image search | `/image search` |
| **Edamam API** | Recipe and nutrition | `/recipe` |
| **Currency Converter API** | Exchange rates | `/currency` |
| **TinyURL API** | URL shortening | `/tinyurl create`, `/tinyurl stats` |
| **TestMail API** | Temporary emails | `/tempmail create`, `/tempmail inbox` |
| **Unsplash API** | High-quality images | `/image search` |
| **WorldTimeAPI** | Timezone data | `/time zone` |
| **OpenTDB** | Trivia questions | `/trivia` |

### API Configuration

All API keys are stored securely in `TOKEN.py` (not included in repository). Required tokens:

```python
# Example TOKEN.py structure
def ninjaapiTOKEN():
    return "your_ninja_api_key"

def nasaTOKEN():
    return "your_nasa_api_key"

def googleapiTOKEN():
    return "your_google_api_key"

def tinyurlTOKEN():
    return "your_tinyurl_api_key"

def edamamTOKEN():
    return "app_id", "app_key"

def tempmailTOKEN():
    return "api_key", "namespace"

def unsplashapiTOKEN():
    return "your_unsplash_key"

def exhangerateapiTOKEN():
    return "your_exchange_rate_key"

def rapidapiTOKEN():
    return "your_rapid_api_key"

def TOKEN():
    return "your_discord_bot_token"
```

---

## 🚀 Installation

### Prerequisites

- Python 3.12 or higher
- pip (Python package manager)
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/FeXoBot.git
cd FeXoBot
```

### Step 2: Install Dependencies

Using pip:
```bash
pip install -r requirements.txt
```

Or using Pipenv:
```bash
pipenv install
pipenv shell
```

### Required Python Packages

```
discord.py >= 2.0
FedxD
easy-pil
translators
g4f
jokeapi
currency-converter
pokebase
aiohttp
aiofiles
requests
```

### Step 3: Configure Environment

Create `TOKEN.py` file in the root directory:

```python
# TOKEN.py
def TOKEN():
    return "YOUR_DISCORD_BOT_TOKEN"

def ninjaapiTOKEN():
    return "YOUR_NINJA_API_KEY"

def nasaTOKEN():
    return "YOUR_NASA_API_KEY"

# Add other API tokens as needed
```

### Step 4: Create Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Navigate to "Bot" section
4. Click "Add Bot"
5. Copy the bot token and add to `TOKEN.py`
6. Enable necessary **Privileged Gateway Intents**:
   - ✅ Presence Intent
   - ✅ Server Members Intent
   - ✅ Message Content Intent

### Step 5: Invite Bot to Server

Generate invite URL with required permissions:
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
```

### Step 6: Run the Bot

```bash
python main.py
```

---

## ⚙️ Configuration

### Initial Server Setup

Run `/setup` command in your Discord server to configure:

1. **Welcome Channel**: Greet new members
2. **Announcement Channel**: Server announcements
3. **Game Channel**: Game commands
4. **Ticket System**: Support tickets
5. **Report Channel**: User reports
6. **Leveling System**: XP and ranks
7. **Level Roles**: Reward roles
8. **Auto-Role**: Default member role
9. **Birthday Channel**: Birthday notifications

### Database Configuration

The bot automatically creates necessary SQLite databases:

- `main.db` - Core configuration and data
- `pokemon.db` - Pokémon game data
- `servers/{guild_id}.db` - Server-specific data

### Customization

Edit configuration in `main.py`:

```python
# Change bot status
activity = discord.Game(name="Your Custom Status", type=3)

# Change command prefix (if using prefix commands)
command_prefix = "!"

# Set testing guild for faster command sync
self.testing_guild = discord.Object(id=YOUR_GUILD_ID)
```

---

## 📂 Project Structure

```
FeXoBot/
├── main.py                      # Bot entry point
├── TOKEN.py                     # API keys and tokens (gitignored)
├── FeXoBotcommands.py          # Command registry
├── accessories.py               # Helper functions
├── mathinterpreter.py          # Math expression parser
├── words.py                     # Word lists for games
├── Pipfile                      # Pipenv dependencies
├── Pipfile.lock                # Locked dependencies
├── README.md                    # This file
│
├── commands/                    # Command modules
│   ├── __init__.py
│   ├── admin_commands.py       # Admin utilities
│   ├── afk.py                  # AFK system
│   ├── ban.py                  # Ban management
│   ├── code.py                 # Code utilities
│   ├── embed.py                # Custom embeds
│   ├── encrypter.py            # Encryption
│   ├── feedback.py             # Feedback system
│   ├── fun.py                  # Fun commands
│   ├── giveaway.py             # Giveaway system
│   ├── help.py                 # Help command
│   ├── math.py                 # Math operations
│   ├── owner.py                # Owner-only commands
│   ├── poll.py                 # Poll system
│   ├── reactionroles.py        # Reaction roles
│   ├── report.py               # Report system
│   ├── roles.py                # Role management
│   ├── sudo.py                 # Sudo command
│   ├── tickets.py              # Ticket system
│   ├── usercommands.py         # User utilities
│   └── warn.py                 # Warning system
│
├── games/                       # Game modules
│   ├── __init__.py
│   ├── hangman.py              # Hangman game
│   ├── pokemon.py              # Pokémon system
│   ├── tictactoe.py            # Tic-Tac-Toe
│   └── uno.py                  # UNO game (WIP)
│
├── handlers/                    # Event handlers
│   ├── __init__.py
│   ├── api.py                  # API integrations
│   ├── chatbot.py              # Chatbot handler
│   ├── levels.py               # Leveling system
│   ├── logs.py                 # Logging system
│   ├── setup.py                # Setup wizard
│   ├── views.py                # UI components
│   └── welcome.py              # Welcome handler
│
├── servers/                     # Server databases
│   └── {guild_id}.db
│
├── tickets/                     # Ticket transcripts
│   └── {ticket_id}-{user_id}.txt
│
├── tempmail/                    # Temp email storage
│   └── {email}-{user_id}.txt
│
├── messagelogfiles/             # Message logs
│
├── __pycache__/                 # Python cache
│
├── main.db                      # Main database
├── pokemon.db                   # Pokémon database
├── data.json                    # Bot data
├── movie.json                   # Movie data
└── welcome.png                  # Welcome image
```

---

## 🔧 Technologies

### Core Technologies

- **Python 3.12**: Main programming language
- **Discord.py 2.0+**: Discord API wrapper
- **SQLite3**: Database management
- **asyncio**: Asynchronous programming

### Libraries & Frameworks

| Library | Purpose |
|---------|---------|
| **FedxD** | Custom Discord utilities |
| **easy-pil** | Image manipulation for cards |
| **aiohttp** | Async HTTP requests |
| **aiofiles** | Async file operations |
| **translators** | Multi-language translation |
| **g4f** | GPT-4 Free API access |
| **jokeapi** | Joke API wrapper |
| **pokebase** | PokeAPI wrapper |
| **currency-converter** | Currency conversion |
| **requests** | HTTP library |

### Development Tools

- **Pipenv**: Dependency management
- **Git**: Version control

---

## 💾 Database Schema

### Main Database (`main.db`)

#### Guild Configuration Table
```sql
CREATE TABLE guild (
    guild_id INTEGER PRIMARY KEY,      -- Discord guild ID
    welcome_channel INTEGER,            -- Welcome channel ID
    announcement INTEGER,               -- Announcement channel ID
    gamechannel INTEGER,                -- Game channel ID
    banrole BOOLEAN,                    -- Ban role enabled
    banroleid INTEGER,                  -- Ban role ID
    tickets BOOLEAN,                    -- Tickets enabled
    ticketcategory INTEGER,             -- Ticket category ID
    ticketrole INTEGER,                 -- Ticket role ID
    reports BOOLEAN,                    -- Reports enabled
    reportchannel INTEGER,              -- Report channel ID
    levels BOOLEAN,                     -- Levels enabled
    lvlchannel INTEGER,                 -- Level-up channel ID
    lvl5role INTEGER,                   -- Level 5 role ID
    lvl10role INTEGER,                  -- Level 10 role ID
    lvl25role INTEGER,                  -- Level 25 role ID
    lvl50role INTEGER,                  -- Level 50 role ID
    lvl100role INTEGER,                 -- Level 100 role ID
    banrolechannel INTEGER,             -- Ban role channel ID
    autorole INTEGER,                   -- Auto-role ID
    birthday BOOLEAN,                   -- Birthday enabled
    birthdaychannel INTEGER             -- Birthday channel ID
)
```

#### Error Logging Table
```sql
CREATE TABLE errors (
    guild_id INTEGER,                   -- Guild where error occurred
    channel_id INTEGER,                 -- Channel where error occurred
    error TEXT,                         -- Error message
    command TEXT,                       -- Command that caused error
    time TIMESTAMP                      -- Error timestamp
)
```

### Server-Specific Databases

Each server has its own database for:
- User warnings
- Level/XP data
- Custom server settings
- Temporary data storage

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Development Guidelines

- Follow PEP 8 style guidelines
- Add docstrings to all functions
- Test commands before submitting PR
- Update documentation for new features
- Use type hints where applicable

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Support & Contact

- **Discord Support Server**: [Join Here](#)
- **Issue Tracker**: [GitHub Issues](https://github.com/yourusername/FeXoBot/issues)
- **Developer**: FedxD

---

## 🎯 Roadmap

### Planned Features

- [ ] Music playback system
- [ ] Economy system with virtual currency
- [ ] Custom command creation
- [ ] Modmail system
- [ ] Auto-moderation (spam, raid protection)
- [ ] Starboard system
- [ ] Server statistics dashboard
- [ ] Web dashboard for configuration
- [ ] Multi-language support
- [ ] Advanced analytics

---

## 🙏 Acknowledgments

- **Discord.py** - Rapptz and contributors
- **NASA** - Open API access
- **PokeAPI** - Pokémon data
- **GPT4Free** - Free AI access
- All open-source libraries used in this project

---

## ⚠️ Disclaimer

This bot is provided as-is without any warranties. API rate limits and availability are subject to third-party service providers. Always use API keys responsibly and within service terms of use.

---

<div align="center">

**Made with ❤️ by FedxD**

[⬆ Back to Top](#fexobot---feature-rich-discord-bot)

</div>
