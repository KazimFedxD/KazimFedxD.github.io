// src/components/architecture-diagrams/FxDCArchitectureDiagram.jsx
// 7-module pipeline. Lexer → Parser → Object system → Serialization /
// Deserialization. Config and FxDCField flank the pipeline; default
// classes feed into the engine.

import DiagramFrame from "./DiagramFrame";
import { Node, Arrow, Lane } from "./_primitives";

export default function FxDCArchitectureDiagram() {
  const W = 820;
  const H = 320;

  return (
    <DiagramFrame
      title="FxDC · Pipeline Architecture"
      subtitle="7 modules · Python package"
    >
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="FxDC architecture diagram">
        <Lane x={20} y={44}  w={780} h={84} label="input" />
        <Lane x={20} y={144} w={780} h={84} label="core" />
        <Lane x={20} y={244} w={780} h={64} label="output" />

        <Node x={60}  y={60}  w={140} h={50} label="Python object" sublabel="user input" status="always" />
        <Node x={60}  y={160} w={140} h={50} label="Config"         sublabel="class registry" status="always" />
        <Node x={60}  y={260} w={140} h={50} label="Default Classes" sublabel="built-in types" status="data" />

        <Node x={250} y={160} w={140} h={50} label="Serialization" accent sublabel="write.py" status="always" />
        <Node x={430} y={160} w={140} h={50} label="Lexer"         sublabel="lexer.py" status="always" />
        <Node x={610} y={160} w={140} h={50} label="Parser"        sublabel="parsedata.py" status="always" />

        <Node x={430} y={260} w={140} h={50} label="FxDCField" sublabel="fields.py" status="data" />
        <Node x={250} y={260} w={140} h={50} label="Deserialization" accent sublabel="read.py" status="always" />

        <Node x={610} y={60}  w={140} h={50} label=".fxdc file" sublabel="serialized" status="data" />

        <Arrow x1={130} y1={110} x2={130} y2={160} />
        <Arrow x1={200} y1={185} x2={250} y2={185} label="introspect" />
        <Arrow x1={390} y1={185} x2={430} y2={185} />
        <Arrow x1={570} y1={185} x2={610} y2={185} label="tokens" />
        <Arrow x1={680} y1={160} x2={680} y2={110} label="AST" />
        <Arrow x1={430} y1={210} x2={430} y2={260} label="validate" dashed />
        <Arrow x1={320} y1={210} x2={320} y2={260} label="load" dashed />
        <Arrow x1={130} y1={210} x2={130} y2={260} dashed />
      </svg>
    </DiagramFrame>
  );
}
