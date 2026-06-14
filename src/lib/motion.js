// src/lib/motion.js
// Restrained, reduced-motion-aware Framer Motion variants. One set of
// variants; one hook; one place to change the feel of motion across the app.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

/**
 * Reveal — fades + lifts a single block into view on scroll, once.
 * Use for section openers, hero reveal beats, and the case-study diagram.
 * Static render when the user prefers reduced motion.
 *
 * Has a 250ms safety timeout so the content is always visible even if
 * the IntersectionObserver never fires (e.g. headless screenshots, JSDOM,
 * an element that starts off-screen and never scrolls into view).
 */
export function Reveal({
  as: As = "div",
  children,
  delay = 0,
  y = 8,
  duration = 0.36,
  className,
  amount = 0.05,
  margin = "0px 0px -10% 0px",
  ...rest
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    amount,
    rootMargin: margin,
  });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (reduced) return undefined;
    const t = setTimeout(() => setFallback(true), 250);
    return () => clearTimeout(t);
  }, [reduced]);

  if (reduced) {
    return <As className={className} {...rest}>{children}</As>;
  }

  const MotionAs = motion[As] || motion.div;
  const visible = inView || fallback;

  return (
    <MotionAs
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: visible ? "auto" : "opacity, transform" }}
      {...rest}
    >
      {children}
    </MotionAs>
  );
}

/**
 * StaggerGroup — applies a 60–80ms stagger to its direct children
 * when the group enters the viewport. Each child fades up; the
 * group only animates once.
 */
export function StaggerGroup({
  as: As = "div",
  children,
  stagger = 0.06,
  className,
  amount = 0.1,
  ...rest
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, amount });
  const MotionAs = motion[As] || motion.div;

  if (reduced) {
    return <As className={className} {...rest}>{children}</As>;
  }

  // Per-child delay
  const items = Array.isArray(children) ? children : [children];

  return (
    <MotionAs ref={ref} className={className} {...rest}>
      {items.map((child, i) => (
        <motion.div
          key={child && child.key ? child.key : i}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            duration: 0.32,
            delay: i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </MotionAs>
  );
}
