# FxPy Architecture & Technology

## System Architecture Overview

FxPy follows a classic three-phase interpretation pipeline, transforming source code into executable instructions through distinct stages. This architecture is modular, with each phase handling a specific responsibility in the language processing workflow.

```
┌─────────────────┐
│   Source Code   │  (.fx files or REPL input)
│    (Text)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  LEXER PHASE    │  Tokenization
│  (lexer.py)     │  • Character stream → Token stream
│                 │  • Recognizes keywords, operators, literals
│                 │  • Tracks positions for error reporting
└────────┬────────┘
         │
         │  Token Stream
         │  [KEYWORD:fex, IDENTIFIER:add, LPAREN, ...]
         ▼
┌─────────────────┐
│  PARSER PHASE   │  AST Generation
│  (fxparser.py)  │  • Token stream → Abstract Syntax Tree
│                 │  • Validates syntax rules
│                 │  • Builds structured representation
│                 │  • Precedence climbing for expressions
└────────┬────────┘
         │
         │  Abstract Syntax Tree
         │  FuncDefNode(name="add", params=[...], body=...)
         ▼
┌─────────────────┐
│ INTERPRETER     │  Execution
│ (interpreter.py)│  • Walks AST nodes
│                 │  • Evaluates expressions
│                 │  • Manages runtime state
│                 │  • Executes statements
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Output      │  Results, errors, side effects
└─────────────────┘
```

---

## Phase 1: Lexical Analysis (Lexer)

**File:** `lexer.py` (305 lines)

### Responsibilities
- Convert raw source code text into a stream of tokens
- Recognize and classify language elements (keywords, identifiers, operators, literals)
- Track position information (line, column, index) for each token
- Handle whitespace, comments, and newlines
- Detect illegal characters and report errors

### Token Types (40+ total)
```python
# Data Types
TT_INT, TT_FLOAT, TT_STRING, TT_IDENTIFIER

# Operators
TT_PLUS, TT_MINUS, TT_MUL, TT_DIV, TT_MOD, TT_POW

# Comparisons
TT_EE, TT_NE, TT_LT, TT_GT, TT_LTE, TT_GTE

# Delimiters
TT_LPAREN, TT_RPAREN, TT_LSQB, TT_RSQB, TT_LBRACE, TT_RBRACE

# Special
TT_KEYWORD, TT_ARROW, TT_COMMA, TT_COLON, TT_NEWLINE, TT_EOF
```

### Key Components

**Position Tracking:**
```python
class Position:
    def __init__(self, idx, ln, col, fn, ftxt):
        self.idx = idx    # Character index in file
        self.ln = ln      # Line number
        self.col = col    # Column number
        self.fn = fn      # Filename
        self.ftxt = ftxt  # Full file text
```

**Token Class:**
```python
class Token:
    def __init__(self, type_, value=None, pos_start=None, pos_end=None):
        self.type = type_
        self.value = value
        self.pos_start = pos_start
        self.pos_end = pos_end
```

**Lexer Process:**
1. Read character-by-character from source
2. Match patterns (numbers, strings, identifiers)
3. Recognize reserved keywords
4. Create Token objects with position data
5. Return token list or error

### Reserved Keywords
```python
RESERVED_KEYWORDS = [
    "and", "or", "not", "let", "if", "else", "elif",
    "for", "while", "fex", "end", "return", "continue",
    "break", "import", "from", "as", "in"
]
```

---

## Phase 2: Syntax Analysis (Parser)

**File:** `fxparser.py` (1,407 lines)

### Responsibilities
- Transform token stream into Abstract Syntax Tree (AST)
- Validate syntax according to grammar rules
- Implement operator precedence and associativity
- Handle context-sensitive parsing (e.g., keyword arguments)
- Generate parse errors with position information

### Grammar Structure (BNF-like)

