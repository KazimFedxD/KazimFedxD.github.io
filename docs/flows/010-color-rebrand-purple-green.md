# 010 — Color Rebrand: Cream + Red → Purple + Green

## Entry Points (in render order)
1. **`app/layout.tsx`** — top-level `RootLayout` injects `globals.css` and sets the `<meta name="theme-color" content={THEME_COLOR}>` used by mobile browser chrome.
2. **`app/globals.css`** — defines the Tailwind v4 design-token CSS vars (`--primary`, `--ring`, `--chart-*`, `--sidebar-*`) that the entire site reads.
3. **`components/machine/box-computer.css`** — the CRT shell + desktop window manager styles. Defines `--shell*`, `--phosphor`, `--red`, `--wm-*` vars that the boot/login/main terminal and the post-`startx` desktop read.
4. **`components/machine/box-computer.tsx`** → mounts `box-computer.css`, renders the static markup via `box-computer-markup.ts`.
5. **`components/machine/box-computer-engine.ts`** — the IIFE that paints to the canvas (`#crtCanvas`) and runs BIOS → kernel → login → shell → `startx` → desktop. Reads its own PRIMARY/DIM/RED/WHITE/AMBER color constants.
6. **Framework pages** — `app/page.tsx`, `app/projects/page.tsx`, `app/about/`, etc. consume Tailwind tokens via `text-primary`, `bg-primary`, `border-primary`, `text-primary/80`, etc. Auto-themed when `--primary` flips.
7. **Framework error/edge pages** — `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx`, `app/admin/page.tsx`, `app/loading.tsx`. Hard-coded color literals here had to be flipped manually.
8. **`components/layout/scroll-to-top.tsx`** — the floating bottom-right button. One hard-coded red glow shadow had to be flipped.

## Call Order (User-Visible Color Path)
```
layout.tsx (sets theme-color meta → THEME_COLOR constant)
    └─ globals.css (:root vars → consumed via Tailwind utilities like text-primary)
        └─ app/page.tsx, projects/, about/, etc. (use Tailwind tokens → auto-themed)
        └─ app/error.tsx, not-found.tsx, global-error.tsx, admin/page.tsx (had hard-coded red/orange → manually flipped to green/emerald)
        └─ components/layout/scroll-to-top.tsx (hard-coded red glow → flipped to purple glow)

box-computer.tsx
    └─ box-computer.css (:root .rm-machine vars → --shell*, --phosphor, --red, --wm-*)
        └─ boot/login/main canvas rendering (driven by PRIMARY/DIM/RED in box-computer-engine.ts)
        └─ desktop, panel, taskbar, rootmenu, all windowed apps, all games (minesweeper, snake, tictactoe, 2048, pong, memory, simon), file manager, browser-in-window, mobile media query (all read CSS vars or rgba() literals from box-computer.css)

box-computer-engine.ts (color constants used by addLine() for BIOS/login/main shell + canvas fills for snake, pong, tictactoe, minesweeper numbers)
```

## What Changed in This Cycle

### `app/globals.css`
- `--primary`: `oklch(0.55 0.22 20)` → `oklch(0.55 0.13 295)` — red → purple.
- `--ring`, `--chart-1`, `--sidebar-primary`, `--sidebar-ring`: same hue flip.
- `--accent`: `oklch(0.35 0.12 20)` → `oklch(0.38 0.09 295)`.
- Added new token `--phosphor: oklch(0.85 0.18 152)` for explicit green use.
- `--destructive` flipped from red-orange (`oklch(0.577 0.245 27.325)`) to green (`oklch(0.85 0.18 152)`) per user decision.
- Secondary/muted text colors flipped to purple-tinted darks (`hue 295` at low chroma).
- Foreground text (`oklch(0.93 0.005 90)` — warm cream) → `oklch(0.85 0.02 152)` (green-tinted near-white) so text on dark stays readable and on-theme.
- Light theme (`:root.light`) — same hue shifts applied with adjusted lightness for contrast on light backgrounds.
- `.glow-red` utility class renamed to `.glow-primary` (no callers; cosmetic clarity since the color is no longer red).

### `components/machine/box-computer.css`
- `.rm-machine` `:root` vars — cream/beige `#a89873` shell family → purple `#7a6aa8` family (5 stops in the casing gradient). Screen-bg `#030502` → `#080510` (purple-tinted dark). Phosphor + `--red` + `--led-on` `#ff5347` → `#3cf28a` (phosphor green). Window-manager bg/panel/border → purple-tinted dark.
- `.monitor::before` warm cream tint `rgba(120,105,60,.08)` → `rgba(140,110,210,.10)` — cool purple reflective tint.
- `.screen::after` purple/red atmospheric shadow `rgba(255,83,71,.06)` → `rgba(180,120,255,.06)` — the screen vignette now glows purple.
- `.desktop` weave: warm `#2f1f1a` base → `#1f1828` (purple-tinted dark) + phosphor-green diagonal lines instead of red.
- `.desktop::after` "fedxd.net" etched wordmark — red → green (color + text-stroke).
- `.dicon .glyph` border, hover, focus, active states — red → green (all `rgba(255,83,71,*)` literals).
- `.dicon .glyph::after` drop-shadow filter — red glow → green glow.
- `.win-title` linear-gradient — warm red-brown `#3a1613 → #21100e` → cool purple-brown `#1f1830 → #120e1c`.
- `.filemgr-item:hover` — red border/bg → green border/bg.
- `.panel`, `.menubtn`, `.taskbtn.active`, `.rootmenu button:hover` — dark cream backgrounds → purple-tinted dark backgrounds.
- `#memStatus` literal `#ff5347` → `#3cf28a`. `.mem-card.up` and `.mem-card.matched` paired colors flipped to green-tinted equivalents.
- `.pwr:focus-visible` outline now reads from `--phosphor` (green) instead of `--red`.
- Mobile media query (≤700px): `.mobile-statusbar`, `.dicon .glyph`, `.panel`, `.menubtn`, `.menubtn::before` — all red literals → green. Background tints shifted to purple-tinted dark.

