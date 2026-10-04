# System Requirements

## Operating Systems

| OS | Version | Supported | Notes |
|---|---|---|---|
| ✅ Windows | 10/11 | Yes | Fully supported, tested on Windows 11 |
| ✅ macOS | 12+ (Monterey) | Yes | Fully supported on Intel and Apple Silicon |
| ✅ Linux | Ubuntu 20.04+ | Yes | Tested on Ubuntu, works on most distributions |
| ✅ Linux | Debian 11+ | Yes | Fully supported |
| ✅ Linux | Fedora 35+ | Yes | Fully supported |
| ⚠️ Windows | 7/8 | Limited | May work but not officially supported |

## Hardware Requirements

### Minimum (Development)
- **RAM**: 4GB
- **CPU**: Dual-core 2.0GHz
- **Disk Space**: 2GB free space
- **Internet**: Required for npm installs and deployment

### Recommended (Development)
- **RAM**: 8GB or more
- **CPU**: Quad-core 2.5GHz or better
- **Disk Space**: 5GB free space
- **SSD**: Recommended for faster build times

### Production (Viewing Website)
- **Any modern device** with a web browser
- **Internet connection** to access GitHub Pages

## Software Dependencies

### Required

#### Node.js 18.0.0+
- **Purpose**: JavaScript runtime for development and build process
- **Installation**: 
  - Windows/macOS: Download from [nodejs.org](https://nodejs.org)
  - Linux: `sudo apt install nodejs` or use nvm
- **Verification**: `node --version`

#### npm 9.0.0+
- **Purpose**: Package manager (comes with Node.js)
- **Verification**: `npm --version`
- **Alternative**: Yarn or pnpm (compatible)

#### Git 2.0.0+
- **Purpose**: Version control for code management
- **Installation**:
  - Windows: Download from [git-scm.com](https://git-scm.com)
  - macOS: `brew install git` or Xcode Command Line Tools
  - Linux: `sudo apt install git`
- **Verification**: `git --version`

### Optional

#### VS Code
- **Purpose**: Recommended code editor
- **Extensions**: 
  - ESLint
  - Tailwind CSS IntelliSense
  - Prettier
  - ES7+ React/Redux snippets

#### Chrome Browser
- **Purpose**: Development and debugging
- **Extensions**:
  - React Developer Tools
  - Redux DevTools (if using Redux)

## Browser Compatibility

### Desktop Browsers

| Browser | Version | Support | Notes |
|---|---|---|---|
| ✅ Chrome | 90+ | Full | Recommended for development |
| ✅ Firefox | 88+ | Full | Fully supported |
| ✅ Safari | 14+ | Full | macOS/iOS browser |
| ✅ Edge | 90+ | Full | Chromium-based |
| ⚠️ Internet Explorer | 11 | None | Not supported (use Edge) |

### Mobile Browsers

| Browser | Version | Support | Notes |
|---|---|---|---|
| ✅ Chrome Mobile | 90+ | Full | Android browser |
| ✅ Safari iOS | 14+ | Full | iPhone/iPad browser |
| ✅ Firefox Mobile | 88+ | Full | Android browser |
| ✅ Samsung Internet | 14+ | Full | Samsung devices |

### Browser Feature Requirements

**Must Support:**
- ES6+ JavaScript features
- CSS Grid and Flexbox
- CSS Custom Properties (variables)
- CSS Transforms and Transitions
- Fetch API
- Local Storage
- History API (for routing)

## Network Requirements

### Development
- **Internet connection** required for:
  - Installing npm packages
  - Fetching GitHub API data
  - Sending emails via EmailJS
  - Deploying to GitHub Pages

### Production (User Viewing)
- **Bandwidth**: Minimum 1 Mbps (recommended 5+ Mbps)
- **Latency**: Best experience with < 100ms ping

## npm Package Dependencies

### Production Dependencies

```json
{
  "@emailjs/browser": "^4.4.1",        // Email service
  "framer-motion": "^12.23.24",        // Animations
  "lucide-react": "^0.554.0",          // Icons
  "react": "^19.2.0",                  // UI library
  "react-dom": "^19.2.0",              // React DOM rendering
  "react-github-calendar": "^4.5.11",  // GitHub stats
  "react-icons": "^5.5.0",             // Icon library
  "react-markdown": "^10.1.0",         // Markdown rendering
  "react-router-dom": "^7.9.4",        // Routing
  "react-scripts": "^5.0.1",           // Build tools
  "react-simple-icons": "^1.0.0-beta.5", // Tech logos
  "react-swipeable": "^7.0.2",         // Swipe gestures
  "react-syntax-highlighter": "^16.1.0", // Code highlighting
  "simple-icons": "^15.17.0"           // Icon data
}
```

### Development Dependencies

```json
{
  "autoprefixer": "^10.4.21",          // CSS vendor prefixes
  "gh-pages": "^6.3.0",                // GitHub Pages deployment
  "postcss": "^8.5.6",                 // CSS processing
  "tailwindcss": "^3.4.17"             // CSS framework
}
```

## External Services

### Required Services

#### GitHub Pages
- **Purpose**: Website hosting
- **Cost**: Free for public repositories
- **Requirements**: GitHub account
- **Limitations**: 
  - 100 GB/month bandwidth soft limit
  - 1 GB repository size recommended
  - Static site only (no backend)

### Optional Services

#### EmailJS
- **Purpose**: Contact form functionality
- **Cost**: Free tier (200 emails/month)
- **Requirements**: EmailJS account (free)
- **Limitations**: 
  - 200 emails/month on free tier
  - Public API keys (rate-limited)

#### GitHub API
- **Purpose**: Contribution graph data
- **Cost**: Free
- **Requirements**: None (public data)
- **Rate Limits**: 
  - 60 requests/hour (unauthenticated)
  - 5000 requests/hour (authenticated)

## Development Environment Setup

### Minimum Setup Time
- **First-time setup**: 10-15 minutes
  - Install Node.js: 5 minutes
  - Clone repository: 1 minute
  - Install dependencies: 3-5 minutes
  - Start dev server: 1 minute

### Disk Space Usage
- **node_modules**: ~400 MB
- **Source code**: ~5 MB
- **Build output**: ~1.5 MB
- **Total**: ~410 MB

## IDE/Editor Requirements

### VS Code (Recommended)
- **Version**: 1.70+
- **Extensions**:
  - ESLint (code linting)
  - Prettier (code formatting)
  - Tailwind CSS IntelliSense (autocomplete)
  - ES7+ React/Redux snippets (code snippets)

### Alternative Editors
- ✅ WebStorm (full IDE, paid)
- ✅ Sublime Text (lightweight, free)
- ✅ Atom (GitHub's editor, free)
- ✅ Vim/Neovim (terminal-based)

## Accessibility Requirements

### Screen Readers
- **NVDA** (Windows) - Supported
- **JAWS** (Windows) - Supported
- **VoiceOver** (macOS/iOS) - Supported
- **TalkBack** (Android) - Supported

### Keyboard Navigation
- Full keyboard support
- Tab order logical
- Focus indicators visible
- Skip to content links

## SEO Requirements

### Search Engine Crawlers
- **Googlebot** - Supported (robots.txt configured)
- **Bingbot** - Supported
- **Social crawlers** - Supported (Open Graph meta tags)

### Sitemap
- `sitemap.xml` provided
- All pages indexed
- Automatic submission to search engines

## Deployment Requirements

### GitHub Account
- **Required**: Yes
- **Access**: Public repository (free) or private (requires GitHub Pro)

### Domain (Optional)
- Custom domain supported
- DNS configuration required
- HTTPS enforced (GitHub Pages provides free SSL)

## Performance Requirements (User Device)

### Minimum for Good Experience
- **RAM**: 2GB
- **Browser**: Modern browser (last 2 years)
- **Internet**: 1 Mbps download
- **JavaScript**: Enabled (required)

### Recommended
- **RAM**: 4GB+
- **Internet**: 5+ Mbps
- **Screen**: 1280x720 minimum resolution

---

## Quick Start Compatibility Check

Run this checklist before starting:

```bash
# ✅ Check Node.js version (need 18+)
node --version

# ✅ Check npm version (need 9+)
npm --version

# ✅ Check Git version (need 2.0+)
git --version

# ✅ Check disk space (need 2+ GB free)
df -h  # Linux/macOS
# or check manually on Windows

# ✅ Test internet connection
ping google.com
```

**All checks passed?** You're ready to set up the portfolio website! 🎉

**Any check failed?** Install/upgrade the required software before proceeding.
