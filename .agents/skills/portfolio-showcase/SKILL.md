---
name: portfolio-showcase
description: >-
  Automated skill and workflow for adding or updating web project showcases in the portfolio.
  Handles page discovery, asking the user to confirm target pages/URLs, capturing high-resolution
  clean screenshots (bypassing onboarding tours/tooltips), generating multi-page composite cover
  mockups with the portfolio #FBEAD4 background and brand logo, and updating data/showcase.json.
---

# Portfolio Showcase & Cover Generator Skill

This skill provides a standard, repeatable workflow to capture, compose, and register web projects into the portfolio showcase.

## 🎨 Visual Guidelines & Design Standards
* **Cover Background Color**: `#FBEAD4` (warm beige/peach with ambient radial warmth matching the portfolio).
* **Cover Aspect Ratio & Resolution**: `1200 x 630 px` (Standard 1.91:1 banner ratio).
* **Mockup Layout**: Multi-page composite layout (Main front window centered + 2 perspective angled accent windows on left and right with soft drop shadows).
* **Branding**: Official project logo placed in the top-left corner, project title, subtitle, and badge in the top-right corner.
* **Image Fit**: Cards in carousel must use `object-contain object-center` with `containScroll: false` so no images are cropped.

---

## 🔄 Standard Operating Procedure (Workflow)

### Phase 1: Project Discovery & Page Selection
1. **Analyze Project Repository / URL**:
   - Locate project name, logo file (`public/images/` or `assets/`), tech stack in `package.json`, and routes (`app/` or `src/pages/`).
2. **Mandatory User Confirmation (Ask First)**:
   - **CRITICAL**: Before capturing screenshots, the agent **MUST ALWAYS ASK THE USER** which specific pages, routes, or URLs should be captured.
   - List the discovered candidate routes (e.g. Landing, Dashboard, Features, About, etc.) and let the user pick, confirm, or provide custom URLs/local paths.

### Phase 2: High-Resolution Screenshot Capture
1. Use Puppeteer or the automated capture script (`scripts/capture.mjs`).
2. Set viewport to `1440x900` with `deviceScaleFactor: 2`.
3. **Bypass Onboarding/Tours**:
   - Set localStorage keys (e.g. `has_seen_tour_1_v1`, `tour_completed`).
   - Trigger skip clicks on any `.react-joyride__tooltip` or `[data-action="skip"]` elements.
4. Save raw screenshots to `public/screenshots/<project-slug>/`.

### Phase 3: Multi-Page Cover Mockup Generation
1. Use `scripts/generate-covers.mjs` to render 3–4 thematic multi-window cover slides:
   - **Cover 1**: Core Experience (Landing hero + Dashboard + Key feature)
   - **Cover 2**: Admin / Management Ecosystem (Dashboard + Admin tables + Transactions/Ledger)
   - **Cover 3**: Feature Deep Dive (Detail page + Interactive chart/tree + Tool overlay)
   - **Cover 4**: Public & Interactive Canvas (Virtual 3D / Canvas view + Gate / About)
2. Save generated covers as `cover.png`, `cover_dashboard.png`, `cover_memorial_detail.png`, etc.

### Phase 4: Synchronize Showcase Data
1. Update `data/showcase.json`:
   - Set `title`, `category`, `date`, `role`, `description`.
   - Add all generated cover slides into the `images` array.
   - Populate `techStack`, `stats`, and live `links`.
2. Verify Next.js build with `npm run build`.

---

## 🛠️ Helper Scripts Reference

* `scripts/capture.mjs`: Script to capture clean screenshots from a list of URLs.
* `scripts/generate-covers.mjs`: Template renderer to generate composite multi-window covers with `#FBEAD4` background.
