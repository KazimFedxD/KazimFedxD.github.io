# Screenshots

This folder contains visual assets for the TeachBack project documentation.

## Required Screenshots

### Desktop
| # | Filename | Description | Status |
|---|----------|-------------|--------|
| 1 | `homepage.png` | Landing page with hero section | ⬜ Pending |
| 2 | `session-active.png` | Active teaching session | ⬜ Pending |
| 3 | `session-ai-question.png` | AI question interruption | ⬜ Pending |
| 4 | `evaluation.png` | Evaluation results | ⬜ Pending |
| 5 | `sessions-list.png` | Session history | ⬜ Pending |
| 6 | `login.png` | Login page | ⬜ Pending |
| 7 | `register.png` | Registration page | ⬜ Pending |

### Mobile
| # | Filename | Description | Status |
|---|----------|-------------|--------|
| 1 | `mobile-home.png` | Mobile homepage | ⬜ Pending |
| 2 | `mobile-session.png` | Mobile session | ⬜ Pending |
| 3 | `mobile-evaluation.png` | Mobile evaluation | ⬜ Pending |

### GIFs
| # | Filename | Description | Status |
|---|----------|-------------|--------|
| 1 | `session-flow.gif` | Teaching session flow | ⬜ Pending |
| 2 | `transcript.gif` | Real-time transcript | ⬜ Pending |
| 3 | `evaluation.gif` | Evaluation animation | ⬜ Pending |

### Diagrams
| # | Filename | Description | Status |
|---|----------|-------------|--------|
| 1 | `architecture-diagram.png` | System architecture | ⬜ Pending |

---

## Screenshot Guidelines

### Resolution
- **Desktop**: 1920×1080 minimum (16:9 ratio)
- **Mobile**: 390×844 (iPhone 14 Pro ratio)

### Format
- **Static images**: PNG (preferred) or high-quality JPEG
- **Animations**: GIF (optimized, <5MB each)

### Content Guidelines
- Show real functionality with example data
- Use sample topics like "The Water Cycle" or "Photosynthesis"
- Blur any personal or sensitive information
- Ensure consistent browser window size
- Use clean browser window (no extra tabs/extensions)

### Optimization
- Compress images without quality loss
- Target <500KB for static images
- Target <5MB for GIFs

---

## Capture Tools

### Full Page Screenshots
- GoFullPage (Chrome extension)
- Fireshot (Chrome/Firefox extension)
- Built-in browser screenshot (Firefox)

### Screen Recording / GIFs
- ScreenToGif (Windows)
- LICEcap (Windows/Mac)
- Kap (Mac)
- OBS Studio (All platforms)

### Annotation
- Cleanshot (Mac)
- Skitch (All platforms)
- Greenshot (Windows)

---

## How to Capture

### Desktop Screenshots
1. Start the application: `docker compose up`
2. Navigate to the page in Chrome
3. Maximize browser window (1920×1080+)
4. Use screenshot tool or extension
5. Save to this folder with correct filename
6. Verify image quality and optimize if needed

### Mobile Screenshots
1. Open Chrome DevTools (F12)
2. Click device toolbar icon (or Ctrl+Shift+M)
3. Select "iPhone 14 Pro" or similar device
4. Navigate to desired page
5. Take screenshot
6. Save with `mobile-` prefix

### GIF Recordings
1. Open recording tool (ScreenToGif, etc.)
2. Position capture area around target UI
3. Set frame rate to 10-15 FPS
4. Start recording
5. Perform the action (5-10 seconds)
6. Stop and save
7. Optimize file size if >5MB
