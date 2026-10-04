# Setup & Configuration Guide

## Prerequisites

### System Requirements
- **Operating System**: Windows, macOS, or Linux
- **Python**: Version 3.12 or higher
- **RAM**: Minimum 256MB (512MB recommended)
- **Disk Space**: 100MB for bot + dependencies
- **Network**: Stable internet connection

### Discord Requirements
- Discord account
- Server with "Manage Server" permission
- Bot application created in Discord Developer Portal

## Step 1: Create Discord Bot Application

### 1.1: Access Discord Developer Portal
1. Navigate to https://discord.com/developers/applications
2. Click "New Application"
3. Name your application (e.g., "FxQuest")
4. Accept Discord's Terms of Service
5. Click "Create"

### 1.2: Configure Bot Settings
1. Go to "Bot" tab in left sidebar
2. Click "Add Bot" → Confirm
3. **Important Settings**:
   - Enable "Message Content Intent" ✅
   - Enable "Server Members Intent" ✅
   - Enable "Presence Intent" ✅
4. Click "Save Changes"

### 1.3: Get Bot Token
1. In "Bot" tab, find "Token" section
2. Click "Reset Token" (if first time, just "Copy")
3. **IMPORTANT**: Copy and save token securely
4. ⚠️ Never share this token publicly!

### 1.4: Generate Bot Invite URL
1. Go to "OAuth2" → "URL Generator"
2. **Scopes**: Select `bot` and `applications.commands`
3. **Bot Permissions**: Select:
   - Read Messages/View Channels
   - Send Messages
   - Send Messages in Threads
   - Embed Links
   - Attach Files
   - Read Message History
   - Add Reactions
   - Use Slash Commands
   - Manage Roles
   - Manage Channels
4. Copy generated URL
5. Open URL in browser → Select server → Authorize

## Step 2: Clone Repository

```bash
# Using Git
git clone https://github.com/KazimFedxD/FxQuest.git
cd FxQuest

# Or download ZIP and extract
# Then navigate to extracted folder
cd FxQuest
```

## Step 3: Install Dependencies

### 3.1: Verify Python Installation

```bash
# Check Python version (must be 3.12+)
python --version
# or
python3 --version
```

If Python is not installed:
- **Windows**: Download from https://www.python.org/downloads/
- **macOS**: `brew install python@3.12` (requires Homebrew)
- **Linux**: `sudo apt install python3.12` (Ubuntu/Debian)

### 3.2: Create Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows (Command Prompt):
venv\Scripts\activate.bat

# Windows (PowerShell):
venv\Scripts\Activate.ps1

# macOS/Linux:
source venv/bin/activate
```

### 3.3: Install Required Packages

```bash
# Install discord.py
pip install discord.py

# Install async SQLite wrapper
pip install asyncsqlite3

# Install poker engine
pip install pypokerengine

# Install image library
pip install easy-pil

# Install environment variable manager
pip install python-dotenv