### `components/machine/box-computer-engine.ts`
- L291 color constants: `PRIMARY = '#ff5347'` → `'#3cf28a'` (green), `DIM = '#5c231d'` → `'#1f7a4a'` (dim phosphor green), `RED = '#ff5347'` → `'#3cf28a'` (used for "command not found" / error lines — keeps green to match the new theme).
- L341 CRT canvas clear-fill `#030502` → `#080510` (matches new screen-bg).
- L1050 `NUMCOLOR` array index 3 (`#ff5347` — the minesweeper "3" digit color) → `#3cf28a`.
- L1189 snake food fill `#ff5347` → `#3cf28a`.
- L1192 snake body segments: head `#f5e3e0` (kept — bright), body `#a8968f` (warm beige) → `#8e85a8` (cool purple-tinted neutral).
- L1290 tic-tac-toe O color `#ff5347` → `#3cf28a`.
- L1483 pong CPU paddle `#ff5347` → `#3cf28a`.

### `config/constants.ts`
- L24 `THEME_COLOR`: `#ff5347` → `#7a6aa8` — mobile browser chrome address-bar tint flips to purple.

### `app/error.tsx`
- `Glitch` default prop `text-orange-400` → `text-emerald-400`.
- `text-orange-400` Error line → `text-emerald-400`.
- `text-red-400 font-semibold` FATAL + HTTP 500 lines → `text-emerald-400 font-semibold`.
- `// 500 · internal server error` label + `<Glitch text="500" color="text-orange-400" />` → emerald.
- Blinking cursor block `bg-orange-400` → `bg-emerald-400`.
- Retry button border/bg/hover/text `orange-500/orange-400` family → `emerald-500/emerald-400`.
- Radial gradient backdrop `oklch(0.7 0.18 55 / 0.07)` (warm amber) → `oklch(0.65 0.16 295 / 0.08)` (purple).

### `app/global-error.tsx`
- `#f87171` (critical + HTTP 500 lines + cursor block) → `#3cf28a`.
- `#fb923c` (// 500 label, Error line, retry button text) → `#3cf28a`.
- Retry button `rgba(251,146,60,*)` border + bg → `rgba(60,242,138,*)`.
- Page bg `oklch(0.08 0.005 0)` → `oklch(0.08 0.01 295)` (purple-tinted dark).
- Page text color `oklch(0.93 0.005 90)` → `oklch(0.88 0.02 152)` (green-tinted light).
- Glow radial `oklch(0.7 0.18 55 / 0.06)` (warm amber) → `oklch(0.65 0.16 295 / 0.08)` (purple).

### `app/not-found.tsx`
- ScanLine `oklch(0.93 0.005 90)` (cream) → `oklch(0.85 0.18 152)` (green).
- Glitch RGB-split `text-red-400/70` → `text-emerald-400/70`.
- HTTP 404 + traceroute error lines `text-red-400` → `text-emerald-400`.
- Glow radial already used `var(--primary)` — auto-themed.

### `app/admin/page.tsx`
- Three "Access denied" lines `text-red-400` → `text-emerald-400`.

### `components/layout/scroll-to-top.tsx`
- Hover glow shadow `oklch(0.58_0.2_15/0.25)` (hue 15 = red) → `oklch(0.55_0.13_295/0.3)` (purple).

## Deliberately NOT Modified

- `.rm-machine .simon-btn.r` (`#c23b34`) — Simon Says has four gameplay buttons (red/green/yellow/blue); turning red→green would clash with the existing green button.
- `.rm-machine .win-browser` chrome and content (`.browser-page h1 #7a1210`, `.tag #7a1210`, `.bbtn #d8d4c8`, etc.) — the file's own comment at L320–323 says the content area is deliberately styled as a mid-90s Netscape-era page, so the browser-in-window retains its sepia/warm look inside the new green+purple terminal.
- `app/loading.tsx` — already uses `bg-primary` (auto-themed to purple).
- `lib/`, `data/`, `public/` — no UI color literals.
- Game rules (snake/pong/minesweeper/etc. logic) — only the canvas colors changed, no gameplay behavior.

## Verification Performed

- `pnpm tsc --noEmit` — 0 errors (after clearing a stale `.next/types/validator.ts` reference to the deleted `app/api/friends/route.ts` from the prior commit).
- `grep -rnE "ff5347|#fb923c|#f87171|255, *83, *71|text-red-400|text-orange-400|orange-500|border-orange-|oklch\(0\.7 0\.18 55|glow-red"` across `app/` and `components/` — 0 matches outside the deliberate exceptions above (Simon red, browser chrome comments, browser page sepia styling).
- Visual verification deferred to `pnpm dev` review by user.