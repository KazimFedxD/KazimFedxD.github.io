# Known Issues & Limitations

## Current Limitations

### 1. Static Site - No Backend

**Limitation**: The website is entirely client-side with no server-side processing.

**Impact**:
- Cannot store form submissions in a database
- Cannot perform server-side validation
- Cannot implement user authentication
- Limited to EmailJS for contact form (200 emails/month on free tier)

**Workaround**:
- Use EmailJS for contact form
- Consider upgrading EmailJS plan if needed
- For authentication, would need to migrate to a backend solution

**Status**: By design - static sites have inherent limitations

---

### 2. GitHub Pages Deployment Constraints

**Limitation**: GitHub Pages only serves static files, no server-side code execution.

**Impact**:
- No API endpoints
- No database connections
- No server-side rendering (SSR)
- Client-side routing requires 404.html workaround

**Workaround**:
- 404.html redirects all routes to index.html
- sessionStorage preserves intended URL
- React Router handles routing client-side

**Status**: Working as intended

---

### 3. EmailJS Rate Limits

**Limitation**: Free tier limited to 200 emails per month.

**Impact**:
- Contact form may stop working if limit exceeded
- No guarantee of email delivery during high traffic
- 10-second timeout for requests

**Workaround**:
- Display fallback email address on timeout/error
- Upgrade to paid EmailJS plan ($7/month for 1000 emails)
- Implement client-side rate limiting

**Status**: Monitoring usage, upgrade if needed

---

### 4. Large Bundle Size for First Load

**Limitation**: Initial JavaScript bundle is ~140 KB (gzipped).

**Impact**:
- Slightly slower first load on slow connections
- 1.5-2 seconds on 3G networks

**Optimization Applied**:
- Code splitting by route
- Lazy loading for heavy components
- Tailwind CSS purging (95% reduction)
- Tree shaking for unused code

**Status**: Within acceptable range, further optimization possible

---

### 5. No Service Worker / Offline Support

**Limitation**: Website requires internet connection to function.

**Impact**:
- Cannot view website offline
- No cached version for offline access
- No progressive web app (PWA) features

**Workaround**: 
- Implement service worker for caching (future enhancement)
- Use workbox for easy PWA setup

**Status**: Planned for future release (v2.0)

---

## Known Bugs

### Issue #1: React Router 404 on GitHub Pages Refresh

**Affected**: All non-root routes (e.g., `/projects`, `/about`)

**Symptoms**:
- Refreshing page on routes like `/projects` shows 404
- Direct navigation to deep links fails

**Root Cause**:
- GitHub Pages doesn't support client-side routing natively
- Tries to serve `/projects/index.html` which doesn't exist

**Workaround**:
- `404.html` redirects to `index.html` with path info
- JavaScript restores intended route from sessionStorage

**Code in 404.html:**
```html
<script>
  sessionStorage.redirect = location.href;
</script>
<meta http-equiv="refresh" content="0;URL='/'">
```

**Code in index.html:**
```javascript
(function() {
  var redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, null, redirect);
  }
})();
```

**Status**: ✅ Resolved with workaround

---

### Issue #2: GitHub Contribution Graph Rate Limiting

**Affected**: About page GitHub contribution calendar

**Symptoms**:
- Contribution graph fails to load occasionally
- Shows error message instead of calendar

**Root Cause**:
- GitHub API rate limits: 60 requests/hour (unauthenticated)
- Multiple visitors can exhaust rate limit

**Workaround**:
- Skeleton loader shows during fetch
- Error boundary displays fallback message
- `react-github-calendar` has built-in caching

**Status**: ⚠️ Monitoring - rare occurrence

---

### Issue #3: Tailwind Purge False Positives

**Affected**: Dynamic class names not detected

**Symptoms**:
- Dynamically generated Tailwind classes may not be included in production build
- Styles missing for certain elements

**Example Problem:**
```javascript
// This won't work - class not detected by purge
const color = 'purple';
<div className={`text-${color}-500`}>
```

**Workaround**:
- Use complete class names in code:
```javascript
const colorClass = color === 'purple' ? 'text-purple-500' : 'text-blue-500';
<div className={colorClass}>
```
- Or add to safelist in `tailwind.config.js`:
```javascript
module.exports = {
  safelist: ['text-purple-500', 'bg-purple-600'],
};
```

**Status**: ✅ Resolved by using complete class names

---

### Issue #4: Mobile Swipe Conflicts with Browser Gestures

**Affected**: Mobile browsers with swipe-to-navigate (Safari iOS)

**Symptoms**:
- Swipe navigation conflicts with browser back/forward gestures
- Unintended navigation

**Workaround**:
- Disabled swipe navigation feature
- Use navigation menu instead

**Status**: Feature removed in current version

---

### Issue #5: Framer Motion Animation Performance on Low-End Devices

**Affected**: Older mobile devices, low-end Android phones

