# Admin Instructions - Manual Tasks

This file contains tasks that need to be completed manually to finalize the project documentation.

---

## ✅ Task 1: Capture Screenshots — **COMPLETED**

### Status: ✅ **All screenshots captured and saved**

### Completed Screenshots:

#### ✅ 1. Homepage Screenshot
- **Filename**: `homepage.png`
- **Location**: `.website/screenshots/homepage.png`
- **Status**: ✅ Complete

#### ✅ 2. Session Active Screenshot
- **Filename**: `session-active.png`
- **Location**: `.website/screenshots/session-active.png`
- **Status**: ✅ Complete

#### ✅ 3. AI Question Screenshot
- **Filename**: `session-ai-question.png`
- **Location**: `.website/screenshots/session-ai-question.png`
- **Status**: ✅ Complete

#### ✅ 4. Evaluation Results Screenshot
- **Filename**: `evaluation.png`
- **Location**: `.website/screenshots/evaluation.png`
- **Status**: ✅ Complete

#### ✅ 5. Sessions List Screenshot
- **Filename**: `sessions-list.png`
- **Location**: `.website/screenshots/sessions-list.png`
- **Status**: ✅ Complete

#### ✅ 6. Mobile Screenshots
- **Filename**: `mobile-homepage.png`, `mobile-session.png`
- **Location**: `.website/screenshots/`
- **Status**: ✅ Complete

**All screenshot files are now available in `.website/screenshots/` folder.**

---

## 🎬 Task 2: Upload Demo Video to YouTube

### What to Do:
Upload the existing `teachback.mp4` video to YouTube and update documentation.

### Video Status:
✅ **Video file created**: `teachback.mp4` (located in `.website/screenshots/`)
- **Filename**: `teachback.mp4`
- **Location**: `.website/screenshots/teachback.mp4`
- **Type**: Full feature showcase and launch demo video
- **Status**: ✅ Created, 📋 Needs YouTube upload

### Instructions:

1. **Review the Video**:
   - Open `.website/screenshots/teachback.mp4`
   - Verify quality and content
   - Check audio levels
   - Confirm all features are demonstrated

2. **Upload to YouTube**:
   - Log in to your YouTube account
   - Click "Create" → "Upload videos"
   - Select `.website/screenshots/teachback.mp4`
   - Fill in details:
     - **Title**: "TeachBack - Learn by Teaching AI (Full Demo)"
     - **Description**: 
       ```
       TeachBack is an innovative learning platform where students learn by teaching AI.
       
       The AI listens, interrupts with questions, and evaluates your understanding.
       
       🚀 Features:
       • Real-time speech-to-text transcription
       • AI-powered question generation
       • Interactive teaching sessions
       • Comprehensive evaluation system
       • Mobile-responsive design
       
       🔗 GitHub: https://github.com/KazimFedxD/TeachBack
       🏆 NASA Space Apps Challenge 2025 Finalist
       
       Tech Stack: React 19, Django 5.2, PostgreSQL, Redis, WebSocket, Deepgram, Groq AI, ElevenLabs
       ```
     - **Tags**: learning, AI, education, teach, speech-to-text, voice, teaching, evaluation, interactive-learning, edtech, django, react, websocket
     - **Visibility**: Public or Unlisted (your choice)
     - **Thumbnail**: Use a screenshot from `.website/screenshots/` (homepage.png or session-active.png recommended)

3. **After Upload**:
   - Copy the YouTube video URL (e.g., `https://youtube.com/watch?v=xxxxx`)
   - Update documentation files:

4. **Update Documentation Files**:
   
   **A. Update `media.md`**:
   - Open `.website/media.md`
   - Find this line:
     ```markdown
     - **YouTube**: [Project Demo](placeholder)
     - **Status**: 📋 Pending creation
     ```
   - Replace with:
     ```markdown
     - **YouTube**: [Project Demo](https://youtube.com/watch?v=YOUR_VIDEO_ID)
     - **Status**: ✅ Uploaded
     ```
   
   **B. Update `metadata.json`** (if it has a video field):
   - Add or update:
     ```json
     "video": "https://youtube.com/watch?v=YOUR_VIDEO_ID"
     ```

5. **Optional - Create Video Thumbnail**:
   - Use Canva, Figma, or Photoshop
   - Dimensions: 1280×720 pixels
   - Include project logo and key visual
   - Add text: "TeachBack - Learn by Teaching AI"
   - Upload as custom thumbnail in YouTube Studio

**Example Update**:
```markdown
Before: - **YouTube**: [Project Demo](placeholder)
After:  - **YouTube**: [Project Demo](https://youtube.com/watch?v=dQw4w9WgXcQ)
```

---

## 🎨 Task 3: Create Feature GIFs

### What to Create:
Short GIF animations showing key features in action (5-10 seconds each).

### Where to Add:
`.website/screenshots/` folder.

### Required GIFs:

#### 1. Teaching Session Flow
- **Filename**: `session-flow.gif`
- **Duration**: 10-15 seconds
- **Content**: User speaking → transcript appearing → AI asking question
- **Instructions**:
  1. Use ScreenToGif, LICEcap, or Kap
  2. Set capture area around session interface
  3. Start recording
  4. Speak a few sentences, wait for AI response
  5. Stop recording
  6. Optimize to under 5MB
  7. Save to `.website/screenshots/`

