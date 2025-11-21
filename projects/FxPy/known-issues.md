# Known Issues & Limitations

This document lists current bugs, limitations, and areas for improvement in FxPy.

---

## Current Limitations

### 1. **Performance**

**Issue:** FxPy is slow compared to production interpreters.

**Impact:**
- Large scripts (>1000 lines) take several seconds to execute
- Loops with 10,000+ iterations are noticeably slow
- Recursive functions deeper than ~1000 calls hit Python's stack limit

**Reason:** Tree-walking interpreter without optimization (educational focus)

**Workaround:**
- Keep scripts under 1000 lines
- Use iterative algorithms instead of deep recursion
- For performance-critical code, use Python directly

**Planned Fix:** ⚠️ Bytecode compilation (complex, future version)

---

### 2. **No Standard Library**

**Issue:** FxPy has minimal built-in functions (~25), no standard library.

**Impact:**
- No file I/O helpers (must use built-in `open`, if added)
- No JSON/HTTP/networking libraries
- No datetime/regex support
- Limited math functions

**Reason:** Educational project, focused on language implementation

**Workaround:**
- Implement needed functions in FxPy code
- Use Python interop (if added as built-in)

**Planned Fix:** ✅ Standard library modules (feasible)

---

### 3. **Python Recursion Limit**

