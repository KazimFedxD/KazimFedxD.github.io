# Environment Variables

This portfolio website does not use traditional environment variables as it's a fully client-side application deployed on GitHub Pages. However, there are some configuration values that can be considered "environment-specific."

## No Backend = No Secret Environment Variables

**Important**: Since this is a static site with no backend, there are NO secret environment variables like database URLs, API secrets, or server configurations.

## Configuration Values

### EmailJS Configuration

Located in `src/pages/Contact.js`:

```javascript
const SERVICE_ID = 'service_quay1th';
const TEMPLATE_OWNER = 'template_4fsca3d';  // Template for site owner notification
const TEMPLATE_USER = 'template_i0a3otb';   // Template for user confirmation
const PUBLIC_KEY = 'Si2AYHuddQeZRlp7G';
```

**Security Note**: These are PUBLIC API keys designed by EmailJS for frontend use. They are:
- ✅ Safe to expose in client-side code
- ✅ Rate-limited by EmailJS to prevent abuse
- ✅ Not sensitive credentials

**To use your own EmailJS account:**

1. Sign up at [EmailJS](https://www.emailjs.com)
2. Create a new email service (Gmail, Outlook, etc.)
3. Create two email templates:
   - **Template 1**: Notification to you (site owner)
     ```
     Subject: New Contact from {{user_name}}
     
     You have a new contact form submission:
     
     From: {{user_name}}
     Email: {{email}}
     Subject: {{subject}}
     Message: {{message}}
     Timestamp: {{timestamp}}
     ```
   
   - **Template 2**: Confirmation to user
     ```
     Subject: Thanks for contacting me!
     
     Hi {{user_name}},
     
     Thank you for reaching out. I've received your message and will respond soon.
     
     Your message:
     {{message}}
     
     Best regards,
     Kazim Abbas
     ```

4. Get your credentials from EmailJS dashboard
5. Replace values in `Contact.js`

### GitHub Configuration

Located in `src/components/GitHubStats.js`:

```javascript
const GITHUB_USERNAME = 'KazimFedxD';
```

**To customize:**
- Replace `'KazimFedxD'` with your GitHub username
- No API token needed for public data
- GitHub API rate limit: 60 requests/hour (unauthenticated)

### GitHub Pages Deployment

Located in `package.json`:

```json
{
  "homepage": ".",
  "scripts": {
    "deploy": "gh-pages -d build -r https://github.com/KazimFedxD/KazimFedxD.github.io.git"
  }
}
```

**To customize:**
1. Change repository URL to your own:
   ```json
   "deploy": "gh-pages -d build -r https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git"
   ```

2. If using custom domain, add `CNAME` file to `public/`:
   ```
   yourdomain.com
   ```

### Custom Domain (Optional)

If using a custom domain, create `public/CNAME`:

```
yourdomain.com
```

**DNS Configuration** (with your domain provider):

```
# A Records (for apex domain)
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153

# CNAME Record (for www subdomain)
Type: CNAME
Name: www
Value: yourusername.github.io
```

## React Build Configuration

### Public URL

Located in `package.json`:

```json
{
  "homepage": "."
}
```

**Options:**
- `"."` - Relative paths (works for GitHub Pages with custom or default domain)
- `"https://yourusername.github.io"` - Absolute URL (GitHub Pages default)
- `"https://yourdomain.com"` - Custom domain

### Node Environment

Set automatically by `react-scripts`:

```bash
# Development mode
npm start
# NODE_ENV=development (automatic)

# Production build
npm run build
# NODE_ENV=production (automatic)
```

**Effects:**
- Development: Verbose error messages, React DevTools enabled
- Production: Minified code, optimizations enabled, error reporting minimal

## Browser Configuration

### Local Storage Keys

The app uses these localStorage keys (if implemented):

```javascript
// Theme preference (if dark mode toggle implemented)
const THEME_KEY = 'portfolio-theme'; // 'light' or 'dark'

// Session redirect (for GitHub Pages SPA routing)
const REDIRECT_KEY = 'redirect'; // Temporary, cleared after use
```

**No sensitive data stored in localStorage.**

## Build-Time Configuration

### Tailwind Configuration

Located in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Scan these files for classes
  ],
  theme: {
    extend: {
      colors: {
        purple: { /* custom colors */ },
      },
    },
  },
};
```

**Customization:**
- Modify `colors` for different color scheme
- Add/remove `animation` keyframes
- Adjust `content` paths if folder structure changes

### PostCSS Configuration

Located in `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**No changes needed** unless adding custom PostCSS plugins.