# Or install all at once:
pip install discord.py asyncsqlite3 pypokerengine easy-pil python-dotenv
```

### 3.4: Verify Installation

```bash
python -c "import discord; print(f'discord.py version: {discord.__version__}')"
# Should output: discord.py version: 2.x.x
```

## Step 4: Configure Bot Token

### Option A: Using .env file (Recommended)

1. Create `.env` file in project root:
```bash
touch .env  # macOS/Linux
type nul > .env  # Windows CMD
```

2. Add your token to `.env`:
```env
DISCORD_TOKEN=your_bot_token_here
```

3. Ensure `.env` is in `.gitignore` (already included by default)

### Option B: Using TOKEN.py

1. Create `TOKEN.py` in project root:
```python
# TOKEN.py
TOKEN = "your_bot_token_here"
```

2. Ensure `TOKEN.py` is in `.gitignore` (already included)

**Note**: The bot code checks for both methods. `.env` is preferred for production.

## Step 5: Configure Custom Emojis (Optional)

### 5.1: Create Server Emojis

For Minecraft features to display properly:

1. Go to your Discord server
2. Server Settings → Emoji → Upload Emoji
3. Upload emojis for items (coal, iron, diamond, etc.)
4. Note emoji names and IDs

### 5.2: Update emojis.json

Edit `emojis.json`:
```json
{
  "coal": ["coal_emoji_name", "emoji_id_here"],
  "iron": ["iron_emoji_name", "emoji_id_here"],
  "diamond": ["diamond_emoji_name", "emoji_id_here"]
}
```

To get emoji ID:
1. In Discord, type `\:emoji_name:`
2. Send message
3. Copy ID from `<:name:ID>`

**Note**: Bot will work without custom emojis, but Minecraft features won't display icons.

## Step 6: Run the Bot

### 6.1: Start Bot

```bash
# Make sure virtual environment is activated
# Then run:
python main.py
```

### 6.2: Verify Startup

You should see:
```
Logged in as YourBotName#1234
```

If you see errors:
- **Token error**: Check token in `.env` or `TOKEN.py`
- **Import errors**: Ensure all dependencies installed
- **Intents error**: Enable intents in Discord Developer Portal

### 6.3: Test Bot

In your Discord server:
1. Type `/help` - Help menu should appear
2. Type `/profile` - Your profile should display
3. Bot is working! ✅

## Step 7: Initial Server Setup

### 7.1: Configure Bot in Your Server

```
/setup
```

This opens an interactive configuration panel:

1. **Leveling Setup**:
   - Click "⚙️ Leveling Setup"
   - Toggle enable/disable
   - Select announcement channel
   - Assign role rewards (Level 5, 10, 25, 50, 100)

2. **Gambling Setup**:
   - Enable/disable gambling
   - Set gambling channel (restrict where `/gambling` works)

3. **Games Setup**:
   - Set UNO channel
   - Set Hangman channel
   - Configure poker category

4. **Chat Games Setup**:
   - Enable automated chat games
   - Set chat games channel

### 7.2: Create Roles (Optional)

For leveling rewards, create roles:
- "Level 5" role
- "Level 10" role
- "Level 25" role
- "Level 50" role
- "Level 100" role

Then assign them in `/setup` → Leveling Setup

## Step 8: Production Deployment (Optional)

### Using systemd (Linux)

1. Create service file:
```bash
sudo nano /etc/systemd/system/fxquest.service
```

2. Add configuration:
```ini
[Unit]
Description=FxQuest Discord Bot
After=network.target

[Service]
Type=simple
User=your_username
WorkingDirectory=/path/to/FxQuest
ExecStart=/path/to/FxQuest/venv/bin/python main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

3. Enable and start:
```bash
sudo systemctl enable fxquest
sudo systemctl start fxquest
sudo systemctl status fxquest
```

### Using PM2 (Cross-platform)

1. Install PM2:
```bash
npm install -g pm2
```

2. Start bot:
```bash
pm2 start main.py --name fxquest --interpreter python3
pm2 save
pm2 startup  # Follow instructions
```

3. Monitor:
```bash
pm2 logs fxquest
pm2 status
```

### Using Docker (Advanced)

1. Create `Dockerfile`:
```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir discord.py asyncsqlite3 pypokerengine easy-pil python-dotenv

CMD ["python", "main.py"]
```

2. Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  fxquest:
    build: .
    restart: always
    volumes:
      - ./main.db:/app/main.db
    env_file:
      - .env
