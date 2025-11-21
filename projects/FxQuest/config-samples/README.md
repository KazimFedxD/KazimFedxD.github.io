# Configuration Samples

These are sanitized configuration files from the FxQuest project.
Sensitive information has been replaced with placeholders.

## 📁 Files Included

### pyproject.toml
Python project dependencies and metadata configuration.

**Usage**:
1. Copy to project root as `pyproject.toml` (or use existing)
2. Install dependencies: `pip install -e .`
3. For development: `pip install -e ".[dev]"`

**Contents**:
- Project metadata (name, version, description)
- Python version requirement (3.11+)
- Production dependencies (discord.py, aiofiles, etc.)

**Installing Dependencies**:
```bash
# Using pip with pyproject.toml
pip install -e .

# Or install from requirements if you generate one
pip install discord.py aiofiles aiohttp easy-pil
```

### .env.example
Environment variables template for bot configuration.

**Usage**:
1. Copy to project root as `.env`
2. Replace placeholder values with your actual credentials
3. Never commit real `.env` to version control (already in `.gitignore`)

**Contents**:
```env
DISCORD_TOKEN=YOUR_DISCORD_TOKEN_HERE
LOG_LEVEL=INFO
ENVIRONMENT=production
```

### emojis.json.example
Custom emoji configuration for Minecraft features.

**Usage**:
1. Copy to project root as `emojis.json`
2. Upload custom emojis to your Discord server
3. Replace emoji IDs with your server's emoji IDs

**Format**:
```json
{
  "item_name": ["emoji_name", "emoji_id"],
  "coal": ["coal_emoji", "123456789012345678"],
  "iron": ["iron_emoji", "123456789012345679"]
}
```

**How to Get Emoji IDs**:
1. Upload emoji to your server (Server Settings → Emoji)
2. In Discord chat, type `\:emoji_name:`
3. Send message
4. Emoji will display as `<:emoji_name:123456789012345678>`
5. Copy the ID (numbers after second colon)

## 🔐 Security Notes

### What Has Been Sanitized

