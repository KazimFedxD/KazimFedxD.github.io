// src/components/architecture-diagrams/TeachBackArchitectureDiagram.jsx
// 7-service Docker Compose. Voice pipeline callout as a separate inset.
// Lanes are subtly tinted so client / backend / data are visually distinct.

import { Node, Arrow, Lane } from "./_primitives";

export default function TeachBackArchitectureDiagram() {
  const W = 760;
  const H = 420;

  // 7 services in 3 rows.
  // Row 1 (client): React, Nginx
  // Row 2 (backend): Django, Celery Worker, Celery Beat
  // Row 3 (data):    PostgreSQL, Redis

  const nodes = {
    react:   { x:  60, y:  60, w: 150, h: 50, label: "React (Vite)",     sublabel: ":5173",      status: "always" },
    nginx:   { x: 250, y:  60, w: 150, h: 50, label: "Nginx",            sublabel: ":80 proxy", status: "always" },
    django:  { x: 440, y:  60, w: 150, h: 50, label: "Django + Channels", sublabel: ":8000",     status: "always" },
    worker:  { x: 250, y: 160, w: 150, h: 50, label: "Celery Worker",    sublabel: "async",     status: "scaled" },
    beat:    { x: 440, y: 160, w: 150, h: 50, label: "Celery Beat",      sublabel: "scheduled", status: "scaled" },
    pg:      { x: 250, y: 260, w: 150, h: 50, label: "PostgreSQL",       sublabel: ":5432",     status: "data" },
    redis:   { x: 440, y: 260, w: 150, h: 50, label: "Redis",            sublabel: ":6379",     status: "data" },
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="TeachBack architecture diagram"
    >
      <Lane x={20} y={44}  w={720} h={84} label="client" />
      <Lane x={20} y={144} w={720} h={84} label="backend" />
      <Lane x={20} y={244} w={720} h={84} label="data" />

      <Node {...nodes.react}  />
      <Node {...nodes.nginx}  accent />
      <Node {...nodes.django} accent />
      <Node {...nodes.worker} />
      <Node {...nodes.beat}   />
      <Node {...nodes.pg}     />
      <Node {...nodes.redis}  accent />

      <Arrow x1={nodes.react.x  + nodes.react.w}  y1={nodes.react.y + 25}
             x2={nodes.nginx.x}  y2={nodes.nginx.y + 25} label="HTTPS" />
      <Arrow x1={nodes.nginx.x  + nodes.nginx.w}  y1={nodes.nginx.y + 25}
             x2={nodes.django.x} y2={nodes.django.y + 25} label="/api, /ws" />
      <Arrow x1={nodes.django.x + 75}             y1={nodes.django.y + nodes.django.h}
             x2={nodes.worker.x + 75}             y2={nodes.worker.y} label="enqueue" />
      <Arrow x1={nodes.django.x + 110}            y1={nodes.django.y + nodes.django.h}
             x2={nodes.beat.x + 75}               y2={nodes.beat.y} label="schedule" dashed />
      <Arrow x1={nodes.worker.x + 75}             y1={nodes.worker.y + nodes.worker.h}
             x2={nodes.redis.x}                   y2={nodes.redis.y + 25} />
      <Arrow x1={nodes.beat.x + 75}               y1={nodes.beat.y + nodes.beat.h}
             x2={nodes.redis.x + 30}              y2={nodes.redis.y + 25} dashed />
      <Arrow x1={nodes.django.x + 30}             y1={nodes.django.y + nodes.django.h}
             x2={nodes.pg.x + 75}                 y2={nodes.pg.y + 25} label="ORM" />

      {/* Voice pipeline callout — the "core innovation" beat. */}
      <g>
        <rect x="20" y="330" width={W - 40} height="64" rx={3}
              fill="var(--carbon-1)" stroke="var(--amber)" strokeOpacity="0.5" strokeDasharray="4 3" />
        <text x="32" y="350" fontSize="10" fontFamily="var(--font-mono)"
              fill="var(--amber)" style={{ textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>
          Real-time voice pipeline
        </text>
        <text x="32" y="368" fontSize="11" fontFamily="var(--font-mono)" fill="var(--ink-2)">
          User mic → MediaRecorder → WebSocket → Django Channels → Deepgram STT
        </text>
        <text x="32" y="384" fontSize="11" fontFamily="var(--font-mono)" fill="var(--ink-2)">
          → Groq (student response) → ElevenLabs TTS → WebSocket → Speaker
        </text>
      </g>
    </svg>
  );
}