#### 2. Real-Time Transcript
- **Filename**: `transcript.gif`
- **Duration**: 5-8 seconds
- **Content**: Words appearing as user speaks
- **Instructions**: Same as above, focus on transcript area

#### 3. Evaluation Animation
- **Filename**: `evaluation.gif`
- **Duration**: 5-8 seconds
- **Content**: Page loading with score bars animating
- **Instructions**: Capture evaluation page load

---

## 📊 Task 4: Create Architecture Diagram

### What to Create:
Visual system architecture diagram (optional - text version exists).

### Where to Add:
`.website/screenshots/architecture-diagram.png`

### Instructions:

1. **Choose a Tool**:
   - draw.io (free, recommended)
   - Excalidraw
   - Lucidchart
   - Figma

2. **Create Diagram** following the text version in `architecture.md`:
   - Include all major components
   - Show data flow with arrows
   - Use consistent colors matching brand
   - Label each component

3. **Export**:
   - Save as PNG: `.website/screenshots/architecture-diagram.png`
   - Resolution: At least 1920×1080

4. **Update Documentation**:
   - Optionally add image to `architecture.md`:
     ```markdown
     ![Architecture Diagram](screenshots/architecture-diagram.png)
     ```

---

## 🔐 Task 5: Verify Sensitive Information Removal

### What to Check:
Ensure no API keys, passwords, or personal data in any generated files.

### Where to Check:
- All files in `.website/config-samples/`
- Code snippets in `features.md` and `architecture.md`
- Environment variable examples in `environment-variables.md`

### Instructions:

1. **Review Config Files**:
   - Open each file in `.website/config-samples/`
   - Search for patterns:
     - API keys (usually long alphanumeric strings)
     - Passwords
     - Email addresses
     - Production URLs
   - Replace with placeholders if found

2. **Review Code Snippets**:
   - Open `features.md` and `architecture.md`
   - Check all code blocks
   - Ensure no hardcoded credentials

3. **Review Environment Variables**:
   - Open `environment-variables.md`
   - Ensure all examples are generic placeholders

---

## 📝 Task 6: Update Performance Metrics (Optional)

### What to Add:
Real performance data if not already measured.

### Where to Add:
Update values in both `metadata.json` and `performance.md`.

### Instructions:

1. **Run Lighthouse Audit**:
   - Open the application in Chrome
   - Open DevTools (F12)
   - Go to "Lighthouse" tab
   - Run audit for Performance, Accessibility, Best Practices, SEO
   - Copy scores to `performance.md`
   - Update `metadata.json` lighthouseScore

2. **Measure Bundle Size**:
   ```bash
   docker compose exec frontend npm run build
   ```
   - Check output for bundle sizes
   - Update `performance.md`

3. **Measure API Response Times**:
   - Use browser DevTools Network tab
   - Test key endpoints
   - Record average response times

---

## ✅ Task 7: Update GitHub Statistics

### Where to Add:
`awards.md` - GitHub Statistics section

### Instructions:

1. Go to the GitHub repository
2. Note current stats:
   - Stars count
   - Fork count
   - Commit count
3. Update `awards.md`:
   ```markdown
   | ⭐ Stars | [actual number] |
   | 🔀 Forks | [actual number] |
   | 📝 Commits | [actual number] |
   ```

---

## ✅ Task 8: Final Review Checklist

### Before Publishing:

- [x] All screenshots captured and added to `.website/screenshots/`
- [x] Demo video created (`teachback.mp4`)
- [ ] Demo video uploaded to YouTube and link updated in `media.md`
- [ ] Feature GIFs created and referenced (optional)
- [ ] All sensitive information removed
- [ ] Performance metrics updated with real data (optional)
- [ ] GitHub statistics updated
- [ ] All markdown files reviewed for accuracy
- [x] `.website/` added to `.gitignore`

### Optional Enhancements:

- [ ] Create architecture diagram image
- [ ] Add user testimonials to `awards.md` (after testing)
- [ ] Create presentation slides
- [ ] Design logo

---

## 🚀 Next Steps After Completion:

1. Review all generated documentation for accuracy
2. Complete manual tasks listed above
3. Copy `.website/` folder content to your portfolio website
4. Create project detail page using the metadata and markdown files
5. Test all links and images display correctly
6. Deploy updated portfolio website

---

## File Locations Reference

| File | Purpose |
|------|---------|
| `.website/metadata.json` | Project metadata for programmatic use |
| `.website/overview.md` | Long description, problem statement |
| `.website/features.md` | Detailed feature documentation |
| `.website/architecture.md` | Technical architecture details |
| `.website/setup.md` | Installation and configuration |
| `.website/performance.md` | Performance metrics |
| `.website/requirements.md` | System requirements |
| `.website/environment-variables.md` | Env var reference |
| `.website/known-issues.md` | Bugs and limitations |
| `.website/awards.md` | Recognition and achievements |
| `.website/future.md` | Roadmap and planned features |
| `.website/media.md` | Video and media asset info |
| `.website/screenshots/` | Screenshot images |
| `.website/config-samples/` | Sanitized config files |

---

**Questions or Issues?**
If you encounter any problems completing these tasks, refer to the main documentation files or review the project README.
