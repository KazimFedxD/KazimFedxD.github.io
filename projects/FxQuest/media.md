# Video & Media Assets

## Demo Video

### Main Showcase Video

**Title**: FxQuest - Discord Gaming Bot Full Demonstration

**Duration**: 5-7 minutes

**Topics Covered**:
1. Introduction (0:00-0:30)
   - What is FxQuest?
   - Key features overview (12 major features)
   
2. Setup & Configuration (0:30-1:30)
   - Bot installation
   - `/setup` command walkthrough
   - Server customization options

3. Leveling & Economy (1:30-2:30)
   - Message-based XP gain
   - Level-up demonstration with role rewards
   - Profile display with stats
   - Economy features and leaderboards

4. Games Showcase (2:30-4:30)
   - UNO game (30 sec)
   - Poker setup and gameplay (30 sec)
   - Blackjack (20 sec)
   - Akinator game (30 sec)
   - Minecraft mining (20 sec)
   - Chat games (15 sec)
   - Quick montage of other games (15 sec)

5. Advanced Features (4:30-6:00)
   - Help system with command discovery
   - Feedback/suggestion system
   - Owner control panel (if applicable)
   - Server customization deep dive

6. Conclusion (6:00-7:00)
   - Summary of 12 features
   - GitHub link
   - Call to action (invite bot/star repo)

