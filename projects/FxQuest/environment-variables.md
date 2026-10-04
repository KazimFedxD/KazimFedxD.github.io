# Environment Variables Reference

## Overview

FxQuest uses environment variables to store sensitive configuration data, particularly the Discord bot token. This document provides a complete reference for all environment variables used by the bot.

## Configuration Methods

The bot supports two methods for storing environment variables:

### Method 1: .env File (Recommended)

Create a `.env` file in the project root directory.

**Advantages**:
- Industry standard practice
- Easier deployment management
- python-dotenv integration
- Environment-specific configs (dev, staging, prod)

**Usage**:
```bash
# Create .env file
touch .env  # macOS/Linux
type nul > .env  # Windows

# Edit with your values
nano .env  # or any text editor
```

### Method 2: TOKEN.py File

Create a `TOKEN.py` Python file in the project root.

**Advantages**:
- Simpler for beginners
- No additional libraries needed (if not using .env)
- Direct Python import

**Usage**:
```python
# TOKEN.py
TOKEN = "your_token_here"
```

**Note**: Both methods are automatically checked by the bot. `.env` takes precedence if both exist.

---

## Required Variables

### DISCORD_TOKEN

**Description**: Discord bot authentication token

**Type**: String

**Format**: Long alphanumeric string (59 characters typical)

**Example**: `YOUR_DISCORD_BOT_TOKEN_HERE_59_CHARACTERS_LONG_GET_FROM_DISCORD_DEVELOPERS`

**Purpose**: Authenticates the bot with Discord API

**How to Obtain**:
1. Go to https://discord.com/developers/applications
2. Select your application
3. Go to "Bot" tab
4. Click "Reset Token" or "Copy"
5. Save token immediately (cannot view again without reset)

**Security Level**: 🔴 **CRITICAL - NEVER SHARE**

**Usage in Code**:
```python
# If using .env:
from dotenv import load_dotenv
import os

load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")

# If using TOKEN.py:
from TOKEN import TOKEN
```

**.env Format**:
```env
DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE
```

**TOKEN.py Format**:
```python
TOKEN = "YOUR_DISCORD_BOT_TOKEN_HERE"
```

**Common Issues**:
- ❌ **Extra spaces**: Remove any leading/trailing spaces
- ❌ **Quotes in .env**: Don't use quotes in .env files
- ❌ **Token exposed**: If token is leaked, regenerate immediately
- ❌ **Wrong token**: Ensure you copied the entire token

**Validation**:
- Token starts with `MTI`, `Mj`, `OD`, or similar (base64)
- Contains two periods (`.`)
- Length is typically 59-72 characters

---

## Optional Variables

### DATABASE_PATH

**Description**: Custom path to SQLite database file

**Type**: String (file path)

**Format**: Absolute or relative path

**Default**: `main.db` (in project root)

**Example**: 
```env
DATABASE_PATH=/var/lib/fxquest/main.db
```

**Purpose**: Override default database location

**Use Cases**:
- Separate database per environment (dev/prod)
- Store database in different directory
- Network-mounted storage

**Usage in Code**:
```python
import os
from dotenv import load_dotenv

load_dotenv()
db_path = os.getenv("DATABASE_PATH", "main.db")
self.maindb = await sql.connect(db_path)
```

**Note**: Currently not implemented in main.py, but can be added for custom deployments.

---

### LOG_LEVEL

**Description**: Logging verbosity level

**Type**: String (enum)

**Format**: One of: `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`

**Default**: `INFO`

**Example**:
```env
LOG_LEVEL=DEBUG
```

**Purpose**: Control amount of logging output

**Values**:
- `DEBUG`: Most verbose (all events)
- `INFO`: General information
- `WARNING`: Warnings only
- `ERROR`: Errors only
- `CRITICAL`: Critical errors only

**Usage**:
```python
import logging
import os

log_level = os.getenv("LOG_LEVEL", "INFO")
logging.basicConfig(level=getattr(logging, log_level))
```

**Note**: Requires custom logging configuration (not in default main.py).

---

### BOT_PREFIX

**Description**: Command prefix for text commands (if using prefix commands)

**Type**: String

**Format**: Single character or string

**Default**: `!`

**Example**:
```env
BOT_PREFIX=?
```

**Purpose**: Set custom command prefix

**Note**: FxQuest uses slash commands primarily, so prefix is less important.