- ✅ **Discord Bot Tokens**: Replaced with `YOUR_DISCORD_TOKEN_HERE`
- ✅ **Real Emoji IDs**: Replaced with fake IDs (18-digit numbers)
- ✅ **Server IDs**: Removed or replaced with generic IDs
- ✅ **User IDs**: No personal IDs included
- ✅ **Email Addresses**: No emails in configs
- ✅ **Passwords**: No passwords (bot doesn't use them)

### What to Replace

Before using these configs in your project:

1. **DISCORD_TOKEN**:
   - Get from: https://discord.com/developers/applications
   - Your application → Bot → Token
   - Click "Reset Token" or "Copy"
   - Paste in `.env` file

2. **Emoji IDs**:
   - Upload emojis to your server
   - Get IDs as described above
   - Update `emojis.json`

3. **Server/Channel IDs** (if you add them):
   - Enable Discord Developer Mode (Settings → Advanced)
   - Right-click server/channel → Copy ID
   - Use in your configs

## 📝 Creating .env File

### Step 1: Create File

**Windows**:
```cmd
type nul > .env
```

**macOS/Linux**:
```bash
touch .env
```

### Step 2: Add Variables

Open `.env` in text editor and add:

```env
DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE
```

**Important**:
- No quotes around values in `.env` files
- No spaces around `=`
- One variable per line
- Comments start with `#`

### Step 3: Verify .gitignore

Ensure `.env` is in `.gitignore`:

```gitignore
.env
*.env
TOKEN.py
```

✅ This is already configured in FxQuest

## 🎨 Setting Up Custom Emojis

### Required Emojis for Minecraft Features

If you want the Minecraft mining system to display properly:

**Items**:
- coal
- iron
- gold
- diamond
- emerald
- bedrock
- stone
- dirt
- wood

**Tools** (optional):
- wooden_pickaxe
- stone_pickaxe
- iron_pickaxe
- gold_pickaxe
- diamond_pickaxe

### Finding/Creating Emojis

**Option 1**: Use existing emoji packs
- Search Discord emoji servers
- Download Minecraft emoji packs
- Upload to your server

**Option 2**: Create your own
- Use Minecraft textures
- Resize to 128x128 px
- Save as PNG
- Upload to Discord

**Option 3**: Use Unicode emojis (future feature)
- If custom emojis not available, bot could fall back to Unicode
- Not currently implemented

### Uploading to Discord

1. Go to Server Settings → Emoji
2. Click "Upload Emoji"
3. Select image file
4. Name emoji (e.g., `coal`, `diamond`)
5. Save
6. Repeat for all items

**Limits**:
- Free servers: 50 emojis
- Boosted servers: 100-250 emojis (depending on boost level)

## 🔄 Alternative Configuration Methods

### Using TOKEN.py (Instead of .env)

If you prefer Python file over `.env`:

**Create TOKEN.py**:
```python
# TOKEN.py
TOKEN = "YOUR_DISCORD_BOT_TOKEN_HERE"
```

**Important**:
- Also add `TOKEN.py` to `.gitignore` (already done)
- Bot code checks for both `.env` and `TOKEN.py`
- `.env` takes precedence if both exist

### Environment-Specific Configs

For multiple environments (dev, staging, prod):

**.env.development**:
```env
DISCORD_TOKEN=DEV_TOKEN_HERE
ENVIRONMENT=development
LOG_LEVEL=DEBUG
```

**.env.production**:
```env
DISCORD_TOKEN=PROD_TOKEN_HERE
ENVIRONMENT=production
LOG_LEVEL=WARNING
```

**Load specific env**:
```python
from dotenv import load_dotenv
import os

env = os.getenv("ENV", "development")
load_dotenv(f".env.{env}")
```

## 🐳 Docker Configuration

If deploying with Docker:

**docker-compose.yml**:
```yaml
version: '3.8'
services:
  fxquest:
    build: .
    restart: always
    env_file:
      - .env
    volumes:
      - ./main.db:/app/main.db
```

**Or inline**:
```yaml
    environment:
      - DISCORD_TOKEN=${DISCORD_TOKEN}
      - LOG_LEVEL=INFO
```

## ☁️ Cloud Platform Configuration

### Heroku

Set environment variables in dashboard or CLI:
```bash
heroku config:set DISCORD_TOKEN=your_token_here
```

### AWS (EC2, ECS)

Use AWS Secrets Manager or environment variables in task definition.

### DigitalOcean App Platform

Set environment variables in app settings.

### Railway

Set variables in dashboard under "Variables" tab.

## 🔍 Validation

### Check Environment Variables

**Python script to verify**:
```python
import os
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("DISCORD_TOKEN")

if not TOKEN:
    print("❌ DISCORD_TOKEN not set!")
else:
    print("✅ DISCORD_TOKEN is set")
    if len(TOKEN) < 50:
        print("⚠️ Token seems too short, check if complete")
    else:
        print(f"✅ Token length: {len(TOKEN)} characters")
```

Run:
```bash
python check_env.py
```

## ❓ Troubleshooting

### "Token is incorrect" Error

**Possible causes**:
- Token not set in `.env` or `TOKEN.py`
- Token has spaces or quotes (in `.env`, don't use quotes)
- Token was regenerated in Developer Portal but not updated
- Using wrong token (dev vs prod)

**Solution**:
1. Go to Discord Developer Portal
2. Copy token again (full string)
3. Update `.env` or `TOKEN.py`
4. Restart bot

### ".env not loading" Error

**Possible causes**:
- `python-dotenv` not installed
- `.env` file has wrong name or extension (e.g., `env.txt`)
- `.env` file not in project root (same level as `main.py`)

**Solution**:
```bash
# Install python-dotenv
pip install python-dotenv

# Check file location
ls -la .env  # macOS/Linux
dir .env     # Windows

# Ensure no file extension
# Correct: .env
# Wrong: .env.txt
```

### "Custom emojis not showing"

**Possible causes**:
- `emojis.json` not configured
- Emoji IDs incorrect
- Emojis not uploaded to server
- Bot doesn't have permission to use server emojis

**Solution**:
1. Upload emojis to Discord server
2. Get correct emoji IDs
3. Update `emojis.json`
4. Ensure bot is in the server with the emojis
5. Check bot has "Use External Emojis" permission

## 📚 Additional Resources

- **Discord Developer Portal**: https://discord.com/developers/applications
- **python-dotenv docs**: https://pypi.org/project/python-dotenv/
- **Environment Variables Guide**: See `.website/environment-variables.md`
- **Full Setup Guide**: See `.website/setup.md`

## 🎯 Quick Start Checklist

- [ ] Copy `.env.example` to `.env`
- [ ] Get Discord bot token from Developer Portal
- [ ] Add token to `.env` (no quotes)
- [ ] Verify `.env` in `.gitignore`
- [ ] Install `python-dotenv`: `pip install python-dotenv`
- [ ] (Optional) Upload custom emojis to Discord server
- [ ] (Optional) Copy `emojis.json.example` to `emojis.json`
- [ ] (Optional) Update emoji IDs in `emojis.json`
- [ ] Test: Run `python main.py`
- [ ] Verify bot connects (should see "Logged in as...")

---

**For more detailed setup instructions, see:**  
`.website/setup.md` - Complete installation and configuration guide

**For environment variables reference, see:**  
`.website/environment-variables.md` - All variables explained

---

**Remember: Never commit real tokens or credentials to Git!** ✅
