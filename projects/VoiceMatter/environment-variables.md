# VoiceMatter Environment Variables

> All sensitive values shown are placeholders. Replace before running.

VoiceMatter reads environment variables in three places:

- `voicematter/transcriber.py` — `DEEPGRAM_API_KEY`
- `voicematter/formatter.py` — `MINIMAX_API_KEY`, `MINIMAX_BASE_URL`
- Anywhere `python-dotenv`'s `load_dotenv()` is called at module top.

The `.env` file is loaded automatically from the project root when the
package is imported.

---

## External APIs

### Speech-to-Text (Deepgram)

#### DEEPGRAM_API_KEY
- **Type**: String
- **Required**: Yes
- **Default**: -
- **Purpose**: Authenticates requests to Deepgram's `nova-3` speech-to-text model
- **Example**: `YOUR_DEEPGRAM_API_KEY_HERE`
- **Security**: 🔒 Treat as a secret. Never commit to source. Restrict
  on Deepgram's dashboard by IP if possible.
- **Used In**: `voicematter/transcriber.py:12`

#### DEEPGRAM_MODEL *(implicit)*
- **Type**: String
- **Required**: No (hard-coded)
- **Default**: `nova-3`
- **Purpose**: Deepgram model identifier
- **Used In**: `voicematter/transcriber.py:19`

#### DEEPGRAM_LANGUAGE *(implicit)*
- **Type**: String
- **Required**: No (hard-coded)
- **Default**: `multi`
- **Purpose**: Deepgram language hint
- **Used In**: `voicematter/transcriber.py:20`

---

### LLM Formatter (Anthropic-compatible)

#### MINIMAX_API_KEY
- **Type**: String
- **Required**: Yes
- **Default**: -
- **Purpose**: Authenticates requests to the LLM endpoint
- **Example**: `YOUR_MINIMAX_API_KEY_HERE`
- **Security**: 🔒 Secret. Never commit to source.
- **Used In**: `voicematter/formatter.py:8`

#### MINIMAX_BASE_URL
- **Type**: URL string
- **Required**: Yes
- **Default**: -
- **Purpose**: Base URL for the Anthropic-API-compatible endpoint
- **Example**: `https://api.example.com/anthropic`
- **Security**: ⚠️ Changing this endpoint changes which provider sees
  every transcript. Verify the destination before setting.
- **Used In**: `voicematter/formatter.py:9`

#### MINIMAX_MODEL *(implicit)*
- **Type**: String
- **Required**: No (hard-coded)
- **Default**: `MiniMax-M3`
- **Purpose**: Model identifier passed to the LLM endpoint
- **Used In**: `voicematter/formatter.py:30`

---

### Optional — ydotool / system integration

These are not read from `.env`. They are external dependencies that
must be installed and running on the host system.

| Tool | Purpose | When needed |
|------|---------|-------------|
| `wl-copy` (from `wl-clipboard`) | Wayland clipboard write | Always required for copy step |
| `ydotool` | Synthetic `Ctrl+V` keystroke | Only for auto-paste |
| PipeWire | Audio server | Always |
| WirePlumber | PipeWire session manager | Always |

---

## Reference Table

| Variable | Required | Default | Section |
|----------|----------|---------|---------|
| `DEEPGRAM_API_KEY` | Yes | - | External APIs / Deepgram |
| `MINIMAX_API_KEY` | Yes | - | External APIs / LLM |
| `MINIMAX_BASE_URL` | Yes | - | External APIs / LLM |
| `DEEPGRAM_MODEL` | No | `nova-3` | External APIs / Deepgram |
| `DEEPGRAM_LANGUAGE` | No | `multi` | External APIs / Deepgram |
| `MINIMAX_MODEL` | No | `MiniMax-M3` | External APIs / LLM |

---

## Development `.env`

```env
# External APIs
DEEPGRAM_API_KEY=YOUR_DEEPGRAM_API_KEY_HERE
MINIMAX_API_KEY=YOUR_MINIMAX_API_KEY_HERE
MINIMAX_BASE_URL=https://api.example.com/anthropic
```

## Production `.env`

```env
# External APIs
DEEPGRAM_API_KEY=prod-deepgram-key-here
MINIMAX_API_KEY=prod-llm-key-here
MINIMAX_BASE_URL=https://api.example.com/anthropic
```

---

## Prompt Variables (not environment variables)

`voicematter/data/dict.json` is a separate dictionary merged into the
LLM system prompt. It is **not** read from the environment — it lives
in the package's `data/` directory.

| Key | Default | Purpose |
|-----|---------|---------|
| `email` | `your-email@example.com` | Replaced into the prompt for personalisation |
| `name` | `<your-name>` | Replaced into the prompt |
| `username` | `<your-username>` | Replaced into the prompt |

Edit via the CLI:

```bash
voicematter dict set email you@example.com
voicematter dict set name "Your Name"
voicematter dict get email
voicematter dict all
```