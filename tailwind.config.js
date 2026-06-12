/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./public/index.html",
  ],
  darkMode: "class",
  theme: {
    // Disable the default palette so we don't accidentally reach for slate/gray/blue.
    // Every color in the app must come from the `colors` block below.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",

      // ── SURFACE ────────────────────────────────────────────────────────────
      // Carbon = the page sits on this. Slight chroma toward the brand hue.
      carbon: {
        DEFAULT: "oklch(0.10 0.012 145)",
        1: "oklch(0.12 0.012 145)", // raised surface (cards, inputs)
        2: "oklch(0.16 0.013 145)", // raised twice (hover state)
        "2.5": "oklch(0.19 0.013 145)", // raised thrice (elevated/static)
        3: "oklch(0.22 0.014 145)", // borders on raised surfaces
      },

      // ── INK ────────────────────────────────────────────────────────────────
      // The text. Near-white with a hint of brand hue to avoid pure #fff.
      ink: {
        DEFAULT: "oklch(0.96 0.005 145)",
        1: "oklch(0.82 0.008 145)",
        2: "oklch(0.68 0.012 145)",
        3: "oklch(0.55 0.014 145)", // muted; must still hit 4.5:1 on carbon
      },

      // ── TERMINAL ──────────────────────────────────────────────────────────
      // The accent. Electric green. 30–60% of the visible surface on hero.
      terminal: {
        DEFAULT: "oklch(0.84 0.18 145)",
        1: "oklch(0.78 0.20 145)", // primary brand
        2: "oklch(0.70 0.19 145)", // hover/active
        3: "oklch(0.62 0.17 145)", // disabled
        dim: "oklch(0.55 0.16 145)",
        ghost: "oklch(0.40 0.12 145)",
      },

      // ── AMBER ─────────────────────────────────────────────────────────────
      // The "status" accent. Warm, near-neutral. Used sparingly for awards,
      // active status, "open to work" affordance. Mirrors CSS vars.
      amber: {
        DEFAULT: "oklch(0.82 0.14 75)",
        1: "oklch(0.74 0.16 75)",
        2: "oklch(0.66 0.15 75)",
        ghost: "oklch(0.40 0.10 75)",
      },

      // ── RULE ──────────────────────────────────────────────────────────────
      // 1px hairlines, never wider.
      rule: {
        DEFAULT: "oklch(0.22 0.010 145)",
        1: "oklch(0.30 0.012 145)",
      },

      // ── SIGNAL ────────────────────────────────────────────────────────────
      // Status colors. Used only for status, not decoration. Always paired with text.
      signal: {
        ok: "oklch(0.78 0.18 145)", // same family as terminal
        warn: "oklch(0.80 0.16 80)",
        err: "oklch(0.66 0.22 25)",
        info: "oklch(0.78 0.10 230)",
      },
    },

    // Force a single, committed type ramp. Geist Sans for body, Geist Mono for code.
    fontFamily: {
      sans: [
        "Geist",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
      mono: [
        "Geist Mono",
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },

    fontSize: {
      "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0" }],
      xs:   ["0.75rem",   { lineHeight: "1.125rem", letterSpacing: "0" }],
      sm:   ["0.875rem",  { lineHeight: "1.375rem", letterSpacing: "0" }],
      base: ["1rem",      { lineHeight: "1.625rem", letterSpacing: "0" }],
      lg:   ["1.125rem",  { lineHeight: "1.75rem",  letterSpacing: "-0.005em" }],
      xl:   ["1.25rem",   { lineHeight: "1.875rem", letterSpacing: "-0.01em" }],
      "2xl":["1.5rem",    { lineHeight: "2rem",     letterSpacing: "-0.015em" }],
      "3xl":["1.875rem",  { lineHeight: "2.25rem",  letterSpacing: "-0.02em" }],
      "4xl":["2.25rem",   { lineHeight: "2.5rem",   letterSpacing: "-0.025em" }],
      "5xl":["3rem",      { lineHeight: "1.05",     letterSpacing: "-0.03em" }],
      "6xl":["3.75rem",   { lineHeight: "1.02",     letterSpacing: "-0.035em" }],
      // Display: fluid, capped at 6rem ceiling.
      "fluid-display": ["clamp(2.75rem, 6.5vw, 5.5rem)", { lineHeight: "1.0", letterSpacing: "-0.04em" }],
      "fluid-headline":["clamp(1.875rem, 3.2vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
    },

    extend: {
      spacing: {
        0: "0",
        px: "1px",
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
        40: "10rem",
        48: "12rem",
        64: "16rem",
      },

      maxWidth: {
        prose: "65ch",
        wide: "1280px",
        page: "1200px",
      },

      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
        lg: "6px",
        xl: "8px",
        full: "9999px",
      },

      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        1: "1px",
        2: "2px",
      },

      boxShadow: {
        none: "none",
        "hover-lift": "0 1px 0 0 oklch(0.04 0.010 145), 0 2px 8px -2px oklch(0.04 0.010 145 / 0.6)",
        "lift": "0 1px 0 0 oklch(0.22 0.014 145), 0 2px 8px -2px oklch(0 0 0 / 0.55)",
        "lift-light": "0 1px 0 0 oklch(0.80 0.012 90), 0 2px 6px -2px oklch(0 0 0 / 0.18)",
      },

      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        outFast: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },

      transitionDuration: {
        0: "0ms",
        120: "120ms",
        180: "180ms",
        240: "240ms",
        360: "360ms",
      },

      keyframes: {
        "caret-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1s steps(2) infinite",
        ping: "ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite",
      },

      fontFeatureSettings: {
        ss01: '"ss01"',
        ss02: '"ss02"',
      },
    },
  },
  plugins: [],
};
