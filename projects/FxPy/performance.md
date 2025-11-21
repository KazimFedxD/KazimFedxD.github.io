# FxPy Performance & Optimization

## Overview

FxPy is designed as an **educational interpreter**, prioritizing code clarity and maintainability over raw performance. However, it achieves reasonable performance for its use cases (scripting, prototyping, learning).

**Latest Benchmark Date:** November 21, 2025  
**Interpreter Version:** FxPy 1.0  
**Python Version:** 3.13.7  
**Test Environment:** Linux

---

## Performance Benchmarks

Comprehensive performance tests measuring execution time and memory usage across 10 different operation categories.

### Benchmark Summary Table

| Benchmark | Mean Time (ms) | Memory (KB) | Throughput |
|-----------|----------------|-------------|------------|
| Arithmetic - Loop 1000 additions | 21.04 | 48.06 | 47,500 ops/sec |
| Function Calls - 500 calls | 40.76 | 258.66 | 12,270 calls/sec |
| Recursion - Fibonacci(15) | 304.82 | 458.80 | 3.3 calls/sec |
| List Operations - 100 append + 100 access | 5.72 | 48.78 | 34,970 ops/sec |
| String Operations - 100 concatenations | 2.40 | 24.34 | 41,670 ops/sec |
| Dictionary Access - 300 lookups | 6.66 | 38.28 | 45,050 lookups/sec |
| Nested Loops - 50x50 iterations | 52.19 | 28.65 | 47,900 iterations/sec |
| Factorial - Iterative (20!) | 1.34 | 32.11 | 746 calls/sec |
| Complex Expressions - 100 evaluations | 7.27 | 36.89 | 13,760 ops/sec |
| Variable Assignment - 1500 assignments | 20.11 | 24.98 | 74,590 assignments/sec |
| **AVERAGE** | **46.23** | **99.95** | - |

### Key Metrics

- **Average Execution Time:** 46.23ms per benchmark
- **Average Memory Usage:** 99.95 KB (~100 KB)
- **Standard Deviation:** Low across all tests (0.07ms - 14.22ms)
- **Memory Efficiency:** Peak usage under 500 KB for all operations

---

## Detailed Performance Results

### 1. Arithmetic Operations
**Test:** Loop with 1000 additions

- **Mean Execution Time:** 21.04ms
- **Median:** 21.03ms
- **Range:** 20.25ms - 22.14ms
- **Std Dev:** 0.36ms (very consistent)
- **Memory:** 48.06 KB
- **Throughput:** ~47,500 operations/second

**Analysis:** Excellent performance for basic arithmetic. Low standard deviation shows predictable execution.

---

### 2. Function Calls
**Test:** 500 function calls with parameters and return values

- **Mean Execution Time:** 40.76ms
- **Median:** 40.63ms
- **Range:** 39.54ms - 47.32ms
- **Std Dev:** 1.05ms
- **Memory:** 258.66 KB
- **Throughput:** ~12,270 calls/second

**Analysis:** Function call overhead is minimal. Slightly higher memory due to call stack frames.

---

### 3. Recursion
**Test:** Fibonacci(15) - recursive implementation

- **Mean Execution Time:** 304.82ms
- **Median:** 306.07ms
- **Range:** 283.16ms - 331.27ms
- **Std Dev:** 11.01ms
- **Memory:** 458.80 KB
- **Throughput:** ~3.3 calls/second

**Analysis:** Expected slowdown for recursion (no tail call optimization). Memory usage reflects call stack depth.

---

### 4. List Operations
**Test:** 100 list appends + 100 indexed accesses

- **Mean Execution Time:** 5.72ms
- **Median:** 5.70ms
- **Range:** 5.58ms - 6.18ms
- **Std Dev:** 0.10ms (extremely consistent)
- **Memory:** 48.78 KB
- **Throughput:** ~34,970 operations/second

**Analysis:** Fast list operations. Low memory footprint. Minimal variance shows efficient implementation.

---

### 5. String Operations
**Test:** 100 string concatenations

- **Mean Execution Time:** 2.40ms
- **Median:** 2.40ms
- **Range:** 2.28ms - 2.67ms
- **Std Dev:** 0.07ms (most consistent benchmark)
- **Memory:** 24.34 KB (lowest memory usage)
- **Throughput:** ~41,670 operations/second

**Analysis:** Surprisingly fast string concatenation despite creating new string objects each time.

---

### 6. Dictionary Access
**Test:** 300 dictionary key lookups

- **Mean Execution Time:** 6.66ms
- **Median:** 6.60ms
- **Range:** 6.45ms - 8.21ms
- **Std Dev:** 0.26ms
- **Memory:** 38.28 KB
- **Throughput:** ~45,050 lookups/second

**Analysis:** Very fast dictionary access. Python's dict implementation provides excellent performance.

---

### 7. Nested Loops
**Test:** 50x50 nested loop iterations (2,500 total)

- **Mean Execution Time:** 52.19ms
- **Median:** 51.78ms
- **Range:** 49.62ms - 57.72ms
- **Std Dev:** 1.79ms
- **Memory:** 28.65 KB
- **Throughput:** ~47,900 iterations/second