**Usage in Code**:
```python
# Already in main.py
self.prefix = os.getenv("BOT_PREFIX", "!")
```

---

### ENVIRONMENT

**Description**: Deployment environment identifier

**Type**: String

**Format**: One of: `development`, `staging`, `production`

**Default**: `development`

**Example**:
```env
ENVIRONMENT=production
```

**Purpose**: 
- Conditional feature enabling
- Different database per environment
- Debug mode in development

**Usage**:
```python
env = os.getenv("ENVIRONMENT", "development")

if env == "development":
    # Enable debug features
    DEBUG = True
elif env == "production":
    # Disable debug, enable monitoring
    DEBUG = False
```

---

## Future/Planned Variables

These variables are not currently used but may be added in future versions:

### REDIS_URL

**Description**: Redis connection string for caching

**Type**: String (URL)

**Format**: `redis://user:password@host:port/db`

**Example**: `redis://localhost:6379/0`

**Purpose**: Distributed caching for multi-instance deployments

---

### SENTRY_DSN

**Description**: Sentry error tracking DSN

**Type**: String (URL)

**Format**: `https://public_key@sentry.io/project_id`

**Example**: `https://abc123@o123.ingest.sentry.io/456`

**Purpose**: Error tracking and monitoring

---

### WEBHOOK_URL

**Description**: Discord webhook for bot status notifications

**Type**: String (URL)

**Format**: Discord webhook URL

**Example**: `https://discord.com/api/webhooks/123/abc`

**Purpose**: Send bot startup/shutdown notifications

---

## Environment-Specific Configurations

### Development Environment (.env.development)

```env
DISCORD_TOKEN=YOUR_DEV_BOT_TOKEN
ENVIRONMENT=development
LOG_LEVEL=DEBUG
DATABASE_PATH=dev.db
```

### Staging Environment (.env.staging)

```env
DISCORD_TOKEN=YOUR_STAGING_BOT_TOKEN
ENVIRONMENT=staging
LOG_LEVEL=INFO
DATABASE_PATH=staging.db
```

### Production Environment (.env.production)

```env
DISCORD_TOKEN=YOUR_PROD_BOT_TOKEN
ENVIRONMENT=production
LOG_LEVEL=WARNING
DATABASE_PATH=/var/lib/fxquest/main.db
```

**Loading Specific Environment**:
```python
from dotenv import load_dotenv
import os

env = os.getenv("ENV", "development")
load_dotenv(f".env.{env}")
```

---

## Security Best Practices

### 1. Never Commit Secrets to Version Control

**.gitignore** (already configured):
```gitignore
.env
*.env
.env.*
TOKEN.py
```

**Verify**:
```bash
git status  # Should NOT show .env or TOKEN.py
```

### 2. Use Different Tokens Per Environment

- **Development**: Separate bot for testing
- **Production**: Different bot for live servers
- **Never** use production token in development

### 3. Rotate Tokens Regularly

- Change tokens every 3-6 months
- Immediately rotate if:
  - Token is leaked
  - Suspicious activity detected
  - Team member with access leaves

### 4. Limit Token Access

- Only necessary personnel
- Use secrets management (e.g., Vault, AWS Secrets Manager)
- Never share via email/chat

### 5. Validate Environment Variables

```python
import os
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("DISCORD_TOKEN")
if not TOKEN:
    raise ValueError("DISCORD_TOKEN not set in environment")

if len(TOKEN) < 50:
    raise ValueError("DISCORD_TOKEN appears invalid (too short)")
```

---

## Loading Environment Variables

### Using python-dotenv (Recommended)

**Installation**:
```bash
pip install python-dotenv
```

**Code**:
```python
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Access variables
TOKEN = os.getenv("DISCORD_TOKEN")
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")  # with default
```

**Features**:
- Automatically loads `.env` from project root
- Does not override existing environment variables
- Supports `.env.{environment}` files

### Using TOKEN.py (Simple)

**Code**:
```python
try:
    from TOKEN import TOKEN
except ImportError:
    import os
    TOKEN = os.getenv("DISCORD_TOKEN")
    if not TOKEN:
        raise ValueError("No token found in TOKEN.py or DISCORD_TOKEN env var")
```

**Features**:
- No external dependencies
- Simple Python import
- Fallback to environment variable

---

## Deployment Configurations

### Docker Deployment

