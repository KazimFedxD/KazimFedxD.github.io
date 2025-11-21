# FxPy Future Enhancements

This document outlines planned features and improvements for FxPy.

---

## Roadmap

### Version 1.1 (Near Future - Next 3 Months)

**Focus:** Bug fixes and quality of life improvements

- [ ] **Module Caching**
  - Cache parsed AST of imported modules
  - Avoid re-parsing the same module multiple times
  - Reduces import overhead by ~90%

- [ ] **Full Stack Traces**
  - Show complete call chain for runtime errors
  - Include function names, line numbers, and file paths
  - Make debugging nested function calls easier

- [ ] **String Builder Optimization**
  - Implement efficient string concatenation
  - Use list-based builder internally
  - O(n) instead of O(n²) for repeated concatenation

- [ ] **File I/O Built-ins**
  - `open(filename, mode)` - Open file
  - `read(file)` - Read entire file
  - `readline(file)` - Read single line
  - `write(file, text)` - Write to file
  - `close(file)` - Close file handle

- [ ] **Additional Built-in Functions**
  - `map(func, list)` - Apply function to list
  - `filter(func, list)` - Filter list by predicate
  - `reduce(func, list, initial)` - Reduce list to single value
  - `sorted(list)` - Return sorted copy
  - `reversed(list)` - Return reversed copy

---

### Version 1.2 (3-6 Months)

**Focus:** Exception handling and control flow

- [ ] **Try-Catch-Finally**
  ```javascript
  try:
      let result = risky_operation()
  catch error:
      print("Error: " + error.message)
  finally:
      cleanup()
  end
  ```

- [ ] **Throw/Raise Statements**
  ```javascript
  if invalid_input:
      throw Error("Invalid input provided")
  end
  ```

- [ ] **Custom Error Types**
  ```javascript
  error ValueError(message):
      # Custom error type
  end
  ```

- [ ] **Assert Statement**
  ```javascript
  assert x > 0, "x must be positive"
  ```

---

### Version 1.3 (6-12 Months)

**Focus:** Data structures and functional programming

- [ ] **List Comprehensions**
  ```javascript
  let squares = [x * x for x in range(10)]
  let evens = [x for x in numbers if x % 2 == 0]
  ```

- [ ] **Dictionary Comprehensions**
  ```javascript
  let squared = {x: x*x for x in range(5)}
  ```

- [ ] **Tuple Type**
  ```javascript
  let point = (10, 20)
  let x, y = point  # Tuple unpacking
  ```

- [ ] **Set Type**
  ```javascript
  let unique = {1, 2, 3, 2, 1}  # {1, 2, 3}
  ```

- [ ] **Destructuring Assignment**
  ```javascript
  let [first, *rest] = [1, 2, 3, 4]
  let {name, age} = user_dict
  ```

---

### Version 2.0 (1-2 Years)

**Focus:** Object-oriented programming

- [ ] **Class System**
  ```javascript
  class Person:
      fex __init__(self, name, age):
          self.name = name
          self.age = age
      end
      
      fex greet(self):
          return "Hello, I'm " + self.name
      end
  end
  
  let alice = Person("Alice", 30)
  print(alice.greet())
  ```

- [ ] **Inheritance**
  ```javascript
  class Student extends Person:
      fex __init__(self, name, age, grade):
          super().__init__(name, age)
          self.grade = grade
      end
  end
  ```

- [ ] **Properties and Methods**
  - Instance methods, class methods, static methods
  - Getter/setter properties
  - Private attributes (name mangling)

- [ ] **Operator Overloading**
  ```javascript
  class Vector:
      fex __add__(self, other):
          # Define custom + operator
      end
  end
  ```

---

### Version 2.1 (2+ Years)

**Focus:** Standard library and ecosystem

- [ ] **Math Module**
  - Trigonometric functions (sin, cos, tan)
  - Logarithms (log, ln)
  - Constants (pi, e)
  - Statistical functions (mean, median, stdev)

- [ ] **String Module**
  - Regular expressions
  - String formatting (template strings)
  - Unicode utilities

- [ ] **Collections Module**
  - Ordered dictionaries
  - Default dictionaries
  - Counters
  - Deques

- [ ] **JSON Module**
  - `json.parse(text)` - Parse JSON string
  - `json.stringify(obj)` - Convert to JSON

- [ ] **HTTP Module** (Basic)
  - `http.get(url)` - GET request
  - `http.post(url, data)` - POST request

---

### Version 3.0 (Long-Term Vision)