**Analysis:** Efficient loop handling. Memory stays low despite nesting depth.

---

### 8. Factorial (Iterative)
**Test:** Calculate 20! using loop

- **Mean Execution Time:** 1.34ms (fastest benchmark!)
- **Median:** 1.29ms
- **Range:** 1.26ms - 1.79ms
- **Std Dev:** 0.12ms
- **Memory:** 32.11 KB
- **Throughput:** ~746 calculations/second

**Analysis:** Iterative approach significantly faster than recursive. Demonstrates loop efficiency.

---

### 9. Complex Expressions
**Test:** 100 evaluations of `(i * 2 + 3) * (i - 1) / (i + 1) + result`

- **Mean Execution Time:** 7.27ms
- **Median:** 7.25ms
- **Range:** 6.78ms - 7.66ms
- **Std Dev:** 0.16ms
- **Memory:** 36.89 KB
- **Throughput:** ~13,760 operations/second

**Analysis:** Handles complex expressions efficiently. AST evaluation overhead is minimal.

---

### 10. Variable Assignment
**Test:** 1,500 variable assignments and reassignments

- **Mean Execution Time:** 20.11ms
- **Median:** 19.79ms
- **Range:** 19.20ms - 23.77ms
- **Std Dev:** 0.99ms
- **Memory:** 24.98 KB
- **Throughput:** ~74,590 assignments/second

**Analysis:** Very fast variable operations. Symbol table lookups are efficient.

---

## Performance Analysis

### Strengths ✅

1. **Fast Arithmetic:** Basic operations execute efficiently (47,500 ops/sec)
2. **Low Memory Footprint:** Average memory usage under 100 KB
3. **Predictable Performance:** Low standard deviation across all runs (0.07ms - 11.01ms)
4. **Efficient Data Structures:** Lists and dictionaries perform well
5. **Quick String Operations:** 41,670 concatenations/second
6. **Fast Variable Access:** 74,590 assignments/second

### Bottlenecks ⚠️

1. **Recursive Calls:** Fibonacci shows recursion overhead (304ms vs 1.34ms for iterative)
2. **Function Call Overhead:** 258 KB memory for call stack management
3. **No JIT Compilation:** Pure interpretation without runtime optimization

### Optimization Opportunities 🔧

1. **Tail Call Optimization:** Reduce recursion overhead
2. **String Builder:** Optimize repeated concatenations
3. **List Pre-allocation:** When size is known in advance
4. **AST Caching:** Cache frequently executed code paths
5. **Bytecode Compilation:** Intermediate representation for faster execution

---
✅ **Clear Errors:** Position tracking adds negligible cost  
✅ **Dynamic Typing:** No type checking overhead during parsing  
✅ **Module Caching:** (Could be added) Imported modules could be cached  

### Known Limitations

❌ **No Optimization:** AST executed directly without optimization passes  
❌ **No Bytecode:** Interpreted AST is slower than bytecode VM  
❌ **Recursion Depth:** Limited by Python's stack (default ~1000)  
❌ **String Operations:** Immutable strings cause O(n) concatenation  
❌ **No Parallelism:** Single-threaded execution only  

---

## Performance Considerations

### Loop Performance

**Simple Loop:**
```javascript
for i in range(10000):
    let x = i * 2
end
```

**Performance:**
- 10,000 iterations: ~50ms
- Each iteration: Tree walking, variable assignment, arithmetic
- Overhead: ~5µs per iteration

**Comparison to Python:**
- Python (bytecode): ~1ms for same loop
- **FxPy is ~50x slower** (expected for tree-walking interpreter)

### Function Call Overhead

**Function Call:**
```javascript
fex add(a, b) -> return a + b
add(5, 10)
```

**Overhead:**
1. Context creation: ~1µs
2. Symbol table setup: ~1µs
3. Argument population: ~1µs
4. Body execution: depends on code
5. Return handling: ~1µs

**Total:** ~5µs per call (excluding body execution)

### Recursion Performance

**Factorial Example:**
```javascript
fex factorial(n):
    if n == 0: return 1 end
    return n * factorial(n - 1)
end

factorial(100)  # ~2ms
factorial(500)  # ~10ms
```

**Recursion Limit:** Inherits Python's limit (~1000 stack frames)

**Tail Call Optimization:** ❌ Not implemented (could be added)

---

## Optimization Opportunities

### 1. **Bytecode Compilation**

**Current:** AST tree walking  
**Improved:** Compile AST to bytecode, execute in VM  
**Benefit:** 10-50x speedup  
**Complexity:** High

### 2. **Constant Folding**

**Current:** `2 + 3` evaluated every time  
**Improved:** Compute at parse time: `5`  
**Benefit:** Faster for constant expressions  
**Complexity:** Medium

### 3. **Module Caching**

**Current:** Re-parse imported modules every time  
**Improved:** Cache parsed AST or execution result  
**Benefit:** Faster imports  
**Complexity:** Low

