# FxPy Setup & Installation

## Prerequisites

### System Requirements

- **Operating System:** Windows, macOS, or Linux
- **Python Version:** 3.11 or higher
- **RAM:** 512MB minimum (1GB recommended)
- **Disk Space:** ~5MB for source code

### Checking Python Version

```bash
python --version
# or
python3 --version
```

If you don't have Python 3.11+, download it from [python.org](https://www.python.org/downloads/).

---

## Installation Steps

### Option 1: Clone from GitHub

```bash
# Clone the repository
git clone https://github.com/KazimFedxD/FxPy.git

# Navigate to directory
cd FxPy

# Verify installation
python shell.py
```

### Option 2: Download ZIP

1. Go to [github.com/KazimFedxD/FxPy](https://github.com/KazimFedxD/FxPy)
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Open terminal in extracted folder
5. Run `python shell.py`

---

## Running FxPy

### Interactive Mode (REPL)

The REPL (Read-Eval-Print Loop) is perfect for experimenting and learning:

```bash
python shell.py
```

You'll see:
```
FxPy >
```

Try some commands:
```javascript
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
```

**Exit REPL:**
- Press `Ctrl+C` or `Ctrl+D`
- Type `exit()` (if you add it as a built-in)

### Running Script Files

Create a `.fx` file:

**hello.fx:**
```javascript
let name = "FxPy"
print("Hello from " + name + "!")

fex greet(person):
    return "Welcome, " + person
end

print(greet("Developer"))
```

Execute it:
```bash
python run.py hello.fx
```

Or on Unix/Linux, make `run.py` executable:
```bash
chmod +x run.py
./run.py hello.fx
```

---

## Project Structure

After installation, your directory should look like this:

```
FxPy/
├── lexer.py              # Tokenization (305 lines)
├── fxparser.py           # Parsing (1,407 lines)
├── interpreter.py        # Execution (1,393 lines)
├── errors.py             # Error handling (88 lines)
├── string_with_arrows.py # Error visualization (50 lines)
├── run.py                # Script runner (19 lines)
├── shell.py              # Interactive REPL (40 lines)
├── grammer.txt           # Grammar specification
├── README.md             # Documentation
├── modules/              # Example modules
│   ├── math.fx
│   └── test.fx
└── __pycache__/          # Python bytecode cache
```

---

## Configuration

### No Dependencies Required

FxPy uses **only Python's standard library**. No `pip install` needed!

### Environment Variables (Optional)

You can set these for convenience:

**Linux/macOS:**
```bash
# Add to ~/.bashrc or ~/.zshrc
export FXPY_PATH="/path/to/FxPy"
alias fxpy="python $FXPY_PATH/shell.py"
alias fxrun="python $FXPY_PATH/run.py"
```

**Windows (PowerShell):**
```powershell
# Add to PowerShell profile
$env:FXPY_PATH = "C:\path\to\FxPy"
Set-Alias fxpy "python $env:FXPY_PATH\shell.py"
Set-Alias fxrun "python $env:FXPY_PATH\run.py"
```

Now you can run:
```bash
fxpy          # Start REPL
fxrun main.fx # Run script
```

---

## Creating Your First Program

### Step 1: Create a File

Create `calculator.fx`:

```javascript
fex add(a, b) -> return a + b
fex subtract(a, b) -> return a - b
fex multiply(a, b) -> return a * b
fex divide(a, b) -> return a / b

print("Calculator Demo")
print("10 + 5 = " + str(add(10, 5)))
print("10 - 5 = " + str(subtract(10, 5)))
print("10 * 5 = " + str(multiply(10, 5)))
print("10 / 5 = " + str(divide(10, 5)))
```

### Step 2: Run It

```bash
python run.py calculator.fx
```

**Output:**
```
Calculator Demo
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
10 / 5 = 2.0
```

### Step 3: Create a Module

Create `math_utils.fx`:

```javascript
fex factorial(n):
    if n == 0: return 1 end
    return n * factorial(n - 1)
end

fex fibonacci(n):
    if n <= 1: return n end
    return fibonacci(n - 1) + fibonacci(n - 2)
end
```

Create `main.fx`:

```javascript
import math_utils

print("Factorial of 5: " + str(math_utils.factorial(5)))
print("Fibonacci of 10: " + str(math_utils.fibonacci(10)))
```

Run:
```bash
python run.py main.fx
```

**Output:**
```
Factorial of 5: 120
Fibonacci of 10: 55
```

---

## Troubleshooting

### Issue 1: "python: command not found"

**Solution:** Try `python3` instead:
```bash
python3 shell.py
python3 run.py script.fx
```

### Issue 2: "SyntaxError: invalid syntax" in FxPy code

**Cause:** Python is trying to execute `.fx` file directly.

**Solution:** Always use `run.py`:
```bash
# Wrong
python script.fx

# Correct
python run.py script.fx
```

### Issue 3: "ModuleNotFoundError" when importing

**Cause:** Import paths are relative to the importing file.

**Solution:** Ensure module file is in the same directory:
```
project/
├── main.fx
└── math_utils.fx  # Must be in same folder
```

Or use subdirectories:
```javascript
import utils.math  # Looks for utils/math.fx
```

### Issue 4: "File not found" error

**Cause:** Wrong file path or extension.

**Solution:**
- Use `.fx` extension for FxPy files
- Check file path is correct
- Use absolute path if needed

---

## Development Setup

### Modifying the Interpreter

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/FxPy.git
   ```
3. **Make changes** to source files
4. **Test changes:**
   ```bash
   python shell.py  # Test in REPL
   python run.py test.fx  # Test with script
   ```
5. **Commit and push:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

### Adding Built-in Functions

Edit `interpreter.py`:

```python
# Find BuiltInFunction definitions around line 800

BuiltInFunction.print = BuiltInFunction("print")
# Add your function:
BuiltInFunction.my_function = BuiltInFunction("my_function")

# Then implement it around line 1000:

def execute_my_function(exec_ctx):
    # Your implementation
    return RTResult().success(Number.null)

BuiltInFunction.execute_my_function = execute_my_function
```

### Adding Keywords

1. **Add to lexer.py:**
   ```python
   RESERVED_KEYWORDS = [
       # ... existing keywords
       "mynewkeyword"
   ]
   ```

2. **Add parsing logic to fxparser.py:**
   ```python
   def mynewkeyword_expr(self):
       # Parsing logic
   ```

3. **Add execution to interpreter.py:**
   ```python
   def visit_MyNewKeywordNode(self, node, context):
       # Execution logic
   ```

---

## Next Steps

1. **Explore Examples:** Check the `modules/` folder for sample code
2. **Read the README:** Full language syntax in `README.md`
3. **Experiment in REPL:** Try different features interactively
4. **Build Something:** Create a project using FxPy
5. **Contribute:** Suggest features or report bugs on GitHub

---

## Challenges & Solutions

### Challenge 1: Understanding the Codebase

**Problem:** FxPy has ~3,300 lines of code across multiple files.

**Solution:**
- Start with `lexer.py` (simplest, ~305 lines)
- Read `grammer.txt` to understand syntax
- Follow execution flow: `run.py` → `lexer.py` → `fxparser.py` → `interpreter.py`
- Use the REPL to experiment with features

### Challenge 2: Python Version Compatibility

**Problem:** Code uses modern Python features (3.11+).

**Solution:**
- Install Python 3.11 or higher
- Use `pyenv` to manage multiple Python versions:
  ```bash
  pyenv install 3.11
  pyenv local 3.11
  ```

### Challenge 3: No Syntax Highlighting for .fx Files

**Problem:** Editors don't recognize `.fx` files.

**Solution:**
- Use JavaScript/Python syntax highlighting (similar syntax)
- **VS Code:** Add to `settings.json`:
  ```json
  "files.associations": {
    "*.fx": "javascript"
  }
  ```
- **Vim:** Add to `.vimrc`:
  ```vim
  autocmd BufRead,BufNewFile *.fx set filetype=javascript
  ```

---

## Resources

- **GitHub Repository:** [github.com/KazimFedxD/FxPy](https://github.com/KazimFedxD/FxPy)
- **Full Documentation:** See `README.md` for complete syntax reference
- **Grammar Specification:** See `grammer.txt` for formal grammar
- **Example Code:** Check `modules/` folder

---

**Congratulations!** You're now ready to start programming in FxPy. Happy coding! 🚀
