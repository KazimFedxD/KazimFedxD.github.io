# System Architecture

## System Overview

FxQuest employs a modular, event-driven architecture built on Discord.py 2.0+ with a custom database abstraction layer. The bot uses a cog-based system for feature organization, async/await patterns for non-blocking operations, and Discord UI components for interactive user experiences. The architecture emphasizes scalability, maintainability, and extensibility.

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Discord API Gateway                     │
│                  (WebSocket + REST API)                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    FxQuest Bot Instance                      │
│                     (MyBot Class)                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Custom Bot Extensions                      │ │
│  │  • Database Abstraction (maketable, inserttable, etc.)  │ │
│  │  • Error Handling (on_command_error, on_app_error)     │ │
│  │  • Help System Generator                                │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌──────────┐
    │  Cogs   │    │ Events  │    │   UI     │
    │ (Commands)    │(Listeners)   │(Views)   │
    └────┬────┘    └────┬────┘    └────┬─────┘
         │              │              │
         │              │              │
         ▼              ▼              ▼
┌─────────────────────────────────────────────────────────────┐
│               SQLite Database (main.db)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ profiles │ │  guilds  │ │inventory │ │  poker   │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│  ┌──────────┐ ┌──────────┐                                 │
│  │helpcommands errors  │                                    │
│  └──────────┘ └──────────┘                                 │
└─────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. Core Bot Class (`main.py`)

The `MyBot` class extends `discord.ext.commands.Bot` with custom functionality:

**Custom Database Methods:**
```python
class MyBot(Bot):
    async def maketable(table: str, **kwargs):
        """Create database tables dynamically"""
        # Generates CREATE TABLE IF NOT EXISTS statements
        # Accepts column definitions as kwargs
    
    async def inserttable(table: str, **kwargs):
        """Insert records into tables"""
        # INSERT INTO statements
    
    async def selecttable(table: str, **kwargs):
        """Query single record with conditions"""
        # SELECT * FROM ... WHERE ... (returns one)
    
    async def selectalltable(table: str, **kwargs):
        """Query multiple records"""
        # SELECT * FROM ... WHERE ... (returns all)
    
    async def updatetable(table: str, condition: int, **kwargs):
        """Update records with flexible conditions"""
        # UPDATE ... SET ... WHERE ...
    
    async def deletetable(table: str, **kwargs):
        """Delete records"""
        # DELETE FROM ... WHERE ...
```

**Helper Methods:**
- `get_help_commands()`: Dynamically generates help system from database
- `del_poker_channels()`: Cleanup orphaned poker channels on startup
- `makedb()`: Initialize database connection

**Event Handlers:**
- `on_ready()`: Startup tasks, channel cleanup
- `on_command_error()`: Comprehensive error handling
- `on_app_error()`: Slash command error handling

### 2. Cog System (Modular Commands)

**Command Cogs (`commands/`):**
- `setup.py`: Server configuration with interactive UI
- `gambling.py`: Gambling commands (coinflip, dice)
- `feedback.py`: User feedback system (bug reports, suggestions)
- `help.py`: Dynamic help command with pagination
- `owner.py`: Bot owner administrative commands

**Game Cogs (`games/`):**
- `uno.py`: UNO game logic and UI
- `poker.py`: Texas Hold'em poker
- `blackjack.py`: Blackjack game
- `hangman.py`: Word guessing game
- `tictactoe.py`: Tic-Tac-Toe
- `bluff.py`: Bluff card game
- `rockpaperscissors.py`: RPS game

**Handler Cogs (`handlers/`):**
- `level.py`: Leveling system with event listener
- `money.py`: Economy system and profile commands
- `mine.py`: Minecraft features (mining, inventory)
- `chatgames.py`: Automated timed games
- `inventory.py`: Inventory management
- `views.py`: Reusable Discord UI components

### 3. Database Layer (SQLite with asyncsqlite3)

**Tables:**

