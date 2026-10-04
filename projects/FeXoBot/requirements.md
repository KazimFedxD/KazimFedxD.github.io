# System Requirements

## Operating Systems

### ✅ Windows
- **Minimum**: Windows 10 (Version 1909 or later)
- **Recommended**: Windows 11
- **Architecture**: x64 (64-bit)
- **Notes**: 
  - Windows Subsystem for Linux (WSL) supported
  - PowerShell 5.1+ or Command Prompt
  - Administrator privileges needed for some installations

### ✅ macOS
- **Minimum**: macOS 12.0 (Monterey)
- **Recommended**: macOS 14.0 (Sonoma) or later
- **Architecture**: Intel (x86_64) or Apple Silicon (ARM64)
- **Notes**:
  - Xcode Command Line Tools may be required
  - Homebrew recommended for package management

### ✅ Linux
**Tested Distributions**:
- Ubuntu 20.04 LTS, 22.04 LTS, 24.04 LTS
- Debian 11 (Bullseye), 12 (Bookworm)
- Arch Linux (rolling release)
- Fedora 36+
- CentOS Stream 9

**Architecture**: x86_64 (AMD64), ARM64
**Notes**:
- systemd for service management (recommended)
- sudo/root access for installation

---

## Hardware Requirements

### Minimum Configuration
- **CPU**: Dual-core 1.5 GHz (Intel Core i3/AMD equivalent)
- **RAM**: 512 MB available
- **Storage**: 500 MB free space
- **Network**: Stable internet connection (1 Mbps minimum)

### Recommended Configuration
- **CPU**: Quad-core 2.0 GHz or better
- **RAM**: 1 GB available
- **Storage**: 2 GB free space (for databases, logs, caching)
- **Network**: Broadband connection (5+ Mbps)

### Production/High-Load Configuration
For bots serving 50+ guilds or handling high command volumes:
- **CPU**: 4+ cores, 3.0 GHz
- **RAM**: 2 GB available
- **Storage**: 10 GB free space (SSD recommended)
- **Network**: 10+ Mbps with low latency

---

## Software Dependencies

### Python

#### Required Version
- **Minimum**: Python 3.11.0
- **Recommended**: Python 3.12.0 or later
- **Not Supported**: Python 3.10 and below

**Installation**:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3.12 python3.12-venv python3-pip

# macOS (Homebrew)
brew install python@3.12

