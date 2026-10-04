# TeachBack Features

## 🎤 Voice-First Learning

### Description
TeachBack is designed from the ground up for voice interaction. Students explain topics by speaking naturally, as if teaching a real person. The platform captures audio, converts it to text in real-time, and displays the live transcript.

### Why It Matters
Voice forces you to organize your thoughts linearly. Unlike writing, where you can edit and rearrange, speaking requires you to construct your explanation in real-time. This process reveals gaps in understanding that writing might hide.

### How It Works
1. User starts a teaching session and selects a topic
2. Browser captures audio via MediaRecorder API
3. Audio chunks stream via WebSocket to backend (250ms intervals)
4. Backend processes audio through speech-to-text (Deepgram)
5. Live transcript displays on screen as user speaks
6. Transcript batches are periodically sent to AI for analysis

### Implementation Highlights
```javascript
// Audio streaming with 250ms chunks
const startAudioStream = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
  
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      websocket.send(event.data); // Binary audio data
    }
  };
  
  mediaRecorder.start(250); // 250ms chunks
};
```

---

## 🧠 AI as Curious Student

### Description
The AI doesn't lecture—it learns. It plays the role of a curious, engaged student who actively tries to understand your explanation. When something is unclear, it asks for clarification. When a concept needs more detail, it requests examples.

### Why It Matters
This role reversal is the core of the "protégé effect." When you must explain to someone who genuinely wants to understand, you're forced to think more deeply than if you were just reciting facts.

### How It Works
1. Transcript batches are analyzed by AI every 10 seconds
2. AI evaluates clarity, detects confusion, identifies missing context
3. AI generates questions or acknowledgments based on analysis
4. Questions are spoken back to user via text-to-speech
5. User responds, continuing the dialogue

### Question Types Generated
- **Clarification**: "What do you mean by...?"
- **Elaboration**: "Can you give an example of...?"
- **Connection**: "How does this relate to...?"
- **Challenge**: "What if...?"

---

## 💬 Real-Time WebSocket Communication

### Description
All interaction happens through persistent WebSocket connections. Audio streams, AI responses, TTS audio, and status updates flow in real-time without page refreshes or polling.

### Why It Matters
Real-time interaction creates a natural conversation flow. Delays would break the teaching rhythm and make the experience feel artificial.

### How It Works
```
Browser ←→ Nginx ←→ Django Channels ←→ Redis (Channel Layer)
              ↓
      Backend Handlers (STT, AI, TTS)
```

### Event Types
| Event | Direction | Description |
|-------|-----------|-------------|
| `audio_data` | Client → Server | Raw audio bytes |
| `stt_result` | Server → Client | Speech-to-text transcript |
| `ai_response` | Server → Client | AI question/acknowledgment |
| `tts_audio` | Server → Client | Audio bytes for playback |
| `evaluation_complete` | Server → Client | Final session evaluation |

### Implementation
```python
# Django Channels WebSocket consumer
class TeachingConsumer(AsyncWebsocketConsumer):
    async def receive(self, text_data=None, bytes_data=None):
        if bytes_data:
            # Handle audio streaming
            await self.stt_handler.process_audio(bytes_data)
        else:
            # Handle JSON events
            event = json.loads(text_data)
            await self.handle_event(event)
```

---

## 📊 Multi-Dimensional Evaluation

### Description
At the end of each session, AI generates a comprehensive evaluation covering multiple dimensions of understanding. This isn't a simple pass/fail—it's a detailed analysis of your teaching performance.

### Why It Matters
Granular feedback helps learners understand exactly where they're strong and where they need improvement. Generic scores don't provide actionable insights.

### Evaluation Dimensions

| Dimension | What It Measures |
|-----------|------------------|
| **Clarity** | How clearly concepts were explained |
| **Structure** | Logical organization of the explanation |
| **Coverage** | Breadth of topic areas addressed |
| **Critical Thinking** | Depth of analysis and reasoning |
| **Responsiveness** | Quality of answers to AI questions |

