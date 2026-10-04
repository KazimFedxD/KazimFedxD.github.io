# Setup & Configuration

## Prerequisites

Before setting up the portfolio website locally, ensure you have the following installed:

### Required Software
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** 2.0.0 or higher

### Verify Installation

```bash
# Check Node.js version
node --version
# Should output: v18.x.x or higher

# Check npm version
npm --version
# Should output: 9.x.x or higher

# Check Git version
git --version
# Should output: git version 2.x.x or higher
```

### Optional Tools
- **VS Code** - Recommended code editor
- **Chrome DevTools** - For debugging
- **React DevTools** - Browser extension for React debugging

---

## Installation

### 1. Clone Repository

```bash
# Clone the repository
git clone https://github.com/KazimFedxD/KazimFedxD.github.io.git

# Navigate to project directory
cd KazimFedxD.github.io
```

### 2. Install Dependencies

```bash
# Install all npm packages
npm install

# This will install:
# - React 19.2.0
# - React Router DOM 7.9.4
# - Tailwind CSS 3.4.17
# - Framer Motion 12.23.24
# - EmailJS 4.4.1
# - And all other dependencies listed in package.json
```

**Expected output:**
```
added 1500+ packages in 45s
```

### 3. Configure Environment (Optional)

The project doesn't require environment variables for local development. EmailJS credentials are embedded in the code (public API keys designed for frontend use).

If you want to use your own EmailJS account:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and two email templates
3. Update credentials in `src/pages/Contact.js`:

```javascript
// Replace these with your EmailJS credentials
const SERVICE_ID = 'your_service_id';
const TEMPLATE_OWNER = 'your_template_id_for_owner';
const TEMPLATE_USER = 'your_template_id_for_confirmation';
const PUBLIC_KEY = 'your_public_key';
```

### 4. Start Development Server

```bash
# Start the development server
npm start

# The app will open automatically in your browser at:
# http://localhost:3000
```

**Expected output:**
```
Compiled successfully!

You can now view kazimfedxd.github.io in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

### 5. Verify Installation

Once the development server is running, verify:

- ✅ Homepage loads with animated background
- ✅ Navigation menu works (click different pages)
- ✅ Projects page displays project cards
- ✅ Contact form renders correctly
- ✅ No console errors in browser DevTools

---

## Configuration

### Tailwind CSS Configuration

The project uses a custom Tailwind configuration in `tailwind.config.js`:

**Custom Colors:**
```javascript
colors: {
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    // ... up to 950
  },
}
```

**Custom Animations:**
```javascript
animation: {
  'fade-in': 'fadeIn 0.8s ease-in-out',
  'slide-up': 'slideUp 0.6s ease-out',
  'glow': 'glow 2s ease-in-out infinite',
  'float': 'float 3s ease-in-out infinite',
}
```

### PostCSS Configuration

`postcss.config.js` processes Tailwind CSS:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Package.json Scripts

Available npm scripts:

```bash
# Start development server (port 3000)
npm start

# Create production build
npm run build

# Run tests (if configured)
npm test

# Deploy to GitHub Pages
npm run deploy

# Eject from Create React App (irreversible)
npm run eject
```

---

## Adding a New Project

To add a new project to the portfolio:

### Step 1: Add Project to Registry

Edit `src/data/projectsData.js`:

```javascript
export const projectsData = [
  // Existing projects...
  {
    title: "Your New Project",
    description: "Brief description of the project",
    tech: ["React", "Node.js", "MongoDB"],
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3"
    ],
    github: "https://github.com/username/project",
    badge: "🚀 New", // Optional
    order: 5 // Display priority
  }
];
```

### Step 2: Create Detailed Data File (Optional)

For projects with detail pages, create `src/data/your-project-data.js`:

```javascript
export const yourProjectData = {
  title: "Your New Project",
  techStack: [
    { name: "React", version: "19", category: "Frontend" },
    // More tech...
  ],
  overview: {
    description: "Detailed description...",
    problemStatement: ["Problem 1", "Problem 2"],
    uniqueFeatures: [...]
  },
  features: [
    {
      id: 1,
      title: "Feature Name",
      description: "...",
      codeSnippets: [...]
    }
  ],
  // More sections...
};
```

### Step 3: Add Route (if detail page exists)

Edit `src/pages/ProjectDetail.js`:

```javascript
const projectDataMap = {
  'Full-Stack-Template': fullStackTemplateData,
  'Your-New-Project': yourProjectData, // Add this line
};
```

### Step 4: Add Screenshots

1. Create folder: `public/screenshots/Your-New-Project/`
2. Add screenshots: `homepage.png`, `feature1.png`, etc.
3. Reference in data file:
   ```javascript
   screenshots: [
     {
       filename: "homepage.png",
       caption: "Homepage view",
       category: "Frontend"
     }
   ]
   ```

---

## Deployment

### Option 1: Automated Deployment Script

Use the provided `deploy.sh` script:

```bash
# Make script executable (first time only)
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