**Issue:** Recursion depth limited to ~1000 calls (Python's default).

**Impact:**
- `factorial(1000)` will crash with stack overflow
- Deep recursive algorithms fail
- No tail call optimization

**Example:**
```javascript
fex deep_recursion(n):
    if n == 0: return 0 end
    return deep_recursion(n - 1)
end

deep_recursion(10000)  # ❌ RecursionError
```

**Workaround:**
- Use iterative versions of algorithms
- Increase Python's limit (not recommended): `sys.setrecursionlimit(5000)`

**Planned Fix:** ⚠️ Tail call optimization (complex)

---

### 4. **String Concatenation Performance**

**Issue:** String concatenation creates new strings (O(n) each time).

**Impact:**
- Building large strings with `+` is slow
- O(n²) complexity for repeated concatenation

**Example:**
```javascript
let result = ""
for i in range(1000):
    result = result + str(i)  # Slow!
end
```

**Workaround:**
- Use list + join pattern (if implemented):
  ```javascript
  let parts = []
  for i in range(1000):
      append(parts, str(i))
  end
  let result = join(parts, "")
  ```

**Planned Fix:** ✅ String builder (feasible)

---

### 5. **No Module Caching**

**Issue:** Imported modules are re-parsed and re-executed every time.

**Impact:**
- Slow startup if many imports
- Duplicate work if module imported multiple times

**Example:**
```javascript
import math  # Parses and executes math.fx
import math  # ❌ Parses and executes again!
```

**Workaround:**
- Minimize imports
- Import once at top of file

**Planned Fix:** ✅ Module caching (easy to implement)

---

### 6. **Limited Error Context**

**Issue:** Runtime errors don't show full stack trace.

**Impact:**
- Hard to debug nested function calls
- Unclear which function caused error in call chain

**Example:**
```javascript
fex a(): return b() end
fex b(): return c() end
fex c(): return 1 / 0 end  # Error here

a()  # Error message doesn't show full call stack
```

**Workaround:**
- Add debug print statements
- Use try-catch (if implemented)

**Planned Fix:** ✅ Full stack traces (medium complexity)

---

### 7. **No Async/Concurrency**

**Issue:** FxPy is single-threaded, no async/await support.

**Impact:**
- Can't run parallel tasks
- Blocking I/O blocks entire program
- No event loops or callbacks

**Workaround:**
- None (fundamental limitation)

**Planned Fix:** ⚠️ Async support (very complex)

---

## Known Bugs

### Bug #1: Import Path Resolution on Windows

**Status:** 🐛 Active Bug

**Description:** Windows backslashes in paths may cause import errors.

**Affected:** Windows only

**Example:**
```javascript
import folder\module  # ❌ May fail
```

**Workaround:** Use forward slashes:
```javascript
import folder/module  # ✅ Works
```

**Fix Status:** Medium priority

---

### Bug #2: Division by Zero Error Message

**Status:** 🐛 Active Bug

**Description:** Division by zero error doesn't show position in code.

**Example:**
```javascript
let x = 10 / 0  # Error, but position not highlighted
```

**Workaround:** None

**Fix Status:** Low priority (error is caught, just missing position)

---

### Bug #3: Keyword Argument Order Sensitivity

**Status:** ⚠️ Behavior Quirk (Not a Bug)

**Description:** Keyword arguments must come after positional arguments.

**Example:**
```javascript
fex test(a, b=10, c=20): ... end

test(c=30, 5)  # ❌ Error: positional after keyword
test(5, c=30)  # ✅ Correct
```

**Workaround:** Always put positional args first

**Fix Status:** Won't fix (matches Python behavior)

---

## Platform-Specific Issues

### Windows

**Issue:** Console encoding may not support UTF-8 properly.

**Impact:** Unicode characters in strings may display incorrectly.

**Workaround:**
```powershell
# Set console to UTF-8
chcp 65001
```

**Status:** External issue (Windows console limitation)

---

### macOS

**Issue:** None currently known.

---

### Linux

**Issue:** None currently known.

---

## Missing Features

### 1. **Exception Handling**

**Feature:** `try`, `catch`, `finally` blocks

**Status:** 🚧 Not implemented

**Workaround:** Check conditions before operations:
```javascript
if divisor != 0:
    let result = numerator / divisor
else:
    print("Error: division by zero")
end
```

---

### 2. **Classes/Objects**

**Feature:** Object-oriented programming (classes, inheritance, methods)

**Status:** 🚧 Not implemented

**Workaround:** Use dictionaries to simulate objects:
```javascript
fex create_person(name, age):
    return {"name": name, "age": age, "greet": greet_method}
end

fex greet_method(self):
    return "Hello, I'm " + self["name"]
end
```

---

### 3. **List Comprehensions**

**Feature:** `[x * 2 for x in range(10)]`

**Status:** 🚧 Not implemented

**Workaround:** Use loops:
```javascript
let result = []
for x in range(10):
    append(result, x * 2)
end
```

---

### 4. **File I/O**

**Feature:** Built-in file operations (open, read, write)

**Status:** 🚧 Not implemented

**Workaround:** Use `run_file()` built-in for executing files (limited)

---

### 5. **Multiline Strings**

**Feature:** Triple-quoted strings for multiline text

**Status:** 🚧 Not implemented

**Workaround:** Use concatenation:
```javascript
let text = "Line 1\n" +
           "Line 2\n" +
           "Line 3"
```

---

### 6. **Operator Overloading**

**Feature:** Define custom behavior for operators on custom types

**Status:** 🚧 Not implemented (requires class system first)

---

### 7. **Decorators**

**Feature:** `@decorator` syntax for wrapping functions

**Status:** 🚧 Not implemented

**Workaround:** Use higher-order functions:
```javascript
fex logged(func):
    fex wrapper(*args):
        print("Calling " + func.name)
        return func(*args)
    end
    return wrapper
end

let my_func = logged(original_func)
```

---

## Browser/IDE Support

### Syntax Highlighting

**Issue:** `.fx` files not recognized by editors.

**Workaround:**
- **VS Code:** Associate `.fx` with JavaScript highlighting:
  ```json
  "files.associations": {
    "*.fx": "javascript"
  }
  ```
- **Vim:** `autocmd BufRead,BufNewFile *.fx set filetype=javascript`

---

### Language Server

**Issue:** No LSP (Language Server Protocol) support.

**Impact:**
- No autocomplete
- No go-to-definition
- No inline error checking

**Status:** 🚧 Not implemented (complex)

---

## Testing & Quality

### Unit Tests

**Issue:** No automated test suite.

**Impact:** Hard to verify correctness after changes.

**Status:** ⚠️ Should be added

---

### Continuous Integration

**Issue:** No CI/CD pipeline.

**Impact:** No automated testing on commits.

**Status:** ⚠️ Could be added (GitHub Actions)

---

## Documentation Gaps

### 1. **Formal Grammar Specification**

**Issue:** `grammer.txt` is incomplete/outdated.

**Status:** ⚠️ Needs update

---

### 2. **API Documentation**

**Issue:** No auto-generated docs for internal APIs.

**Status:** ⚠️ Could add Sphinx/pdoc

---

### 3. **Video Tutorials**

**Issue:** No video walkthroughs of language features.

**Status:** 📝 Planned

---

## Security Considerations

### Code Injection

**Issue:** FxPy can execute arbitrary code (by design).

**Impact:** Don't run untrusted `.fx` files.

**Mitigation:** None (not intended for sandboxed execution)

---

### Resource Limits

**Issue:** No CPU/memory limits on execution.

**Impact:** Infinite loops will hang, memory leaks possible.

**Workaround:** Monitor process manually, kill if needed.

---

## Planned Improvements

### Short-Term (Feasible)
1. ✅ Module caching
2. ✅ Full stack traces
3. ✅ String builder optimization
4. ✅ File I/O built-ins
5. ✅ Exception handling (try/catch)

### Medium-Term (Complex)
1. ⚠️ List comprehensions
2. ⚠️ Class/object system
3. ⚠️ Standard library modules
4. ⚠️ LSP for editor support

### Long-Term (Very Complex)
1. 🔮 Bytecode compilation
2. 🔮 JIT compilation
3. 🔮 Async/await support
4. 🔮 Package manager

---

## Reporting Issues

Found a bug? Have a suggestion?

1. **Check this document** to see if it's a known issue
2. **Search GitHub issues:** [github.com/KazimFedxD/FxPy/issues](https://github.com/KazimFedxD/FxPy/issues)
3. **Create new issue** with:
   - FxPy version (git commit hash)
   - Python version
   - Operating system
   - Minimal code to reproduce
   - Expected vs actual behavior

---

## Workaround Strategies

### General Tips

1. **Keep scripts small:** <500 lines for best performance
2. **Avoid deep recursion:** Use iteration when possible
3. **Profile first:** Identify bottlenecks before optimizing
4. **Use modules:** Split large programs into smaller files
5. **Contribute fixes:** FxPy is open source!

---

## Summary

FxPy is an educational project, not a production-ready language. Many limitations are intentional trade-offs for simplicity and readability.

**What FxPy Does Well:**
- ✅ Clear, readable implementation
- ✅ Educational value
- ✅ Core language features
- ✅ Zero dependencies

**What FxPy Lacks:**
- ❌ Performance optimization
- ❌ Standard library
- ❌ Advanced features (classes, async, etc.)
- ❌ Production-grade tooling

Use FxPy for **learning and experimentation**, not production workloads.
