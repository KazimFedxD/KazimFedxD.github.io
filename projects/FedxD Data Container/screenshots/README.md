# Screenshots

This directory contains visual assets for the FedxD Data Container project documentation.

## Required Screenshots:

### For Python Libraries:
1. **Terminal Usage Examples** — Python REPL or terminal showing library usage
2. **Code Examples** — Syntax-highlighted code snippets showing key features
3. **Error Messages** — Helpful error output demonstrating validation
4. **File Examples** — Sample `.fxdc` files in a code editor

## Screenshot Guidelines:

- **Resolution**: 1920x1080 minimum (or natural terminal/editor size)
- **Format**: PNG (preferred) or JPEG
- **Content**: Real functionality with meaningful examples
- **Consistency**: Use the same editor theme/terminal theme across screenshots
- **Privacy**: Ensure no sensitive information is visible
- **File Naming**: Use descriptive names (e.g., `terminal-usage.png`, `class-registration.png`)

## Placeholder Screenshots

Until real screenshots are captured, you can use:
- Code snippets rendered as images
- Terminal output copied to text files
- Diagrams from `media.md`

## Creating Screenshots

See `../admin_instructions.md` for detailed instructions on:
- What screenshots to capture
- How to set up each screenshot
- Where to save them
- How to optimize file sizes

## Current Screenshots:

*None yet — follow instructions in `admin_instructions.md` to create them.*

## Optional GIF Animations:

For more dynamic demonstrations, you can create:
- `quickstart.gif` — Installation and basic usage
- `class-registration.gif` — Registering and using custom classes
- `type-validation.gif` — Type checking catching errors

**Tools for GIF Creation:**
- **Linux**: Peek, ScreenToGif (via Wine)
- **macOS**: LICEcap, Kap
- **Windows**: ScreenToGif, LICEcap
- **Cross-platform**: OBS Studio (record video, convert to GIF)

## Image Optimization

To reduce file sizes without quality loss:

```bash
# Install optimization tools
sudo apt install optipng jpegoptim  # Linux
brew install optipng jpegoptim      # macOS

# Optimize PNG
optipng -o7 screenshot.png

# Optimize JPEG
jpegoptim --max=85 screenshot.jpg
```

Or use online tools:
- TinyPNG (https://tinypng.com/)
- Squoosh (https://squoosh.app/)

## Usage in Documentation

Reference screenshots in markdown files:

```markdown
![Terminal Usage](screenshots/terminal-usage.png)
```

Or with alt text and title:

```markdown
![FxDC usage in Python REPL](screenshots/terminal-usage.png "Basic FxDC operations")
```

## File Size Guidelines

- **Screenshots**: < 500 KB each (aim for 100-200 KB)
- **GIFs**: < 5 MB each (aim for 1-3 MB)
- **Total folder**: < 20 MB (to keep repository light)

## Copyright & Licensing

All screenshots created for this project are:
- Part of the FedxD Data Container project
- Licensed under the same MIT License as the project
- Free to use in portfolio websites, documentation, and presentations
