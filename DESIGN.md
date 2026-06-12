<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

---
name: Kazim Abbas Portfolio
description: A terminal-native portfolio for a backend developer. Quiet, technical, electric-green accent.
---

# Design System: Kazim Abbas Portfolio

## 1. Overview

**Creative North Star: "The Quiet Terminal"**

The site reads as a developer's instrument panel: dark, calm, and exact. No decoration asks the visitor for attention; the work earns it. The aesthetic borrows from **Linear's marketing** (typographic precision, tight dark UI, monospace accents, every detail considered) and **GitHub's README aesthetic** (markdown-native, code-first, monospace labels, very little chrome). Both are surfaces that trust the content to be the design.

The personality is **Confident. Technical. Calm.** A senior engineer's portfolio, written by a 12th-grader. The accent (electric green) shows up as a deliberate commitment — it is a brand color that does work, not a decoration that asks to be noticed. Motion is earned (state changes, hover feedback, smooth transitions); it is never reflexive (entrance animations on every element, scroll choreography, animated gradient bodies).

This system explicitly rejects the three lanes PRODUCT.md names:
- The **AI dev portfolio template** (gradient text, glow, glassmorphism, 3D tilt, particles, identical glowing stat cards).
- **Designer portfolio affectation** (italic display serifs, drop caps, ruled three-column layouts, magazine-spread reading).
- **LinkedIn / corporate-bro polish** (stock photos of handshakes, leadership headshots, "passionate about innovation" energy, certifications-as-badges, blue-and-gray corporate).

**Key Characteristics:**
- Dark, near-black body — the page is a quiet stage.
- One accent (electric green) used deliberately on 30–60% of the visible surface, not decoratively.
- One sans family carries the whole system; mono is a sibling reserved for the things that ARE code.
- Motion is earned: state changes, hover feedback, smooth transitions. No entrance choreography.
- Career surfaces (Skills, Experience, Education) read as structured information; brand surfaces (Home, About, Projects) carry the voice.

## 2. Colors

**The Committed Accent Rule.** Electric green carries 30–60% of the visible surface. It is the brand. Every other color is supporting — the body, the surface, the ink, the muted text. The accent is a signal, not a theme.

### Primary
- **Terminal Green** (`[oklch lightness/chroma hue — to be resolved during implementation, target ~oklch(0.78 0.20 145)]`): Primary CTA backgrounds, active nav state, the line that names the work (e.g. "Backend Developer"), section dividers/rules, focus rings. The brand.

### Neutral
- **Carbon** (`[oklch near-black, slight chroma toward the green hue, target ~oklch(0.10 0.012 145) — to be resolved]`): Body background. The page sits on carbon. Not pure black.
- **Ink** (`[oklch near-white, target ~oklch(0.96 0.005 145) — to be resolved]`): Body text. High contrast against Carbon; passes WCAG AA at body sizes.
- **Muted** (`[oklch medium, target ~oklch(0.62 0.015 145) — to be resolved]`): Secondary text, metadata, placeholders. Still hits ≥4.5:1 against Carbon — gray text on a colored background is the most common contrast failure in 2026; never weaken past readable.
- **Rule** (`[oklch low-chroma hairline, target ~oklch(0.20 0.010 145) — to be resolved]`): 1px dividers, borders on inputs, hairline rules between sections. Never wider.

### Named Rules
**The Committed Accent Rule.** The accent carries 30–60% of the visible surface. It is the brand. Every other color is supporting.

**The No-Gray-on-Color Rule.** Gray text on the green accent looks washed out. Use a darker shade of the accent's own hue, or a transparency of the text color. Never a desaturated gray.

**The No-Pure-Black Rule.** Carbon has slight chroma toward the brand hue, near-zero. Pure `#000` is the AI default; tinted near-black reads as deliberate.

## 3. Typography

**Display + Body Font:** **Geist Sans** (Vercel) — a single sans family committed at multiple weights. Free, open-source, technical character, distinctive without being loud. Not in the Brand MD reflex-reject list.

**Label/Mono Font:** **Geist Mono** — the sibling mono. Used for code blocks, terminal-shaped callouts, commit hashes, API endpoints, log lines.

**Character:** A single family carries the whole system — no display+body pairing tax. Geist has the optical precision of a modern geometric (slightly humanist warmth) with the technical character of a UI font designed for code. Mono is reserved for the things that ARE code; never for prose.

### Hierarchy
- **Display** (`font-weight: 600`, `font-size: clamp(2.5rem, 6vw, 5rem)`, `line-height: 1.0`, `letter-spacing: -0.04em`): Hero headlines, page titles.
- **Headline** (`font-weight: 600`, `font-size: clamp(1.75rem, 3vw, 2.5rem)`, `line-height: 1.1`, `letter-spacing: -0.02em`): Section headings, project names.
- **Title** (`font-weight: 500`, `font-size: 1.25rem`, `line-height: 1.3`): Subsections, card titles, navigation items.
- **Body** (`font-weight: 400`, `font-size: 1rem`, `line-height: 1.6`, `max-width: 65ch`): Prose, descriptions, project summaries.
- **Label** (`font-weight: 500`, `font-size: 0.875rem`, Geist Mono, no letter-spacing): Metadata, status indicators, terminal-style captions, code-shaped labels.