```
statements  : NEWLINE* expr (NEWLINE+ expr)* NEWLINE*

expr        : KEYWORD:let IDENTIFIER EQ expr
            | comp-expr ((KEYWORD:and | KEYWORD:or) comp-expr)*

comp-expr   : KEYWORD:not comp-expr
            | arith-expr ((EE|NE|LT|GT|LTE|GTE) arith-expr)*

arith-expr  : term ((PLUS|MINUS) term)*

term        : factor ((MUL|DIV) factor)*

factor      : (PLUS|MINUS) factor
            | power

power       : call (POW factor)*

call        : atom (LPAREN (expr (COMMA expr)*)? RPAREN)?

atom        : INT | FLOAT | STRING | IDENTIFIER
            | LPAREN expr RPAREN
            | list-expr
            | dict-expr
            | if-expr
            | for-expr
            | while-expr
            | func-def
```

### AST Node Types

```python
# Expression Nodes
NumberNode(tok)
StringNode(tok)
VarAccessNode(var_name_tok)
VarAssignNode(var_name_tok, value_node)
BinOpNode(left_node, op_tok, right_node)
UnaryOpNode(op_tok, node)

# Control Flow Nodes
IfNode(cases, else_case)
ForNode(var_name_tok, start_value_node, end_value_node, step_value_node, body_node)
WhileNode(condition_node, body_node)

# Function Nodes
FuncDefNode(var_name_tok, arg_names, defaults, body_node, should_auto_return)
FuncCallNode(node_to_call, arg_nodes, kwarg_dict)

# Data Structure Nodes
ListNode(element_nodes)
DictNode(key_value_pairs)

# Other
ImportNode(module_name_tok, alias_tok, import_list)
ReturnNode(node_to_return)
ContinueNode()
BreakNode()
```

### Parsing Techniques

**Recursive Descent:**
- Each grammar rule becomes a method
- Methods call each other recursively
- Natural mapping from grammar to code

**Operator Precedence Climbing:**
```python
# Precedence levels (lowest to highest)
1. or
2. and
3. ==, !=, <, >, <=, >=
4. +, -
5. *, /
6. %, (mod)
7. ^ (power)
8. Unary +, -
9. Function call
```

**Lookahead for Context-Sensitive Parsing:**
```python
def call(self):
    # Check if next token is '=' for keyword arg
    next_pos = self.tok_idx + 1
    if (next_pos < len(self.tokens) and 
        self.tokens[next_pos].type == TT_EQ):
        # Parse as keyword argument
        kwarg_name = self.current_tok.value
        # ...
```

### ParseResult Class
Tracks success/failure and errors during parsing:
```python
class ParseResult:
    def __init__(self):
        self.error = None
        self.node = None
        
    def register(self, res):
        # Propagate errors upward
        if res.error: self.error = res.error
        return res.node
```

---

## Phase 3: Interpretation (Execution)

**File:** `interpreter.py` (1,393 lines)

### Responsibilities
- Walk the AST and execute nodes
- Manage runtime state (variables, functions)
- Handle scope and context
- Perform type checking and operations
- Execute built-in functions
- Manage imports and module loading

### Visitor Pattern Implementation

```python
class Interpreter:
    def visit(self, node, context):
        method_name = f'visit_{type(node).__name__}'
        method = getattr(self, method_name, self.no_visit_method)
        return method(node, context)
    
    def visit_NumberNode(self, node, context):
        # Return Number object
    
    def visit_BinOpNode(self, node, context):
        # Evaluate left and right, apply operator
    
    def visit_VarAssignNode(self, node, context):
        # Store variable in symbol table
    
    # ... 20+ visit methods
```

### Runtime Type System

**Base Value Class:**
```python
class Value:
    def __init__(self):
        self.pos_start = None
        self.pos_end = None
        self.context = None
    
    def set_pos(self, pos_start, pos_end):
        # Track position for errors
    
    def set_context(self, context):
        # Track execution context
```

