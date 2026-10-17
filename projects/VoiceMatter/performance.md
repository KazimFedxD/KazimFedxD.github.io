# VoiceMatter Performance Metrics

> Every metric is tagged: `[measured]` = real, `[estimated]` = reasoned,
> `[unmeasured]` = unknown, `[planned]` = target.

---

## Audio Capture Performance

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Callback latency (per audio block) | < 10 ms | < 1 ms [estimated] | ✅ |
| Level-emitter tick rate | 20 Hz | 20 Hz [measured] | ✅ |
| Audio buffer at 44.1 kHz mono | 30 s ≈ 2.5 MB float32 | matches [estimated] | ✅ |
| RMS computation cost per block | < 1 ms | < 0.1 ms [estimated] | ✅ |

The callback is `numpy.sqrt(numpy.mean(indata ** 2))` — a vectorised
RMS over the entire input block. Cost is negligible compared to the
PortAudio callback overhead itself.

---

## Transcription Performance

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Deepgram `nova-3` API latency (10s clip) | < 2 s | ~1.2 s [estimated] | ✅ |
| Deepgram `nova-3` API latency (60s clip) | < 5 s | ~3 s [estimated] | ✅ |
| WAV encoding (60s audio) | < 200 ms | ~50 ms [estimated] | ✅ |
| smart_format overhead | < 200 ms | server-side [unmeasured] | ⚠️ |

The transcriber blocks the processing pipeline for the duration of the
HTTP call. No streaming variant is used — the daemon records the full
clip before sending.

---

## LLM Formatting Performance

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| LLM round-trip (≤ 500 word transcript) | < 4 s | ~2.5 s [estimated] | ✅ |
| LLM round-trip (≥ 1000 word transcript) | < 10 s | ~6 s [estimated] | ✅ |
| max_tokens | 10 000 | 10 000 [measured] | ✅ |
| Token budget per minute of dictation | ≤ 2 000 tokens | ~1 500 tokens [estimated] | ✅ |

The formatter is the longest stage in the pipeline. Anthropic-class
models with extended thinking enabled can take 5–10 s for long
transcripts. Streaming the LLM response is a future enhancement.

---

## Clipboard + Auto-Paste Performance

| Step | Target | Actual | Status |
|------|--------|--------|--------|
| `wl-copy` write (10 KB) | < 50 ms | ~20 ms [estimated] | ✅ |
| `ydotool` synthetic `Ctrl+V` | < 200 ms | ~80 ms [estimated] | ✅ |
| Total post-formatting latency | < 300 ms | ~100 ms [estimated] | ✅ |

---

## Overlay Rendering Performance

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Overlay redraw rate | 60 Hz | 60 Hz [estimated] | ✅ |
| Pill resize on state change | < 16 ms | < 8 ms [estimated] | ✅ |
| Audio-bar repaint cost | < 4 ms per frame | < 1 ms [estimated] | ✅ |
| Spinner-ring repaint (processing state) | < 4 ms per frame | < 1 ms [estimated] | ✅ |

The overlay uses custom `QPainter` rendering — no CSS engine, no
QWebEngineView. Animation cost is dominated by Qt's paint pipeline,
not by VoiceMatter code.

---

## End-to-End Pipeline Latency

| Step | Typical | Notes |
|------|---------|-------|
| User presses hotkey | 0 ms | KDE shortcut dispatch |
| `voicematter trigger` → socket → daemon | < 5 ms | Local IPC |
| Daemon transitions IDLE → RECORDING | < 5 ms | State machine |
| User speaks (variable) | — | — |
| User presses hotkey again | 0 ms | — |
| recorder.stop_recording + WAV encode | ~50 ms | numpy + soundfile |
| Deepgram STT | ~1–3 s | Network-bound |
| LLM format | ~2–6 s | Network + compute |
| wl-copy + ydotool paste | ~100 ms | — |
| **Total post-speech latency** | **~3–9 s** | `[estimated]` |

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| End-to-end latency (short clip) | < 10 s | ~3 s [estimated] | ✅ |
| End-to-end latency (long clip) | < 15 s | ~9 s [estimated] | ✅ |

---

## Memory Usage

| Component | Idle | Recording | Processing |
|-----------|------|-----------|------------|
| Python interpreter | ~40 MB | ~45 MB | ~50 MB |
| PySide6 overlay | ~60 MB | ~60 MB | ~60 MB |
| NumPy audio buffers | < 5 MB | ~5 MB per minute | < 5 MB |
| **Total** | **~110 MB** | **~115 MB** | **~120 MB** |

All values `[estimated]`. The recorder explicitly clears `self.chunks`
after each recording to bound memory.

---

## Scalability Considerations

VoiceMatter is single-user desktop software. There is no concurrent-user
scaling story.

| Resource | Capacity |
|----------|----------|
| Concurrent Unix-socket clients | ~16 (kernel limit) |
| Concurrent subscribers (overlay) | 1 expected; daemon prunes dead ones |
| Recordings per day | unlimited (memory bounded per recording) |
| Longest single recording | unbounded (tested mentally up to 30 min) |

---

## Caching Strategy

| Cache | TTL | Purpose |
|-------|-----|---------|
| `last_transcription` | until next `trigger` | Overlay's success button re-copies |
| `dict.json` | until next `dict set` | Prompt variables |
| Deepgram responses | none | Each request is unique |
| LLM responses | none | Each transcript is unique |

---

## Monitoring Recommendations

VoiceMatter ships no built-in metrics. Recommended signals for a
`journalctl --user -u vocematter -f` session:

| Metric | Source | What to watch |
|--------|--------|---------------|
| `[DEBUG]` log volume | `daemon.py` | Should be 0–3 lines per recording |
| `Processing failed:` | `daemon.py:334` | Should be 0 |
| `Recording failed to start:` | `daemon.py:191` | Should be 0 |
| `Error during STT transcription` | `transcriber.py:31` | Should be 0 |
| Socket death (`OSError` on emit) | `daemon.py:71` | Occasional is fine; bursts mean clients crashing |

### Alerting Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| Recording failures per hour | > 5 | > 20 |
| Processing failures per hour | > 5 | > 20 |
| `ydotool` failures per day | > 3 | > 20 |

---

## Known Bottlenecks

### Bottleneck: LLM round-trip is the dominant cost

- **Issue**: LLM formatting takes 2–6 s per recording — longer than any
  other stage.
- **Threshold**: Long transcripts (> 1000 words) push toward the 10 s
  end of the budget.
- **Mitigation**: Future work — stream the LLM response and copy to
  clipboard in chunks so the user sees text appear incrementally.

### Bottleneck: No streaming STT

- **Issue**: The daemon records the *entire* clip before sending to
  Deepgram, so STT latency is "wait + send" rather than "send + wait".
- **Threshold**: Clips > 60 s add noticeable delay.
- **Mitigation**: Future work — Deepgram's live (streaming) endpoint
  could cut perceived latency in half for long clips.