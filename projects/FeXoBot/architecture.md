# System Architecture & Technical Stack

## System Overview

FeXoBot utilizes a **modular cog-based architecture** built on Discord.py's framework, separating concerns into distinct modules for commands, event handlers, and utility functions. This design enables hot-reloading of features, independent testing, and scalable development.

The bot operates as a single Python process with asynchronous I/O handling via asyncio, communicating with Discord's Gateway API for real-time events and REST API for actions. Data persistence is managed through SQLite databases (one main database plus server-specific databases), while external API calls are handled asynchronously to prevent blocking.

## Request Flow Diagram

```
┌──────────────┐
│ Discord User │
└──────┬───────┘
       │ Slash Command / Message
       ▼
┌─────────────────────┐
│  Discord Gateway    │
│      (WebSocket)    │
└──────┬──────────────┘
       │ Event Stream
       ▼
┌─────────────────────┐
│   Discord.py        │
│   Event Handler     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│    FeXoBot Core     │
│     (main.py)       │
└──────┬──────────────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
┌──────────────┐  ┌──────────────┐
│   Commands   │  │   Handlers   │
│     Cogs     │  │     Cogs     │
└──────┬───────┘  └──────┬───────┘
       │                 │
       ├────────┬────────┼────────┬─────────┐
       ▼        ▼        ▼        ▼         ▼
    [Admin] [Games] [Levels] [Welcome] [Logs]
       │        │        │        │         │
       └────────┴────────┴────────┴─────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ SQLite   │ │ External │ │ Discord  │
    │ Database │ │   APIs   │ │ REST API │
    └──────────┘ └──────────┘ └──────────┘
```

## Tech Stack

### Python 3.12
- **Purpose**: Primary programming language for bot development
- **Implementation**: Core bot logic, command handlers, event listeners, database operations
- **Why Chosen**: 
  - Excellent async/await support for non-blocking I/O
  - Rich ecosystem of libraries for Discord, APIs, and data processing
  - Strong typing support with type hints
  - Easy to maintain and extend
- **Key Features Used**:
  - Asyncio for asynchronous operations
  - Type hints for better code clarity
  - Context managers for resource management
  - List/dict comprehensions for efficient data processing

### Discord.py 2.0+
- **Purpose**: Python wrapper for Discord API, handling all bot-Discord interactions
- **Implementation**: Command registration, event handling, embed creation, view/button interactions
- **Why Chosen**:
  - Most mature and feature-complete Discord library for Python
  - Native slash command support (app_commands)
  - Built-in cog system for modular architecture
  - Excellent documentation and community support
- **Key Features Used**:
  - `app_commands` for slash commands and context menus
  - `Cog` system for organizing features into modules
  - `View` and `Button` classes for interactive UIs
  - `Embed` for rich message formatting
  - Event listeners (`on_message`, `on_member_join`, etc.)
  - Permission decorators for access control

### SQLite3
- **Purpose**: Embedded relational database for data persistence
- **Implementation**: Stores guild configurations, user warnings, level/XP data, ticket information
- **Why Chosen**:
  - No separate database server needed (embedded)
  - ACID compliance ensures data integrity
  - Lightweight and fast for bot-scale operations
  - File-based storage simplifies backups
- **Key Features Used**:
  - Multiple databases (main.db + server-specific)
  - Parameterized queries for SQL injection prevention
  - Transactions for atomic operations
  - Indexes on frequently queried columns

### Asyncio
- **Purpose**: Asynchronous I/O framework for concurrent operations
- **Implementation**: Non-blocking API calls, database operations, file I/O, event handling
- **Why Chosen**:
  - Essential for Discord bots to handle multiple events simultaneously
  - Prevents blocking during long-running operations (API calls)
  - Efficient resource utilization with single-threaded concurrency
- **Key Features Used**:
  - `async`/`await` syntax for coroutines
  - `asyncio.to_thread()` for CPU-bound operations
  - Task scheduling for delayed operations
  - `aiohttp` for async HTTP requests
  - `aiofiles` for async file operations

### Easy-PIL
- **Purpose**: Image manipulation library for generating custom graphics
- **Implementation**: Creates level cards, welcome images, game boards
- **Why Chosen**:
  - Simple API for common image operations
  - Built on Pillow but with easier syntax
  - Async-compatible
  - Perfect for Discord image generation (avatars, progress bars, overlays)
- **Key Features Used**:
  - Canvas creation and color fills
  - Text rendering with custom fonts
  - Image pasting and compositing
  - Circle image cropping for avatars
  - Progress bar generation
  - Export to bytes for Discord file upload

### GPT-4 Free (g4f)
- **Purpose**: Free access to GPT-4 AI models for chatbot functionality
- **Implementation**: Natural language processing, question answering, code explanations
- **Why Chosen**:
  - Free alternative to OpenAI's paid API
  - Multiple provider support for reliability
  - Compatible with OpenAI's API format
