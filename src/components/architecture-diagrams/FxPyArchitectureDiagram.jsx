// src/components/architecture-diagrams/FxPyArchitectureDiagram.jsx
// 7 modules. Linear pipeline: source → lexer → parser → interpreter →
// output. Error handler, REPL, and runner are cross-cutting.

import DiagramFrame from "./DiagramFrame";
import { Node, Arrow, Lane } from "./_primitives";

export default function FxPyArchitectureDiagram() {
  const W = 820;
  const H = 360;

  return (
    <DiagramFrame
      title="FxPy · Pipeline Architecture"
      subtitle="7 modules · Python 3.11+"
    >
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="FxPy architecture diagram">
        {/* Pipeline lane — top row. */}
        <Lane x={20} y={24} w={780} h={84} label="pipeline" />

        {/* Linear pipeline row */}
        <Node x={20}  y={40} w={130} h={50} label="Source code" sublabel=".fxpy / stdin" status="always" />
        <Node x={190} y={40} w={130} h={50} label="Lexer"  sublabel="lexer.py · 305 L" status="always" />
        <Node x={360} y={40} w={130} h={50} label="Parser" sublabel="fxparser.py · 1,407 L" status="always" />
        <Node x={530} y={40} w={130} h={50} label="Interpreter" sublabel="interpreter.py · 1,393 L" accent status="always" />
        <Node x={700} y={40} w={100} h={50} label="Output" sublabel="stdout" status="always" />

        {/* Cross-cutting modules — below the lane. */}
        <Node x={20}  y={150} w={150} h={50} label="Error Handler" sublabel="errors.py · 88 L" status="always" />
        <Node x={20}  y={220} w={150} h={50} label="String Arrows" sublabel="visual ^ markers" status="always" />
        <Node x={190} y={150} w={150} h={50} label="Symbol Tables" sublabel="scoping" status="always" />
        <Node x={190} y={220} w={150} h={50} label="REPL"           sublabel="shell.py · 40 L" status="scaled" />
        <Node x={360} y={220} w={150} h={50} label="Runner"          sublabel="run.py · 19 L" status="scaled" />
        <Node x={530} y={150} w={150} h={50} label="Built-ins"      sublabel="25+ functions" status="always" />
        <Node x={530} y={220} w={150} h={50} label="Module Loader"  sublabel="import system" status="always" />

        {/* Pipeline arrows */}
        <Arrow x1={150} y1={65} x2={190} y2={65} label="tokens" />
        <Arrow x1={320} y1={65} x2={360} y2={65} label="AST" />
        <Arrow x1={490} y1={65} x2={530} y2={65} label="execute" />
        <Arrow x1={660} y1={65} x2={700} y2={65} />

        {/* Cross-cutting arrows (dashed) */}
        <Arrow x1={95}  y1={150} x2={95}  y2={90}  label="raise" dashed />
        <Arrow x1={95}  y1={220} x2={95}  y2={90}  dashed />
        <Arrow x1={255} y1={150} x2={255} y2={90}  label="scope" dashed />
        <Arrow x1={255} y1={220} x2={255} y2={90}  dashed />
        <Arrow x1={425} y1={220} x2={425} y2={90}  label="load" dashed />
        <Arrow x1={605} y1={150} x2={605} y2={90}  label="call" dashed />
        <Arrow x1={605} y1={220} x2={605} y2={90}  dashed />
      </svg>
    </DiagramFrame>
  );
}
