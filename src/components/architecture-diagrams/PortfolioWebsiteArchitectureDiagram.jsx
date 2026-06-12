// src/components/architecture-diagrams/PortfolioWebsiteArchitectureDiagram.jsx
// The portfolio website itself. Browser → CDN → SPA → External services.

import DiagramFrame from "./DiagramFrame";
import { Node, Arrow, Lane } from "./_primitives";

export default function PortfolioWebsiteArchitectureDiagram() {
  const W = 820;
  const H = 320;

  return (
    <DiagramFrame
      title="Portfolio · SPA Architecture"
      subtitle="6 layers · static delivery"
    >
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Portfolio website architecture diagram">
        <Lane x={20} y={44}  w={780} h={84} label="client" />
        <Lane x={20} y={144} w={780} h={84} label="delivery" />
        <Lane x={20} y={244} w={780} h={64} label="external" />

        <Node x={60}  y={60}  w={150} h={50} label="Browser" sublabel="Chrome · FF · Safari" status="always" />
        <Node x={250} y={60}  w={150} h={50} label="React 19 SPA" sublabel="component tree" accent status="always" />
        <Node x={450} y={60}  w={150} h={50} label="React Router" sublabel="client-side" status="always" />
        <Node x={640} y={60}  w={140} h={50} label="Pages + Components" sublabel="9 routes" status="always" />

        <Node x={250} y={160} w={150} h={50} label="GitHub Pages" sublabel="global CDN" accent status="always" />
        <Node x={450} y={160} w={150} h={50} label="Custom domain" sublabel="fedxd.net" status="always" />

        <Node x={250} y={260} w={150} h={50} label="EmailJS" sublabel="contact form" status="scaled" />
        <Node x={450} y={260} w={150} h={50} label="GitHub API" sublabel="contribution graph" status="scaled" />

        <Arrow x1={210} y1={85}  x2={250} y2={85}  />
        <Arrow x1={400} y1={85}  x2={450} y2={85}  label="route" />
        <Arrow x1={600} y1={85}  x2={640} y2={85}  label="render" />
        <Arrow x1={400} y1={110} x2={325} y2={160} label="HTTPS" />
        <Arrow x1={325} y1={210} x2={325} y2={260} label="send" dashed />
        <Arrow x1={525} y1={210} x2={525} y2={260} label="fetch" dashed />
      </svg>
    </DiagramFrame>
  );
}
