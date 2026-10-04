# Features

This document covers all major features of FedxD Data Container (FxDC). Each feature includes a description, explanation of why it matters, how it works, and real implementation code from the project.

---

## Feature 1: Custom Lexer & Parser Implementation

### Description
FxDC includes a complete tokenization and parsing system built from scratch, featuring a custom lexer that breaks down FxDC-formatted text into tokens and a recursive descent parser that constructs Python objects from these tokens.

### Why It Matters
By implementing a custom lexer and parser, FxDC has complete control over syntax rules, error handling, and performance. This allows for precise error messages, flexible syntax extensions, and optimized parsing for Python-specific constructs that generic parsers can't handle efficiently.

### How It Works
1. **Lexer** reads the input character by character, identifying tokens:
   - Identifiers (variable names)
   - Keywords (class names)
   - Operators (`=`, `:`, `|`)
   - Literals (strings, numbers, booleans)
   - Indentation markers

2. **Parser** consumes tokens and builds an abstract syntax tree using recursive descent:
   - Tracks indentation levels for nested structures
   - Resolves type hints and validates syntax
   - Constructs `FxDCObject` instances with proper nesting

3. **Type Resolution** converts parsed values to their declared types using the Config registry

**Boolean Type Handling:**
Booleans in FxDC are represented as strings or integers for clarity:
```fxdc
# String representation (recommended)
is_active|bool = "True"
is_disabled|bool = "False"
is_none|bool = "Null"

# Integer representation (alternative)
is_active|bool = 1
is_disabled|bool = 0
```

These are parsed and converted to Python `True`, `False`, or `None` values.

### Implementation

From `fxdc/parsedata/lexer.py`:
```python
class Lexer:
    def __init__(self, data: str, keywords: list[str]) -> None:
        self.data = data
        self.keywords = keywords
        self.pos = -1
        self.current_char: Optional[str] = None
        self.line = 1
        self.advance()

    def advance(self):
        self.pos += 1
        if self.pos < len(self.data):
            self.current_char = self.data[self.pos]
        else:
            self.current_char = None

    def make_tokens(self) -> list[Token]:
        tokens = []
        while self.current_char is not None:
            # Tokenization logic
            if self.current_char == "\n":
                tokens.append(Token(TT_NEWLINE, None, self.line))
                self.line += 1
                self.advance()
            elif self.current_char in " \t":
                tokens.append(Token(TT_INDENT, None, self.line))
                self.advance()
            elif self.current_char == "=":
                tokens.append(Token(TT_EQUAL, None, self.line))
                self.advance()
            # ... more token types
        return tokens
```

From `fxdc/parsedata/parsedata.py`:
```python
class Parser:
    def __init__(self, tokens: list[Token]) -> None:
        self.tokens = tokens
        self.pos = -1
        self.current_token: Token = None
        self.advance()

    def parse(self, preserve_type: bool = True):
        obj = FxDCObject()
        while self.current_token.type != TT_EOF:
            # Handle newlines and indentation
            while self.current_token.type == TT_NEWLINE:
                self.advance()
            
            # Expect identifier
            if self.current_token.type != TT_IDENTIFIER:
                raise InvalidData(
                    f"Expected identifier, got {self.current_token} at line {self.current_token.line}"
                )
            
            key: str = self.current_token.value
            type_: Optional[str] = None
            self.advance()
            
            # Parse type hint if present (variable|type)
            if self.current_token.type == TT_DEVIDER:
                self.advance()
                if self.current_token.type != TT_KEYWORD:
                    raise InvalidData(
                        f"Expected keyword class, got {self.current_token}"
                    )
                type_ = self.current_token.value
                self.advance()
            
            # ... parse value
        return obj
```

---

## Feature 2: Type-Safe Serialization with FxDCField

### Description
The `FxDCField` descriptor provides compile-time type annotations and runtime validation for class attributes, including type checking, null/blank constraints, default values, and human-readable metadata.

### Why It Matters
Without FxDCField, developers must manually validate data after deserialization, write custom validation logic, and maintain separate documentation. FxDCField centralizes all validation rules in the class definition, making code self-documenting and eliminating entire categories of bugs.

### How It Works
1. **Descriptor Protocol**: FxDCField uses Python's descriptor protocol (`__get__`, `__set__`, `__delete__`) to intercept attribute access
2. **Metadata Storage**: Stores validation rules (typechecking, null, blank, default) as class-level metadata
3. **Runtime Validation**: When loading FxDC data, validates each field against its declared constraints
4. **Verbose Names**: Allows different names in FxDC files vs. Python code for readability

### Implementation

