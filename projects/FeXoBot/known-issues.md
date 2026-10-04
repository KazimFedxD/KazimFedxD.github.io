# Known Issues & Limitations

This document outlines current bugs, limitations, platform-specific issues, and available workarounds for FeXoBot.

---

## Current Limitations

### 1. Single-Server Architecture

**Description**: Bot runs as a single Python process without horizontal scaling support.

**Impact**:
- Limited to processing power of single machine
- No built-in load balancing
- Single point of failure

**Affected Scenarios**:
- Bots serving 500+ guilds
- High-traffic environments (1,000+ commands/minute)

**Workaround**:
- For large deployments, consider implementing Discord bot sharding
- Use vertical scaling (more powerful server) for moderate growth
- Deploy multiple bot instances with different tokens for different server groups

**Timeline**: Sharding support planned for v2.0.0

---

### 2. SQLite Write Concurrency

**Description**: SQLite allows only one write operation at a time, creating potential bottlenecks.

**Impact**:
- Slower performance during simultaneous database writes
- Possible delays when multiple users execute database-intensive commands simultaneously
- Not noticeable for small-medium servers (<100 members)

**Affected Commands**:
- `/warn` (writes warning data)
- `/setup` (writes guild configuration)
- Level system (XP updates on messages)
- Ticket creation

**Workaround**:
- Database operations are queued and processed sequentially
- Async operations prevent blocking user experience
- For large deployments (100+ guilds), migrate to PostgreSQL or MySQL

**Example Migration Path**:
```python
# PostgreSQL instead of SQLite for production
import asyncpg

# Connection pooling for better concurrency
pool = await asyncpg.create_pool(
    database='fexobot',
    user='bot_user',
    password='secure_password',
    host='localhost'
)
```

**Timeline**: PostgreSQL support planned for v3.0.0

---

### 3. API Rate Limits

**Description**: Free-tier API services have request limits that can be exhausted with heavy usage.

| API | Free Tier Limit | Impact |
|-----|-----------------|--------|
| NASA | 1,000/hour | Rarely hit unless spammed |
| NinjaAPI | 10,000/month | Can be exhausted in active servers |
| Google Search | 100/day | Very easy to hit |
| TinyURL | 600/month | Limited usage |
| Edamam | 5,000/month | Moderate limit |

**Affected Commands**:
- `/nasa`, `/fact`, `/quote`, `/image search`, `/recipe`, etc.

**Workaround**:
- Implement command cooldowns (already in place)
- Cache API responses where possible
- Upgrade to paid API tiers for production use
- Display user-friendly messages when rate limits hit

**Current Mitigation**:
```python
@app_commands.checks.cooldown(1, 60.0, key=lambda i: i.user.id)
async def api_command(interaction):
    # 1 use per user per 60 seconds
    pass
```

---

### 4. No Built-In Web Dashboard

**Description**: All configuration is done through Discord commands, no web interface available.

**Impact**:
- Server configuration requires `/setup` command in Discord
- No visual analytics dashboard
- Bulk operations require individual commands

**Affected Use Cases**:
- Non-technical administrators who prefer GUI
- Viewing statistics and analytics
- Bulk user management

**Workaround**:
- Use `/setup` command for initial configuration
- Commands are designed to be intuitive
- Future versions may include web dashboard

**Timeline**: Web dashboard planned for v4.0.0

---

### 5. Image Generation Performance

**Description**: Level cards and welcome images take 150-300ms to generate, noticeable on slower systems.

**Impact**:
- Slight delay when using `/level` command
- Not instant like text-only commands

**Affected Commands**:
- `/level` (level cards)
- Welcome messages with images

**Workaround**:
- Already optimized with thread pool execution
- Card generation happens asynchronously
- User sees "thinking..." state while generating

**Current Optimization**:
```python
# Offload to thread pool
image = await asyncio.to_thread(generate_level_card, user_data)
```

**Further Improvements**: Pre-generate common cards, implement Redis caching

---

## Known Bugs

### Issue #1: Slash Command Sync Delays (Global Sync)

**Status**: ⚠️ Known Discord Limitation

**Description**: When syncing commands globally (all servers), changes can take up to 1 hour to propagate.

**Affected Versions**: All versions (Discord API limitation)

**Impact**:
- New commands don't appear immediately after bot updates
- Command changes not reflected instantly

**Workaround**:
```python
# Use guild-specific syncing for instant updates (development)
await bot.tree.sync(guild=discord.Object(id=TESTING_GUILD_ID))

# Global sync for production (slower)
await bot.tree.sync()
```

**Resolution**: This is a Discord API limitation, not fixable by bot developers.

---

### Issue #2: Level-Up Messages in Wrong Channel