### Named Rules
**The One Family Rule.** One sans family carries the whole system. The mono is a sibling, not a co-lead.

**The Reserve-The-Mono Rule.** Monospace is reserved for the things that ARE code. It is never used for prose. Geist Mono on a body paragraph is wrong; Geist Mono in a code block or terminal callout is right.

**The Negative-Space Headline Rule.** Display headlines use `text-wrap: balance`, `letter-spacing: -0.04em`, and a `clamp()` ceiling of ≤6rem. Above that the page is shouting; clamp the max.

## 4. Elevation

**The Flat-By-Default Rule.** Surfaces are flat at rest. Depth is conveyed by tonal layering (slightly raised Ink-on-Carbon surfaces for cards, panels, inputs) and the accent color on active states. Shadows appear only as a response to state (hover, focus, active) and are subtle: a 1–2px offset, low opacity, no blur. No glassmorphism. No glow.

### Shadow Vocabulary
- **Hover lift** (`box-shadow: 0 1px 2px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.25)` — to be tuned): Subtle elevation on interactive hover. Never decorative.
- **Focus ring** (2px solid Terminal Green, 2px offset, no blur): High-contrast focus indicator on all interactive elements. Never just an outline-color change.

### Named Rules
**The Flat-By-Default Rule.** Depth is tonal, not shadow. Shadows exist only as a state response.

**The Never-Decorative-Shadow Rule.** A shadow without a state reason is decoration. Strip it.

## 5. Components

*Omitted in seed mode. Re-run `/impeccable document` after the first refactor to populate this section with the actual button, card, input, nav, and chip primitives extracted from the working code.*

## 6. Do's and Don'ts

### Do:
- **Do** use Terminal Green for active nav state, primary CTAs, the line that names the work, and section dividers. Use it deliberately, on 30–60% of any single page's visible surface.
- **Do** reserve Geist Mono for the things that ARE code: code blocks, terminal-shaped callouts, commit hashes, API endpoints, log lines. Use Geist Sans for everything else.
- **Do** make every animation honor `prefers-reduced-motion: reduce`. Provide a crossfade or instant transition as the alternative.
- **Do** verify contrast: body text ≥4.5:1 against Carbon, large text ≥3:1, accent text on body ≥4.5:1. Gray text on the green accent must use a darker shade of the accent's own hue, not a desaturated gray.
- **Do** treat career surfaces (Skills, Experience, Education) as structured information — use the table/list affordance the data calls for. Use brand voice on the entry surfaces (Home, About, Projects).
- **Do** keep body line length 65–75ch. Cap display headlines with `clamp()` at ≤6rem.
- **Do** use real project imagery on Projects and Project Detail (NASA Space Apps screenshot, Discord bot UI, content platform thumbnail). Generic CSS panels where hero photography belongs are a bug.
- **Do** make focus rings high-contrast (2px solid Terminal Green with 2px offset) and visible on every interactive element. Never rely on outline-color change alone.

### Don't:
- **Don't** use gradient text (`background-clip: text` on a gradient background). Decorative, never meaningful. Use a single solid color and let weight/size carry emphasis.
- **Don't** use glassmorphism (`backdrop-filter: blur()`) decoratively. It is a 2023 template tell — banned in PRODUCT.md's first anti-reference.
- **Don't** use 3D tilt, particles, or animated gradient body backgrounds. All three are AI dev portfolio template tells — banned in PRODUCT.md's first anti-reference.
- **Don't** use the same-size icon+heading+text card grid three or more times in a row. Vary the layout per section.
- **Don't** put a small all-caps tracked kicker ("ABOUT", "PROJECTS", "SKILLS") above every section heading. One named kicker as a deliberate brand system is voice; an eyebrow on every section is AI grammar.
- **Don't** use `border-left` or `border-right` >1px as a colored stripe on cards, list items, or callouts. Use full borders, background tints, leading numbers, or nothing.
- **Don't** use the LinkedIn / corporate-bro polish (stock photos of handshakes, leadership headshots, "passionate about innovation" energy, certifications-as-badges, blue-and-gray corporate) — banned in PRODUCT.md's third anti-reference.
- **Don't** use designer portfolio affectation (italic display serifs, drop caps, ruled three-column layouts, magazine-spread reading) — banned in PRODUCT.md's second anti-reference.
- **Don't** use the AI dev portfolio template (gradient text, glow, glassmorphism, 3D tilt, particles, identical glowing stat cards) — banned in PRODUCT.md's first anti-reference.
- **Don't** animate beyond state changes. No entrance choreography on every element, no scroll-driven reveals, no animated gradient body. Motion is earned.
- **Don't** convey information by color alone. Active state, status indicators, and badges pair color with text or shape.
- **Don't** ship without verifying that `prefers-reduced-motion: reduce` is honored end-to-end.
- **Don't** ship without verifying that the theme toggle is keyboard-reachable, labeled, and announces its state.
- **Don't** reach for the saturated reflex fonts (Inter, DM Sans, IBM Plex Sans, Plus Jakarta Sans, Outfit) — see Brand MD reflex-reject list. Geist Sans is the resolved pick.
- **Don't** use Geist Mono on prose. It is a tool, not a costume.
