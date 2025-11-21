# Known Issues & Limitations

## Current Limitations

### 1. No Streaming Parser
**Impact**: Entire file must be loaded into memory before parsing

**Description:**
FxDC uses a token-based parser that requires the complete input to be tokenized before parsing begins. This means:
- Large files (> 100 MB) may cause memory issues
- Cannot parse infinite streams
- No SAX-style event-driven parsing

**Workaround:**
- Split large files into smaller chunks
- Use pagination or chunking for very large datasets
- Consider alternative formats (Pickle, MessagePack) for > 100 MB data

**Status**: No immediate plans to implement streaming parser (would require major architecture rewrite)

---

### 2. Indentation Sensitivity
**Impact**: Mixed tabs/spaces cause parsing errors

**Description:**
Like Python itself, FxDC is whitespace-sensitive. Mixing tabs and spaces, or inconsistent indentation, will cause `InvalidData` exceptions.

**Example:**
```fxdc
# This will fail:
user:
	name = "Alice"    # Tab
    age = 30          # Spaces (4)
```

**Workaround:**
- Use consistent indentation (prefer 4 spaces)
- Configure your editor to use spaces instead of tabs
- Use a linter to detect mixed whitespace

**Status**: This is by design—FxDC follows Python's philosophy

---

### 3. No Comments Support (Yet)
**Impact**: Cannot add inline documentation in `.fxdc` files

**Description:**
While the README mentions comments, the current lexer does not skip `#` comment lines. Attempting to use comments will cause parsing errors.

**Example:**
```fxdc
# This is a comment <- Will cause error
name|str = "Alice"
```

**Workaround:**
- Use field descriptions instead:
```python
@Config.add_class
class User:
    name: FxDCField[str] = FxDCField(desc="User's full name")
```

**Status**: Planned for future release (v5.1.0+)

---

### 4. Limited Error Recovery
**Impact**: First syntax error stops parsing

**Description:**
The parser uses a fail-fast approach—it stops at the first syntax error and doesn't attempt to continue parsing or recover from errors. This means:
- Cannot get a list of all errors in a file
- Single typo prevents loading entire file
- No partial parsing

**Example:**
```fxdc
name|str = "Alice"
age|invalid = 30    # Stops here, doesn't check remaining lines
email|str = "alice@example.com"
```

**Workaround:**
- Fix errors one at a time
- Use schema validation before saving files
- Implement try/except blocks with detailed error messages

**Status**: May improve in future versions

---

### 5. No Schema Validation File
**Impact**: No declarative way to define expected structure

**Description:**
FxDC doesn't support separate schema files (like JSON Schema or XML DTD) to validate the structure of `.fxdc` files before parsing.

**Workaround:**
- Use FxDCField with type checking for validation
- Write custom validation functions:
```python
def validate_user_config(config):
    required_fields = ["name", "age", "email"]
    for field in required_fields:
        if not hasattr(config.original, field):
            raise ValueError(f"Missing required field: {field}")
```

**Status**: Schema files may be added in future (v6.0+)

---

### 6. Limited Multi-Line String Support
**Impact**: Newlines in string values require escaping

**Description:**
Multi-line string values must use escape sequences (`\n`) rather than literal newlines.

**Example:**
```fxdc
# Doesn't work:
description|str = "This is a
multi-line
description"

# Must use:
description|str = "This is a\nmulti-line\ndescription"
```

**Workaround:**
- Use `\n` escape sequences
- Or use triple-quoted strings in Python and serialize them

**Status**: True multi-line strings planned for v5.2+

---

## Known Bugs

### Issue: Type Checking with None Values
**Affected Versions**: v5.0.0

**Description:**
Type checking doesn't properly distinguish between `None` and missing values when `null=True`.

**Example:**
```python
@Config.add_class
class User:
    age: FxDCField[int] = FxDCField(typechecking=True, null=True)

user = User()
user.age = None  # Should be allowed
fxdc_str = dumps(user)
loads(fxdc_str)  # May raise TypeCheckFailure instead of allowing None
```

**Workaround:**
- Set `typechecking=False` for nullable fields
- Or avoid using `None` values

**Status**: Will fix in v5.0.1

---

### Issue: Verbose Name Conflicts
**Affected Versions**: v5.0.0

**Description:**
If two fields use the same `verbose_name`, the parser can't distinguish them, causing data loss.

**Example:**
```python
@Config.add_class
class User:
    first_name: FxDCField[str] = FxDCField(verbose_name="name")
    last_name: FxDCField[str] = FxDCField(verbose_name="name")  # Conflict!
```

**Workaround:**
- Ensure all verbose names are unique within a class
- FxDC should raise an error during registration (will be added)

**Status**: Will add validation in v5.0.1

---

### Issue: Circular References Cause RecursionError
**Affected Versions**: All versions

**Description:**
Objects with circular references (e.g., `a.parent = b; b.child = a`) cause infinite recursion during serialization.

**Example:**
```python
class Node:
    def __init__(self, value, parent=None):
        self.value = value
        self.parent = parent

a = Node("A")
b = Node("B", parent=a)
a.parent = b  # Circular reference

dumps(a)  # RecursionError!
```

**Workaround:**
- Avoid circular references in serialized objects
- Implement custom `__todata__` that excludes circular references:
```python
def __todata__(self):
    return {"value": self.value}  # Don't include parent
```

**Status**: Won't fix—by design (same as JSON module)

---

## Platform-Specific Issues