**Concrete Types:**
```python
class Number(Value):
    def __init__(self, value):
        super().__init__()
        self.value = value
    
    def added_to(self, other):
        # Return new Number
    
    def multed_by(self, other):
        # Return new Number
    # ... other operations

class String(Value):
    # String operations

class List(Value):
    # List operations

class Dict(Value):
    # Dictionary operations

class Function(Value):
    # Function execution
```

### Symbol Table & Scoping

**Symbol Table:**
```python
class SymbolTable:
    def __init__(self, parent=None):
        self.symbols = {}
        self.parent = parent
    
    def get(self, name):
        value = self.symbols.get(name, None)
        if value is None and self.parent:
            return self.parent.get(name)  # Lexical scoping
        return value
    
    def set(self, name, value):
        self.symbols[name] = value
    
    def remove(self, name):
        del self.symbols[name]
```

**Context:**
```python
class Context:
    def __init__(self, display_name, parent=None, parent_entry_pos=None):
        self.display_name = display_name
        self.parent = parent
        self.parent_entry_pos = parent_entry_pos
        self.symbol_table = None
```

**Scope Hierarchy:**
```
Global Context
  └─> Symbol Table (built-in functions)
      │
      ├─> Module Context (imported file)
      │   └─> Symbol Table (module variables/functions)
      │
      └─> Function Context
          └─> Symbol Table (local variables, parameters)
              │
              └─> Nested Function Context
                  └─> Symbol Table (closure variables)
```

### Built-in Functions (25+)

Implemented as Python functions wrapped in `BuiltInFunction` class:

```python
# I/O
print, input, clear

# Type Conversion
int, float, str, bool

# Type Checking
is_number, is_string, is_list, is_dict, is_function

# List Operations
append, pop, extend, len, get

# String Operations
split, join, replace

# Math
abs, round, min, max, sum

# Utilities
range, type, help, get_symbols, run_file
```

### Function Execution Flow

```python
class Function(Value):
    def execute(self, args, kwargs):
        # 1. Create new context
        new_context = Context(self.name, self.context)
        new_context.symbol_table = SymbolTable(self.context.symbol_table)
        
        # 2. Add self-reference (for recursion)
        new_context.symbol_table.set(self.name, self)
        
        # 3. Populate parameters with arguments
        self.populate_args(self.arg_names, args, kwargs, new_context)
        
        # 4. Execute function body
        result = interpreter.visit(self.body, new_context)
        
        # 5. Return result
        return result
```

### Import Resolution

```python
def visit_ImportNode(self, node, context):
    # 1. Get current file directory
    current_dir = os.path.dirname(os.path.abspath(context.display_name))
    
    # 2. Construct module path
    module_name = node.module_name_tok.value
    if not module_name.endswith('.fx'):
        module_name += '.fx'
    module_path = os.path.join(current_dir, module_name)
    
    # 3. Execute module file
    result = run(module_path, module_path)
    
    # 4. Register symbols in current context
    alias = node.alias_tok.value if node.alias_tok else module_name.replace('.fx', '')
    
    if node.import_list:
        # Selective import: from module import x, y
        for symbol_name in node.import_list:
            value = result.context.symbol_table.get(symbol_name)
            context.symbol_table.set(symbol_name, value)
    else:
        # Full import: import module
        for key, value in result.context.symbol_table.symbols.items():
            context.symbol_table.set(f"{alias}.{key}", value)
```

---

## Supporting Components

### Error Handling (`errors.py`)

**Error Types:**
```python
class Error:
    def __init__(self, pos_start, pos_end, error_name, details):
        self.pos_start = pos_start
        self.pos_end = pos_end
        self.error_name = error_name
        self.details = details
    
    def as_string(self):
        # Format error with position and context

class IllegalCharError(Error):
    # Lexer errors (unknown characters)

class InvalidSyntaxError(Error):
    # Parser errors (syntax violations)

class RTError(Error):
    # Runtime errors (division by zero, type errors, etc.)
```

