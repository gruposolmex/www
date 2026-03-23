# Solmex Unified Design System
**Version 3.0** | "The Sovereign Engine"

---

## 1. Creative North Star: Structural Absolute

This system operates at the intersection of Palantir's data-heavy brutalism and Apple's uncompromising minimalism. Every element feels machined from a single block of graphite. We achieve editorial authority through aggressive 0px radius corners, extreme typographic scale contrast, and tonal layering that replaces the crutch of the 1px divider line.

---

## 2. Color System

### Primary Palette
| Token | HEX | Usage |
|-------|-----|-------|
| `--surface-base` | `#0A0A0A` | Deepest background |
| `--surface` | `#131313` | Primary background |
| `--surface-elevated` | `#1C1B1B` | Low elevation surfaces |
| `--surface-container` | `#201F1F` | Cards, containers |
| `--surface-high` | `#2A2A2A` | Elevated cards, hover |
| `--surface-highest` | `#353534` | Active states, modals |
| `--primary` | `#FF943B` | Solmex Orange — the singular accent |
| `--primary-light` | `#FFBC8D` | Orange for text on dark |
| `--primary-dim` | `#FFB783` | Muted orange |
| `--on-primary` | `#4F2500` | Text on orange backgrounds |
| `--text-primary` | `#E5E2E1` | Primary text (WCAG AA on #131313) |
| `--text-secondary` | `#B0B5BA` | Secondary text (WCAG AA on #131313) |
| `--text-muted` | `#8E9192` | Muted labels |
| `--outline` | `#444748` | Ghost borders at 15% opacity |
| `--error` | `#FFB4AB` | Error states |

### Rules
- Orange is a "laser sight" — use sparingly for CTAs, active states, and data highlights
- Never use pure white (#FFFFFF) for text; use `--text-primary` (#E5E2E1)
- Never use pure black for shadows; tint with surface colors

---

## 3. Typography

### Space Grotesk — Declaration Layer
- Display/Headlines only
- Always UPPERCASE with `letter-spacing: -0.02em` at display sizes
- Weights: Bold 700 (primary), Medium 500 (secondary)
- Use for: hero headlines, section titles, brand statements

### Inter — Intelligence Layer
- Body text and UI elements
- Regular 400 for body, Medium 500 for emphasis, SemiBold 600 for labels
- `line-height: 1.6` for readability against dark backgrounds

### JetBrains Mono — Engine Room
- Data labels, metrics, timestamps, technical identifiers
- Always uppercase with `letter-spacing: 0.05em` - 0.3em
- `font-size: 10px–12px` for labels; larger for metric displays

---

## 4. Structural Rules

### The No-Line Rule
1px solid borders are **prohibited** for sectioning content. Define boundaries through:
1. Tonal shifts between surface tiers
2. Negative space (spacing-16 to spacing-24)
3. Texture transitions (diagonal stripes, dot grids)

### Ghost Border Fallback
When accessibility requires containment: `outline-variant` at **15% opacity** (rgba(68, 71, 72, 0.15))

### 0px Border Radius
No exceptions. Everything is sharp, precise, structural. Not even 2px.

### Left-Aligned Text (The Invisible Spine)
All text anchors to a strong left vertical axis. Center alignment only for final CTA sections.

---

## 5. Signature Textures

### 45-Degree Diagonal Stripes
```css
background-image: repeating-linear-gradient(
  45deg, transparent, transparent 10px,
  rgba(255, 148, 59, 0.05) 10px,
  rgba(255, 148, 59, 0.05) 20px
);
```
Use for: processing states, section backgrounds, hover effects on primary buttons.

### Precision Dot Grid
```css
background-image: radial-gradient(
  circle, rgba(68, 71, 72, 0.4) 1px, transparent 1px
);
background-size: 24px 24px;
```
Use for: hero backgrounds, work areas, technical sections.

---

## 6. Components

### Buttons
- **Primary:** `--primary` background, `--on-primary` text, 0px radius. On hover: diagonal stripe overlay.
- **Secondary:** `--surface-high` background, ghost border. On hover: `--surface-highest`.
- **Text/Tertiary:** `--primary` color, no background, uppercase JetBrains Mono.

### Cards
- No dividers, no rounded corners
- Separation via spacing-6 to spacing-8 and tonal surface shifts
- Optional 4px left accent bar in `--primary` for active/selected state

### Inputs
- `--surface-base` background with 2px bottom-border in `--outline`
- On focus: bottom border transitions to `--primary`
- Label: JetBrains Mono, uppercase, positioned above

---

## 7. Motion Principles
1. **Fast Response:** 100-150ms onset for interactions
2. **Slow Settle:** 200-300ms ease-out for position changes
3. **Staggered Reveals:** 100ms delay between sequential elements on scroll
4. **Counter Animations:** 1.5s ease-out for metric number counting