- **Key Features Used**:
  - `ChatCompletion.create()` for conversation generation
  - Model selection (GPT-4, GPT-3.5)
  - Context-aware responses
  - Streaming responses for large outputs

### Translators
- **Purpose**: Multi-language translation via Google Translate
- **Implementation**: `/translate` command, context menu translation
- **Why Chosen**:
  - Free access to Google Translate API
  - Supports 100+ languages
  - No API key required
  - Reliable and accurate translations
- **Key Features Used**:
  - `ts.translate_text()` for text translation
  - Language auto-detection
  - Multiple translation engine support

### Additional Libraries
- **aiohttp**: Async HTTP client for API requests
- **requests**: Synchronous HTTP for simple operations
- **jokeapi**: Wrapper for JokeAPI
- **currency-converter**: Real-time currency exchange rates
- **pokebase**: PokeAPI wrapper for Pokémon data

## Component Breakdown

### 1. Main Bot Core (`main.py`)
**Responsibilities**:
- Bot instance initialization with intents
- Database schema creation and connection
- Cog loading and management
- Global event handlers (errors, ready event)
- Status/activity updates
- Command tree syncing

**Key Code**:
```python
class FeXoBot(commands.Bot):
    def __init__(self):
        intents = Intents.all()
        super().__init__(command_prefix="!", intents=intents)
        self.testing_guild = discord.Object(id=GUILD_ID)
    
    async def setup_hook(self):
        # Load all cogs
        for cog in cogs:
            await self.load_extension(f"commands.{cog}")
            await self.load_extension(f"handlers.{cog}")
        
        # Sync command tree
        await self.tree.sync(guild=self.testing_guild)
    
    async def on_ready(self):
        print(f"Logged in as {self.user}")
        await self.change_presence(
            activity=discord.Game(name="FeXoBot | /help")
        )
```

### 2. Command Cogs
**Structure**: Each feature category has its own cog file
**Benefits**:
- Isolated functionality
- Independent testing
- Hot-reload capability
- Clear code organization

**Example Cog Structure**:
```python
class ModerationCog(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.db = sql.connect("main.db")
    
    @app_commands.command()
    async def warn(self, interaction: Interaction, ...):
        # Command logic
        pass
    
    @app_commands.command()
    async def kick(self, interaction: Interaction, ...):
        # Command logic
        pass

async def setup(bot: commands.Bot):
    await bot.add_cog(ModerationCog(bot))
```

### 3. Handler Cogs
**Event-Driven Architecture**: Handlers listen for Discord events
- `on_message`: Level system, message logging
- `on_member_join`: Welcome messages, auto-role
- `on_member_remove`: Goodbye messages
- `on_message_delete`: Deletion logging
- `on_message_edit`: Edit logging
- `on_error`: Error tracking and reporting

### 4. View System (Interactive UI)
Discord.py's `View` class enables button/select menu interactions:
```python
class CalculatorView(View):
    def __init__(self):
        super().__init__(timeout=180)
        self.expression = ""
    
    @button(label="1", style=ButtonStyle.primary, row=0)
    async def button_1(self, interaction: Interaction, button: Button):
        self.expression += "1"
        await self.update_display(interaction)
    
    @button(label="+", style=ButtonStyle.success, row=1)
    async def button_add(self, interaction: Interaction, button: Button):
        self.expression += "+"
        await self.update_display(interaction)
    
    async def update_display(self, interaction: Interaction):
        embed = Embed(title="Calculator", description=f"```{self.expression}```")
        await interaction.response.edit_message(embed=embed, view=self)
```

## Database Design

### Main Database (`main.db`)

#### Guild Configuration Table
```sql
CREATE TABLE guild (
    guild_id INTEGER PRIMARY KEY,
    welcome_channel INTEGER,
    announcement INTEGER,
    gamechannel INTEGER,
    banrole BOOLEAN,
    banroleid INTEGER,
    tickets BOOLEAN,
    ticketcategory INTEGER,
    ticketrole INTEGER,
    reports BOOLEAN,
    reportchannel INTEGER,
    levels BOOLEAN,
    lvlchannel INTEGER,
    lvl5role INTEGER,
    lvl10role INTEGER,
    lvl25role INTEGER,
    lvl50role INTEGER,
    lvl100role INTEGER,
    banrolechannel INTEGER,
    autorole INTEGER,
    birthday BOOLEAN,
    birthdaychannel INTEGER
)
```

#### Error Logging Table
```sql
CREATE TABLE errors (
    guild_id INTEGER,
    channel_id INTEGER,
    error TEXT,
    command TEXT,
    time TIMESTAMP
)
```

### Server-Specific Databases (`servers/{guild_id}.db`)

#### Warnings Table
```sql
CREATE TABLE warnings (
    user_id INTEGER,
    reason TEXT,
    moderator_id INTEGER,
    timestamp TIMESTAMP
)
```