From `fxdc/fields.py`:
```python
class Field(Generic[T]):
    def __init__(
        self,
        desc: Optional[str] = None,
        verbose_name: Optional[str] = None,
        default: Optional[Any] = None,
        typechecking: bool = True,
        null: bool = True,
        blank: bool = True,
    ):
        if verbose_name:
            if verbose_name[0] not in string.ascii_letters + "_":
                raise FieldError("Name Should Start With A Letter")
            if any([x not in ACCEPTABLECHARACTERS for x in verbose_name]):
                raise FieldError(
                    "Name Should Only Contain Letters, Digits and Underscore"
                )
        if desc:
            if len(desc) > 50:
                raise FieldError("Description Should Not Be More Than 50 Characters")

        self.__verbose_name = verbose_name
        self.__default = default
        self.__typechecking = typechecking
        self.__null = null
        self.__blank = blank
        self.__desc = desc

    def __set_name__(self, owner: object, name: str) -> None:
        self.name = name

    def __get__(self, instance: object, owner: object) -> T:
        value: T = instance.__dict__.get(self.name, None)
        return value

    def __set__(self, instance: object, value: Optional[T]) -> None:
        instance.__dict__[self.name] = value
```

From `fxdc/config.py` (validation in `_customclass`):
```python
class _customclass:
    def __call__(self, *args: Any, **kwargs: Any) -> object:
        # Convert Verbose Names to kwargs
        newkwargs = {}
        for key, value in kwargs.items():
            for original_name, verbose_name in self.meta_data.get(
                "verbose_name", {}
            ).items():
                if key == verbose_name:
                    newkwargs[original_name] = value
                    break
            else:
                newkwargs[key] = value

        # Add Defaults
        for key, value in self.meta_data.get("default", {}).items():
            if key not in newkwargs:
                newkwargs[key] = value

        # CHECKS
        for key, value in newkwargs.items():
            # Check Type Checking
            if key in self.meta_data.get("typechecking", {}):
                expected_type = self.meta_data["typechecking"][key]
                if not isinstance(value, expected_type):
                    raise TypeCheckFailure(
                        f"Expected type {expected_type} for {key}, got {type(value)}"
                    )

            # Check Nullability
            if key in self.meta_data.get("notnull", []):
                if value is None:
                    raise NullFailure(f"Field {key} cannot be None")

            # Check Blankness
            if key in self.meta_data.get("notblank", []):
                if value == "":
                    raise BlankFailure(f"Field {key} cannot be blank")
```

Usage example:
```python
from fxdc import FxDCField, Config

@Config.add_class
class User:
    username: FxDCField[str] = FxDCField(
        desc="The username of the user",
        verbose_name="name",
        typechecking=True,
        null=False,
        blank=False
    )
    age: FxDCField[int] = FxDCField(
        desc="The age of the user",
        default=18
    )
```

---

## Feature 3: Automatic Class Mapping & Serialization

### Description
FxDC automatically serializes and deserializes custom Python classes without requiring manual conversion code. Register a class once with `@Config.add_class`, and FxDC handles the rest, including constructor argument mapping and nested object reconstruction.

### Why It Matters
Traditional serialization requires writing custom `to_dict()` and `from_dict()` methods for every class, creating maintenance burden and potential bugs. FxDC eliminates this boilerplate by introspecting class constructors and automatically mapping data fields to constructor parameters.

### How It Works
1. **Class Registration**: `Config.add_class()` stores class metadata in a central registry
2. **Serialization** (`dumps()`): Introspects object attributes and generates FxDC syntax
   - Calls `__todata__()` if defined to get serializable representation
   - Otherwise serializes all instance attributes directly
3. **Deserialization** (`loads()`): Parser identifies class type from syntax, retrieves class from Config
   - Calls `__fromdata__()` if defined to reconstruct object
   - Otherwise calls constructor directly with parsed data as keyword arguments
4. **Custom Hooks**: `__todata__` and `__fromdata__` methods for custom serialization logic
   - `__todata__`: Optional - controls which attributes to serialize (useful for excluding cache/temp data)
   - `__fromdata__`: Only needed when FxDC arguments don't match `__init__` signature OR you need custom pre-processing logic before object creation

### Implementation

From `fxdc/write.py`:
```python
def dumps(data: object) -> str:
    """Dump the FXDC object to the string

    Args:
        data (object): Any Class Object
    Returns:
        str: Returns the string from the object
    """
    if type(data) != dict:
        data: dict[str, Any] = {"main": data}
    parser = ParseObject(data)
    return parser.parse()
```

From `fxdc/read.py`:
```python
def loads(data: str) -> FxDCObject:
    """Load the FXDC object from the string

    Args:
        data (str): string data of FedxD Data Container

    Raises:
        TypeError: if the data is not a string

    Returns:
        object: Returns the object from the string
    """
    if not isinstance(data, str):
        raise TypeError("Invalid data type. Required string")

    lexer = Lexer(data, Config.custom_classes_names)
    tokens = lexer.make_tokens()
    parser = Parser(tokens)
    obj = parser.parse()
    return obj
```

