# 009 — Rename `RM-1000` → `fedxd.net` and the `RM-` prefix → `FX-` across the CRT sim

## Entry point

User request, in two follow-ups:

1. "instead of it saying rm-1000 make it say fedxd.net" — the in-sim machine name.
2. "and where it just says RM make it say FX" — the in-sim `RM-` product prefix (panel button, drive model, OS name, video driver).

The first was the strongest remaining identity leak after the prior brand-scrub (flow 007) and the friends removal (flow 008). The second was a lighter leak in the same vein — the `R` of `RM-` was the old project initials. Both are folded into one change because they are the same rename, just two layers of it.

## What was changed

Two sed passes across two files. Logic in either file is untouched.

**Pass 1 — case-insensitive `rm-1000` → `fedxd.net`** (3 files, 9 occurrences):

| File | Occurrences (pre) | What they were |
|---|---:|---|
| `components/machine/box-computer-engine.ts` | 7 | BIOS banner, `uname` header, login line, shell prompt, neofetch `Host:` + user@host lines, startx echo, window-manager title for `id === 'term'`, windowed-terminal `createTerm` prompt |
| `components/machine/box-computer-markup.ts` | 1 | `<div class="nameplate">` badge (top-right of the monitor bezel) |
| `components/machine/box-computer.css` | 1 | `.rm-machine .desktop::after { content: "RM-1000"; }` — the large etched-glass wordmark parked bottom-right of the desktop |

**Pass 2 — case-sensitive `RM-` → `FX-` and `:: RM` → `:: FX`** (2 files, 6 occurrences):

| File | Occurrences (pre) | What they were |
|---|---:|---|
| `components/machine/box-computer-engine.ts` | 5 | BIOS `Primary Master: RM-QUANTUM LPS40S 40MB`; kernel `ide0: RM-QUANTUM LPS40S, 40MB`; `Welcome to RM-Linux 5.4.0-rm`; `RM-VGA(0): initialized` X11 driver line; neofetch `OS: RM-Linux 5.4.0-rm` |
| `components/machine/box-computer-markup.ts` | 1 | `<div class="menubtn" id="menubtn">:: RM</div>` — the two-character panel button bottom-left of the bezel |

## What was deliberately NOT changed

- `RM386SX-40` (CPU model in the BIOS and kernel `dmesg`) — a fake Cyrix-derived 386SX name, not a brand.
- `5.4.0-rm` (kernel version suffix) — like `-amd64` or `-arm64`, not a brand.
- `.rm-machine`, `.rm-1000`-named CSS classes — those are hook names, not user-visible strings. Renaming them touches every selector in the stylesheet and ships nothing to the user.
- The BIOS copyright line `(C) FEDXD SYSTEMS 2024-2026` — already on the new identity from flow 007; no overlap with either rename.
- `REUSABLE PIXELATED TEXT-MODE TERMINAL FACTORY` comment in the engine — talks about a "text-mode terminal" (CRT term), not the brand.

## Function call order (unchanged)

The renamed literals are constants in the boot/login/neofetch/window-title code paths. The full call graph is:

1. `initBoxComputer(root)` (export from engine) — `powerOn()` → `biosPhase()` → `kernelPhase()` → `loginPhase()` → main shell.
2. Each phase calls `main.addLine(...)` against the singleton `main = createTerm(canvas, screenEl, ...)`.
3. `neofetch` is a shell command dispatched through `runShellCommand`, which adds its own lines.
4. The window manager's title bar and the `createTerm` prompt for a windowed Terminal both read the same `IDENTITY.handle + '@fedxd.net:~$ '` pattern.

After this change, every boot/shell line that previously mentioned the machine now reads `fedxd.net` (host) and the in-sim hardware products now read `FX-QUANTUM` / `FX-Linux` / `FX-VGA`. The shell prompt at idle is now `kazim@fedxd.net:~$ `, which is the standard Linux shape.

## What was specifically modified in this change cycle

**Pass 1 (`rm-1000` → `fedxd.net`):**
- `components/machine/box-computer-engine.ts:476` — `'RM-1000 BIOS v4.51PG (C) FEDXD SYSTEMS 2024-2026'` → `'fedxd.net BIOS v4.51PG (C) FEDXD SYSTEMS 2024-2026'`
- `components/machine/box-computer-engine.ts:538` — `'rm-1000 login: ' + IDENTITY.handle` → `'fedxd.net login: ' + IDENTITY.handle`
- `components/machine/box-computer-engine.ts:548` — `IDENTITY.handle + '@rm-1000:~$ '` → `IDENTITY.handle + '@fedxd.net:~$ '`
- `components/machine/box-computer-engine.ts:555` — startx echo prompt
- `components/machine/box-computer-engine.ts:762` — `Linux rm-1000 5.4.0-rm #1 SMP RM386SX-40 GNU/Linux` → `Linux fedxd.net 5.4.0-rm #1 SMP RM386SX-40 GNU/Linux`
- `components/machine/box-computer-engine.ts:772` — neofetch user@host line
- `components/machine/box-computer-engine.ts:775` — neofetch `Host: fedxd.net`
- `components/machine/box-computer-engine.ts:1756` — window-manager title for the Terminal app
- `components/machine/box-computer-engine.ts:1788` — `createTerm` prompt for the windowed Terminal
- `components/machine/box-computer-markup.ts:8` — nameplate `<div class="nameplate">` text
- `components/machine/box-computer.css:185` — desktop `::after` wordmark `content`

**Pass 2 (`RM-` → `FX-`, `:: RM` → `:: FX`):**
- `components/machine/box-computer-engine.ts:502` — BIOS `RM-QUANTUM` → `FX-QUANTUM`
- `components/machine/box-computer-engine.ts:519` — kernel `ide0: RM-QUANTUM` → `ide0: FX-QUANTUM`
- `components/machine/box-computer-engine.ts:524` — `Welcome to RM-Linux 5.4.0-rm` → `Welcome to FX-Linux 5.4.0-rm`
- `components/machine/box-computer-engine.ts:559` — `RM-VGA(0): initialized` → `FX-VGA(0): initialized`
- `components/machine/box-computer-engine.ts:774` — neofetch `OS: RM-Linux 5.4.0-rm` → `OS: FX-Linux 5.4.0-rm`
- `components/machine/box-computer-markup.ts:90` — `:: RM` → `:: FX`
- `decisions.md` — new top entry
- `docs/flows/009-rename-rm-1000-to-fedxd-net.md` — this file (expanded post-`FX` followup)

## Verification

A grep over the engine, markup, and CSS for `rm-1000` (case-insensitive) and for `RM-` (case-sensitive) returns no matches. The visible chrome now reads `fedxd.net` for the host and `FX-*` for the in-sim product names everywhere the user asked.