#### Levels Table
```sql
CREATE TABLE levels (
    user_id INTEGER PRIMARY KEY,
    xp INTEGER,
    level INTEGER
)
```

#### Tickets Table
```sql
CREATE TABLE tickets (
    ticket_number INTEGER,
    user_id INTEGER,
    channel_id INTEGER,
    created_at TIMESTAMP,
    status TEXT
)
```

## API Design

### External API Integration Architecture

**Pattern**: Async HTTP requests with error handling and rate limiting

```python
async def fetch_api_data(url: str, headers: dict = None):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, timeout=10) as response:
                if response.status == 200:
                    return await response.json()
                else:
                    return None
    except asyncio.TimeoutError:
        return None
    except Exception as e:
        print(f"API Error: {e}")
        return None
```

### Integrated APIs

| API | Endpoint Pattern | Rate Limit | Auth Type |
|-----|------------------|------------|-----------|
| NASA | `https://api.nasa.gov/planetary/apod` | 1000/hour | API Key |
| PokeAPI | `https://pokeapi.co/api/v2/pokemon/{name}` | None | None |
| JokeAPI | `https://v2.jokeapi.dev/joke/{category}` | 120/min | None |
| NinjaAPI | `https://api.api-ninjas.com/v1/{endpoint}` | 10,000/month | API Key |
| Google Translate | Via `translators` library | Varies | None |
| TinyURL | `https://api.tinyurl.com/create` | 600/month | API Key |

## Deployment Architecture

### Local Development Setup
```
┌─────────────────────────────────────┐
│      Developer Machine              │
│  ┌──────────────────────────────┐   │
│  │    FeXoBot Process           │   │
│  │  ┌────────┐  ┌────────┐      │   │
│  │  │main.py │→ │ Cogs   │      │   │
│  │  └────────┘  └────────┘      │   │
│  │       ↓                       │   │
│  │  ┌────────────────┐           │   │
│  │  │ SQLite DBs     │           │   │
│  │  │ - main.db      │           │   │
│  │  │ - servers/*.db │           │   │
│  │  └────────────────┘           │   │
│  └──────────────────────────────┘   │
│              ↓                      │
│         [Internet]                  │
└──────────────┬──────────────────────┘
               │
               ├─────→ Discord Gateway
               ├─────→ External APIs
               └─────→ Database Files
```

### Production Deployment Options
1. **VPS Hosting** (Recommended for always-on bots)
2. **Docker Container** (Isolation and easy deployment)
3. **systemd Service** (Linux service management)
4. **Cloud Hosting** (AWS EC2, Google Cloud, Azure)

## Security Architecture

### Permission System
- Command-level permission decorators
- Role-based access control
- Guild-specific configurations
- Owner-only commands

```python
@app_commands.command()
@app_commands.checks.has_permissions(manage_messages=True)
async def warn(self, interaction: Interaction, ...):
    # Only users with Manage Messages permission can execute
    pass
```

### Data Security
- API keys stored in separate `TOKEN.py` file (gitignored)
- SQL injection prevention via parameterized queries
- Input validation on all user inputs
- Encrypted message storage option

### Rate Limiting
- Built-in Discord.py cooldown decorators
- API request throttling
- Command cooldowns to prevent spam

```python
@app_commands.checks.cooldown(1, 60.0, key=lambda i: i.user.id)
async def daily_command(self, interaction: Interaction):
    # 1 use per 60 seconds per user
    pass
```

## Project Directory Structure

```
FeXoBot/
│
├── main.py                 # Bot entry point, initialization
├── TOKEN.py               # API keys (gitignored)
├── FeXoBotcommands.py    # Command registry
├── accessories.py         # Utility functions
├── mathinterpreter.py    # Math expression parser
├── words.py              # Word lists for games
│
├── commands/             # Command cogs
│   ├── admin_commands.py # Server management
│   ├── ban.py           # Ban/kick system
│   ├── warn.py          # Warning system
│   ├── tickets.py       # Support tickets
│   ├── levels.py        # Level commands
│   ├── fun.py           # Entertainment
│   ├── math.py          # Math operations
│   ├── poll.py          # Poll system
│   └── ... (15+ files)
│
├── games/                # Game modules
│   ├── hangman.py
│   ├── tictactoe.py
│   ├── pokemon.py
│   └── uno.py
│
├── handlers/             # Event handlers
│   ├── api.py           # API integrations
│   ├── levels.py        # XP tracking
│   ├── welcome.py       # Member join/leave
│   ├── logs.py          # Message logging
│   ├── setup.py         # Setup wizard
│   └── views.py         # UI components
│
├── main.db              # Main database
├── servers/             # Server-specific databases
├── tickets/             # Ticket transcripts
├── tempmail/            # Temp email storage
└── messagelogfiles/     # Message logs
```
