# FxPy - Project Overview

## Introduction

FxPy is a custom-built, dynamically-typed interpreted programming language implemented entirely in Python. Born from the desire to understand how programming languages work under the hood, FxPy demonstrates the complete process of language design and implementation—from lexical analysis to code execution.

The language features a clean, Python-inspired syntax while implementing its own unique characteristics, including a powerful module system, variadic functions, and comprehensive error reporting. FxPy serves both as a functional programming language and an educational resource for understanding compiler/interpreter design.

## Problem Statement

**Challenge:** Understanding how programming languages work is often abstract and theoretical. Most developers use languages without truly understanding the mechanics of parsing, interpretation, and execution.

**Solution:** FxPy provides a hands-on, real-world implementation of a complete programming language, demonstrating:
- How source code transforms into executable instructions
- The role of lexers, parsers, and interpreters
- Symbol table management and scope resolution
- Error handling and reporting mechanisms
- Module systems and import resolution

## Target Audience

- **Computer Science Students:** Learn compiler/interpreter design through practical implementation
- **Language Enthusiasts:** Explore language design decisions and implementation strategies
- **Developers:** Understand the internals of interpreted languages
- **Educators:** Use as a teaching tool for programming language theory

## What Makes FxPy Unique?

### 1. **Zero Dependencies**
Built entirely with Python's standard library—no external packages required. This makes installation trivial and the codebase easy to understand.

### 2. **Educational Focus**
Every component is designed to be readable and instructive. The codebase prioritizes clarity over optimization, making it perfect for learning.

### 3. **Complete Implementation**
Unlike toy languages, FxPy includes:
- Full module/import system with relative path resolution
- Variadic functions (*args, **kwargs)
- Rich data types (numbers, strings, lists, dictionaries)
- First-class functions with closures
- Comprehensive error reporting with visual indicators

### 4. **Modern Syntax**
Borrows the best features from modern languages:
- Arrow functions: `fex add(a, b) -> return a + b`
- Keyword arguments: `function(x=10, y=20)`
- Dictionary syntax: `{"key": "value"}`
- List comprehensions and functional programming

### 5. **Real-World Applicability**
FxPy isn't just a proof-of-concept—it's a functional language capable of:
- File I/O operations
- Mathematical computations
- Data structure manipulation
- Modular program design

## Visual Representation

### Language Syntax Example

**Fibonacci Calculator:**
```javascript
fex fibonacci(n):
    if n <= 1:
        return n
    end
    return fibonacci(n - 1) + fibonacci(n - 2)
end

for i in range(10):
    print("Fibonacci(" + str(i) + ") = " + str(fibonacci(i)))
end
```

**Module System:**
```javascript
# math_utils.fx
fex factorial(n):
    if n == 0: return 1 end
    return n * factorial(n - 1)
end

# main.fx
import math_utils
print(math_utils.factorial(5))  # 120
```

### Architecture Diagram

```
Source Code (.fx file)
       ↓
[LEXER] - Tokenization
       ↓
Token Stream (IDENTIFIER, KEYWORD, OPERATOR, etc.)
       ↓
[PARSER] - AST Generation
       ↓
Abstract Syntax Tree (VarAssignNode, FuncDefNode, etc.)
       ↓
[INTERPRETER] - Tree-Walking Evaluation
       ↓
Runtime Execution (Symbol Tables, Context Management)
       ↓
Output / Result
```

## Key Technical Achievements

1. **Recursive Descent Parser:** Implements operator precedence climbing for correct expression evaluation
2. **Lookahead Parsing:** Context-sensitive parsing for keyword arguments without ambiguity
3. **Dynamic Scoping:** Hierarchical symbol tables with proper closure support
4. **Position Tracking:** Every token tracks its position for precise error reporting
5. **Import Resolution:** Relative path imports with module aliasing and selective importing

## Development Journey

FxPy evolved through several iterations:
- **Phase 1:** Basic calculator (arithmetic operations)
- **Phase 2:** Variables and assignment
- **Phase 3:** Functions and control flow
- **Phase 4:** Lists, dictionaries, and data structures
- **Phase 5:** Module system and imports
- **Phase 6:** Advanced features (variadic functions, keyword arguments)

Each phase required careful design decisions about syntax, semantics, and implementation strategies.

## Impact & Use Cases

- **Education:** Used to teach compiler design principles
- **Prototyping:** Quick scripting for mathematical computations
- **Learning:** Understand language internals by reading clean, documented code
- **Experimentation:** Test language design ideas in a real implementation

## Screenshots/Visual Assets

### Interactive REPL
![REPL Screenshot](screenshots/repl.png)
*Interactive shell showing real-time code execution and error reporting*

### Error Reporting
![Error Display](screenshots/errors.png)
*Position-aware error messages with visual context indicators*

### Module System
![Import System](screenshots/imports.png)
*Demonstration of module imports and symbol resolution*

---

**Note:** This project demonstrates that building a programming language from scratch is achievable and educational. The entire interpreter fits in ~3,300 lines of readable Python code.
