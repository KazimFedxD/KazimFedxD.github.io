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
