// src/components/architecture-diagrams/FxQuestArchitectureDiagram.jsx
// FxQuest · modular cog-based Discord bot with a custom DB layer.

import DiagramFrame from "./DiagramFrame";
import { Node, Arrow, Lane } from "./_primitives";

export default function FxQuestArchitectureDiagram() {
  const W = 820;
  const H = 360;

  return (
    <DiagramFrame
      title="FxQuest · Modular Cog Architecture"
      subtitle="7 modules · custom DB layer"
    >
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="FxQuest architecture diagram">
        <Lane x={20} y={44}  w={780} h={84} label="transport" />
        <Lane x={20} y={144} w={780} h={84} label="core" />
        <Lane x={20} y={244} w={780} h={54} label="cogs" />
        <Lane x={20} y={304} w={780} h={48} label="data" />

        <Node x={60}  y={60}  w={140} h={50} label="Discord Gateway" sublabel="WebSocket" status="always" />
        <Node x={250} y={60}  w={150} h={50} label="MyBot Class"     sublabel="main.py" accent status="always" />
        <Node x={450} y={60}  w={150} h={50} label="DB Abstraction"  sublabel="asyncsqlite3" status="always" />

        <Node x={60}  y={160} w={140} h={50} label="Command Cogs" sublabel="setup · help" status="always" />
        <Node x={250} y={160} w={150} h={50} label="Game Cogs"    sublabel="UNO · Poker · BJ" accent status="always" />
        <Node x={450} y={160} w={150} h={50} label="Handler Cogs" sublabel="levels · money" status="always" />

        <Node x={60}  y={260} w={140} h={50} label="PyPokerEngine" sublabel="hand eval" status="scaled" />
        <Node x={250} y={260} w={150} h={50} label="Discord UI"   sublabel="buttons · modals" status="always" />
        <Node x={450} y={260} w={150} h={50} label="Easy-PIL"     sublabel="cards · boards" status="scaled" />

        <Node x={250} y={310} w={150} h={50} label="SQLite" sublabel="main.db · async" accent status="data" />

        <Arrow x1={200} y1={85}  x2={250} y2={85}  label="events" />
        <Arrow x1={400} y1={85}  x2={450} y2={85}  label="open" />

        <Arrow x1={250} y1={110} x2={130} y2={160} />
        <Arrow x1={325} y1={110} x2={325} y2={160} label="route" />
        <Arrow x1={400} y1={110} x2={525} y2={160} />

        <Arrow x1={130} y1={210} x2={130} y2={260} label="engine" />
        <Arrow x1={325} y1={210} x2={325} y2={260} />
        <Arrow x1={525} y1={210} x2={525} y2={260} />

        <Arrow x1={130} y1={260} x2={250} y2={310} dashed />
        <Arrow x1={325} y1={260} x2={325} y2={310} label="read/write" />
        <Arrow x1={525} y1={260} x2={400} y2={310} dashed />
      </svg>
    </DiagramFrame>
  );
}
