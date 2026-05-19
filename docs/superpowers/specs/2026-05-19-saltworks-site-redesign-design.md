# Saltworks Site Redesign — Design Spec
**Date:** 2026-05-19  
**Status:** Approved for implementation

---

## 1. Scope Overview

Two tracks of work:

**Track A — Content & Case Studies (Art Director):**
Create/update all six case study markdown files with full RTF content, structured for scanability. Set intro hero images. Determine optimal sequence.

**Track B — UI/Frontend (Frontend Engineer + Art Director):**
Fix carousel legibility, logo sizing, clients collapse/expand, section backgrounds, leadership images, black bar above footer, footer logo size.

---

## 2. Track A: Case Studies

### 2.1 Content Structure (All Cases)
Each case study uses this five-part narrative arc:
```
[client label + category]
[hero image]
[title]
[result callout — rust color]
[summary]
---
Intro paragraph (1–2 sentences, scene-setter)

## Before
## Inside Looking Out
## Outside Looking In
## After
## So What?   ← where content supports it
```
`h2` headings in `prose-saltworks` are rendered as small olive uppercase labels — perfect for section navigation.

### 2.2 Optimal Case Study Sequence
Ordered to build from dramatic proof → strategic depth → enterprise sophistication:

| Order | Client | Hook |
|-------|--------|------|
| 1 | Parker Guitars | 500% revenue — strongest, most concrete ROI |
| 2 | Grand Banks Yachts | Avoided costly misstep — clear insight payoff |
| 3 | Cessna Aircraft | Complex B2B journey — shows process depth |
| 4 | Road Scholar | Brand reinvention — shows strategic breadth |
| 5 | Wells Fargo | Enterprise alignment — shows institutional scale |
| 6 | TIAA | Life-transition design — shows research sophistication |

`featuredOrder` values: Parker=1, Grand Banks=2, Cessna=3, Road Scholar=4, Wells Fargo=5, TIAA=6.

All six marked `featured: true` so they appear in SelectedWork grid.

### 2.3 Hero Images

| Client | Source | Action |
|--------|--------|--------|
| Parker Guitars | `parker-guitars-hero.jpg` | **Unchanged — do not touch** |
| Grand Banks | `.raw/Grand Banks 1.png` | Copy → `public/images/work/grand-banks-hero.jpg` (replace existing) |
| Cessna Aircraft | `cessna-hero.jpg` (existing) | Use as-is; no burned-in type in the file |
| Road Scholar | `roadscholar-hero.jpg` (existing) | Use as-is; no burned-in type in the file |
| Wells Fargo | No existing image | **Use `hero.jpg` as placeholder hero** pending real asset. Directional brief: muted human-scale office environment, warm neutral tones, no financial clichés (no coins/buildings/handshakes). |
| TIAA | No existing image | **Use `hero-2.jpg` as placeholder hero** pending real asset. Directional brief: quiet moment of human transition — empty desk, open door, personal objects. No financial symbols. |

Thumbnail images: use `*-thumb.jpg` versions where they exist; for Cessna/Road Scholar/Wells Fargo/TIAA create new entries referencing hero as thumbnail (next.js Image will crop/scale).

### 2.4 Featured Work Image Integration
Old-site featured work (Cessna, Road Scholar, Parker) used 250×250 square thumbnails with hover overlays. On the new site, these assets inform the case study body rather than a separate section:
- The existing `cessna-hero.jpg` and `roadscholar-hero.jpg` carry the visual weight as hero images.
- In-body gallery images (e.g., `cessna_04.jpg`) are not embedded in this pass — they'd require a gallery component that doesn't exist yet. This is deferred.
- The "caption" content from the old featured-work cards is incorporated into the case study prose (`Before` and `After` sections).

---

## 3. Track B: UI/Frontend Changes

### 3.1 Section Background Color Scheme
**Approved in visual companion session.**

