// TeachBack Project Data
// Extracted from projects/TeachBack/ markdown files
// 🏆 Best Use Of AI - AI Preneur '26 Winner

export const teachbackData = {
  // From metadata.json
  title: "TeachBack",
  shortDescription: "A revolutionary learning platform where students learn by teaching AI. Explain topics verbally, get interrupted with questions, and receive detailed evaluations on your understanding.",
  
  github: "https://github.com/KazimFedxD/TeachBack",
  liveDemo: "",

  // Showcase Video - YouTube demo
  showcaseVideo: {
    url: "https://www.youtube.com/watch?v=4MdjZQ5lL4E",
    title: "TeachBack Demo - Learn by Teaching AI",
    description: "Watch how TeachBack revolutionizes learning through the 'learn by teaching' paradigm. See the real-time voice interaction, AI student questions, and comprehensive evaluation system in action.",
    duration: "5:30"
  },

  badges: [
    { icon: "Trophy", text: "🏆 Best Use Of AI - AI Preneur '26" },
    { icon: "Mic", text: "Voice-First Learning" },
    { icon: "Languages", text: "Multi-Language Support" },
    { icon: "Brain", text: "Learn by Teaching" },
    { icon: "Construction", text: "🚧 In Development" }
  ],

  techStack: [
    { name: "React", version: "19", category: "Frontend" },
    { name: "Vite", version: "7", category: "Frontend" },
    { name: "Tailwind CSS", version: "4", category: "Frontend" },
    { name: "Framer Motion", version: "latest", category: "Frontend" },
    { name: "Django", version: "5.2", category: "Backend" },
    { name: "Django REST Framework", version: "latest", category: "Backend" },
    { name: "Django Channels", version: "latest", category: "Backend" },
    { name: "PostgreSQL", version: "16", category: "Database" },
    { name: "Redis", version: "7", category: "Cache" },
    { name: "Celery", version: "latest", category: "Task Queue" },
    { name: "WebSockets", version: "latest", category: "Real-Time" },
    { name: "Docker", version: "latest", category: "DevOps" },
    { name: "Nginx", version: "latest", category: "Proxy" },
    { name: "Deepgram", version: "API", category: "External Service" },
    { name: "OpenAI", version: "API", category: "External Service" },
    { name: "ElevenLabs", version: "API", category: "External Service" }
  ],

  // Award Information - HIGHLIGHT
  awards: [
    {
      title: "Best Use Of AI",
      event: "AI Preneur '26",
      year: "2026",
      description: "Recognized for innovative use of AI in education through the 'learn by teaching' paradigm where AI acts as a curious student."
    }
  ],

  // From overview.md
  overview: {
    description: "TeachBack is a revolutionary learning platform built on a simple but powerful principle: You learn best by teaching. Unlike traditional learning platforms where AI teaches you, TeachBack reverses the roles. You become the teacher, explaining topics in your own words while an AI student listens, asks questions, and challenges your understanding. This active explanation approach forces you to organize your thoughts, identify gaps in your knowledge, and truly internalize what you're learning.",
    
    problemIntro: "Traditional learning methods suffer from several fundamental problems:",
    
    problemStatement: [
      "The Illusion of Understanding — Most learners fall into the trap of thinking they understand something after reading or watching content. This 'familiarity' is often mistaken for true comprehension.",
      "Passive Consumption — Videos, lectures, and textbooks encourage passive consumption. The learner receives information but rarely processes it deeply.",
      "Delayed Feedback — Traditional testing provides feedback days or weeks after learning. By then, incorrect mental models have already solidified.",
      "One-Size-Fits-All — Standard learning paths can't adapt to individual understanding gaps. Everyone follows the same curriculum regardless of their existing knowledge."
    ],

    howWeSolve: [
      {
        problem: "The Illusion of Understanding",
        solution: "TeachBack forces you to verbalize your understanding out loud. When you try to explain a concept, gaps you didn't know existed suddenly become obvious.",
        benefit: "Active explanation reveals true comprehension vs. surface familiarity."
      },
      {
        problem: "Passive Consumption",
        solution: "You become the active teacher. The AI student listens, interrupts, and asks clarifying questions—creating an engaging dialogue rather than one-way information flow.",
        benefit: "Active construction of knowledge leads to deeper retention and understanding."
      },
      {
        problem: "Delayed Feedback",
        solution: "The AI immediately challenges unclear explanations with real-time questions. You know within seconds if your explanation makes sense.",
        benefit: "Instant feedback prevents incorrect mental models from solidifying."
      },
      {
        problem: "One-Size-Fits-All",
        solution: "The AI adapts questions based on YOUR specific explanation, not a generic curriculum. It probes exactly where you're unclear.",
        benefit: "Personalized questioning addresses your unique knowledge gaps."
      }
    ],

    targetAudience: [
      "Students — Preparing for exams, understanding complex topics, building long-term retention",
      "Professionals — Learning new skills, deepening expertise, preparing for interviews",
      "Educators — Understanding student perspectives, testing teaching materials",
      "Lifelong Learners — Anyone who wants to truly understand, not just memorize"
    ],

    uniqueFeatures: [
      {
        icon: "Mic",
        title: "Voice-First Interaction",
        points: [
          "Speak naturally as if teaching a real person",
          "Support for 12+ languages including English, Hindi, Spanish, Arabic",
          "Real-time speech-to-text transcription",
          "Natural voice responses from the AI in your language",
          "No typing required—pure verbal explanation",
          "250ms audio chunks for responsive interaction"
        ]
      },
      {
        icon: "Brain",
        title: "AI as Curious Student",
        points: [
          "AI actively listens and asks clarifying questions",
          "Interrupts when something is unclear",
          "Requests examples and elaboration",
          "Challenges your reasoning with 'what if' questions",
          "Never lectures—only learns from you"
        ]
      },
      {
        icon: "Zap",
        title: "Real-Time Teaching Flow",
        points: [
          "Voice → Text → State → Reasoning → State → Voice → Repeat",
          "SessionState updated after every STT and AI reasoning",
          "Cancelable interruptions if you start speaking",
          "Fully real-time, not turn-based interaction",
          "Seamless bi-directional audio streaming"
        ]
      },
      {
        icon: "BarChart",
        title: "Multi-Dimensional Evaluation",
        points: [
          "Clarity, Structure, Coverage, Critical Thinking, Responsiveness",
          "Explanation Readiness Levels (Mastery → Developing)",
          "Specific feedback points on strengths and weaknesses",
          "Actionable insights, not just pass/fail",
          "Background evaluation via Celery"
        ]
      }
    ],

    useCases: [
      "Exam preparation — Solidify understanding before tests",
      "Concept mastery — Truly understand, don't just memorize",
      "Interview prep — Practice explaining technical concepts",
      "Teaching practice — Educators testing their explanations",
      "Knowledge gaps — Identify what you don't understand",
      "Active recall — Better than passive re-reading",
      "Study groups — Individual practice before collaboration",
      "Professional development — Learn new skills deeply"
    ],

    // Comparison table
    comparison: {
      traditional: [
        "AI teaches you",
        "Passive watching/reading",
        "Multiple choice tests",
        "Delayed feedback",
        "Generic curriculum",
        "Memorization focus"
      ],
      teachback: [
        "You teach AI",
        "Active verbal explanation",
        "Live dialogue with questions",
        "Real-time interruptions",
        "Personalized questioning",
        "Understanding focus"
      ]
    }
  },

  // ⭐ MAIN FEATURE: Real-Time Teaching Flow
  // This is THE core of TeachBack - emphasize heavily
  mainFlow: {
    title: "Main Real-Time Teaching Flow",
    subtitle: "Voice → AI → Voice — The Core Loop",
    description: "This is the heart of TeachBack. The real-time teaching flow shows how user voice input moves through the system, updates session state, and returns as AI voice output in real time. This bi-directional voice interaction creates a natural conversation that forces deep understanding.",
    
    oneLiner: "Voice → Text → State → Reasoning → State → Voice → Repeat",
    
    steps: [
      { step: 1, action: "User speaks", icon: "Mic", description: "Explain topic verbally" },
      { step: 2, action: "Frontend captures audio", icon: "Radio", description: "Web Audio API, 250ms chunks" },
      { step: 3, action: "WebSocket audio stream", icon: "Wifi", description: "Binary audio frames" },
      { step: 4, action: "Streaming STT", icon: "FileText", description: "Deepgram real-time transcription" },
      { step: 5, action: "SessionState updated", icon: "Database", description: "Transcript + understanding" },
      { step: 6, action: "Real-time AI reasoning", icon: "Brain", description: "Detect confusion, decide interruption" },
      { step: 7, action: "SessionState updated", icon: "Database", description: "Questions, confidence, gaps" },
      { step: 8, action: "Text-to-Speech", icon: "Volume2", description: "ElevenLabs/Deepgram TTS" },
      { step: 9, action: "Audio streamed back", icon: "Speaker", description: "Frontend playback" },
      { step: 10, action: "User hears and responds", icon: "RefreshCw", description: "Loop repeats" }
    ],

    corePrinciples: [
      "SessionState is updated AFTER STT and AFTER AI reasoning",
      "AI responses are always grounded in current session state",
      "Interruptions are cancelable if the user starts speaking",
      "The system is fully real-time, not turn-based"
    ]
  },

  // From features.md
  features: [
    {
      id: 1,
      title: "Voice-First Learning with Multi-Language Support",
      icon: "Mic",
      description: "TeachBack is designed from the ground up for voice interaction in multiple languages including English, Hindi, Spanish, Arabic, and many more. Students explain topics by speaking naturally in their preferred language, as if teaching a real person. The platform captures audio, converts it to text in real-time, and displays the live transcript.",
      whyItMatters: "Voice forces you to organize your thoughts linearly. Unlike writing, where you can edit and rearrange, speaking requires you to construct your explanation in real-time. This process reveals gaps in understanding that writing might hide. Multi-language support makes this powerful learning method accessible to learners worldwide.",
      supportedLanguages: [
        "English",
        "Hindi (हिन्दी)",
        "Spanish (Español)",
        "Arabic (العربية)",
        "French (Français)",
        "German (Deutsch)",
        "Portuguese (Português)",
        "Chinese (中文)",
        "Japanese (日本語)",
        "Korean (한국어)",
        "Italian (Italiano)",
        "Russian (Русский)"
      ],
      howItWorks: [
        "User starts a teaching session and selects a topic and preferred language",
        "Browser captures audio via MediaRecorder API",
        "Audio chunks stream via WebSocket to backend (250ms intervals)",
        "Backend processes audio through speech-to-text with language-specific models (Deepgram)",
        "Live transcript displays on screen as user speaks in their chosen language",
        "Transcript batches are periodically sent to AI for language-aware analysis"
      ],
      codeSnippets: [
        {
          title: "Audio Streaming with 250ms Chunks",
          language: "javascript",
          code: `// Audio streaming with 250ms chunks
const startAudioStream = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
  
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      websocket.send(event.data); // Binary audio data
    }
  };
  
  mediaRecorder.start(250); // 250ms chunks
};`
        }
      ]
    },
    {
      id: 2,
      title: "AI as Curious Student",
      icon: "Brain",
      description: "The AI doesn't lecture—it learns. It plays the role of a curious, engaged student who actively tries to understand your explanation. When something is unclear, it asks for clarification. When a concept needs more detail, it requests examples.",
      whyItMatters: "This role reversal is the core of the 'protégé effect.' When you must explain to someone who genuinely wants to understand, you're forced to think more deeply than if you were just reciting facts.",
      howItWorks: [
        "Transcript batches are analyzed by AI every 10 seconds",
        "AI evaluates clarity, detects confusion, identifies missing context",
        "AI generates questions or acknowledgments based on analysis",
        "Questions are spoken back to user via text-to-speech",
        "User responds, continuing the dialogue"
      ],
      questionTypes: [
        { type: "Clarification", example: "What do you mean by...?" },
        { type: "Elaboration", example: "Can you give an example of...?" },
        { type: "Connection", example: "How does this relate to...?" },
        { type: "Challenge", example: "What if...?" }
      ]
    },
    {
      id: 3,
      title: "Real-Time WebSocket Communication",
      icon: "Wifi",
      description: "All interaction happens through persistent WebSocket connections. Audio streams, AI responses, TTS audio, and status updates flow in real-time without page refreshes or polling.",
      whyItMatters: "Real-time interaction creates a natural conversation flow. Delays would break the teaching rhythm and make the experience feel artificial.",
      howItWorks: [
        "Browser establishes WebSocket connection to Django Channels",
        "Audio frames stream bidirectionally",
        "Events include: audio_data, stt_result, ai_response, tts_audio",
        "Redis channel layer enables real-time broadcasting"
      ],
      eventTypes: [
        { event: "audio_data", direction: "Client → Server", description: "Raw audio bytes" },
        { event: "stt_result", direction: "Server → Client", description: "Speech-to-text transcript" },
        { event: "ai_response", direction: "Server → Client", description: "AI question/acknowledgment" },
        { event: "tts_audio", direction: "Server → Client", description: "Audio bytes for playback" },
        { event: "evaluation_complete", direction: "Server → Client", description: "Final session evaluation" }
      ],
      codeSnippets: [
        {
          title: "Django Channels WebSocket Consumer",
          language: "python",
          code: `# Django Channels WebSocket consumer
class TeachingConsumer(AsyncWebsocketConsumer):
    async def receive(self, text_data=None, bytes_data=None):
        if bytes_data:
            # Handle audio streaming
            await self.stt_handler.process_audio(bytes_data)
        else:
            # Handle JSON events
            event = json.loads(text_data)
            await self.handle_event(event)`
        }
      ]
    },
    {
      id: 4,
      title: "Multi-Dimensional Evaluation",
      icon: "BarChart3",
      description: "At the end of each session, AI generates a comprehensive evaluation covering multiple dimensions of understanding. This isn't a simple pass/fail—it's a detailed analysis of your teaching performance.",
      whyItMatters: "Granular feedback helps learners understand exactly where they're strong and where they need improvement. Generic scores don't provide actionable insights.",
      evaluationDimensions: [
        { dimension: "Clarity", description: "How clearly concepts were explained" },
        { dimension: "Structure", description: "Logical organization of the explanation" },
        { dimension: "Coverage", description: "Breadth of topic areas addressed" },
        { dimension: "Critical Thinking", description: "Depth of analysis and reasoning" },
        { dimension: "Responsiveness", description: "Quality of answers to AI questions" }
      ],
      readinessLevels: [
        { level: "Mastery", color: "green", description: "Could teach this professionally" },
        { level: "Proficient", color: "blue", description: "Solid understanding with minor gaps" },
        { level: "Progressing", color: "yellow", description: "Good foundation, needs more depth" },
        { level: "Developing", color: "orange", description: "Basic understanding, significant gaps" }
      ],
      codeSnippets: [
        {
          title: "Sample Evaluation Output",
          language: "json",
          code: `{
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
}`
        }
      ]
    },
    {
      id: 5,
      title: "Natural Text-to-Speech",
      icon: "Volume2",
      description: "AI responses are spoken aloud using natural-sounding text-to-speech. The AI 'voice' creates a more immersive teaching experience than reading text on screen.",
      whyItMatters: "Voice response maintains the natural dialogue flow. You're having a conversation, not reading messages. This keeps you in 'teaching mode' rather than switching to 'reading mode.'",
      howItWorks: [
        "AI generates response text",
        "Backend sends text to TTS provider (ElevenLabs primary, Deepgram backup)",
        "Audio chunks stream to browser via WebSocket",
        "Browser plays audio using Web Audio API",
        "Prebuffering ensures smooth playback"
      ],
      codeSnippets: [
        {
          title: "Dynamic Sample Rate Handling",
          language: "javascript",
          code: `// Dynamic sample rate handling for different TTS providers
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
};`
        }
      ]
    },
    {
      id: 6,
      title: "Secure Authentication System",
      icon: "Lock",
      description: "JWT-based authentication using httpOnly cookies. Tokens are never exposed to JavaScript, making the system immune to XSS attacks.",
      whyItMatters: "Security is non-negotiable. User data and learning progress must be protected.",
      securityFeatures: [
        "httpOnly Cookies — Tokens stored securely, inaccessible to JavaScript",
        "CSRF Protection — Django's built-in CSRF middleware",
        "Email Verification — Required before login",
        "Auto Token Refresh — Seamless session continuation",
        "Multi-Tab Sync — Auth state synchronized across browser tabs"
      ],
      codeSnippets: [
        {
          title: "Custom JWT Cookie Authentication",
          language: "python",
          code: `# Custom JWT authentication using cookies
class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            return None
        
        validated_token = self.get_validated_token(access_token)
        return (self.get_user(validated_token), validated_token)`
        }
      ]
    },
    {
      id: 7,
      title: "Session Management & Pause/Resume",
      icon: "Pause",
      description: "Teaching sessions can be paused and resumed. Session state persists in the database, allowing recovery from disconnections or intentional breaks.",
      whyItMatters: "Life interrupts. Users shouldn't lose progress because they had to step away or lost internet connection.",
      stateTransitions: "IDLE → ACTIVE → PAUSED ↔ ACTIVE → EVALUATING → COMPLETED",
      features: [
        "Manual pause/resume via button",
        "Auto-pause on extended inactivity",
        "State persistence to PostgreSQL",
        "Recovery from disconnections",
        "Background evaluation via Celery"
      ]
    },
    {
      id: 8,
      title: "Branded Email Notifications",
      icon: "Mail",
      description: "Professional email templates for all user communications—verification, password reset, evaluation complete notifications.",
      whyItMatters: "Email is often the first touchpoint with your product. Professional, branded emails build trust and recognition.",
      emailTypes: [
        "Email Verification — Sent on registration with verification code",
        "Evaluation Complete — Sent after session evaluation with score summary",
        "Password Reset — Secure password reset flow (planned)"
      ],
      brandColors: {
        deepNavy: "#0B2A44",
        tealBlue: "#1FB5B8",
        softCyan: "#7EDAD8"
      }
    }
  ],

  // Architecture from architecture.md
  architecture: {
    description: "TeachBack is a full-stack application using a microservices-inspired architecture with real-time bidirectional audio streaming at its core.",
    servicesTitle: "Docker Compose Services",
    servicesIntro: "The application consists of 7 containerized services working together:",
    
    diagram: {
      title: "System Architecture",
      description: "Real-time voice interaction with AI",
      layers: [
        {
          name: "Client Layer",
          components: [
            { name: "React SPA", icon: "Monitor", description: "UI/State management" },
            { name: "WebSocket Client", icon: "Wifi", description: "Real-time connection" },
            { name: "Web Audio API", icon: "Volume2", description: "TTS Playback" }
          ]
        },
        {
          name: "Reverse Proxy",
          components: [
            { name: "Nginx", icon: "Cloud", description: "Port 80, routing /api/* and /*" }
          ]
        },
        {
          name: "Application Layer",
          components: [
            { name: "Django + Channels", icon: "Server", description: "REST API + WebSocket" },
            { name: "Celery Worker", icon: "Zap", description: "Background tasks" },
            { name: "Celery Beat", icon: "Clock", description: "Scheduler" }
          ]
        },
        {
          name: "Data Layer",
          components: [
            { name: "PostgreSQL", icon: "Database", description: "Port 5432" },
            { name: "Redis", icon: "Database", description: "Port 6379, Cache/Queue" }
          ]
        },
        {
          name: "External Services",
          components: [
            { name: "Deepgram", icon: "Mic", description: "Speech-to-Text" },
            { name: "OpenAI", icon: "Brain", description: "AI/LLM" },
            { name: "ElevenLabs", icon: "Volume2", description: "Text-to-Speech" }
          ]
        }
      ]
    },

    services: [
      {
        name: "PostgreSQL",
        port: "5432",
        description: "Primary relational database",
        purpose: "Users, sessions, evaluations, transcripts"
      },
      {
        name: "Redis",
        port: "6379",
        description: "In-memory data store",
        purpose: "Celery broker, Django cache, Channels layer, Rate limiting"
      },
      {
        name: "Django Backend",
        port: "8000",
        description: "REST API + WebSocket server",
        purpose: "Authentication, session management, real-time audio handling"
      },
      {
        name: "React Frontend",
        port: "5173",
        description: "Vite dev server",
        purpose: "User interface, audio capture, playback"
      },
      {
        name: "Celery Worker",
        port: "-",
        description: "Background task processor",
        purpose: "Email sending, evaluation processing"
      },
      {
        name: "Celery Beat",
        port: "-",
        description: "Periodic task scheduler",
        purpose: "Token cleanup, scheduled tasks"
      },
      {
        name: "Nginx",
        port: "80",
        description: "Reverse proxy",
        purpose: "Routing, WebSocket upgrade, static files"
      }
    ]
  },

  // API endpoints from architecture.md
  apiEndpoints: [
    {
      category: "Authentication",
      method: "POST",
      path: "/api/auth/register/",
      auth: false,
      description: "Register new user",
      fullDescription: "Create a new user account with email and password"
    },
    {
      category: "Authentication",
      method: "POST",
      path: "/api/auth/login/",
      auth: false,
      description: "Login, set cookies",
      fullDescription: "Authenticate user and set httpOnly JWT cookies"
    },
    {
      category: "Authentication",
      method: "POST",
      path: "/api/auth/logout/",
      auth: true,
      description: "Logout, clear cookies",
      fullDescription: "Invalidate tokens and clear authentication cookies"
    },
    {
      category: "Authentication",
      method: "GET",
      path: "/api/auth/verify/",
      auth: false,
      description: "Verify email with code",
      fullDescription: "Confirm email address using 6-digit verification code"
    },
    {
      category: "Authentication",
      method: "POST",
      path: "/api/auth/token/refresh/",
      auth: false,
      description: "Refresh access token",
      fullDescription: "Get new access token using refresh token cookie"
    },
    {
      category: "Sessions",
      method: "POST",
      path: "/api/sessions/create/",
      auth: true,
      description: "Create new session",
      fullDescription: "Start a new teaching session with topic and grade level"
    },
    {
      category: "Sessions",
      method: "GET",
      path: "/api/sessions/",
      auth: true,
      description: "List user's sessions",
      fullDescription: "Get all teaching sessions for the authenticated user"
    },
    {
      category: "Sessions",
      method: "GET",
      path: "/api/sessions/{id}/",
      auth: true,
      description: "Get session details",
      fullDescription: "Retrieve detailed information about a specific session"
    },
    {
      category: "Sessions",
      method: "POST",
      path: "/api/sessions/end/",
      auth: true,
      description: "End current session",
      fullDescription: "End active session and trigger evaluation"
    },
    {
      category: "Sessions",
      method: "GET",
      path: "/api/sessions/{id}/evaluation/",
      auth: true,
      description: "Get evaluation",
      fullDescription: "Retrieve evaluation results for a completed session"
    },
    {
      category: "WebSocket",
      method: "WS",
      path: "/ws/session/{session_id}/",
      auth: true,
      description: "Teaching session connection",
      fullDescription: "Real-time audio streaming and AI interaction"
    }
  ],

  // Setup steps from setup.md
  setupSteps: [
    {
      number: 1,
      title: "Clone Repository",
      description: "Get the project code",
      commands: [
        { code: "git clone https://github.com/KazimFedxD/TeachBack.git", description: "Clone repo" },
        { code: "cd TeachBack", description: "Enter directory" }
      ]
    },
    {
      number: 2,
      title: "Create Environment Files",
      description: "Copy example env files",
      commands: [
        { code: "cp backend/.env.example backend/.env", description: "Backend env" },
        { code: "cp frontend/.env.example frontend/.env", description: "Frontend env" }
      ]
    },
    {
      number: 3,
      title: "Configure API Keys",
      description: "Add external service credentials to backend/.env",
      commands: [
        { code: "DEEPGRAM_API_KEY=your-deepgram-key", description: "Speech-to-text" },
        { code: "OpenAI_API_KEY=your-OpenAI-key", description: "AI/LLM" },
        { code: "ELEVENLABS_API_KEY=your-elevenlabs-key", description: "Text-to-speech" }
      ]
    },
    {
      number: 4,
      title: "Start Application",
      description: "Launch all services with Docker",
      commands: [
        { code: "docker compose up", description: "Start all services" },
        { code: "docker compose up -d", description: "Run in background (optional)" }
      ]
    },
    {
      number: 5,
      title: "Run Migrations",
      description: "Set up database (first time only)",
      commands: [
        { code: "docker compose exec backend python manage.py migrate", description: "Apply migrations" }
      ]
    },
    {
      number: 6,
      title: "Access Application",
      description: "Open in browser",
      commands: [
        { code: "http://localhost", description: "Frontend (via Nginx)" },
        { code: "http://localhost/api", description: "Backend API" },
        { code: "http://localhost:8000/admin", description: "Admin Panel" }
      ]
    }
  ],

  // Screenshots
  screenshots: [
    { filename: "homepage.png", caption: "Landing page with learn-by-teaching concept", category: "Frontend", description: "Main hero section showcasing the core 'learn by teaching' paradigm with prominent call-to-action" },
    { filename: "session-active.png", caption: "Active teaching session with live transcript", category: "Frontend", description: "Real-time teaching interface showing voice input, live transcription, and session controls" },
    { filename: "session-ai-question.png", caption: "AI student asking clarifying question", category: "Frontend", description: "Demonstration of AI interrupting with a question during the teaching session" },
    { filename: "evaluation.png", caption: "Comprehensive multi-dimensional evaluation", category: "Frontend", description: "Detailed evaluation results showing scores across 5 dimensions with readiness level and feedback" },
    { filename: "sessions-list.png", caption: "Teaching session history", category: "Frontend", description: "List view of all past teaching sessions with topics, dates, and evaluation status" },
    { filename: "mobile-homepage.png", caption: "Mobile responsive landing page", category: "Mobile", description: "Homepage optimized for mobile devices with touch-friendly interface" },
    { filename: "mobile-session.png", caption: "Mobile teaching session interface", category: "Mobile", description: "Full teaching experience adapted for mobile screens with voice controls" }
  ],

  // Performance from performance.md
  performance: {
    pageLoad: [
      { metric: "First Contentful Paint", target: "< 1.5s", actual: "~1.2s" },
      { metric: "Largest Contentful Paint", target: "< 2.5s", actual: "~1.8s" },
      { metric: "Time to Interactive", target: "< 3.0s", actual: "~2.1s" },
      { metric: "Total Blocking Time", target: "< 200ms", actual: "~150ms" }
    ],
    apiResponseTimes: [
      { endpoint: "/api/auth/login/", avg: "120ms", p95: "200ms", p99: "350ms" },
      { endpoint: "/api/auth/user/authenticated/", avg: "50ms", p95: "100ms", p99: "150ms" },
      { endpoint: "/api/sessions/", avg: "80ms", p95: "150ms", p99: "250ms" },
      { endpoint: "/api/sessions/create/", avg: "100ms", p95: "180ms", p99: "300ms" }
    ],
    webSocketLatency: [
      { event: "Audio chunk (250ms)", direction: "Client → Server", latency: "< 50ms" },
      { event: "STT result", direction: "Server → Client", latency: "200-500ms*" },
      { event: "AI response", direction: "Server → Client", latency: "500-2000ms*" },
      { event: "TTS audio chunk", direction: "Server → Client", latency: "< 100ms" }
    ],
    lighthouseScores: {
      desktop: { performance: 95, accessibility: 92, bestPractices: 100, seo: 95 },
      mobile: { performance: 88, accessibility: 92, bestPractices: 100, seo: 95 }
    },
    bundleSize: {
      total: "~148 kB",
      breakdown: [
        { file: "JavaScript bundle", size: "~140 kB" },
        { file: "CSS bundle", size: "~8 kB" }
      ]
    }
  },

  // Requirements from requirements.md
  requirements: {
    os: [
      { name: "Windows 10/11", supported: true, notes: "Docker Desktop required" },
      { name: "macOS 12+", supported: true, notes: "Docker Desktop or Colima" },
      { name: "Ubuntu 20.04+", supported: true, notes: "Native Docker support" },
      { name: "Debian 11+", supported: true, notes: "Native Docker support" }
    ],
    hardware: {
      minimum: { ram: "4GB", cpu: "Dual-core 2.0GHz", disk: "5GB" },
      recommended: { ram: "8GB", cpu: "Quad-core 2.5GHz", disk: "10GB SSD" }
    },
    software: [
      { name: "Docker", version: "20.10+", required: true, purpose: "Container runtime" },
      { name: "Docker Compose", version: "2.0+", required: true, purpose: "Orchestration" },
      { name: "Git", version: "2.30+", required: true, purpose: "Source control" }
    ],
    browsers: [
      { name: "Chrome", version: "90+", supported: true },
      { name: "Firefox", version: "88+", supported: true },
      { name: "Safari", version: "14+", supported: true, notes: "Web Audio limitations on iOS" },
      { name: "Edge", version: "90+", supported: true }
    ],
    externalServices: [
      { name: "Deepgram", purpose: "Speech-to-text", freeTier: true },
      { name: "OpenAI", purpose: "AI/LLM inference", freeTier: true },
      { name: "ElevenLabs", purpose: "Text-to-speech", freeTier: true }
    ]
  },

  // Known issues from known-issues.md
  knownIssues: [
    {
      severity: "medium",
      title: "iOS Safari Web Audio",
      description: "Strict autoplay policies prevent automatic audio playback on iOS Safari.",
      impact: "TTS audio may not play without user interaction",
      workaround: "Tap screen before AI responds to enable audio",
      status: "Platform limitation",
      detailedExplanation: "iOS Safari has strict autoplay policies that require user interaction before playing audio. This is a platform security measure, not a bug.",
      proposedFix: "Implement user gesture detection to unlock audio context before TTS playback."
    },
    {
      severity: "medium",
      title: "WebSocket Reconnection Delay",
      description: "3-5 second delay in WebSocket reconnection when network changes (Firefox).",
      impact: "Brief interruption in session",
      workaround: "Wait for automatic reconnection or refresh page",
      status: "Investigating",
      detailedExplanation: "Firefox handles network state changes differently, causing the WebSocket to take longer to detect disconnection and reconnect.",
      proposedFix: "Implement exponential backoff reconnection with faster initial retry."
    },
    {
      severity: "low",
      title: "Audio Echo on Slow Connections",
      description: "Occasional audio echo when TTS starts playing on high latency connections.",
      impact: "Audio quality degradation",
      workaround: "Use wired connection if possible",
      status: "Prebuffering added, monitoring",
      detailedExplanation: "High latency can cause audio chunks to arrive out of order or with variable timing, causing playback issues.",
      proposedFix: "Increase prebuffer threshold and implement adaptive buffering based on network conditions."
    },
    {
      severity: "low",
      title: "Session Duration Limit",
      description: "Sessions timeout after 30 minutes of activity.",
      impact: "Long explanations may need to be split",
      workaround: "End and start new session for extensive topics",
      status: "By design - configurable limit planned"
    }
  ],

  // Future enhancements from future.md
  futureEnhancements: [
    {
      version: "2.0",
      timeline: "Q2 2026",
      theme: "Core Platform Improvements",
      features: [
        {
          name: "Mobile Native Apps",
          priority: "high",
          effort: "8-12 weeks",
          difficulty: "Hard",
          description: "iOS and Android applications",
          whyWeNeed: "Mobile users expect native app experience",
          howToImplement: ["React Native or Flutter development", "Native audio APIs", "App store deployment"],
          benefits: ["Better mobile performance", "Push notifications", "Offline capability"]
        },
        {
          name: "Topic Library",
          priority: "medium",
          effort: "2-3 weeks",
          difficulty: "Easy",
          description: "Pre-defined topics with subtopic guidance",
          whyWeNeed: "Help users get started without choosing topics from scratch",
          benefits: ["Faster session start", "Structured learning paths"]
        }
      ]
    },
    {
      version: "2.1",
      timeline: "Q3 2026",
      theme: "Advanced AI Features",
      features: [
        {
          name: "Adaptive Questioning",
          priority: "high",
          effort: "3-4 weeks",
          difficulty: "Medium",
          description: "AI adjusts difficulty based on user level",
          whyWeNeed: "Personalized learning experience",
          benefits: ["Better learning outcomes", "Reduced frustration"]
        },
        {
          name: "Concept Mapping",
          priority: "medium",
          effort: "4-5 weeks",
          difficulty: "Medium",
          description: "Visual representation of explained concepts",
          whyWeNeed: "Help users see connections between ideas",
          benefits: ["Visual learner support", "Progress visualization"]
        }
      ]
    },
    {
      version: "3.0",
      timeline: "Q4 2026",
      theme: "Platform Expansion",
      features: [
        {
          name: "LMS Integration",
          priority: "high",
          effort: "6-8 weeks",
          difficulty: "Hard",
          description: "Connect with Canvas, Blackboard, Moodle",
          whyWeNeed: "Educational institution adoption",
          benefits: ["Enterprise customers", "Institutional credibility"]
        },
        {
          name: "API Access",
          priority: "medium",
          effort: "4-5 weeks",
          difficulty: "Medium",
          description: "Developer API for integrations",
          whyWeNeed: "Enable third-party integrations",
          benefits: ["Ecosystem growth", "Developer community"]
        }
      ]
    }
  ],

  // Related projects
  relatedProjects: [
    "Full-Stack Template",
    "FinCore"
  ]
};
