// src/data/registry.js
// Single entry point for every preserved data module in portfolio_data/.
// The pages and components import from here ONLY — never from portfolio_data/
// directly. This keeps the rebuild in sync with the preserved content.

import {
  projectsData,
  getSortedProjects,
  getTotalProjects,
  getFeaturedLabel,
  projectsWithDetails,
  hasProjectDetails,
} from "../portfolio_data/projectsData.js";

import { teachbackData } from "../portfolio_data/teachback-data.js";
import { fincoreData } from "../portfolio_data/fincore-data.js";
import { fullStackTemplateData } from "../portfolio_data/fullstack-template-data.js";
import { fedxdDataContainerData } from "../portfolio_data/fedxd-data-container-data.js";
import { fxpyData } from "../portfolio_data/fxpy-data.js";
import { fexobotData } from "../portfolio_data/fexobot-data.js";
import { fxquestData } from "../portfolio_data/fxquest-data.js";
import { portfolioWebsiteData } from "../portfolio_data/portfolio-website-data.js";

import projectRouteMapping from "../portfolio_data/project_route_mapping.json";
import seoMetadata from "../portfolio_data/seo_metadata.json";

// ── Central project registry (preserved order) ────────────────────────────
export {
  projectsData,
  getSortedProjects,
  getTotalProjects,
  getFeaturedLabel,
  projectsWithDetails,
  hasProjectDetails,
};

// ── Per-project detail data modules, looked up by URL slug ───────────────
const dataBySlug = {
  TeachBack: teachbackData,
  FinCore: fincoreData,
  "Full-Stack-Template": fullStackTemplateData,
  "FedxD-Data-Container-FxDC": fedxdDataContainerData,
  FxPy: fxpyData,
  FeXoBot: fexobotData,
  FxQuest: fxquestData,
  "Portfolio-Website": portfolioWebsiteData,
};

// Sanity check: every detail slug in the on-disk route mapping should map
// to a data module. This catches typos in either file at startup.
if (process.env.NODE_ENV !== "production") {
  const mappedSlugs = new Set(
    (projectRouteMapping.mappings || []).map((m) => m.urlSlug)
  );
  for (const slug of Object.keys(dataBySlug)) {
    if (!mappedSlugs.has(slug)) {
      // eslint-disable-next-line no-console
      console.warn(`[registry] no project_route_mapping entry for slug "${slug}"`);
    }
  }
}

/** Resolve a project by URL slug. Returns the data module or undefined. */
export function getProjectBySlug(slug) {
  return dataBySlug[slug];
}

/** List of all slugs that have a detail page. */
export const detailSlugs = Object.keys(dataBySlug);

// ── SEO + nav metadata ───────────────────────────────────────────────────
export const seo = seoMetadata;

// ── Build slug from a registry project title (matches the link rule) ──────
export { default as projectRouteMapping } from "../portfolio_data/project_route_mapping.json";

// Re-export the underlying data modules in case a page wants the full record.
export {
  teachbackData,
  fincoreData,
  fullStackTemplateData,
  fedxdDataContainerData,
  fxpyData,
  fexobotData,
  fxquestData,
  portfolioWebsiteData,
};