```sql
-- User Profiles
CREATE TABLE profile (
    userid INTEGER,
    guild INTEGER,
    money INTEGER,
    moneylost INTEGER,
    level INTEGER,
    xp INTEGER,
    messages INTEGER,
    chatgames INTEGER
);

-- Guild Configuration
CREATE TABLE guilds (
    id INTEGER PRIMARY KEY,
    level BOOLEAN DEFAULT 0,
    levelchannel INTEGER DEFAULT 0,
    level5role INTEGER DEFAULT 0,
    level10role INTEGER DEFAULT 0,
    level25role INTEGER DEFAULT 0,
    level50role INTEGER DEFAULT 0,
    level100role INTEGER DEFAULT 0,
    poker BOOLEAN DEFAULT 0,
    pokercategory INTEGER DEFAULT 0,
    gambling BOOLEAN DEFAULT 0,
    gamblingchannel INTEGER DEFAULT 0,
    uno BOOLEAN DEFAULT 0,
    unochannel INTEGER DEFAULT 0,
    chatgames BOOLEAN DEFAULT 0,
    chatgameschannel INTEGER DEFAULT 0,
    hangman BOOLEAN DEFAULT 0,
    hangmanchannel INTEGER DEFAULT 0
);

-- Poker Games
CREATE TABLE poker (
    guild INTEGER,
    channel INTEGER
);

-- Help Commands
CREATE TABLE helpcommands (
    name TEXT PRIMARY KEY,
    description TEXT,
    usage TEXT,
    category TEXT DEFAULT 'Misc',
    required_permission TEXT DEFAULT 'None',
    location TEXT DEFAULT 'global'
);

-- Inventory System
CREATE TABLE inventory (
    user INTEGER,
    guild INTEGER,
    items TEXT  -- JSON string
);

-- Error Logging
CREATE TABLE errors (
    errorid INTEGER PRIMARY KEY AUTOINCREMENT,
    errorname TEXT,
    command TEXT,
    guild INTEGER,
    datetime TEXT
);
```

**Transaction Management:**
- All database operations are async
- Auto-commit after each operation
- Connection pooling via asyncsqlite3
- Cursor management in bot instance

### 4. Discord UI Components

**View Classes (`handlers/views.py`):**
```python
class AcceptDeny(View):
    """Generic accept/deny buttons for invitations"""
    # Used for: game invites, confirmations
    # Buttons: ✅ Accept, ❌ Deny
    # Timeout handling
    # Permission checks

class UnoView(View):
    """UNO game interface"""
    # Card selection via Select menu
    # Color picker for Wild cards
    # Real-time game state updates
    # Turn validation

class PokerView(View):
    """Poker betting interface"""
    # Fold/Call/Raise buttons
    # Dynamic bet amount handling
    # Round progression
```

**Interactive Components:**
- **Buttons**: Action triggers (Hit/Stand, Fold/Call/Raise, Accept/Deny)
- **Select Menus**: Card selection, configuration options
- **Modals**: Text input for feedback, suggestions
- **Embeds**: Rich visual displays with fields, colors, thumbnails

## Tech Stack Deep Dive

### Discord.py 2.0+
**Purpose**: Primary framework for Discord bot development

**Key Features Used:**
- **Slash Commands**: Modern app_commands interface
- **Cogs**: Modular command organization
- **Events**: on_message, on_ready, etc.
- **UI Components**: Buttons, Select menus, Modals, Views
- **Permissions**: Role-based access control
- **Intents**: Message content, guild members, etc.

**Why Chosen**: 
- Industry standard for Discord bots
- Active development and community
- Comprehensive API coverage
- Excellent async support
- Rich documentation

**Implementation Example:**
```python
from discord.ext.commands import Cog
from discord.app_commands import command, Group

class MyCog(Cog):
    @command(name="example", description="Example command")
    async def example(self, interaction: Interaction):
        await interaction.response.send_message("Hello!")
```

---

### asyncsqlite3
**Purpose**: Asynchronous SQLite database wrapper

**Key Features Used:**
- Non-blocking database operations
- Async context managers
- Transaction support
- Connection pooling

**Why Chosen**:
- Prevents blocking bot during database operations
- Maintains responsiveness under load
- Easy integration with async/await patterns
- No external database server required

**Implementation:**
```python
async def makedb(self):
    self.maindb = await sql.connect("main.db")
    self.db = await self.maindb.cursor()

async def inserttable(self, table: str, **kwargs):
    keys = ", ".join(kwargs.keys())
    values = ", ".join([f"'{value}'" for value in kwargs.values()])
    await self.db.execute(f"INSERT INTO {table} ({keys}) VALUES ({values})")
    await self.maindb.commit()
```

---

### PyPokerEngine
**Purpose**: Texas Hold'em poker game engine

**Key Features Used:**
- Hand evaluation and ranking
- Card deck management
- Poker rule enforcement
- Player action validation

**Why Chosen**:
- Professional poker logic implementation
- Accurate hand rankings
- Prevents manual poker rule coding
- Well-tested library

**Implementation:**
```python
from pypokerengine.api.game import setup_config, start_poker

# Setup poker game configuration
config = setup_config(max_round=10, initial_stack=1000, small_blind_amount=10)
config.register_player(name="Player1", algorithm=PlayerAlgorithm())
game_result = start_poker(config, verbose=0)
```

---

