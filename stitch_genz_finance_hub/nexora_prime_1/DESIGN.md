---
name: Nexora Prime
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006242'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d55'
  on-tertiary-container: '#bdffdb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style

The design system is built on the philosophy of "Premium Technology + Human Clarity." It targets ambitious Indian students (18-25) who require an intelligent, calm, and data-driven navigator for their academic and professional journeys. 

The aesthetic deviates from traditional EdTech by adopting a **Modern Corporate** style infused with **Minimalism**. It emphasizes high-growth startup energy through generous whitespace, precise information density, and a focused color story. The emotional response is one of trust and clarity—moving away from the chaotic "gamification" of learning and toward an "Executive Dashboard" experience for a student's future. 

Key visual principles:
- **Spaciousness:** Ample negative space to reduce cognitive load during complex decision-making.
- **Precision:** Mathematical alignment and consistent internal logic.
- **Intelligence:** Data is presented through sophisticated visualizations rather than colorful, simplified graphics.

## Colors

The palette is anchored in trust and technological sophistication.

- **Intelligence Blue (#2563EB):** The primary driver for brand identity and core interactive elements. It represents the "Navigator" aspect—steady, guiding, and modern.
- **Deep Slate (#0F172A):** Used for primary text and high-contrast containers to establish authority and premium quality.
- **Action Green (#10B981):** A specialized tertiary color reserved for high-intent CTAs, success states, and positive growth indicators.
- **Alert Amber (#F59E0B):** Dedicated to deadlines, reminders, and cautionary status updates.
- **Neutrals:** A range of Slate-tinted grays ensures the interface feels cohesive and cool-toned, avoiding the warmth of "cheap" paper-like interfaces.

Apply **Intelligence Blue** for primary navigation and active states. Use **Deep Slate** for heavy-weight typography to maintain a premium, editorial feel.

## Typography

This design system utilizes a dual-font strategy to balance personality with utility.

**Plus Jakarta Sans** is the voice of the brand. Use it for all headlines and display elements. Its soft but modern curves feel approachable yet professional. High-level headlines should use Bold (700) or ExtraBold (800) weights with slightly tightened letter spacing for a punchy, "startup" look.

**Inter** is the engine of the interface. Use it for body text, data points, and labels. It provides maximum legibility for the 18-25 demographic who consume large amounts of information on mobile devices.

Maintain a strict vertical rhythm by adhering to the defined line heights. For long-form reading (e.g., opportunity descriptions), prioritize `body-lg` to prevent eye strain.

## Layout & Spacing

The layout philosophy is a **Fixed Grid** system for desktop (12-column) and a **Fluid Grid** for mobile (4-column). 

Spacing follows a strict 4px base unit. 
- Use `lg` (24px) for standard padding within cards and containers to maintain the "spacious" feel.
- Use `xl` (40px) to separate distinct content sections or vertical groups.
- Gutters should be consistent at `lg` (24px) on desktop to allow elements breathing room.

On mobile, margins compress to 16px to maximize screen real estate, but internal card padding must never drop below 16px to maintain the premium tactile feel. Reflow rules should prioritize vertical stacking, ensuring that Match Scores and Action Items remain above the fold.

## Elevation & Depth

This design system uses **Ambient Shadows** and **Tonal Layers** to create a sense of organized depth.

- **Level 0 (Background):** Slate-50 (#F8FAFC). Flat, no shadow.
- **Level 1 (Cards/Opportunities):** White (#FFFFFF) with a very soft, diffused shadow: `0px 4px 20px rgba(15, 23, 42, 0.05)`.
- **Level 2 (Modals/Overlays):** White (#FFFFFF) with a deeper, multi-layered shadow to indicate high priority: `0px 10px 32px rgba(15, 23, 42, 0.12)`.

Avoid hard borders. Instead, use thin 1px strokes in a light slate (`#E2E8F0`) only when elements sit on top of an identical white surface. Depth should feel natural, like layers of high-quality paper.

## Shapes

The shape language is defined as **Rounded**, utilizing a consistent 8px-12px radius logic to balance the "intelligent/structured" feel with "youthful/modern" approachability.

- **Base Components (Buttons, Inputs):** 8px (`rounded`).
- **Containers (Cards, Opportunity Cards):** 12px (`rounded-lg`).
- **Feature Elements (Avatars, Search Bars):** 24px+ (`rounded-xl` or Pill-shaped).

Interactive elements like chips and tags should always use a Pill-shape to distinguish them from structural card components.

## Components

### Opportunity Cards
The primary vehicle for data. Cards must include a clear header (Opportunity Name), a secondary metadata row (Date/Location), and a distinct "Match Score" indicator. Padding should be `lg` (24px).

### Match Score Indicators
Circular or semi-circular progress rings using **Intelligence Blue** for high matches and **Neutral Slate** for the track. Use `headline-md` for the percentage text. This is a high-visibility element; it should feel like a premium achievement badge.

### Action Items
List-style elements with a 1px border-bottom separator. Each item should have a trailing icon (chevron) and a leading "Status Icon" (e.g., a clock in **Alert Amber** for pending items, or a check in **Action Green** for completed ones).

### Buttons
- **Primary:** Intelligence Blue background, white text. 8px radius.
- **Secondary (CTA):** Action Green background, white text. Reserved for "Apply Now" or "Submit".
- **Ghost:** Transparent background, Intelligence Blue stroke and text. Used for secondary navigation within cards.

### Input Fields
Soft Slate-50 background with a 1px Slate-200 border. On focus, the border transitions to Intelligence Blue with a subtle 2px blue glow (ring). Labels must always use `label-md` and sit above the field, never inside as placeholders only.