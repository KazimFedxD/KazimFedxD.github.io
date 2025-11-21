# Architecture

## System Overview

FedxD Data Container is architected as a modular Python library with four primary subsystems:

1. **Lexical Analysis** (Tokenization)
2. **Syntactic Analysis** (Parsing)
3. **Configuration & Class Registry**
4. **Serialization & Deserialization**

The library follows a pipeline architecture where data flows through distinct stages: raw text → tokens → abstract syntax tree → Python objects. This separation of concerns enables independent testing, clear error handling at each stage, and extensibility.

## Request Flow Diagram

```
[FxDC File/String]
        ↓
    [Lexer] ← Custom Classes Registry
        ↓
    [Tokens]
        ↓
    [Parser] ← Type Resolution
        ↓
  [FxDCObject] ← Class Constructor Mapping
        ↓
[Python Objects]
```

**Reverse Flow (Serialization):**
```
[Python Object]
        ↓
  [ParseObject] ← Class Metadata Lookup
        ↓
[FxDC String] → File/Output
```

## Tech Stack

### Python 3.10+
- **Purpose**: Core programming language and runtime
- **Implementation**: Uses modern Python features like TypeVar, Generic, Protocol, type annotations
- **Why Chosen**: 
  - Type hints enable robust static analysis
  - 3.10+ provides match/case statements (if used) and improved typing features
  - Descriptor protocol for field validation
  - Native support for generics
- **Key Features Used**: 
  - Descriptor protocol (`__get__`, `__set__`, `__delete__`)
  - Type annotations with `typing` module
  - Generic classes with TypeVar
  - Abstract base classes

### Custom Lexer & Parser
- **Purpose**: Convert FxDC syntax to Python data structures
- **Implementation**: Hand-written tokenizer and recursive descent parser
- **Why Chosen**: 
  - Full control over syntax rules and error messages
  - No external parser dependencies
  - Optimized for Python-specific constructs
  - Enables custom type hint syntax (`variable|type`)
- **Key Features Used**:
  - Token-based lexical analysis
  - Indentation tracking for nested structures
  - Recursive descent parsing with backtracking
  - Type resolution at parse time

### Type System with Generics
- **Purpose**: Provide compile-time type safety and runtime validation
- **Implementation**: `FxDCField[T]` descriptor with Generic base
- **Why Chosen**:
  - Enables IDE autocomplete and type checking
  - Runtime validation catches errors early
  - Self-documenting code with type hints
- **Key Features Used**:
  - `Generic[T]` for parameterized types
  - `TypeVar` for type variables
  - `get_origin()` and `get_args()` for type introspection
  - Custom descriptor protocol

### Descriptor Protocol
- **Purpose**: Intercept attribute access for validation and metadata
- **Implementation**: `Field` class implements `__get__`, `__set__`, `__delete__`
- **Why Chosen**:
  - Clean syntax for field definitions
  - Transparent validation on assignment
  - No need for property decorators or boilerplate
- **Key Features Used**:
  - `__set_name__` for automatic field name detection
  - Instance dictionary manipulation
  - Lazy validation on access

### setuptools Build System
- **Purpose**: Package distribution and dependency management
- **Implementation**: `pyproject.toml` with setuptools backend
- **Why Chosen**:
  - Standard Python packaging tool
  - PyPI compatibility
  - Simple dependency specification
- **Key Features Used**:
  - PEP 517/518 compliant build system
  - Automatic package discovery
  - Metadata specification

## Component Breakdown

### 1. Lexer (`fxdc/parsedata/lexer.py`)

**Responsibilities:**
- Character-by-character scanning of input
- Token generation with line tracking
- Keyword identification
- String literal parsing
- Number parsing (int and float)

**Token Types:**
- `TT_IDENTIFIER`: Variable names
- `TT_KEYWORD`: Registered class names
- `TT_STRING`: Quoted strings
- `TT_NUMBER`: Integers
- `TT_FLOAT`: Floating-point numbers
- `TT_EQUAL`: `=` operator
- `TT_COLON`: `:` operator
- `TT_DEVIDER`: `|` type hint separator
- `TT_INDENT`: Whitespace/tabs
- `TT_NEWLINE`: Line breaks
- `TT_EOF`: End of file
- `TT_DESC`: Description markers

**Example Token Stream:**
```
Input: name|str = "John"

Tokens:
Token(TT_IDENTIFIER, "name", line=1)
Token(TT_DEVIDER, None, line=1)
Token(TT_KEYWORD, "str", line=1)
Token(TT_EQUAL, None, line=1)
Token(TT_STRING, "John", line=1)
Token(TT_EOF, None, line=1)
```

### 2. Parser (`fxdc/parsedata/parsedata.py`)