From `fxdc/parsedata/parsedata.py` (class reconstruction):
```python
# When type_ is a custom class
class_ = getattr(Config, type_, None)
if not class_:
    raise InvalidData(f"Invalid class type {type_}")
try:
    setattr(
        obj, key, class_(**newobj.__dict__)
    ) if preserve_type else setattr(obj, key, newobj.__dict__)
except TypeError as e:
    raise InvalidData(f"Invalid arguments for class {type_}")
```

Usage example:
```python
from fxdc import Config, dumps, loads

@Config.add_class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 30)
serialized = dumps(person)
print(serialized)
# Output:
# main|Person:
#     name|str = "Alice"
#     age|int = 30

loaded = loads(serialized)
print(loaded.original)  # Person object with name="Alice", age=30
```

**When `__fromdata__` is Required:**

```python
@Config.add_class
class User:
    def __init__(self, username):
        self.username = username
        self.login_count = 0  # Not in __init__ parameters
    
    def __todata__(self):
        # Serialize both attributes
        return {"username": self.username, "login_count": self.login_count}
    
    @staticmethod
    def __fromdata__(**kwargs):
        # Required because __init__ only accepts 'username' 
        # but FxDC file contains 'username' AND 'login_count'
        user = User(kwargs["username"])
        user.login_count = kwargs.get("login_count", 0)
        return user

user = User("alice")
user.login_count = 5
serialized = dumps(user)
loaded = loads(serialized)
print(loaded.original.login_count)  # 5 (preserved through __fromdata__)
```

**Using `__fromdata__` for Custom Pre-Processing:**

```python
@Config.add_class
class DatabaseConnection:
    def __init__(self, host, port, timeout=30):
        self.host = host
        self.port = port
        self.timeout = timeout
        self.connection = None  # Established at runtime
    
    def __todata__(self):
        # Don't serialize the connection object
        return {"host": self.host, "port": self.port, "timeout": self.timeout}
    
    @staticmethod
    def __fromdata__(**kwargs):
        # Custom pre-processing: validate and transform data before creating instance
        host = kwargs["host"]
        if not host.startswith("db."):
            host = f"db.{host}"  # Normalize host names
        
        port = int(kwargs["port"])  # Ensure port is integer
        
        # Create instance with processed data
        return DatabaseConnection(host, port, kwargs.get("timeout", 30))
```

**Excluding Attributes from Serialization (only needs `__todata__`):**

```python
@Config.add_class
class CachedData:
    def __init__(self, data, cache_size=100):
        self.data = data
        self.cache_size = cache_size
        self._cache = {}  # Don't want this serialized
    
    def __todata__(self):
        # Only serialize data and cache_size, exclude _cache
        return {"data": self.data, "cache_size": self.cache_size}
    
    # No __fromdata__ needed! __init__ signature matches FxDC data
```

---

## Feature 4: Configuration Export & Import System

### Description
FxDC can export all registered class metadata (type definitions, validation rules, defaults) to a portable configuration file and reimport it in different projects or environments, enabling consistent data schemas across codebases.

### Why It Matters
In team environments or multi-project setups, maintaining consistent data schemas is critical. FxDC's config export/import eliminates the need to duplicate class definitions, ensures validation rules stay synchronized, and enables plugin architectures where schemas are loaded dynamically.

### How It Works
1. **Export**: Serializes all `Config` metadata (typechecking rules, verbose names, defaults, constraints) to a `.fxdc` config file
2. **Import**: Reads config file and reconstructs metadata in the `Config` registry
3. **Validation**: Ensures all referenced classes are loaded before importing config

### Implementation

The config format looks like:
```fxdc
!CONFIG FILE!

Config_User|dict:
    typechecking|dict:
        username|str="str"
        age|str="int"
    verbose_name|dict:
        username|str="name"
    default|dict:
        username|str="guest"
    notnull|list:
        str="username"
    notblank|list:
        str="username"
    description|dict:
        username|str="name of the user"
        age|str="age of the user"
```

Usage:
```python
from fxdc import Config, FxDCField

@Config.add_class
class User:
    username: FxDCField[str] = FxDCField(desc="The username of the user")
    age: FxDCField[int] = FxDCField(desc="The age of the user")

# Export configuration
Config.export_config("user_config.fxdc")

# Later, in another project:
# (Assuming User class is defined)
Config.import_config("user_config.fxdc")
# All metadata is restored
```

---

## Feature 5: Pre-Built Support for Common Python Types

### Description
FxDC comes with default serialization/deserialization handlers for Python built-in types (set, tuple, bytes, range, etc.), Pandas DataFrames, NumPy arrays, and datetime objects—no manual registration required.

### Why It Matters
Data science and backend workflows frequently use these types. Supporting them out-of-the-box eliminates setup friction and makes FxDC immediately useful for real-world projects without writing adapter code.

