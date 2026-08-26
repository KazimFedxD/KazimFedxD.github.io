# Decisions Log

Project decisions worth remembering — architectural choices, trade-offs, and rejected alternatives.

---

## 2026-08-26 19:50 — project-sync skill: global vs project-local

**Decision:** Created the `project-sync` skill at `.claude/skills/project-sync/` (project-local), not at `~/.claude/skills/project-sync/` (global).

**Why:** User explicitly requested project-local placement. Project-local skills scope tightly to this repo's runtime layout (the 7 meta files in `src/portfolio_data/`, `src/data/registry.js`, `src/pages/ProjectDetail.jsx`, `public/screenshots/`, `projects/links.json`) and won't pollute the global skill catalog. Other project-local skills already exist (`brief-to-tasks`, `design-brief`, etc.) confirming the convention.

**Rejected:**
- Global at `~/.claude/skills/project-sync/` — would be available across all repos but the data-layer targets are specific to this portfolio site. Sibling skill `project-documentor` already lives global, but it's reusable across any project (writes to `.website/`), whereas `project-sync` writes to this repo's runtime data.
- Per-project deeper nesting (`.claude/skills/portfolio/project-sync/`) — over-organized for a single skill.

---

## 2026-08-26 19:50 — project-sync skill: scope of field-level sync

**Decision:** Skill syncs ONLY a whitelist of "simple fields" in EXISTING `*-data.js`. Sacred rich-content fields are never overwritten.

**Why:** The data modules are hand-authored with rich `overview.*`, `features[].{whyItMatters, howItWorks, codeSnippets, ...}`, `architecture.services`, `apiEndpoints`, `setupSteps`, `knownIssues`, `futureEnhancements` content. These don't have reliable sources in `.website/metadata.json` (which is a flat JSON summary). Auto-syncing would destroy hours of hand-editing. The skill extracts simple fields from `metadata.json` and leaves rich content untouched.

**Rejected:**
- Full regenerate on every sync — destroys hand-edited detail. The data.js files are 50–90 KB each; this is months of work.
- Strict one-way (metadata.json is source of truth, never data.js) — too rigid. `metadata.json` is the simpler artifact; `data.js` is the rich one.
- Bidirectional merge — too complex for v1; admin still does conflict resolution by hand.

---

## 2026-08-26 19:50 — project-sync skill: idempotency via pre-check + Edit

**Decision:** Every Edit follows a "pre-check then Edit" pattern. Pre-checks parse the file, confirm the addition isn't already present, then skip silently. Edits use unique anchors.

**Why:** Re-running `/project-sync` must produce zero diff (the idempotency test in `00-workflow.md`). Without pre-checks, every Edit appends duplicates. Without unique anchors, Edits match multiple lines and fail or apply incorrectly.

**Rejected:**
- `Write` to rewrite whole files — non-idempotent (whitespace, formatting drift).
- Hash-based diff tracking — too complex; pre-check + Edit is enough.

---

## 2026-08-26 19:50 — project-sync skill: both links.json files

**Decision:** Skill updates BOTH `projects/links.json` AND `src/portfolio_data/links.json` in lockstep (byte-identical).

**Why:** The two files are currently byte-identical but orphaned (no `src/` consumer imports either). Keeping both in sync preserves the option of either consumer existing in the future. Per Agent 2's exploration: "byte-for-byte identical. Both files contain the same seven entries... No consumer imports either."

**Rejected:**
- Update only one and link the other via symlink — fragile across Windows + Linux (this repo is mounted via WSL/9p).
- Delete one and migrate to the other — out of scope for v1, both files exist for a reason the maintainer may remember.