# Windows
# Download from https://www.python.org/downloads/
```

**Verify Installation**:
```bash
python3 --version  # Should show 3.12.x
pip3 --version
```

---

### Core Python Libraries

#### Discord.py 2.0+
- **Version**: 2.0.0 or higher
- **Purpose**: Discord API wrapper
- **Installation**: `pip install discord.py`

#### FedxD
- **Purpose**: Custom Discord utilities
- **Installation**: `pip install FedxD`

#### Easy-PIL
- **Purpose**: Image manipulation for level cards
- **Installation**: `pip install easy-pil`

#### SQLite3
- **Version**: 3.35.0+
- **Purpose**: Database management
- **Installation**: Included with Python 3.x

#### Asyncio
- **Purpose**: Asynchronous I/O operations
- **Installation**: Built-in (Python 3.5+)

#### Aiohttp
- **Purpose**: Async HTTP requests
- **Installation**: `pip install aiohttp`

#### Translators
- **Purpose**: Multi-language translation
- **Installation**: `pip install translators`

#### g4f (GPT4Free)
- **Purpose**: Free GPT-4 API access
- **Installation**: `pip install g4f`

#### JokeAPI
- **Purpose**: Joke API wrapper
- **Installation**: `pip install jokeapi`

#### Currency Converter
- **Purpose**: Real-time currency conversion
- **Installation**: `pip install currency-converter`

#### Pokebase
- **Purpose**: PokeAPI wrapper
- **Installation**: `pip install pokebase`

#### Requests
- **Purpose**: HTTP library
- **Installation**: `pip install requests`

#### Aiofiles
- **Purpose**: Async file operations
- **Installation**: `pip install aiofiles`

---

### Full Requirements File

```txt
# requirements.txt
discord.py>=2.0.0
FedxD>=1.0.0
easy-pil>=0.3.0
translators>=5.8.0
g4f>=0.2.0
jokeapi>=1.0.0
currency-converter>=0.17.0
pokebase>=1.3.0
aiohttp>=3.9.0
aiofiles>=23.0.0
requests>=2.31.0
```

Install all at once:
```bash
pip install -r requirements.txt
```

---

## External Services

### Required Services

#### Discord Developer Account
- **Purpose**: Create bot application and obtain token
- **Cost**: Free
- **URL**: https://discord.com/developers/applications
- **Requirements**:
  - Valid Discord account
  - Email verification
  - 2FA recommended

#### Discord Server
- **Purpose**: Host the bot
- **Requirements**:
  - Administrator permissions to invite bot
  - Appropriate channel permissions set

---

### Optional API Services

#### NASA API
- **Purpose**: Astronomy Picture of the Day
- **Cost**: Free
- **Rate Limit**: 1,000 requests/hour
- **URL**: https://api.nasa.gov/
- **Required for**: `/nasa` command

#### NinjaAPI
- **Purpose**: Facts, quotes, trivia, definitions
- **Cost**: Free tier available
- **Rate Limit**: 10,000 requests/month (free tier)
- **URL**: https://api-ninjas.com/
- **Required for**: `/fact`, `/quote`, `/define` commands

#### Google Custom Search API
- **Purpose**: Image search functionality
- **Cost**: Free tier (100 queries/day)
- **URL**: https://developers.google.com/custom-search
- **Required for**: `/image search` command

#### TinyURL API
- **Purpose**: URL shortening
- **Cost**: Free tier available
- **Rate Limit**: 600 requests/month
- **URL**: https://tinyurl.com/app/dev
- **Required for**: `/tinyurl` commands

#### Edamam API
- **Purpose**: Recipe search and nutrition data
- **Cost**: Free tier (5,000 calls/month)
- **URL**: https://developer.edamam.com/
- **Required for**: `/recipe` command

#### TestMail API
- **Purpose**: Temporary email generation
- **Cost**: Free tier available
- **URL**: https://testmail.app/
- **Required for**: `/tempmail` commands

#### Unsplash API
- **Purpose**: High-quality image search
- **Cost**: Free (5,000 requests/hour)
- **URL**: https://unsplash.com/developers
- **Required for**: `/image search` command (alternative to Google)

#### Exchange Rate API
- **Purpose**: Currency conversion rates
- **Cost**: Free tier (1,500 requests/month)
- **URL**: https://www.exchangerate-api.com/
- **Required for**: `/currency` command

---

## Browser Compatibility

**Not Applicable** - FeXoBot is a Discord bot, not a web application.

However, for web dashboard (if developed in future):
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Network Requirements

### Bandwidth
- **Minimum**: 1 Mbps upload/download
- **Recommended**: 5 Mbps upload/download
- **For Production**: 10+ Mbps with low latency

### Ports
- **Outbound HTTPS (443)**: Required for Discord API and external APIs
- **Outbound HTTP (80)**: Optional for some API services
- **No inbound ports required** (bot connects to Discord, doesn't host services)

### Firewall Configuration
Ensure outbound connections allowed to:
- `*.discord.com`
- `*.discordapp.com`
- `gateway.discord.gg`
- API endpoints (NASA, PokeAPI, etc.)

### Latency Requirements
- **Acceptable**: < 200ms to Discord servers
- **Optimal**: < 100ms
- **Poor Performance**: > 500ms (may cause timeout issues)

**Check Latency**:
```bash
ping discord.com
```

---

## Development Environment

### Code Editor/IDE (Recommended)
- **VS Code**: Python extension, Discord.py snippets
- **PyCharm**: Professional Python IDE
- **Sublime Text**: Lightweight alternative
- **Vim/Neovim**: For terminal-based development

### Version Control
- **Git**: 2.30.0 or higher
- **GitHub Account**: For repository hosting (optional)

### Optional Tools
- **Postman**: Testing API endpoints
- **DB Browser for SQLite**: Database visualization
- **Docker**: For containerized deployment
- **PM2**: Process management
- **systemd**: Linux service management

---

## Deployment Environments

### Local Development
- **Suitable for**: Testing, development, small personal servers
- **Uptime**: Dependent on machine uptime
- **Cost**: Free

### Virtual Private Server (VPS)
- **Suitable for**: Production, 24/7 uptime, multiple servers
- **Providers**: DigitalOcean, Linode, Vultr, AWS EC2, Google Cloud
- **Recommended Specs**:
  - 1 vCPU
  - 1 GB RAM
  - 25 GB SSD
  - Ubuntu 22.04 LTS
- **Cost**: $5-10/month

### Cloud Hosting
- **AWS EC2**: t2.micro (free tier eligible)
- **Google Cloud**: e2-micro (free tier)
- **Azure**: B1s (low-cost option)

### Containerized Deployment
- **Docker**: Single container
- **Docker Compose**: Multi-container setup (bot + database + monitoring)
- **Kubernetes**: Overkill for single bot, useful for multi-bot deployments

---

## Storage Requirements

### Database Storage
- **Initial Size**: ~1 MB
- **After 1 Month** (small server, 100 members): ~5-10 MB
- **After 1 Month** (large server, 5,000 members): ~50-100 MB
- **Growth Rate**: ~2-5 MB per month per active server

### Log Files
- **Daily Logs**: 1-5 MB per day (depends on verbosity)
- **Retention**: Recommend keeping 30 days
- **Monthly Storage**: 30-150 MB

### Message Logs (if enabled)
- **Storage**: 100-500 MB per month for active servers
- **Recommendation**: Rotate or archive old logs

### Total Storage Estimate
- **Minimum**: 500 MB
- **Recommended**: 2 GB
- **Production (multiple servers)**: 10+ GB

---

## Security Requirements

### System Security
- **Firewall**: Enabled (allow only necessary outbound connections)
- **Antivirus**: Not strictly necessary on Linux, recommended on Windows
- **User Permissions**: Run bot as non-root/non-admin user
- **File Permissions**: Restrict access to TOKEN.py and databases

### Token Security
- **Storage**: Never commit `TOKEN.py` to version control
- **Access**: Keep token private, regenerate if exposed
- **Environment Variables**: Consider using `.env` files or secrets management

### API Key Security
- **Best Practice**: Use environment variables or secure key management
- **Rotation**: Periodically rotate API keys
- **Monitoring**: Watch for unusual API usage

---

## Monitoring & Logging Requirements

### Disk Space Monitoring
- Ensure at least 20% free space at all times
- Set up alerts for low disk space

### Process Monitoring
- Use process managers (PM2, systemd) to auto-restart on crashes
- Monitor CPU and memory usage

### Log Rotation
```bash
# Configure log rotation for Linux
sudo nano /etc/logrotate.d/fexobot

