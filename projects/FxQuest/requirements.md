# System Requirements

## Operating System Compatibility

### ✅ Supported Operating Systems

#### Windows
- **Windows 10** (Version 1809 or later)
- **Windows 11** (All versions)
- **Windows Server 2019** or newer

#### macOS
- **macOS 11 Big Sur** or later
- **macOS 12 Monterey**
- **macOS 13 Ventura**
- **macOS 14 Sonoma**
- **macOS 15 Sequoia**

#### Linux
- **Ubuntu 20.04 LTS** (Focal Fossa) or later
- **Ubuntu 22.04 LTS** (Jammy Jellyfish)
- **Debian 11** (Bullseye) or later
- **Fedora 35+**
- **CentOS 8+** / **Rocky Linux 8+**
- **Arch Linux** (rolling release)
- **Any Linux with Python 3.12+ support**

---

## Hardware Requirements

### Minimum Specifications
For running the bot with basic functionality:

- **CPU**: 
  - Single-core 1.0 GHz (x86_64/ARM64)
  - Any modern processor from 2015+
- **RAM**: 
  - 256 MB available memory
  - 512 MB total system RAM recommended
- **Storage**: 
  - 100 MB for bot files
  - 50 MB for dependencies
  - 50 MB for database (grows with users)
  - **Total**: 200 MB minimum
- **Network**: 
  - Stable internet connection (1 Mbps+ recommended)
  - Low latency to Discord servers (< 200ms)

### Recommended Specifications
For optimal performance and multiple servers:

- **CPU**: 
  - Dual-core 2.0 GHz or higher
  - Modern processor (2018+)
- **RAM**: 
  - 512 MB available for bot
  - 2 GB total system RAM
- **Storage**: 
  - 500 MB free space (allows for growth)
  - SSD recommended for database performance
- **Network**: 
  - 5 Mbps+ connection
  - Low latency (< 100ms to Discord)

### High-Traffic Server Specifications
For 50+ servers or very active communities:

- **CPU**: Quad-core 2.5 GHz+
- **RAM**: 1 GB dedicated to bot
- **Storage**: 1 GB free (SSD required)
- **Network**: 10 Mbps+ dedicated bandwidth

---

## Software Dependencies

### Python Runtime

#### Required Version
- **Python 3.12** or higher
- **Python 3.11** may work but not officially tested
- **Python 3.10 or lower** ❌ NOT supported

#### How to Check Python Version
```bash
python --version
# or
python3 --version
```

#### Installation Sources
- **Official**: https://www.python.org/downloads/
- **Windows**: Microsoft Store or official installer
- **macOS**: Homebrew (`brew install python@3.12`)
- **Linux**: Package manager (`apt install python3.12`)

### Python Packages

All packages installed via pip:

#### Core Dependencies

**discord.py 2.0+**
- **Purpose**: Discord API wrapper
- **Version**: 2.0.0 or higher (2.3.2 recommended)
- **Size**: ~5 MB
- **Installation**: `pip install discord.py`

**asyncsqlite3**
- **Purpose**: Async SQLite database wrapper
- **Version**: Latest stable
- **Size**: ~100 KB
- **Installation**: `pip install asyncsqlite3`

**pypokerengine**
- **Purpose**: Poker game logic
- **Version**: Latest stable
- **Size**: ~200 KB
- **Installation**: `pip install pypokerengine`

**easy-pil**
- **Purpose**: Image generation for games
- **Version**: Latest stable
- **Size**: ~50 KB (depends on Pillow)
- **Installation**: `pip install easy-pil`
- **Note**: Installs Pillow as dependency (~5 MB)

**python-dotenv**
- **Purpose**: Environment variable management
- **Version**: Latest stable
- **Size**: ~30 KB
- **Installation**: `pip install python-dotenv`

#### Install All Dependencies
```bash
pip install discord.py asyncsqlite3 pypokerengine easy-pil python-dotenv
```

#### Total Dependency Size
- **Download**: ~50 MB (includes all packages + sub-dependencies)
- **Installed**: ~80 MB

### Optional Dependencies

**For Production Deployment**:
- **systemd** (Linux, usually pre-installed)
- **PM2** (Cross-platform): `npm install -g pm2`
- **Docker** (Optional): For containerized deployment

**For Development**:
- **Git**: Version control
- **Code Editor**: VS Code, PyCharm, etc.
- **SQLite Browser**: For database inspection

---

## Discord Requirements

### Bot Application

#### Discord Account
- Active Discord account (free)
- Email verification required

#### Developer Portal Access
- Access to https://discord.com/developers/applications
- Ability to create applications

#### Bot Token
- Generated from Discord Developer Portal
- Must be kept secret and secure
- Required for bot authentication

### Bot Permissions

#### Required Permissions (Minimum)
These permissions are essential for basic functionality:

- ✅ **Read Messages/View Channels**
- ✅ **Send Messages**
- ✅ **Send Messages in Threads**
- ✅ **Embed Links**
- ✅ **Attach Files**
- ✅ **Read Message History**
- ✅ **Add Reactions**
- ✅ **Use Slash Commands**

**Permission Integer**: `414464724032`

#### Recommended Permissions
For full functionality including leveling and setup:

- ✅ All minimum permissions above
- ✅ **Manage Roles** (for leveling role rewards)
- ✅ **Manage Channels** (for poker dedicated channels)
- ✅ **Manage Messages** (for game cleanup)
- ✅ **Mention Everyone** (for announcements)

**Permission Integer**: `1099511562304`

#### Permission Setup
1. In Developer Portal → OAuth2 → URL Generator
2. Select "bot" and "applications.commands" scopes
3. Select required permissions
4. Use generated URL to invite bot

### Gateway Intents

#### Required Intents
Must be enabled in Discord Developer Portal (Bot → Privileged Gateway Intents):

- ✅ **Message Content Intent** (Required)
  - Needed for: Leveling (on_message), chat games, command parsing
- ✅ **Server Members Intent** (Recommended)
  - Needed for: Profile lookups, role assignments
- ✅ **Presence Intent** (Optional)
  - Not currently used, can be disabled

**How to Enable**:
1. Go to Discord Developer Portal
2. Select your application
3. Go to "Bot" tab
4. Scroll to "Privileged Gateway Intents"
5. Toggle on required intents
6. Save changes

---

## Server/Guild Requirements

### Discord Server Settings

#### Bot Position
- Bot's role must be **above** roles it needs to assign
- For leveling: Bot role > Level reward roles

#### Channel Permissions
- Bot needs read/write access to configured channels
- Gambling channel: Bot must have Send Messages
- Poker category: Bot must have Manage Channels

#### Recommended Setup
- Dedicated channels for bot features:
  - `#bot-commands` - General bot usage
  - `#gambling` - Gambling commands
  - `#games` - Game channels
  - `#level-ups` - Level announcements
  - `#chat-games` - Auto chat games

### Server Size Compatibility
- **Small servers** (< 100 members): ✅ Perfect
- **Medium servers** (100-1,000 members): ✅ Excellent
- **Large servers** (1,000-10,000 members): ✅ Good (monitor performance)
- **Very large servers** (10,000+ members): ⚠️ May need dedicated hosting

---

## Network Requirements

### Internet Connection

#### Bandwidth
- **Minimum**: 1 Mbps download/upload
- **Recommended**: 5 Mbps download/upload
- **Ideal**: 10+ Mbps with low latency

#### Latency
- **Acceptable**: < 200ms to Discord servers
- **Good**: < 100ms
- **Ideal**: < 50ms

#### Stability
- Stable connection required (no frequent disconnects)
- Wired connection preferred over WiFi
- Consider UPS for critical deployments

### Port Requirements
- **Outbound HTTPS (443)**: Required for Discord API
- **Outbound WSS (443)**: Required for Discord Gateway
- No inbound ports needed (bot is client)

### Firewall Rules
- Allow outbound connections to `*.discord.com`
- Allow outbound connections to Discord IPs
- No special firewall configuration usually needed

---

## Storage Requirements

### Disk Space

#### Initial Installation
- Bot files: ~5 MB
- Python dependencies: ~80 MB
- **Total**: ~100 MB

#### Database Growth (Estimated)

| Users | Database Size | Total Storage |
|-------|---------------|---------------|
| 100 | ~50 KB | ~100 MB |
| 1,000 | ~500 KB | ~101 MB |
| 10,000 | ~5 MB | ~105 MB |
| 100,000 | ~50 MB | ~150 MB |

#### Recommended Free Space
- **Minimum**: 200 MB free
- **Recommended**: 500 MB free
- **Production**: 1 GB+ for logs and backups

### Storage Type
- **HDD**: Acceptable for small deployments
- **SSD**: Recommended for better database performance
- **NVMe**: Ideal for high-traffic servers

### Backup Storage
- Regular backups recommended
- Database backup: ~same size as main.db
- Daily backups: 7 days × database size
- **Example**: 5 MB DB × 7 days = 35 MB backup storage

---

## Hosting Requirements

### Hosting Options

#### Local Machine (Development)
- ✅ Your PC/laptop
- Pros: Free, full control
- Cons: Uptime depends on keeping PC on

#### VPS (Virtual Private Server)
- ✅ DigitalOcean, Linode, Vultr, AWS EC2
- Recommended specs: 1 vCPU, 512 MB RAM, 10 GB SSD
- Cost: ~$5-10/month

#### Dedicated Server
- ✅ OVH, Hetzner
- For very large deployments
- Cost: ~$20-50/month

#### Free Hosting (Limited)
- ⚠️ Replit, Heroku free tier (restrictions apply)
- Not recommended for production

