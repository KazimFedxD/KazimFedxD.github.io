# TeachBack Known Issues & Limitations

## Current Limitations

### Mobile Application
- ❌ **Native iOS app** — Not available yet
- ❌ **Native Android app** — Not available yet
- ⚠️ **Mobile web** — Functional but with limitations (see below)

**Timeline**: Native apps planned for future release after web platform stabilization.

---

### Voice Input Limitations

#### Browser Microphone Access
- **Affected**: All browsers
- **Issue**: Requires user permission, may be denied by default
- **Impact**: Cannot start session without microphone access
- **Workaround**: Grant microphone permission when prompted

#### iOS Safari Web Audio
- **Affected**: iOS Safari all versions
- **Issue**: Strict autoplay policies prevent automatic audio playback
- **Impact**: TTS audio may not play without user interaction
- **Workaround**: Tap screen before AI responds to enable audio

#### Background Audio
- **Affected**: Mobile browsers
- **Issue**: Audio stops when app goes to background or screen locks
- **Impact**: Session may be interrupted
- **Workaround**: Keep screen active during session

---

### Session Limitations

#### Session Duration
- **Current Limit**: Sessions timeout after 30 minutes of activity
- **Reason**: Resource management, external API limits
- **Impact**: Long explanations may need to be split
- **Future**: Configurable session length planned

#### Transcript Length
- **Current Limit**: ~50,000 characters per session
- **Reason**: AI context window limitations
- **Impact**: Very long sessions may truncate older transcript
- **Workaround**: End and start new session for extensive topics

---

### Evaluation Limitations

#### Processing Time
- **Current**: Evaluation takes 10-30 seconds after session ends
- **Reason**: AI processing of full transcript
- **Impact**: Brief wait for results
- **Workaround**: Background processing sends email when complete

#### Evaluation Accuracy
- **Note**: AI evaluation reflects the model's interpretation
- **Limitation**: May not capture nuanced domain expertise
- **Impact**: Scores are indicative, not definitive
- **Recommendation**: Use as learning feedback, not absolute assessment

---

## Known Bugs

### Issue: Safari Date Picker Styling
- **ID**: #UI-042
- **Affected**: Safari on macOS and iOS
- **Severity**: Low
- **Description**: Native date picker in session history filters appears unstyled
- **Impact**: Visual inconsistency only, functionality works
- **Workaround**: None needed, works correctly
- **Status**: Will fix in future UI polish update

---

### Issue: WebSocket Reconnection Delay
- **ID**: #WS-038
- **Affected**: Firefox on network changes
- **Severity**: Medium
- **Description**: 3-5 second delay in WebSocket reconnection when network changes
- **Impact**: Brief interruption in session
- **Workaround**: Wait for automatic reconnection or refresh page
- **Status**: Investigating improved reconnection strategy

---

### Issue: Audio Echo on Slow Connections
- **ID**: #AUDIO-055
- **Affected**: Users with high latency (>300ms)
- **Severity**: Medium
- **Description**: Occasional audio echo when TTS starts playing
- **Impact**: Audio quality degradation
- **Workaround**: Use wired connection if possible
- **Status**: Prebuffering added, monitoring for improvement

---

### Issue: Session State Sync on Multi-Tab
- **ID**: #STATE-067
- **Affected**: Users with multiple tabs open
- **Severity**: Low
- **Description**: Session state may briefly show incorrect status across tabs
- **Impact**: Confusion about session state
- **Workaround**: Use single tab for active session
- **Status**: Improved sync mechanism planned

---

## Performance Considerations

### Large Topic Datasets
- **Scenario**: Explaining topics with extensive subtopics
- **Issue**: AI question generation may slow with large context
- **Threshold**: > 10,000 words in transcript
- **Mitigation**: Transcript batching limits context window

### Concurrent Sessions
- **Current**: Single active session per user
- **Reason**: Resource allocation, state management
- **Impact**: Cannot run multiple sessions simultaneously
- **Future**: Multi-session support not currently planned

### Peak Usage
- **Scenario**: Many simultaneous users
- **Current Capacity**: ~500 concurrent sessions (single instance)
- **Mitigation**: Queue-based processing, graceful degradation
- **Monitoring**: Load testing ongoing

---

## Browser-Specific Issues

### Chrome
| Issue | Status | Workaround |
|-------|--------|------------|
| None known | ✅ | — |

### Firefox
| Issue | Status | Workaround |
|-------|--------|------------|
| WebSocket reconnection delay | 🟡 | Refresh page |
| AudioContext warning in console | ⚪ | Ignore (harmless) |

### Safari
| Issue | Status | Workaround |
|-------|--------|------------|
| Date picker styling | 🟡 | None needed |
| Autoplay restrictions | 🟡 | User interaction required |

### Edge
| Issue | Status | Workaround |
|-------|--------|------------|
| None known | ✅ | — |

---

## External Service Limitations

### Deepgram (Speech-to-Text)
- **Free Tier**: Limited minutes per month
- **Rate Limit**: 100 concurrent connections
- **Impact**: May hit limits with heavy usage
- **Solution**: Monitor usage, upgrade plan if needed

### Groq (AI)
- **Free Tier**: Rate limited requests
- **Token Limit**: 8K context window (model dependent)
- **Impact**: Response delays during high demand
- **Solution**: Upgrade plan or implement fallback

### ElevenLabs (Text-to-Speech)
- **Free Tier**: Limited characters per month
- **Impact**: TTS may fail when limit reached
- **Fallback**: Deepgram TTS as backup
- **Solution**: Monitor usage, upgrade plan if needed

---

## Workarounds Summary

| Issue | Quick Fix |
|-------|-----------|
| Microphone not working | Check browser permissions |
| Audio not playing (iOS) | Tap screen before AI responds |
| Session interrupted | Wait for auto-reconnect or refresh |
| Evaluation taking long | Check email for notification |
| Multiple tabs sync issues | Use single tab |
| External API errors | Check service status pages |

---

## Reporting New Issues

Found a bug not listed here? Please report it:

1. **Check existing issues** in GitHub Issues
2. **Include details**:
   - Browser and version
   - Operating system
   - Steps to reproduce
   - Expected vs actual behavior
   - Console errors (if any)
3. **Submit** via GitHub Issues

---

## Status Legend

| Status | Meaning |
|--------|---------|
| ✅ | No issues |
| 🟢 | Fixed |
| 🟡 | Known, workaround available |
| 🟠 | Investigating |
| 🔴 | Critical, high priority |
| ⚪ | Low priority / cosmetic |