### Explanation Readiness Levels
- 🟢 **Mastery** — Could teach this professionally
- 🔵 **Proficient** — Solid understanding with minor gaps
- 🟡 **Progressing** — Good foundation, needs more depth
- 🟠 **Developing** — Basic understanding, significant gaps

### Sample Evaluation Output
```json
{
  "verdict": "You demonstrated a solid grasp of photosynthesis basics...",
  "explanation_readiness": "Progressing",
  "scores": {
    "clarity": 72,
    "structure": 65,
    "coverage": 80,
    "critical_thinking": 58,
    "responsiveness": 85
  },
  "feedback_points": [
    "Strong explanation of the light-dependent reactions",
    "Consider adding more detail about the Calvin cycle",
    "Great use of examples when explaining chlorophyll"
  ]
}
```

---

## 🔊 Natural Text-to-Speech

### Description
AI responses are spoken aloud using natural-sounding text-to-speech. The AI "voice" creates a more immersive teaching experience than reading text on screen.

### Why It Matters
Voice response maintains the natural dialogue flow. You're having a conversation, not reading messages. This keeps you in "teaching mode" rather than switching to "reading mode."

### How It Works
1. AI generates response text
2. Backend sends text to TTS provider (ElevenLabs primary, Deepgram backup)
3. Audio chunks stream to browser via WebSocket
4. Browser plays audio using Web Audio API
5. Prebuffering ensures smooth playback

### Technical Details
```javascript
// Dynamic sample rate handling for different TTS providers
const scheduleAudioChunk = (pcmData) => {
  const audioBuffer = audioContext.createBuffer(
    1, // mono
    pcmData.length,
    currentSampleRate // 22050 (ElevenLabs) or 24000 (Deepgram)
  );
  
  // Fill buffer and schedule playback
  audioBuffer.getChannelData(0).set(pcmData);
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start(nextPlaybackTime);
};
```

---

## 🔒 Secure Authentication System

### Description
JWT-based authentication using httpOnly cookies. Tokens are never exposed to JavaScript, making the system immune to XSS attacks.

### Why It Matters
Security is non-negotiable. User data and learning progress must be protected.

### Security Features
- **httpOnly Cookies** — Tokens stored securely, inaccessible to JavaScript
- **CSRF Protection** — Django's built-in CSRF middleware
- **Email Verification** — Required before login
- **Auto Token Refresh** — Seamless session continuation
- **Multi-Tab Sync** — Auth state synchronized across browser tabs

### Auth Flow
```
1. User registers with email/password
2. Verification email sent with code
3. User verifies email
4. User logs in → Server sets httpOnly cookies
5. All API requests include cookies automatically
6. Access token expires → Auto-refresh from refresh token
7. Refresh token expires → User redirected to login
```

### Implementation
```python
# Custom JWT authentication using cookies
class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            return None
        
        validated_token = self.get_validated_token(access_token)
        return (self.get_user(validated_token), validated_token)
```

---

## ⏸️ Session Management & Pause/Resume

### Description
Teaching sessions can be paused and resumed. Session state persists in the database, allowing recovery from disconnections or intentional breaks.

### Why It Matters
Life interrupts. Users shouldn't lose progress because they had to step away or lost internet connection.

### Features
- Manual pause/resume via button
- Auto-pause on extended inactivity
- State persistence to PostgreSQL
- Recovery from disconnections
- Background evaluation via Celery

### State Transitions
```
IDLE → ACTIVE → PAUSED ↔ ACTIVE → EVALUATING → COMPLETED
                 ↓                    ↓
              ENDED             COMPLETED
```

---

## 📧 Branded Email Notifications

### Description
Professional email templates for all user communications—verification, password reset, evaluation complete notifications.

### Why It Matters
Email is often the first touchpoint with your product. Professional, branded emails build trust and recognition.

### Email Types
- **Email Verification** — Sent on registration with verification code
- **Evaluation Complete** — Sent after session evaluation with score summary
- **Password Reset** — Secure password reset flow (planned)

### Brand Styling
All emails follow the TeachBack brand palette:
- Deep Navy: `#0B2A44` — Primary background
- Teal Blue: `#1FB5B8` — Primary accent
- Soft Cyan: `#7EDAD8` — Highlights
