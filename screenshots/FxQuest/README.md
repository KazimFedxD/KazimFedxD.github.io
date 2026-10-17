# Screenshots Folder

This folder contains all visual assets for the FxQuest portfolio documentation.

## 📁 Folder Structure

```
screenshots/
├── README.md                    # This file
├── desktop/                     # Desktop screenshots (1920x1080)
│   ├── bot-welcome.png
│   ├── profile-dashboard.png
│   ├── uno-game.png
│   ├── poker-game.png
│   ├── blackjack-game.png
│   ├── mining-system.png
│   ├── inventory-display.png
│   ├── server-setup.png
│   ├── leveling-config.png
│   ├── gambling-coinflip.png
│   ├── chat-game-scramble.png
│   ├── leaderboard.png
│   ├── tictactoe-game.png
│   ├── hangman-game.png
│   └── rps-game.png
├── mobile/                      # Mobile screenshots (portrait)
│   ├── mobile-profile.png
│   ├── mobile-uno.png
│   └── mobile-setup.png
├── gifs/                        # Animated GIFs
│   ├── uno-card-selection.gif
│   ├── level-up.gif
│   ├── coinflip.gif
│   ├── mining.gif
│   ├── poker-betting.gif
│   ├── chat-game.gif
│   └── profile-display.gif
└── diagrams/                    # Architecture diagrams
    ├── architecture-diagram.png
    └── database-schema.png
```

## 📸 Screenshot Guidelines

### Desktop Screenshots (1920x1080 minimum)

**Format**: PNG  
**Compression**: Optimize with TinyPNG if over 2MB  
**Content**: Show actual functionality, not placeholder data  
**Theme**: Use consistent Discord theme (light or dark)  
**Cropping**: Remove unnecessary UI elements (browser bars, etc.)  

### Mobile Screenshots (Portrait orientation)

**Format**: PNG  
**Resolution**: 1080x1920 typical  
**Source**: Discord mobile app  
**Content**: Same features as desktop, showing responsive layout  

### Animated GIFs

**Format**: GIF  
**Duration**: 5-10 seconds maximum  
**Frame Rate**: 10-15 fps (balance quality and file size)  
**File Size**: < 5 MB per GIF (< 2 MB ideal)  
**Optimization**: Use ScreenToGif or ezgif.com to compress  
**Content**: One specific action per GIF (card selection, level up, etc.)  

### Diagrams

**Format**: PNG (high quality) or SVG (vector)  
**Resolution**: 1920x1080 or scalable  
**Background**: Transparent or white  
**Style**: Professional, clean, readable  
**Labels**: Clear, descriptive text  

## 📂 Organization Tips

- Use subfolders to keep organized (desktop/, mobile/, gifs/, diagrams/)
- Name files descriptively (`profile-dashboard.png`, not `screenshot1.png`)
- Use lowercase with hyphens for filenames
- Keep master copies separate if you crop/edit

## 🎨 How to Capture Screenshots

### Windows
- **Print Screen**: Full screen to clipboard
- **Win + Shift + S**: Snipping Tool (select area)
- **Game Bar (Win + G)**: For game captures

### macOS
- **Cmd + Shift + 3**: Full screen
- **Cmd + Shift + 4**: Select area
- **Cmd + Shift + 4 + Space**: Window capture

### Linux
- **Print Screen**: Full screen
- **Shift + Print Screen**: Select area
- **GNOME Screenshot**: Built-in tool

### Discord Mobile
- **iOS**: Side button + Volume Up
- **Android**: Power + Volume Down

## 🎬 How to Create GIFs

### Recommended Tools