### How It Works
1. **Default Classes Module**: `fxdc/defaultclasses/` contains pre-registered handlers
2. **Conditional Loading**: Checks if optional dependencies (NumPy, Pandas) are installed before registering
3. **Automatic Registration**: `load_default_classes()` is called on import

### Implementation

From `fxdc/defaultclasses/__init__.py`:
```python
def load_default_classes():
    from .pythondefaults import load_python_defaults
    from .datetimedefaults import load_datetime_defaults
    
    load_python_defaults()
    load_datetime_defaults()
    
    try:
        from .numpydefaults import load_numpy_defaults
        load_numpy_defaults()
    except ImportError:
        pass  # NumPy not installed
    
    try:
        from .pandasdefaults import load_pandas_defaults
        load_pandas_defaults()
    except ImportError:
        pass  # Pandas not installed
```

Supported types include:
- **Python Built-ins**: `set`, `tuple`, `bytes`, `bytearray`, `range`, `map`, `filter`, `enumerate`, `zip`, `dict_items`, `dict_keys`, `dict_values`
- **Pandas**: `DataFrame`
- **NumPy**: `NDArray`, `Matrix`
- **Datetime**: `Date`, `Time`, `DateTime`, `TimeDelta`

---

## Feature 6: Human-Readable Indentation-Based Syntax

### Description
FxDC uses Python-like indentation to represent nested structures, making files easy to read, edit, and version control while supporting comments and multiline values.

### Why It Matters
Configuration files are often edited by hand or reviewed in code reviews. A clean, readable syntax reduces errors, improves collaboration, and makes diffs more meaningful in version control systems.

### How It Works
- **Indentation Tracking**: Lexer emits `TT_INDENT` tokens; parser counts indentation levels to determine nesting
- **Comment Support**: Lines starting with `#` are ignored (if implemented)
- **Type Hints**: Inline syntax `variable|type = value` for explicit typing

Example FxDC file:
```fxdc
# Application configuration
app|AppConfig:
    name|str = "MyApp"
    version|str = "1.0.0"
    debug|bool = true
    
    database:
        host = "localhost"
        port = 5432
        credentials:
            username = "admin"
            password = "secret"
    
    features|list:
        str = "authentication"
        str = "logging"
        str = "caching"
```

This parses to:
```python
{
    "app": AppConfig(
        name="MyApp",
        version="1.0.0",
        debug=True,
        database={
            "host": "localhost",
            "port": 5432,
            "credentials": {
                "username": "admin",
                "password": "secret"
            }
        },
        features=["authentication", "logging", "caching"]
    )
}
```

---

## Feature 7: Direct JSON Conversion (`fxdc_to_json`)

### Description
FxDC provides a direct conversion function `fxdc_to_json()` that converts FxDC-formatted strings directly into JSON strings without deserializing into Python objects first, optimizing memory usage and performance.

### Why It Matters
When you only need JSON output and don't care about reconstructing Python classes, this method bypasses object instantiation entirely. This is faster, uses less memory, and is ideal for data export pipelines where class reconstruction is unnecessary overhead.

### How It Works
1. **Skip Type Preservation**: Parser runs with `preserve_type=False` flag, preventing class instantiation
2. **Direct Conversion**: Parsed data structure (dicts, lists, primitives) is immediately serialized to JSON
3. **Metadata Loss**: Custom class information is discarded—cannot convert back to original classes

**⚠️ Warning**: This method discards all class metadata. You cannot reconstruct custom Python objects from the resulting JSON.

### Implementation

From `fxdc/json.py`:
```python
def fxdc_to_json(fxdc_string: str):
    """Convert FedxD string to JSON string

    Args:
        fxdc_string (str): FedxD string to convert

    WARNING:
        This function will not preserve the type of the object.
        you can not convert the JSON string back to FedxD object or Any python object.

    """
    lexer = Lexer(fxdc_string, Config.custom_classes_names)
    tokens = lexer.make_tokens()

    parser = Parser(tokens)
    fxdc_obj = parser.parse(preserve_type=False)
    return fxdc_obj.json()
```

Usage example:
```python
from fxdc.json import fxdc_to_json

fxdc_data = '''
user|User:
    name|str = "Alice"
    age|int = 30
    roles|list:
        str = "admin"
        str = "developer"
'''

json_output = fxdc_to_json(fxdc_data)
print(json_output)
# Output: {"user": {"name": "Alice", "age": 30, "roles": ["admin", "developer"]}}
# Note: User class information is lost
```

---

## Feature 8: Flexible Type Hinting System

### Description
FxDC supports optional type hints using the `|` syntax (`variable|type = value`), with special handling for booleans, lists, custom classes, and primitives that require explicit typing.

### Why It Matters
Type hints enable automatic type conversion, validation, and better error messages. They're optional for primitives like strings and numbers (where type is obvious), but required for ambiguous types like booleans, lists, and custom classes.

