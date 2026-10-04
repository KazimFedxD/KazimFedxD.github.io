// Smooth & modern animation constants - 300ms base, 0.08s stagger

// ── Easing ───────────────────────────────────────────────────────────────────
export const EASE = [0.25, 0.1, 0.25, 1] as const
export const EASE_SNAPPY = [0.16, 1, 0.3, 1] as const
export const EASE_SMOOTH = [0.25, 0.1, 0.25, 1] as const
export const EASE_BOUNCE = [0.34, 1.56, 0.64, 1] as const

// ── Duration ─────────────────────────────────────────────────────────────────
export const DUR = 0.3
export const DUR_FAST = 0.15
export const DUR_SLOW = 0.5
export const NAV_DUR = 0.25

// ── Stagger ──────────────────────────────────────────────────────────────────
export const PAGE_START = 0.05
export const PAGE_STEP = 0.08
export const SCROLL_STEP = 0.08

// ── Reusable Variants ────────────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR, ease: EASE, delay },
  }),
}

export const fadeUpScale = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DUR, ease: EASE, delay },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: DUR, ease: EASE, delay },
  }),
}

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: DUR_FAST, ease: EASE_BOUNCE, delay },
  }),
}

export const scaleBounce = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: DUR, ease: EASE_BOUNCE, delay },
  }),
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DUR, ease: EASE, delay },
  }),
}

export const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DUR, ease: EASE, delay },
  }),
}

export const slideUpBlur = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DUR_SLOW, ease: EASE_SMOOTH, delay },
  }),
}

export const expandFromCenter = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: DUR, ease: EASE, delay },
  }),
}

// ── Container Variants ───────────────────────────────────────────────────────
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: PAGE_STEP,
      delayChildren: PAGE_START,
    },
  },
}

export const scrollStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: SCROLL_STEP,
      delayChildren: 0.05,
    },
  },
}

export const fastStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

// ── Hover & Gesture Variants ─────────────────────────────────────────────────
export const cardHover = {
  rest: { scale: 1, y: 0, transition: { duration: DUR_FAST, ease: EASE } },
  hover: { scale: 1.01, y: -2, transition: { duration: DUR_FAST, ease: EASE } },
  tap: { scale: 0.99, transition: { duration: DUR_FAST, ease: EASE } },
}

export const buttonHover = {
  rest: { scale: 1, transition: { duration: DUR_FAST, ease: EASE } },
  hover: { scale: 1.02, transition: { duration: DUR_FAST, ease: EASE } },
  tap: { scale: 0.98, transition: { duration: DUR_FAST, ease: EASE } },
}

export const subtleLift = {
  rest: { y: 0, transition: { duration: DUR_FAST, ease: EASE } },
  hover: { y: -2, transition: { duration: DUR_FAST, ease: EASE } },
}

// ── Utility Functions ────────────────────────────────────────────────────────
export const getStaggerDelay = (index: number, base = PAGE_START) =>
  base + index * PAGE_STEP

export const getScrollDelay = (index: number, base = 0.05) =>
  base + index * SCROLL_STEP

export const getChoreographyDelay = (
  order: "hero" | "primary" | "secondary" | "tertiary" | "ambient",
  index = 0
) => {
  const bases = { hero: 0.05, primary: 0.1, secondary: 0.18, tertiary: 0.26, ambient: 0.36 }
  return bases[order] + index * PAGE_STEP
}
