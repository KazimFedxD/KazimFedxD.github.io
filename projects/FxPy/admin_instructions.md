# Admin Instructions - Manual Tasks

This file contains tasks that need to be completed manually to finalize the FxPy portfolio documentation.

---

## 📸 Task 1: Capture Screenshots ✅ COMPLETED

### What to Create
High-quality screenshots of FxPy in action showing key features and interfaces.

### Where to Add
All screenshots go in `.website/screenshots/` folder.

### Status: ✅ **7/7 Screenshots Captured**

### Completed Screenshots

#### 1. REPL Startup Screenshot ✅
- **Filename**: `repl-startup.png`
- **Location**: `.website/screenshots/repl-startup.png`
- **Status**: ✅ **Captured and saved**

#### 2. Interactive REPL Session ✅
- **Filename**: `repl-interactive.png`
- **Location**: `.website/screenshots/repl-interactive.png`
- **Status**: ✅ **Captured and saved**

#### 3. Error Display Screenshot ✅
- **Filename**: `repl-error.png`
- **Location**: `.website/screenshots/repl-error.png`
- **Status**: ✅ **Captured and saved**

#### 4. Script Execution Screenshot ✅
- **Filename**: `script-execution.png`
- **Location**: `.website/screenshots/script-execution.png`
- **Status**: ✅ **Captured and saved**

#### 5. Code in Editor Screenshot ✅
- **Filename**: `code-functions.png`
- **Location**: `.website/screenshots/code-functions.png`
- **Status**: ✅ **Captured and saved**

#### 6. Basic Import Example ✅
- **Filename**: `import.png`
- **Location**: `.website/screenshots/import.png`
- **Status**: ✅ **Captured and saved**

#### 7. From-Import Syntax ✅
- **Filename**: `from-import.png`
- **Location**: `.website/screenshots/from-import.png`
- **Status**: ✅ **Captured and saved**

---

## 🎬 Task 2: Create Demo Video

### What to Create
A 5-7 minute walkthrough video demonstrating FxPy's key features.

### Where to Add
Upload to YouTube, then update `media.md` with the link.

### Instructions

#### 1. Record the Demo

**Script Outline:**

1. **Introduction (30 seconds)**
   - "Welcome to FxPy, a custom programming language built in Python"
   - "In this video, I'll show you the key features"

2. **Installation Demo (30 seconds)**
   ```bash
   git clone https://github.com/KazimFedxD/FxPy.git
   cd FxPy
   python shell.py
   ```

3. **REPL Basics (1 minute)**
   - Show variable assignment
   - Basic arithmetic
   - String operations

4. **Functions (1.5 minutes)**
   - Define simple function
   - Arrow function syntax
   - Function with parameters
   - Recursive function example

5. **Control Flow (1 minute)**
   - If/else statements
   - For loops
   - While loops

6. **Module System (1.5 minutes)**
   - Show module file (`math.fx`)
   - Import in main script
   - Use imported functions
   - Explain dot notation

7. **Error Handling (30 seconds)**
   - Trigger syntax error
   - Show visual error indicator
   - Explain helpful error messages

8. **Conclusion (30 seconds)**
   - Recap key features
   - "Check out the GitHub repo"
   - "Star if you found this interesting"

**Recording Settings:**
- Screen resolution: 1920x1080
- Frame rate: 30 fps
- Audio: Clear narration (use good mic)
- Terminal font: Large enough to read (16-18pt)

**Tools:**
- **OBS Studio** (free, recommended)
- **Loom** (easy, browser-based)
- **QuickTime** (macOS)

#### 2. Edit the Video

- Add intro slide:
  ```
  FxPy
  A Custom Programming Language
  github.com/KazimFedxD/FxPy
  ```
- Add transitions between sections (optional)
- Add captions/subtitles (recommended for accessibility)
- Add outro:
  ```
  Thank you for watching!
  ⭐ Star on GitHub: github.com/KazimFedxD/FxPy
  📚 Read the docs
  🔧 Contribute
  ```

#### 3. Upload to YouTube

1. Go to YouTube Studio
2. Click "Create" → "Upload Video"
3. **Video Details:**
   - **Title**: "FxPy - Custom Programming Language Demo | Python Interpreter"
   - **Description**:
     ```
     FxPy is a dynamically-typed interpreted programming language built from scratch in Python.
     
     Features:
     - Dynamic typing
     - First-class functions
     - Module system
     - Variadic functions (*args, **kwargs)
     - Rich error reporting
     - Interactive REPL
     
     GitHub: https://github.com/KazimFedxD/FxPy
     Documentation: [link to docs]
     
     Timestamps:
     0:00 - Introduction
     0:30 - Installation
     1:00 - REPL Basics
     2:00 - Functions
     3:30 - Control Flow
     4:30 - Module System
     6:00 - Error Handling
     6:30 - Conclusion
     
     #programming #python #interpreter #compiler #languagedesign
     ```
   - **Tags**: programming, python, interpreter, compiler, programming language, language design, computer science, tutorial, coding
   - **Thumbnail**: Create custom thumbnail with "FxPy" title and code snippet
