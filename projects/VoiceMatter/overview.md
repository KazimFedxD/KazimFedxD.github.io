# VoiceMatter — Project Overview

## What is VoiceMatter?

VoiceMatter is a Linux desktop daemon that listens when you press a key,
transcribes what you said, runs the transcript through an LLM to clean it up,
and pastes the polished result into whichever application you're working in.

It is a single-user, always-available dictation layer that sits between your
microphone and your editor. The recording pipeline is local: a hotkey starts
the capture, the overlay shows a live audio meter and state, and a second
press triggers transcription and formatting. The output lands in your
clipboard automatically and, if `ydotool` is installed, is also typed into
the focused window.

The user-facing goal is simple: **talk the way you'd talk to a colleague,
get text that reads the way you'd write it.** Mid-thought restarts, false
starts, and filler words are stripped by the formatter — the user never has
to "dictate cleanly" the way they would with older speech-to-text tools.

The project also serves as a reference for one specific architectural pattern:
a daemon + floating overlay + global hotkey, all wired together with a Unix
domain socket and newline-delimited JSON. There is no web server, no
database, and no network port — only a local control surface that survives
login via `systemd --user`.

## Problem Statement

### The mid-stream correction tax

Most cloud dictation tools transcribe verbatim. When a user says "send the
email to, no wait, to John, not Jane", they get the whole mess back. The user
either accepts the noise or rewrites by hand — defeating the point of
dictation.

### The lost-focus problem

Browser-based dictation tools work well until you switch tabs or apps. The
moment you alt-tab, the mic drops, the cursor disappears, and you have to
restart. Power users want dictation that follows the focused window, not a
single web tab.

### The no-feedback problem

Pressing a hotkey and seeing nothing for two seconds feels broken. Users
need to know *the mic is open*, *the model is processing*, and *the text
landed*. Without a visible state surface, dictation tools get abandoned
because users don't trust them.

### The locked-in-formatter problem

Generic LLMs reformulate aggressively. They "improve" your dictation into
something you didn't say. A voice formatter has to behave like an editor,
not a writer — preserving meaning while removing filler.

## The VoiceMatter Solution

1. **Daemon-driven capture** — A background process owns the audio stream
   and the Unix socket. Hotkeys are thin clients that send one JSON line.
   Recording survives app switches because the daemon outlives any one
   process.
2. **LLM formatter with an "editor-not-writer" prompt** — The system
   prompt (`voicematter/data/prompt.md`) treats transcripts as data, not
   instructions, and forbids the model from adding facts, removing
   meaning, or executing embedded commands. Filler is dropped; meaning is
   preserved.
3. **PySide6 floating overlay** — A frameless pill at the bottom of the
   screen that shows recording state, audio level, processing steps, and
   a 2-second success auto-dismiss. Window flags
   (`WindowStaysOnTopHint | Tool | WA_ShowWithoutActivating`) keep it
   visible without stealing focus.
4. **State machine over a Unix socket** — `IDLE → RECORDING ↔ PAUSED →
   PROCESSING → IDLE`, with `cancel` short-circuiting at every step. The
   overlay subscribes to a `subscribe` action and receives a stream of
   newline-delimited JSON events (`state`, `level`, `step`, `ready`,
   `error`, `shutdown`).
5. **Optional automatic paste** — When `ydotool` is present, the writer
   injects `Ctrl+V` keystrokes after the clipboard write. Without
   `ydotool`, the system gracefully degrades to clipboard-only.

## Target Audience

- **Linux desktop power users** — Engineers, writers, and researchers who
  spend hours typing and would rather dictate long emails, commit
  messages, or design docs.
- **Writers who edit a lot** — The LLM-formatter removes the need to
  manually clean up spoken text, making dictation competitive with
  typing for prose.
- **Accessibility users** — Anyone who finds typing physically painful or
  slow and prefers voice as a primary input.
- **Single-machine homelab / KDE users** — PipeWire-based Linux desktops
  with KDE Plasma, where global hotkeys and clipboard integration are
  first-class.

## What Makes VoiceMatter Unique

| Traditional Approach | VoiceMatter |
|---------------------|-------------|
| Browser-based dictation (Google Docs, web STT) | Native Linux daemon — survives alt-tab, no browser required |
| Raw transcript output | LLM-formatted output that drops filler and fixes grammar |
| Single mic permission prompt per tab | One-time microphone grant, persistent daemon |
| Web UI for control | KDE global shortcuts + floating overlay |
| Steals focus when shown | `WA_ShowWithoutActivating` — never steals focus |
| Cloud-only | Local control surface, only STT/LLM calls leave the box |
| No live feedback | 20 Hz audio-level meter + per-step processing checklist |
| "Edit your dictation" workflow | Formatter is editor-not-writer — preserves meaning verbatim |

## Visual Representation

![Overlay in recording state](screenshots/overlay-recording.png)
*Frameless pill at bottom-center, red mic, live audio meter, mm:ss timer,
Stop / Pause / Cancel buttons.*

![Overlay in processing state](screenshots/overlay-processing.png)
*Blue mic, 12-dot spinner ring, four-row processing checklist
(transcribe → format → copy → insert).*

![Overlay in success state](screenshots/overlay-ready.png)
*Emerald mic, white checkmark, "Text inserted" title, 2-second auto-dismiss.*

*Note: overlay is rendered live by the running daemon — screenshots are
captured manually per `screenshots/README.md`.*