### How It Works
1. **Optional for Primitives**: `name = "John"` automatically inferred as string
2. **Required for Booleans**: Must use `is_active|bool = "True"` or `is_active|bool = 1`
3. **Required for Lists**: Must use `items|list:` to indicate list type
4. **Required for Classes**: Must use `user|User:` to indicate custom class

**Boolean Representation:**
- String format: `"True"`, `"False"`, `"Null"` (recommended)
- Integer format: `1`, `0` (alternative)
- **NOT** JSON-style `true`/`false`

### Implementation

From `fxdc/parsedata/parsedata.py`:
```python
# Parse type hint if present (variable|type)
if self.current_token.type == TT_DEVIDER:
    self.advance()
    if self.current_token.type != TT_KEYWORD:
        raise InvalidData(
            f"Expected keyword class, got {self.current_token}"
        )
    type_ = self.current_token.value
    self.advance()

# Later: type conversion based on hint
if type_ == "bool":
    if isinstance(value, str):
        value = {"True": True, "False": False, "Null": None}[value]
    elif isinstance(value, int):
        value = bool(value)
elif type_ == "int":
    value = int(value)
elif type_ == "float":
    value = float(value)
# ... more type conversions
```

Examples:
```fxdc
# Primitives (type hint optional)
name = "Alice"
age = 30
salary = 50000.50

# Booleans (type hint REQUIRED)
is_active|bool = "True"
is_admin|bool = 1

# Lists (type hint REQUIRED)
tags|list:
    str = "python"
    str = "data"

# Custom classes (type hint REQUIRED)
user|User:
    username = "alice"
    email = "alice@example.com"
```

---

## Feature 9: Verbose Names & Aliasing

### Description
FxDCField supports `verbose_name` parameter, allowing different attribute names in FxDC files versus Python code. This enables cleaner serialization formats while maintaining descriptive Python variable names.

### Why It Matters
Python code often uses descriptive variable names (`user_authentication_token`), but serialized data benefits from shorter keys (`token`). Verbose names let you have both without manual mapping.

### How It Works
1. **Field Definition**: Set `verbose_name` in FxDCField
2. **Serialization**: Uses verbose name in `.fxdc` files
3. **Deserialization**: Maps verbose name back to Python attribute name

### Implementation

From `fxdc/config.py` (`_customclass` wrapper):
```python
# Convert Verbose Names to kwargs
newkwargs = {}
for key, value in kwargs.items():
    for original_name, verbose_name in self.meta_data.get(
        "verbose_name", {}
    ).items():
        if key == verbose_name:
            newkwargs[original_name] = value
            break
    else:
        newkwargs[key] = value
```

Usage example:
```python
from fxdc import FxDCField, Config, dumps

@Config.add_class
class User:
    user_authentication_token: FxDCField[str] = FxDCField(
        verbose_name="token",
        desc="JWT authentication token"
    )
    user_email_address: FxDCField[str] = FxDCField(
        verbose_name="email",
        desc="User's email"
    )

user = User()
user.user_authentication_token = "eyJ..."
user.user_email_address = "alice@example.com"

fxdc_output = dumps(user)
print(fxdc_output)
# Output:
# main|User:
#     token|str = "eyJ..."
#     email|str = "alice@example.com"
```

---

## Feature 10: Default Value Support

### Description
FxDCField and Config support default values that are automatically applied when a field is missing during deserialization.

### Why It Matters
Default values make configuration files more concise—you only need to specify values that differ from defaults. This is crucial for backward compatibility when adding new fields to existing classes.

### How It Works
1. **Field Definition**: Set `default` parameter in FxDCField
2. **Deserialization**: If field is missing from FxDC data, default value is used
3. **Config Metadata**: Defaults stored in `Config` and applied during object construction

### Implementation

From `fxdc/config.py`:
```python
# Add Defaults
for key, value in self.meta_data.get("default", {}).items():
    if key not in newkwargs:
        newkwargs[key] = value
```

Usage example:
```python
from fxdc import FxDCField, Config, loads

@Config.add_class
class AppConfig:
    host: FxDCField[str] = FxDCField(default="localhost")
    port: FxDCField[int] = FxDCField(default=8080)
    debug: FxDCField[bool] = FxDCField(default=False)

# Minimal FxDC file (only overrides port)
fxdc_data = '''
config|AppConfig:
    port|int = 3000
'''

config = loads(fxdc_data).original
print(config.host)   # "localhost" (default)
print(config.port)   # 3000 (from file)
print(config.debug)  # False (default)
```

---

## Feature 11: Null & Blank Validation Constraints

### Description
FxDCField provides `null` and `blank` parameters to enforce data integrity constraints, preventing None values or empty strings where they're not allowed.