**Responsibilities:**
- Consume tokens from lexer
- Build FxDCObject hierarchy
- Validate syntax rules
- Resolve type hints
- Handle indentation-based nesting
- Invoke class constructors with parsed data

**Parsing Strategies:**
- **Recursive Descent**: Uses recursive function calls to handle nested structures
- **Indentation Counting**: Tracks indentation level to determine block boundaries
- **Type Resolution**: Looks up types in `Config` registry
- **Error Recovery**: Provides detailed error messages with line numbers

**Key Methods:**
- `parse()`: Main entry point, returns FxDCObject
- `parse_indented()`: Handles nested dictionaries
- `parse_list()`: Handles list structures
- `get_indent_count()`: Counts leading whitespace

### 3. Config (`fxdc/config.py`)

**Responsibilities:**
- Global class registry
- Metadata storage (type checking, defaults, validation rules)
- Class registration via decorator or function
- Configuration export/import
- Recursion limit management

**Key Components:**
- `_customclass`: Wrapper around registered classes with validation logic
- `add_class()`: Registers a class with optional metadata
- `remove_class()`: Unregisters a class
- `export_config()`: Serializes metadata to file
- `import_config()`: Loads metadata from file
- `set_recursion_limit()`: Adjusts maximum nesting depth

**Metadata Structure:**
```python
{
    "typechecking": {"field_name": type},
    "verbose_name": {"field_name": "display_name"},
    "default": {"field_name": default_value},
    "notnull": ["field_name"],
    "notblank": ["field_name"],
    "description": {"field_name": "description text"}
}
```

### 4. FxDCField (`fxdc/fields.py`)

**Responsibilities:**
- Field-level validation rules
- Default value management
- Type checking per field
- Null/blank constraint enforcement
- Verbose name mapping

**Descriptor Implementation:**
```python
class Field(Generic[T]):
    def __get__(self, instance, owner) -> T:
        return instance.__dict__.get(self.name, None)
    
    def __set__(self, instance, value: Optional[T]) -> None:
        instance.__dict__[self.name] = value
    
    def __set_name__(self, owner, name: str) -> None:
        self.name = name
```

### 5. Serialization (`fxdc/write.py`, `fxdc/writedata/`)

**Responsibilities:**
- Convert Python objects to FxDC syntax
- Handle custom classes with `__todata__` hooks
- Format nested structures with proper indentation
- Type annotation generation

**Process:**
1. Inspect object type
2. Look up metadata in Config
3. Call `__todata__` if available
4. Generate FxDC syntax with indentation
5. Add type hints and descriptions

### 6. Deserialization (`fxdc/read.py`)

**Responsibilities:**
- File I/O validation
- Extension checking (`.fxdc`)
- Permission error handling
- Delegation to lexer/parser

**Process:**
1. Validate file extension
2. Read file contents
3. Pass to `loads()`
4. Return `FxDCObject`

### 7. FxDCObject (`fxdc/parsedata/fxdcobject.py`)

**Responsibilities:**
- Container for parsed data
- Dictionary-like interface
- Access to original Python objects

**Key Properties:**
- `.original`: Returns the actual Python object (if preserve_type=True)
- `.__dict__`: Dictionary of parsed fields
- `.to_dict()`: Converts to plain dictionary

## Database Design

Not applicable—FxDC is a library for data serialization, not a database system. However, it can be used to serialize/deserialize ORM models or database query results.

## API Design

### Core API

**Loading Data:**
```python
fxdc.load(file: str | TextIOWrapper) -> FxDCObject
fxdc.loads(data: str) -> FxDCObject
```

**Dumping Data:**
```python
fxdc.dump(data: object, file: str | TextIOWrapper) -> None
fxdc.dumps(data: object) -> str
```

**JSON Conversion:**
```python
fxdc.to_json(fxdc_str: str) -> str  # Converts FxDC to JSON without class reconstruction
```

**Class Registration:**
```python
@Config.add_class
class MyClass: ...

# Optional: Custom serialization when FxDC data doesn't match __init__ signature
@Config.add_class
class CustomClass:
    def __todata__(self):
        # Return dict of attributes to serialize
        return {"field": self.field}
    
    @staticmethod
    def __fromdata__(**kwargs):
        # Only needed if FxDC fields don't match __init__ parameters
        # OR you need custom pre-processing logic
        return CustomClass(kwargs["field"])

Config.add_class(MyClass, typechecking=True, meta_data={...})
Config.remove_class("MyClass")
```

**Type System Notes:**
- **Booleans**: Represented as strings (`"True"`, `"False"`, `"Null"`) or integers (`1`, `0`)
- **Type Hints**: Required for booleans, lists, and custom classes
- **`__fromdata__`**: Only needed when FxDC arguments don't match `__init__` signature OR you need custom pre-processing logic
- **`__todata__`**: Optional, useful for excluding attributes (cache, temp data) from serialization

