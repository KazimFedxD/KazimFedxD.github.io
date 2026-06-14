// src/lib/screenshots.js
// Maps a project title to its public/screenshots/<folder>/ subfolder.
// Used by ProjectDetail (gallery) and Projects (card thumbnails) so the
// mapping lives in one place.

export const SCREENSHOT_FOLDER = {
  "TeachBack": "TeachBack",
  "FinCore": "FinCore",
  "Full-Stack Template": "Full-Stack-Template",
  "Full-Stack-Template": "Full-Stack-Template",
  "FedxD Data Container (FxDC)": "FedxD-Data-Container-FxDC",
  "FedxD-Data-Container-FxDC": "FedxD-Data-Container-FxDC",
  "FxPy": "FxPy",
  "FeXoBot": "FeXoBot",
  "FxQuest": "FxQuest",
};

/** Returns the first screenshot src for a project, or null if none. */
export function firstScreenshot(title) {
  const folder = SCREENSHOT_FOLDER[title];
  if (!folder) return null;
  return `/screenshots/${folder}/homepage.png`;
}

/** Build a list of screenshot src strings for a project's gallery. */
export function listScreenshots(title) {
  const folder = SCREENSHOT_FOLDER[title];
  if (!folder) return [];
  // The gallery defers to the project data's screenshot objects; this helper
  // is for the listing page only.
  return [`/screenshots/${folder}/homepage.png`];
}

// ── Async existence check ─────────────────────────────────────────────────
//
// The project data references screenshot files by `filename`; some filenames
// in the data don't have a matching file on disk (e.g. the meta-project's
// "meta-project" entry). Without a check, <img src="/missing.png"> renders
// a broken image. The check below caches HEAD responses in module memory so
// each src is requested at most once per page load.
//
// In SSR/Node environments (no `window`), it short-circuits to `true` so
// the build doesn't break — the worst case is a broken image at runtime.

const _existsCache = new Map();
let _isBrowser = false;
if (typeof window !== "undefined") _isBrowser = true;

export async function screenshotExists(src) {
  if (!_isBrowser) return true;
  if (!src) return false;
  if (_existsCache.has(src)) return _existsCache.get(src);

  const promise = (async () => {
    try {
      const res = await fetch(src, { method: "HEAD", cache: "no-store" });
      return res.ok;
    } catch {
      return false;
    }
  })();

  _existsCache.set(src, promise);
  return promise;
}

/** Synchronous "do we know this one exists?" — useful for non-critical UI. */
export function screenshotKnown(src) {
  if (!_existsCache.has(src)) return true; // optimistic until proven otherwise
  const v = _existsCache.get(src);
  return v === true; // false-y if a promise or false
}
