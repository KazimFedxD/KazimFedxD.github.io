// FxPy Programming Language Project Data
// Comprehensive data extracted from projects/FxPy/ markdown files
// ~3,300 lines of Python code implementing a complete interpreted language

export const fxpyData = {
  // ============================================================
  // BASIC METADATA
  // ============================================================
  title: "FxPy - Custom Programming Language",
  shortDescription: "A dynamically-typed, interpreted programming language built from scratch in Python with support for functions, control flow, modules, and comprehensive error reporting.",
  
  github: "https://github.com/KazimFedxD/FxPy",
  
  badges: [
    { icon: "Rocket", text: "Pure Python Implementation" },
    { icon: "Wrench", text: "Zero Dependencies" },
    { icon: "BookOpen", text: "Educational Project" },
    { icon: "Zap", text: "~3,300 Lines of Code" }
  ],

  techStack: [
    { name: "Python", version: "3.11+", category: "Implementation Language" },
    { name: "Custom Lexer", version: "305 lines", category: "Parsing" },
    { name: "Recursive Descent Parser", version: "1,407 lines", category: "Parsing" },
    { name: "Tree-Walking Interpreter", version: "1,393 lines", category: "Runtime" },
    { name: "Visitor Pattern", version: "Design Pattern", category: "Architecture" },
    { name: "Symbol Tables", version: "Lexical Scoping", category: "Runtime" }
  ],

  // ============================================================
  // OVERVIEW
  // ============================================================
  overview: {
    description: "FxPy is a custom-built, dynamically-typed interpreted programming language implemented entirely in Python. Born from the desire to understand how programming languages work under the hood, FxPy demonstrates the complete process of language design and implementation—from lexical analysis to code execution. The language features a clean, Python-inspired syntax while implementing its own unique characteristics, including a powerful module system, variadic functions, and comprehensive error reporting. FxPy serves both as a functional programming language and an educational resource for understanding compiler/interpreter design.",
    
    problemIntro: "Understanding how programming languages work is often abstract and theoretical:",
    
    problemStatement: [
      "Conceptual Gap: Most developers use languages without understanding parsing, ASTs, and execution models",
      "Complex Setup: Professional compilers/interpreters have thousands of dependencies and complex build systems",
      "Limited Examples: Few complete, readable language implementations exist for learning",
      "Incomplete Tutorials: Most teaching resources show toy calculators, not full languages",
      "Hidden Internals: Production languages optimize readability away in favor of performance"
    ],

    howWeSolve: [
      {
        problem: "Conceptual Gap",
        solution: "FxPy implements a complete language pipeline (lexer → parser → interpreter) in ~3,300 lines of readable Python code, demonstrating every phase of language execution.",
        benefit: "Students can trace exactly how 'let x = 42' becomes a token stream, AST node, and finally a runtime value."
      },
      {
        problem: "Complex Setup",
        solution: "Zero dependencies beyond Python 3.11+ stdlib. No build system, no C extensions, no package managers—just run shell.py and start coding.",
        benefit: "Anyone can install Python and start learning language implementation within 60 seconds."
      },
      {
        problem: "Limited Examples",
        solution: "FxPy includes modules, closures, variadic functions, keyword arguments, error handling, and an interactive REPL—demonstrating real language features.",
        benefit: "Learn production concepts like symbol tables, scope resolution, and import systems in a digestible codebase."
      },
      {
        problem: "Incomplete Tutorials",
        solution: "Complete implementation with 40+ token types, 20+ AST node types, 25+ built-in functions, and a module system—not just arithmetic.",
        benefit: "See how real languages handle control flow, functions, data structures, and error reporting."
      },
      {
        problem: "Hidden Internals",
        solution: "Every component prioritizes clarity over optimization. Each class, method, and design decision is documented and readable.",
        benefit: "Use FxPy as a teaching tool in compiler courses or for self-study of language implementation."
      }
    ],

    targetAudience: [
      "Computer Science Students learning compiler/interpreter design through practical examples",
      "Language Enthusiasts exploring how parsing, ASTs, and runtime execution work",
      "Developers curious about interpreter internals and language implementation",
      "Educators teaching programming language theory with runnable code examples",
      "Hobbyists interested in creating their own domain-specific languages"
    ],

    uniqueFeatures: [
      {
        icon: "Target",
        title: "Complete Language Implementation",
        points: [
          "Full module/import system with relative path resolution",
          "Variadic functions with *args and **kwargs support",
          "First-class functions with closure support",
          "Rich data types: Numbers, Strings, Lists, Dictionaries",
          "25+ built-in functions for I/O, type conversion, list ops"
        ]
      },
      {
        icon: "BookOpen",
        title: "Educational & Readable",
        points: [
          "~3,300 lines of clean, documented Python code",
          "Clear separation: lexer.py, fxparser.py, interpreter.py",
          "Visitor pattern for AST traversal",
          "Position tracking for precise error messages",
          "Zero external dependencies—stdlib only"
        ]
      },
      {
        icon: "Zap",
        title: "Modern Language Features",
        points: [
          "Arrow functions: fex square(x) -> return x * x",
          "Keyword arguments: func(x=10, y=20)",
          "Dict/List syntax: {'key': 'value'}, [1, 2, 3]",
          "Import variants: import, import as, from...import",
          "Operator overloading for intuitive data structure operations"
        ]
      },
      {
        icon: "Wrench",
        title: "Real-World Applicability",
        points: [
          "Interactive REPL for experimentation",
          "File execution with script loading",
          "Module system for code organization",
          "Comprehensive error reporting with visual context",
          "Extensible architecture for adding features"
        ]
      }
    ],

    useCases: [
      "Learning compiler/interpreter design from a complete, working implementation",
      "Teaching programming language concepts in CS courses with runnable examples",
      "Understanding lexical analysis, parsing, and AST construction",
      "Exploring symbol tables, scoping, and context management",
      "Prototyping domain-specific language ideas before building production versions",
      "Quick scripting for mathematical computations and data manipulation"
    ]
  },

  // ============================================================
  // FEATURES (10 comprehensive features)
  // ============================================================
  features: [
    {
      id: 1,
      title: "Dynamic Type System with Runtime Checking",
      icon: "Binary",
      description: "FxPy implements a dynamic type system where variables can hold any type of value, and type checking happens at runtime rather than compile time. The language supports Numbers (integers and floats), Strings, Lists, Dictionaries, and Functions as first-class values.",
      whyItMatters: "Dynamic typing provides flexibility for rapid prototyping and scripting tasks. It allows developers to focus on logic rather than type declarations, making the language more accessible to beginners while still powerful for advanced users.",
      howItWorks: [
        "Variables declared with 'let' keyword without type annotations",
        "Interpreter tracks types using specialized classes (Number, String, List, etc.)",
        "Type checking occurs during operations (e.g., can't add string to number)",
        "Automatic type coercion where appropriate (e.g., integer to float)",
        "Runtime errors with helpful messages when type mismatches occur"
      ],
      codeSnippets: [
        {
          title: "Number Type Implementation (interpreter.py)",
          language: "python",
          code: `class Number:
    def __init__(self, value):
        self.value = value
        self.set_pos()
        self.set_context()
    
    def added_to(self, other):
        if isinstance(other, Number):
            return Number(self.value + other.value).set_context(self.context)
        else:
            return None  # Type error`
        },
        {
          title: "FxPy Usage Example",
          language: "javascript",
          code: `let x = 42              # Number
let name = "FxPy"       # String
let items = [1, 2, 3]   # List
let config = {"debug": True}  # Dict

# Dynamic reassignment
x = "now a string"      # Valid in FxPy`
        }
      ]
    },

    {
      id: 2,
      title: "First-Class Functions with Closures",
      icon: "FunctionSquare",
      description: "Functions in FxPy are first-class citizens—they can be assigned to variables, passed as arguments, returned from other functions, and maintain closure over their defining scope. The language supports both traditional function syntax and arrow function syntax.",
      whyItMatters: "First-class functions enable functional programming paradigms, including higher-order functions, callbacks, and function composition. This makes the language more expressive and allows for powerful abstractions.",
      howItWorks: [
        "Functions defined using 'fex' keyword (short for 'function')",
        "Arrow syntax '->' allows single-expression functions",
        "Functions capture variables from enclosing scopes (closure)",
        "Function objects store name, parameters, body, and should_auto_return flag",
        "Symbol table maintains function references for calling"
      ],
      codeSnippets: [
        {
          title: "Function Definition Node (fxparser.py)",
          language: "python",
          code: `class FuncDefNode:
    def __init__(self, var_name_tok, arg_names, defaults, body, should_auto_return):
        self.var_name_tok = var_name_tok
        self.arg_names = arg_names
        self.defaults = defaults
        self.body = body
        self.should_auto_return = should_auto_return`
        },
        {
          title: "Function Object (interpreter.py)",
          language: "python",
          code: `class Function:
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
        # Return result`
        },
        {
          title: "FxPy Function Examples",
          language: "javascript",
          code: `# Traditional syntax
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
print(operation(5))  # 25`
        }
      ]
    },

    {
      id: 3,
      title: "Advanced Module System with Import Resolution",
      icon: "Package",
      description: "FxPy features a sophisticated module system that supports importing code from other .fx files with multiple import syntaxes: basic imports, aliased imports, and selective imports. The system uses relative path resolution based on the importing file's location.",
      whyItMatters: "Modular code organization is essential for building larger programs. The import system allows developers to split code into reusable modules, promoting code reuse and maintainability.",
      howItWorks: [
        "Parser recognizes 'import' and 'from' keywords",
        "Interpreter resolves file paths relative to importing file",
        "Imported file is lexed, parsed, and executed in isolated context",
        "Symbols from imported module registered in importing context",
        "Dot notation access: module.function() or direct with 'from'",
        "Module aliasing with 'as' keyword"
      ],
      codeSnippets: [
        {
          title: "Import Node Structure (fxparser.py)",
          language: "python",
          code: `class ImportNode:
    def __init__(self, module_name_tok, alias_tok=None, import_list=None):
        self.module_name_tok = module_name_tok
        self.alias_tok = alias_tok
        self.import_list = import_list  # For 'from' imports`
        },
        {
          title: "Import Resolution (interpreter.py)",
          language: "python",
          code: `def visit_ImportNode(self, node, context):
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
        context.symbol_table.set(f"{alias}.{key}", value)`
        },
        {
          title: "FxPy Import Examples",
          language: "javascript",
          code: `# Basic import
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
print(fact(5))`
        }
      ]
    },

    {
      id: 4,
      title: "Variadic Functions with *args and **kwargs",
      icon: "MoreHorizontal",
      description: "FxPy supports variadic functions through *args for collecting positional arguments and **kwargs for collecting keyword arguments. This allows functions to accept flexible numbers of parameters.",
      whyItMatters: "Variadic functions are essential for creating flexible APIs and utility functions. They enable patterns like sum functions, logging with metadata, configuration builders, and more—making FxPy suitable for real-world scripting tasks.",
      howItWorks: [
        "Parser recognizes *identifier and **identifier in parameter lists",
        "During function call, extra positional args collected into list",
        "Extra keyword args collected into dictionary",
        "Function receives args/kwargs as normal List/Dict parameters",
        "Can be combined with regular parameters and defaults"
      ],
      codeSnippets: [
        {
          title: "Variadic Parameter Parsing (fxparser.py)",
          language: "python",
          code: `def func_def(self):
    # Parse parameter list
    arg_names = []
    
    while self.current_tok.type == TT_IDENTIFIER:
        arg_name = self.current_tok
        
        # Check for *args or **kwargs
        if arg_name.value.startswith('**'):
            kwargs_name = arg_name.value[2:]
            arg_names.append(('kwargs', kwargs_name))
        elif arg_name.value.startswith('*'):
            args_name = arg_name.value[1:]
            arg_names.append(('args', args_name))`
        },
        {
          title: "FxPy Variadic Function Examples",
          language: "javascript",
          code: `# Positional variadic
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

print(log("ERROR", "Failed", "to", "connect", code=500, retry=True))`
        }
      ]
    },

    {
      id: 5,
      title: "Rich Error Reporting with Visual Context",
      icon: "Lightbulb",
      description: "FxPy provides comprehensive error reporting that shows exactly where errors occur in source code, with visual indicators pointing to the problematic location. Errors include position information, context, and helpful messages.",
      whyItMatters: "Good error messages are crucial for developer productivity. Instead of cryptic errors, FxPy shows the exact line, column, and context where errors occur, making debugging significantly easier—especially for students learning programming.",
      howItWorks: [
        "Every token tracks its position (line, column, file)",
        "Errors generated with position information",
        "string_with_arrows utility creates visual representation",
        "Error types: IllegalCharError, InvalidSyntaxError, RTError",
        "Runtime errors include stack traces showing call chain"
      ],
      codeSnippets: [
        {
          title: "Position Tracking (lexer.py)",
          language: "python",
          code: `class Position:
    def __init__(self, idx, ln, col, fn, ftxt):
        self.idx = idx    # Index in file
        self.ln = ln      # Line number
        self.col = col    # Column number
        self.fn = fn      # Filename
        self.ftxt = ftxt  # File text`
        },
        {
          title: "Error Display (string_with_arrows.py)",
          language: "python",
          code: `def string_with_arrows(text, pos_start, pos_end):
    # Extract relevant lines
    # Add arrow indicators (^) pointing to error
    # Return formatted string with context
    
    result = ''
    
    # Get the line with the error
    idx_start = max(text.rfind('\\n', 0, pos_start.idx), 0)
    idx_end = text.find('\\n', idx_start + 1)
    
    # Show line with arrows
    result += line + '\\n'
    result += ' ' * pos_start.col + '^' * (pos_end.col - pos_start.col)
    
    return result`
        }
      ],
      screenshot: "/screenshots/FxPy/repl-error.png"
    },

    {
      id: 6,
      title: "Interactive REPL with Live Feedback",
      icon: "RefreshCw",
      description: "FxPy includes an interactive Read-Eval-Print Loop (REPL) that allows developers to execute code line-by-line and see immediate results. Perfect for experimentation, learning, and quick calculations.",
      whyItMatters: "REPLs are invaluable for learning languages, testing code snippets, and debugging. They provide instant feedback and make the language more accessible for beginners while remaining useful for experienced developers.",
      howItWorks: [
        "Shell reads input from user",
        "Input passed to lexer, parser, and interpreter",
        "Result displayed immediately",
        "Errors caught and displayed without crashing",
        "Maintains state between commands (variables persist)",
        "Supports multi-line input for complex structures"
      ],
      codeSnippets: [
        {
          title: "REPL Implementation (shell.py)",
          language: "python",
          code: `import run

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
        print("\\nExiting...")
        break`
        }
      ],
      screenshot: "/screenshots/FxPy/repl-interactive.png"
    },

    {
      id: 7,
      title: "Rich Data Structures (Lists & Dictionaries)",
      icon: "BarChart3",
      description: "FxPy provides built-in support for two essential data structures: Lists (ordered collections) and Dictionaries (key-value mappings). These structures support intuitive operations and can be nested for complex data modeling.",
      whyItMatters: "Data structures are fundamental to any programming language. Lists enable working with sequences of data, while dictionaries allow for efficient key-based lookups and data organization.",
      howItWorks: [
        "Lists use bracket notation [...] with indexing and mutation",
        "Dictionaries use curly braces {key: value} for JSON-like data",
        "Operators overloaded: + for append, * for concat, / for index",
        "Both structures can contain mixed types and be nested",
        "Runtime type checking ensures operations are valid"
      ],
      codeSnippets: [
        {
          title: "List Operations (interpreter.py)",
          language: "python",
          code: `class List(Value):
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
            return self.elements[int(other.value)]`
        },
        {
          title: "FxPy Data Structure Examples",
          language: "javascript",
          code: `# Lists
let numbers = [1, 2, 3, 4, 5]
let first = numbers / 0        # Index → 1
let extended = numbers * [6, 7]  # Concat → [1,2,3,4,5,6,7]
let appended = numbers + 8     # Append → [1,2,3,4,5,8]

# Nested lists
let matrix = [[1, 2], [3, 4]]
let element = (matrix / 0) / 1  # 2

# Dictionaries
let person = {"name": "Alice", "age": 25}
let name = person / "name"    # "Alice"

# Nested dictionaries
let config = {"db": {"host": "localhost", "port": 5432}}
let host = (config / "db") / "host"  # "localhost"`
        }
      ]
    },

    {
      id: 8,
      title: "Control Flow Structures",
      icon: "GitBranch",
      description: "FxPy supports comprehensive control flow mechanisms including conditional statements (if/elif/else), iteration loops (for, while), and flow control keywords (break, continue, return).",
      whyItMatters: "Control flow is essential for any programming language. It allows programs to make decisions, repeat operations, and respond to different conditions.",
      howItWorks: [
        "If/Elif/Else for multi-branch conditional execution",
        "For loops iterate over ranges or collections",
        "While loops provide conditional repetition",
        "Break/Continue for loop control",
        "Return exits functions with values",
        "All control structures require explicit 'end' keyword"
      ],
      codeSnippets: [
        {
          title: "Control Flow AST Nodes (fxparser.py)",
          language: "python",
          code: `class IfNode:
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
        self.body_node = body_node`
        },
        {
          title: "FxPy Control Flow Examples",
          language: "javascript",
          code: `# If/Elif/Else
let score = 85
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
else:
    print("Grade: F")
end

# For loop
for i in range(5):
    print("Iteration: " + str(i))
end

# While loop
let count = 0
while count < 5:
    print("Count: " + str(count))
    count = count + 1
end

# Break and continue
for i in range(10):
    if i == 3: continue end  # Skip 3
    if i == 7: break end     # Stop at 7
    print(i)  # 0,1,2,4,5,6
end`
        }
      ]
    },

    {
      id: 9,
      title: "Comprehensive Built-in Functions (25+)",
      icon: "Wrench",
      description: "FxPy includes 25+ built-in functions covering I/O operations, type conversions, list manipulations, string operations, and utilities. These functions are globally available and implemented in Python for efficiency.",
      whyItMatters: "Built-in functions provide essential functionality without requiring module imports. They make the language immediately useful for common tasks like printing output, getting input, type conversions, and data manipulation.",
      howItWorks: [
        "Built-in functions registered in global symbol table at startup",
        "Each function implemented as Python function wrapped in BuiltInFunction class",
        "Functions have access to execution context",
        "Type checking and error handling are built-in",
        "Functions follow Python naming conventions"
      ],
      codeSnippets: [
        {
          title: "Built-in Function Registration (interpreter.py)",
          language: "python",
          code: `global_symbol_table = SymbolTable()

# I/O Functions
global_symbol_table.set("print", BuiltInFunction("print"))
global_symbol_table.set("input", BuiltInFunction("input"))

# Type Functions
global_symbol_table.set("type", BuiltInFunction("type"))
global_symbol_table.set("len", BuiltInFunction("len"))
global_symbol_table.set("str", BuiltInFunction("str"))
global_symbol_table.set("int", BuiltInFunction("int"))

# Utility Functions
global_symbol_table.set("range", BuiltInFunction("range"))
global_symbol_table.set("eval", BuiltInFunction("eval"))`
        },
        {
          title: "FxPy Built-in Function Examples",
          language: "javascript",
          code: `# I/O
print("Hello, World!")
let name = input("Enter name: ")

# Type conversion
let num = int("42")         # 42
let pi = float("3.14")      # 3.14
let text = str(100)         # "100"

# Type checking
print(type(42))             # "Number"
print(is_number(42))        # True

# List operations
let items = [1, 2, 3]
print(len(items))           # 3
append(items, 4)
let last = pop(items, -1)

# Range
for i in range(10):
    print(i)
end`
        }
      ]
    },

    {
      id: 10,
      title: "Operator Overloading for Intuitive Syntax",
      icon: "Plus",
      description: "FxPy implements operator overloading to provide intuitive operations on different data types. Operators behave contextually based on operand types, making the language feel natural and reducing verbosity.",
      whyItMatters: "Operator overloading makes code more readable and expressive. Instead of calling methods, you can use natural operators like + for append or / for indexing.",
      howItWorks: [
        "Each value type implements operation methods (added_to, multed_by, etc.)",
        "Operators mapped to method calls during interpretation",
        "Type checking ensures operations are valid",
        "Runtime errors with helpful messages for incompatible types",
        "Some operators have multiple behaviors depending on context"
      ],
      codeSnippets: [
        {
          title: "Binary Operations (interpreter.py)",
          language: "python",
          code: `def visit_BinOpNode(self, node, context):
    left = res.register(self.visit(node.left_node, context))
    right = res.register(self.visit(node.right_node, context))
    
    if node.op_tok.type == TT_PLUS:
        result, error = left.added_to(right)
    elif node.op_tok.type == TT_MUL:
        result, error = left.multed_by(right)
    elif node.op_tok.type == TT_DIV:
        result, error = left.dived_by(right)
    
    if error:
        return res.failure(error)
    return res.success(result)`
        },
        {
          title: "FxPy Operator Examples",
          language: "javascript",
          code: `# Number operators
let sum = 10 + 5            # 15
let power = 2 ^ 8           # 256

# String operators
let greeting = "Hello" + " " + "World"  # Concat
let repeated = "Ha" * 3                  # "HaHaHa"

# List operators
let nums = [1, 2, 3]
let appended = nums + 4              # [1,2,3,4]
let concatenated = nums * [5, 6]     # [1,2,3,5,6]
let first = nums / 0                 # Index: 1

# Dictionary operators
let person = {"name": "Alice"}
let name = person / "name"           # Key access: "Alice"`
        }
      ]
    }
  ],

  // ============================================================
  // ARCHITECTURE
  // ============================================================
  architecture: {
    description: "FxPy follows a classic three-phase interpretation pipeline, transforming source code into executable instructions through distinct stages. This architecture is modular, with each phase handling a specific responsibility in the language processing workflow.",
    
    servicesTitle: "Language Processing Pipeline",
    servicesIntro: "The interpreter consists of 7 core modules working together to execute FxPy code:",
    
    diagram: {
      title: "Three-Phase Interpreter Pipeline",
      description: "Source code flows through lexical analysis, parsing, and interpretation phases",
      layers: [
        {
          name: "Input Layer",
          components: [
            { 
              name: "Source Code", 
              icon: "FileText", 
              description: ".fx files or REPL input - raw text to be processed"
            }
          ]
        },
        {
          name: "Lexical Analysis",
          components: [
            { 
              name: "Lexer (lexer.py)", 
              icon: "Type", 
              description: "Tokenizes character stream into 40+ token types with position tracking"
            }
          ]
        },
        {
          name: "Syntactic Analysis",
          components: [
            { 
              name: "Parser (fxparser.py)", 
              icon: "TreePine", 
              description: "Builds Abstract Syntax Tree using recursive descent with precedence climbing"
            }
          ]
        },
        {
          name: "Execution",
          components: [
            { 
              name: "Interpreter (interpreter.py)", 
              icon: "Settings", 
              description: "Tree-walking interpreter executing AST nodes with visitor pattern"
            }
          ]
        }
      ],
      dataFlow: [
        { 
          from: "Source Code", 
          to: "Lexer", 
          description: "Raw text string"
        },
        { 
          from: "Lexer", 
          to: "Parser", 
          description: "Token stream with position info"
        },
        { 
          from: "Parser", 
          to: "Interpreter", 
          description: "Abstract Syntax Tree (AST)"
        },
        { 
          from: "Interpreter", 
          to: "Output", 
          description: "Execution results or errors"
        }
      ]
    },
    
    services: [
      {
        name: "Lexer (lexer.py)",
        description: "Lexical analyzer that converts raw source code into a stream of tokens",
        technologies: ["Python", "Position Tracking", "40+ Token Types"],
        purpose: "Tokenize input, recognize keywords/operators/literals, track positions for errors",
        details: "305 lines - Handles character-by-character processing, creates Token objects with position metadata"
      },
      {
        name: "Parser (fxparser.py)",
        description: "Recursive descent parser that builds Abstract Syntax Trees from token streams",
        technologies: ["Python", "Recursive Descent", "Precedence Climbing"],
        purpose: "Transform tokens into AST, validate syntax, handle operator precedence",
        details: "1,407 lines - Implements 20+ AST node types, context-sensitive parsing for kwargs"
      },
      {
        name: "Interpreter (interpreter.py)",
        description: "Tree-walking interpreter that executes AST nodes using visitor pattern",
        technologies: ["Python", "Visitor Pattern", "Symbol Tables"],
        purpose: "Execute code, manage runtime state, handle scoping and context",
        details: "1,393 lines - Implements runtime type system, 25+ built-in functions, module loading"
      },
      {
        name: "Error Handler (errors.py)",
        description: "Error reporting system with position-aware messages and visual context",
        technologies: ["Python", "Position Tracking"],
        purpose: "Generate helpful error messages showing exact error locations in source",
        details: "88 lines - IllegalCharError, InvalidSyntaxError, RTError with stack traces"
      },
      {
        name: "REPL (shell.py)",
        description: "Interactive Read-Eval-Print Loop for live code execution",
        technologies: ["Python", "stdin/stdout"],
        purpose: "Provide interactive environment for experimentation and learning",
        details: "40 lines - Maintains persistent context, catches errors gracefully"
      },
      {
        name: "Runner (run.py)",
        description: "Entry point that orchestrates lexer, parser, and interpreter",
        technologies: ["Python", "Module Integration"],
        purpose: "Coordinate the three-phase pipeline and execute FxPy code",
        details: "19 lines - Connects all components, handles file execution"
      },
      {
        name: "String Arrows (string_with_arrows.py)",
        description: "Utility for creating visual error indicators pointing to exact error locations",
        technologies: ["Python", "String Formatting"],
        purpose: "Generate arrows (^) under error positions in source code",
        details: "50 lines - Extracts relevant lines, adds visual context to errors"
      }
    ]
  },

  // ============================================================
  // SETUP GUIDE
  // ============================================================
  setupSteps: [
    {
      number: 1,
      title: "Prerequisites",
      description: "Ensure Python 3.11 or higher is installed on your system",
      commands: [
        { 
          code: "python --version", 
          description: "Check Python version (should be 3.11+)" 
        }
      ]
    },
    {
      number: 2,
      title: "Clone Repository",
      description: "Download the FxPy source code from GitHub",
      commands: [
        { 
          code: "git clone https://github.com/KazimFedxD/FxPy.git", 
          description: "Clone the repository" 
        },
        { 
          code: "cd FxPy", 
          description: "Navigate to project directory" 
        }
      ]
    },
    {
      number: 3,
      title: "Run Interactive REPL",
      description: "Start the interactive shell for immediate experimentation",
      commands: [
        { 
          code: "python shell.py", 
          description: "Launch FxPy REPL - no installation needed!" 
        }
      ]
    },
    {
      number: 4,
      title: "Execute FxPy Scripts",
      description: "Run .fx files containing FxPy code",
      commands: [
        { 
          code: "python run.py examples/fibonacci.fx", 
          description: "Execute a FxPy script file" 
        }
      ]
    },
    {
      number: 5,
      title: "Write Your First Program",
      description: "Create a simple FxPy program to test the installation",
      commands: [
        { 
          code: `# Create hello.fx
fex greet(name):
    return "Hello, " + name
end

print(greet("World"))`, 
          description: "Save as hello.fx and run with: python run.py hello.fx" 
        }
      ]
    }
  ],

  // ============================================================
  // SCREENSHOTS
  // ============================================================
  screenshots: [
    {
      filename: "repl-startup.png",
      caption: "Interactive REPL startup screen",
      category: "REPL",
      description: "FxPy interactive shell ready for live code execution"
    },
    {
      filename: "repl-interactive.png",
      caption: "REPL executing code with immediate feedback",
      category: "REPL",
      description: "Demonstrating variable assignment, function definition, and execution"
    },
    {
      filename: "repl-error.png",
      caption: "Rich error reporting with visual indicators",
      category: "Error Handling",
      description: "Position-aware error message showing exact location with arrow pointer"
    },
    {
      filename: "script-execution.png",
      caption: "Executing FxPy script from file",
      category: "Script Execution",
      description: "Running .fx files with full language features"
    },
    {
      filename: "import.png",
      caption: "Module import system demonstration",
      category: "Modules",
      description: "Basic import, aliased import, and selective import examples"
    },
    {
      filename: "from-import.png",
      caption: "Selective imports with 'from...import' syntax",
      category: "Modules",
      description: "Importing specific functions from modules"
    },
    {
      filename: "code-functions.png",
      caption: "Function definitions and higher-order functions",
      category: "Functions",
      description: "First-class functions, closures, and arrow syntax examples"
    }
  ],

  // ============================================================
  // PERFORMANCE
  // ============================================================
  performance: {
    overview: {
      benchmarkDate: "November 21, 2025",
      interpreterVersion: "FxPy 1.0",
      pythonVersion: "3.13.7",
      testEnvironment: "Linux",
      philosophy: "FxPy prioritizes code clarity and educational value over execution speed"
    },

    benchmarkSummary: [
      { 
        benchmark: "Arithmetic - Loop 1000 additions", 
        meanTime: "21.04ms", 
        memory: "48.06 KB", 
        throughput: "47,500 ops/sec",
        stdDev: "0.36ms"
      },
      { 
        benchmark: "Function Calls - 500 calls", 
        meanTime: "40.76ms", 
        memory: "258.66 KB", 
        throughput: "12,270 calls/sec",
        stdDev: "1.05ms"
      },
      { 
        benchmark: "Recursion - Fibonacci(15)", 
        meanTime: "304.82ms", 
        memory: "458.80 KB", 
        throughput: "3.3 calls/sec",
        stdDev: "11.01ms"
      },
      { 
        benchmark: "List Operations - 100 append + 100 access", 
        meanTime: "5.72ms", 
        memory: "48.78 KB", 
        throughput: "34,970 ops/sec",
        stdDev: "0.10ms"
      },
      { 
        benchmark: "String Operations - 100 concatenations", 
        meanTime: "2.40ms", 
        memory: "24.34 KB", 
        throughput: "41,670 ops/sec",
        stdDev: "0.07ms"
      },
      { 
        benchmark: "Dictionary Access - 300 lookups", 
        meanTime: "6.66ms", 
        memory: "38.28 KB", 
        throughput: "45,050 lookups/sec",
        stdDev: "0.26ms"
      },
      { 
        benchmark: "Nested Loops - 50x50 iterations", 
        meanTime: "52.19ms", 
        memory: "28.65 KB", 
        throughput: "47,900 iterations/sec",
        stdDev: "1.79ms"
      },
      { 
        benchmark: "Factorial - Iterative (20!)", 
        meanTime: "1.34ms", 
        memory: "32.11 KB", 
        throughput: "746 calls/sec",
        stdDev: "0.12ms"
      },
      { 
        benchmark: "Complex Expressions - 100 evaluations", 
        meanTime: "7.27ms", 
        memory: "36.89 KB", 
        throughput: "13,760 ops/sec",
        stdDev: "0.16ms"
      },
      { 
        benchmark: "Variable Assignment - 1500 assignments", 
        meanTime: "20.11ms", 
        memory: "24.98 KB", 
        throughput: "74,590 assignments/sec",
        stdDev: "0.99ms"
      }
    ],

    keyMetrics: {
      averageExecutionTime: "46.23ms",
      averageMemoryUsage: "99.95 KB",
      peakMemoryUsage: "Under 500 KB",
      consistency: "Low standard deviation (0.07ms - 14.22ms)"
    },

    strengths: [
      "Fast Arithmetic: Basic operations execute efficiently (47,500 ops/sec)",
      "Low Memory Footprint: Average memory usage under 100 KB",
      "Predictable Performance: Low standard deviation across all runs",
      "Efficient Data Structures: Lists and dictionaries perform well",
      "Quick String Operations: 41,670 concatenations/second",
      "Fast Variable Access: 74,590 assignments/second"
    ],

    bottlenecks: [
      "Recursive Calls: Fibonacci shows recursion overhead (304ms vs 1.34ms for iterative)",
      "Function Call Overhead: 258 KB memory for call stack management",
      "No JIT Compilation: Pure interpretation without runtime optimization",
      "Tree-Walking: AST executed directly without optimization passes",
      "String Immutability: Concatenation creates new objects each time"
    ],

    languageComparison: [
      { 
        language: "FxPy", 
        implementation: "Tree-walking interpreter", 
        relativeSpeed: "1x (baseline)",
        loopBenchmark: "21.04ms"
      },
      { 
        language: "Python 3.13", 
        implementation: "Bytecode VM", 
        relativeSpeed: "~40-50x faster",
        loopBenchmark: "~0.5ms"
      },
      { 
        language: "JavaScript (Node.js)", 
        implementation: "JIT compilation", 
        relativeSpeed: "~200-300x faster",
        loopBenchmark: "~0.07ms"
      },
      { 
        language: "C (compiled)", 
        implementation: "Native machine code", 
        relativeSpeed: "~2000-5000x faster",
        loopBenchmark: "~0.004ms"
      }
    ],

    codebaseMetrics: [
      { component: "Total Lines of Code", value: "~3,300 lines", category: "Overall" },
      { component: "Interpreter (interpreter.py)", value: "1,393 lines", category: "Core" },
      { component: "Parser (fxparser.py)", value: "1,407 lines", category: "Core" },
      { component: "Lexer (lexer.py)", value: "305 lines", category: "Core" },
      { component: "Supporting Modules", value: "~200 lines", category: "Utilities" }
    ],
    
    languageFeatures: [
      { feature: "Token Types", count: "40+", description: "Keywords, operators, literals, delimiters" },
      { feature: "AST Node Types", count: "20+", description: "Expression and statement nodes" },
      { feature: "Built-in Functions", count: "25+", description: "I/O, type conversion, list ops, utilities" },
      { feature: "Operators", count: "15+", description: "Arithmetic, comparison, logical, assignment" }
    ],

    scalability: [
      { linesOfCode: "<100 lines", performance: "Excellent", executionTime: "Near-instant" },
      { linesOfCode: "100-500 lines", performance: "Good", executionTime: "<100ms" },
      { linesOfCode: "500-1000 lines", performance: "Acceptable", executionTime: "<500ms" },
      { linesOfCode: "1000-5000 lines", performance: "Slow", executionTime: "1-5 seconds" },
      { linesOfCode: ">5000 lines", performance: "Very Slow", executionTime: "Consider refactoring" }
    ],

    optimizationOpportunities: [
      {
        name: "Bytecode Compilation",
        current: "AST tree walking",
        improved: "Compile AST to bytecode, execute in VM",
        benefit: "10-50x speedup",
        complexity: "High",
        status: "Planned for v3.0"
      },
      {
        name: "Constant Folding",
        current: "2 + 3 evaluated every time",
        improved: "Compute at parse time: 5",
        benefit: "Faster for constant expressions",
        complexity: "Medium",
        status: "Planned for v2.0"
      },
      {
        name: "Module Caching",
        current: "Re-parse imported modules every time",
        improved: "Cache parsed AST or execution result",
        benefit: "Faster imports",
        complexity: "Low",
        status: "Planned for v1.1"
      },
      {
        name: "String Builder",
        current: "String concatenation creates new strings",
        improved: "Use mutable buffer for building strings",
        benefit: "O(n) instead of O(n²) for concatenation",
        complexity: "Low",
        status: "Planned for v1.1"
      },
      {
        name: "Tail Call Optimization",
        current: "Recursion uses call stack",
        improved: "Convert tail calls to loops",
        benefit: "Reduce recursion overhead",
        complexity: "Medium",
        status: "Planned for v1.2"
      }
    ],

    bestUseCases: [
      "Learning: Understanding interpreter design",
      "Prototyping: Quick scripts and calculations",
      "DSLs: Embedded domain-specific languages",
      "Education: Teaching programming concepts",
      "Small Scripts: <1000 lines, not performance-critical"
    ],

    notRecommendedFor: [
      "Production Systems: Too slow, no optimization",
      "Large Datasets: No NumPy-like optimizations",
      "High-Performance Computing: Use Python/C/Rust",
      "Web Servers: No async support, slow execution",
      "Real-time Systems: Unpredictable execution times"
    ]
  },

  // ============================================================
  // REQUIREMENTS
  // ============================================================
  requirements: {
    os: [
      { name: "Windows", version: "10/11", supported: true, notes: "Fully supported, use PowerShell or CMD" },
      { name: "macOS", version: "12+", supported: true, notes: "Fully supported" },
      { name: "Linux", version: "Ubuntu 20.04+", supported: true, notes: "Fully supported" },
      { name: "Linux", version: "Debian 11+", supported: true, notes: "Fully supported" }
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
        disk: "100 MB"
      }
    },
    
    software: [
      {
        name: "Python",
        version: "3.11+",
        required: true,
        purpose: "Runtime environment for FxPy interpreter",
        installation: "Download from python.org"
      },
      {
        name: "Git",
        version: "Any recent version",
        required: false,
        purpose: "Clone repository (or download ZIP)",
        installation: "Download from git-scm.com"
      },
      {
        name: "Text Editor",
        version: "VS Code, Vim, etc.",
        required: false,
        purpose: "Write .fx files (any editor works)",
        installation: "VS Code recommended for syntax highlighting"
      }
    ],
    
    browsers: []  // Not applicable - command-line tool
  },

  // ============================================================
  // KNOWN ISSUES (with expandable details)
  // ============================================================
  knownIssues: [
    {
      severity: "Medium",
      title: "Performance Limitations",
      description: "Tree-walking interpreter is slow compared to bytecode VMs",
      impact: "Large scripts (>1000 lines) take several seconds; deep recursion (>1000 calls) hits Python's stack limit",
      workaround: "Keep scripts under 1000 lines, use iterative algorithms instead of deep recursion",
      status: "Won't fix (educational focus)",
      detailedExplanation: "FxPy uses a tree-walking interpreter where each AST node is visited and executed directly. This is significantly slower than bytecode compilation (like CPython) or JIT compilation (like PyPy). The design prioritizes code readability and educational value over execution speed.",
      technicalDetails: "Each operation requires multiple Python function calls: visit() → visit_BinOpNode() → left.added_to(right) → Number.__init__(). Modern interpreters compile to bytecode first, reducing interpretation overhead by 10-100x.",
      whyItHappens: "Bytecode compilation adds significant complexity (requires bytecode instruction set, stack-based VM, optimization passes). For an educational project, the added complexity doesn't justify the performance gain.",
      proposedFix: "Version 3.0 roadmap includes bytecode compilation with stack-based VM. Would require ~2000 additional lines of code and 2-3 months of development.",
      estimatedEffort: "3-6 months",
      priority: "Low (educational project)"
    },
    
    {
      severity: "Low",
      title: "No Standard Library",
      description: "Minimal built-in functions (~25), no standard library modules",
      impact: "No file I/O helpers, JSON parsing, HTTP requests, datetime, or regex support",
      workaround: "Implement needed functions in FxPy code or extend with custom built-ins",
      status: "Planned for v1.1+",
      detailedExplanation: "FxPy currently provides only basic built-in functions for I/O, type conversion, and list operations. There are no standard library modules like Python's 'json', 'datetime', 'math', or 'http'. This limits FxPy's applicability for real-world tasks.",
      technicalDetails: "Standard library modules require: (1) module loader extending import system, (2) Python implementations of common functions, (3) documentation and examples. Each module adds 200-500 lines of code.",
      whyItHappens: "Standard library was deprioritized to focus on core language features (lexer, parser, interpreter). Adding modules is straightforward but time-consuming.",
      proposedFix: "Version 1.1 will add basic file I/O (open, read, write, close). Version 2.1 will add math, string, collections, and JSON modules.",
      codeExample: {
        title: "Future File I/O API (planned)",
        language: "javascript",
        code: `# Planned for v1.1
let file = open("data.txt", "r")
let content = read(file)
print(content)
close(file)`
      },
      estimatedEffort: "1-2 weeks per module",
      priority: "High (most requested feature)"
    },
    
    {
      severity: "Low",
      title: "No Module Caching",
      description: "Imported modules are re-parsed and re-executed every time",
      impact: "Slow startup if many imports; duplicate work if module imported multiple times",
      workaround: "Minimize imports, import once at top of file",
      status: "Planned for v1.1",
      detailedExplanation: "When you 'import math' twice in the same program, FxPy will lex, parse, and execute math.fx both times. This wastes CPU and makes startup slower for programs with many imports.",
      technicalDetails: "The interpreter needs a module cache dictionary mapping file paths to executed contexts. On import, check cache first. If present, copy symbols from cached context; if not, execute and store in cache.",
      whyItHappens: "Module caching was omitted from v1.0 to simplify the import implementation. Adding it is straightforward but requires careful handling of circular imports.",
      proposedFix: "Add a global module_cache dictionary to interpreter.py. In visit_ImportNode, check if module_path exists in cache before executing. If cached, use the stored result; otherwise execute and store in cache.",
      codeExample: {
        title: "Module Cache Implementation",
        language: "python",
        code: `# Add to interpreter.py
module_cache = {}  # Global cache

def visit_ImportNode(self, node, context):
    if module_path in module_cache:
        # Use cached result
        result = module_cache[module_path]
    else:
        # Execute and cache
        result = run(module_path, module_path)
        module_cache[module_path] = result`
      },
      estimatedEffort: "4-8 hours",
      priority: "Medium"
    },
    
    {
      severity: "High",
      title: "Limited Stack Traces",
      description: "Runtime errors don't show full call stack",
      impact: "Hard to debug nested function calls - unclear which function caused error",
      workaround: "Add debug print statements to trace execution flow",
      status: "Planned for v1.1",
      detailedExplanation: "When a deeply nested function call fails, FxPy only shows the immediate error location, not the full call chain. For example, if a() calls b() calls c() which divides by zero, you only see the error in c(), not that it was called from a() → b() → c().",
      technicalDetails: "The Context class tracks parent contexts but doesn't maintain a call stack. We need to store a list of (function_name, position) tuples in each context and display them on error.",
      whyItHappens: "Full stack traces add complexity to error reporting and slightly slow down function calls. Was omitted from v1.0 to ship faster.",
      proposedFix: "Extend the Context class to maintain a call_stack list. Push (function_name, position) on function entry, pop on exit. On error, format and display the full call stack with indentation and line numbers.",
      codeExample: {
        title: "Stack Trace Implementation",
        language: "python",
        code: `class Context:
    def __init__(self, display_name, parent=None):
        self.call_stack = parent.call_stack + [(display_name, pos)] if parent else []
    
    def format_stack_trace(self):
        for i, (name, pos) in enumerate(self.call_stack):
            print(f"  {i}. {name} at line {pos.ln}")`
      },
      estimatedEffort: "1-2 days",
      priority: "High"
    }
  ],

  // ============================================================
  // FUTURE ENHANCEMENTS (with expandable roadmap features)
  // ============================================================
  futureEnhancements: [
    {
      version: "1.1",
      timeline: "Next 3 months",
      theme: "Quality of Life Improvements",
      features: [
        {
          name: "Module Caching",
          priority: "High",
          effort: "1 week",
          difficulty: "Easy",
          description: "Cache parsed AST of imported modules to avoid re-parsing",
          whyWeNeed: "Programs with multiple imports are slow to start because each import re-lexes, re-parses, and re-executes the module file. Caching reduces import overhead by ~90%.",
          howToImplement: [
            "Add global module_cache dictionary mapping file paths to execution results",
            "In visit_ImportNode, check cache before executing module",
            "Store result in cache after first execution",
            "Handle cache invalidation for development (optional flag to disable cache)"
          ],
          benefits: [
            "10x faster startup for programs with many imports",
            "Avoid redundant work when same module imported multiple times",
            "More efficient for large codebases with shared utilities"
          ],
          impactOnProject: "Makes FxPy practical for larger projects with modular code organization.",
          codeSnippet: {
            title: "Module Cache Implementation",
            language: "python",
            code: `module_cache = {}

def visit_ImportNode(self, node, context):
    module_path = resolve_module_path(node, context)
    
    if module_path in module_cache:
        result = module_cache[module_path]
    else:
        result = run(module_path, module_path)
        module_cache[module_path] = result
    
    register_symbols(result, context)`
          }
        },
        {
          name: "Full Stack Traces",
          priority: "High",
          effort: "1-2 weeks",
          difficulty: "Medium",
          description: "Show complete call chain for runtime errors with function names and line numbers",
          whyWeNeed: "Debugging nested function calls is difficult without seeing the full call stack. Developers need to know: 'Which function called the failing function?'",
          howToImplement: [
            "Extend Context class to maintain call_stack list",
            "Push (function_name, position) on function entry",
            "Pop on function exit",
            "On error, format call stack with indentation and line numbers"
          ],
          benefits: [
            "Faster debugging of nested function errors",
            "Professional error messages like Python/JavaScript",
            "Understand execution flow at error time"
          ],
          impactOnProject: "Significantly improves developer experience and makes FxPy more suitable for teaching debugging skills."
        },
        {
          name: "File I/O Built-ins",
          priority: "High",
          effort: "1 week",
          difficulty: "Easy",
          description: "Add open(), read(), write(), close() built-in functions for file operations",
          whyWeNeed: "Many real-world scripts need to read/write files. Currently FxPy can't open files, making it impractical for data processing tasks.",
          howToImplement: "Wrap Python's file operations in BuiltInFunction classes, handle errors gracefully, return FxPy values (String, List)",
          benefits: [
            "Enable file processing scripts",
            "Read configuration files",
            "Write output/logs to disk",
            "Process CSV/JSON data"
          ],
          impactOnProject: "Expands FxPy's applicability from pure computation to real-world scripting tasks."
        }
      ]
    },
    
    {
      version: "1.2",
      timeline: "3-6 months",
      theme: "Exception Handling & Control Flow",
      features: [
        {
          name: "Try-Catch-Finally",
          priority: "High",
          effort: "3-4 weeks",
          difficulty: "Hard",
          description: "Add exception handling with try/catch/finally blocks",
          whyWeNeed: "Currently, any error crashes the program. Exception handling allows graceful error recovery, making FxPy suitable for robust applications.",
          howToImplement: [
            "Add TryCatchNode to AST with try_body, catch_var, catch_body, finally_body",
            "In interpreter, wrap try_body execution in error handler",
            "On error, bind error to catch_var and execute catch_body",
            "Always execute finally_body regardless of success/failure"
          ],
          benefits: [
            "Graceful error recovery",
            "Resource cleanup (close files even on error)",
            "Production-ready error handling",
            "Teach exception handling concepts"
          ],
          impactOnProject: "Makes FxPy a serious language for building reliable programs, not just experiments.",
          codeSnippet: {
            title: "Try-Catch Example (Planned)",
            language: "javascript",
            code: `try:
    let file = open("data.txt", "r")
    let content = read(file)
catch error:
    print("Error: " + error.message)
finally:
    close(file)
end`
          }
        },
        {
          name: "Throw Statement",
          priority: "Medium",
          effort: "1 week",
          difficulty: "Easy",
          description: "Allow manual error throwing with custom messages",
          whyWeNeed: "Developers need to validate input and raise errors with meaningful messages. Currently can't signal errors programmatically.",
          howToImplement: "Add ThrowNode, create Error value type, modify interpreter to propagate errors up call stack",
          benefits: [
            "Input validation",
            "Custom error messages",
            "Early exit on invalid state"
          ],
          impactOnProject: "Enables defensive programming and better API design."
        }
      ]
    },
    
    {
      version: "2.0",
      timeline: "1-2 years",
      theme: "Object-Oriented Programming",
      features: [
        {
          name: "Class System",
          priority: "High",
          effort: "2-3 months",
          difficulty: "Hard",
          description: "Add classes with methods, properties, and inheritance",
          whyWeNeed: "Object-oriented programming is essential for modeling complex domains. Classes enable data encapsulation, inheritance, and polymorphism.",
          howToImplement: [
            "Add ClassDefNode and ClassInstance value types",
            "Implement method resolution (self parameter)",
            "Add __init__ constructor support",
            "Implement inheritance with super()",
            "Support private attributes with name mangling"
          ],
          benefits: [
            "Model real-world entities (Person, Car, etc.)",
            "Code reuse through inheritance",
            "Encapsulation of data and behavior",
            "Polymorphism for flexible APIs"
          ],
          impactOnProject: "Transforms FxPy from a functional scripting language into a full-featured OOP language comparable to Python/JavaScript.",
          codeSnippet: {
            title: "Class Example (Planned)",
            language: "javascript",
            code: `class Person:
    fex __init__(self, name, age):
        self.name = name
        self.age = age
    end
    
    fex greet(self):
        return "Hello, I'm " + self.name
    end
end

let alice = Person("Alice", 30)
print(alice.greet())`
          }
        }
      ]
    },
    
    {
      version: "3.0",
      timeline: "2+ years",
      theme: "Performance & Tooling",
      features: [
        {
          name: "Bytecode Compilation",
          priority: "Medium",
          effort: "6-12 months",
          difficulty: "Hard",
          description: "Compile AST to bytecode and execute in stack-based VM for 10-50x speedup",
          whyWeNeed: "Tree-walking interpreters are slow. Bytecode compilation brings performance closer to production languages.",
          howToImplement: [
            "Design bytecode instruction set (LOAD_VAR, STORE_VAR, CALL_FUNC, etc.)",
            "Implement compiler pass: AST → bytecode",
            "Build stack-based VM to execute bytecode",
            "Add optimization passes (constant folding, dead code elimination)"
          ],
          benefits: [
            "10-50x faster execution",
            "Enables larger programs",
            "Closer to production-grade performance",
            "Teaching bytecode compilation concepts"
          ],
          impactOnProject: "Makes FxPy viable for real applications, not just learning/prototyping."
        },
        {
          name: "Language Server Protocol (LSP)",
          priority: "Low",
          effort: "3-6 months",
          difficulty: "Hard",
          description: "Add LSP support for autocomplete, go-to-definition, and inline errors in editors",
          whyWeNeed: "Modern developer experience requires editor integration. LSP enables VS Code/Vim features.",
          howToImplement: "Implement LSP server with FxPy parser for symbol extraction, diagnostics, completion",
          benefits: [
            "Autocomplete in editors",
            "Go-to-definition navigation",
            "Inline error checking",
            "Hover documentation"
          ],
          impactOnProject: "Makes FxPy feel like a professional language with modern tooling support."
        }
      ]
    }
  ],

  // Related projects with similar tech stack
  relatedProjects: [
    "FedxD Data Container"
  ]
};
