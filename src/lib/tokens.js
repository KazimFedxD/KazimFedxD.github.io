// src/lib/tokens.js
// JS mirror of CSS variables defined in src/index.css.
// Single source of truth for inline SVG / canvas work (architecture diagrams).
// If you change a color in tailwind.config.js or index.css, change it here too.

export const tokens = {
  // Surfaces
  carbon:    "oklch(0.10 0.012 145)",
  carbon1:   "oklch(0.12 0.012 145)",
  carbon2:   "oklch(0.16 0.013 145)",
  carbon2_5: "oklch(0.19 0.013 145)",
  carbon3:   "oklch(0.22 0.014 145)",

  // Ink
  ink:  "oklch(0.96 0.005 145)",
  ink1: "oklch(0.82 0.008 145)",
  ink2: "oklch(0.68 0.012 145)",
  ink3: "oklch(0.55 0.014 145)",

  // Terminal accent (action)
  terminal:      "oklch(0.80 0.21 145)",
  terminal1:     "oklch(0.86 0.20 145)",
  terminal2:     "oklch(0.72 0.20 145)",
  terminalDim:   "oklch(0.55 0.16 145)",
  terminalGhost: "oklch(0.40 0.12 145)",

  // Amber accent (status)
  amber:      "oklch(0.82 0.14 75)",
  amber1:     "oklch(0.74 0.16 75)",
  amber2:     "oklch(0.66 0.15 75)",
  amberGhost: "oklch(0.40 0.10 75)",

  // Rules
  rule:  "oklch(0.22 0.010 145)",
  rule1: "oklch(0.30 0.012 145)",

  // Signal
  ok:   "oklch(0.78 0.18 145)",
  warn: "oklch(0.80 0.16 80)",
  err:  "oklch(0.66 0.22 25)",
  info: "oklch(0.78 0.10 230)",
};

// Light-mode overrides (apply the same hue, inverted L). Inline diagrams
// re-theme by reading these conditionally based on a `theme` prop.
export const lightTokens = {
  ...tokens,
  carbon:    "oklch(0.985 0.005 90)",
  carbon1:   "oklch(0.96 0.008 90)",
  carbon2:   "oklch(0.92 0.010 90)",
  carbon2_5: "oklch(0.88 0.011 90)",
  carbon3:   "oklch(0.80 0.012 90)",
  ink:       "oklch(0.20 0.012 145)",
  ink1:      "oklch(0.32 0.012 145)",
  ink2:      "oklch(0.42 0.012 145)",
  ink3:      "oklch(0.48 0.012 145)",
  rule:      "oklch(0.86 0.012 90)",
  rule1:     "oklch(0.72 0.012 90)",
  rule2:     "oklch(0.62 0.012 90)",
  terminal:      "oklch(0.50 0.18 145)",
  terminal1:     "oklch(0.54 0.20 145)",
  terminal2:     "oklch(0.44 0.17 145)",
  terminalDim:   "oklch(0.55 0.10 145)",
  terminalGhost: "oklch(0.55 0.10 145)",
  amber:      "oklch(0.52 0.14 75)",
  amber1:     "oklch(0.46 0.16 75)",
  amber2:     "oklch(0.58 0.12 75)",
  amberGhost: "oklch(0.65 0.08 75)",
};

export default tokens;