**The script will:**
1. Show current branch and git status
2. Ask for confirmation to proceed
3. Stage all changes
4. Build the project (`npm run build`)
5. Commit changes
6. Push to main branch
7. Deploy build folder to gh-pages branch
8. GitHub Pages automatically updates the site

### Option 2: Manual Deployment

```bash
# 1. Build the project
npm run build

# 2. Commit changes
git add .
git commit -m "Update website"
git push origin main

# 3. Deploy to gh-pages
npm run deploy
```

### Option 3: GitHub Pages Manual Setup

1. Go to repository settings on GitHub
2. Navigate to "Pages" section
3. Set source to `gh-pages` branch
4. Click "Save"
5. Website will be live at `https://username.github.io`

### Custom Domain Configuration

To use a custom domain:

1. Create `CNAME` file in `public/` folder:
   ```
   yourdomain.com
   ```

2. Configure DNS records with your domain provider:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

   ```
   Type: CNAME
   Name: www
   Value: username.github.io
   ```

3. Enable "Enforce HTTPS" in GitHub Pages settings

4. Wait for DNS propagation (up to 24 hours)

---

## Challenges & Solutions

### Challenge 1: React Router on GitHub Pages

**Problem:** GitHub Pages serves 404 for non-root routes when refreshing page.

**Solution:** Created `404.html` that redirects to `index.html` with path information:

```html
<!-- public/404.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
</html>
```

Then in `index.html`, restore the path:
```javascript
(function() {
  var redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, null, redirect);
  }
})();
```

### Challenge 2: Build Size Optimization

**Problem:** Initial build was too large (>1 MB), slow load times.

**Solution:**
1. Enabled Tailwind CSS purging to remove unused styles
2. Used tree-shaking for libraries (import only needed components)
3. Optimized images and compressed assets
4. Result: Bundle size reduced to ~200 KB (gzipped)

### Challenge 3: Mobile Navigation

**Problem:** Desktop navigation menu not mobile-friendly.

**Solution:**
1. Implemented hamburger menu for mobile screens
2. Used Tailwind `md:hidden` and `hidden md:flex` utilities
3. Added Framer Motion for smooth menu animations
4. Made touch targets 44x44px minimum for accessibility

### Challenge 4: EmailJS CORS Issues

**Problem:** EmailJS requests blocked by CORS in development.

**Solution:**
- EmailJS is designed for frontend use, no CORS issues in production
- For local development, use `http://localhost:3000` (not `file://`)
- Public keys are safe to expose (rate-limited by EmailJS)

### Challenge 5: GitHub Contribution Graph Loading

**Problem:** GitHub API rate limits caused contribution graph to fail.

**Solution:**
1. Used `react-github-calendar` library with caching
2. Added error boundary for graceful failure
3. Implemented skeleton loader during fetch

---

## Build & Production

### Creating Production Build

```bash
# Build for production
npm run build
```

**Build process:**
1. React Scripts compiles JSX to JavaScript
2. Webpack bundles dependencies
3. Tailwind purges unused CSS
4. Assets minified and optimized
5. Source maps generated
6. Output to `build/` folder

**Build output:**
```
build/
├── static/
│   ├── css/
│   │   └── main.abc123.css (optimized CSS bundle)
│   └── js/
│       ├── main.xyz456.js (main app bundle)
│       └── [chunkhash].js (lazy-loaded chunks)
├── index.html (entry point)
├── manifest.json (PWA manifest)
├── robots.txt
├── sitemap.xml
└── screenshots/ (copied from public/)
```

### Testing Production Build Locally

```bash
# Install serve globally (one-time)
npm install -g serve

# Serve the build folder
serve -s build -p 5000

# Open http://localhost:5000 in browser
```

### Performance Metrics

After building, check bundle sizes:

```bash
npm run build

# Output shows file sizes:
File sizes after gzip:

  140.7 kB  build/static/js/main.abc123.js
  5.56 kB   build/static/css/main.xyz456.css
```

---

## Troubleshooting

### Issue: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or run on different port
PORT=3001 npm start
```

### Issue: Tailwind styles not applying

**Solution:**
1. Ensure Tailwind directives in `index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
2. Restart development server
3. Clear browser cache

### Issue: React DevTools not working

**Solution:**
- Install React DevTools browser extension
- Ensure running in development mode (not production build)

---

## Next Steps

After successful setup:

1. ✅ Customize content in page components
2. ✅ Add your own projects to `projectsData.js`
3. ✅ Replace profile image in `public/`
4. ✅ Update social links in components
5. ✅ Configure EmailJS with your credentials
6. ✅ Add resume PDF to `public/` folder
7. ✅ Test on multiple devices and browsers
8. ✅ Deploy to GitHub Pages
9. ✅ Set up custom domain (optional)
10. ✅ Share your portfolio! 🎉

---

**For more help:** Open an issue on GitHub or refer to [React documentation](https://react.dev) and [Tailwind CSS documentation](https://tailwindcss.com).
