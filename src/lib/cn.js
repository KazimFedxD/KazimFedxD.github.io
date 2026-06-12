// src/lib/cn.js
// Single import surface for class composition. Wraps clsx so the whole app
// has one canonical way to combine conditional classes.

import clsx from "clsx";

export function cn(...args) {
  return clsx(...args);
}

export default cn;