| Section | Background |
|---------|-----------|
| Nav | transparent (overlays Hero) |
| Hero | `bg-black` |
| About | `bg-[#1a1a1a]` (near-black, separates from Hero) |
| Selected Work | `bg-charcoal` (#292929) — no change |
| Clients | `bg-black` — no change |
| What We Do | `bg-charcoal` (#292929) — add explicit bg |
| The Team | `bg-black` — add explicit bg |
| Contact | `bg-charcoal` — no change |
| Footer | `bg-charcoal`, **remove `mt-20`** |

### 3.2 Carousel Tab Font Legibility
**Problem:** Tabs at 11px with `color: #a1abac` are difficult to read.  
**Old-site reference:** 14px, inactive=`#a1abac`, active=`#be6021`.  
**Fix:**
- Increase font-size from 11px → 13px
- Inactive tab color: `#e4e2db` (cream) — better contrast on `#1a1a1a` bar
- Active tab: keep `#be6021` (rust) + top border indicator
- Keep existing progress bar and interaction behavior

### 3.3 Logo Size
**Problem:** Nav `<Image>` style is commented out — logo renders at intrinsic 480×65, which is too large.  
**Footer:** Height fixed at 36px, too small.  
**Fix:**
- Nav: `height: clamp(24px, 3vw, 38px)`, `width: auto`, `mixBlendMode: "screen"`  
- Footer: `height: clamp(22px, 2.5vw, 32px)`, `width: auto`, keep `mixBlendMode: "screen"`

### 3.4 Clients Section
**Two changes:**
1. **Logo size:** Current cells `min-h-[150px] min-w-[150px]` with max 200×200 are too large. Reduce to match old-site rhythm: cells `~90×90px`, logos `max 100×60px`.
2. **Collapse/Expand:** Show first 18 logos. Remaining 30 hidden behind a "+" toggle (matching old-site pattern). Becomes "−" when expanded. Toggle control uses rust/olive accent.

Implementation: convert `Clients` to a client component (`"use client"`) with `useState` for expanded state. Apply `.hidden` class to logos after index 17 when collapsed.

### 3.5 Leadership Images — Circular Transparency
**Problem:** Drake Pusey and Katie Karatzas use JPEG portrait files (612×792), not the circular transparent PNG files used on the old site.  
**Old-site files:**
- `/old-site/uploads/2020/06/drake_v1.png` (400×400, RGBA, circular crop)
- `/old-site/uploads/2020/06/Katie_v1.png` (400×400, RGBA, circular crop)

**Fix:**
1. Copy both PNGs to `public/images/team/drake-pusey.png` and `public/images/team/katie-karatzas.png`
2. Update `TheTeam.tsx` references: `.jpg` → `.png` for those two members
3. Change image container: remove hard `backgroundColor: "#1a1a1a"` and `overflow-hidden`, add `bg-transparent`. Change `object-cover` → `object-contain` so the circular PNG is not cropped.
4. Paul, Doreen, Carlos, Christine are already correct RGBA PNGs (145×145) — verify they also use `object-contain`.

### 3.6 Black Bar Above Footer
**Root cause:** `<footer className="bg-charcoal mt-20">` — the 80px top margin creates a gap filled by the black `<body>` background between the charcoal Contact section and charcoal Footer.  
**Fix:** Remove `mt-20` from `Footer.tsx`.

### 3.7 Footer Logo Size
Already covered in §3.3 above.

---

## 4. Files to Create/Modify

### New files
- `content/work/cessna-aircraft.md`
- `content/work/road-scholar.md`
- `content/work/wells-fargo.md`
- `content/work/tiaa-financial-services.md`
- `public/images/work/cessna-thumb.jpg` ← already exists ✓
- `public/images/work/roadscholar-thumb.jpg` ← already exists ✓
- `public/images/work/wells-fargo-hero.jpg` ← copy from hero.jpg as placeholder
- `public/images/work/wells-fargo-thumb.jpg` ← same
- `public/images/work/tiaa-hero.jpg` ← copy from hero-2.jpg as placeholder
- `public/images/work/tiaa-thumb.jpg` ← same
- `public/images/team/drake-pusey.png` ← copy from old-site
- `public/images/team/katie-karatzas.png` ← copy from old-site

### Modified files
- `content/work/grand-banks-yachts.md` — update hero/thumb image paths + expand content
- `content/work/parker-guitars.md` — update featuredOrder only
- `public/images/work/grand-banks-hero.jpg` ← replace with Grand Banks 1.png
- `components/sections/Hero.tsx` — tab font size + color
- `components/Nav.tsx` — logo sizing
- `components/sections/AboutSection.tsx` — add `bg-[#1a1a1a]`
- `components/sections/WhatWeDo.tsx` — add `bg-charcoal`
- `components/sections/TheTeam.tsx` — add `bg-black`, fix image handling
- `components/sections/Clients.tsx` — resize logos, add collapse/expand (convert to client)
- `components/Footer.tsx` — remove `mt-20`, fix logo size