4. Set visibility (Public or Unlisted)
5. Publish

#### 4. Update Documentation

1. Copy YouTube URL
2. Open `.website/media.md`
3. Find line:
   ```markdown
   - **YouTube:** [FxPy Language Demo](placeholder)
   ```
4. Replace `placeholder` with actual URL:
   ```markdown
   - **YouTube:** [FxPy Language Demo](https://youtube.com/watch?v=xxxxx)
   ```
5. Save file

---

## 🎨 Task 3: Create Feature GIFs

### What to Create
Short GIF animations showing key features in action (5-10 seconds each).

### Where to Add
`.website/screenshots/` folder, referenced in `media.md`.

### Required GIFs

#### 1. REPL Demo GIF
- **Filename**: `repl-demo.gif`
- **Location**: `.website/screenshots/repl-demo.gif`
- **Duration**: 10-15 seconds
- **Instructions**:
  1. Use GIF recording tool (LICEcap, ScreenToGif, Peek)
  2. Start recording terminal
  3. Type commands slowly:
     ```javascript
     FxPy > let x = 10
     FxPy > fex double(n) -> return n * 2
     FxPy > double(x)
     20
     FxPy > for i in range(3): print(i) end
     0
     1
     2
     ```
  4. Stop recording
  5. Optimize GIF size (keep under 5MB)
  6. Save as `repl-demo.gif`

---

#### 2. Error Display GIF
- **Filename**: `error-demo.gif`
- **Location**: `.website/screenshots/error-demo.gif`
- **Duration**: 5-10 seconds
- **Instructions**:
  1. Start GIF recording
  2. Type intentionally broken code:
     ```javascript
     FxPy > fex test(x -> return x
     ```
  3. Let error message display fully
  4. Pause for 2-3 seconds to let viewers read
  5. Stop recording
  6. Save as `error-demo.gif`

---

#### 3. Function Execution GIF
- **Filename**: `function-demo.gif`
- **Location**: `.website/screenshots/function-demo.gif`
- **Duration**: 10 seconds
- **Instructions**:
  1. Start recording
  2. Define and call a function:
     ```javascript
     FxPy > fex factorial(n):
     ...  >     if n == 0: return 1 end
     ...  >     return n * factorial(n - 1)
     ...  > end
     FxPy > factorial(5)
     120
     ```
  3. Stop recording
  4. Save as `function-demo.gif`

---

## 📊 Task 4: Create Architecture Diagram

### What to Create
Visual system architecture diagram showing component relationships.

### Where to Add
Add as image in `architecture.md` or link to external tool.

### Instructions

#### Option 1: Using draw.io (Recommended)

