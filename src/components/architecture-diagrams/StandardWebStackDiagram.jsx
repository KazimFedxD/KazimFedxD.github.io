// src/components/architecture-diagrams/StandardWebStackDiagram.jsx
// A reusable 7-service layout for the standard Django+React+Postgres+Redis+
// Celery+Nginx stack. Used by FinCore, Full-Stack Template, and any other
// project that fits the same shape.
//
// Status dots:
//   always = always-on, terminal green
//   scaled = may be scaled to zero, amber
//   data   = database / data store, ink-3

import { Node, Arrow, Lane } from "./_primitives";

export default function StandardWebStackDiagram({ project }) {
  const W = 760;
  const H = 360;

  const nodes = {
    react:  { x:  60, y:  60, w: 150, h: 50, label: "React",          sublabel: ":3000  UI",          status: "always" },
    nginx:  { x: 250, y:  60, w: 150, h: 50, label: "Nginx",          sublabel: ":80  proxy",        status: "always" },
    django: { x: 440, y:  60, w: 150, h: 50, label: "Django REST",    sublabel: ":8000  API",        status: "always" },
    worker: { x: 250, y: 160, w: 150, h: 50, label: "Celery Worker",  sublabel: "async",             status: "scaled" },
    beat:   { x: 440, y: 160, w: 150, h: 50, label: "Celery Beat",    sublabel: "scheduled",         status: "scaled" },
    pg:     { x: 250, y: 260, w: 150, h: 50, label: "PostgreSQL",     sublabel: ":5432",             status: "data" },
    redis:  { x: 440, y: 260, w: 150, h: 50, label: "Redis",          sublabel: ":6379  broker + cache", status: "data" },
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={`${project} architecture diagram`}
    >
      {/* Three lanes with subtle carbon-2 backgrounds, ~100px tall each. */}
      <Lane x={20}  y={44}  w={720} h={84} label="client" />
      <Lane x={20}  y={144} w={720} h={84} label="backend" />
      <Lane x={20}  y={244} w={720} h={84} label="data" />

      <Node {...nodes.react} />
      <Node {...nodes.nginx} accent />
      <Node {...nodes.django} accent />
      <Node {...nodes.worker} />
      <Node {...nodes.beat} />
      <Node {...nodes.pg} />
      <Node {...nodes.redis} accent />

      <Arrow x1={nodes.react.x  + nodes.react.w} y1={nodes.react.y + 25}
             x2={nodes.nginx.x}  y2={nodes.nginx.y + 25} label="HTTPS" />
      <Arrow x1={nodes.nginx.x  + nodes.nginx.w} y1={nodes.nginx.y + 25}
             x2={nodes.django.x} y2={nodes.django.y + 25} label="/api" />
      <Arrow x1={nodes.django.x + 75}            y1={nodes.django.y + nodes.django.h}
             x2={nodes.worker.x + 75}            y2={nodes.worker.y} label="enqueue" />
      <Arrow x1={nodes.django.x + 110}           y1={nodes.django.y + nodes.django.h}
             x2={nodes.beat.x + 75}              y2={nodes.beat.y} label="schedule" dashed />
      <Arrow x1={nodes.worker.x + 75}            y1={nodes.worker.y + nodes.worker.h}
             x2={nodes.redis.x}                  y2={nodes.redis.y + 25} />
      <Arrow x1={nodes.beat.x + 75}              y1={nodes.beat.y + nodes.beat.h}
             x2={nodes.redis.x + 30}             y2={nodes.redis.y + 25} dashed />
      <Arrow x1={nodes.django.x + 30}            y1={nodes.django.y + nodes.django.h}
             x2={nodes.pg.x + 75}                y2={nodes.pg.y + 25} label="ORM" />
    </svg>
  );
}
