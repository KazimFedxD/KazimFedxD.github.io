// src/lib/motion.js
// Restrained, reduced-motion-aware Framer Motion variants. One set of
// variants; one hook; one place to change the feel of motion across the app.

import { useEffect, useState } from "react";

export const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: 8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
  },
};

// Page transition: a brief 4px y-shift + opacity crossfade. The new page
// feels like it "arrives" rather than simply refreshing.
export const pageTransition = {
  initial: { opacity: 0, y: 4 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -2,
    transition: { duration: 0.09, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Hook: read prefers-reduced-motion and expose a boolean. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  return reduced;
}

/** Convenience: variants collapsed to "no motion" when reduced. */
export function motionOrNone(variant, reduced) {
  if (!reduced) return variant;
  return {
    hidden: { opacity: 1, x: 0, y: 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0 } },
  };
}
