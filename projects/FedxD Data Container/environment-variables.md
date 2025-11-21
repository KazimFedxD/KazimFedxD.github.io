# Environment Variables

FxDC does not use environment variables for configuration. All configuration is done programmatically through the `Config` class or via configuration files.

## Configuration Methods

Instead of environment variables, FxDC uses:

### 1. Programmatic Configuration

```python
from fxdc import Config

# Set recursion limit
Config.set_recursion_limit(10000)

# Register classes
@Config.add_class
class MyClass:
    pass

# Export/import configuration
Config.export_config("config.fxdc")
Config.import_config("config.fxdc")
```

### 2. Configuration Files

FxDC configuration is stored in `.fxdc` files:

```fxdc
!CONFIG FILE!

Config_User|dict:
    typechecking|dict:
        username|str="str"
        age|str="int"
    default|dict:
        username|str="guest"
```

## Python Environment Variables (Optional)

While FxDC doesn't require environment variables, you may use Python's standard environment variables for your application:

### PYTHONPATH (Optional)
- **Type**: String (colon-separated paths)
- **Purpose**: Add directories to Python's module search path
- **Example**: `export PYTHONPATH=/path/to/fxdc/modules:$PYTHONPATH`
- **Use Case**: When importing custom modules that use FxDC

### PYTHONIOENCODING (Optional)
- **Type**: String (encoding name)
- **Default**: `utf-8`
- **Purpose**: Set encoding for stdin/stdout/stderr
- **Example**: `export PYTHONIOENCODING=utf-8`
- **Use Case**: Ensure proper handling of non-ASCII characters in FxDC files

### PYTHONHASHSEED (Optional)
- **Type**: Integer
- **Purpose**: Make dictionary iteration order deterministic
- **Example**: `export PYTHONHASHSEED=0`
- **Use Case**: Testing or debugging FxDC dictionary serialization order

## Application-Specific Environment Variables

If you're building an application using FxDC, you might define your own environment variables:

### Example: Configuration File Path

```python
import os
from fxdc import Config, load

# Load config from environment-specified path
CONFIG_PATH = os.getenv("MYAPP_CONFIG_PATH", "config.fxdc")

try:
    app_config = load(CONFIG_PATH)
except FileNotFoundError:
    print(f"Config file not found: {CONFIG_PATH}")
```

**Environment Variable:**
```bash
export MYAPP_CONFIG_PATH="/etc/myapp/config.fxdc"
python app.py
```

### Example: Debug Mode

```python
import os

DEBUG = os.getenv("MYAPP_DEBUG", "false").lower() == "true"

if DEBUG:
    from fxdc.misc import debug
    # Enable verbose logging
```

**Environment Variable:**
```bash
export MYAPP_DEBUG=true
python app.py
```

### Example: Recursion Limit

```python
import os
from fxdc import Config

RECURSION_LIMIT = int(os.getenv("FXDC_RECURSION_LIMIT", "1000"))
Config.set_recursion_limit(RECURSION_LIMIT)
```

**Environment Variable:**
```bash
export FXDC_RECURSION_LIMIT=10000
python app.py
```

## Runtime Configuration

All FxDC configuration is done at runtime through code, not environment variables:

| Setting | Method | Default | Example |
|---------|--------|---------|---------|
| Recursion Limit | `Config.set_recursion_limit()` | 1000 | `Config.set_recursion_limit(5000)` |
| Class Registration | `Config.add_class()` | None | `@Config.add_class` |
| Type Checking | `typechecking` parameter | False | `Config.add_class(MyClass, typechecking=True)` |
| Metadata | `meta_data` parameter | {} | `Config.add_class(MyClass, meta_data={...})` |

## Security Considerations

### Do NOT Store Sensitive Data in FxDC Files

FxDC files are plain text and should not contain:
- ❌ API keys
- ❌ Passwords
- ❌ Database credentials
- ❌ Secret tokens
- ❌ Private keys

### Use Environment Variables for Secrets

For sensitive configuration, use environment variables and reference them in code:

```python
import os
from fxdc import load

# Load non-sensitive config from FxDC file
app_config = load("config.fxdc")

# Load sensitive config from environment
app_config.original.api_key = os.getenv("API_KEY")
app_config.original.db_password = os.getenv("DB_PASSWORD")

# Validate
if not app_config.original.api_key:
    raise ValueError("API_KEY environment variable not set")
```

**Environment Variables (keep secret):**
```bash
export API_KEY="sk_live_abc123xyz789"
export DB_PASSWORD="super_secret_password"
python app.py
```

### Example: Secure Configuration Pattern

**config.fxdc** (non-sensitive, version-controlled):
```fxdc
app|AppConfig:
    name|str = "MyApp"
    version|str = "1.0.0"
    debug|bool = false
    
    database:
        host = "localhost"
        port = 5432
        name = "myapp_db"
```

**app.py** (loads secrets from environment):
```python
import os
from fxdc import Config, load

@Config.add_class
class AppConfig:
    def __init__(self, name, version, debug, database):
        self.name = name
        self.version = version
        self.debug = debug
        self.database = database

# Load base config
config = load("config.fxdc")

# Add secrets from environment
config.original.database["username"] = os.getenv("DB_USERNAME")
config.original.database["password"] = os.getenv("DB_PASSWORD")
config.original.api_key = os.getenv("API_KEY")

# Validate all required secrets are present
required_env_vars = ["DB_USERNAME", "DB_PASSWORD", "API_KEY"]
missing = [var for var in required_env_vars if not os.getenv(var)]
if missing:
    raise EnvironmentError(f"Missing required environment variables: {missing}")
```

**.env file** (not committed to version control):
```bash
DB_USERNAME=admin
DB_PASSWORD=secret123
API_KEY=sk_live_abc123
```

**Load .env file:**
```bash
# Install python-dotenv
pip install python-dotenv
```

```python
from dotenv import load_dotenv
load_dotenv()  # Loads .env file into environment

# Now os.getenv() will find variables from .env
```

## Docker Environment Variables

When using FxDC in Docker containers:

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  app:
    build: .
    environment:
      - MYAPP_CONFIG_PATH=/app/config.fxdc
      - FXDC_RECURSION_LIMIT=5000
      - API_KEY=${API_KEY}  # From host environment
    volumes:
      - ./config.fxdc:/app/config.fxdc
```

**Dockerfile:**
```dockerfile
FROM python:3.10-slim

ENV MYAPP_CONFIG_PATH=/app/config.fxdc
ENV FXDC_RECURSION_LIMIT=1000

RUN pip install fxdc

COPY config.fxdc /app/config.fxdc
COPY app.py /app/app.py

CMD ["python", "/app/app.py"]
```

## Summary

| Variable Category | Storage Method | Example |
|------------------|----------------|---------|
| **Non-Sensitive Config** | FxDC files (`.fxdc`) | App name, version, defaults |
| **Sensitive Secrets** | Environment variables | API keys, passwords |
| **Runtime Settings** | Programmatic (`Config` class) | Recursion limit, class registration |
| **Development Overrides** | `.env` files (not committed) | Local database credentials |

**Best Practice:** Use FxDC for structured, non-sensitive configuration and environment variables for secrets.
