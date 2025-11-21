export const fedxdDataContainerData = {
  // ============================================================
  // BASIC INFO
  // ============================================================
  title: "FedxD Data Container (FxDC)",
  shortDescription: "A lightweight, human-readable data serialization format for Python with native support for custom classes, type hints, and nested structures—cleaner than JSON, more Pythonic than YAML.",
  github: "https://github.com/KazimFedxD/FedxD-Data-Container",
  liveDemo: "https://pypi.org/project/fxdc/",
  
  badges: [
    { icon: "📦", text: "Published on PyPI" },
    { icon: "🐍", text: "Python 3.10+" },
    { icon: "⚡", text: "v5.0.0" },
    { icon: "📄", text: "MIT License" },
  ],

  techStack: [
    { name: "Python", version: "3.10+", category: "Language" },
    { name: "Custom Lexer", version: "Hand-built", category: "Parsing" },
    { name: "Custom Parser", version: "Recursive Descent", category: "Parsing" },
    { name: "Type System", version: "Generics", category: "Validation" },
    { name: "Descriptor Protocol", version: "Python Native", category: "Validation" },
    { name: "setuptools", version: "Build System", category: "Distribution" },
    { name: "NumPy", version: "2.0.2+ (Optional)", category: "Integration" },
    { name: "Pandas", version: "2.3.1+ (Optional)", category: "Integration" },
    { name: "pytest", version: "8.4.1+ (Dev)", category: "Testing" },
  ],

  // ============================================================
  // OVERVIEW
  // ============================================================
  overview: {
    description: "FedxD Data Container (FxDC) is a custom data serialization format and parser library for Python that bridges the gap between human readability and programmatic power. Unlike JSON's rigid structure or YAML's ambiguous parsing, FxDC provides a clean, indentation-based syntax with native support for Python's type system, custom classes, and complex nested structures. The library features a hand-built lexer and parser that tokenizes FxDC-formatted text into Python objects, complete with type hints, field validation, and automatic class reconstruction. FxDC supports round-trip serialization—you can dump Python objects (including custom classes) to `.fxdc` files and load them back with full type integrity.",
    
    problemIntro: "Existing serialization formats fall short when working with Python's rich type system:",
    
    problemStatement: [
      "JSON is verbose, doesn't support comments, and has no concept of Python types or custom classes",
      "YAML supports comments but has inconsistent parsing behavior and can't natively represent Python objects",
      "Pickle is binary, insecure, and not human-readable",
      "XML is overly verbose and cumbersome for simple structures",
      "No existing format natively supports Python's type system with first-class validation",
      "Serializing custom classes requires writing boilerplate code for every class",
    ],
    
    howWeSolve: [
      {
        problem: "JSON is verbose and has no concept of Python types or custom classes",
        solution: "FxDC provides concise syntax with inline type hints (`variable|type = value`) and automatic serialization/deserialization of custom classes via `@Config.add_class` decorator—no manual conversion code needed",
        benefit: "Developers can serialize complex Python objects with zero boilerplate while maintaining type safety and readability"
      },
      {
        problem: "YAML has inconsistent parsing behavior",
        solution: "FxDC implements a deterministic hand-built lexer and parser with well-defined syntax rules, providing predictable parsing behavior and detailed error messages with line numbers",
        benefit: "Eliminates parsing ambiguities and provides clear feedback when syntax errors occur, making debugging straightforward"
      },
      {
        problem: "Pickle is not human-readable and insecure",
        solution: "FxDC uses indentation-based plain text syntax that's easy to read, edit, and version control, with no arbitrary code execution unlike Pickle—classes must be explicitly registered",
        benefit: "Configuration files are readable by humans, safe to load from untrusted sources, and work well with git diff/merge tools"
      },
      {
        problem: "No existing format natively supports Python's type system",
        solution: "FxDC includes a built-in type system with `FxDCField` descriptors that provide runtime validation, type checking, null/blank constraints, and default values using Python's descriptor protocol",
        benefit: "Type errors are caught at load time instead of runtime, reducing bugs and eliminating the need for separate validation code"
      },
      {
        problem: "Serializing custom classes requires writing boilerplate code",
        solution: "FxDC automatically introspects class constructors and maps FxDC data fields to constructor parameters—for most classes, no additional code beyond `@Config.add_class` is needed",
        benefit: "Reduces development time and maintenance burden by eliminating repetitive serialization code for every class"
      },
      {
        problem: "XML is overly verbose for simple structures",
        solution: "FxDC uses minimal syntax inspired by Python—no opening/closing tags, just indentation and simple `key = value` pairs with optional type hints",
        benefit: "Config files are 50-70% shorter than equivalent XML while remaining clear and self-documenting"
      },
    ],

    targetAudience: [
      "Backend Developers managing complex configuration files with type safety",
      "Data Scientists serializing Pandas DataFrames, NumPy arrays, and custom model classes",
      "DevOps Engineers creating readable, version-controllable config files that support comments",
      "Library Authors providing users with a clean format for plugin configurations or data definitions",
      "Python Developers tired of writing boilerplate serialization code for custom classes",
    ],

    uniqueFeatures: [
      {
        icon: "🎯",
        title: "Zero-Boilerplate Class Serialization",
        points: [
          "Register classes once with @Config.add_class decorator",
          "Automatic constructor argument mapping",
          "Optional __todata__/__fromdata__ hooks for custom logic",
          "No manual to_dict/from_dict methods required",
          "Supports inheritance and nested objects",
        ]
      },
      {
        icon: "🔍",
        title: "Type-Safe with Runtime Validation",
        points: [
          "FxDCField descriptors with compile-time type hints",
          "Runtime type checking and validation",
          "Null/blank constraint enforcement",
          "Default value support",
          "Self-documenting field descriptions",
        ]
      },
      {
        icon: "⚙️",
        title: "Hand-Built Lexer & Parser",
        points: [
          "Complete tokenization and parsing system from scratch",
          "Indentation-aware parsing like Python",
          "Type hint resolution at parse time",
          "Detailed error messages with line numbers",
          "No external parser dependencies",
        ]
      },
      {
        icon: "🚀",
        title: "Built-in Support for Common Types",
        points: [
          "Python built-ins: set, tuple, bytes, range, map, filter, etc.",
          "Pandas DataFrames (optional dependency)",
          "NumPy arrays and matrices (optional dependency)",
          "Datetime objects: Date, Time, DateTime, TimeDelta",
          "No manual registration required for supported types",
        ]
      },
    ],

    useCases: [
      "Application configuration files with type validation",
      "Data persistence for custom Python classes",
      "Plugin system configuration with dynamic class loading",
      "Machine learning model serialization with metadata",
      "API response caching with custom objects",
      "Game save files with complex nested structures",
      "Scientific data serialization (Pandas, NumPy)",
      "Database query result caching",
      "Workflow configuration for data pipelines",
      "Settings management for desktop applications",
    ]
  },

  // ============================================================
  // FEATURES (10 Major Features)
  // ============================================================
  features: [
    {
      id: 1,
      title: "Custom Lexer & Parser Implementation",
      icon: "🔧",
      description: "FxDC includes a complete tokenization and parsing system built from scratch, featuring a custom lexer that breaks down FxDC-formatted text into tokens and a recursive descent parser that constructs Python objects from these tokens.",
      whyItMatters: "By implementing a custom lexer and parser, FxDC has complete control over syntax rules, error handling, and performance. This allows for precise error messages, flexible syntax extensions, and optimized parsing for Python-specific constructs that generic parsers can't handle efficiently.",
      howItWorks: [
        "Lexer reads input character by character, identifying tokens (identifiers, keywords, operators, literals, indentation)",
        "Parser consumes tokens and builds abstract syntax tree using recursive descent",
        "Tracks indentation levels for nested structures",
        "Resolves type hints and validates syntax",
        "Constructs FxDCObject instances with proper nesting",
        "Type resolution converts parsed values to declared types using Config registry",
      ],
      codeSnippets: [
        {
          title: "Lexer Implementation (fxdc/parsedata/lexer.py)",
          language: "python",
          code: `class Lexer:
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
            if self.current_char == "\\n":
                tokens.append(Token(TT_NEWLINE, None, self.line))
                self.line += 1
                self.advance()
            elif self.current_char in " \\t":
                tokens.append(Token(TT_INDENT, None, self.line))
                self.advance()
            elif self.current_char == "=":
                tokens.append(Token(TT_EQUAL, None, self.line))
                self.advance()
            # ... more token types
        return tokens`
        },
        {
          title: "Parser Implementation (fxdc/parsedata/parsedata.py)",
          language: "python",
          code: `class Parser:
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
                    raise InvalidData(f"Expected keyword class, got {self.current_token}")
                type_ = self.current_token.value
                self.advance()
            # ... parse value
        return obj`
        }
      ]
    },
    {
      id: 2,
      title: "Type-Safe Serialization with FxDCField",
      icon: "🔐",
      description: "The FxDCField descriptor provides compile-time type annotations and runtime validation for class attributes, including type checking, null/blank constraints, default values, and human-readable metadata.",
      whyItMatters: "Without FxDCField, developers must manually validate data after deserialization, write custom validation logic, and maintain separate documentation. FxDCField centralizes all validation rules in the class definition, making code self-documenting and eliminating entire categories of bugs.",
      howItWorks: [
        "Uses Python's descriptor protocol (__get__, __set__, __delete__) to intercept attribute access",
        "Stores validation rules (typechecking, null, blank, default) as class-level metadata",
        "When loading FxDC data, validates each field against declared constraints",
        "Allows verbose names for different names in FxDC files vs Python code"
      ],
      codeSnippets: [
        {
          title: "FxDCField Implementation (fxdc/fields.py)",
          language: "python",
          code: `class Field(Generic[T]):
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
        instance.__dict__[self.name] = value`
        },
        {
          title: "Field Validation in Config (fxdc/config.py)",
          language: "python",
          code: `# Convert Verbose Names to kwargs
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
            raise BlankFailure(f"Field {key} cannot be blank")`
        },
        {
          title: "Usage Example",
          language: "python",
          code: `from fxdc import FxDCField, Config

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
    )`
        }
      ]
    },
    {
      id: 3,
      title: "Automatic Class Mapping & Serialization",
      icon: "🔄",
      description: "FxDC automatically serializes and deserializes custom Python classes without requiring manual conversion code. Register a class once with @Config.add_class, and FxDC handles the rest, including constructor argument mapping and nested object reconstruction.",
      whyItMatters: "Traditional serialization requires writing custom to_dict() and from_dict() methods for every class, creating maintenance burden and potential bugs. FxDC eliminates this boilerplate by introspecting class constructors and automatically mapping data fields to constructor parameters.",
      howItWorks: [
        "Config.add_class() stores class metadata in central registry",
        "Serialization (dumps()): Introspects object attributes and generates FxDC syntax",
        "Calls __todata__() if defined to get serializable representation",
        "Deserialization (loads()): Parser identifies class type, retrieves from Config",
        "Calls __fromdata__() if defined to reconstruct object",
        "Otherwise calls constructor directly with parsed data as keyword arguments"
      ],
      codeSnippets: [
        {
          title: "Serialization Function (fxdc/write.py)",
          language: "python",
          code: `def dumps(data: object) -> str:
    """Dump the FXDC object to the string

    Args:
        data (object): Any Class Object
    Returns:
        str: Returns the string from the object
    """
    if type(data) != dict:
        data: dict[str, Any] = {"main": data}
    parser = ParseObject(data)
    return parser.parse()`
        },
        {
          title: "Deserialization Function (fxdc/read.py)",
          language: "python",
          code: `def loads(data: str) -> FxDCObject:
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
    return obj`
        },
        {
          title: "Class Reconstruction in Parser",
          language: "python",
          code: `# When type_ is a custom class
class_ = getattr(Config, type_, None)
if not class_:
    raise InvalidData(f"Invalid class type {type_}")
try:
    setattr(
        obj, key, class_(**newobj.__dict__)
    ) if preserve_type else setattr(obj, key, newobj.__dict__)
except TypeError as e:
    raise InvalidData(f"Invalid arguments for class {type_}")`
        },
        {
          title: "Basic Usage Example",
          language: "python",
          code: `from fxdc import Config, dumps, loads

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
print(loaded.original)  # Person object`
        },
        {
          title: "Custom __fromdata__ Example",
          language: "python",
          code: `@Config.add_class
class User:
    def __init__(self, username):
        self.username = username
        self.login_count = 0  # Not in __init__ parameters
    
    def __todata__(self):
        return {"username": self.username, "login_count": self.login_count}
    
    @staticmethod
    def __fromdata__(**kwargs):
        # Required because __init__ only accepts 'username'
        user = User(kwargs["username"])
        user.login_count = kwargs.get("login_count", 0)
        return user

user = User("alice")
user.login_count = 5
serialized = dumps(user)
loaded = loads(serialized)
print(loaded.original.login_count)  # 5`
        }
      ]
    },
    {
      id: 4,
      title: "Direct JSON Conversion",
      icon: "📄",
      description: "FxDC provides fxdc_to_json() function that converts FxDC-formatted strings directly into JSON without deserializing into Python objects first, optimizing memory and performance.",
      whyItMatters: "When you only need JSON output and don't care about reconstructing Python classes, this method bypasses object instantiation entirely. This is faster, uses less memory, and is ideal for data export pipelines where class reconstruction is unnecessary overhead.",
      howItWorks: [
        "Parser runs with preserve_type=False flag, preventing class instantiation",
        "Parsed data structure (dicts, lists, primitives) is immediately serialized to JSON",
        "Custom class information is discarded—cannot convert back to original classes"
      ],
      codeSnippets: [
        {
          title: "JSON Conversion Function (fxdc/json.py)",
          language: "python",
          code: `def fxdc_to_json(fxdc_string: str):
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
    return fxdc_obj.json()`
        },
        {
          title: "Usage Example",
          language: "python",
          code: `from fxdc.json import fxdc_to_json

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
# Note: User class information is lost`
        }
      ]
    },
    {
      id: 5,
      title: "Pre-Built Support for Common Python Types",
      icon: "�",
      description: "FxDC automatically serializes and deserializes custom Python classes without requiring manual conversion code. Register a class once with @Config.add_class, and FxDC handles the rest, including constructor argument mapping and nested object reconstruction.",
      whyItMatters: "Traditional serialization requires writing custom to_dict() and from_dict() methods for every class, creating maintenance burden and potential bugs. FxDC eliminates this boilerplate by introspecting class constructors and automatically mapping data fields to constructor parameters.",
      howItWorks: [
        "Config.add_class() stores class metadata in a central registry",
        "During serialization (dumps()), introspects object attributes and generates FxDC syntax",
        "Calls __todata__() if defined to get serializable representation, otherwise serializes all instance attributes",
        "During deserialization (loads()), parser identifies class type from syntax, retrieves class from Config",
        "Calls __fromdata__() if defined to reconstruct object, otherwise calls constructor with parsed data as kwargs",
        "__fromdata__ only needed when FxDC arguments don't match __init__ signature OR custom pre-processing is required",
      ],
      codeSnippets: [
        {
          title: "Basic Class Serialization",
          language: "python",
          code: `from fxdc import Config, dumps, loads

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
print(loaded.original)  # Person object with name="Alice", age=30`
        },
        {
          title: "Custom Serialization with __todata__ and __fromdata__",
          language: "python",
          code: `@Config.add_class
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
print(loaded.original.login_count)  # 5 (preserved!)`
        }
      ]
    },
    {
      id: 4,
      title: "Configuration Export & Import System",
      icon: "📦",
      description: "FxDC can export all registered class metadata (type definitions, validation rules, defaults) to a portable configuration file and reimport it in different projects or environments, enabling consistent data schemas across codebases.",
      whyItMatters: "In team environments or multi-project setups, maintaining consistent data schemas is critical. FxDC's config export/import eliminates the need to duplicate class definitions, ensures validation rules stay synchronized, and enables plugin architectures where schemas are loaded dynamically.",
      howItWorks: [
        "Export serializes all Config metadata (typechecking rules, verbose names, defaults, constraints) to a .fxdc config file",
        "Import reads config file and reconstructs metadata in the Config registry",
        "Validation ensures all referenced classes are loaded before importing config",
        "Metadata includes: type checking rules, verbose names, default values, null/blank constraints, field descriptions",
      ],
      codeSnippets: [
        {
          title: "Configuration Export and Import",
          language: "python",
          code: `from fxdc import Config, FxDCField

@Config.add_class
class User:
    username: FxDCField[str] = FxDCField(desc="The username of the user")
    age: FxDCField[int] = FxDCField(desc="The age of the user")

# Export configuration
Config.export_config("user_config.fxdc")

# Later, in another project:
# (Assuming User class is defined)
Config.import_config("user_config.fxdc")
# All metadata is restored`
        },
        {
          title: "Example Config File Format",
          language: "fxdc",
          code: `!CONFIG FILE!

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
        age|str="age of the user"`
        }
      ]
    },
    {
      id: 5,
      title: "Pre-Built Support for Common Python Types",
      icon: "🐍",
      description: "FxDC comes with default serialization/deserialization handlers for Python built-in types (set, tuple, bytes, range, etc.), Pandas DataFrames, NumPy arrays, and datetime objects—no manual registration required.",
      whyItMatters: "Data science and backend workflows frequently use these types. Supporting them out-of-the-box eliminates setup friction and makes FxDC immediately useful for real-world projects without writing adapter code.",
      howItWorks: [
        "defaultclasses/ module contains pre-registered handlers",
        "Checks if optional dependencies (NumPy, Pandas) are installed before registering",
        "load_default_classes() is called automatically on import",
        "Supports Python built-ins, Pandas DataFrames, NumPy arrays, and datetime objects",
      ],
      codeSnippets: [
        {
          title: "Default Classes Loader (fxdc/defaultclasses/__init__.py)",
          language: "python",
          code: `def load_default_classes():
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
        pass  # Pandas not installed`
        },
        {
          title: "Supported Types List",
          language: "python",
          code: `# Python Built-ins (no registration needed)
supported_types = [
    set, tuple, bytes, bytearray, range,
    map, filter, enumerate, zip,
    dict_items, dict_keys, dict_values
]

# Pandas (if installed)
from pandas import DataFrame

# NumPy (if installed)
from numpy import ndarray, matrix

# Datetime
from datetime import date, time, datetime, timedelta`
        }
      ]
    },
    {
      id: 6,
      title: "Human-Readable Indentation-Based Syntax",
      icon: "📝",
      description: "FxDC uses Python-like indentation to represent nested structures, making files easy to read, edit, and version control while supporting comments and type hints.",
      whyItMatters: "Configuration files are often edited by hand or reviewed in code reviews. A clean, readable syntax reduces errors, improves collaboration, and makes diffs more meaningful in version control systems.",
      howItWorks: [
        "Lexer emits TT_INDENT tokens; parser counts indentation levels to determine nesting",
        "Inline type hint syntax: variable|type = value",
        "Comment support with # for line comments",
        "Indentation-aware parsing tracks block boundaries",
      ],
      codeSnippets: [
        {
          title: "Example FxDC File",
          language: "fxdc",
          code: `# Application configuration
app|AppConfig:
    name|str = "MyApp"
    version|str = "1.0.0"
    debug|bool = "True"
    
    database:
        host = "localhost"
        port = 5432
        credentials:
            username = "admin"
            password = "secret"
    
    features|list:
        str = "authentication"
        str = "logging"
        str = "caching"`
        },
        {
          title: "Parsed Python Output",
          language: "python",
          code: `{
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
}`
        }
      ]
    },
    {
      id: 7,
      title: "Direct JSON Conversion",
      icon: "🔄",
      description: "FxDC provides fxdc_to_json() function that converts FxDC-formatted strings directly into JSON strings without deserializing into Python objects first, optimizing memory usage and performance.",
      whyItMatters: "When you only need JSON output and don't care about reconstructing Python classes, this method bypasses object instantiation entirely. This is faster, uses less memory, and is ideal for data export pipelines where class reconstruction is unnecessary overhead.",
      howItWorks: [
        "Parser runs with preserve_type=False flag, preventing class instantiation",
        "Parsed data structure (dicts, lists, primitives) is immediately serialized to JSON",
        "Custom class information is discarded—cannot convert back to original classes",
        "Warning: This method loses all class metadata",
      ],
      codeSnippets: [
        {
          title: "JSON Conversion Implementation (fxdc/json.py)",
          language: "python",
          code: `def fxdc_to_json(fxdc_string: str):
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
    return fxdc_obj.json()`
        },
        {
          title: "Usage Example",
          language: "python",
          code: `from fxdc.json import fxdc_to_json

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
# Note: User class information is lost`
        }
      ]
    },
    {
      id: 8,
      title: "Flexible Type Hinting System",
      icon: "🏷️",
      description: "FxDC supports optional type hints using the | syntax (variable|type = value), with special handling for booleans, lists, custom classes, and primitives that require explicit typing.",
      whyItMatters: "Type hints enable automatic type conversion, validation, and better error messages. They're optional for primitives like strings and numbers (where type is obvious), but required for ambiguous types like booleans, lists, and custom classes.",
      howItWorks: [
        "Optional for primitives: name = 'John' automatically inferred as string",
        "Required for booleans: must use is_active|bool = 'True' or is_active|bool = 1",
        "Required for lists: must use items|list: to indicate list type",
        "Required for custom classes: must use user|User: to indicate custom class",
        "Boolean representation: string format ('True', 'False', 'Null') or integer format (1, 0)",
      ],
      codeSnippets: [
        {
          title: "Type Hint Parsing (fxdc/parsedata/parsedata.py)",
          language: "python",
          code: `# Parse type hint if present (variable|type)
if self.current_token.type == TT_DEVIDER:
    self.advance()
    if self.current_token.type != TT_KEYWORD:
        raise InvalidData(f"Expected keyword class, got {self.current_token}")
    type_ = self.current_token.value
    self.advance()

# Type conversion based on hint
if type_ == "bool":
    if isinstance(value, str):
        value = {"True": True, "False": False, "Null": None}[value]
    elif isinstance(value, int):
        value = bool(value)
elif type_ == "int":
    value = int(value)
elif type_ == "float":
    value = float(value)`
        },
        {
          title: "Type Hint Examples",
          language: "fxdc",
          code: `# Primitives (type hint optional)
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
    email = "alice@example.com"`
        }
      ]
    },
    {
      id: 9,
      title: "Verbose Names & Aliasing",
      icon: "📛",
      description: "FxDCField supports verbose_name parameter, allowing different attribute names in FxDC files versus Python code. This enables cleaner serialization formats while maintaining descriptive Python variable names.",
      whyItMatters: "Python code often uses descriptive variable names (user_authentication_token), but serialized data benefits from shorter keys (token). Verbose names let you have both without manual mapping.",
      howItWorks: [
        "Set verbose_name in FxDCField definition",
        "During serialization, uses verbose name in .fxdc files",
        "During deserialization, maps verbose name back to Python attribute name",
        "Config maintains verbose_name mapping in metadata",
      ],
      codeSnippets: [
        {
          title: "Verbose Name Mapping (fxdc/config.py)",
          language: "python",
          code: `# Convert Verbose Names to kwargs
newkwargs = {}
for key, value in kwargs.items():
    for original_name, verbose_name in self.meta_data.get(
        "verbose_name", {}
    ).items():
        if key == verbose_name:
            newkwargs[original_name] = value
            break
    else:
        newkwargs[key] = value`
        },
        {
          title: "Usage Example",
          language: "python",
          code: `from fxdc import FxDCField, Config, dumps

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
#     email|str = "alice@example.com"`
        }
      ]
    },
    {
      id: 10,
      title: "Default Value Support",
      icon: "⚙️",
      description: "FxDCField and Config support default values that are automatically applied when a field is missing during deserialization, making configuration files more concise and enabling backward compatibility.",
      whyItMatters: "Default values make configuration files more concise—you only need to specify values that differ from defaults. This is crucial for backward compatibility when adding new fields to existing classes.",
      howItWorks: [
        "Set default parameter in FxDCField definition",
        "If field is missing from FxDC data during deserialization, default value is used",
        "Defaults stored in Config metadata and applied during object construction",
        "Enables minimal config files that only override non-default values",
      ],
      codeSnippets: [
        {
          title: "Default Value Application (fxdc/config.py)",
          language: "python",
          code: `# Add Defaults
for key, value in self.meta_data.get("default", {}).items():
    if key not in newkwargs:
        newkwargs[key] = value`
        },
        {
          title: "Usage Example with Defaults",
          language: "python",
          code: `from fxdc import FxDCField, Config, loads

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

loaded = loads(fxdc_data)
print(loaded.original.host)   # "localhost" (default)
print(loaded.original.port)   # 3000 (overridden)
print(loaded.original.debug)  # False (default)`
        }
      ]
    },
  ],

  // ============================================================
  // ARCHITECTURE
  // ============================================================
  architecture: {
    description: "FxDC follows a pipeline architecture where raw text flows through distinct processing stages: Lexical Analysis (tokenization) → Syntactic Analysis (parsing) → Object Construction. Each component is modular and testable, with clear separation of concerns between lexing, parsing, validation, and serialization.",
    servicesTitle: "Core Components",
    servicesIntro: "FxDC consists of 7 interconnected components that handle parsing, validation, and serialization:",
    diagram: {
      title: "FxDC Pipeline Architecture",
      description: "FxDC follows a pipeline architecture where data flows through distinct stages: raw text → tokens → abstract syntax tree → Python objects.",
      layers: [
        {
          name: "Input Layer",
          components: [
            { name: "FxDC File/String", icon: "📄", description: "Raw FxDC-formatted text input" }
          ]
        },
        {
          name: "Lexical Analysis",
          components: [
            { name: "Lexer", icon: "🔍", description: "Character-by-character tokenization" },
            { name: "Custom Classes Registry", icon: "📋", description: "Registered class names for keyword detection" }
          ]
        },
        {
          name: "Syntactic Analysis",
          components: [
            { name: "Token Stream", icon: "🎯", description: "Sequence of tokens with types and values" },
            { name: "Parser", icon: "🔧", description: "Recursive descent parser building AST" },
            { name: "Type Resolution", icon: "🏷️", description: "Convert type hints to Python types" }
          ]
        },
        {
          name: "Object Construction",
          components: [
            { name: "FxDCObject", icon: "📦", description: "Parsed data structure" },
            { name: "Class Constructor Mapping", icon: "🗺️", description: "Map data fields to __init__ parameters" },
            { name: "Python Objects", icon: "🐍", description: "Fully reconstructed custom class instances" }
          ]
        }
      ],
      dataFlow: [
        { from: "FxDC File/String", to: "Lexer", description: "Raw text input" },
        { from: "Custom Classes Registry", to: "Lexer", description: "Keyword list" },
        { from: "Lexer", to: "Token Stream", description: "Tokenized output" },
        { from: "Token Stream", to: "Parser", description: "Token consumption" },
        { from: "Type Resolution", to: "Parser", description: "Type conversion" },
        { from: "Parser", to: "FxDCObject", description: "Parsed structure" },
        { from: "Class Constructor Mapping", to: "FxDCObject", description: "Object instantiation" },
        { from: "FxDCObject", to: "Python Objects", description: "Final output" }
      ]
    },
    services: [
      {
        name: "Lexer (fxdc/parsedata/lexer.py)",
        description: "Tokenization engine that scans input character-by-character and generates tokens",
        technologies: ["Python", "String Processing"],
        purpose: "Break down raw text into meaningful tokens for parser consumption"
      },
      {
        name: "Parser (fxdc/parsedata/parsedata.py)",
        description: "Recursive descent parser that builds FxDCObject hierarchy from token stream",
        technologies: ["Python", "Recursive Descent Parsing"],
        purpose: "Construct abstract syntax tree and validate syntax rules"
      },
      {
        name: "Config (fxdc/config.py)",
        description: "Global class registry and metadata storage system",
        technologies: ["Python", "Metaclasses"],
        purpose: "Manage class registration, metadata, and validation rules"
      },
      {
        name: "FxDCField (fxdc/fields.py)",
        description: "Descriptor-based field validation with type checking and constraints",
        technologies: ["Python Descriptors", "Generic Types"],
        purpose: "Provide per-field validation and metadata"
      },
      {
        name: "Serialization Engine (fxdc/write.py)",
        description: "Converts Python objects to FxDC syntax with proper formatting",
        technologies: ["Python", "Object Introspection"],
        purpose: "Generate human-readable FxDC files from Python objects"
      },
      {
        name: "Deserialization Engine (fxdc/read.py)",
        description: "File I/O validation and delegation to lexer/parser",
        technologies: ["Python", "File I/O"],
        purpose: "Load and validate FxDC files, convert to Python objects"
      },
      {
        name: "Default Classes (fxdc/defaultclasses/)",
        description: "Pre-registered handlers for common Python types",
        technologies: ["Python", "NumPy", "Pandas", "Datetime"],
        purpose: "Provide out-of-the-box support for built-in and popular types"
      }
    ]
  },

  // ============================================================
  // SETUP STEPS (10 steps)
  // ============================================================
  setupSteps: [
    {
      number: 1,
      title: "Install from PyPI",
      description: "Install the latest stable version from Python Package Index",
      commands: [
        { code: "pip install fxdc", description: "Install FxDC package" }
      ]
    },
    {
      number: 2,
      title: "Install Optional Dependencies (Optional)",
      description: "Install NumPy and Pandas for full functionality",
      commands: [
        { code: "pip install fxdc numpy pandas", description: "Install with optional dependencies" }
      ]
    },
    {
      number: 3,
      title: "Verify Installation",
      description: "Check that FxDC is installed correctly",
      commands: [
        { code: 'python -c "import fxdc; print(fxdc.__version__)"', description: "Print installed version" }
      ]
    },
    {
      number: 4,
      title: "Register Custom Classes",
      description: "Use @Config.add_class decorator to register classes for serialization",
      commands: [
        {
          code: `from fxdc import Config

@Config.add_class
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age`,
          description: "Register User class"
        }
      ]
    },
    {
      number: 5,
      title: "Enable Type Checking (Optional)",
      description: "Add FxDCField descriptors for runtime validation",
      commands: [
        {
          code: `from fxdc import FxDCField

@Config.add_class
class User:
    name: FxDCField[str] = FxDCField(typechecking=True)
    age: FxDCField[int] = FxDCField(typechecking=True)`,
          description: "Add type-checked fields"
        }
      ]
    },
    {
      number: 6,
      title: "Serialize Objects",
      description: "Use dumps() to convert Python objects to FxDC strings",
      commands: [
        {
          code: `from fxdc import dumps

user = User("Alice", 30)
fxdc_str = dumps(user)
print(fxdc_str)`,
          description: "Serialize object to string"
        }
      ]
    },
    {
      number: 7,
      title: "Deserialize Objects",
      description: "Use loads() to convert FxDC strings back to Python objects",
      commands: [
        {
          code: `from fxdc import loads

fxdc_str = 'main|User:\\n    name|str = "Alice"\\n    age|int = 30'
loaded = loads(fxdc_str)
print(loaded.original.name)  # "Alice"`,
          description: "Deserialize string to object"
        }
      ]
    },
    {
      number: 8,
      title: "Write to File",
      description: "Use dump() to write objects to .fxdc files",
      commands: [
        {
          code: `from fxdc import dump

with open("data.fxdc", "w") as f:
    dump(user, f)`,
          description: "Write object to file"
        }
      ]
    },
    {
      number: 9,
      title: "Read from File",
      description: "Use load() to read objects from .fxdc files",
      commands: [
        {
          code: `from fxdc import load

obj = load("data.fxdc")
print(obj.original)`,
          description: "Read object from file"
        }
      ]
    },
    {
      number: 10,
      title: "Export/Import Configuration (Optional)",
      description: "Share class metadata across projects",
      commands: [
        {
          code: `from fxdc import Config

# Export
Config.export_config("user_config.fxdc")

# Import (in another project)
Config.import_config("user_config.fxdc")`,
          description: "Export and import class metadata"
        }
      ]
    }
  ],

  // ============================================================
  // SCREENSHOTS
  // ============================================================
  screenshots: [
    {
      filename: "terminal-usage.png",
      caption: "Python REPL showing FxDC dumps() and loads() operations",
      category: "Usage",
      description: "Terminal demonstration of serializing and deserializing Python objects using FxDC"
    },
    {
      filename: "vscode-fxdc-file.png",
      caption: "FxDC file opened in VS Code showing clean syntax",
      category: "IDE",
      description: "Example .fxdc configuration file with indentation-based syntax and type hints"
    },
    {
      filename: "error-message.png",
      caption: "Helpful error messages with line numbers and context",
      category: "Error Handling",
      description: "Detailed error message showing syntax error location and expected token"
    },
    {
      filename: "class-registration.png",
      caption: "Pythonic @Config.add_class decorator syntax",
      category: "API",
      description: "Example of registering custom classes with the @Config.add_class decorator"
    }
  ],

  // ============================================================
  // PERFORMANCE
  // ============================================================
  performance: {
    parsePerformance: [
      { operation: "Parse FxDC to objects (loads)", iterations: "5,000", avgTime: "0.043ms", throughput: "23,528 parses/sec" },
      { operation: "Serialize to FxDC (dumps)", iterations: "5,000", avgTime: "0.017ms", throughput: "58,116 ops/sec" },
    ],
    roundTripPerformance: [
      { dataType: "Simple Dictionary (4 fields)", iterations: "1,000", totalTime: "48.20ms", avgTime: "0.048ms", throughput: "20,748 ops/sec" },
      { dataType: "Custom Class (User object)", iterations: "1,000", totalTime: "89.07ms", avgTime: "0.089ms", throughput: "11,226 ops/sec" },
      { dataType: "Nested Structure (3 levels)", iterations: "500", totalTime: "125.82ms", avgTime: "0.252ms", throughput: "3,973 ops/sec" },
      { dataType: "Large List (100 dict items)", iterations: "100", totalTime: "549.19ms", avgTime: "5.492ms", throughput: "182 ops/sec" },
    ],
    comparisonWithJSON: {
      fxdc: { totalTime: "45.63ms", avgTime: "0.046ms", throughput: "21,912 ops/sec" },
      json: { totalTime: "3.48ms", avgTime: "0.003ms", throughput: "287,356 ops/sec" },
      difference: "13.13x slower (expected: JSON is C-extension, FxDC is pure Python with added features)"
    },
    largeFileHandling: [
      { size: "100 KB", tokenization: "~10ms", parsing: "~50ms", total: "~60ms" },
      { size: "1 MB", tokenization: "~100ms", parsing: "~500ms", total: "~600ms" },
      { size: "10 MB", tokenization: "~1s", parsing: "~5s", total: "~6s" },
    ],
    notes: [
      "FxDC is ~13x slower than JSON but provides type validation, custom class support, and human-readable format",
      "Linear time complexity O(n) with file size",
      "FxDC is significantly faster than YAML (PyYAML) for simple structures",
      "Use JSON for speed-critical applications; use FxDC for config files and readable serialization",
    ]
  },

  // ============================================================
  // REQUIREMENTS
  // ============================================================
  requirements: {
    os: [
      { name: "Windows", version: "10/11", supported: true, notes: "Fully supported" },
      { name: "macOS", version: "12+", supported: true, notes: "Fully supported" },
      { name: "Linux", version: "Ubuntu 20.04+", supported: true, notes: "Fully supported" },
      { name: "Linux", version: "Debian 11+", supported: true, notes: "Fully supported" },
    ],
    hardware: {
      minimum: {
        ram: "512 MB",
        cpu: "Single-core 1.0GHz",
        disk: "50 MB"
      },
      recommended: {
        ram: "2 GB",
        cpu: "Dual-core 2.0GHz",
        disk: "200 MB"
      }
    },
    software: [
      {
        name: "Python",
        version: "3.10+",
        required: true,
        purpose: "Runtime environment"
      },
      {
        name: "pip",
        version: "Latest",
        required: true,
        purpose: "Package installation"
      },
      {
        name: "NumPy",
        version: "2.0.2+",
        required: false,
        purpose: "NumPy array serialization support"
      },
      {
        name: "Pandas",
        version: "2.3.1+",
        required: false,
        purpose: "DataFrame serialization support"
      },
      {
        name: "pytest",
        version: "8.4.1+",
        required: false,
        purpose: "Running tests (development only)"
      },
    ],
    browsers: []  // Not applicable (Python library)
  },

  // ============================================================
  // KNOWN ISSUES (with expandable details)
  // ============================================================
  knownIssues: [
    {
      severity: "Medium",
      title: "No Streaming Parser",
      description: "Entire file must be loaded into memory before parsing",
      impact: "Large files (> 100 MB) may cause memory issues",
      workaround: "Split large files into smaller chunks or use alternative formats (Pickle, MessagePack) for > 100 MB data",
      status: "No immediate plans (would require major architecture rewrite)",
      detailedExplanation: "FxDC uses a token-based parser that requires the complete input to be tokenized before parsing begins. This design decision was made for simplicity and to enable better error messages, but it means the entire file contents must reside in memory during parsing. For large datasets (> 100 MB), this can lead to high memory consumption or even out-of-memory errors on constrained systems.",
      technicalDetails: "The Lexer.make_tokens() method processes the entire input string in a single pass, storing all tokens in a list. The Parser then consumes this token list. This approach prevents streaming parsing where data could be processed incrementally.",
      whyItHappens: "Streaming parsers (like SAX for XML) are significantly more complex to implement and would require a complete architecture redesign. The current approach prioritizes code simplicity, maintainability, and developer ergonomics over memory efficiency for large files.",
      proposedFix: "Implement a SAX-style event-driven parser in v6.0 that emits events for each parsed element instead of building a complete in-memory tree. This would enable processing files of arbitrary size with constant memory usage.",
      estimatedEffort: "4-6 weeks",
      priority: "Low (affects edge cases with very large files)"
    },
    {
      severity: "High",
      title: "Circular References Cause RecursionError",
      description: "Objects with circular references cause infinite recursion during serialization",
      impact: "Cannot serialize data structures like linked lists, trees, or graphs with parent pointers",
      workaround: "Break circular references before serialization or implement custom __todata__ that excludes parent pointers",
      status: "Investigating",
      detailedExplanation: "When an object references another object which references back to the first (e.g., a.parent = b; b.child = a), the dumps() function will recursively serialize objects indefinitely until hitting Python's recursion limit (default 1000), causing a RecursionError. This affects common data structures like doubly-linked lists, tree nodes with parent pointers, and graph structures.",
      technicalDetails: "The ParseObject class in write.py does not track already-visited objects during recursion. When it encounters an object attribute, it recursively calls parse() on that object without checking if it's already in the serialization path. This creates an infinite loop: serialize A → serialize A.parent (B) → serialize B.child (A) → serialize A.parent (B) → ...",
      whyItHappens: "Tracking visited objects adds complexity and overhead. The library was initially designed for simple data structures (configs, DTOs) where circular references don't typically occur.",
      proposedFix: `Implement a visited set in ParseObject:
class ParseObject:
    def __init__(self, data, visited=None):
        self.visited = visited or set()
        # Check id(obj) before recursing
        if id(data) in self.visited:
            return "<circular reference>"
        self.visited.add(id(data))`,
      estimatedEffort: "1 day",
      priority: "High (affects legitimate use cases)"
    },
  ],

  // ============================================================
  // FUTURE ENHANCEMENTS (with expandable features)
  // ============================================================
  futureEnhancements: [
    {
      version: "5.1",
      timeline: "Q1 2026",
      theme: "Developer Experience Improvements",
      features: [
        {
          name: "Multi-Line String Support",
          priority: "High",
          effort: "2 weeks",
          difficulty: "Medium",
          description: "True multi-line strings without escape sequences using triple-quote or heredoc syntax",
          whyWeNeed: "Complex text values (SQL queries, templates, long descriptions) are difficult to read and maintain with \\n escape sequences. Multi-line strings would make FxDC more practical for real-world config files.",
          howToImplement: "1. Add triple-quote detection in Lexer (detect \"\"\"). 2. Track string mode and consume characters until closing triple-quote. 3. Preserve indentation within multi-line content. 4. Update Parser string handling logic. 5. Add serialization support in dumps().",
          benefits: [
            "Readable SQL queries and templates in config files",
            "No need for escape sequence gymnastics",
            "Copy-paste text blocks without modification",
            "Better support for embedded code/scripts",
          ],
          impactOnProject: "Significantly improves usability for applications that need to store long text values in configuration."
        },
        {
          name: "Performance Improvements",
          priority: "Medium",
          effort: "3 weeks",
          difficulty: "Hard",
          description: "Optimize tokenizer and parser for 2x speed improvement on large files",
          whyWeNeed: "FxDC is currently ~13x slower than JSON. While this is acceptable for config files, improving performance would expand use cases to larger datasets.",
          howToImplement: "1. Profile current implementation to identify bottlenecks. 2. Use string slicing instead of character-by-character iteration where possible. 3. Cache frequently accessed Config metadata. 4. Optimize token list operations. 5. Implement benchmark suite for regression testing.",
          benefits: [
            "50% faster parsing for files > 100KB",
            "30% lower memory usage",
            "Enables use cases with moderately large datasets",
            "Better competitive positioning vs YAML",
          ],
          impactOnProject: "Expands FxDC's applicability beyond just small config files to medium-sized data serialization tasks."
        },
      ]
    },
    {
      version: "5.2",
      timeline: "Q2 2026",
      theme: "Validation & Tooling",
      features: [
        {
          name: "Enhanced Error Messages",
          priority: "High",
          effort: "2 weeks",
          difficulty: "Medium",
          description: "Better syntax error descriptions with suggestions, context, and 'did you mean?' features",
          whyWeNeed: "Current error messages show 'Expected identifier, got Token(...)' which is not beginner-friendly. Improving error quality reduces debugging time and improves developer experience.",
          howToImplement: "1. Store surrounding context (previous/next 3 lines) in Parser. 2. Implement fuzzy matching for typo suggestions (e.g., 'intger' → 'Did you mean int?'). 3. Show visual pointer to error location with caret (^). 4. Collect multiple errors instead of failing on first. 5. Add error recovery strategies.",
          benefits: [
            "Faster debugging and error resolution",
            "Lower learning curve for new users",
            "Reduced support burden",
            "Professional-grade error reporting",
          ],
          impactOnProject: "Significantly improves developer experience, especially for beginners, making FxDC more accessible."
        },
        {
          name: "Schema Validation",
          priority: "Medium",
          effort: "4 weeks",
          difficulty: "Hard",
          description: "Declarative schema definition files to validate FxDC structure before loading",
          whyWeNeed: "Enterprise users need to validate configuration files against a schema to catch errors before deployment. Schema validation enables contract-first development and better collaboration between teams.",
          howToImplement: "1. Design .fxdc-schema file format (required/optional fields, types, constraints). 2. Implement schema parser. 3. Create validation engine that checks parsed FxDC against schema. 4. Add schema auto-generation from Python classes. 5. Consider JSON Schema compatibility for interoperability.",
          benefits: [
            "Catch configuration errors at CI/CD time",
            "Documentation auto-generation from schemas",
            "Contract-first API development",
            "Enterprise compliance (SOC 2, ISO requirements)",
          ],
          impactOnProject: "Makes FxDC suitable for enterprise environments where schema validation is a hard requirement."
        },
        {
          name: "Format Detection & Conversion",
          priority: "Low",
          effort: "3 weeks",
          difficulty: "Medium",
          description: "Auto-detect input format (FxDC/JSON/YAML) and bidirectional conversion tools",
          whyWeNeed: "Users often need to migrate from JSON/YAML to FxDC or use FxDC alongside other formats. Auto-detection and conversion tools reduce friction when integrating FxDC into existing projects.",
          howToImplement: "1. Implement format detection heuristics (check first character: { = JSON, a-z = FxDC, etc.). 2. Create fxdc.auto_load() that routes to appropriate parser. 3. Build converters: json_to_fxdc(), yaml_to_fxdc(), fxdc_to_yaml(). 4. Add CLI tools for batch conversion. 5. Implement diff tools for comparing FxDC files.",
          benefits: [
            "Easy migration from JSON/YAML to FxDC",
            "Interoperability with existing tools",
            "Simplified polyglot workflows",
            "Lower barrier to adoption",
          ],
          impactOnProject: "Reduces adoption friction by providing migration paths from existing serialization formats."
        },
      ]
    },
    {
      version: "6.0",
      timeline: "Q3-Q4 2026",
      theme: "Advanced Features & Scalability",
      features: [
        {
          name: "Streaming Parser",
          priority: "Medium",
          effort: "6-8 weeks",
          difficulty: "Very Hard",
          description: "SAX-style event-driven parsing for files > 1 GB without loading into memory",
          whyWeNeed: "Current parser requires entire file in memory, limiting FxDC to files < 100 MB. Streaming would enable big data use cases and drastically reduce memory footprint.",
          howToImplement: "1. Redesign parser to emit events (start_object, key_value, end_object) instead of building tree. 2. Implement iterator-based API: for item in stream_load('huge.fxdc'). 3. Add lazy loading for nested structures. 4. Maintain backward compatibility with existing API. 5. Extensive testing with multi-GB files.",
          benefits: [
            "Process files of arbitrary size",
            "Constant memory usage regardless of file size",
            "Enables data pipeline use cases",
            "Competitive with MessagePack for large datasets",
          ],
          impactOnProject: "Transforms FxDC from a config-file library into a general-purpose data serialization solution suitable for big data."
        },
        {
          name: "Plugin System",
          priority: "Low",
          effort: "4 weeks",
          difficulty: "Medium",
          description: "Custom type handlers, syntax extensions, and third-party class auto-discovery",
          whyWeNeed: "Users need to extend FxDC for domain-specific types (UUIDs, URLs, custom enums) without modifying core library. Plugins enable community contributions and ecosystem growth.",
          howToImplement: "1. Define plugin interface with register_type() hook. 2. Implement plugin discovery via entry points. 3. Create plugin registry and lifecycle management. 4. Build example plugins (UUID, URL, Decimal). 5. Document plugin development guide.",
          benefits: [
            "Extensibility without core changes",
            "Community-driven ecosystem",
            "Domain-specific type support",
            "Third-party integrations (databases, ORMs)",
          ],
          impactOnProject: "Creates an ecosystem around FxDC, encouraging community contributions and expanding use cases."
        },
      ]
    },
  ]
};