**Windows**: ScreenToGif (https://screentogif.com)  
**macOS**: Kap (https://getkap.co)  
**Linux**: Peek (install from package manager)  

### Process

1. Open GIF recording tool
2. Position recording area over Discord window
3. Start recording
4. Perform action (select card, level up, etc.)
5. Stop recording
6. Edit in built-in editor:
   - Trim unnecessary frames
   - Reduce frame rate to 10-15 fps
   - Delete duplicate frames
7. Export as GIF
8. Optimize with ezgif.com if > 5MB

## 📊 Diagrams Creation

### Tools

**draw.io** (https://app.diagrams.net) - Free, web-based  
**Lucidchart** (https://lucidchart.com) - Professional, requires account  
**Mermaid** - Text-based, embeddable in markdown  

### Architecture Diagram Template

```
Components to include:
┌──────────────┐
│ Discord API  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Bot Core    │
└──────┬───────┘
       │
   ┌───┴───┬────────┐
   │       │        │
   ▼       ▼        ▼
┌────┐  ┌────┐  ┌────┐
│Cogs│  │Games│ │DB  │
└────┘  └────┘  └────┘
```

## ✅ Screenshot Checklist

Essential screenshots to capture (see `admin_instructions.md` for detailed steps):

### Core Features
- [ ] Bot welcome / Help command
- [ ] User profile dashboard
- [ ] Server setup interface
- [ ] Leveling configuration

### Games
- [ ] UNO game (with card selection)
- [ ] Poker game (betting interface)
- [ ] Blackjack game (player vs dealer)
- [ ] Hangman (with visual)
- [ ] Tic-Tac-Toe (button grid)
- [ ] Rock Paper Scissors result

### Systems
- [ ] Mining system (Minecraft)
- [ ] Inventory display
- [ ] Chat game (scramble or number)
- [ ] Gambling (coinflip result)
- [ ] Leaderboard (top users)

### Mobile (Optional)
- [ ] Mobile profile
- [ ] Mobile UNO
- [ ] Mobile setup

### GIFs
- [ ] UNO card selection animation
- [ ] Level-up announcement
- [ ] Coinflip gambling
- [ ] Mining resources
- [ ] Poker betting round
- [ ] Chat game solve

### Diagrams
- [ ] System architecture
- [ ] Database schema (optional)

## 🔗 Using Screenshots in Documentation

### Markdown Reference

```markdown
![Description](screenshots/filename.png)
*Caption describing the image*
```

### Relative Paths

From `.website/*.md` files:
```markdown
![Profile Dashboard](screenshots/desktop/profile-dashboard.png)
```

From project root `README.md`:
```markdown
![Profile Dashboard](.website/screenshots/desktop/profile-dashboard.png)
```

### HTML (if needed)

```html
<img src="screenshots/profile-dashboard.png" 
     alt="FxQuest Profile Dashboard" 
     width="800" />
```

## 📦 File Size Guidelines

**Optimize Before Committing:**

| File Type | Recommended Size | Maximum Size |
|-----------|------------------|--------------|
| PNG (screenshot) | < 500 KB | 2 MB |
| GIF (animation) | < 2 MB | 5 MB |
| Diagram | < 1 MB | 2 MB |

**Optimization Tools:**
- **Images**: TinyPNG.com, Squoosh.app
- **GIFs**: ezgif.com/optimize

## 🚫 What NOT to Include

- ❌ Screenshots with real personal information (usernames, emails)
- ❌ Screenshots with Discord tokens visible
- ❌ Low quality or blurry images
- ❌ Screenshots with errors or bugs (unless for known-issues.md)
- ❌ Unrelated content

## 📝 Naming Convention

**Good Examples:**
- `profile-dashboard.png`
- `uno-card-selection.gif`
- `architecture-diagram.png`

**Bad Examples:**
- `Screenshot1.png`
- `IMG_20250118.png`
- `Untitled.gif`

**Format:**
- Lowercase letters
- Hyphens for spaces
- Descriptive names
- Include feature/section name

## 🎯 Priority Order

If short on time, capture in this order:

**High Priority** (Must have):
1. Profile dashboard
2. UNO game
3. Server setup
4. Mining system
5. Help command

**Medium Priority** (Should have):
6. Poker game
7. Blackjack
8. Leaderboard
9. Gambling
10. Leveling config

**Low Priority** (Nice to have):
11. Mobile screenshots
12. Other games (Hangman, Tic-Tac-Toe, RPS)
13. Diagrams (can use text-based Mermaid)

---

**For detailed step-by-step instructions on capturing each screenshot, see:**
`.website/admin_instructions.md` → Task 1: Capture Screenshots

**For GIF creation guide, see:**
`.website/admin_instructions.md` → Task 3: Create Feature GIFs

**For diagram creation, see:**
`.website/admin_instructions.md` → Task 4: Create Architecture Diagrams

---

**Once you've captured all assets, update this checklist and commit to your portfolio repository!**
