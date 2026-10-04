# Setup & Configuration

## Prerequisites

- **Python 3.10 or higher**
- **pip** (Python package manager)
- **Optional**: NumPy 2.0.2+ (for NumPy array support)
- **Optional**: Pandas 2.3.1+ (for DataFrame support)
- **Optional**: pytest 8.4.1+ (for running tests)

## Installation

### 1. Install from PyPI (Recommended)

```bash
pip install fxdc
```

This installs the latest stable version from the Python Package Index.

### 2. Install with Optional Dependencies

For full functionality including NumPy and Pandas support:

```bash
pip install fxdc numpy pandas
```

### 3. Install from Source (Development)

```bash
# Clone the repository
git clone https://github.com/KazimFedxD/FedxD-Data-Container.git
cd FedxD-Data-Container

# Create virtual environment (optional but recommended)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install in editable mode with dev dependencies
pip install -e .
pip install pytest numpy pandas
```

### 4. Verify Installation

```bash
python -c "import fxdc; print(fxdc.__version__)"
```

## Basic Configuration

### Registering Custom Classes

FxDC requires classes to be registered before serialization/deserialization. There are two methods:

#### Method 1: Using Decorator (Recommended)

```python
from fxdc import Config

@Config.add_class
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age
```

#### Method 2: Manual Registration

```python
from fxdc import Config

class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

Config.add_class(Product)
```

#### Method 3: With Custom Name (For Name Conflicts)

```python
from queue import Queue
from multiprocessing import Queue as MPQueue

Config.add_class("Queue", class_=Queue)
Config.add_class("MultiprocessingQueue", class_=MPQueue)
```

### Enabling Type Checking

#### Global Type Checking for a Class

```python
@Config.add_class(typechecking=True)
class User:
    name: str
    age: int
```

#### Per-Field Type Checking with FxDCField

```python
from fxdc import FxDCField

@Config.add_class
class User:
    name: FxDCField[str] = FxDCField(typechecking=True)
    age: FxDCField[int] = FxDCField(typechecking=True)
```

### Setting Recursion Limit

For deeply nested structures, increase the recursion limit:

```python
from fxdc import Config

Config.set_recursion_limit(10000)  # Default is 1000
```

## Usage Examples

### Basic Read/Write

#### Writing Data

```python
from fxdc import dump, dumps

# Write to string
data = {"name": "Alice", "age": 30}
fxdc_str = dumps(data)
print(fxdc_str)
# Output:
# name|str = "Alice"
# age|int = 30

# Write to file
with open("data.fxdc", "w") as f:
    dump(data, f)
```

#### Reading Data

```python
from fxdc import load, loads

# Read from string
fxdc_str = 'name|str = "Alice"\nage|int = 30\nis_active|bool = "True"'
obj = loads(fxdc_str)
print(obj.original)  # {"name": "Alice", "age": 30, "is_active": True}

# Read from file
obj = load("data.fxdc")
print(obj.original)
```

### Boolean Values in FxDC

Booleans are represented as strings or integers:

```python
from fxdc import dumps, loads

# Boolean serialization
data = {"active": True, "disabled": False, "optional": None}
fxdc_str = dumps(data)
print(fxdc_str)
# Output:
# active|bool = "True"
# disabled|bool = "False"
# optional|bool = "Null"

# Boolean deserialization (string format)
fxdc_str = '''
is_enabled|bool = "True"
is_verified|bool = "False"
is_premium|bool = "Null"
'''
obj = loads(fxdc_str)
print(obj.original)  # {"is_enabled": True, "is_verified": False, "is_premium": None}

# Alternative: Integer format
fxdc_str_alt = '''
active|bool = 1
disabled|bool = 0
'''
obj_alt = loads(fxdc_str_alt)
print(obj_alt.original)  # {"active": True, "disabled": False}
```

### Working with Custom Classes

```python
from fxdc import Config, dumps, loads

@Config.add_class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# Serialize
person = Person("Bob", 25)
fxdc_str = dumps(person)
print(fxdc_str)
# Output:
# main|Person:
#     name|str = "Bob"
#     age|int = 25

# Deserialize
loaded = loads(fxdc_str)
print(loaded.original.name)  # "Bob"
print(loaded.original.age)   # 25
print(type(loaded.original))  # <class '__main__.Person'>
```

### Using FxDCField with Validation

