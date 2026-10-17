# 016 — Auto-launch desktop after login (no manual `startx`)

## Entry point
The boot chain inside `components/machine/box-computer-engine.ts`. The
`BoxComputer` React component renders the engine, which orchestrates the
BIOS → kernel → login → startx → desktop sequence.

## Call order (changed path)
1. `powerOn()` → `biosPhase(session)` (`box-computer-engine.ts:616`)
2. `biosPhase()` finishes memory + drive detect, calls `kernelPhase(s)`
3. `kernelPhase()` prints kernel banner lines, then `loginPhase(s)`
   (`box-computer-engine.ts:534`)
4. `loginPhase()` (modified) prints login banner, then prints
   `Loading desktop environment...`, waits 3 s, and calls
   `startxPhase(session)` directly — **no shell prompt, no manual
   `startx` keystroke**.
5. `startxPhase()` runs its X-server boot animation and toggles
   `mode = 'desktop'` + `desktop.classList.add('show')`.

## What changed
- `components/machine/box-computer-engine.ts` — `loginPhase()` no longer
  prints `type 'startx' to launch the desktop…`, no longer sets
  `mode = 'shell'`, no longer shows the `$` prompt or calls
  `focusCatcher()`. Instead it appends `Loading desktop environment...`,
  awaits 3 000 ms, and invokes `startxPhase(session)` to drive the desktop
  reveal.
- The manual `startx` command path (`runShellCommand` → `startxPhase`)
  still exists and still works if anyone opens the in-desktop Terminal app
  and types it — only the auto-prompt at login was removed.

## Why
User-facing: the initial reveal should feel automatic. Making the visitor
type `startx` was a quirk, not a feature. The 3 s beat is a deliberate
pause so the boot text is readable, not an instant cut.

## Rejected
- *Skip the pause entirely.* The boot text would vanish before the eye
  could read it; the chime + flicker would feel abrupt.
- *Make the pause user-configurable.* Settings UI for a 3-second timer is
  YAGNI; change the constant if it ever matters.
- *Keep the shell prompt at login as a power-user escape hatch.* A user
  who wants the shell can open the Terminal app from the desktop. Two
  entry points to the same shell is just dead UI.
- *Use a separate loading component (spinner, progress bar).* The rest
  of the boot is plain terminal text — adding a visual widget breaks the
  aesthetic and adds a CSS/JS surface for a single 3-second moment.