### Easy-PIL
**Purpose**: Simplified PIL/Pillow wrapper for image generation

**Key Features Used:**
- Canvas creation
- Text rendering
- Image manipulation
- ASCII art generation

**Why Chosen**:
- Simpler API than raw Pillow
- Good for game visuals (Hangman stages)
- Text overlay capabilities

**Implementation:**
```python
from easy_pil import Canvas, Editor, Font

# Generate hangman visual
canvas = Canvas((400, 400), color="#23272A")
canvas.text((200, 200), "HANGMAN", font=Font.poppins(size=30))
image = canvas.image_bytes
```

---

### Python-dotenv
**Purpose**: Environment variable management

**Key Features Used:**
- `.env` file loading
- Secure credential storage
- Environment-specific configuration

**Why Chosen**:
- Keeps tokens out of source code
- Standard practice for credentials
- Easy deployment configuration

**Implementation:**
```python
from dotenv import load_dotenv
import os

load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")
```

---

### Standard Library Components

**asyncio**:
- Event loop management
- Task scheduling
- Concurrent operations
- Background tasks (@tasks.loop)

**random**:
- Game randomness (dice, card shuffling)
- XP variation (10-20 per message)
- Chat game timing (20-60 min intervals)

**json**:
- Inventory serialization
- Emoji configuration
- Complex data storage

**datetime**:
- Error logging timestamps
- Session tracking
- Event scheduling

**typing**:
- Type hints for code clarity
- IDE autocomplete support
- Runtime type checking (via TYPE_CHECKING)

## Data Flow Examples

### Example 1: User Sends Message → Level Up

```
1. User sends message
   ↓
2. Discord API → on_message event
   ↓
3. Level.levelupdater() listener triggered
   ↓
4. Query profile from database (selecttable)
   ↓
5. Award random XP (10-20)
   ↓
6. Check if XP ≥ threshold for next level
   ↓
7. If level up:
   - Calculate money bonus (level × 500)
   - Update profile (updatetable)
   - Query guild config for level channel
   - Send level-up announcement
   - Assign milestone role if applicable
   ↓
8. Else:
   - Update XP only
```

### Example 2: User Plays UNO Game

```
1. User uses /uno command
   ↓
2. UNO cog receives interaction
   ↓
3. Create game state dictionary:
   - Players list
   - Card decks (main + player hands)
   - Current turn, color, number
   - Direction (clockwise/anticlockwise)
   ↓
4. Generate UnoView with Select menu
   ↓
5. Send embed + view to channel
   ↓
6. User selects card from Select menu
   ↓
7. View callback validates:
   - Is it user's turn?
   - Is card playable? (matches color/number)
   ↓
8. Update game state:
   - Remove card from player hand
   - Update current card
   - Check for UNO (1 card left)
   - Advance turn to next player
   ↓
9. Check win condition (0 cards)
   ↓
10. If win:
    - Award money to winner
    - Update profile stats
    - End game
    Else:
    - Update embed with new game state
    - Continue play
```

### Example 3: Admin Configures Leveling

```
1. Admin uses /setup command
   ↓
2. Setup cog generates SetupView
   ↓
3. User clicks "⚙️ Leveling Setup" button
   ↓
4. Button callback creates LevelView
   ↓
5. Admin interacts with LevelView:
   - Toggle enable/disable button
   - Select channel from dropdown
   - Select role rewards
   ↓
6. Each interaction:
   - Query current guild config (selecttable)
   - Update configuration (updatetable)
   - Send confirmation message
   ↓
7. Bot behavior updates immediately:
   - on_message checks guild config
   - Level-up announcements go to configured channel
   - Roles assigned based on config
```

## Security & Error Handling

### Error Handling Strategy

**Command Errors:**
```python
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandOnCooldown):
        # User-friendly cooldown message
    elif isinstance(error, commands.MissingPermissions):
        # Show required permissions
    elif isinstance(error, commands.MemberNotFound):
        # Handle not found errors
    # ... comprehensive error types
    
    # Log to database
    await self.inserttable("errors",
        errorname=str(error),
        command=ctx.command.name,
        guild=ctx.guild.id,
        datetime=datetime.now().isoformat()
    )
```

**Slash Command Errors:**
```python
@tree.error
async def on_app_error(interaction, error):
    # Similar handling for app_commands
    # Send ephemeral error messages
    # Database logging
```

### Security Measures

1. **Permission Checks**:
   - Admin-only setup commands
   - Owner-only bot management
   - Channel restrictions for features

2. **Input Validation**:
   - Bet limits (100-5000)
   - User existence checks
   - Channel/role validation

3. **Credential Management**:
   - Token in .env file
   - .gitignore for sensitive files
   - No hardcoded credentials