**Status**: 🔧 Partially Fixed (v1.2.0)

**Description**: Occasionally, level-up announcements appear in the channel where user leveled up instead of configured level channel.

**Reproduction**:
1. User sends message in any channel
2. User levels up
3. Level-up message sometimes appears in that channel instead of configured `lvlchannel`

**Cause**: Race condition in event handler when processing multiple messages simultaneously.

**Impact**: Minor annoyance, doesn't break functionality

**Workaround**:
- Ensure `lvlchannel` is properly configured in `/setup`
- Level-up messages will still be sent, just potentially in wrong channel

**Fix Status**: Improved in v1.2.0, complete fix in progress

**Temporary Solution**:
```python
# Manual fix: Disable level messages in /setup, re-enable
# This refreshes the configuration
```

---

### Issue #3: Ticket Transcripts Missing Embeds

**Status**: ⚠️ Known Issue

**Description**: When closing tickets, the saved transcript file only contains text messages, not embedded content.

**Impact**:
- Embeds, images, and attachments not preserved in transcripts
- Only message text is saved

**Affected Feature**: Ticket system (`/ticket`)

**Workaround**:
- Important images/files should be saved manually before closing tickets
- Text content is fully preserved

**Example Current Output**:
```
[2025-11-18 10:30:15] User#1234: This is the message text
[2025-11-18 10:31:20] Staff#5678: We can help with that
```

**Planned Fix**: v2.1.0 will include embed and attachment archiving

---

### Issue #4: Hangman Game Special Characters

**Status**: 🐛 Active Bug

**Description**: Hangman game doesn't properly handle words with special characters (accents, apostrophes, hyphens).

**Reproduction**:
1. Start hangman game
2. Word contains special character (e.g., "café", "it's", "co-operate")
3. User cannot guess special characters (only A-Z buttons available)

**Impact**: Some words are impossible to complete

**Affected Feature**: `/hangman`

**Workaround**:
- Word list is filtered to exclude most special characters
- Some words still slip through

**Fix in Progress**: v1.3.0 will add special character buttons or auto-reveal them

---

### Issue #5: ChatGPT Timeouts

**Status**: ⚠️ External Dependency Issue

**Description**: `/chatgpt` command occasionally times out or returns errors when g4f API providers are down.

**Cause**: Reliance on free GPT-4 API services which can be unreliable

**Impact**:
- Command fails with "ChatGPT is currently unavailable"
- Success rate: ~85% (varies by provider availability)

**Affected Command**: `/chatgpt`

**Workaround**:
- Retry the command
- Switch to paid OpenAI API for better reliability

**Alternative Solution**:
```python
# Use official OpenAI API (requires API key and credit)
import openai

openai.api_key = "your_openai_api_key"
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": prompt}]
)
```

**Timeline**: Will add paid OpenAI API option in v2.2.0

---

## Platform-Specific Issues

### Windows

#### Issue: Database Locking on Windows

**Description**: On Windows systems, SQLite databases occasionally remain locked after bot crashes.

**Symptoms**:
- Error: "database is locked"
- Bot won't start after crash

**Solution**:
```bash
# Delete lock files
del main.db-wal
del main.db-shm
```

**Prevention**: Use proper shutdown procedures (`Ctrl+C` instead of closing terminal)

---

#### Issue: Path Separators

**Description**: Hardcoded forward slashes in paths may cause issues on Windows.

**Example**:
```python
# May fail on Windows
path = "servers/123456789.db"

# Better:
import os
path = os.path.join("servers", f"{guild_id}.db")
```

**Impact**: Minimal (Python handles most cases automatically)

**Status**: Being standardized in v1.4.0

---

### macOS

#### Issue: Apple Silicon Compatibility

**Description**: Some dependencies may not have ARM64 (Apple Silicon) wheels.

**Affected Packages**:
- Older versions of Pillow
- Some NumPy versions (used by currency-converter)

**Solution**:
```bash
# Install Rosetta 2 for compatibility
softwareupdate --install-rosetta

# Or use native ARM64 Python build
brew install python@3.12
```

**Workaround**: Use Python 3.12+ which has better ARM64 support

---

### Linux

#### Issue: Missing System Dependencies for Pillow

**Description**: Pillow (used by easy-pil) requires system libraries for image processing.

**Symptoms**:
- Error during `pip install easy-pil`
- "jpeg/png support not available"

**Solution**:
```bash
# Ubuntu/Debian
sudo apt install python3-dev libjpeg-dev zlib1g-dev

# Fedora
sudo dnf install python3-devel libjpeg-devel zlib-devel

# Arch
sudo pacman -S python python-pillow

# Then reinstall
pip install --force-reinstall easy-pil
```

---

#### Issue: Permission Denied for Database Files