```

3. Run:
```bash
docker-compose up -d
```

## Common Installation Issues

### Issue 1: "discord.py not found"

**Solution**:
```bash
pip install --upgrade discord.py
# Or with specific version:
pip install discord.py==2.3.2
```

### Issue 2: "Intents error"

**Error**: `Privileged intent provided is not enabled or whitelisted`

**Solution**: Enable intents in Discord Developer Portal → Bot → Privileged Gateway Intents

### Issue 3: "Token is incorrect"

**Solution**:
- Regenerate token in Developer Portal
- Update `.env` or `TOKEN.py`
- Ensure no extra spaces or quotes

### Issue 4: "Bot goes offline randomly"

**Possible Causes**:
- Network instability → Use production deployment (systemd, PM2)
- Rate limiting → Check error logs
- Unhandled exceptions → Enable debug logging

### Issue 5: "Commands not appearing"

**Solution**:
1. Ensure bot has `applications.commands` scope
2. Wait up to 1 hour for slash commands to sync
3. Use owner command to force sync (bot owner only):
   - In bot DM or server, use sync command

## Performance Optimization

### Database Optimization

**Enable WAL mode** (Write-Ahead Logging):
```python
# Add to makedb() in main.py
await self.db.execute("PRAGMA journal_mode=WAL;")
await self.maindb.commit()
```

**Regular VACUUM**:
```bash
# Periodically optimize database
sqlite3 main.db "VACUUM;"
```

### Memory Optimization

**Limit concurrent games**:
- Monitor memory usage
- Set max games per server (add to config)

**Periodic restarts**:
- Schedule weekly restarts to clear memory

## Monitoring & Logs

### Enable Debug Logging

Add to `main.py`:
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
    handlers=[
        logging.FileHandler("bot.log"),
        logging.StreamHandler()
    ]
)
```

### View Logs

```bash
# Real-time logs
tail -f bot.log

# Search errors
grep ERROR bot.log

# View database errors
sqlite3 main.db "SELECT * FROM errors ORDER BY errorid DESC LIMIT 10;"
```

## Backup Strategy

### Backup Database

```bash
# Create backup
cp main.db main.db.backup

# Or with timestamp
cp main.db main.db.$(date +%Y%m%d_%H%M%S)
```

### Automated Backups

**Linux cron job**:
```bash
# Edit crontab
crontab -e

# Add daily backup at 3 AM
0 3 * * * cp /path/to/FxQuest/main.db /path/to/backups/main.db.$(date +\%Y\%m\%d)
```

## Challenges Faced & Solutions

### Challenge 1: Persistent Game State

**Problem**: Games would be lost if bot restarted mid-game.

**Solution**: 
- Store critical game state in database (poker channels table)
- On startup, cleanup orphaned poker channels
- Future: Serialize full game state to database

### Challenge 2: Discord Rate Limits

**Problem**: Too many API calls caused rate limiting.

**Solution**:
- Batch database operations
- Use async/await to prevent blocking
- Implement cooldowns on expensive commands
- Cache frequently accessed data (guild configs)

### Challenge 3: Custom Database Layer

**Problem**: Writing raw SQL for every operation was repetitive.

**Solution**:
- Created custom ORM-like methods (maketable, inserttable, etc.)
- Flexible kwargs for dynamic queries
- Reduced code duplication significantly

### Challenge 4: Multi-Server Scalability

**Problem**: One bot instance serving multiple servers with different configs.

**Solution**:
- Per-server configuration in `guilds` table
- Guild ID as key for all queries
- Separate profiles per user per server

### Challenge 5: UI Component Timeout

**Problem**: Discord views timeout after default period, breaking games.

**Solution**:
- Set `timeout=None` for long-running games
- Implement manual cleanup mechanisms
- Store view references for later updates

## Next Steps After Installation

1. **Invite to Production Server**: Use OAuth2 URL from Step 1.4
2. **Run Setup**: Use `/setup` to configure features
3. **Test Features**: Try each game, gambling, leveling
4. **Monitor Logs**: Watch for errors in first 24 hours
5. **Gather Feedback**: Use `/feedback` system to get user input
6. **Customize**: Add custom emojis, adjust configurations
7. **Scale**: If serving multiple servers, consider production deployment

## Getting Help

- **In-Bot Feedback**: `/bug`, `/suggest`, `/feedback`
- **GitHub Issues**: Report bugs on repository
- **Documentation**: Refer to README.md for feature details

## Security Checklist

- [ ] Token stored securely (not in code)
- [ ] `.env` and `TOKEN.py` in `.gitignore`
- [ ] Bot permissions limited to necessary only
- [ ] Production server has different token than development
- [ ] Database backed up regularly
- [ ] Error logging enabled
- [ ] Intents enabled only as needed