```python
from fxdc import Config, FxDCField, dumps, loads

@Config.add_class
class User:
    username: FxDCField[str] = FxDCField(
        desc="Username for login",
        verbose_name="user_name",
        typechecking=True,
        null=False,
        blank=False,
        default="guest"
    )
    age: FxDCField[int] = FxDCField(
        desc="User age",
        typechecking=True,
        default=18
    )

    def __init__(self, username="guest", age=18):
        self.username = username
        self.age = age

# Create user
user = User("john_doe", 30)

# Serialize
serialized = dumps(user)
print(serialized)
# Output:
# main|User:
#     user_name|str(Username for login) = "john_doe"
#     age|int(User age) = 30

# Deserialize
loaded = loads(serialized)
print(loaded.original.username)  # "john_doe"
```

### Configuration Export/Import

```python
from fxdc import Config, FxDCField

@Config.add_class
class AppConfig:
    host: FxDCField[str] = FxDCField(default="localhost")
    port: FxDCField[int] = FxDCField(default=8080)

# Export configuration metadata
Config.export_config("app_config.fxdc")

# Later, in another script/project:
# (Make sure AppConfig class is defined first)
Config.import_config("app_config.fxdc")
# All metadata (defaults, type checking, etc.) is restored
```

### Converting to JSON

```python
from fxdc import to_json

fxdc_str = """
name|str = "Alice"
age|int = 30
active|bool = true
"""

json_str = to_json(fxdc_str)
print(json_str)
# Output: {"name": "Alice", "age": 30, "active": true}
```

## Advanced Configuration

### Custom Serialization/Deserialization Hooks

`__todata__` and `__fromdata__` methods provide custom serialization logic.

**When `__fromdata__` is Needed:**

`__fromdata__` is only required in two scenarios:

1. **When FxDC arguments don't match `__init__` signature:**

```python
from fxdc import Config, dumps, loads

@Config.add_class
class User:
    def __init__(self, username):
        self.username = username
        self.login_count = 0  # Not a constructor parameter
        self.last_login = None  # Not a constructor parameter
    
    def __todata__(self):
        # Serialize all attributes
        return {
            "username": self.username,
            "login_count": self.login_count,
            "last_login": self.last_login
        }
    
    @staticmethod
    def __fromdata__(**kwargs):
        # Required: __init__ only takes 'username', but FxDC has more fields
        user = User(kwargs["username"])
        user.login_count = kwargs.get("login_count", 0)
        user.last_login = kwargs.get("last_login")
        return user

user = User("alice")
user.login_count = 42
serialized = dumps(user)
loaded = loads(serialized)
print(loaded.original.login_count)  # 42 (preserved!)
```

2. **When you need custom pre-processing logic before object creation:**

```python
from datetime import datetime

@Config.add_class
class Event:
    def __init__(self, name, timestamp):
        self.name = name
        self.timestamp = timestamp
    
    def __todata__(self):
        return {
            "name": self.name,
            "timestamp": self.timestamp.isoformat()
        }
    
    @staticmethod
    def __fromdata__(**kwargs):
        # Custom pre-processing: convert ISO string to datetime
        timestamp_str = kwargs["timestamp"]
        timestamp = datetime.fromisoformat(timestamp_str)
        return Event(kwargs["name"], timestamp)
```

**When `__todata__` is Useful (without `__fromdata__`):**

Use `__todata__` to exclude attributes from serialization. If `__init__` signature matches the serialized data, you don't need `__fromdata__`:

```python
@Config.add_class
class CachedData:
    def __init__(self, data, cache_size=100):
        self.data = data
        self.cache_size = cache_size
        self._cache = {}  # Internal cache, don't serialize
        self._temp_files = []  # Temporary data, don't serialize
    
    def __todata__(self):
        # Only serialize data and cache_size, exclude internal state
        return {"data": self.data, "cache_size": self.cache_size}
    
    # No __fromdata__ needed! 
    # __init__(data, cache_size) matches FxDC {"data": ..., "cache_size": ...}
```

**Note:** `__fromdata__` can be a `@staticmethod` or a `@classmethod`. It must accept `**kwargs` containing all serialized field names and values.

### External Serialization Functions

For classes you can't modify (third-party libraries):

```python
from fxdc import Config
from some_library import ExternalClass

def to_data(obj):
    return {"value": obj.internal_value}

def from_data(**kwargs):
    return ExternalClass(kwargs["value"])

Config.add_class(
    ExternalClass,
    to_data=to_data,
    from_data=from_data
)
```