### Visual Error Display (`string_with_arrows.py`)

```python
def string_with_arrows(text, pos_start, pos_end):
    """
    Creates visual indicator for error location:
    
    fex add(a, b -> return a + b
                  ^
    Expected ')'
    """
    # Extract line containing error
    # Add arrow pointing to error position
    # Return formatted string
```

### Entry Points

**REPL (`shell.py`):**
```python
while True:
    text = input("FxPy > ")
    result, error = run.run("<stdin>", text)
    # Display result or error
```

**Script Execution (`run.py`):**
```python
def run(fn, text):
    # 1. Lex
    lexer = Lexer(fn, text)
    tokens, error = lexer.make_tokens()
    
    # 2. Parse
    parser = Parser(tokens)
    ast = parser.parse()
    
    # 3. Interpret
    interpreter = Interpreter()
    context = Context(fn)
    result = interpreter.visit(ast.node, context)
    
    return result, error
```

---

## Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Implementation Language** | Python 3.11+ | Core interpreter implementation |
| **Standard Library Only** | No dependencies | Portability and simplicity |
| **Data Structures** | Dicts, Lists | Symbol tables, AST nodes |
| **Pattern** | Visitor Pattern | AST traversal |
| **Parsing** | Recursive Descent | Syntax analysis |
| **Scoping** | Lexical Scoping | Variable resolution |
| **File I/O** | `os`, `sys` modules | Script execution, imports |

---

## Design Patterns & Principles

### 1. **Visitor Pattern** (Interpreter)
Each AST node type has a corresponding `visit_*` method, allowing clean separation of node structure from execution logic.

### 2. **Recursive Descent** (Parser)
Grammar rules map directly to parser methods, making the code easy to understand and modify.

### 3. **Flyweight Pattern** (Tokens)
Tokens store minimal data (type, value, position) to keep memory usage low.

### 4. **Chain of Responsibility** (Symbol Tables)
Symbol lookup traverses parent scopes, implementing lexical scoping naturally.

### 5. **Strategy Pattern** (Built-in Functions)
Built-in functions are pluggable, making it easy to extend the language.

---

## Performance Characteristics

- **Time Complexity:** O(n) lexing, O(n) parsing, O(n) interpretation (where n = source code size)
- **Space Complexity:** O(n) for AST, O(d) for symbol tables (where d = scope depth)
- **Execution Speed:** Interpreted, not optimized (educational focus)
- **Memory Usage:** Minimal (~10MB for small programs)

---

## Extensibility Points

FxPy is designed to be easily extended:

1. **Add New Operators:** Modify lexer tokens → update parser precedence → implement in interpreter
2. **Add Built-in Functions:** Create Python function → wrap in `BuiltInFunction` → register in global context
3. **Add New Keywords:** Update `RESERVED_KEYWORDS` → add parser logic → implement visit method
4. **Add New Data Types:** Create `Value` subclass → implement operations → add type checking

---

## Codebase Statistics

```
Total Lines: ~3,300 Python code
│
├── interpreter.py  (1,393 lines)  42%
├── fxparser.py     (1,407 lines)  43%
├── lexer.py        (305 lines)     9%
├── errors.py       (88 lines)      3%
├── string_with_arrows.py (50)      2%
├── shell.py        (40 lines)      1%
└── run.py          (19 lines)     <1%
```

---

## Key Technical Achievements

1. **Zero Dependencies:** Entire language implemented with Python stdlib
2. **Position Tracking:** Every error shows exact location in source code
3. **Module System:** Full import/export with relative paths
4. **Closure Support:** Functions capture enclosing scope variables
5. **Variadic Functions:** *args/**kwargs implementation
6. **Keyword Arguments:** Context-sensitive parsing with lookahead
7. **Rich Error Messages:** Visual arrows pointing to error locations
8. **Interactive REPL:** Stateful shell for live coding

This architecture demonstrates that building a complete programming language is achievable with clean, well-organized code and solid design principles.