4. **Rate Limiting**:
   - Discord's built-in rate limits
   - Cooldowns on expensive operations

## Deployment Architecture

### Single Instance Deployment

```
┌─────────────────────────────────────┐
│         Host Machine                │
│  (Linux/Windows/Mac)                │
│                                     │
│  ┌───────────────────────────────┐ │
│  │   Python 3.12+ Runtime        │ │
│  │   ┌─────────────────────────┐ │ │
│  │   │    FxQuest Bot          │ │ │
│  │   │    (main.py)            │ │ │
│  │   └──────────┬──────────────┘ │ │
│  │              │                 │ │
│  │   ┌──────────▼──────────────┐ │ │
│  │   │   SQLite Database       │ │ │
│  │   │   (main.db)             │ │ │
│  │   └─────────────────────────┘ │ │
│  └───────────────────────────────┘ │
│                                     │
│  Network: Discord API Connection   │
└─────────────────────────────────────┘
```

### Startup Sequence

1. Load environment variables (`.env` or `TOKEN.py`)
2. Initialize bot instance (`MyBot`)
3. Connect to database (`makedb()`)
4. Load cogs (games, commands, handlers)
5. Connect to Discord API
6. Trigger `on_ready()` event
7. Cleanup orphaned poker channels
8. Start background tasks (chat games loop)
9. Begin listening for events

### Process Management

**Development:**
```bash
python main.py
```

**Production** (recommended):
- systemd service (Linux)
- PM2 (process manager)
- Docker container
- Screen/tmux session

## Scalability Considerations

### Current Limitations
- Single-process (not horizontally scalable)
- SQLite (not ideal for distributed systems)
- In-memory game state (lost on restart)

### Future Improvements
- PostgreSQL/MySQL for multi-instance support
- Redis for distributed game state
- Message queue for background tasks
- Load balancing for high-traffic bots

## Project Directory Structure

```
FxQuest/
├── main.py                    # Core bot class, database methods, startup
├── TOKEN.py / .env            # Discord bot token (gitignored)
├── main.db                    # SQLite database (gitignored)
├── emojis.json                # Custom server emojis mapping
├── words.py                   # Word database for games
├── helpcommands.py            # Help command data structures
├── accessories.py             # Utility functions (if any)
├── test.py                    # Testing scripts (gitignored)
│
├── commands/                  # Command cogs
│   ├── __init__.py
│   ├── setup.py              # Server configuration UI
│   ├── gambling.py           # Gambling commands
│   ├── feedback.py           # Bug/suggestion system
│   ├── help.py               # Dynamic help system
│   └── owner.py              # Bot owner commands
│
├── games/                     # Game cogs
│   ├── __init__.py
│   ├── uno.py                # UNO game
│   ├── poker.py              # Texas Hold'em
│   ├── blackjack.py          # Blackjack
│   ├── hangman.py            # Hangman
│   ├── tictactoe.py          # Tic-Tac-Toe
│   ├── bluff.py              # Bluff card game
│   ├── rockpaperscissors.py  # RPS
│   └── akinators.py          # Akinator (commented out)
│
├── handlers/                  # Feature handlers
│   ├── __init__.py
│   ├── level.py              # Leveling system
│   ├── money.py              # Economy & profiles
│   ├── mine.py               # Minecraft features
│   ├── chatgames.py          # Automated chat games
│   ├── inventory.py          # Inventory management
│   └── views.py              # Reusable UI components
│
├── .gitignore                 # Git ignore rules
├── .env.example               # Environment variable template
├── README.md                  # Project documentation
└── LICENSE                    # (if exists)
```

## Integration Points

### Discord API
- **Gateway**: WebSocket connection for real-time events
- **REST API**: HTTP requests for actions (send messages, create channels)
- **Interactions**: Slash commands, buttons, select menus

### External Services
- **None currently**: Bot is self-contained
- **Future**: Potential API integrations (weather, news, etc.)

## Development Workflow

### Adding New Features

1. **Create cog file** in appropriate directory
2. **Implement Cog class** with commands/listeners
3. **Register in main.py**:
   ```python
   cogs = [..., "newfeature"]
   extensions = {..., "newfeature": "path.to.newfeature"}
   ```
4. **Database tables** (if needed) via `maketable()`
5. **Test locally**
6. **Deploy**

### Database Migrations

- No formal migration system
- Use `CREATE TABLE IF NOT EXISTS`
- Manual `ALTER TABLE` for schema changes
- Backup database before major changes

### Testing Strategy

- Manual testing in test Discord server
- `test.py` for quick experiments
- Bot owner commands for live debugging
- Error logging to database for production issues