### Why It Matters
Data validation at the field level catches errors early, before invalid data propagates through your application. This is especially important for required fields like usernames, API keys, or database connection strings.

### How It Works
1. **Field Definition**: Set `null=False` to disallow None, `blank=False` to disallow empty strings
2. **Validation**: Checked during deserialization in `_customclass.__call__()`
3. **Exceptions**: Raises `NullFailure` or `BlankFailure` if constraints violated

### Implementation

From `fxdc/config.py`:
```python
# Check Nullability
if key in self.meta_data.get("notnull", []):
    if value is None:
        raise NullFailure(f"Field {key} cannot be None")

# Check Blankness
if key in self.meta_data.get("notblank", []):
    if value == "":
        raise BlankFailure(f"Field {key} cannot be blank")
```

From `fxdc/exceptions.py`:
```python
class NullFailure(FXDCException):
    """Raised when a field has a None value which is not allowed"""

class BlankFailure(FXDCException):
    """Raised when a field has a blank value which is not allowed"""
```

Usage example:
```python
from fxdc import FxDCField, Config, loads

@Config.add_class
class User:
    username: FxDCField[str] = FxDCField(null=False, blank=False)
    email: FxDCField[str] = FxDCField(null=False, blank=False)
    bio: FxDCField[str] = FxDCField(null=True, blank=True)  # Optional

# Invalid data (username is blank)
fxdc_data = '''
user|User:
    username|str = ""
    email|str = "alice@example.com"
'''

try:
    user = loads(fxdc_data).original
except BlankFailure as e:
    print(e)  # "Field username cannot be blank"
```

---

## Feature 12: Custom Class Name Registration

### Description
FxDC allows registering classes with custom names in the Config registry, enabling multiple classes with the same name (from different modules) to coexist without conflicts.

### Why It Matters
When working with third-party libraries that have name collisions (e.g., `Queue` from `queue` module vs `multiprocessing` module), custom naming prevents conflicts and makes serialization unambiguous.

### How It Works
1. **Registration**: Call `Config.add_class("CustomName", class_=ActualClass)`
2. **Serialization**: FxDC uses `"CustomName"` in `.fxdc` files
3. **Deserialization**: Looks up `"CustomName"` in Config to find `ActualClass`

### Implementation

From `fxdc/config.py`:
```python
@overload
def add_class(
    self,
    name: str,
    *,
    class_: type,
    typechecking: bool = False,
    todata: Optional[Callable] = None,
    fromdata: Optional[Callable] = None,
    meta_data: Optional[dict] = None,
) -> type:
    ...

# In __call__ method
if name and class_:
    classname = name
    class__ = class_
```

Usage example:
```python
from fxdc import Config
from queue import Queue as ThreadQueue
from multiprocessing import Queue as ProcessQueue

# Register with different names
Config.add_class("ThreadQueue", class_=ThreadQueue)
Config.add_class("ProcessQueue", class_=ProcessQueue)

# Now both can be serialized
from fxdc import dumps

thread_q = ThreadQueue()
process_q = ProcessQueue()

print(dumps({"tq": thread_q}))  # Uses "ThreadQueue" in FxDC
print(dumps({"pq": process_q}))  # Uses "ProcessQueue" in FxDC
```

**⚠️ Warning**: Changing the registered name after data has been serialized will cause deserialization to fail.

---

## Feature 13: External Metadata Configuration

### Description
For classes you cannot modify (third-party libraries, built-ins), FxDC supports passing field metadata externally via the `meta_data` parameter in `Config.add_class()`.

### Why It Matters
You often need to serialize classes you don't control (external libraries, Python built-ins). External metadata lets you add validation rules, verbose names, and defaults without modifying the original class.

### How It Works
1. **Metadata Dictionary**: Create dict with keys: `typechecking`, `verbose_name`, `default`, `notnull`, `notblank`, `description`
2. **Registration**: Pass to `Config.add_class(meta_data=...)`
3. **Validation**: Metadata is applied during deserialization exactly as if defined in FxDCFields

### Implementation

From README example:
```python
from fxdc import Config, FxDCField

class User:  # Cannot modify this class (e.g., from external library)
    username: FxDCField[str] = FxDCField(desc="The username of the user")
    age: FxDCField[int] = FxDCField(desc="The age of the user")

    def __init__(self, username: str, age: int):
        self.username = username
        self.age = age

User = Config.add_class(User, meta_data={
    "typechecking": {
        "username": str,
        "age": int
    },
    "description": {
        "username": "The username of the user",
        "age": "The age of the user"
    },
    "verbose_name": {
        "username": "name",
    },
    "default": {
        "username": "default_user",
    },
    "notnull": {
        "username": True,
        "age": True
    },
    "notblank": {
        "username": False,
        "age": False
    }
})
```

Now the User class has full validation without modifying its source code.

---

## Feature 14: Custom Serialization Hooks (`__todata__` / `__fromdata__`)

