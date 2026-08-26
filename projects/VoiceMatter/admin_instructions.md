# Admin Instructions — Manual Tasks

This file contains tasks that need to be completed manually to finalise
the project documentation.

**Total Estimated Time**: ~2h

---

## ✅ Task 1: Capture Screenshots

### Status: ⬜ Pending

VoiceMatter's overlay is rendered live by the running daemon. To
capture each state:

1. Start the daemon: `voicematter daemon`
2. Trigger the appropriate state via `voicematter trigger` /
   `pause` / `cancel` / `stop` (or click the overlay's buttons).
3. Use a screen-capture tool (`spectacle`, `flameshot`, etc.) to grab
   the overlay pill area at 1920×1080.
4. Save with the filename from the table below.

### Required Files

- **Filename**: `overlay-recording.png`
- **Location**: `.website/screenshots/overlay-recording.png`
- **Status**: ⬜ Pending

- **Filename**: `overlay-paused.png`
- **Location**: `.website/screenshots/overlay-paused.png`
- **Status**: ⬜ Pending

- **Filename**: `overlay-processing.png`
- **Location**: `.website/screenshots/overlay-processing.png`
- **Status**: ⬜ Pending

- **Filename**: `overlay-ready.png`
- **Location**: `.website/screenshots/overlay-ready.png`
- **Status**: ⬜ Pending

- **Filename**: `overlay-error.png`
- **Location**: `.website/screenshots/overlay-error.png`
- **Status**: ⬜ Pending

- **Filename**: `kde-shortcut-config.png`
- **Location**: `.website/screenshots/kde-shortcut-config.png`
- **Status**: ⬜ Pending

- **Filename**: `systemd-status.png`
- **Location**: `.website/screenshots/systemd-status.png`
- **Status**: ⬜ Pending

All screenshot files will land in `.website/screenshots/`.

---

## 🎬 Task 2: Record Demo Video

### Status: ⬜ Pending

### What to Do:
Record a 60-second screen capture demonstrating a full record →
process → paste cycle.

### Instructions:

1. **Start the daemon**: `voicematter daemon`
2. **Open a target application** (e.g. a code editor or email client)
   so the paste has somewhere to land.
3. **Screen-record** while you:
   - Bind the F8/F9/Esc shortcuts (or use the CLI directly).
   - Speak a short, naturally-false-started sentence.
   - Watch the overlay progress through the four processing steps.
   - See the formatted text appear in the focused editor.
4. **Save** as `.website/screenshots/demo.mp4` (or `.webm`).
5. **Optional — upload to YouTube**:
   - Log in to YouTube.
   - Upload the video.
   - Copy the URL.
   - Update `media.md` with the real URL (currently a placeholder).
   - Update `metadata.json` `video` field.

---

## 🎨 Task 3: Capture Feature GIFs

### Status: ⬜ Pending

### What to Create:
Short GIF animations showing key features in action.

### Required GIFs:

#### 1. Hotkey → Recording
- **Filename**: `feature-hotkey.gif`
- **Duration**: ~6 s
- **Content**: KDE shortcut config → press F8 → overlay appears
- **Instructions**:
  1. Use `peek` or `ScreenToGif`.
  2. Capture the desktop.
  3. Trigger the shortcut.
  4. Optimize with `gifsicle -O3 < input.gif > output.gif`.
  5. Save to `.website/screenshots/feature-hotkey.gif`.

#### 2. Processing Pipeline
- **Filename**: `feature-processing.gif`
- **Duration**: ~10 s
- **Content**: The four processing steps ticking through
- **Save to**: `.website/screenshots/feature-processing.gif`.

#### 3. Cancel Mid-Recording
- **Filename**: `feature-cancel.gif`
- **Duration**: ~4 s
- **Content**: Recording → Esc → audio discarded
- **Save to**: `.website/screenshots/feature-cancel.gif`.

#### 4. Pause / Resume
- **Filename**: `feature-pause.gif`
- **Duration**: ~5 s
- **Save to**: `.website/screenshots/feature-pause.gif`.

#### 5. ydotool Auto-Paste
- **Filename**: `feature-paste.gif`
- **Duration**: ~6 s
- **Save to**: `.website/screenshots/feature-paste.gif`.

---

## 📊 Task 4: Render Architecture Diagram as PNG

### Status: ⬜ Pending

### What to Create:
A visual rendering of the system architecture for embedding in
portfolio pages.

### Instructions:

1. **Choose a tool**: draw.io (free), Excalidraw, Figma
2. **Create diagram** following the ASCII version in `architecture.md`
3. **Export**: PNG at 1920×1080 minimum
4. **Save**: `.website/screenshots/architecture-diagram.png`
5. **Reference in `architecture.md`** if desired:
   ```markdown
   ![Architecture](screenshots/architecture-diagram.png)
   ```

---

## 🔐 Task 5: Verify Sensitive Information Removal

### Status: ⏳ Verify before publishing

### What to Check:
Ensure no API keys, passwords, or personal data in any generated files.

### Where to Check:

- `.website/config-samples/` — all files
- Code snippets in `.website/features.md` and `.website/architecture.md`
- Environment variable examples in `.website/environment-variables.md`
- `.website/overview.md` and `.website/README.md`

### Instructions:

1. **Grep config samples**:
   ```bash
   grep -rE "sk-[0-9a-zA-Z]{20,}|sk_live_|ghp_|AKIA|password=" \
     .website/config-samples/ .website/*.md
   ```
   Expect: 0 hits.

2. **Verify `.env.example`**:
   - `.website/config-samples/.env.example` should have placeholders only
   - Real values belong in your local `.env` (not in this bundle)

3. **Verify code snippets**:
   - Open `.website/features.md` and `.website/architecture.md`
   - Confirm no hardcoded API keys or credentials

4. **Verify dict.json sanitisation**:
   - `.website/config-samples/dict.json` should use generic placeholders
   - `your-email@example.com`, `<your-name>`, etc.

---

## 📊 Task 6: Update Performance Metrics (Optional)

### Status: ⬜ Pending

### What to Add:
Real performance data if not already measured.

### Instructions:

1. **Measure end-to-end latency**:
   - Time from `voicematter trigger` (second press) to text in editor.
   - Record for 5 recordings of varying length (10 s, 30 s, 60 s).
   - Update `.website/performance.md`.

2. **Measure memory**:
   - `ps -o rss= -p $(pgrep -f voicematter)` during recording.
   - Update the memory table in `.website/performance.md`.

3. **Lighthouse**:
   - Not applicable — VoiceMatter has no web UI.

---

## ✅ Task 7: Update GitHub Statistics

### Where to Add:
`.website/awards.md` — GitHub Statistics section

### Instructions:

1. Go to the GitHub repository
2. Note current stats:
   - Stars count
   - Fork count
   - Contributor count
   - Commit count
3. Update the table in `.website/awards.md`:
   ```markdown
   | ⭐ Stars | <n> |
   | 🔀 Forks | <n> |
   | 👥 Contributors | <n> |
   | 📝 Commits | <n>+ |
   ```

---

## ✅ Task 8: Final Review Checklist

### Before Publishing:

- [ ] All 7 overlay screenshots captured and added to `.website/screenshots/`
- [ ] Demo video recorded (and uploaded to YouTube if desired)
- [ ] 5 feature GIFs created and referenced
- [ ] All sensitive information removed (Task 5 verified)
- [ ] Performance metrics updated with real data (optional)
- [ ] GitHub statistics updated
- [ ] All markdown files reviewed for accuracy
- [ ] `.website/` media files added to `.gitignore` (see below)

### .gitignore recommendation

Append to the project's `.gitignore`:

```gitignore
# Portfolio documentation bundle (sanitized version lives in portfolio repo)
.website/screenshots/*.png
.website/screenshots/*.gif
.website/screenshots/*.mp4
.website/screenshots/*.webm
.website/.discovery.json
```

`.website/*.md`, `.website/config-samples/`, and `.website/metadata.json`
remain tracked in source — they're sanitized and useful in-repo.

### Optional Enhancements:

- [ ] Create an architecture diagram image
- [ ] Add user testimonials to `.website/awards.md` (after testing)
- [ ] Create presentation slides
- [ ] Design logo

---

## 🚀 Next Steps After Completion:

1. Review all generated documentation for accuracy
2. Complete manual tasks listed above
3. Copy `.website/` folder content to your portfolio website
4. Create a project detail page using the metadata and markdown files
5. Test all links and images display correctly
6. Deploy updated portfolio website

---

## 📋 Copy to Portfolio Repo

When ready to publish:

1. **Sanity check** — open every file, confirm content
2. **Copy the entire `.website/` folder** to your portfolio repo at
   `projects/VoiceMatter/`
3. **Update the portfolio site** to render `metadata.json` + the
   markdown files
4. **Commit** with message:
   `feat(VoiceMatter): add portfolio documentation bundle`
5. **Push** and verify the project page renders correctly

The portfolio site should expect:

- 15 root files at `projects/VoiceMatter/`
- `screenshots/` subdir with PNGs / GIFs / MP4
- `config-samples/` subdir with sanitized configs
- All paths relative to the project folder

---

## File Locations Reference

| File | Purpose |
|------|---------|
| `.website/README.md` | Bundle index — written last |
| `.website/overview.md` | Long description, problem statement |
| `.website/features.md` | Detailed feature documentation |
| `.website/architecture.md` | Technical architecture details |
| `.website/setup.md` | Install + configure + troubleshoot |
| `.website/requirements.md` | OS, hardware, software dependencies |
| `.website/performance.md` | Metrics + benchmarks |
| `.website/environment-variables.md` | Env var reference |
| `.website/known-issues.md` | Bugs + limitations |
| `.website/future.md` | Roadmap + planned features |
| `.website/awards.md` | Recognition + milestones |
| `.website/media.md` | Videos, GIFs, brand assets |
| `.website/admin_instructions.md` | This file |
| `.website/LICENSE` | Proprietary license |
| `.website/metadata.json` | JSON metadata for portfolio site |
| `.website/screenshots/` | Captured overlay screenshots + GIFs |
| `.website/config-samples/` | Sanitized config copies |

---

**Questions or Issues?**
If you encounter problems completing these tasks, refer to the main
documentation files or review the project README.