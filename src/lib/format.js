// src/lib/format.js
// Small, dependency-free helpers used across pages and project components.

/** Build a route-safe slug from a project title. Mirrors the spec:
 *  "Full-Stack Template" → "Full-Stack-Template"
 *  "FedxD Data Container (FxDC)" → "FedxD-Data-Container-FxDC"
 *  "Portfolio Website" → "Portfolio-Website"
 */
export function slugify(title) {
  if (!title) return "";
  return String(title)
    .replace(/\s*\(([^)]+)\)/g, "-$1") // "(FxDC)" → "-FxDC"
    .replace(/[()]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

/** Format a period range "July 2024 - Present" → "Jul 2024 — Present". */
export function formatPeriod(period) {
  if (!period) return "";
  const map = {
    January: "Jan", February: "Feb", March: "Mar", April: "Apr",
    May: "May", June: "Jun", July: "Jul", August: "Aug",
    September: "Sep", October: "Oct", November: "Nov", December: "Dec",
  };
  return period
    .split(/\s*-\s*/)
    .map((part) =>
      part
        .split(" ")
        .map((w) => map[w] || w)
        .join(" ")
    )
    .join(" — ");
}

/** Clamp helper. */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/** Turn a status label into a one-word monospace tag. */
export function statusTag(current) {
  if (current === true) return "ACTIVE";
  if (current === false) return "ENDED";
  if (typeof current === "string") return current.toUpperCase();
  return "";
}

/** Stringify a list of tech labels with the +N suffix for overflow. */
export function techPreview(items, max = 6) {
  if (!Array.isArray(items)) return { visible: [], extra: 0 };
  const visible = items.slice(0, max);
  const extra = Math.max(0, items.length - max);
  return { visible, extra };
}

/** Word-break-safe URL display. */
export function displayUrl(url) {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** Parse a YouTube URL or id into an embed-safe id. */
export function youtubeId(input) {
  if (!input) return "";
  if (/^[A-Za-z0-9_-]{8,}$/.test(input)) return input;
  const m = String(input).match(/(?:v=|\/embed\/|\.be\/)([A-Za-z0-9_-]{8,})/);
  return m ? m[1] : "";
}
