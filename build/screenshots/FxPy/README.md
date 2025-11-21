# Screenshots

This directory contains visual assets for the FxPy project portfolio documentation.

---

## Required Screenshots

### For CLI Tools (FxPy is a command-line interpreter):

1. **Terminal usage examples**
   - REPL startup screen
   - Interactive session with variable assignments
   - Function definitions and calls
   - Loop demonstrations

2. **Help/documentation output**
   - Built-in functions list (`help()` if implemented)
   - Error messages with visual indicators

3. **Execution examples**
   - Running `.fx` script files
   - Output from example programs
   - Module import demonstrations

---

## Screenshot Guidelines

### Resolution
- **Minimum:** 1920x1080
- **Recommended:** 2560x1440 for high-DPI displays
- **Format:** PNG (lossless, good for text)

### Terminal Settings for Screenshots

1. **Font Size:** 14-18pt (readable when scaled)
2. **Color Scheme:** Dark background recommended
   - Dracula
   - Nord
   - Solarized Dark
   - One Dark
3. **Window Size:** Full screen or large terminal window
4. **Shell Prompt:** Keep it clean and minimal

### Content Guidelines

- ✅ Show **real functionality** (not placeholder/dummy code)
- ✅ Use **meaningful variable names** and examples
- ✅ Demonstrate **actual features** of FxPy
- ✅ Keep terminal **clean** (no unnecessary clutter)
- ❌ No **personal information** (usernames, file paths with your name)
- ❌ No **Lorem ipsum** or meaningless content
- ❌ No **sensitive data** (even in examples)

### Naming Convention

Use descriptive filenames:
- `repl-startup.png` - Clean REPL prompt
- `repl-interactive.png` - Interactive session
- `repl-error.png` - Error message display
- `script-execution.png` - Running a `.fx` file
- `code-functions.png` - Function definitions in editor
- `code-imports.png` - Module import example
- `repl-demo.gif` - Animated REPL session
- `error-demo.gif` - Animated error display
- `function-demo.gif` - Animated function execution

---

## Recommended Screenshots for FxPy

### Essential (Minimum Required)

1. **`repl-startup.png`**
   - Content: Terminal showing `FxPy >` prompt after running `python shell.py`
   - Purpose: Show how to start the REPL

2. **`repl-interactive.png`**
   - Content: Session showing variables, functions, loops
   - Example commands:
     ```javascript
     let x = 42
     fex square(n) -> return n * n
     square(x)
     for i in range(5): print(i) end
     ```

3. **`repl-error.png`**
   - Content: Error message with visual arrows
   - Example: Syntax error showing position indicator
   - Purpose: Demonstrate error reporting feature

4. **`script-execution.png`**
   - Content: Running a `.fx` file with `python run.py script.fx`
   - Show command and output

### Optional (Highly Recommended)

5. **`code-functions.png`**
   - Content: `.fx` file open in code editor (VS Code, Vim, etc.)
   - Show function definitions with syntax highlighting
   - Use JavaScript highlighting for `.fx` files

6. **`code-imports.png`**
   - Content: Two files showing module and importing file
   - Split-screen or side-by-side
   - Demonstrate import system

7. **`architecture-diagram.png`**
   - Content: Visual diagram of Lexer → Parser → Interpreter
   - Use draw.io, Mermaid, or similar tool
   - Show data flow

### GIF Animations (Optional but Impressive)

8. **`repl-demo.gif`**
   - Duration: 10-15 seconds
   - Show typing commands and seeing results
   - Tools: LICEcap, ScreenToGif, Peek

9. **`error-demo.gif`**
   - Duration: 5-10 seconds
   - Trigger error and show message
   - Demonstrates error handling

10. **`function-demo.gif`**
    - Duration: 10 seconds
    - Define function, call it multiple times
    - Shows recursion or loops

---

## Tools for Capturing Screenshots

### Linux
- **Flameshot** (recommended, annotate screenshots)
- **GNOME Screenshot** (built-in)
- **Spectacle** (KDE)
- **Scrot** (command-line)

### macOS
- **Cmd+Shift+4** (built-in, select area)
- **Cmd+Shift+3** (full screen)
- **Cmd+Shift+5** (advanced options)

### Windows
- **Win+Shift+S** (Snipping Tool, built-in)
- **ShareX** (free, powerful)
- **Greenshot** (free, simple)

### Cross-Platform
- **OBS Studio** (screen recording, can extract frames)
- **GIMP** (screenshot + editing)

---

## Tools for Creating GIFs

### Recommended
- **LICEcap** (Windows/macOS, simple)
- **ScreenToGif** (Windows, powerful)
- **Peek** (Linux, simple)
- **Kap** (macOS, modern)

### Tips for GIFs
- Keep file size under 5MB
- 10-15 seconds max duration
- Lower FPS (10-15) for smaller files
- Optimize with tools like ezgif.com

---

## Image Optimization

Before adding screenshots to documentation:

1. **Compress Images:**
   - Use tools like TinyPNG, ImageOptim, or `optipng`
   - Target: <500KB per image for web use

2. **Crop Unnecessary Areas:**
   - Remove excessive whitespace
   - Focus on relevant content

3. **Verify Readability:**
   - Text should be clear and legible
   - No blurry fonts

---

## Adding Screenshots to Documentation

### In Markdown Files

```markdown
![REPL Startup](screenshots/repl-startup.png)
*Caption: FxPy interactive REPL ready for input*
```

### In HTML (for portfolio websites)

```html
<img src=".website/screenshots/repl-startup.png" alt="FxPy REPL" />
```

### In README

Update `overview.md` with actual screenshot references:

```markdown
## Visual Representation

![REPL Interactive](screenshots/repl-interactive.png)
*Interactive REPL session demonstrating FxPy syntax*

![Error Reporting](screenshots/repl-error.png)
*Rich error messages with visual position indicators*
```

---

## Checklist

Before considering screenshots complete:

- [ ] At least 3 screenshots captured
- [ ] All screenshots in PNG format
- [ ] No personal information visible
- [ ] Images optimized (compressed)
- [ ] Descriptive filenames used
- [ ] Referenced in documentation (overview.md, media.md)
- [ ] Terminal font size readable (14pt+)
- [ ] Consistent color scheme across screenshots
- [ ] GIF animations created (optional)
- [ ] Architecture diagram created (optional)

---

## File Size Limits

- **Screenshots (PNG):** < 500KB each
- **GIFs:** < 5MB each
- **Total screenshots directory:** < 20MB

---

## Need Help?

See `admin_instructions.md` for detailed step-by-step guides on creating each type of screenshot and GIF.

---

**Status:** 📝 Ready for screenshots to be added

*Follow the guidelines above to create professional, portfolio-ready visual assets for FxPy.*
