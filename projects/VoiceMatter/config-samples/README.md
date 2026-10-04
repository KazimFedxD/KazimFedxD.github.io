# Config Samples

This folder contains sanitized copies of the project's configuration
files. All secrets, API keys, passwords, and production URLs have been
replaced with placeholders.

## Files in this folder

| File | Purpose | Source |
|------|---------|--------|
| `pyproject.toml` | PEP 621 project metadata + dependency list | Project root |
| `.env.example` | Environment template (Deepgram + LLM keys) | Project root |
| `dict.json` | Variables injected into the formatter prompt | `voicematter/data/dict.json` |

## Sanitization policy

The following patterns were replaced:

- **Deepgram API keys** → `YOUR_DEEPGRAM_API_KEY_HERE`
- **LLM API keys** (`sk-*`-style or vendor-specific) →
  `YOUR_MINIMAX_API_KEY_HERE`
- **LLM base URLs** → `https://api.example.com/anthropic`
- **Personal email addresses** → `your-email@example.com`
- **Personal names** → `<your-name>`
- **Usernames** → `<your-username>`

The `.env` file at the project root is **not** copied here. It is
git-ignored and contains real secrets. Each user must create their own
`.env` from `.env.example`.

## How to use these samples

1. Copy the file you need to your local project root.
2. Replace placeholders with real values from your secret manager.
3. **Never commit** real values back to the repo.

### Example — getting started

```bash
# In the project root
cp .website/config-samples/.env.example .env
cp .website/config-samples/dict.json voicematter/data/dict.json

$EDITOR .env   # add your real DEEPGRAM_API_KEY and MINIMAX_API_KEY
$EDITOR voicematter/data/dict.json   # add your name / email / username
```

## Common issues

- **"Microphone not found"** — check that `.env` exists and is
  readable by the user running `voicematter daemon`.
- **"401 Unauthorized" from Deepgram** — verify the API key matches
  the one in the Deepgram console.
- **"Connection refused" from LLM** — verify `MINIMAX_BASE_URL`
  matches the provider's expected base URL.
- **LLM ignores your name/email** — check `dict.json` syntax with
  `python -m json.tool voicematter/data/dict.json`.

## Deployment checklist

Before deploying:

- [ ] All placeholders replaced with real values
- [ ] `.env` file added to `.gitignore` (already in this project)
- [ ] `.env` mode set to `chmod 600`
- [ ] Secrets stored in a secret manager (not in code)
- [ ] `dict.json` does not contain personal data you would not want
  sent to the LLM provider
- [ ] `DEBUG` logging is acceptable (currently always on in
  `voicematter/helper.py` — set `DEBUG = 0` to silence)