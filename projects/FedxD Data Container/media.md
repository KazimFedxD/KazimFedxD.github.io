# Video & Media Assets

## Demo Video

- **YouTube**: [Placeholder - Video not yet created]
- **Duration**: 5-7 minutes (planned)
- **Topics to Cover**:
  - Introduction to FxDC
  - Installation and setup
  - Basic usage examples (load/dump)
  - Custom class registration
  - FxDCField with validation
  - Configuration export/import
  - Comparison with JSON/YAML

## Code Examples & Animations

### Basic Serialization Demo

**Concept**: Show a Python object being serialized to FxDC format

```python
from fxdc import dumps

user = {
    "name": "Alice",
    "age": 30,
    "email": "alice@example.com"
}

print(dumps(user))
```

**Output:**
```fxdc
name|str = "Alice"
age|int = 30
email|str = "alice@example.com"
```

### Custom Class Serialization

**Concept**: Demonstrate class registration and round-trip serialization

```python
from fxdc import Config, dumps, loads

@Config.add_class
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

user = User("Bob", 25)
fxdc_str = dumps(user)
print("Serialized:", fxdc_str)

loaded = loads(fxdc_str)
print(f"Loaded: {loaded.original.name}, {loaded.original.age}")
```

### Type Validation Demo

**Concept**: Show type checking catching errors

```python
from fxdc import Config, FxDCField, dumps, loads

@Config.add_class
class Product:
    price: FxDCField[float] = FxDCField(typechecking=True)
    
    def __init__(self, price):
        self.price = price

product = Product(19.99)
serialized = dumps(product)

# Manually corrupt the data
bad_data = serialized.replace("19.99", '"invalid"')

try:
    loads(bad_data)  # Will raise TypeCheckFailure
except Exception as e:
    print(f"Caught error: {e}")
```

## Architecture Diagrams

### System Flow Diagram

```
┌─────────────────┐
│  FxDC File/Text │
└────────┬────────┘
         │
         ▼
    ┌────────┐
    │ Lexer  │ ← Token Generation
    └────┬───┘
         │
         ▼
    ┌────────┐
    │ Tokens │
    └────┬───┘
         │
         ▼
    ┌────────┐
    │ Parser │ ← Type Resolution
    └────┬───┘   Config Lookup
         │
         ▼
   ┌──────────┐
   │ FxDCObject│
   └────┬─────┘
        │
        ▼
┌────────────────┐
│ Python Objects │
└────────────────┘
```

### Serialization Flow

```
┌────────────────┐
│ Python Object  │
└────────┬───────┘
         │
         ▼
  ┌──────────────┐
  │ ParseObject  │ ← Metadata Lookup
  └──────┬───────┘   (Config)
         │
         ▼
  ┌──────────────┐
  │ FxDC String  │
  └──────┬───────┘
         │
         ▼
   ┌────────┐
   │  File  │
   └────────┘
```

### Class Registration Flow

```
                      ┌──────────────────┐
                      │   @Config.       │
                      │   add_class      │
                      └────────┬─────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
         ┌──────▼──────┐              ┌──────▼──────┐
         │  Extract     │              │   Store     │
         │  Metadata    │              │   in Config │
         │  (FxDCField) │              │   Registry  │
         └──────┬───────┘              └──────┬──────┘
                │                             │
                └──────────────┬──────────────┘
                               │
                        ┌──────▼──────┐
                        │ _customclass│
                        │   Wrapper   │
                        └─────────────┘
```

### Parser State Machine

```
START
  │
  ├─→ Read IDENTIFIER → key
  ├─→ Check for DEVIDER (|)
  │     └─→ Read KEYWORD → type
  ├─→ Expect EQUAL or COLON
  │     ├─→ EQUAL → Read VALUE
  │     └─→ COLON → Parse NESTED
  │           ├─→ Check indentation
  │           ├─→ IDENTIFIER → parse_indented() (dict)
  │           └─→ Other → parse_list() (list)
  └─→ Store in FxDCObject
```

## Screenshot Catalog

✅ **All Required Screenshots Added!**

### Desktop

1. **Terminal Usage Example**
   - **Filename**: `terminal-usage.png`
   - **Content**: Python REPL showing FxDC load/dump operations
   - **Location**: `.website/screenshots/terminal-usage.png`
   - **Status**: ✅ Added

2. **Code Editor Integration**
   - **Filename**: `vscode-fxdc-file.png.png`
   - **Content**: VS Code showing `.fxdc` file with syntax
   - **Location**: `.website/screenshots/vscode-fxdc-file.png.png`
   - **Status**: ✅ Added

3. **Error Message Example**
   - **Filename**: `error-message.png`
   - **Content**: Terminal showing helpful error message
   - **Location**: `.website/screenshots/error-message.png`
   - **Status**: ✅ Added

4. **Class Registration**
   - **Filename**: `class-registration.png`
   - **Content**: Code showing `@Config.add_class` decorator
   - **Location**: `.website/screenshots/class-registration.png`
   - **Status**: ✅ Added
   - **Location**: `.website/screenshots/class-registration.png`

