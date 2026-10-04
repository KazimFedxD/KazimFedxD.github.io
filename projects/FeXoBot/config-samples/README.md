# Configuration Samples

These are example configuration files from FeXoBot.
Sensitive information has been replaced with placeholders.

## Files Included

- `Pipfile` - Python dependencies (Pipenv configuration)
- `pyproject.toml` - Modern Python project configuration with dependencies
- `TOKEN.py.example` - API token configuration template

## Usage

### Setting Up Dependencies

**Option 1: Using pyproject.toml (Recommended - Modern Python)**

1. Install with uv (fastest):
   ```bash
   pip install uv
   uv pip install -e .
   ```

2. Or with pip:
   ```bash
   pip install -e .
   ```

**Option 2: Using Pipfile (Pipenv)**

1. Install dependencies:
   ```bash
   pipenv install
   pipenv shell
   ```

**Option 3: Using requirements.txt**

```bash
pip install -r requirements.txt
```

### Setting Up TOKEN.py

1. Copy `TOKEN.py.example` to project root as `TOKEN.py`:
   ```bash
   cp TOKEN.py.example TOKEN.py
   ```

2. Edit `TOKEN.py` and replace all placeholders with your actual API keys:
   - `YOUR_DISCORD_BOT_TOKEN_HERE` → Your Discord bot token
   - `YOUR_NASA_API_KEY` → Your NASA API key
   - `YOUR_NINJA_API_KEY` → Your NinjaAPI key
   - etc.

3. **NEVER commit `TOKEN.py` to version control!**
   
   Ensure `.gitignore` includes:
   ```gitignore
   TOKEN.py
   ```

## Security Reminder

- ⚠️ **Never share your API keys publicly**
- ⚠️ **Never commit tokens to Git**
- ⚠️ **Regenerate tokens if accidentally exposed**
- ✅ Use environment variables for production
- ✅ Rotate keys periodically

## Required vs Optional Keys

### Required (Bot won't work without)
- ✅ Discord Bot Token

### Optional (Features disabled if not provided)
- NASA API Key (for `/nasa` command)
- NinjaAPI Key (for `/fact`, `/quote`, etc.)
- Google API Key (for `/image search`)
- Other API keys as needed

## Getting API Keys

See `environment-variables.md` in the parent directory for detailed instructions on obtaining each API key.

## Support

If you have questions about configuration:
- Read `setup.md` for installation guide
- Check `environment-variables.md` for API key details
- Visit GitHub Issues for help