**docker-compose.yml**:
```yaml
version: '3.8'
services:
  fxquest:
    build: .
    restart: always
    env_file:
      - .env
    # Or inline:
    environment:
      - DISCORD_TOKEN=${DISCORD_TOKEN}
      - LOG_LEVEL=INFO
    volumes:
      - ./main.db:/app/main.db
```

**Run**:
```bash
docker-compose up -d
```

### systemd Service (Linux)

**fxquest.service**:
```ini
[Unit]
Description=FxQuest Discord Bot
After=network.target

[Service]
Type=simple
User=botuser
WorkingDirectory=/opt/fxquest
EnvironmentFile=/opt/fxquest/.env
ExecStart=/opt/fxquest/venv/bin/python main.py
Restart=always

[Install]
WantedBy=multi-user.target
```

**.env** file referenced by `EnvironmentFile`:
```env
DISCORD_TOKEN=your_token_here
LOG_LEVEL=INFO
```

### PM2 (Node.js Process Manager)

**ecosystem.config.js**:
```javascript
module.exports = {
  apps: [{
    name: 'fxquest',
    script: 'main.py',
    interpreter: 'python3',
    env: {
      DISCORD_TOKEN: 'your_token_here',
      LOG_LEVEL: 'INFO'
    }
  }]
};
```

**Run**:
```bash
pm2 start ecosystem.config.js
```

---

## Environment Variable Reference Table

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `DISCORD_TOKEN` | String | ✅ Yes | None | Discord bot authentication token |
| `DATABASE_PATH` | String | ❌ No | `main.db` | Path to SQLite database file |
| `LOG_LEVEL` | String | ❌ No | `INFO` | Logging verbosity level |
| `BOT_PREFIX` | String | ❌ No | `!` | Command prefix (for text commands) |
| `ENVIRONMENT` | String | ❌ No | `development` | Deployment environment |

---

## Troubleshooting

### "Token is incorrect" Error

**Possible Causes**:
1. Token not set in `.env` or `TOKEN.py`
2. Token copied incorrectly (spaces, incomplete)
3. Token regenerated in Developer Portal but not updated
4. Using wrong token (dev vs prod)

**Solution**:
1. Verify token in Discord Developer Portal
2. Copy entire token (should be 59+ characters)
3. Update `.env` or `TOKEN.py`
4. Restart bot

### "Cannot find .env file"

**Possible Causes**:
1. `.env` file not created
2. File named incorrectly (e.g., `env.txt`)
3. File in wrong directory

**Solution**:
1. Create `.env` in project root (same level as `main.py`)
2. Ensure no file extension (not `.env.txt`)
3. Check file with `ls -la` (Linux/Mac) or `dir /a` (Windows)

### Environment Variables Not Loading

**Possible Causes**:
1. `python-dotenv` not installed
2. `.env` file has syntax errors
3. Variables have quotes (shouldn't in .env)

**Solution**:
```bash
# Install python-dotenv
pip install python-dotenv

# Check .env syntax (no quotes around values)
# Correct:
DISCORD_TOKEN=abc123

# Wrong:
DISCORD_TOKEN="abc123"
```

### Token Works Locally but Not on Server

**Possible Causes**:
1. `.env` not uploaded to server (in .gitignore)
2. Different environment on server
3. File permissions

**Solution**:
1. Manually create `.env` on server
2. Set environment variables via hosting platform
3. Use secrets management system

---

## Quick Reference

### Create .env File

```bash
# Create file
cat > .env << EOF
DISCORD_TOKEN=your_token_here
LOG_LEVEL=INFO
ENVIRONMENT=production
EOF

# Verify
cat .env

# Set permissions (Linux)
chmod 600 .env  # Only owner can read/write
```

### Validate Environment

```python
import os
from dotenv import load_dotenv

load_dotenv()

# Check all variables
print(f"DISCORD_TOKEN: {'✅ Set' if os.getenv('DISCORD_TOKEN') else '❌ Not set'}")
print(f"LOG_LEVEL: {os.getenv('LOG_LEVEL', 'INFO (default)')}")
print(f"ENVIRONMENT: {os.getenv('ENVIRONMENT', 'development (default)')}")
```

### Example Complete .env File

```env
# Discord Bot Configuration
DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE

# Environment
ENVIRONMENT=production

# Logging
LOG_LEVEL=INFO

# Database
DATABASE_PATH=/var/lib/fxquest/main.db

# Optional
BOT_PREFIX=!
```