**Focus:** Performance and tooling

- [ ] **Bytecode Compilation**
  - Compile AST to bytecode
  - Stack-based virtual machine
  - 10-50x performance improvement

- [ ] **Optimization Passes**
  - Constant folding
  - Dead code elimination
  - Loop unrolling
  - Inline expansion

- [ ] **Tail Call Optimization**
  - Detect tail-recursive functions
  - Optimize to iterative execution
  - Avoid stack overflow

- [ ] **Language Server Protocol (LSP)**
  - Autocomplete for variables/functions
  - Go-to-definition
  - Inline error checking
  - Hover documentation

- [ ] **Package Manager**
  ```bash
  fxpm install math_utils
  fxpm publish my_package
  ```

- [ ] **Debugger**
  - Breakpoints
  - Step through execution
  - Inspect variables
  - Call stack visualization

---

## Community Requests

### Most Wanted Features

*(Based on hypothetical user feedback—no users yet!)*

1. **Exception Handling** (try/catch)
2. **Classes and Objects**
3. **List Comprehensions**
4. **Standard Library**
5. **Better Performance**

---

## Experimental Ideas

### Async/Await (Highly Complex)

```javascript
async fex fetch_data(url):
    let response = await http.get(url)
    return response.json()
end

async fex main():
    let data = await fetch_data("https://api.example.com")
    print(data)
end
```

**Status:** 🔮 Research phase

---

### Pattern Matching

```javascript
match value:
    case 0: return "zero"
    case 1: return "one"
    case x if x > 10: return "big"
    case _: return "other"
end
```

**Status:** 🔮 Consideration

---

### Generics/Type Hints (Optional Typing)

```javascript
fex sort<T>(items: List<T>) -> List<T>:
    # Type-checked sorting
end
```

**Status:** 🔮 Far future

---

### Macros/Metaprogramming

```javascript
macro unless(condition, body):
    # Compile-time code transformation
    if not condition: body end
end

unless x > 10:
    print("x is small")
end
```

**Status:** 🔮 Ambitious

---

## Non-Goals

**What FxPy Will NOT Do:**

❌ **GUI Framework** - Terminal-based only  
❌ **Web Framework** - Not a web language  
❌ **Graphics/Game Engine** - Text-focused  
❌ **Mobile Apps** - Desktop/server only  
❌ **Blockchain/Crypto** - Not the target domain  

---

## How to Contribute Ideas

1. **Open GitHub Issue** with `[Feature Request]` tag
2. **Describe the feature:**
   - What problem does it solve?
   - Example syntax/usage
   - Why it's valuable
3. **Discuss implementation:**
   - Complexity estimate
   - Potential challenges
   - Alternative approaches

---

## Development Priorities

### High Priority
1. ✅ Exception handling (try/catch)
2. ✅ Module caching
3. ✅ Stack traces
4. ✅ File I/O

### Medium Priority
1. ⚠️ List comprehensions
2. ⚠️ Class system
3. ⚠️ Standard library
4. ⚠️ String builder

### Low Priority
1. 🔮 Bytecode compilation
2. 🔮 LSP support
3. 🔮 Package manager
4. 🔮 Async/await

---

## Timeline Disclaimer

**All timelines are estimates and subject to change.**

FxPy is a solo project developed in spare time. Features may be:
- Implemented faster (if simple)
- Delayed (if complex or low priority)
- Canceled (if not feasible)

Community contributions can accelerate development!

---

## Version Naming

- **1.x** = Minor improvements, bug fixes, new built-ins
- **2.x** = Major features (classes, OOP)
- **3.x** = Performance overhaul (bytecode, JIT)

**Current Version:** 1.0 (initial release)

---

## Long-Term Vision

**10 Years from Now:**

FxPy could be:
- A teaching language used in universities
- A complete scripting language with rich ecosystem
- An optimized interpreter with bytecode compilation
- A community-driven open source project

**Or it could remain:**
- A personal learning project
- An educational reference implementation
- A portfolio piece demonstrating language skills

**Either outcome is valuable!**

---

## Get Involved

Want to help shape FxPy's future?

- ⭐ Star the repo to show support
- 💬 Discuss feature ideas in GitHub Issues
- 🔧 Submit pull requests for improvements
- 📝 Write tutorials or blog posts
- 🐛 Report bugs and test new features

---

## Thank You

To everyone interested in FxPy's development—your feedback and contributions make this project better!

---

**Last Updated:** November 19, 2025

*This roadmap will evolve based on community feedback and development progress.*
