# Environment Variables Reference

This document provides a complete reference for all environment variables and configuration tokens used in FeXoBot.

---

## Configuration File

All environment variables are stored in `TOKEN.py` in the project root directory.

**File Structure**:
```python
# TOKEN.py

def TOKEN():
    """Discord Bot Token"""
    return "your_token_here"

def api_function():
    """API Key"""
    return "your_api_key"
```

---

## Required Variables

### Discord Bot Token

#### `TOKEN()`
- **Type**: String
- **Format**: Long alphanumeric string (59+ characters)
- **Purpose**: Discord bot authentication token
- **Example**: `YOUR_DISCORD_BOT_TOKEN_HERE_GET_FROM_DEVELOPERS_PORTAL`
- **Required**: ✅ Yes (bot will not start without it)
- **How to Obtain**:
  1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
  2. Create or select your application
  3. Go to "Bot" section
  4. Click "Reset Token"
  5. Copy the token
- **Security**: 🔒 **CRITICAL - Never share or commit to version control!**

**Example in TOKEN.py**:
```python
def TOKEN():
    return "YOUR_DISCORD_BOT_TOKEN_HERE"
```

---

## Optional API Variables

### NASA API

#### `nasaTOKEN()`
- **Type**: String
- **Format**: 40-character alphanumeric API key
- **Purpose**: Access NASA's Astronomy Picture of the Day API
- **Example**: `DEMO_KEY` (limited to 30 requests/hour) or `abcd1234efgh5678ijkl9012mnop3456qrst7890`
- **Required**: ❌ No (but `/nasa` command won't work without it)
- **Default**: None
- **How to Obtain**:
  1. Visit [NASA API Portal](https://api.nasa.gov/)
  2. Click "Get Started"
  3. Fill in your information
  4. API key sent to your email
- **Rate Limit**: 1,000 requests/hour (with API key)
- **Cost**: Free

**Example in TOKEN.py**:
```python
def nasaTOKEN():
    return "abcd1234efgh5678ijkl9012mnop3456qrst7890"
```

**Commands Using This**:
- `/nasa apod` - Get Astronomy Picture of the Day

---

### NinjaAPI

#### `ninjaapiTOKEN()`
- **Type**: String
- **Format**: 32-character alphanumeric key
- **Purpose**: Access facts, quotes, trivia, definitions, and more
- **Example**: `abcdefghijklmnopqrstuvwxyz123456`
- **Required**: ❌ No (related commands will be disabled)
- **Default**: None
- **How to Obtain**:
  1. Visit [API Ninjas](https://api-ninjas.com/)
  2. Sign up for free account
  3. Go to "My Account"
  4. Copy API key
- **Rate Limit**: 10,000 requests/month (free tier)
- **Cost**: Free tier available

**Example in TOKEN.py**:
```python
def ninjaapiTOKEN():
    return "abcdefghijklmnopqrstuvwxyz123456"
```

**Commands Using This**:
- `/fact` - Random interesting facts
- `/quote` - Inspirational quotes
- `/define <word>` - Word definitions
- `/trivia` - Trivia questions

---

### Google API

#### `googleapiTOKEN()`
- **Type**: String
- **Format**: 39-character API key starting with "AIza"
- **Purpose**: Google Custom Search for image search
- **Example**: `Your-Google-Key`
- **Required**: ❌ No (image search will use Unsplash as fallback)
- **Default**: None
- **How to Obtain**:
  1. Visit [Google Cloud Console](https://console.cloud.google.com/)
  2. Create new project
  3. Enable "Custom Search API"
  4. Create credentials (API Key)
  5. Restrict key to Custom Search API
- **Rate Limit**: 100 queries/day (free tier)
- **Cost**: Free tier, paid plans available

**Example in TOKEN.py**:
```python
def googleapiTOKEN():
    return "AIzaSyD1234567890abcdefghijklmnopqrstuv"
```

**Commands Using This**:
- `/image search <query>` - Search for images

---

### TinyURL API

#### `tinyurlTOKEN()`
- **Type**: String
- **Format**: UUID-style token
- **Purpose**: URL shortening service
- **Example**: `12345678-90ab-cdef-1234-567890abcdef`
- **Required**: ❌ No (`/tinyurl` commands won't work)
- **Default**: None
- **How to Obtain**:
  1. Visit [TinyURL API](https://tinyurl.com/app/dev)
  2. Sign up for account
  3. Go to developer section
  4. Generate API token
- **Rate Limit**: 600 requests/month (free tier)
- **Cost**: Free tier, paid plans available

**Example in TOKEN.py**:
```python
def tinyurlTOKEN():
    return "12345678-90ab-cdef-1234-567890abcdef"
```

**Commands Using This**:
- `/tinyurl create <url>` - Shorten URLs
- `/tinyurl stats <code>` - Get URL statistics

---

### Edamam API

#### `edamamTOKEN()`
- **Type**: Tuple of two strings (app_id, app_key)
- **Format**: 
  - App ID: 8-character hex string
  - App Key: 32-character hex string
- **Purpose**: Recipe and nutrition data search
- **Example**: `("12ab34cd", "56ef78gh90ij12kl34mn56op78qr90st")`
- **Required**: ❌ No (`/recipe` command won't work)
- **Default**: None
- **How to Obtain**:
  1. Visit [Edamam](https://developer.edamam.com/)
  2. Sign up for free account
  3. Choose "Recipe Search API"
  4. Get App ID and App Key
- **Rate Limit**: 5,000 calls/month (free developer plan)
- **Cost**: Free tier, paid plans available

**Example in TOKEN.py**:
```python
def edamamTOKEN():
    app_id = "12ab34cd"
    app_key = "56ef78gh90ij12kl34mn56op78qr90st"
    return app_id, app_key
```

**Commands Using This**:
- `/recipe <food>` - Search for recipes

---

### TestMail API

#### `tempmailTOKEN()`
- **Type**: Tuple of two strings (api_key, namespace)
- **Format**:
  - API Key: 32-character alphanumeric
  - Namespace: Custom string (your chosen namespace)
- **Purpose**: Temporary email generation and inbox access
- **Example**: `("abcd1234efgh5678ijkl9012mnop3456", "mybot")`
- **Required**: ❌ No (`/tempmail` commands won't work)
- **Default**: None
- **How to Obtain**:
  1. Visit [TestMail.app](https://testmail.app/)
  2. Sign up for account
  3. Create namespace
  4. Get API key from settings
- **Rate Limit**: Varies by plan
- **Cost**: Free tier available

**Example in TOKEN.py**:
```python
def tempmailTOKEN():
    api_key = "abcd1234efgh5678ijkl9012mnop3456"
    namespace = "mybot"
    return api_key, namespace
```

**Commands Using This**:
- `/tempmail create <tag>` - Create temporary email
- `/tempmail inbox <tag>` - Check inbox

---

### Unsplash API

#### `unsplashapiTOKEN()`
- **Type**: String
- **Format**: 43-character access key
- **Purpose**: High-quality image search (alternative to Google)
- **Example**: `abcdefghijklmnopqrstuvwxyz1234567890ABCDE`
- **Required**: ❌ No (image search may use Google API or be disabled)
- **Default**: None
- **How to Obtain**:
  1. Visit [Unsplash Developers](https://unsplash.com/developers)
  2. Register as developer
  3. Create new application
  4. Copy Access Key
- **Rate Limit**: 50 requests/hour (demo), 5,000/hour (production)
- **Cost**: Free

**Example in TOKEN.py**:
```python
def unsplashapiTOKEN():
    return "abcdefghijklmnopqrstuvwxyz1234567890ABCDE"
```

**Commands Using This**:
- `/image search <query>` - Search high-quality images

---

### Exchange Rate API

#### `exhangerateapiTOKEN()`
- **Type**: String
- **Format**: 24-character alphanumeric key
- **Purpose**: Real-time currency exchange rates
- **Example**: `abc123def456ghi789jkl012`
- **Required**: ❌ No (`/currency` command may use fallback or be disabled)
- **Default**: None
- **How to Obtain**:
  1. Visit [ExchangeRate-API](https://www.exchangerate-api.com/)
  2. Sign up for free account
  3. Get API key from dashboard
- **Rate Limit**: 1,500 requests/month (free tier)
- **Cost**: Free tier, paid plans available

**Example in TOKEN.py**:
```python
def exhangerateapiTOKEN():
    return "abc123def456ghi789jkl012"
```

**Commands Using This**:
- `/currency <amount> <from> <to>` - Convert currencies

---

### RapidAPI

#### `rapidapiTOKEN()`
- **Type**: String
- **Format**: 50-character alphanumeric key
- **Purpose**: Access to multiple APIs through RapidAPI hub
- **Example**: `abcdefghij1234567890klmnopqrst1234567890uvwxyzABCD`
- **Required**: ❌ No (used for various optional features)
- **Default**: None
- **How to Obtain**:
  1. Visit [RapidAPI](https://rapidapi.com/)
  2. Sign up for account
  3. Subscribe to desired APIs
  4. Get API key from dashboard
- **Rate Limit**: Varies by subscribed APIs
- **Cost**: Free tier on most APIs

**Example in TOKEN.py**:
```python
def rapidapiTOKEN():
    return "abcdefghij1234567890klmnopqrst1234567890uvwxyzABCD"
```

**Commands Using This**:
- Various API-dependent features

---

## Configuration Templates

### Minimal Configuration (Bot Only)

```python
# TOKEN.py - Minimal Setup

def TOKEN():
    """Discord Bot Token - REQUIRED"""
    return "YOUR_DISCORD_BOT_TOKEN_HERE"

def nasaTOKEN():
    """NASA API - Optional but recommended"""
    return "YOUR_NASA_API_KEY"

# All other functions return None or empty strings
def ninjaapiTOKEN():
    return None

def googleapiTOKEN():
    return None

def tinyurlTOKEN():
    return None

def edamamTOKEN():
    return None, None

def tempmailTOKEN():
    return None, None

def unsplashapiTOKEN():
    return None

def exhangerateapiTOKEN():
    return None

def rapidapiTOKEN():
    return None
```

---

### Full Configuration (All Features)

```python
# TOKEN.py - Full Configuration

def TOKEN():
    """Discord Bot Token"""
    return "YOUR_DISCORD_BOT_TOKEN_HERE"

def nasaTOKEN():
    """NASA API Key"""
    return "YOUR_NASA_API_KEY_HERE"

def ninjaapiTOKEN():
    """NinjaAPI Key"""
    return "abcdefghijklmnopqrstuvwxyz123456"

def googleapiTOKEN():
    """Google Custom Search API Key"""
    return "AIzaSyD1234567890abcdefghijklmnopqrstuv"

def tinyurlTOKEN():
    """TinyURL API Token"""
    return "12345678-90ab-cdef-1234-567890abcdef"

def edamamTOKEN():
    """Edamam Recipe API"""
    return "12ab34cd", "56ef78gh90ij12kl34mn56op78qr90st"

def tempmailTOKEN():
    """TestMail API"""
    return "abcd1234efgh5678ijkl9012mnop3456", "mybot"

def unsplashapiTOKEN():
    """Unsplash API Key"""
    return "abcdefghijklmnopqrstuvwxyz1234567890ABCDE"

def exhangerateapiTOKEN():
    """Exchange Rate API Key"""
    return "abc123def456ghi789jkl012"

def rapidapiTOKEN():
    """RapidAPI Key"""
    return "abcdefghij1234567890klmnopqrst1234567890uvwxyzABCD"
```

---

## Security Best Practices

### 1. Never Commit Tokens to Version Control

Add to `.gitignore`:
```gitignore
TOKEN.py
.env
*.secret
config/secrets.json
```

### 2. Use Environment Variables (Alternative Approach)

Instead of `TOKEN.py`, use `.env` file:

```bash
# .env
DISCORD_TOKEN=your_token_here
NASA_API_KEY=your_nasa_key
NINJA_API_KEY=your_ninja_key
```

Load in Python:
```python
import os
from dotenv import load_dotenv

load_dotenv()

def TOKEN():
    return os.getenv('DISCORD_TOKEN')

def nasaTOKEN():
    return os.getenv('NASA_API_KEY')
```

### 3. Rotate Tokens Regularly

- Change tokens every 3-6 months
- Immediately rotate if exposed
- Use different tokens for dev/production

### 4. Restrict API Key Permissions

- Limit keys to only required APIs
- Set IP restrictions where possible
- Use separate keys for different environments

### 5. Monitor Usage

- Check API dashboards for unusual activity
- Set up alerts for rate limit warnings
- Review access logs regularly

---

## Troubleshooting

### "Invalid Token" Error

**Issue**: Bot won't start, shows "Invalid Token"

**Solutions**:
1. Verify token copied correctly (no extra spaces)
2. Ensure token hasn't been regenerated in Developer Portal
3. Check `TOKEN()` function returns string, not None
4. Verify `return` statement is present

### API Commands Not Working

**Issue**: `/nasa`, `/fact`, etc. return errors

**Solutions**:
1. Verify API key is correctly set in `TOKEN.py`
2. Check API key hasn't expired
3. Verify rate limits not exceeded
4. Test API directly (e.g., in browser or Postman)

### "Function Not Found" Error

**Issue**: `NameError: name 'nasaTOKEN' is not defined`

**Solutions**:
1. Ensure all functions are defined in `TOKEN.py`
2. Check function names match exactly (case-sensitive)
3. Verify `TOKEN.py` is in root directory
4. Restart Python/bot after modifying `TOKEN.py`

---

## Feature Availability Matrix

| API Token | Required For | Fallback Available? |
|-----------|--------------|---------------------|
| Discord Token | ✅ All bot functions | ❌ No |
| NASA API | `/nasa` command | ❌ No |
| NinjaAPI | `/fact`, `/quote`, `/define`, `/trivia` | ❌ No |
| Google API | `/image search` | ✅ Unsplash |
| TinyURL API | `/tinyurl` commands | ❌ No |
| Edamam API | `/recipe` command | ❌ No |
| TestMail API | `/tempmail` commands | ❌ No |
| Unsplash API | `/image search` | ✅ Google API |
| Exchange Rate | `/currency` command | ⚠️ Limited (offline data) |
| RapidAPI | Various features | Varies |

---

## Summary Checklist

Before running the bot, ensure:

- ✅ `TOKEN.py` exists in root directory
- ✅ `TOKEN()` function returns valid Discord bot token
- ✅ File is added to `.gitignore`
- ✅ Optional API keys configured for desired features
- ✅ All functions return correct data types (strings or tuples)
- ✅ No syntax errors in `TOKEN.py`

**Ready to configure?** Use `TOKEN.py.example` as a template or copy one of the configurations above.
