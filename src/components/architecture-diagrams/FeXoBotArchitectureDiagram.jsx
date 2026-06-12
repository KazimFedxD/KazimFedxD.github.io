// src/components/architecture-diagrams/FeXoBotArchitectureDiagram.jsx
// 8 modules. Modular cog-based architecture with Discord gateway at the top
// and SQLite at the bottom. Multiple data paths converge on the cogs.

import DiagramFrame from "./DiagramFrame";
import { Node, Arrow, Lane } from "./_primitives";

export default function FeXoBotArchitectureDiagram() {
  const W = 820;
  const H = 360;

  return (
    <DiagramFrame
      title="FeXoBot · Cog Architecture"
      subtitle="8 modules · Discord.py 2.0+"
    >
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="FeXoBot architecture diagram">
        <Lane x={20} y={44}  w={780} h={84} label="transport" />
        <Lane x={20} y={144} w={780} h={84} label="application" />
        <Lane x={20} y={244} w={780} h={54} label="extensions" />
        <Lane x={20} y={304} w={780} h={48} label="persistence" />

        {/* Transport */}
        <Node x={60}  y={60}  w={140} h={50} label="Discord Gateway" sublabel="WebSocket + REST" status="always" />

        {/* Application */}
        <Node x={250} y={60}  w={150} h={50} label="Main Bot Core" sublabel="main.py" accent status="always" />
        <Node x={450} y={60}  w={150} h={50} label="Handler Cogs"  sublabel="on_message · joins" status="always" />

        {/* Extensions row */}
        <Node x={60}  y={160} w={140} h={50} label="Command Cogs"   sublabel="15+ modules" status="always" />
        <Node x={250} y={160} w={150} h={50} label="View System"    sublabel="buttons + modals" status="always" />
        <Node x={450} y={160} w={150} h={50} label="Image Gen"      sublabel="Easy-PIL" status="scaled" />
        <Node x={640} y={160} w={140} h={50} label="AI Integration" sublabel="g4f · GPT-4" status="scaled" />

        {/* External API bar */}
        <Node x={250} y={240} w={150} h={50} label="External APIs" sublabel="12+ services" status="scaled" />
        <Node x={450} y={240} w={150} h={50} label="NASA · PokeAPI · Translation · Weather" sublabel="" status="scaled" />

        {/* Persistence */}
        <Node x={60}  y={300} w={180} h={50} label="SQLite" sublabel="main.db" accent status="data" />
        <Node x={290} y={300} w={150} h={50} label="Per-guild DBs" sublabel="isolated schemas" status="data" />
        <Node x={490} y={300} w={150} h={50} label="Encrypted config" sublabel=".env + Fernet" status="data" />

        {/* Arrows */}
        <Arrow x1={200} y1={85}  x2={250} y2={85}  label="events" />
        <Arrow x1={400} y1={85}  x2={450} y2={85}  label="dispatch" />
        <Arrow x1={250} y1={110} x2={130} y2={160} />
        <Arrow x1={325} y1={110} x2={325} y2={160} label="route" />
        <Arrow x1={400} y1={110} x2={525} y2={160} />
        <Arrow x1={400} y1={110} x2={700} y2={160} />

        <Arrow x1={325} y1={210} x2={325} y2={240} label="HTTP" />
        <Arrow x1={525} y1={210} x2={525} y2={240} />

        <Arrow x1={130} y1={210} x2={150} y2={300} label="read/write" />
        <Arrow x1={400} y1={210} x2={365} y2={300} />
        <Arrow x1={700} y1={210} x2={565} y2={300} label="key" />
      </svg>
    </DiagramFrame>
  );
}
