# FxPy Programming Language

FxPy is a dynamically-typed, interpreted programming language written in Python. It features a clean syntax with support for functions, control flow, imports, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Language Syntax](#language-syntax)
  - [Variables](#variables)
  - [Data Types](#data-types)
  - [Operators](#operators)
  - [Functions](#functions)
  - [Control Flow](#control-flow)
  - [Loops](#loops)
  - [Imports](#imports)
  - [Comments](#comments)
- [Built-in Functions](#built-in-functions)
- [Examples](#examples)

## Installation

### Prerequisites

- Python 3.11 or higher

### Setup

```bash
# Clone the repository
git clone https://github.com/KazimFedxD/FxPy.git
cd FxPy

# Run the shell
python shell.py
```

## Usage

### Interactive Mode (REPL)

Start the interactive shell:

```bash
python shell.py
```

Then you can execute FxPy code interactively:

```
FxPy > let x = 10
FxPy > print(x * 2)
20
```

### Running a File

Create a `.fx` file and run it:

```bash
python shell.py myprogram.fx
```

## Language Syntax

### Variables

Variables are declared using the `let` keyword:

```js
let x = 10
let name = "Alice"
let isActive = True
let items = [1, 2, 3, 4, 5]
let person = {"name": "Bob", "age": 30}
```

### Data Types

FxPy supports the following data types:

#### Numbers
```javascript
let integer = 42
let float_num = 3.14
let negative = -15
```

#### Strings
```javascript
let greeting = "Hello, World!"
let multiline = "Line 1
Line 2"
```

String concatenation:
```javascript
let result = "Hello" + " " + "World"  # "Hello World"
```

#### Booleans
```javascript
let isTrue = True
let isFalse = False
```

#### Lists
```javascript
let numbers = [1, 2, 3, 4, 5]
let mixed = [1, "two", 3.0, True]
let empty = []
```

List operations:
```javascript
let items = [1, 2, 3]
items / 0           # Access element at index 0 → 1
items * [4, 5]      # Concatenate lists → [1, 2, 3, 4, 5]
items + 6           # Append element → [1, 2, 3, 6]
items - 1           # Remove element at index 1 → [1, 3]
```

#### Dictionaries
```javascript
let person = {"name": "Alice", "age": 25}
let empty_dict = {}
```

#### Null
```javascript
let nothing = Null
```

### Operators

#### Arithmetic Operators
```javascript
let sum = 10 + 5        # 15
let diff = 10 - 5       # 5
let product = 10 * 5    # 50
let quotient = 10 / 5   # 2
let power = 2 ^ 3       # 8
let modulo = 10 % 3     # 1
```

#### Comparison Operators
```javascript
let equal = 10 == 10           # True
let not_equal = 10 != 5        # True
let less = 5 < 10              # True
let greater = 10 > 5           # True
let less_equal = 5 <= 5        # True
let greater_equal = 10 >= 5    # True
```

#### Logical Operators
```javascript
let and_result = True and False    # False
let or_result = True or False      # True
let not_result = not True          # False
```

### Functions

#### Function Declaration

Functions are declared using the `fex` keyword:

```javascript
# Simple function
fex greet():
    print("Hello!")
end

# Function with parameters
fex add(a, b):
    return a + b
end

# Function with default parameters
fex greet_person(name="Guest"):
    return "Hello, " + name
end

# Arrow function (single expression)
fex square(x) -> return x * x

# Function with multiple optional parameters
fex create_user(name, age=0, active=True):
    return {"name": name, "age": age, "active": active}
end
```

#### Variadic Functions (*args and **kwargs)

FxPy supports variadic functions using `*args` and `**kwargs`:

**Positional Variable Arguments (*args):**

```javascript
# *args collects all positional arguments into a list
fex sum(*numbers):
    let total = 0
    for num in numbers:
        total = total + num
    end
    return total
end

print(sum(1, 2, 3, 4, 5))  # 15
print(sum(10, 20))          # 30
```

**Keyword Variable Arguments (**kwargs):**

```javascript
# **kwargs collects all keyword arguments into a dictionary
fex create_config(**options):
    let config = options
    return config
end

let cfg = create_config(debug=True, port=8080, host="localhost")
print(cfg)  # {"debug": True, "port": 8080, "host": "localhost"}
```

**Combining Regular Parameters with Variadic:**

```javascript
# Regular params, then *args, then **kwargs
fex log_message(level, *messages, **metadata):
    let msg = ""
    for m in messages:
        msg = msg + m + " "
    end
    return {"level": level, "message": msg, "metadata": metadata}
end

let log = log_message("INFO", "User", "logged", "in", user_id=123, session="abc")
# {"level": "INFO", "message": "User logged in ", "metadata": {"user_id": 123, "session": "abc"}}
```

#### Calling Functions

```javascript
# Call without arguments
greet()

# Call with positional arguments
let result = add(5, 3)

# Call with keyword arguments
let user = create_user("Alice", age=25, active=True)

# Call with mixed arguments
let another = create_user("Bob", active=False)

# Call with default parameters
greet_person()              # "Hello, Guest"
greet_person("Alice")       # "Hello, Alice"
```

#### Recursive Functions

FxPy supports recursive functions:

```javascript
fex factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
    end
end

print(factorial(5))  # 120
```

### Control Flow

#### If-Else Statements

```javascript
let age = 18

if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")
end
```

Multiple conditions:

```javascript
let x = 10
let y = 20

if x > 5 and y < 30:
    print("Both conditions are true")
end
```

### Loops

#### For Loop

```javascript
# Loop with range
for i = 0 to 10:
    print(i)
end

# Loop with step
for i = 0 to 10 step 2:
    print(i)  # 0, 2, 4, 6, 8, 10
end

# Loop through a list
let items = [1, 2, 3, 4, 5]
for i = 0 to len(items) - 1:
    print(items / i)
end
```

#### While Loop

```javascript
let count = 0
while count < 5:
    print(count)
    let count = count + 1
end
```

#### Break and Continue

```javascript
# Break - exit the loop
for i = 0 to 10:
    if i == 5:
        break
    end
    print(i)
end

# Continue - skip to next iteration
for i = 0 to 10:
    if i % 2 == 0:
        continue
    end
    print(i)  # Only prints odd numbers
end
```

### Imports

#### Basic Import

Import modules using the `import` keyword. Imported symbols are prefixed with the module name using dot notation:

```javascript
# Import a module
import math

# Use imported functions with dot notation
print(math.factorial(5))
print(math.root(27, 3))
```

Or with `.fx` extension:

```javascript
import math.fx

# Symbols are saved as <file_name>.<var_name>
print(math.factorial(5))
```

#### Import with Alias

You can import a module with a custom alias using the `as` keyword:

```javascript
import math as m

# Use the alias
print(m.factorial(5))
print(m.root(16, 2))
```

#### From Import (Selective Import)

Import specific symbols directly without prefix using `from`:

```javascript
from math import factorial, root

# Use functions directly without module prefix
print(factorial(5))
print(root(27, 3))
```

You can also use aliases with `from` imports:

```javascript
from math import factorial as fact

print(fact(5))  # 120
```

#### Module Structure

Modules are just `.fx` files containing function definitions:

**math.fx:**
```javascript
fex factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
    end
end

fex root(x, n=2):
    return x ^ (1 / n)
end
```

**main.fx:**
```javascript
import math

# Access with dot notation
print(math.factorial(5))    # 120
print(math.root(16, 2))     # 4.0
```

**Note:** Imports are resolved relative to the importing file's directory, so if your files are in the same folder, you can import them directly.

### Comments

```javascript
# This is a single-line comment

# You can use comments to explain your code
let x = 10  # Inline comment
```

## Built-in Functions

FxPy provides several built-in functions:

### I/O Functions

```javascript
print(value)                    # Print value to console (takes single string)
                               # Use + to concatenate multiple strings
input(prompt)                   # Get user input (returns string)
clear()                         # Clear the console
```

**Note:** `print()` accepts a single string argument. To print multiple values, concatenate them with `+`:

```javascript
# Correct usage
print("Hello, World!")
print("Result: " + str(42))
print("Sum: " + str(10 + 5))

# Multiple values - use concatenation
let name = "Alice"
let age = 25
print("Name: " + name + ", Age: " + str(age))

# NOT supported
# print("Hello", "World")  # This will not work
```

### Type Functions

```javascript
type(value)                     # Get the type of a value
convert(value, target_type)     # Convert value to target type
                               # Types: "number", "string"
```

Example:
```javascript
let x = "42"
let num = convert(x, "number")  # Convert string to number
let str = convert(123, "string") # Convert number to string
```

### Utility Functions

```javascript
len(collection)                 # Get length of list or string
eval(code_string)              # Evaluate FxPy code from string
get_symbols()                  # Get list of all defined symbols
exit()                         # Exit the program
random_choices(list)           # Get random element from list
```

Examples:
```javascript
let items = [1, 2, 3, 4, 5]
print(len(items))              # 5

let name = "Alice"
print(len(name))               # 5

let result = eval("10 + 20")   # 30

let symbols = get_symbols()    # List of all variables and functions

let dice = [1, 2, 3, 4, 5, 6]
print(random_choices(dice))    # Random number from 1 to 6
```

## Examples

### Example 1: Hello World

```javascript
print("Hello, World!")
```

### Example 2: Calculator

```javascript
fex add(a, b) -> return a + b
fex subtract(a, b) -> return a - b
fex multiply(a, b) -> return a * b
fex divide(a, b) -> return a / b

print("Calculator")
print("10 + 5 = " + str(add(10, 5)))
print("10 - 5 = " + str(subtract(10, 5)))
print("10 * 5 = " + str(multiply(10, 5)))
print("10 / 5 = " + str(divide(10, 5)))
```

### Example 3: Factorial Calculator

```javascript
fex factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
    end
end

print("Factorial of 5: " + str(factorial(5)))
print("Factorial of 10: " + str(factorial(10)))
```

### Example 4: FizzBuzz

```javascript
for i = 1 to 100:
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
    end
end
```

### Example 5: Using Imports

**math_utils.fx:**
```javascript
fex square(x) -> return x * x

fex cube(x) -> return x * x * x

fex is_even(n) -> return n % 2 == 0
```

**main.fx:**
```javascript
import math_utils

# Use dot notation to access imported functions
print(math_utils.square(5))      # 25
print(math_utils.cube(3))        # 27
print(math_utils.is_even(4))     # True
print(math_utils.is_even(7))     # False

# Or use selective import
from math_utils import square, is_even

print(square(10))                # 100
print(is_even(6))                # True
```

### Example 6: List Operations

```javascript
let numbers = [1, 2, 3, 4, 5]

# Access elements
print(numbers / 0)              # 1

# Append element
let numbers = numbers + 6
print(numbers)                  # [1, 2, 3, 4, 5, 6]

# Concatenate lists
let more = numbers * [7, 8, 9]
print(more)                     # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Remove element at index
let numbers = numbers - 0
print(numbers)                  # [2, 3, 4, 5, 6]
```

### Example 7: Working with Dictionaries

```javascript
let person = {"name": "Alice", "age": 25, "city": "New York"}

print(person / "name")          # "Alice"
print(person / "age")           # 25
```

### Example 8: User Input

```javascript
let name = input("Enter your name: ")
print("Hello, " + name + "!")

let age = convert(input("Enter your age: "), "number")

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
end
```

### Example 9: Advanced Functions with Keyword Arguments

```javascript
fex create_user(name, age=18, country="USA", active=True):
    let user = {
        "name": name,
        "age": age,
        "country": country,
        "active": active
    }
    return user
end

# Different ways to call
let user1 = create_user("Alice")
let user2 = create_user("Bob", age=25)
let user3 = create_user("Charlie", country="UK", age=30)
let user4 = create_user("Diana", active=False, age=22)

print(user1)
print(user2)
print(user3)
print(user4)
```

## Architecture & Technology

### Overview

FxPy is a custom-built interpreted programming language implemented in pure Python with no external dependencies. The interpreter follows a traditional three-phase architecture: Lexical Analysis → Parsing → Interpretation.

### Three-Phase Interpretation Pipeline

1. **Lexer (Tokenization)** - `lexer.py`
   - Converts raw source code into a stream of tokens
   - Recognizes keywords, operators, literals, and identifiers
   - Handles whitespace, comments, and newlines
   - Token types: `IDENTIFIER`, `NUMBER`, `STRING`, `KEYWORD`, operators (`+`, `-`, `*`, `/`, etc.)

2. **Parser (AST Generation)** - `fxparser.py`
   - Constructs an Abstract Syntax Tree (AST) from tokens
   - Implements recursive descent parsing with precedence climbing for expressions
   - Validates syntax and reports parse errors with context
   - AST Node types: `VarAssignNode`, `FuncDefNode`, `IfNode`, `ForNode`, `WhileNode`, `BinOpNode`, etc.
   - Supports lookahead for context-sensitive parsing (e.g., keyword arguments)

3. **Interpreter (Tree-Walking Evaluation)** - `interpreter.py`
   - Traverses the AST and executes nodes using the Visitor pattern
   - Manages execution state through Context objects and Symbol Tables
   - Handles variable scoping, function calls, and control flow
   - Implements dynamic typing with runtime type checking

### Core Components

**Token System:**
- Lightweight token representation with type, value, position tracking
- Position tracking enables precise error reporting with `string_with_arrows.py`

**Symbol Table:**
- Hierarchical scope management (global → module → function scopes)
- Stores variables, functions, and imported modules
- Supports variable shadowing and closure-like behavior

**Context Management:**
- Tracks execution context for error reporting
- Manages parent-child context relationships for nested scopes
- Stores symbol table references and display names for imports

**Error Handling:**
- Rich error types: `IllegalCharError`, `InvalidSyntaxError`, `RTError`
- Position-aware error messages with visual indicators
- Stack trace support for runtime errors

**Runtime System:**
- Dynamic type system with `Number`, `String`, `List`, `Dict`, `Function` types
- Built-in functions implemented as native Python functions
- Module import system with relative path resolution

### Technology Stack

- **Language:** Pure Python 3.11+
- **Dependencies:** None (stdlib only)
- **Paradigm:** Interpreted, dynamically-typed, imperative with functional features
- **Design Pattern:** Visitor pattern for AST traversal, Symbol Table for scoping
- **Parsing Technique:** Recursive Descent with Operator Precedence Climbing

### Key Design Decisions

- **No External Dependencies:** Makes installation trivial (just Python 3.11+)
- **Pure Python Implementation:** Maximizes portability and ease of contribution
- **AST-Based Evaluation:** Enables potential future optimizations and tooling (e.g., syntax highlighting, static analysis)
- **Dynamic Typing:** Simplifies syntax and allows flexible programming patterns
- **Context-Aware Errors:** Provides helpful error messages with line numbers and visual indicators

## Language Features

- ✅ Dynamic typing
- ✅ Variables with `let` keyword
- ✅ Functions with default and keyword arguments
- ✅ Recursive functions
- ✅ Arrow functions for simple expressions
- ✅ If-elif-else conditionals
- ✅ For and while loops
- ✅ Break and continue statements
- ✅ Lists and dictionaries
- ✅ Module imports (relative path)
- ✅ Built-in functions for common operations
- ✅ String concatenation
- ✅ Type conversion
- ✅ Comments

## Project Structure

```
FxPy/
├── shell.py              # Interactive REPL
├── run.py                # Code execution engine
├── lexer.py              # Tokenizer
├── fxparser.py           # Parser (AST generation)
├── interpreter.py        # Interpreter (AST evaluation)
├── errors.py             # Error handling
├── string_with_arrows.py # Error display utilities
├── modules/              # Standard library modules
│   ├── math.fx          # Math utilities
│   └── ...
└── README.md            # This file
```

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

[Specify your license here]

## Author

**KazimFedxD**
- GitHub: [@KazimFedxD](https://github.com/KazimFedxD)

## Acknowledgments

Built with Python and passion for programming languages! 🚀