**Placeholder Link**: [FxQuest Demo Video](https://youtube.com/placeholder)

---

## Feature Showcase Videos

### Individual Feature Videos (2-3 minutes each)

1. **UNO Game Deep Dive**
   - Full game walkthrough
   - Card selection mechanics
   - Wild card color picker
   - Turn rotation
   - Win condition

2. **Poker Complete Guide**
   - Channel creation
   - Buy-in system
   - Betting rounds
   - Hand evaluation
   - Pot distribution

3. **Leveling System Explained**
   - XP mechanics
   - Level calculation formula
   - Role rewards
   - Leaderboards

4. **Minecraft Features**
   - Mining resources
   - Tool durability
   - Inventory management
   - Equipment system

5. **Server Setup Tutorial**
   - Complete configuration guide
   - All setup options
   - Best practices

6. **Help System & User Support**
   - Command discovery
   - Category navigation
   - Autocomplete features

7. **Owner Tools & Bot Management**
   - Control panel overview
   - Extension management
   - Code evaluation demo

---

## Feature Animations (GIFs)

### Gameplay GIFs

Location: `.website/screenshots/`

#### 1. UNO Card Selection
**Filename**: `uno-card-selection.gif`
**Duration**: 5-10 seconds
**Content**: Player selecting cards from dropdown menu
**Purpose**: Show UNO game interface

**How to Create**:
1. Start UNO game
2. Open hand (card selection menu)
3. Select a card
4. Record with screen recorder (GIF mode)
5. Save to `.website/screenshots/uno-card-selection.gif`

#### 2. Level-Up Animation
**Filename**: `level-up.gif`
**Duration**: 5 seconds
**Content**: User sending messages, then level-up announcement appears
**Purpose**: Demonstrate leveling system

#### 3. Coinflip Result
**Filename**: `coinflip.gif`
**Duration**: 5 seconds
**Content**: `/gambling coinflip` command → result embed
**Purpose**: Show gambling mechanics

#### 4. Mining Resources
**Filename**: `mining.gif`
**Duration**: 5-10 seconds
**Content**: `/mine` command → resources collected
**Purpose**: Showcase Minecraft feature

#### 5. Poker Betting Round
**Filename**: `poker-betting.gif`
**Duration**: 8-10 seconds
**Content**: Players clicking Fold/Call/Raise buttons
**Purpose**: Demonstrate poker interface

#### 6. Chat Game Solve
**Filename**: `chat-game.gif`
**Duration**: 5 seconds
**Content**: Chat game appears → user answers → win announcement
**Purpose**: Show automated chat games

#### 7. Profile Display
**Filename**: `profile-display.gif`
**Duration**: 3 seconds
**Content**: `/profile` command → profile embed appears
**Purpose**: Show profile stats

#### 8. Setup Navigation
**Filename**: `setup-navigation.gif`
**Duration**: 10 seconds
**Content**: `/setup` → clicking through menu options
**Purpose**: Demonstrate server configuration

#### 9. Help System Category Selection
**Filename**: `help-category-select.gif`
**Duration**: 8 seconds
**Content**: `/help` → selecting category → viewing commands
**Purpose**: Show command discovery interface

#### 10. Feedback Submission Flow
**Filename**: `feedback-submission.gif`
**Duration**: 5 seconds
**Content**: `/suggest` command → embed appears
**Purpose**: Demonstrate user feedback system

#### 11. Akinator Gameplay
**Filename**: `akinator-gameplay.gif`
**Duration**: 15 seconds
**Content**: Akinator asking questions → user answering → guess
**Purpose**: Show AI game integration

#### 12. Owner Control Panel
**Filename**: `owner-panel-action.gif`
**Duration**: 8 seconds
**Content**: Owner panel → reload cog → confirmation
**Purpose**: Demonstrate bot administration features

---

## Screenshots

### Required Screenshots

Location: `.website/screenshots/`

#### Desktop Screenshots (1920x1080)

1. **profile-dashboard.png** ✅
   - `/profile` command showing:
     - User avatar
     - Level and XP
     - Balance
     - Stats (messages, games won)

2. **help-categories.png** ✅
   - `/help` command output
   - Category-based command list
   - Category dropdown menu

3. **help-command-detail.png** ✅
   - Detailed command help
   - Usage syntax, permissions
   - Category information

4. **blackjack.png** ✅
   - Blackjack interface
   - Player and dealer hands
   - Hit/Stand buttons
   - Current bet display

5. **gambling-coinflip.png** ✅
   - Coinflip result embed
   - Win/loss display
   - Balance update

6. **gambling-slots.png** ✅
   - Slot machine game
   - Reel results
   - Win/loss outcome

7. **hangman.png** ✅
   - Hangman visual
   - Letter guesses
   - Word progress

8. **rps.png** ✅
   - Rock Paper Scissors result
   - Player vs opponent/bot
   - Win/loss/tie display

9. **mine-surface.png** ✅
   - Mining interface (surface level)
   - Resources collected
   - Tool durability

10. **mine-underground.png** ✅
    - Mining interface (underground level)
    - Different resource types
    - Mining depth display

11. **inventory-display.png** ✅
    - Inventory view
    - Items with emoji icons
    - Equipped tools/armor
    - Item quantities

12. **server-setup.png** ✅
    - Setup command interface
    - Configuration buttons
    - Feature toggles

13. **feedback.png** ✅
    - Feedback/suggestion submission
    - Formatted user embed
    - Bug report or suggestion example

#### Mobile Screenshots (Portrait, 1080x1920)

*No mobile screenshots added yet*

---

## Architecture Diagrams

### System Architecture
**Filename**: `architecture-diagram.png`
**Tool**: draw.io, Lucidchart, or Mermaid

**Content**:
```
┌─────────────┐
│ Discord API │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  FxQuest    │
│  Bot Core   │
└──────┬──────┘
       │
   ┌───┴───┬────────┬─────────┐
   │       │        │         │
   ▼       ▼        ▼         ▼
┌────┐  ┌────┐  ┌────┐  ┌────────┐
│Cogs│  │Games│ │Hand│  │Database│
└────┘  └────┘  └────┘  └────────┘
```

### Database Schema
**Filename**: `database-schema.png`

**Content**: ER diagram showing:
- Tables (profile, guilds, poker, etc.)
- Relationships
- Key fields

### Game Flow Diagram
**Filename**: `game-flow.png`

**Content**: UNO game flow example:
1. User initiates game
2. Players join
3. Cards dealt
4. Turn rotation
5. Win condition check
6. Rewards distributed

---

## Comparison Screenshots

### Before/After Server Engagement

**before-fxquest.png**: Server without bot (low activity)
**after-fxquest.png**: Server with bot (active games, level-ups)

**Purpose**: Show engagement impact

---

## Presentation Materials

### Slide Deck

**Filename**: `fxquest-presentation.pdf`

**Slides**:
1. Title slide (FxQuest logo, tagline)
2. Problem statement
3. Solution overview
4. Feature list
5. Architecture diagram
6. Tech stack
7. Demo screenshots
8. Performance metrics
9. Future roadmap
10. Q&A / Contact

**Location**: `.website/fxquest-presentation.pdf`

### Pitch Deck (For Investors/Competitions)

**Filename**: `fxquest-pitch.pdf`

**Slides**:
1. Hook (engagement problem)
2. Market size
3. Product demo
4. Business model (if applicable)
5. Traction (users, servers)
6. Team
7. Ask

---

## Social Media Assets

### Promotional Graphics

1. **feature-showcase.png** (1200x628 for social media)
   - Collage of key features
   - Bot logo
   - Tagline: "The Ultimate Discord Gaming Bot"

2. **stat-infographic.png**
   - "8+ Games", "Unlimited Servers", "Sub-200ms Response"
   - Visual icons

3. **testimonial-graphic.png**
   - User testimonials with quotes
   - Server owner feedback

---

## Video Recording Guidelines

### Equipment/Software

**Screen Recording**:
- **OBS Studio** (free, recommended)
- **Loom** (easy, web-based)
- **Camtasia** (professional, paid)

**Settings**:
- Resolution: 1920x1080
- Frame Rate: 30 or 60 fps
- Format: MP4 (H.264 codec)

### Recording Tips

1. **Clean Environment**:
   - Close unnecessary browser tabs
   - Hide personal info (DMs, usernames if needed)
   - Use test server for demos

2. **Audio**:
   - Use good microphone
   - Record narration explaining features
   - Background music (optional, royalty-free)

3. **Pacing**:
   - Slow down to show UI clearly
   - Pause between sections
   - Use text overlays for clarity

4. **Editing**:
   - Add intro/outro
   - Transitions between sections
   - Captions/subtitles (accessibility)

---

## GIF Recording Guidelines

### Tools

- **LICEcap** (Windows/macOS, simple)
- **ScreenToGif** (Windows, advanced)
- **Kap** (macOS, modern)
- **Peek** (Linux)

### Settings

- **Duration**: 5-10 seconds (keep short)
- **Frame Rate**: 15 fps (balance quality/size)
- **Size**: < 5 MB per GIF
- **Resolution**: 800x600 or smaller for GIFs

### Tips

- Focus on one action per GIF
- Loop seamlessly if possible
- Optimize file size (use ezgif.com)

---

## Asset Checklist

### Essential Assets

- [ ] Main demo video (5-7 min)
- [ ] 6+ feature GIFs
- [ ] 15+ screenshots (desktop)
- [ ] 3+ screenshots (mobile)
- [ ] Architecture diagram
- [ ] Database schema diagram
- [ ] Presentation slide deck

### Optional Assets

- [ ] Individual feature videos (2-3 min each)
- [ ] Social media graphics
- [ ] Comparison before/after screenshots
- [ ] Pitch deck
- [ ] Promotional trailer (30 sec)

---

## Hosting & Distribution

### Video Hosting

**YouTube**:
- Create FxQuest channel
- Upload demo videos
- Playlist: "FxQuest Tutorials"
- Optimize titles, descriptions, tags

**Alternative**:
- Vimeo (professional)
- Self-hosted (if you have CDN)

### Image Hosting

**GitHub** (recommended):
- Store in `.website/screenshots/`
- Reference via relative paths in docs
- Version controlled

**Alternative**:
- Imgur (easy)
- CloudFlare Images (CDN)
- AWS S3 (scalable)

---

## Usage in Documentation

### Markdown Reference

```markdown
![Bot Welcome Screen](screenshots/bot-welcome.png)
*FxQuest setup interface with interactive buttons*

![UNO Game Demo](screenshots/uno-card-selection.gif)
*Card selection interface in action*
```

### HTML (for web portfolio)

```html
<img src=".website/screenshots/profile-dashboard.png" 
     alt="FxQuest Profile Dashboard" 
     width="800" />

<video controls width="100%">
  <source src="videos/fxquest-demo.mp4" type="video/mp4">
</video>
```

---

## Copyright & Licensing

### Original Content

All screenshots, videos, and graphics created for FxQuest are:
- **License**: MIT (same as code)
- **Usage**: Free to use with attribution
- **Modification**: Allowed

### Music/Sound Effects

If using background music:
- **Source**: royalty-free music (YouTube Audio Library, Incompetech)
- **License**: Confirm usage rights
- **Attribution**: Credit in video description

### Discord Assets

- Discord logo/branding: Follow Discord Brand Guidelines
- Don't imply official Discord endorsement
- Use "Discord Bot" not "Official Discord"

---

## Update Schedule

### Refresh Assets When

- Major version release (new features)
- UI/UX changes
- Significant visual updates
- Community feedback requests specific demos

---

## Asset Repository Structure

```
.website/
├── screenshots/
│   ├── desktop/
│   │   ├── bot-welcome.png
│   │   ├── profile-dashboard.png
│   │   └── ... (other desktop screenshots)
│   ├── mobile/
│   │   ├── mobile-profile.png
│   │   └── ... (mobile screenshots)
│   └── gifs/
│       ├── uno-card-selection.gif
│       ├── level-up.gif
│       └── ... (animated GIFs)
├── diagrams/
│   ├── architecture-diagram.png
│   └── database-schema.png
└── videos/
    ├── README.md (links to YouTube)
    └── thumbnails/
        └── demo-thumbnail.png
```

---

## Conclusion

High-quality media assets are crucial for showcasing FxQuest in portfolios, documentation, and promotional materials. This guide provides a comprehensive roadmap for creating, organizing, and utilizing visual content effectively.

**Next Steps**:
1. Capture screenshots as outlined
2. Record demo video
3. Create GIF animations
4. Generate diagrams
5. Update media.md with links

**Tools to Install**:
- OBS Studio (video recording)
- ScreenToGif (GIF creation)
- draw.io (diagrams)
- Image editor (GIMP, Photoshop)

---

*See `admin_instructions.md` for step-by-step manual tasks to complete media asset creation.*