**Configuration Management:**
```python
Config.export_config(filename: str = "config.fxdc")
Config.import_config(filename: str = "config.fxdc")
Config.set_recursion_limit(limit: int)
```

### Error Handling

All custom exceptions inherit from `FXDCException`:

- `InvalidExtension`: Wrong file extension
- `FileNotReadable`: Permission denied or file not found
- `FileNotWritable`: Cannot write to file
- `InvalidData`: Syntax error or invalid structure
- `InvalidJSONKey`: Non-string dictionary key
- `ClassNotLoaded`: Referenced class not in Config
- `NoConfigFound`: Missing config file
- `FieldError`: Invalid field definition
- `TypeCheckFailure`: Type mismatch
- `NullFailure`: Null constraint violation
- `BlankFailure`: Blank constraint violation

### Type Annotations

FxDC uses comprehensive type hints:
```python
from typing import Any, Optional, TypeVar, Generic

T = TypeVar("T")
AcceptableTypes: TypeAlias = int | float | str | bool | list[Any] | dict[str, Any] | NoneType
```

## Deployment Architecture

FxDC is deployed as a PyPI package:

1. **Build**: `python -m build` creates wheel and sdist
2. **Test**: `pytest` runs test suite
3. **Publish**: `twine upload dist/*` publishes to PyPI
4. **Install**: Users run `pip install fxdc`

**Versioning:** Semantic versioning (currently v5.0.0)

**Dependencies:**
- **Required**: None (pure Python)
- **Optional**: NumPy 2.0.2+, Pandas 2.3.1+ (for default classes)
- **Dev**: pytest 8.4.1+ (for testing)

## Security Architecture

**Input Validation:**
- Lexer validates character sequences
- Parser enforces syntax rules
- Type checking prevents type confusion attacks
- No `eval()` or `exec()` usage (unlike Pickle)

**Injection Prevention:**
- String literals are properly escaped
- Type hints are validated against whitelist
- Class names must be pre-registered in Config

**File Access:**
- Checks file extensions to prevent arbitrary file writes
- Handles permission errors gracefully
- No automatic code execution on load

**Safe by Default:**
- Unlike Pickle, FxDC doesn't execute arbitrary code
- Class constructors are explicitly registered
- No deserialization of executable bytecode

## APIs & External Integrations

FxDC integrates with:

1. **NumPy**: Pre-built support for `NDArray` and `Matrix` serialization
2. **Pandas**: Pre-built support for `DataFrame` serialization
3. **Datetime**: Native support for date/time types
4. **JSON**: `to_json()` converts FxDC to JSON format

No external API calls are made by the library itself—all operations are local.

## Project Directory Structure

```
FedxD Data Container/
├── fxdc/                          # Main package
│   ├── __init__.py               # Public API exports
│   ├── config.py                 # Config class and registry
│   ├── exceptions.py             # Custom exception classes
│   ├── fields.py                 # FxDCField descriptor
│   ├── json.py                   # JSON conversion utilities
│   ├── misc.py                   # Debug helpers
│   ├── read.py                   # load() and loads()
│   ├── write.py                  # dump() and dumps()
│   ├── defaultclasses/           # Pre-registered types
│   │   ├── __init__.py
│   │   ├── pythondefaults.py     # Built-in types
│   │   ├── datetimedefaults.py   # Datetime types
│   │   ├── numpydefaults.py      # NumPy support
│   │   └── pandasdefaults.py     # Pandas support
│   ├── parsedata/                # Lexer and parser
│   │   ├── __init__.py
│   │   ├── lexer.py              # Tokenization
│   │   ├── parsedata.py          # Parser logic
│   │   └── fxdcobject.py         # Result container
│   └── writedata/                # Serialization
│       ├── __init__.py
│       └── parseobject.py        # Object-to-FxDC conversion
├── tests/                         # Test suite
│   ├── test_fxdc_core.py         # Core functionality tests
│   ├── test_fields.py            # Field validation tests
│   ├── test_defaultclasses.py    # Default type tests
│   ├── test_nestedclasses.py     # Nested structure tests
│   └── test_userclasses.py       # Custom class tests
├── build/                         # Build artifacts
├── dist/                          # Distribution packages
├── fxdc.egg-info/                # Package metadata
├── README.md                      # Project documentation
├── pyproject.toml                 # Build configuration
└── LICENSE                        # MIT License
```

**Key Design Patterns:**
- **Descriptor Pattern**: FxDCField for transparent validation
- **Registry Pattern**: Config for class management
- **Visitor Pattern**: Parser traverses token stream
- **Factory Pattern**: _customclass wraps constructors
- **Singleton Pattern**: Config is a module-level singleton
