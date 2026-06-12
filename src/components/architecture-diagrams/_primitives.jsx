// src/components/architecture-diagrams/_primitives.jsx
// Reusable SVG pieces for the architecture diagrams. Everything uses
// currentColor + inline style references to tokens so the diagram re-themes
// with the site.

import { useEffect, useState } from "react";
import { lightTokens, tokens as darkTokens } from "../../lib/tokens";

export const ARROW = (x1, y1, x2, y2) => `M ${x1} ${y1} L ${x2} ${y2}`;

export function useThemedTokens() {
  const [tk, setTk] = useState(darkTokens);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const isLight = document.documentElement.classList.contains("light");
    setTk(isLight ? lightTokens : darkTokens);
    const obs = new MutationObserver(() => {
      const nowLight = document.documentElement.classList.contains("light");
      setTk(nowLight ? lightTokens : darkTokens);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return tk;
}

// Map of well-known service keys → visual treatment for the node header strip.
// Status colors are: "always" (always-on, terminal green), "scaled" (may be
// scaled to zero, amber), "data" (database, ink-3).
export const STATUS_COLOR = {
  always: "var(--terminal)",
  scaled: "var(--amber)",
  data:   "var(--ink-3)",
};

export function Node({
  x, y, w = 160, h = 56, label, sublabel, accent, title, status, port,
}) {
  // A bordered rectangle with optional title label inside. SVG.
  return (
    <g>
      {title && (
        <text
          x={x + w / 2}
          y={y - 8}
          textAnchor="middle"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fill={accent ? "var(--terminal)" : "var(--ink-3)"}
          style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
        >
          {title}
        </text>
      )}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={3}
        fill="var(--carbon-1)"
        stroke={accent ? "var(--terminal)" : "var(--rule)"}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 - (sublabel ? 6 : 0)}
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="500"
        fontFamily="var(--font-sans)"
        fill="var(--ink)"
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fill="var(--ink-3)"
        >
          {sublabel}
        </text>
      )}
      {/* Status dot — top right, 4px filled circle. */}
      {status && (
        <circle
          cx={x + w - 8}
          cy={y + 8}
          r={3}
          fill={STATUS_COLOR[status] || "var(--ink-3)"}
        />
      )}
      {/* Port indicator — top right corner, just under the status dot. */}
      {port && (
        <text
          x={x + w - 8}
          y={y + 22}
          textAnchor="end"
          fontSize="9"
          fontFamily="var(--font-mono)"
          fill="var(--ink-3)"
        >
          :{port}
        </text>
      )}
    </g>
  );
}

export function Line({ x1, y1, x2, y2, label, dashed }) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--ink-3)"
        strokeWidth="1"
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 4}
          textAnchor="middle"
          fontSize="9.5"
          fontFamily="var(--font-mono)"
          fill="var(--ink-3)"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function Arrow({ x1, y1, x2, y2, label, dashed, side = "auto" }) {
  // 1px line + a tiny `→` glyph at the end. No drawn arrow heads.
  const gx = x2 - 8;
  const gy = y2;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--ink-2)"
        strokeWidth="1"
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      <text
        x={gx}
        y={gy + 3}
        textAnchor="middle"
        fontSize="10"
        fontFamily="var(--font-mono)"
        fill="var(--terminal)"
      >
        →
      </text>
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 4}
          textAnchor="middle"
          fontSize="9.5"
          fontFamily="var(--font-mono)"
          fill="var(--ink-3)"
        >
          {label}
        </text>
      )}
    </g>
  );
}

/**
 * Lane — a full-height band with a subtle carbon-2 background and an
 * uppercase mono label. Use this instead of LaneLabel for visual separation
 * between concerns (client / backend / data).
 */
export function Lane({ x, y, w, h, label }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={3}
        fill="var(--carbon-2)"
        fillOpacity="0.45"
        stroke="var(--rule)"
        strokeOpacity="0.6"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      {label && (
        <text
          x={x + 8}
          y={y + 16}
          fontSize="9.5"
          fontFamily="var(--font-mono)"
          fill="var(--ink-3)"
          style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/**
 * LaneLabel — the original thin-line band. Kept for any diagram that wants
 * the lighter treatment.
 */
export function LaneLabel({ x, y, w, label }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke="var(--rule)" strokeWidth="1" strokeDasharray="2 3" />
      <text
        x={x}
        y={y - 8}
        fontSize="9.5"
        fontFamily="var(--font-mono)"
        fill="var(--ink-3)"
        style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
      >
        {label}
      </text>
    </g>
  );
}