### Manual Metadata Configuration

For imported or external classes without FxDCField:

```python
from fxdc import Config

class User:
    def __init__(self, username, age):
        self.username = username
        self.age = age

Config.add_class(User, meta_data={
    "typechecking": {
        "username": str,
        "age": int
    },
    "description": {
        "username": "The username of the user",
        "age": "The age of the user"
    },
    "verbose_name": {
        "username": "name"
    },
    "default": {
        "age": 18
    },
    "notnull": ["username"],
    "notblank": ["username"]
})
```

## Deployment Guide

### Building the Package

```bash
# Install build tools
pip install build wheel

# Build distribution
python -m build

# This creates:
# - dist/fxdc-5.0.0.tar.gz (source distribution)
# - dist/fxdc-5.0.0-py3-none-any.whl (wheel)
```

### Publishing to PyPI

```bash
# Install twine
pip install twine

# Upload to PyPI
twine upload dist/*

# Or test on TestPyPI first
twine upload --repository testpypi dist/*
```

### Running Tests

```bash
# Install test dependencies
pip install pytest numpy pandas

# Run all tests
pytest

# Run specific test file
pytest tests/test_fxdc_core.py

# Run with verbose output
pytest -v

# Run with coverage
pip install pytest-cov
pytest --cov=fxdc --cov-report=html
```

## Challenges & Solutions

### Challenge 1: Type Hint Parsing

**Problem**: Python's type system is complex—how do we parse `FxDCField[str]` and extract the type parameter at runtime?

**Solution**: Used `typing.get_origin()` and `typing.get_args()` to introspect generic types:
```python
from typing import get_origin, get_args

field_type = FxDCField[str]
origin = get_origin(field_type)  # Field
args = get_args(field_type)      # (str,)
```

### Challenge 2: Indentation-Based Parsing

**Problem**: Tracking nested structures purely through indentation is error-prone—how do we know when a block ends?

**Solution**: Implemented `get_indent_count()` method that counts consecutive indent tokens and compares to expected depth:
```python
def parse_indented(self, expected_indent: int):
    while self.get_indent_count() == expected_indent:
        # Parse items at this level
    # When indent count differs, block has ended
```

### Challenge 3: Circular Dependencies

**Problem**: Parser needs Config for type resolution, but Config needs Parser for config file imports.

**Solution**: Lazy loading—Config imports parser functions only when needed, not at module level:
```python
def import_config(self, filename: str):
    from .read import loads  # Import here, not at top of file
    obj = loads(config_data)
```

### Challenge 4: Descriptor Metadata Access

**Problem**: Descriptors can't access class-level metadata from instance methods.

**Solution**: Used `__set_name__` to capture field name, then stored metadata in Config during class registration:
```python
def __set_name__(self, owner: object, name: str) -> None:
    self.name = name  # Now descriptor knows its field name
```

### Challenge 5: Optional Dependencies

**Problem**: How do we support NumPy/Pandas without requiring them as dependencies?

**Solution**: Conditional imports with try/except blocks:
```python
try:
    from .numpydefaults import load_numpy_defaults
    load_numpy_defaults()
except ImportError:
    pass  # NumPy not installed, skip
```

## Troubleshooting

### Issue: `ClassNotLoaded` Exception

**Cause**: Trying to deserialize a class that hasn't been registered with Config.

**Fix**: Register the class before calling `loads()`:
```python
from fxdc import Config

@Config.add_class
class MyClass:
    pass

# Now you can load files containing MyClass
```

### Issue: `TypeCheckFailure` Exception

**Cause**: Data type doesn't match declared type hint.

**Fix**: Either fix the data or disable type checking:
```python
# Option 1: Fix the data
user.age = 30  # Not "30"

# Option 2: Disable type checking
@Config.add_class
class User:
    age: FxDCField[int] = FxDCField(typechecking=False)
```

### Issue: `RecursionError`

**Cause**: Deeply nested structures exceed Python's recursion limit.

**Fix**: Increase the limit:
```python
from fxdc import Config
Config.set_recursion_limit(10000)
```

### Issue: `InvalidData` - Unexpected Indent

**Cause**: Inconsistent indentation (mixing tabs and spaces).

**Fix**: Use consistent indentation (prefer spaces):
```fxdc
# Bad (mixed tabs and spaces)
user:
	name = "Alice"
   age = 30

# Good (all spaces)
user:
    name = "Alice"
    age = 30
```
