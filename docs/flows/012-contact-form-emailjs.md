# 012 — Contact form + EmailJS + business-email migration

## Entry points

- `portfolio_data/content/contact.json` — source of truth for the EmailJS service/template/public key and the contact-info card list.
- `components/machine/box-computer-engine.ts` — `PAGES.contact.html` (template) + the new `wireContactForm()` builder + the `openApp()` else-branch wiring.
- `components/machine/box-computer.css` — `.contact-form` styles inside `.browser-page`.
- `next.config.mjs` — CSP `connect-src` allowlist (added `https://api.emailjs.com`).
- `package.json` — new `@emailjs/browser` dependency.

## Flow

### 1. EmailJS configuration (`contact.json`)

`form.emailJs` already existed with a stub `publicKey: "REPLACE_WITH_EMAILJS_PUBLIC_KEY"`. The real keys (`serviceId`, `publicKey`, `templates.notification`, `templates.confirmation`, `fallbackEmail`) now live there directly — chosen over a `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` env-var indirection. The keys aren't secrets by EmailJS's own contract (the `public` in the name is literal), so committing them in `contact.json` is fine and matches the existing "single source of truth" pattern used for every other piece of portfolio data.

`contactInfo[0]` (Email) was repointed from the personal `abbaskazim135@gmail.com` to the business `fedxdofficial@gmail.com`. The personal email does not appear anywhere in the rendered Contact app — `IDENTITY.email` is derived from this same array, so the in-sim Terminal `contact` shell command and the `data-link="email"` routing target both follow the JSON update with zero engine edits.

### 2. Form render (`PAGES.contact.html`)

The contact-app window already uses the generic browser-page renderer (chrome + `page.html` + click delegation). The form HTML was injected into `PAGES.contact.html` between the contact-info `.card` loop and the existing `<hr><p>Based in…</p>` footer:

- `<h2>Send a message</h2>` heading.
- `<form class="contact-form" id="contactForm" novalidate>` with:
  - `.form-row` containing Name + Email inputs side-by-side.
  - Subject input (optional).
  - Message textarea (`rows="6"`).
  - `.form-actions` row with the `Send` button (reusing the `.dlbtn` style added in flow 011) and a `aria-live="polite"` `#contactStatus` span for inline feedback.

`novalidate` was chosen so the browser's native popover validation doesn't fight the custom JS validation inside the engine.

### 3. Submission handler (`wireContactForm`)

A new builder function added next to `buildFileManager`. It runs once when the Contact app opens (wired in `openApp()` else branch with `if (id === 'contact') wireContactForm(body, statusEl);`).

On `submit` it:

1. `preventDefault()` (form lives inside `.browser-page`, no navigation anyway).
3. Reads `user_name` / `email` / `subject` / `message` from `FormData`.
4. Inline-stripped, required-field check (name + email + message), then email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
5. Disables the submit button, sets `#contactStatus` and the browser-page status bar (`#bStatus`) to `Sending…`.
6. Builds the payload the user's old code used — same field names (`user_name`, `email`, `subject`, `message`, `timestamp`) so the existing EmailJS templates don't need any edits.
7. Fires `Promise.all([emailjs.send(serviceId, notification, …), emailjs.send(serviceId, confirmation, …)])` — notification to the owner, confirmation to the visitor, identical to the old site.
8. On success: `Message sent.` + `form.reset()`.
9. On failure: `Couldn't send. Try {fallbackEmail}.` (form state preserved so the user can retry).
10. `finally`: re-enables the submit button.

The status-bar update is handled via a `setStatus()` closure inside `wireContactForm` so both the inline `#contactStatus` (next to the Send button) and the bottom `#bStatus` (the in-sim browser's status bar) stay in sync.

### 4. Form styling

`box-computer.css` gained a `.contact-form` block (inputs, textarea, `.form-row`, `.form-actions`, `.form-status`) under the existing `.rm-machine .browser-page` scope. Palette lifted from the surrounding `.card` / `.browser-addr` / `.dlbtn` rules (#2a2a26 ink, #4a2018 accent, #b8b19c border, #fff input bg, #e2ded2 inset shadow, var(--mono) for text).

### 5. CSP relaxation

`next.config.mjs` `connect-src` was `'self'`; now `'self' https://api.emailjs.com`. The comment block above the directive was updated to explain the exception. All other directives unchanged. A server-side proxy through `/api/contact` was rejected as overkill (more code, no functional upside, hides errors behind an extra hop).

### 6. `IDENTITY` flow

`IDENTITY.email` is computed at engine init from `contact.contactInfo.find(c => /email/i.test(c.title)).value`. With `contact.json` updated, every downstream consumer (`ALLOWED_LINKS.email = 'mailto:' + IDENTITY.email`, the Terminal `contact` command output, the in-sim Hire page footer) automatically follows — no engine edits needed.

## What was modified this cycle

- `package.json` + `pnpm-lock.yaml` — `+@emailjs/browser@^4.4.1`.
- `portfolio_data/content/contact.json` — `contactInfo[0]` email + link + `form.emailJs.fallbackEmail` all moved to `fedxdofficial@gmail.com`. The real EmailJS service/public/template IDs now live here.
- `components/machine/box-computer-engine.ts`:
  - New `import emailjs from '@emailjs/browser';` at the top.
  - `<form class="contact-form">…</form>` injected into `PAGES.contact.html` after the contact-info cards.
  - New `wireContactForm(body, statusEl)` function (replaces the role of `Contact.jsx`'s `onSubmit` from the old portfolio).
  - One-line wiring in `openApp()` else branch: `if (id === 'contact') wireContactForm(body, statusEl);`.
- `components/machine/box-computer.css` — new `.contact-form` block inside `.browser-page`.
- `next.config.mjs` — `connect-src` allowlist expanded to include `https://api.emailjs.com`.
- `docs/flows/012-contact-form-emailjs.md` (this file) + `decisions.md` entry.