### Description
Classes can define `__todata__()` and `__fromdata__()` methods to customize serialization behavior. These hooks provide complete control over how objects are converted to/from FxDC format.

### Why It Matters
Some classes have attributes that shouldn't be serialized (database connections, cache, temporary data) or need special handling during reconstruction. Custom hooks enable:
- Excluding sensitive/temporary attributes
- Transforming data before serialization
- Custom validation/processing during deserialization
- Handling constructor signature mismatches

### How It Works
1. **`__todata__()`**: Called during `dumps()`, returns serializable data (dict, list, str, int, float)
2. **`__fromdata__()`**: Called during `loads()`, receives serialized data, returns reconstructed object
3. **Optional**: Only implement when needed (most classes don't require them)

**When to use `__todata__`**:
- Exclude attributes (cache, connections, temporary data)
- Transform data before serialization

**When to use `__fromdata__`**:
- FxDC data fields don't match `__init__` signature
- Need custom pre-processing before object creation

### Implementation

External hooks (passed to `Config.add_class()`):
```python
def user_todata(obj):
    return {"username": obj.username, "email": obj.email}

def user_fromdata(**kwargs):
    return User(kwargs["username"], kwargs["email"])

Config.add_class(User, todata=user_todata, fromdata=user_fromdata)
```

Class methods:
```python
@Config.add_class
class Session:
    def __init__(self, user_id, token):
        self.user_id = user_id
        self.token = token
        self._cache = {}  # Don't serialize this
    
    def __todata__(self):
        return {"user_id": self.user_id, "token": self.token}
    
    @staticmethod
    def __fromdata__(**kwargs):
        return Session(kwargs["user_id"], kwargs["token"])
```

---

## Feature 15: Comprehensive Exception Hierarchy

### Description
FxDC provides a detailed exception system with specific error types for every failure scenario (file errors, parsing errors, validation errors), making debugging fast and error handling precise.

### Why It Matters
Generic exceptions make debugging difficult. FxDC's granular exceptions let you identify exactly what went wrong (invalid syntax? missing class? type mismatch?) and handle different errors appropriately.

### How It Works
1. **Base Exception**: `FXDCException` (cannot be raised directly)
2. **Category Exceptions**: File errors, parsing errors, validation errors
3. **Specific Exceptions**: Each with clear error message and context

### Implementation

From `fxdc/exceptions.py`:
```python
class FXDCException(Exception):
    """Base Exception for FedxD Data Container"""

# File & Extension Errors
class InvalidExtension(FXDCException):
    """Raised when file extension is not .fxdc"""

class FileNotReadable(FXDCException):
    """Raised when file cannot be read"""

class FileNotWritable(FXDCException):
    """Raised when file cannot be written"""

# Data & Parsing Errors
class InvalidData(FXDCException):
    """Raised when FxDC structure is invalid"""

class InvalidJSONKey(FXDCException):
    """Raised when dict contains invalid JSON key"""

class ClassNotLoaded(FXDCException):
    """Raised when referenced class not in Config"""

class NoConfigFound(FXDCException):
    """Raised when config file missing/invalid"""

# Field Validation Errors
class FieldError(FXDCException):
    """Raised when field creation fails"""

class TypeCheckFailure(FXDCException):
    """Raised when value type doesn't match expected"""

class NullFailure(FXDCException):
    """Raised when non-null field contains None"""

class BlankFailure(FXDCException):
    """Raised when non-blank field is empty"""
```

Usage example:
```python
from fxdc import loads
from fxdc.exceptions import InvalidData, TypeCheckFailure, ClassNotLoaded

try:
    data = loads(fxdc_string)
except ClassNotLoaded as e:
    print(f"Missing class: {e}")
    # Register the missing class
except InvalidData as e:
    print(f"Syntax error: {e}")
    # Show user where the error is
except TypeCheckFailure as e:
    print(f"Type mismatch: {e}")
    # Log validation error
```

---

## Feature 16: File I/O with Extension Validation

### Description
FxDC's `load()` and `dump()` functions enforce `.fxdc` file extensions and handle file I/O errors gracefully with specific exceptions.

### Why It Matters
Extension validation prevents accidental loading of wrong file types. Specific I/O exceptions (readable vs writable) make error handling precise and user-friendly.

### How It Works
1. **Extension Check**: Validates `.fxdc` extension before reading/writing
2. **File Operations**: Handles both file paths (strings) and file objects (`TextIOWrapper`)
3. **Error Handling**: Raises `InvalidExtension`, `FileNotReadable`, or `FileNotWritable`

### Implementation

From `fxdc/read.py`:
```python
def load(file: TextIOWrapper | str) -> FxDCObject:
    """Load the FXDC object from the file

    Args:
        file (TextIOWrapper | str): file to load from

    Raises:
        InvalidExtension: if the file extension is not .fxdc
        FileNotReadable: if the file is not readable
        TypeError: if the file is not a string or TextIOWrapper

    Returns:
        object: Returns the object from the file
    """
    if isinstance(file, str):
        if not file.endswith(".fxdc"):
            raise InvalidExtension("Invalid file extension")
        try:
            with open(file, "r") as f:
                data = f.read()
        except Exception as e:
            raise FileNotReadable(f"File is not readable: {e}")
    elif isinstance(file, TextIOWrapper):
        if not file.name.endswith(".fxdc"):
            raise InvalidExtension("Invalid file extension")
        try:
            data = file.read()
        except Exception as e:
            raise FileNotReadable(f"File is not readable: {e}")
    else:
        raise TypeError("Invalid file type. Required string or TextIOWrapper")

    return loads(data)
```

From `fxdc/write.py`:
```python
def dump(data: object, file: str | TextIOWrapper) -> None:
    """Dump the FXDC object to the file

    Args:
        data (object): Any Class Object
        file (str | TextIOWrapper): file to write

    Raises:
        InvalidExtension: if the file extension is not .fxdc
        FileNotWritable: if the file is not writable
        TypeError: if the file is not a string or TextIOWrapper
    """
    if isinstance(file, str):
        if not file.endswith(".fxdc"):
            raise InvalidExtension("Invalid file extension")
        try:
            with open(file, "w") as f:
                f.write(dumps(data))
        except Exception as e:
            raise FileNotWritable(f"File is not writable: {e}")
    # ... similar for TextIOWrapper
```

Usage:
```python
from fxdc import load, dump
from fxdc.exceptions import InvalidExtension, FileNotReadable

try:
    data = load("config.txt")  # Wrong extension
except InvalidExtension as e:
    print("Must be .fxdc file!")

try:
    data = load("missing.fxdc")
except FileNotReadable as e:
    print("File not found or cannot be read")
```

---

## Feature 17: Nested Structure Support (Dicts, Lists, Objects)

### Description
FxDC supports arbitrary nesting of dictionaries, lists, and custom objects, allowing complex hierarchical data structures to be represented cleanly with indentation.

### Why It Matters
Real-world data is often deeply nested (config files with sections, API responses with nested objects, data models with relationships). FxDC handles this naturally with its indentation-based syntax.

### How It Works
1. **Indentation Tracking**: Lexer counts indent levels, parser maintains indent stack
2. **Recursive Parsing**: Parser recursively handles nested blocks
3. **Type Preservation**: Each level can be dict, list, or custom class

### Implementation

Example showing complex nesting:
```fxdc
app|Application:
    name|str = "MyApp"
    database|DatabaseConfig:
        primary:
            host = "db1.example.com"
            port = 5432
            credentials|Credentials:
                username = "admin"
                password = "secret"
        replicas|list:
            dict:
                host = "db2.example.com"
                port = 5432
            dict:
                host = "db3.example.com"
                port = 5432
    features|list:
        Feature:
            name = "authentication"
            enabled = "True"
        Feature:
            name = "logging"
            enabled = "True"
    metadata:
        version = "1.0.0"
        tags|list:
            str = "production"
            str = "critical"
```

This demonstrates:
- Custom classes within custom classes (`Application` → `DatabaseConfig` → `Credentials`)
- Dicts within lists (`replicas|list:` contains dict entries)
- Lists within dicts (`tags|list:` within `metadata`)
- Mixed nesting depths (4+ levels deep)

---

## Summary Table

| Feature | Purpose | Use Case |
|---------|---------|----------|
| Custom Lexer/Parser | Complete control over syntax | Precise error messages, Python-specific optimizations |
| FxDCField Descriptors | Type-safe validation | Data integrity, self-documenting code |
| Class Mapping | Auto serialize/deserialize | Eliminate boilerplate conversion code |
| Config Export/Import | Portable metadata | Share schemas across projects/teams |
| Pre-Built Types | Built-in support for common types | NumPy, Pandas, datetime without setup |
| Indentation Syntax | Human-readable format | Config files, code reviews, version control |
| JSON Conversion | Direct FxDC→JSON | Fast export without object reconstruction |
| Type Hinting | Optional explicit typing | Validation, ambiguity resolution |
| Verbose Names | Alias attributes | Clean serialization, descriptive code |
| Default Values | Auto-fill missing fields | Concise configs, backward compatibility |
| Null/Blank Validation | Data constraints | Required field enforcement |
| Custom Names | Name collision resolution | Multi-module class disambiguation |
| External Metadata | Third-party class support | Library integration without modification |
| Custom Hooks | Serialization control | Exclude fields, transform data |
| Exception Hierarchy | Precise error handling | Fast debugging, granular error handling |
| File I/O | Safe file operations | Extension validation, error context |
| Nesting Support | Complex structures | Hierarchical data, API responses |


