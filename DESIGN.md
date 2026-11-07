---
# gstack: design-md-format=spec
name: Glen Rio Aristo Portfolio
description: Warm editorial craft on an apricot-linen canvas (#FBE9D4) paired with high-precision technical blueprint specifications inside project, career, and consulting surfaces.
colors:
  primary: "#B45309"
  on-primary: "#FFFDF9"
  surface: "#FFFDF9"
  surface-canvas: "#FBE9D4"
  surface-subtle: "#F5DEC3"
  surface-blueprint: "#0F172A"
  text: "#18130E"
  text-muted: "#645647"
  accent: "#78350F"
  border-subtle: "#E6CDB2"
  success: "#15803D"
  warning: "#D97706"
  error: "#B91C1C"
typography:
  display:
    fontFamily: "Space Grotesk"
    fontWeight: 700
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    letterSpacing: "-0.03em"
  project-display:
    fontFamily: "Rubik Doodle Shadow"
    fontWeight: 400
  body:
    fontFamily: "Inter"
    fontSize: "1rem"
    lineHeight: 1.6
  label:
    fontFamily: "Space Grotesk"
    fontSize: "0.75rem"
    letterSpacing: "0.04em"
  mono:
    fontFamily: "Space Grotesk"
    fontFeature: "tnum"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  xl: "32px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
  input:
    borderColor: "{colors.border-subtle}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
  nav-link:
    textColor: "{colors.text}"
---

# Glen Rio Aristo Portfolio

## Overview

**Creative North Star:** Warm Editorial Craft × Technical Blueprint Precision — an approachable, tactile linen surface that welcomes startup founders, backed by disciplined engineering schematics, tabular metrics, and architecture breakdowns that earn immediate trust from CTOs and hiring managers.
**Product context:** Personal engineering portfolio and B2B technical consulting storefront for Glen Rio Aristo (Senior Fullstack Developer & AI Systems Specialist).
**Mode per surface:**
- **Hero & Impact:** Persuade — communicate production authority, quantified outcomes, and availability within 5 seconds.
- **Services & Booking:** Operate — interactive service-to-booking funnel with concrete deliverables and pre-filled consultation topics.
- **Experience (Case Studies & Career Timeline):** Read & Inspect — filterable project catalog, system architecture highlights, and scannable career history without forcing a PDF download.
**Key characteristics:**
- Tactile apricot-linen background (`#FBE9D4`) paired with crisp ivory paper cards (`#FFFDF9`) and espresso ink (`#18130E`).
- Authoritative display typography (`Bricolage Grotesque` + italic `Instrument Serif` accents) replacing casual doodle fonts.
- Technical colophon and metric badges set in `JetBrains Mono` with `tabular-nums`.
- Interactive service cards that directly pre-fill and scroll to the consultation booking calendar.
- Dual-mode Experience section combining category-filtered Case Studies (Carousel + Blueprint Grid) and an inline Career Track Record timeline.

## Colors

**Strategy:** Committed Warm Palette — the existing signature canvas (`#FBE9D4`) owns the brand identity, while neutrals and borders derive from warm umber and espresso tones rather than washed-out cool grays.
**Light or dark:** Warm daylight editorial by default (matching founders and recruiters reviewing portfolios during work hours), with high-contrast slate blueprint accents (`#0F172A`) for active technical badges and system metadata.

Interaction and emphasis are signaled by Burnt Amber (`#B45309`) transitioning to Deep Roasted Amber (`#78350F`) on hover. Card surfaces use Warm Ivory (`#FFFDF9`) with subtle sand borders (`#E6CDB2`) so containers have crisp definition against the `#FBE9D4` canvas without relying on heavy drop shadows alone.

## Typography

- **Display & Headings (`Space Grotesk`, `next/font/google`):** Primary display font for Hero, Section Headings (`My Services`, `My Experience`, `Ready to scale?`), and technical labels.
- **Project Showcase Titles (`Rubik Doodle Shadow`, `next/font/google`):** Signature expressive display font used specifically for project card titles in the Showcase carousel, mobile cards, and grid view.
- **Body & UI (`Inter`, `next/font/google`):** Clean geometric sans-serif for body copy, project descriptions, and form inputs.

## Layout

- **Max Width:** `1024px` (`max-w-screen-lg`) for focused reading sections; `1280px`–`1400px` for the interactive showcase carousel and multi-column booking studio.
- **Rhythm:** Alternates between warm linen (`#FBE9D4`) and ivory (`#FFFDF9`) sections with smooth gradient transitions, avoiding abrupt horizontal cuts.
- **Escape Hatches:** Carousel views always provide category filter pills, a **Blueprint Grid View** toggle, and a **Career Timeline** tab so visitors are never trapped in sequential wheel scrolling.

## Elevation & Depth

Depth is achieved through layered paper tones (`#FBE9D4` canvas → `#F5DEC3` subtle container → `#FFFDF9` card surface), `1px solid #E6CDB2` structural borders, and soft offset warm shadows (`0 20px 45px -15px rgba(24, 19, 14, 0.08)`). Zero-offset neon halos are never used.

## Shapes

- **Outer containers (Hero, Booking Studio, Showcase Frame):** `32px` (`2rem`) radius.
- **Standard cards (Services, Impact Stats, Grid Case Studies, Timeline Nodes):** `20px`–`24px` radius.
- **Interactive controls (Buttons, Inputs, Time Slots, Filter Pills):** `12px` radius (`inner radius = outer radius - gap`).
- **Metadata & Tech Badges:** `6px` technical radius to distinguish data labels from clickable pill buttons.

## Components

- **Service Bento Cards (`Services.tsx`):** Must display concrete deliverable tags (`JetBrains Mono`) and an interactive CTA ("Book This Service →") that scrolls to `#booking` and pre-fills the consultation topic.
- **Experience Showcase (`Experience.tsx`):** Must provide:
  1. Category filter pills (`All`, `AI & SaaS`, `Enterprise & Mobile`, `EdTech & Games`)
  2. View mode toggle (`Carousel View` vs `Blueprint Grid`)
  3. Top-level tab switcher between **Featured Projects** and **Career Track Record (Work History)**.
- **Booking Studio (`Booking.tsx`):** Supports 1-click service topic selection, pre-filled context from the Services section, and tabular-numeral calendar/time slots.

## Do's and Don'ts

- **Do:** Use `Bricolage Grotesque` for all project and section titles and `JetBrains Mono` for metrics, dates, and tech badges.
- **Do:** Make every card with an arrow icon (`ArrowUpRight`) genuinely interactive with a clear user outcome.
- **Do:** Pair every project showcase with quantifiable impact stats and architectural role clarity.
- **Don't:** Use `Rubik Doodle Shadow` or playful comic/doodle fonts on enterprise or SaaS engineering case studies.
- **Don't:** Trap desktop users in a mandatory horizontal wheel-scroll carousel without a Grid toggle or category filter.
- **Don't:** Use low-contrast cool grays (`text-gray-400`) directly on top of `#FBE9D4` warm cream surfaces.

## Motion

- **Approach:** Intentional — animations guide focus and confirm state transitions without delaying reading.
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for entrance and layout shifts; `ease-out` for micro-interactions.
- **Duration:** Micro (`100ms`), Short (`200ms`), Medium (`350ms`).
- **The one authored moment:** Clicking any Service card smoothly glides the viewport to the Booking Studio, highlights the selected service badge in burnt amber, and populates the consultation agenda automatically.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-11-07 | Initial design system created (`Warm Editorial Craft × Technical Blueprint`) | Created by `/gstack-design-consultation` to align Glen Rio Aristo's signature `#FBE9D4` palette with senior engineering & AI consulting authority, replacing doodle project titles with `Bricolage Grotesque` + `JetBrains Mono` and adding interactive Service-to-Booking, Project Filters, and Career Timeline flows. |