### Windows: Backslash in File Paths
**Affected Platforms**: Windows

**Description:**
Windows file paths with backslashes need to be escaped or use raw strings.

**Example:**
```python
# Fails:
load("C:\Users\John\config.fxdc")  # \U and \c are escape sequences

# Works:
load(r"C:\Users\John\config.fxdc")  # Raw string
load("C:/Users/John/config.fxdc")   # Forward slashes
load("C:\\Users\\John\\config.fxdc")  # Escaped backslashes
```

**Workaround:**
- Use raw strings: `r"C:\path"`
- Or use forward slashes: `"C:/path"`

**Status**: Not a bug—standard Python behavior

---

### macOS: Case-Insensitive Filesystems
**Affected Platforms**: macOS (default HFS+/APFS)

**Description:**
File systems on macOS are case-insensitive by default, which can cause issues if you have `Config.fxdc` and `config.fxdc`.

**Example:**
```python
Config.export_config("Config.fxdc")
Config.export_config("config.fxdc")  # Overwrites the first file!
```

**Workaround:**
- Use consistent casing for filenames
- Or format your macOS drive as case-sensitive (not recommended)

**Status**: Not a FxDC bug—OS behavior

---

## Performance Bottlenecks

### 1. Large Lists (10,000+ Items)
**Impact**: Parsing slows down significantly

**Description:**
Lists with tens of thousands of items take several seconds to parse due to recursive parsing.

**Benchmark:**
- 1,000 items: ~25 ms
- 10,000 items: ~250 ms
- 100,000 items: ~3-5 seconds

**Workaround:**
- Use chunking for very large lists
- Consider binary formats (Pickle, MessagePack) for large datasets
- Use databases for > 10,000 records

**Status**: May optimize in future versions

---

### 2. Deep Nesting (> 100 Levels)
**Impact**: Stack overflow risk and slow parsing

**Description:**
Deeply nested structures (> 100 levels) may approach Python's recursion limit.

**Workaround:**
```python
Config.set_recursion_limit(10000)
import sys
sys.setrecursionlimit(10000)
```

**Status**: Inherent limitation of recursive descent parsing

---

### 3. Type Checking Overhead
**Impact**: ~20% slower parsing with type checking enabled

**Description:**
Runtime type checking adds `isinstance()` calls for every field.

**Benchmark:**
- Without type checking: 2.0 ms
- With type checking: 2.4 ms (+20%)

**Workaround:**
- Disable type checking for trusted data:
```python
@Config.add_class
class FastClass:
    field: FxDCField[str] = FxDCField(typechecking=False)
```

**Status**: Expected trade-off for runtime validation

---

## Compatibility Issues

### Not Compatible with Python < 3.10
**Affected**: Python 3.9, 3.8, 3.7, etc.

**Reason**: Uses modern type hint syntax (`X | Y` instead of `Union[X, Y]`)

**Workaround:**
- Upgrade to Python 3.10+
- Or use an older version of FxDC (v4.x may support 3.8+)

**Status**: Won't backport—3.10+ is a hard requirement

---

### Jython/IronPython Not Supported
**Affected**: Jython, IronPython, other non-CPython implementations

**Reason**: Relies on CPython-specific features (descriptor protocol, type introspection)

**Workaround:**
- Use CPython 3.10+
- PyPy may work (untested)

**Status**: No plans to support non-CPython

---

## Security Limitations

### No Built-In Encryption
**Impact**: FxDC files are plain text

**Description:**
FxDC files are human-readable by design, with no built-in encryption or obfuscation.

**Workaround:**
- Use disk encryption for sensitive files
- Or encrypt files before storage:
```python
from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher = Fernet(key)

# Encrypt
fxdc_data = dumps(obj)
encrypted = cipher.encrypt(fxdc_data.encode())

# Decrypt
decrypted = cipher.decrypt(encrypted).decode()
obj = loads(decrypted)
```

**Status**: Encryption is out of scope—use external tools

---

### No Input Sanitization for File Paths
**Impact**: User-provided paths could access unintended files

**Description:**
FxDC doesn't validate file paths—if you allow user input, directory traversal attacks are possible.

**Example:**
```python
# Dangerous!
user_input = request.GET['config']
config = load(user_input)  # User could provide "../../etc/passwd"
```

**Workaround:**
- Validate and sanitize user input:
```python
import os

def safe_load(user_path):
    # Only allow files in specific directory
    base_dir = "/app/configs"
    safe_path = os.path.join(base_dir, os.path.basename(user_path))
    if not safe_path.startswith(base_dir):
        raise ValueError("Invalid path")
    return load(safe_path)
```

**Status**: By design—input validation is application's responsibility

---

## Future Enhancements

Limitations that may be addressed in future versions:

- ✅ **Comments support** (planned for v5.1)
- ✅ **True multi-line strings** (planned for v5.2)
- ✅ **Schema validation** (planned for v6.0)
- ⚠️ **Streaming parser** (no timeline—major rewrite)
- ⚠️ **Better error recovery** (under consideration)

---

## Reporting Issues

Found a bug not listed here?

1. Check existing issues: https://github.com/KazimFedxD/FedxD-Data-Container/issues
2. Open a new issue with:
   - FxDC version (`python -c "import fxdc; print(fxdc.__version__)"`)
   - Python version (`python --version`)
   - Operating system
   - Minimal reproducible example
   - Expected vs. actual behavior

**GitHub Issues**: https://github.com/KazimFedxD/FedxD-Data-Container/issues