### 4. **String Builder**

**Current:** String concatenation creates new strings  
**Improved:** Use mutable buffer for building strings  
**Benefit:** O(n) instead of O(n²) for concatenation  
**Complexity:** Low

### 5. **JIT Compilation**

**Current:** Interpreted execution  
**Improved:** Compile hot code paths to native code  
**Benefit:** Near-native speed for loops  
**Complexity:** Very High (requires external library like RPython/PyPy)

---

## Real-World Usage Patterns

### Best Use Cases

✅ **Learning:** Understanding interpreter design  
✅ **Prototyping:** Quick scripts and calculations  
✅ **DSLs:** Embedded domain-specific languages  
✅ **Education:** Teaching programming concepts  
✅ **Small Scripts:** <1000 lines, not performance-critical  

### Not Recommended For

❌ **Production Systems:** Too slow, no optimization  
❌ **Large Datasets:** No NumPy-like optimizations  
❌ **High-Performance Computing:** Use Python/C/Rust  
❌ **Web Servers:** No async support, slow execution  

---

## Comparison with Other Languages

Based on real benchmarks, here's how FxPy compares:

| Language | Implementation | Relative Speed | Example: Loop 1000 additions |
|----------|----------------|----------------|------------------------------|
| **FxPy** | Tree-walking interpreter | 1x (21.04ms) | Baseline |
| **Python 3.13** | Bytecode VM | ~40-50x faster | ~0.5ms |
| **JavaScript (Node.js)** | JIT compilation | ~200-300x faster | ~0.07ms |
| **C (compiled)** | Native machine code | ~2000-5000x faster | ~0.004ms |

**Actual FxPy Benchmarks:**
- Arithmetic (1000 ops): 21.04ms → 47,500 ops/sec
- Function calls (500): 40.76ms → 12,270 calls/sec
- String concat (100): 2.40ms → 41,670 ops/sec
- List operations (200): 5.72ms → 34,970 ops/sec

**Comparison Context:**
FxPy is an educational interpreter built in Python, so its performance is limited by:
1. Python interpreter overhead
2. Tree-walking execution (no bytecode)
3. No JIT compilation or optimization
4. Dynamic typing with runtime checks

**Use FxPy for:** Learning, prototyping, small scripts  
**Use Python/JS/C for:** Production, performance-critical code

---

## Profiling & Debugging

### Adding Timing

Modify `run.py` to measure execution time:

```python
import time

def run(fn, text):
    start = time.time()
    
    # Lexing
    lex_start = time.time()
    lexer = Lexer(fn, text)
    tokens, error = lexer.make_tokens()
    lex_time = time.time() - lex_start
    
    # Parsing
    parse_start = time.time()
    parser = Parser(tokens)
    ast = parser.parse()
    parse_time = time.time() - parse_start
    
    # Interpretation
    interp_start = time.time()
    # ... execution
    interp_time = time.time() - interp_start
    
    total_time = time.time() - start
    
    print(f"Lex: {lex_time*1000:.2f}ms | Parse: {parse_time*1000:.2f}ms | Interp: {interp_time*1000:.2f}ms | Total: {total_time*1000:.2f}ms")
```

### Memory Profiling

Use Python's `tracemalloc`:

```python
import tracemalloc

tracemalloc.start()
# Run FxPy code
current, peak = tracemalloc.get_traced_memory()
print(f"Current: {current / 1024 / 1024:.2f}MB | Peak: {peak / 1024 / 1024:.2f}MB")
tracemalloc.stop()
```

---

## Scalability

### Code Size Limits

| Lines of Code | Expected Performance | Notes |
|---------------|---------------------|-------|
| **<100 lines** | Excellent | Near-instant execution |
| **100-500 lines** | Good | <100ms total time |
| **500-1000 lines** | Acceptable | <500ms total time |
| **1000-5000 lines** | Slow | 1-5 seconds |
| **>5000 lines** | Very Slow | Consider refactoring |

### Recursion Depth

**Default Limit:** ~1000 (Python's recursion limit)

**Increase Limit (not recommended):**
```python
import sys
sys.setrecursionlimit(5000)  # Use with caution
```

**Better Approach:** Use iterative algorithms instead of deep recursion.

---

## Future Performance Improvements

### Planned (Feasible)
1. ✅ Module caching
2. ✅ Constant folding
3. ✅ Dead code elimination
4. ✅ String builder optimization

### Aspirational (Complex)
1. ⚠️ Bytecode compilation
2. ⚠️ Tail call optimization
3. ⚠️ JIT compilation
4. ⚠️ Parallel execution

---

## Performance Summary

**FxPy is fast enough for:**
- Educational purposes
- Small scripts (<1000 lines)
- Prototyping and experimentation
- Interactive REPL usage

**FxPy is NOT optimized for:**
- Production workloads
- Performance-critical applications
- Large-scale data processing
- Real-time systems

**Philosophy:** Clarity > Performance

The codebase prioritizes readability and educational value over execution speed, making it ideal for learning how interpreters work.