### Code Snippets (Text-Based)

Can be rendered as syntax-highlighted blocks in documentation:

#### Example 1: Basic Usage
```python
from fxdc import dumps, loads

data = {"name": "John", "age": 30}
fxdc_str = dumps(data)
print(fxdc_str)
# Output:
# name|str = "John"
# age|int = 30

obj = loads(fxdc_str)
print(obj.original)  # {"name": "John", "age": 30}
```

#### Example 2: Custom Classes
```python
from fxdc import Config, dumps, loads

@Config.add_class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 28)
serialized = dumps(person)
loaded = loads(serialized)
print(loaded.original.name)  # "Alice"
```

#### Example 3: Type Validation
```python
from fxdc import Config, FxDCField

@Config.add_class
class User:
    username: FxDCField[str] = FxDCField(
        typechecking=True,
        null=False,
        blank=False
    )
    age: FxDCField[int] = FxDCField(
        typechecking=True,
        default=18
    )
```

## Presentation Materials

### Slide Deck Outline (for future creation)

**Slide 1: Title**
- FedxD Data Container (FxDC)
- A Pythonic Data Serialization Format

**Slide 2: The Problem**
- JSON: No types, no custom classes
- YAML: Inconsistent parsing
- Pickle: Not human-readable, insecure

**Slide 3: The Solution**
- FxDC: Human-readable + Type-safe + Custom classes

**Slide 4: Key Features**
- Custom lexer & parser
- Type-safe with FxDCField
- Automatic class mapping
- Configuration portability

**Slide 5: Basic Example**
- Code snippet showing dumps/loads

**Slide 6: Custom Classes**
- Code snippet with @Config.add_class

**Slide 7: Type Validation**
- Code snippet with FxDCField

**Slide 8: Architecture**
- System flow diagram

**Slide 9: Performance**
- Comparison chart vs. JSON/YAML/Pickle

**Slide 10: Use Cases**
- Config files, data serialization, plugins

**Slide 11: Get Started**
- Installation: `pip install fxdc`
- GitHub link
- Documentation link

## Comparison Tables (Visual)

### Format Comparison Matrix

| Feature | FxDC | JSON | YAML | Pickle |
|---------|:----:|:----:|:----:|:------:|
| Human-Readable | ✅ | ✅ | ✅ | ❌ |
| Comments | 🚧 | ❌ | ✅ | ❌ |
| Type Hints | ✅ | ❌ | ❌ | ❌ |
| Custom Classes | ✅ | ❌ | ❌ | ✅ |
| Type Validation | ✅ | ❌ | ❌ | ❌ |
| Security | ✅ | ✅ | ✅ | ❌ |
| Speed | ⚡⚡⚡ | ⚡⚡⚡⚡ | ⚡⚡ | ⚡⚡⚡⚡⚡ |

### Performance Benchmarks (Visual)

*Placeholder for future benchmark charts*

Parse Time (100KB file):
- FxDC: 50ms
- JSON: 30ms
- YAML: 200ms
- Pickle: 20ms

Serialization Time:
- FxDC: 30ms
- JSON: 20ms
- YAML: 150ms
- Pickle: 10ms

## Logo & Branding

*Placeholder for future logo design*

**Logo Concept:**
- Icon representing data containers
- Color scheme: Blue/Green (trustworthy, technical)
- Typography: Modern, clean sans-serif

**File Formats Needed:**
- SVG (vector)
- PNG (various sizes: 16x16, 32x32, 64x64, 128x128, 256x256)
- ICO (for Windows)

## Social Media Assets

*Placeholder for future social media graphics*

**Twitter/X Card:**
- 1200x628 image
- Project name, tagline, key features
- GitHub link

**LinkedIn Post:**
- Project announcement
- Use case examples
- Call to action

## GIF Animations (Planned)

### 1. Quick Start Animation
- **Filename**: `quickstart.gif`
- **Duration**: 10 seconds
- **Content**: Terminal showing installation → import → basic usage

### 2. Class Registration
- **Filename**: `class-registration.gif`
- **Duration**: 8 seconds
- **Content**: Defining a class → decorating → serializing → loading

### 3. Type Validation
- **Filename**: `type-validation.gif`
- **Duration**: 6 seconds
- **Content**: Loading valid data ✅ → Loading invalid data ❌ → Error message

## Documentation Screenshots

For use in README and documentation:

1. **Installation verification**
2. **Basic usage in REPL**
3. **Example `.fxdc` file**
4. **Error message with helpful context**
5. **Test output showing passing tests**

## Additional Media Ideas

- **Comparison infographic**: FxDC vs. other formats
- **Feature showcase**: Visual grid of key features
- **Use case diagram**: Where FxDC fits in architecture
- **Testimonial graphics**: User quotes (when available)
- **Release announcement graphics**: For new versions

---

*All media assets should be placed in `.website/screenshots/` directory.*
*See `admin_instructions.md` for detailed creation instructions.*