## Project-Specific Data

### Project Data Files

Located in `src/data/`:

```javascript
// projectsData.js - Central registry
export const projectsData = [
  {
    title: "Project Name",
    description: "...",
    tech: [...],
    // ...
  }
];

// [project-name]-data.js - Detailed project info
export const projectNameData = {
  title: "Project Name",
  overview: { /* ... */ },
  features: [ /* ... */ ],
  // ...
};
```

**To add your projects:**
1. Edit `src/data/projectsData.js`
2. Create `src/data/your-project-data.js` for detail page
3. Add route mapping in `src/pages/ProjectDetail.js`

### Personal Information

Scattered across components:

**`src/pages/Home.js`:**
```javascript
const fullText = 'Software Developer | Backend Engineer | Tech Enthusiast';
```

**`src/pages/About.js`:**
```javascript
const bio = "I'm a passionate Software Developer from Karachi, Pakistan...";
```

**`src/App.js`:**
```javascript
<Link to="/" className="...">Kazim Abbas</Link>
```

**Social Links:**
```javascript
<a href="https://github.com/KazimFedxD">GitHub</a>
<a href="https://www.linkedin.com/in/kazim-abbas-861095210">LinkedIn</a>
```

**Update these values** to match your information.

## SEO Configuration

### Meta Tags

Located in `public/index.html`:

```html
<head>
  <title>Kazim Abbas - Portfolio</title>
  <meta name="description" content="Portfolio of Kazim Abbas, Backend Developer and Software Engineer from Karachi, Pakistan." />
  <meta name="keywords" content="Kazim Abbas, software developer, backend engineer, Django, React, Python" />
  
  <!-- Open Graph for social sharing -->
  <meta property="og:title" content="Kazim Abbas - Portfolio" />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Kazim Abbas - Portfolio" />
</head>
```

**Customize:**
- Change title and description
- Add your social media image to `public/og-image.jpg`
- Update keywords for SEO

### Sitemap

Located in `public/sitemap.xml`:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kazimfedxd.github.io/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://kazimfedxd.github.io/about</loc>
    <priority>0.8</priority>
  </url>
  <!-- Add your pages -->
</urlset>
```

**Update URLs** if using custom domain.

### Robots.txt

Located in `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://kazimfedxd.github.io/sitemap.xml
```

**Update sitemap URL** if using custom domain.

## Manifest (PWA Configuration)

Located in `public/manifest.json`:

```json
{
  "short_name": "Kazim Abbas",
  "name": "Kazim Abbas - Portfolio",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#a855f7",
  "background_color": "#0f172a"
}
```

**Customize:**
- Change name and short_name
- Add app icons (192x192, 512x512)
- Adjust theme colors

## Summary

| Configuration | Location | Type | Sensitive? |
|---|---|---|---|
| EmailJS credentials | `src/pages/Contact.js` | Public API keys | ❌ No |
| GitHub username | `src/components/GitHubStats.js` | Public data | ❌ No |
| Deployment URL | `package.json` | Repository URL | ❌ No |
| Custom domain | `public/CNAME` | Domain name | ❌ No |
| Meta tags | `public/index.html` | SEO data | ❌ No |
| Project data | `src/data/*.js` | Portfolio content | ❌ No |

**⚠️ Important Security Note:**

This portfolio website has **NO backend** and **NO secret credentials**. All configuration values are safe to expose publicly. The only "sensitive" information is your personal data (bio, contact info), which you intentionally want to share.

**Do NOT:**
- ❌ Add actual database credentials
- ❌ Add private API keys
- ❌ Add authentication secrets
- ❌ Commit `.env` files (none needed here)

**Static sites = No secrets needed! 🎉**