#### Raspberry Pi (Budget Option)
- ✅ Raspberry Pi 3B+ or newer
- Pros: Low cost, low power
- Cons: Limited performance for large servers

### Hosting Environment

#### Containerization (Optional)
- **Docker**: Recommended for isolation
- **Docker Compose**: For orchestration
- Minimal overhead on resources

#### Process Management
- **systemd** (Linux): Built-in, reliable
- **PM2** (Node.js): Cross-platform, easy
- **Screen/tmux**: Simple but not auto-restart

---

## Security Requirements

### Token Security
- **Never** commit tokens to Git
- Use `.env` file (excluded from Git)
- Rotate tokens if compromised
- Use different tokens for dev/prod

### Server Security
- Keep system updated (security patches)
- Firewall enabled
- SSH key authentication (if remote)
- Regular backups

### Bot Security
- Minimal permissions (principle of least privilege)
- Error logging for audit trail
- Rate limit compliance (Discord)

---

## Compatibility Notes

### Known Limitations

#### Windows Specific
- File paths use backslashes (handled by code)
- Process signals differ from Unix (graceful shutdown may vary)

#### macOS Specific
- May need Xcode command-line tools for some dependencies
- M1/M2 (ARM) Macs: All dependencies compatible

#### Linux Specific
- May need build tools for some Python packages:
  ```bash
  sudo apt install python3-dev build-essential
  ```

### Python Version Compatibility

| Python Version | Status | Notes |
|----------------|--------|-------|
| 3.12.x | ✅ Fully Supported | Recommended |
| 3.11.x | ⚠️ May Work | Not officially tested |
| 3.10.x | ❌ Not Supported | discord.py 2.0+ requires 3.11+ |
| 3.9.x or lower | ❌ Not Supported | Too old |

### Discord.py Version Compatibility

| discord.py Version | Status | Notes |
|--------------------|--------|-------|
| 2.3.x | ✅ Recommended | Latest stable |
| 2.2.x | ✅ Supported | Older stable |
| 2.1.x | ✅ Supported | May have bugs |
| 2.0.x | ⚠️ Minimum | Upgrade recommended |
| 1.x | ❌ Not Compatible | Major version change |

---

## Pre-Deployment Checklist

### System Check
- [ ] Python 3.12+ installed
- [ ] pip available and updated
- [ ] 500 MB+ free disk space
- [ ] Stable internet connection

### Discord Setup
- [ ] Bot application created
- [ ] Bot token obtained
- [ ] Intents enabled (Message Content, Server Members)
- [ ] Bot invited to test server with permissions

### Software Dependencies
- [ ] discord.py installed
- [ ] asyncsqlite3 installed
- [ ] pypokerengine installed
- [ ] easy-pil installed
- [ ] python-dotenv installed

### Configuration
- [ ] `.env` or `TOKEN.py` configured
- [ ] Token added securely
- [ ] Custom emojis uploaded (optional)
- [ ] `emojis.json` configured (optional)

### Testing
- [ ] Bot starts without errors
- [ ] `/help` command works
- [ ] Database creates successfully
- [ ] Can create profile with `/profile`

---

## Troubleshooting Requirements Issues

### "Python not found"
**Solution**: Add Python to PATH or use full path to python executable

### "pip not found"
**Solution**: 
```bash
python -m ensurepip
# or
python -m pip install --upgrade pip
```

### "Permission denied" (Linux)
**Solution**: 
```bash
chmod +x main.py
# or run with sudo (not recommended)
```

### "Intents error"
**Solution**: Enable intents in Discord Developer Portal

### "Out of memory" (Low RAM systems)
**Solution**: 
- Close other applications
- Use swap space
- Upgrade RAM or use VPS

### "Slow database queries"
**Solution**:
- Use SSD instead of HDD
- Enable WAL mode in SQLite
- Regular VACUUM operations

---

## Recommended Configurations

### Development Environment
- **OS**: Any (Windows/macOS/Linux)
- **CPU**: Dual-core
- **RAM**: 2 GB
- **Storage**: 5 GB free
- **Network**: Home internet

### Small Production (1-10 servers)
- **Hosting**: VPS (512 MB RAM)
- **OS**: Ubuntu 22.04 LTS
- **CPU**: 1 vCPU
- **RAM**: 512 MB
- **Storage**: 10 GB SSD
- **Cost**: ~$5/month

### Medium Production (10-100 servers)
- **Hosting**: VPS (1 GB RAM)
- **OS**: Ubuntu 22.04 LTS
- **CPU**: 2 vCPU
- **RAM**: 1 GB
- **Storage**: 25 GB SSD
- **Cost**: ~$10/month

### Large Production (100+ servers)
- **Hosting**: Dedicated or scalable VPS
- **OS**: Ubuntu 22.04 LTS
- **CPU**: 4+ vCPU
- **RAM**: 2+ GB
- **Storage**: 50+ GB SSD
- **Cost**: ~$20-50/month
