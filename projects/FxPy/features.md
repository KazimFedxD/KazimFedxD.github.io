# FxPy Features

This document provides detailed explanations of FxPy's major features and capabilities. 

**Note:** The 6 features listed in `metadata.json` are the core features highlighted in the portfolio. This document expands on those features with implementation details, code examples, and technical explanations. Additional minor features and built-in functions are documented in the main README.md.

## Feature 1: Dynamic Type System with Runtime Checking

### Description
FxPy implements a dynamic type system where variables can hold any type of value, and type checking happens at runtime rather than compile time. The language supports Numbers (integers and floats), Strings, Lists, Dictionaries, and Functions as first-class values.

### Why It Matters
Dynamic typing provides flexibility for rapid prototyping and scripting tasks. It allows developers to focus on logic rather than type declarations, making the language more accessible to beginners while still powerful for advanced users.

### How It Works
1. Variables are declared with the `let` keyword without type annotations
2. The interpreter tracks types internally using specialized classes (Number, String, List, etc.)
3. Type checking occurs during operations (e.g., can't add string to number)
4. Automatic type coercion where appropriate (e.g., integer to float)
5. Runtime errors with helpful messages when type mismatches occur

### Implementation

**Interpreter Type System (`interpreter.py`):**
```python
class Number:
    def __init__(self, value):
        self.value = value
        self.set_pos()
        self.set_context()
    
    def added_to(self, other):
        if isinstance(other, Number):
            return Number(self.value + other.value).set_context(self.context)
        else:
            return None  # Type error
```

**Usage Example:**
```javascript
let x = 42              # Number
let name = "FxPy"       # String
let items = [1, 2, 3]   # List
let config = {"debug": True}  # Dict

# Dynamic reassignment
x = "now a string"      # Valid in FxPy
```

---

## Feature 2: First-Class Functions with Closures

### Description
Functions in FxPy are first-class citizens—they can be assigned to variables, passed as arguments, returned from other functions, and maintain closure over their defining scope. The language supports both traditional function syntax and arrow function syntax.

### Why It Matters
First-class functions enable functional programming paradigms, including higher-order functions, callbacks, and function composition. This makes the language more expressive and allows for powerful abstractions.

### How It Works
1. Functions are defined using `fex` keyword (short for "function")
2. Arrow syntax `->` allows single-expression functions
3. Functions capture variables from enclosing scopes (closure)
4. Function objects store their name, parameters, body, and should_auto_return flag
5. Symbol table maintains function references for calling

### Implementation

**Function Definition Node (`fxparser.py`):**
```python
class FuncDefNode:
    def __init__(self, var_name_tok, arg_names, defaults, body, should_auto_return):
        self.var_name_tok = var_name_tok
        self.arg_names = arg_names
        self.defaults = defaults
        self.body = body
        self.should_auto_return = should_auto_return
```

**Function Object (`interpreter.py`):**
```python
class Function:
    def __init__(self, name, arg_names, defaults, body, should_auto_return):
        self.name = name or "<anonymous>"
        self.arg_names = arg_names
        self.defaults = defaults
        self.body = body
        self.should_auto_return = should_auto_return
    
    def execute(self, args, kwargs):
        # Create new context for function execution
        # Populate arguments
        # Execute body
        # Return result
```

**Usage Examples:**
```javascript
# Traditional syntax
fex greet(name):
    return "Hello, " + name
end

# Arrow function
fex square(x) -> return x * x

# Higher-order function
fex apply_twice(func, x):
    return func(func(x))
end

print(apply_twice(square, 3))  # 81

# Function as variable
let operation = square
print(operation(5))  # 25
```

---

## Feature 3: Advanced Module System with Import Resolution

### Description
FxPy features a sophisticated module system that supports importing code from other `.fx` files with multiple import syntaxes: basic imports, aliased imports, and selective imports. The system uses relative path resolution based on the importing file's location.

### Why It Matters
Modular code organization is essential for building larger programs. The import system allows developers to split code into reusable modules, promoting code reuse and maintainability.

### How It Works
1. Parser recognizes `import` and `from` keywords
2. Interpreter resolves file paths relative to importing file
3. Imported file is lexed, parsed, and executed in isolated context
4. Symbols from imported module are registered in importing context
5. Dot notation access: `module.function()` or direct access with `from`
6. Module aliasing with `as` keyword

### Implementation

**Import Node Structure (`fxparser.py`):**
```python
class ImportNode:
    def __init__(self, module_name_tok, alias_tok=None, import_list=None):
        self.module_name_tok = module_name_tok
        self.alias_tok = alias_tok
        self.import_list = import_list  # For 'from' imports
```

**Import Resolution (`interpreter.py`):**
```python
def visit_ImportNode(self, node, context):
    # Get current file's directory
    current_dir = os.path.dirname(os.path.abspath(context.display_name))
    
    # Resolve module path
    module_name = node.module_name_tok.value
    if not module_name.endswith('.fx'):
        module_name += '.fx'
    
    module_path = os.path.join(current_dir, module_name)
    
    # Execute module and get symbols
    result = run(module_path, module_path)
    
    # Register symbols with dot notation
    for key, value in result.context.symbol_table.symbols.items():
        context.symbol_table.set(f"{alias}.{key}", value)
```

**Usage Examples:**
```javascript
# Basic import
import math_utils
print(math_utils.factorial(5))

# Import with alias
import math_utils as math
print(math.factorial(5))

# Selective import
from math_utils import factorial, square
print(factorial(5))
print(square(10))

# Selective import with alias
from math_utils import factorial as fact
print(fact(5))
```

**File Structure:**
```
project/
├── main.fx
└── math_utils.fx
```

---

## Feature 4: Variadic Functions (*args and **kwargs)

### Description
FxPy supports variadic functions through `*args` for collecting positional arguments and `**kwargs` for collecting keyword arguments. This allows functions to accept flexible numbers of parameters.

### Why It Matters
Variadic functions are essential for creating flexible APIs and utility functions. They enable patterns like sum functions, logging with metadata, configuration builders, and more.

### How It Works
1. Parser recognizes `*identifier` and `**identifier` in parameter lists
2. During function call, extra positional args collected into list
3. Extra keyword args collected into dictionary
4. Function receives args/kwargs as normal List/Dict parameters
5. Can be combined with regular parameters

### Implementation

**Parameter Parsing (`fxparser.py`):**
```python
def func_def(self):
    # Parse parameter list
    arg_names = []
    
    while self.current_tok.type == TT_IDENTIFIER:
        arg_name = self.current_tok
        
        # Check for *args or **kwargs
        if arg_name.value.startswith('**'):
            # Keyword variadic
            kwargs_name = arg_name.value[2:]
            arg_names.append(('kwargs', kwargs_name))
        elif arg_name.value.startswith('*'):
            # Positional variadic
            args_name = arg_name.value[1:]
            arg_names.append(('args', args_name))
        else:
            arg_names.append(('normal', arg_name))
```

**Argument Population (`interpreter.py`):**
```python
def populate_args(self, arg_names, args, kwargs, exec_ctx):
    # Handle normal parameters
    # Collect extra positional into *args
    # Collect extra keyword into **kwargs
    
    if param_type == 'args':
        # Collect remaining positional arguments
        remaining_args = args[current_index:]
        exec_ctx.symbol_table.set(param_name, List(remaining_args))
    
    elif param_type == 'kwargs':
        # Collect remaining keyword arguments
        remaining_kwargs = {k: v for k, v in kwargs.items() if k not in used}
        exec_ctx.symbol_table.set(param_name, Dict(remaining_kwargs))
```

**Usage Examples:**
```javascript
# Positional variadic
fex sum(*numbers):
    let total = 0
    for num in numbers:
        total = total + num
    end
    return total
end

print(sum(1, 2, 3, 4, 5))  # 15

# Keyword variadic
fex configure(**options):
    return options
end

let config = configure(host="localhost", port=8080, debug=True)
print(config)  # {"host": "localhost", "port": 8080, "debug": True}

# Combined
fex log(level, *messages, **metadata):
    let msg = level + ": "
    for m in messages:
        msg = msg + m + " "
    end
    return {"message": msg, "metadata": metadata}
end

print(log("ERROR", "Failed", "to", "connect", code=500, retry=True))
```

---

## Feature 5: Rich Error Reporting with Visual Context

### Description
FxPy provides comprehensive error reporting that shows exactly where errors occur in source code, with visual indicators pointing to the problematic location. Errors include position information, context, and helpful messages.

### Why It Matters
Good error messages are crucial for developer productivity. Instead of cryptic errors, FxPy shows the exact line, column, and context where errors occur, making debugging significantly easier.

### How It Works
1. Every token tracks its position (line, column, file)
2. Errors are generated with position information
3. `string_with_arrows` utility creates visual representation
4. Error types include: IllegalCharError, InvalidSyntaxError, RTError
5. Runtime errors include stack traces showing call chain

### Implementation

**Position Tracking (`lexer.py`):**
```python
class Position:
    def __init__(self, idx, ln, col, fn, ftxt):
        self.idx = idx    # Index in file
        self.ln = ln      # Line number
        self.col = col    # Column number
        self.fn = fn      # Filename
        self.ftxt = ftxt  # File text
```

**Error Display (`string_with_arrows.py`):**
```python
def string_with_arrows(text, pos_start, pos_end):
    # Extract relevant lines
    # Add arrow indicators (^) pointing to error
    # Return formatted string with context
    
    result = ''
    
    # Get the line with the error
    idx_start = max(text.rfind('\n', 0, pos_start.idx), 0)
    idx_end = text.find('\n', idx_start + 1)
    
    # Show line with arrows
    result += line + '\n'
    result += ' ' * pos_start.col + '^' * (pos_end.col - pos_start.col)
    
    return result
```

**Error Example:**
```
Invalid Syntax: Expected ')'
File: main.fx, line 5

fex add(a, b -> return a + b
              ^
```

**Usage:**
```javascript
# Syntax error
fex broken(x:  # Missing closing paren
    return x
end

# Runtime error
let x = 10 / 0  # Division by zero

# Type error
let result = "text" + 5  # Can't add string and number
```

---

## Feature 6: Interactive REPL with Live Feedback

### Description
FxPy includes an interactive Read-Eval-Print Loop (REPL) that allows developers to execute code line-by-line and see immediate results. Perfect for experimentation, learning, and quick calculations.

### Why It Matters
REPLs are invaluable for learning languages, testing code snippets, and debugging. They provide instant feedback and make the language more accessible for beginners.

### How It Works
1. Shell reads input from user
2. Input is passed to lexer, parser, and interpreter
3. Result is displayed immediately
4. Errors are caught and displayed without crashing
5. Maintains state between commands (variables persist)
6. Supports multi-line input for complex structures

### Implementation

**REPL Implementation (`shell.py`):**
```python
import run

while True:
    try:
        text = input("FxPy > ")
        
        if text.strip() == "": 
            continue
        
        # Execute code
        result, error = run.run("<stdin>", text)
        
        if error:
            print(error.as_string())
        elif result:
            if len(result.elements) == 1:
                print(repr(result.elements[0]))
            else:
                print(repr(result))
    
    except KeyboardInterrupt:
        print("\nExiting...")
        break
```

**Usage:**
```bash
$ python shell.py

FxPy > let x = 42
42

FxPy > fex square(n) -> return n * n
<function square>

FxPy > square(x)
1764

FxPy > for i in range(5): print(i) end
0
1
2
3
4

FxPy > import math
<module math>

FxPy > math.factorial(5)
120
```

---

## Feature 7: Rich Data Structures (Lists & Dictionaries)

### Description
FxPy provides built-in support for two essential data structures: Lists (ordered collections) and Dictionaries (key-value mappings). These structures support intuitive operations and can be nested for complex data modeling.

### Why It Matters
Data structures are fundamental to any programming language. Lists enable working with sequences of data, while dictionaries allow for efficient key-based lookups and data organization. Both are essential for real-world programming tasks.

### How It Works
1. **Lists** use bracket notation `[...]` and support indexing, concatenation, and mutation
2. **Dictionaries** use curly braces `{key: value}` for JSON-like data representation
3. Operators are overloaded for intuitive operations (`+` for append, `*` for concatenation, `/` for indexing)
4. Both structures can contain mixed types and be nested
5. Runtime type checking ensures operations are valid

### Implementation

**List Operations (`interpreter.py`):**
```python
class List(Value):
    def __init__(self, elements):
        super().__init__()
        self.elements = elements
    
    def added_to(self, other):
        # Append element to list
        new_list = self.copy()
        new_list.elements.append(other)
        return new_list
    
    def multed_by(self, other):
        # Concatenate lists
        if isinstance(other, List):
            new_list = self.copy()
            new_list.elements.extend(other.elements)
            return new_list
    
    def dived_by(self, other):
        # Index access
        if isinstance(other, Number):
            try:
                return self.elements[int(other.value)]
            except IndexError:
                return RTResult().failure(RTError(...))
```

**Dictionary Implementation:**
```python
class Dict(Value):
    def __init__(self, pairs):
        super().__init__()
        self.pairs = pairs  # Dictionary of key-value pairs
    
    def dived_by(self, other):
        # Key-based access: dict / "key"
        if isinstance(other, String):
            key = other.value
            if key in self.pairs:
                return self.pairs[key]
```

**Usage Examples:**
```javascript
# Lists
let numbers = [1, 2, 3, 4, 5]
let first = numbers / 0        # Index access → 1
let extended = numbers * [6, 7]  # Concatenate → [1,2,3,4,5,6,7]
let appended = numbers + 8     # Append → [1,2,3,4,5,8]
let removed = numbers - 2      # Remove at index → [1,2,4,5]

# Nested lists
let matrix = [[1, 2], [3, 4], [5, 6]]
let row = matrix / 0          # [1, 2]
let element = row / 1         # 2

# Dictionaries
let person = {"name": "Alice", "age": 25, "active": True}
let name = person / "name"    # "Alice"
let age = person / "age"      # 25

# Nested dictionaries
let config = {
    "database": {"host": "localhost", "port": 5432},
    "cache": {"enabled": True}
}
let db_host = (config / "database") / "host"  # "localhost"

# Mixed types
let data = [42, "text", [1, 2], {"key": "value"}]
```

---

## Feature 8: Control Flow Structures

### Description
FxPy supports comprehensive control flow mechanisms including conditional statements (if/elif/else), iteration loops (for, while), and flow control keywords (break, continue, return). These enable complex program logic and decision-making.

### Why It Matters
Control flow is essential for any programming language. It allows programs to make decisions, repeat operations, and respond to different conditions. FxPy's control flow is Python-inspired for familiarity but with its own syntax.

### How It Works
1. **If/Elif/Else**: Multi-branch conditional execution
2. **For Loops**: Iterate over ranges or collections
3. **While Loops**: Conditional repetition
4. **Break/Continue**: Loop control (exit early or skip iteration)
5. **Return**: Exit functions with values
6. All control structures require explicit `end` keyword for clarity

### Implementation

**AST Nodes (`fxparser.py`):**
```python
class IfNode:
    def __init__(self, cases, else_case):
        self.cases = cases  # List of (condition, body) tuples
        self.else_case = else_case
        
class ForNode:
    def __init__(self, var_name_tok, start_value_node, 
                 end_value_node, step_value_node, body_node):
        self.var_name_tok = var_name_tok
        self.start_value_node = start_value_node
        self.end_value_node = end_value_node
        self.step_value_node = step_value_node
        self.body_node = body_node

class WhileNode:
    def __init__(self, condition_node, body_node):
        self.condition_node = condition_node
        self.body_node = body_node
```

**Execution (`interpreter.py`):**
```python
def visit_IfNode(self, node, context):
    # Evaluate conditions in order
    for condition, expr in node.cases:
        condition_value = res.register(self.visit(condition, context))
        
        if condition_value.is_true():
            # Execute this branch
            expr_value = res.register(self.visit(expr, context))
            return res.success(expr_value)
    
    # Execute else branch if no conditions matched
    if node.else_case:
        else_value = res.register(self.visit(node.else_case[0], context))
        return res.success(else_value)
```

**Usage Examples:**
```javascript
# If/Elif/Else
let score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")
end

# For loop with range
for i in range(5):
    print("Iteration: " + str(i))
end

# For loop with step
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8
end

# While loop
let count = 0
while count < 5:
    print("Count: " + str(count))
    count = count + 1
end

# Break and continue
for i in range(10):
    if i == 3:
        continue  # Skip 3
    end
    if i == 7:
        break  # Stop at 7
    end
    print(i)  # 0, 1, 2, 4, 5, 6
end

# Nested control flow
for i in range(3):
    for j in range(3):
        if i == j:
            print("Diagonal: " + str(i) + "," + str(j))
        end
    end
end
```

---

## Feature 9: Comprehensive Built-in Functions

### Description
FxPy includes 25+ built-in functions covering I/O operations, type conversions, list manipulations, string operations, and utilities. These functions are globally available and implemented in Python for efficiency.

### Why It Matters
Built-in functions provide essential functionality without requiring module imports. They make the language immediately useful for common tasks like printing output, getting user input, type conversions, and data manipulation.

### How It Works
1. Built-in functions are registered in the global symbol table at startup
2. Each function is implemented as a Python function wrapped in `BuiltInFunction` class
3. Functions have access to the execution context
4. Type checking and error handling are built-in
5. Functions follow Python naming conventions for familiarity

### Implementation

**Built-in Function Registration (`interpreter.py`):**
```python
global_symbol_table = SymbolTable()

# I/O Functions
global_symbol_table.set("print", BuiltInFunction("print"))
global_symbol_table.set("input", BuiltInFunction("input"))
global_symbol_table.set("clear", BuiltInFunction("clear"))

# Type Functions
global_symbol_table.set("type", BuiltInFunction("type"))
global_symbol_table.set("len", BuiltInFunction("len"))
global_symbol_table.set("str", BuiltInFunction("str"))
global_symbol_table.set("int", BuiltInFunction("int"))
global_symbol_table.set("float", BuiltInFunction("float"))

# Utility Functions
global_symbol_table.set("range", BuiltInFunction("range"))
global_symbol_table.set("get_symbols", BuiltInFunction("get_symbols"))
global_symbol_table.set("eval", BuiltInFunction("eval"))
```

**Function Execution:**
```python
class BuiltInFunction(BaseFunction):
    def execute(self, args, kwargs):
        method_name = f'execute_{self.name}'
        method = getattr(self, method_name, self.no_execute_method)
        return method(exec_ctx)
    
    def execute_print(self, exec_ctx):
        # Print value to console
        value = exec_ctx.symbol_table.get('value')
        print(str(value))
        return RTResult().success(Number.null)
    
    def execute_len(self, exec_ctx):
        # Get length of list or string
        value = exec_ctx.symbol_table.get('value')
        if isinstance(value, List):
            return RTResult().success(Number(len(value.elements)))
        elif isinstance(value, String):
            return RTResult().success(Number(len(value.value)))
```

**Available Built-in Functions:**

**I/O Operations:**
- `print(value)` - Output to console
- `input(prompt)` - Get user input
- `clear()` - Clear console screen

**Type Conversion:**
- `str(value)` - Convert to string
- `int(value)` - Convert to integer
- `float(value)` - Convert to float
- `bool(value)` - Convert to boolean

**Type Checking:**
- `type(value)` - Get type name
- `is_number(value)` - Check if number
- `is_string(value)` - Check if string
- `is_list(value)` - Check if list
- `is_dict(value)` - Check if dictionary
- `is_function(value)` - Check if function

**List Operations:**
- `len(list_or_string)` - Get length
- `append(list, element)` - Add element
- `pop(list, index)` - Remove and return element
- `extend(list1, list2)` - Concatenate lists

**Utilities:**
- `range(start, end, step)` - Generate number sequence
- `get_symbols()` - List all variables/functions in scope
- `eval(code_string)` - Execute FxPy code dynamically
- `exit()` - Exit interpreter

**Usage Examples:**
```javascript
# I/O
print("Hello, World!")
let name = input("Enter your name: ")
print("Hello, " + name)

# Type conversion
let num_str = "42"
let num = int(num_str)         # 42
let pi = float("3.14159")      # 3.14159
let text = str(100)            # "100"

# Type checking
let x = 42
print(type(x))                 # "Number"
print(is_number(x))           # True
print(is_string(x))           # False

# List operations
let items = [1, 2, 3]
print(len(items))             # 3
append(items, 4)              # [1, 2, 3, 4]
let last = pop(items, -1)     # Remove last element
extend(items, [5, 6])         # [1, 2, 3, 5, 6]

# Range
for i in range(10):
    print(i)
end

for i in range(5, 15, 2):
    print(i)  # 5, 7, 9, 11, 13
end

# Utilities
get_symbols()                 # List all defined variables/functions
eval("let x = 100")          # Execute code dynamically
```

---

## Feature 10: Operator Overloading for Intuitive Syntax

### Description
FxPy implements operator overloading to provide intuitive operations on different data types. Operators behave contextually based on operand types, making the language feel natural and reducing verbosity.

### Why It Matters
Operator overloading makes code more readable and expressive. Instead of calling methods like `list.append(element)`, you can use `list + element`. This makes FxPy feel more like a designed language rather than a simple scripting tool.

### How It Works
1. Each value type (Number, String, List, Dict) implements operation methods
2. Operators are mapped to method calls during interpretation
3. Type checking ensures operations are valid for given types
4. Runtime errors with helpful messages when incompatible types are used
5. Some operators have multiple behaviors depending on context

### Implementation

**Binary Operations (`interpreter.py`):**
```python
def visit_BinOpNode(self, node, context):
    left = res.register(self.visit(node.left_node, context))
    right = res.register(self.visit(node.right_node, context))
    
    if node.op_tok.type == TT_PLUS:
        result, error = left.added_to(right)
    elif node.op_tok.type == TT_MINUS:
        result, error = left.subbed_by(right)
    elif node.op_tok.type == TT_MUL:
        result, error = left.multed_by(right)
    elif node.op_tok.type == TT_DIV:
        result, error = left.dived_by(right)
    # ... more operators
    
    if error:
        return res.failure(error)
    return res.success(result.set_pos(node.pos_start, node.pos_end))
```

**Operator Implementations:**
```python
# Number operations
class Number(Value):
    def added_to(self, other):
        if isinstance(other, Number):
            return Number(self.value + other.value), None
        else:
            return None, Value.illegal_operation(self, other)
    
    def multed_by(self, other):
        if isinstance(other, Number):
            return Number(self.value * other.value), None

# String operations
class String(Value):
    def added_to(self, other):
        # String concatenation
        if isinstance(other, String):
            return String(self.value + other.value), None
        else:
            return None, Value.illegal_operation(self, other)
    
    def multed_by(self, other):
        # String repetition
        if isinstance(other, Number):
            return String(self.value * int(other.value)), None

# List operations
class List(Value):
    def added_to(self, other):
        # Append element
        new_list = self.copy()
        new_list.elements.append(other)
        return new_list, None
    
    def multed_by(self, other):
        # List concatenation
        if isinstance(other, List):
            new_list = self.copy()
            new_list.elements.extend(other.elements)
            return new_list, None
    
    def dived_by(self, other):
        # List indexing
        if isinstance(other, Number):
            idx = int(other.value)
            return self.elements[idx], None
```

**Operator Behavior by Type:**

| Operator | Number | String | List | Dict |
|----------|--------|--------|------|------|
| `+` | Addition | Concatenation | Append element | ❌ |
| `-` | Subtraction | ❌ | Remove by index | ❌ |
| `*` | Multiplication | Repetition | Concatenate lists | ❌ |
| `/` | Division | ❌ | Index access | Key access |
| `^` | Exponentiation | ❌ | ❌ | ❌ |
| `%` | Modulo | ❌ | ❌ | ❌ |
| `==` | Equality | Equality | Equality | Equality |
| `!=` | Inequality | Inequality | Inequality | Inequality |

**Usage Examples:**
```javascript
# Number operators
let sum = 10 + 5              # 15
let diff = 10 - 5             # 5
let product = 10 * 5          # 50
let quotient = 10 / 5         # 2.0
let power = 2 ^ 8             # 256
let mod = 10 % 3              # 1

# String operators
let greeting = "Hello" + " " + "World"   # "Hello World"
let repeated = "Ha" * 3                  # "HaHaHa"

# List operators
let nums = [1, 2, 3]
let appended = nums + 4                  # [1, 2, 3, 4]
let concatenated = nums * [5, 6]         # [1, 2, 3, 5, 6]
let removed = nums - 1                   # [1, 3] (remove index 1)
let first = nums / 0                     # 1 (index access)

# Dictionary operators
let person = {"name": "Alice", "age": 25}
let name = person / "name"               # "Alice" (key access)

# Comparison operators (work on all types)
let equal = 10 == 10                     # True
let not_equal = "hi" != "bye"           # True
let greater = 15 > 10                    # True
let less_or_equal = 5 <= 5              # True

# Logical operators
let and_result = True and False          # False
let or_result = True or False            # True
let not_result = not True                # False
```

---

## Summary of Features

| Feature | Description | Benefit |
|---------|-------------|---------|
| **Dynamic Typing** | Runtime type checking, flexible variables | Easy to learn, rapid prototyping |
| **First-Class Functions** | Functions as values, closures, arrow syntax | Functional programming, higher-order functions |
| **Module System** | Import/export with multiple syntaxes | Code organization, reusability |
| **Variadic Functions** | *args and **kwargs support | Flexible APIs, utility functions |
| **Error Reporting** | Visual context, position tracking | Faster debugging, better DX |
| **Interactive REPL** | Live code execution | Learning, experimentation |
| **Data Structures** | Lists and dictionaries with rich operations | Complex data modeling |
| **Control Flow** | If/elif/else, for, while, break, continue | Program logic and decision-making |
| **Built-in Functions** | 25+ functions for common tasks | Immediate productivity |
| **Operator Overloading** | Intuitive operations for different types | Expressive, readable code |

Each feature is designed to make FxPy both powerful and accessible, demonstrating modern language design principles in an educational context.