**Symptoms**:
- Choppy animations (< 30 FPS)
- Delayed page transitions
- UI stuttering during scroll

**Workaround**:
- Reduced animation complexity
- Used CSS transforms (GPU-accelerated)
- Added `will-change` for animated elements

**Code:**
```css
.animated-element {
  will-change: transform, opacity;
}
```

**Status**: ⚠️ Improved but may still lag on very old devices

---

## Platform-Specific Issues

### iOS Safari

**Issue**: Form input autofill styling

**Impact**: Autofilled inputs have yellow background

**Workaround**:
```css
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px #1e293b inset !important;
  -webkit-text-fill-color: #e2e8f0 !important;
}
```

**Status**: ✅ Resolved with CSS override

---

### Firefox

**Issue**: Scrollbar styling differences

**Impact**: Custom scrollbar styles don't apply

**Workaround**:
- Use standard scrollbar appearance on Firefox
- Apply custom styles only for Webkit browsers

**Status**: Acceptable - browser default looks fine

---

### Safari (all versions)

**Issue**: `backdrop-filter` (glassmorphism effect) has poor performance

**Impact**: Slight lag when scrolling glassmorphism elements

**Workaround**:
- Reduce usage of `backdrop-filter`
- Use solid backgrounds on Safari if detected

**Status**: ⚠️ Minor performance impact, acceptable

---

## Performance Considerations

### 1. Initial Bundle Size

**Metric**: 140.7 KB gzipped

**Impact**: 1.5-2s load time on 3G networks

**Consideration**: 
- Still within acceptable range (< 200 KB)
- Mobile-first users may experience slight delay

**Future Optimization**:
- Dynamic imports for project detail pages
- Lazy load images below the fold
- Implement intersection observer

---

### 2. GitHub API Dependency

**Metric**: 800ms - 1.5s to fetch contribution graph

**Impact**: About page loads slower

**Consideration**:
- Shows skeleton loader during fetch
- Not critical for page functionality

**Future Optimization**:
- Cache response in localStorage (24-hour TTL)
- Preload on homepage

---

### 3. No Image Optimization

**Metric**: Screenshots are full-size PNGs (500KB - 2MB each)

**Impact**: Slow loading for project detail pages with many screenshots

**Consideration**:
- Most users won't visit all project details
- Lazy loading helps

**Future Optimization**:
- Convert to WebP format (60-70% smaller)
- Use responsive images (`srcset`)
- Implement progressive image loading

---

## Browser Compatibility Notes

### Internet Explorer 11

**Support**: ❌ Not supported

**Reason**: 
- No ES6+ support without polyfills
- No CSS Grid support
- Tailwind CSS requires modern browsers

**Recommendation**: Use Microsoft Edge (Chromium)

---

### Older Android Browsers (< Android 5.0)

**Support**: ⚠️ Limited

**Issues**:
- CSS Grid may not work
- Flexbox limited support
- Animations may not render

**Recommendation**: Upgrade to modern browser (Chrome, Firefox)

---

## Security Considerations

### 1. No XSS Protection for User Input

**Issue**: Contact form inputs rendered without sanitization in email templates

**Impact**: Potential XSS if EmailJS doesn't sanitize

**Mitigation**:
- EmailJS escapes HTML by default
- Client-side validation prevents script tags

**Status**: ✅ Mitigated by EmailJS

---

### 2. Public API Keys Exposed

**Issue**: EmailJS public key visible in source code

**Impact**: Anyone can use the key to send emails through your account

**Mitigation**:
- EmailJS rate-limits requests per key
- Captcha can be added to prevent abuse
- Free tier has 200 email limit

**Status**: ⚠️ Acceptable risk for portfolio site

---

## Accessibility Limitations

### 1. No Skip-to-Main Links

**Impact**: Keyboard users must tab through full navigation

**Workaround**: Add skip link in next version

**Status**: Planned for v1.1

---

### 2. Some Color Contrast Ratios Below WCAG AAA

**Impact**: Text may be hard to read for visually impaired users

**Example**: Purple-300 on purple-900 background

**Workaround**: Use brighter text colors

**Status**: Meeting WCAG AA standards, AAA optional

---

## Future Known Limitations

### 1. No Search Functionality

**Impact**: Large portfolios become hard to navigate

**Planned**: Implement project search/filter in v2.0

---

### 2. No Analytics Integration

**Impact**: Can't track visitor behavior

**Planned**: Add Google Analytics or privacy-friendly alternative

---

### 3. No Blog Section

**Impact**: No platform for articles/tutorials

**Planned**: Markdown-based blog in v2.0

---

## Reporting Issues

Found a bug not listed here?

1. Open an issue on GitHub
2. Include:
   - Browser and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

**GitHub Issues**: https://github.com/KazimFedxD/KazimFedxD.github.io/issues

---

**Summary**: Most limitations are inherent to static site architecture and are acceptable trade-offs for simplicity and cost-effectiveness. Critical bugs have workarounds implemented.
