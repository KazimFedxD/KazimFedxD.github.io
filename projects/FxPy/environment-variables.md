# Environment Variables

FxPy does **not require** any environment variables to function. However, you can optionally set up convenience variables for easier usage.

---

## Optional Environment Variables

### FXPY_PATH

- **Type:** String (file path)
- **Purpose:** Store the location of FxPy installation directory
- **Example:** `/home/user/FxPy` or `C:\Users\User\FxPy`
- **Default:** None (not required)

**Usage:**

**Linux/macOS (Bash/Zsh):**
```bash
# Add to ~/.bashrc or ~/.zshrc
export FXPY_PATH="/path/to/FxPy"
```

**Windows (PowerShell):**
```powershell
# Add to PowerShell profile
$env:FXPY_PATH = "C:\path\to\FxPy"
```

**Benefit:** Can reference FxPy from anywhere:
```bash
python $FXPY_PATH/shell.py
python $FXPY_PATH/run.py script.fx
```

---

## Shell Aliases (Recommended)

Instead of environment variables, consider creating shell aliases:

### Linux/macOS

Add to `~/.bashrc` or `~/.zshrc`:

```bash
# FxPy Aliases
alias fxpy='python /path/to/FxPy/shell.py'
alias fxrun='python /path/to/FxPy/run.py'
```

**Usage:**
```bash
fxpy              # Start REPL
fxrun script.fx   # Run script
```

### Windows (PowerShell)

Add to PowerShell profile (`notepad $PROFILE`):

```powershell
# FxPy Aliases
function fxpy { python C:\path\to\FxPy\shell.py $args }
function fxrun { python C:\path\to\FxPy\run.py $args }
```

**Usage:**
```powershell
fxpy              # Start REPL
fxrun script.fx   # Run script
```

---

## Python-Specific Variables

### PYTHONPATH (Not Recommended)

You *could* add FxPy to Python's module search path, but this is unnecessary:

```bash
export PYTHONPATH="/path/to/FxPy:$PYTHONPATH"
```

**Why not recommended:**
- FxPy is meant to be run as a script, not imported as a Python module
- Can cause naming conflicts with other Python projects

---

## FxPy Runtime Variables (None)

FxPy does **not** read any environment variables during execution:
- ❌ No `FXPY_CONFIG`
- ❌ No `FXPY_DEBUG`
- ❌ No `FXPY_HOME`

All configuration is in the source code itself.

---

## Future Considerations

Possible environment variables for future versions:

### FXPY_MODULE_PATH (Proposed)

**Purpose:** Additional directories to search for `.fx` modules

**Example:**
```bash
export FXPY_MODULE_PATH="/usr/local/lib/fxpy:/home/user/fxpy-modules"
```

**Usage in code:**
```javascript
import utils  # Would search FXPY_MODULE_PATH
```

**Status:** 🚧 Not implemented yet

### FXPY_DEBUG (Proposed)

**Purpose:** Enable debug output (verbose parsing, AST printing, etc.)

**Example:**
```bash
export FXPY_DEBUG=1
python run.py script.fx  # Shows debug info
```

**Status:** 🚧 Not implemented yet

---

## Summary

**Required Environment Variables:** None ✅  
**Optional for Convenience:** `FXPY_PATH` or shell aliases  
**Recommended Approach:** Use shell aliases for easy access

FxPy is designed to work out-of-the-box with zero configuration.