# Add configuration:
/path/to/FeXoBot/logs/*.log {
    daily
    rotate 30
    compress
    missingok
    notifempty
}
```

---

## Backup Requirements

### What to Backup
- **Databases**: `main.db`, `servers/*.db`, `pokemon.db`
- **Configuration**: `TOKEN.py` (securely)
- **Custom Files**: Modified code, custom assets

### Backup Frequency
- **Databases**: Daily (automated)
- **Configuration**: After changes
- **Full Backup**: Weekly

### Backup Methods
```bash
# Simple backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf backup-$DATE.tar.gz *.db TOKEN.py servers/ tickets/
```

---

## Scalability Limits

### Current Architecture Limits
- **Maximum Guilds**: 100+ (tested)
- **Maximum Members per Guild**: No hard limit (tested up to 10,000)
- **Concurrent Commands**: 200-300/minute (single instance)
- **Database Size**: Practical limit ~100 GB (SQLite)

### Scaling Recommendations
- **50+ Guilds**: Consider VPS deployment
- **100+ Guilds**: Use PostgreSQL instead of SQLite
- **500+ Guilds**: Implement Discord bot sharding
- **1,000+ Guilds**: Multi-instance deployment with load balancing

---

## Compatibility Notes

### Python Version Compatibility
- ✅ **Python 3.12**: Fully tested and recommended
- ✅ **Python 3.11**: Supported
- ⚠️ **Python 3.10**: Not officially supported (may work with modifications)
- ❌ **Python 3.9 and below**: Not compatible (Discord.py 2.0 requirement)

### Discord.py Version
- ✅ **2.3.x**: Latest stable
- ✅ **2.2.x**: Supported
- ✅ **2.1.x**: Supported
- ⚠️ **2.0.x**: Minimum required version
- ❌ **1.7.x and below**: Not compatible (uses older API)

### Operating System Notes
- **Windows**: Use PowerShell or WSL for best compatibility
- **macOS**: Apple Silicon requires Python built for ARM64
- **Linux**: Most distributions work out-of-box with standard packages

---

## Summary Checklist

Before running FeXoBot, ensure you have:

- ✅ Python 3.11+ installed
- ✅ All required libraries installed (`pip install -r requirements.txt`)
- ✅ Discord bot token obtained
- ✅ Minimum 512 MB RAM available
- ✅ Stable internet connection
- ✅ 500 MB+ free disk space
- ✅ `TOKEN.py` configured with bot token
- ✅ (Optional) API keys for desired features

**Ready to install?** Proceed to [setup.md](setup.md) for installation instructions.