**Description**: Bot crashes with "Permission denied" when trying to write databases.

**Cause**: Bot running without write permissions to project directory

**Solution**:
```bash
# Fix permissions
chmod -R u+w /path/to/FeXoBot

# Or run as user with permissions
sudo chown -R yourusername:yourusername /path/to/FeXoBot
```

**Prevention**: Don't run bot as root; use dedicated user account

---

## Browser Compatibility

**Not Applicable** - FeXoBot is a Discord bot without web interface.

---

## Performance Bottlenecks

### 1. Large Leaderboard Queries

**Issue**: Generating leaderboards for servers with 10,000+ members can take 2-3 seconds.

**Cause**: Sorting all user records in database

**Affected Command**: `/leaderboard` (if implemented)

**Mitigation**:
```sql
-- Use indexed query with LIMIT
SELECT user_id, xp, level FROM levels
ORDER BY xp DESC
LIMIT 10
```

---

### 2. Message Logging Overhead

**Issue**: Logging every message can slow down message processing in very active channels.

**Impact**: Minimal delay (5-10ms per message)

**Mitigation**:
- Async database writes
- Batch inserts for multiple messages
- Option to disable logging per-channel

---

## Limitations Summary Table

| Limitation | Impact | Severity | Workaround Available? | Fix Timeline |
|------------|--------|----------|----------------------|--------------|
| Single-server architecture | Scalability | Medium | ✅ Yes (VPS) | v2.0.0 |
| SQLite concurrency | Performance | Low | ✅ Yes (PostgreSQL) | v3.0.0 |
| API rate limits | Feature availability | Medium | ⚠️ Partial (paid tiers) | N/A |
| No web dashboard | Usability | Low | ✅ Yes (Discord commands) | v4.0.0 |
| Image generation speed | UX | Low | ✅ Yes (optimized) | Ongoing |
| Global command sync delay | Development | Low | ✅ Yes (guild sync) | Discord API |
| ChatGPT reliability | AI features | Medium | ✅ Yes (retry/paid API) | v2.2.0 |
| Transcript embed support | Data retention | Low | ⚠️ Partial | v2.1.0 |
| Hangman special chars | Games | Low | ✅ Yes (word filtering) | v1.3.0 |

---

## Reporting Issues

### How to Report Bugs

1. **Check Known Issues**: Review this document first
2. **Gather Information**:
   - Bot version
   - Operating system
   - Python version
   - Error message (full traceback)
   - Steps to reproduce
3. **Submit Issue**: Create GitHub issue with template

### Issue Template

```markdown
**Bug Description**
[Clear description of the issue]

**Steps to Reproduce**
1. Run command X
2. Provide input Y
3. See error Z

**Expected Behavior**
[What should happen]

**Actual Behavior**
[What actually happens]

**Environment**
- OS: [e.g., Ubuntu 22.04]
- Python: [e.g., 3.12.0]
- Bot Version: [e.g., v1.2.0]

**Error Log**
```
[Paste error traceback here]
```

**Screenshots**
[If applicable]
```

---

## Workaround Collection

### Quick Fixes

#### Bot Won't Start
```bash
# Check Python version
python3 --version  # Should be 3.11+

# Reinstall dependencies
pip install --force-reinstall -r requirements.txt

# Check TOKEN.py exists and has valid token
cat TOKEN.py
```

#### Commands Not Appearing
```python
# Force sync commands
await bot.tree.sync()

# Or sync to specific guild (instant)
await bot.tree.sync(guild=discord.Object(id=YOUR_GUILD_ID))
```

#### Database Locked Error
```bash
# Linux/macOS
rm -f *.db-wal *.db-shm

# Windows
del *.db-wal *.db-shm
```

#### Memory Leak Suspected
```python
# Add to bot
import gc

@tasks.loop(hours=6)
async def garbage_collect():
    gc.collect()
```

---

## Future Improvements

### Planned Fixes (v2.0.0)
- [ ] Implement bot sharding for multi-server scalability
- [ ] Add embed/attachment support in ticket transcripts
- [ ] Fix level-up message channel race condition
- [ ] Improve ChatGPT reliability with fallback providers

### Planned Features (v2.x)
- [ ] PostgreSQL migration option
- [ ] Web dashboard for configuration
- [ ] Advanced caching with Redis
- [ ] Improved error reporting
- [ ] Command usage analytics

---

## Getting Help

- **Discord Support**: [Join Support Server](#)
- **GitHub Issues**: [Report Bug](https://github.com/KazimFedxD/FeXoBot/issues)
- **Documentation**: [Read Full Docs](https://github.com/KazimFedxD/FeXoBot)

---

**Last Updated**: November 18, 2025  
**Current Version**: v1.2.0