1. Go to [draw.io](https://app.diagrams.net/)
2. Create new diagram
3. **Add components:**
   - Rectangle: "Source Code (.fx)"
   - Rectangle: "Lexer (lexer.py)"
   - Rectangle: "Parser (fxparser.py)"
   - Rectangle: "Interpreter (interpreter.py)"
   - Rectangle: "Output"
4. **Connect with arrows:**
   - Source Code → Lexer (label: "Text")
   - Lexer → Parser (label: "Tokens")
   - Parser → Interpreter (label: "AST")
   - Interpreter → Output (label: "Result")
5. **Add labels:**
   - Next to Lexer: "Tokenization, Position Tracking"
   - Next to Parser: "Syntax Validation, AST Generation"
   - Next to Interpreter: "Tree Walking, Symbol Tables"
6. **Style:**
   - Use consistent colors (blue for components, gray for arrows)
   - Add icons if available
7. Export as PNG: `File` → `Export as` → `PNG`
8. Save as `.website/screenshots/architecture-diagram.png`

#### Option 2: Using Mermaid (Text-Based)

Already included in `architecture.md` as code block. No action needed unless you want a visual export.

#### 3. Update Documentation

1. Open `.website/architecture.md`
2. Find the architecture diagram section
3. Add image reference:
   ```markdown
   ![FxPy Architecture](screenshots/architecture-diagram.png)
   ```

---

## 🔐 Task 5: Verify No Sensitive Information

### What to Check
Ensure no API keys, passwords, or personal data in any generated files.

### Where to Check
- All files in `.website/` directory
- Code snippets in documentation
- Screenshots (check for personal paths, usernames)

### Instructions

1. **Review Generated Files:**
   - Open each `.md` file in `.website/`
   - Search for patterns:
     - Email addresses
     - Personal names (except in examples)
     - API keys
     - Absolute file paths with your username
   - Replace with generic examples

2. **Review Screenshots:**
   - Check terminal screenshots for:
     - Your username in paths (e.g., `/home/yourusername/`)
     - Any personal information
   - **Solution:** Use generic paths or crop screenshot

3. **Check Git History:**
   - Ensure `.website/` is in `.gitignore`
   - Verify: `cat .gitignore | grep .website`
   - Should show: `.website/`

---

## ✅ Task 6: Final Review Checklist

### Before Publishing

#### Documentation Files
- [ ] All `.md` files created in `.website/`
- [ ] `metadata.json` has accurate information
- [ ] No placeholder URLs (except media links)
- [ ] All code examples use correct syntax
- [ ] No typos or grammar errors

#### Media Assets
- [x] At least 3 screenshots captured ✅ **7 screenshots captured**
  - [x] `repl-startup.png` ✅
  - [x] `repl-interactive.png` ✅
  - [x] `repl-error.png` ✅
  - [x] `script-execution.png` ✅
  - [x] `code-functions.png` ✅
  - [x] `import.png` ✅
  - [x] `from-import.png` ✅
- [ ] Demo video uploaded (or marked as TODO)
- [ ] GIF animations created (or marked as TODO)
- [ ] Architecture diagram created (or using Mermaid text version)

#### Privacy & Security
- [ ] No personal information in files
- [ ] No sensitive paths in screenshots
- [ ] `.website/` added to `.gitignore`
- [ ] No API keys or credentials

#### GitHub Integration
- [ ] Repository link correct in `metadata.json`
- [ ] GitHub username correct: KazimFedxD
- [ ] Repository name correct: FxPy

#### Optional Enhancements
- [ ] Add LICENSE file to root (MIT recommended)
- [ ] Create GitHub repository if not already done
- [ ] Add topics to GitHub repo (programming-language, python, interpreter)
- [ ] Create GitHub README badges (optional)

---

## 🚀 Task 7: Publish Documentation

### Next Steps After Completion

1. **Review All Files:**
   ```bash
   cd .website
   ls -la
   # Should see: *.md files, screenshots/, metadata.json
   ```

2. **Create Portfolio Page:**
   - Copy `.website/` content to your portfolio website
   - Create dedicated project page for FxPy
   - Use `metadata.json` to populate project card
   - Embed screenshots and video

3. **Update GitHub Repository:**
   - Ensure main `README.md` is comprehensive
   - Add topics: `programming-language`, `interpreter`, `python`
   - Add description: Copy `shortDescription` from `metadata.json`
   - Enable GitHub Pages (optional) to host docs

4. **Share Your Work:**
   - Post on LinkedIn with project highlights
   - Share on Twitter/X with screenshots
   - Submit to ShowHN (Hacker News)
   - Post on r/ProgrammingLanguages (Reddit)
   - Add to your resume/portfolio

---

## 📝 Task 8: Optional Enhancements

### If You Have Extra Time

#### 1. Create Comparison Table
Add to `overview.md` or `features.md`:

| Feature | FxPy | Python | JavaScript |
|---------|------|--------|------------|
| Type System | Dynamic | Dynamic | Dynamic |
| Functions | First-class | First-class | First-class |
| Modules | Import/From | Import | ES6 Import |
| *args/**kwargs | ✅ | ✅ | Rest/Spread |
| Classes | ❌ (planned) | ✅ | ✅ |

#### 2. Add Code Coverage Info
If you create tests, add coverage statistics to `performance.md`.

#### 3. Create Cheat Sheet
One-page PDF summarizing FxPy syntax.

#### 4. Write Blog Post
Detailed article about building the interpreter, publish on Medium/Dev.to.

---

## 🆘 Troubleshooting

### Issue: Can't capture screenshots
**Solution:** Use built-in tools:
- **Linux:** `gnome-screenshot`, `scrot`, `flameshot`
- **macOS:** `Cmd+Shift+4` (built-in)
- **Windows:** `Win+Shift+S` (Snipping Tool)

### Issue: GIF file too large
**Solution:**
- Reduce resolution
- Shorten duration
- Use GIF optimizer tools (ezgif.com)
- Limit to 5MB max

### Issue: Video recording laggy
**Solution:**
- Close other applications
- Record at 720p instead of 1080p
- Use hardware encoding if available

### Issue: Don't have YouTube account
**Solution:**
- Upload to Vimeo or other platform
- Host video on GitHub releases (if < 2GB)
- Mark as "TODO" for now

---

## 📞 Questions or Issues?

If you encounter any problems completing these tasks:
1. Document the issue
2. Mark task as "⚠️ INCOMPLETE"
3. Add note explaining blocker
4. Move forward with other tasks

**Remember:** Perfect is the enemy of done. Get the essential screenshots and documentation, polish later!

---

## 📋 Task Progress Tracker

Mark tasks as you complete them:

- [x] Task 1: Capture all required screenshots ✅ **COMPLETED (7/7)**
- [ ] Task 2: Create and upload demo video
- [ ] Task 3: Create feature GIFs
- [ ] Task 4: Create architecture diagram
- [ ] Task 5: Verify no sensitive information
- [ ] Task 6: Complete final review checklist
- [ ] Task 7: Publish documentation
- [ ] Task 8: Optional enhancements (if desired)

---

**Estimated Time Remaining:**
- ~~Screenshots: 30-60 minutes~~ ✅ **DONE**
- Demo Video: 2-3 hours (recording + editing + upload)
- GIFs: 30 minutes
- Diagram: 30 minutes
- Review: 30 minutes

**Total Remaining: ~3-5 hours**

---

**Good luck! You're creating great documentation for your project.** 🎉

---

**Last Updated:** November 19, 2025
