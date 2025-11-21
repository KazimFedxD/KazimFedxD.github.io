# Setup & Configuration Guide

## Prerequisites

### Operating System
- ✅ Windows 10/11
- ✅ macOS 12+ (Monterey or later)
- ✅ Linux (Ubuntu 20.04+, Debian 11+, Arch, Fedora)

### Software Requirements
- **Python 3.12 or higher** (3.11 minimum supported)
- **pip** (Python package manager, included with Python 3.4+)
- **Git** (for cloning repository)
- **Text Editor** (VS Code, PyCharm, Sublime Text, etc.)

### Discord Requirements
- Discord account
- Server with Administrator permissions (to add bot)
- Discord Developer Application (created in setup steps)

---

## Installation

### Step 1: Clone the Repository

Open your terminal/command prompt and run:

```bash
# Clone the repository
git clone https://github.com/KazimFedxD/FeXoBot.git

# Navigate into the project directory
cd FeXoBot
```

Alternatively, download the ZIP file from GitHub and extract it.

---

### Step 2: Verify Python Installation

Check your Python version:

```bash
python --version
# or
python3 --version
```

You should see output like `Python 3.12.x`. If not, install Python from [python.org](https://www.python.org/downloads/).

---

### Step 3: Install Dependencies

#### Option A: Using pip (Recommended)

Create a requirements.txt file if it doesn't exist:

```txt
discord.py>=2.0.0
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
sqlite3
```

Install dependencies:

```bash
# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install packages
pip install -r requirements.txt
```

#### Option B: Using Pipenv

If you prefer Pipenv:

```bash
# Install pipenv if not installed
pip install pipenv

# Install dependencies from Pipfile
pipenv install

# Activate pipenv shell
pipenv shell
```

---

### Step 4: Create Discord Application

1. **Go to Discord Developer Portal**
   - Visit [https://discord.com/developers/applications](https://discord.com/developers/applications)
   - Log in with your Discord account

2. **Create New Application**
   - Click "New Application" button (top right)
   - Enter a name (e.g., "FeXoBot")
   - Click "Create"

3. **Configure Bot**
   - In the left sidebar, click "Bot"
   - Click "Add Bot" → "Yes, do it!"
   - **Important**: Uncheck "Public Bot" if you want only you to invite it
   - Click "Reset Token" → "Yes, do it!"
   - **Copy the token** (you'll need this in Step 5)
   - ⚠️ **Never share this token publicly!**

4. **Enable Privileged Gateway Intents**
   Under "Privileged Gateway Intents", enable:
   - ✅ **Presence Intent**
   - ✅ **Server Members Intent**
   - ✅ **Message Content Intent**
   
   These are required for the bot to function properly.

5. **Configure Bot Permissions**
   - Go to "OAuth2" → "URL Generator" in the left sidebar
   - Under "Scopes", check:
     - ✅ `bot`
     - ✅ `applications.commands`
   - Under "Bot Permissions", check:
     - ✅ Administrator (or select specific permissions below)
     
   **Recommended Permissions**:
   - Manage Roles
   - Manage Channels
   - Kick Members
   - Ban Members
   - Send Messages
   - Manage Messages
   - Embed Links
   - Attach Files
   - Read Message History
   - Add Reactions
   - Use Slash Commands

6. **Generate Invite URL**
   - Copy the generated URL at the bottom
   - Open it in a browser
   - Select your server
   - Click "Authorize"

---

### Step 5: Configure Environment Variables

Create a `TOKEN.py` file in the root directory:

```python
# TOKEN.py - API Keys and Tokens Configuration

def TOKEN():
    """Discord Bot Token"""
    return "YOUR_DISCORD_BOT_TOKEN_HERE"

def ninjaapiTOKEN():
    """NinjaAPI Token for facts, quotes, etc."""
    return "YOUR_NINJA_API_KEY"

def nasaTOKEN():
    """NASA API Token for APOD"""
    return "YOUR_NASA_API_KEY"

def googleapiTOKEN():
    """Google API Key for image search"""
    return "YOUR_GOOGLE_API_KEY"

def tinyurlTOKEN():
    """TinyURL API Token"""
    return "YOUR_TINYURL_API_KEY"

def edamamTOKEN():
    """Edamam API for recipes"""
    return "YOUR_APP_ID", "YOUR_APP_KEY"

def tempmailTOKEN():
    """TestMail API for temporary emails"""
    return "YOUR_API_KEY", "YOUR_NAMESPACE"

def unsplashapiTOKEN():
    """Unsplash API for image search"""
    return "YOUR_UNSPLASH_ACCESS_KEY"

def exhangerateapiTOKEN():
    """Exchange Rate API for currency conversion"""
    return "YOUR_EXCHANGE_RATE_KEY"

def rapidapiTOKEN():
    """RapidAPI Key"""
    return "YOUR_RAPID_API_KEY"
```

#### Required vs Optional API Keys

**Required** (for basic functionality):
- ✅ **Discord Bot Token** - Mandatory
- ✅ **NASA API** - For `/nasa` command (free at https://api.nasa.gov/)

**Optional** (specific features will be disabled if not provided):
- NinjaAPI - For facts, quotes, definitions
- Google API - For image search
- TinyURL - For URL shortening
- Edamam - For recipe search
- TestMail - For temporary emails
- Unsplash - For high-quality images
- Exchange Rate API - For currency conversion

You can use `TOKEN.py.example` as a template.

---

### Step 6: Run the Bot

Start the bot:

```bash
# If using virtual environment, make sure it's activated
python main.py
```

You should see output like:
```
Logged in as FeXoBot#1234
Syncing commands...
Commands synced!
Ready to serve!
```

---

## Configuration

### Initial Server Setup

Once the bot is in your server, run the setup wizard:

1. **Run Setup Command**
   ```
   /setup
   ```

2. **Configure Features**
   The interactive setup will ask you to configure:
   
   - **Welcome Channel**: Where new member greetings appear
   - **Announcement Channel**: For server-wide announcements
   - **Game Channel**: Designated channel for game commands
   - **Ticket System**: Enable support tickets
     - Ticket category (where ticket channels are created)
     - Support role (who can view tickets)
   - **Report System**: Enable user reports
     - Report channel (where reports are sent)
   - **Leveling System**: Enable XP and levels
     - Level-up announcement channel
     - Level 5 role reward
     - Level 10 role reward
     - Level 25 role reward
     - Level 50 role reward
     - Level 100 role reward
   - **Auto-Role**: Role automatically assigned to new members
   - **Birthday System**: Birthday announcements
     - Birthday channel

3. **Complete Setup**
   - Answer each prompt
   - You can skip optional features
   - Settings are saved in the database
   - Re-run `/setup` anytime to modify settings

---

## Deployment Guide

### Running Bot 24/7

#### Option 1: Using systemd (Linux)

Create a systemd service file:

```bash
sudo nano /etc/systemd/system/fexobot.service
```

Add the following:

```ini
[Unit]
Description=FeXoBot Discord Bot
After=network.target

[Service]
Type=simple
User=your_username
WorkingDirectory=/path/to/FeXoBot
ExecStart=/path/to/venv/bin/python main.py
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl enable fexobot
sudo systemctl start fexobot
sudo systemctl status fexobot
```

#### Option 2: Using Docker

Create a `Dockerfile`:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "main.py"]
```

Build and run:

```bash
docker build -t fexobot .
docker run -d --name fexobot --restart unless-stopped fexobot
```

#### Option 3: Using PM2 (Node.js process manager)

```bash
npm install -g pm2
pm2 start main.py --name fexobot --interpreter python3
pm2 save
pm2 startup
```

#### Option 4: Using screen/tmux (Simple method)

```bash
# Using screen
screen -S fexobot
python main.py
# Press Ctrl+A then D to detach

# To reattach:
screen -r fexobot

# Using tmux
tmux new -s fexobot
python main.py
# Press Ctrl+B then D to detach

# To reattach:
tmux attach -t fexobot
```

---

## Customization

### Changing Bot Status

Edit `main.py`:

```python
# Change the activity/status
@bot.event
async def on_ready():
    await bot.change_presence(
        activity=discord.Game(name="Your Custom Status"),
        status=discord.Status.online  # online, idle, dnd, invisible
    )
```

Activity types:
- `discord.Game("Playing...")` - Playing status
- `discord.Streaming("Streaming...", url="...")` - Streaming status
- `discord.Activity(type=discord.ActivityType.listening, name="Music")` - Listening status
- `discord.Activity(type=discord.ActivityType.watching, name="Videos")` - Watching status

### Customizing Embed Colors

Create a config file or edit `accessories.py`:

```python
# Color scheme
PRIMARY_COLOR = 0x5865f2  # Discord Blurple
SUCCESS_COLOR = 0x57f287  # Green
ERROR_COLOR = 0xed4245    # Red
WARNING_COLOR = 0xfee75c  # Yellow
```

### Modifying Level Thresholds

Edit `handlers/levels.py`:

```python
def calculate_xp_needed(level):
    # Default: 100 * (level ^ 2)
    # Customize formula here
    return 100 * (level ** 2)  # Exponential
    # or: return 100 * level    # Linear
    # or: return level * 50 + 100  # Custom
```

---

## Challenges Faced & Solutions

### Challenge 1: Slash Command Syncing Delays

**Problem**: Slash commands took up to 1 hour to appear after bot restart when syncing globally.

**Solution**: 
- Implemented guild-specific command syncing during development
- Commands sync instantly for testing guild
- Global sync only when deploying to production

```python
# Development: Fast syncing to test guild
await self.tree.sync(guild=discord.Object(id=TESTING_GUILD_ID))

# Production: Global sync (slower but affects all guilds)
await self.tree.sync()
```

---

### Challenge 2: Rate Limiting with External APIs

**Problem**: Hitting rate limits on free API tiers, causing command failures.

**Solution**:
- Implemented caching for frequently accessed data
- Added retry logic with exponential backoff
- Display user-friendly error messages when limits are hit
- Provide fallback responses when APIs are unavailable

```python
async def fetch_with_retry(url, max_retries=3):
    for attempt in range(max_retries):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as response:
                    if response.status == 429:  # Rate limited
                        await asyncio.sleep(2 ** attempt)  # Exponential backoff
                        continue
                    return await response.json()
        except:
            if attempt == max_retries - 1:
                return None
            await asyncio.sleep(1)
```

---

### Challenge 3: Database Concurrency Issues

**Problem**: SQLite database locks when multiple commands accessed it simultaneously.

**Solution**:
- Implemented proper connection management with context managers
- Use separate databases per guild to reduce contention
- Added timeout parameter to database connections
- Ensured all database operations are wrapped in try-except blocks

```python
# Proper database handling
def get_guild_db(guild_id):
    return sql.connect(
        f"servers/{guild_id}.db",
        timeout=10.0,
        check_same_thread=False
    )
```

---

### Challenge 4: Level Card Image Generation Performance

**Problem**: Generating level cards with Easy-PIL caused noticeable delays (2-3 seconds).

**Solution**:
- Moved image generation to thread pool to prevent blocking
- Cached frequently used assets (backgrounds, fonts)
- Optimized image sizes (reduced from 4K to 800x300)
- Pre-loaded fonts at bot startup

```python
# Run in thread pool to prevent blocking
@app_commands.command()
async def level(self, interaction: Interaction):
    await interaction.response.defer()
    
    # Generate image in thread pool
    image_bytes = await asyncio.to_thread(
        generate_level_card,
        user=interaction.user,
        xp=user_xp,
        level=user_level
    )
    
    file = File(fp=io.BytesIO(image_bytes), filename="level.png")
    await interaction.followup.send(file=file)
```

---

### Challenge 5: Memory Leaks in Long-Running Bot

**Problem**: Bot memory usage grew over time, eventually causing crashes after several days.

**Solution**:
- Implemented proper cleanup in View timeout handlers
- Closed database connections after use
- Limited message cache size
- Added garbage collection triggers after heavy operations

```python
class CustomView(View):
    async def on_timeout(self):
        # Cleanup when view times out
        self.stop()
        for item in self.children:
            item.disabled = True
```

---

## Troubleshooting

### Bot Doesn't Respond to Commands

**Check**:
1. Bot has "applications.commands" scope when invited
2. Message Content Intent is enabled in Developer Portal
3. Commands are synced: check console for "Commands synced!"
4. Bot has necessary permissions in the channel

**Solution**:
```bash
# Re-invite bot with correct scopes
# Enable intents in Developer Portal
# Restart bot to sync commands
```

---

### "Discord Login Failure" Error

**Check**:
1. Token is correct in `TOKEN.py`
2. No extra spaces or quotes in token
3. Token hasn't been regenerated in Developer Portal

**Solution**:
```python
# In TOKEN.py, ensure format is:
def TOKEN():
    return "MTIz.NDU2.Nzg5"  # Your actual token
```

---

### Database Errors on First Run

**Check**:
1. Write permissions in bot directory
2. `servers/` folder exists
3. SQLite3 is installed (bundled with Python)

**Solution**:
```bash
# Create necessary folders
mkdir servers tickets tempmail messagelogfiles

# Check permissions
chmod +w .
```

---

### API Commands Not Working

**Check**:
1. API keys are correctly set in `TOKEN.py`
2. Internet connection is active
3. API services are not down (check status pages)

**Solution**:
- Verify keys are valid
- Check API service status
- Review error logs for specific API issues

---

## Next Steps After Setup

1. ✅ Run `/setup` in your Discord server
2. ✅ Test basic commands (`/help`, `/ping`)
3. ✅ Configure moderation features
4. ✅ Set up level roles
5. ✅ Test ticket system
6. ✅ Customize bot status
7. ✅ Add bot to additional servers
8. ✅ Monitor error logs
9. ✅ Set up automated backups of database files
10. ✅ Consider deploying to VPS for 24/7 uptime
