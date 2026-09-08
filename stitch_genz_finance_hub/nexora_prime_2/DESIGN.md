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
  surface-background: '#F8FAFC'
  alert-amber: '#F59E0B'
  border-subtle: '#E2E8F0'
  indigo-depth: '#1E1B4B'
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
    lineHeight: '1.1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  gutter: 24px
  margin-mobile: 16px
  container-max: 1200px
---

## Brand & Style

The design system is centered on the philosophy of **"Premium Technology + Human Clarity,"** specifically tailored for a venture-scale AI aesthetic. It targets high-achieving individuals who require a sophisticated, data-driven navigator for professional growth.

The visual style is **Corporate / Modern** with a strict **Minimalist** lens. It avoids the playful gradients and "bubbly" aesthetics common in EdTech, instead favoring an "Executive Dashboard" feel. The emotional goal is to evoke a sense of calm authority, precision, and reliable intelligence.

**Key Visual Principles:**
- **Calculated Precision:** Every element is placed with mathematical intent, emphasizing alignment and structured hierarchy.
- **Data Maturity:** Information is presented through refined visualizations and high-contrast typography rather than decorative illustrations.
- **Intellectual Calm:** Use of generous whitespace and a cool-toned palette to reduce cognitive load and focus on decision-making.

## Colors

The palette is dominated by **Trustworthy Indigos** and **Professional Teals**, moving away from high-vibrancy "youthful" hues toward a more established, premium spectrum.

- **Primary (Intelligence Blue):** Used for core branding, active navigation, and primary interaction points. It represents the guiding AI logic.
- **Secondary (Deep Slate):** The anchor for high-contrast typography and deep-toned containers. This provides the "premium" weight required for an executive feel.
- **Tertiary (Action Green):** A high-intent accent reserved strictly for success states, growth indicators, and final "Submit/Apply" actions.
- **Neutral:** A slate-tinted gray scale that maintains a cool, technological temperature across the interface.

**Usage Note:** Avoid gradients. Rely on solid fills and purposeful contrast between `Deep Slate` and `Surface Background` to create visual interest.

## Typography

The system employs a high-contrast dual-font strategy.

**Plus Jakarta Sans** functions as the brand's primary voice. It is used exclusively for headlines and display text. Its geometric yet warm construction provides a modern, venture-scale energy. Headlines should utilize tighter letter-spacing to appear more impactful and "editorial."

**Inter** is the workhorse for all functional text, including body copy, data tables, and micro-labels. It ensures maximum legibility across all device types, especially for dense data presentation.

**Formatting Rules:**
- **Headlines:** Use `Deep Slate` for maximum contrast against light backgrounds.
- **Labels:** Use `Uppercase` for `label-md` when used in navigation or category headers to reinforce the "dashboard" aesthetic.
- **Body:** Maintain generous line-heights (1.5+) to ensure readability in long-form content.

## Layout & Spacing

The layout is built on a **12-column Fixed Grid** for desktop and a **4-column Fluid Grid** for mobile. 

**Spacing Rhythm:**
- A strict 4px base unit governs all dimensions. 
- **Internal Padding:** Use `lg` (24px) for all standard card and container padding to maintain the "spacious" premium feel.
- **Section Spacing:** Use `xl` (40px) or `xxl` (64px) to separate major content blocks, ensuring distinct visual breathing room.
- **Grid Gutters:** Fixed at 24px on desktop to prevent visual clutter in data-heavy views.

On mobile devices, page margins are reduced to 16px, but internal component padding must never drop below 16px to ensure touch targets remain accessible and the layout feels "tactile" rather than cramped.

## Elevation & Depth

This design system prioritizes **Tonal Layers** and **Ambient Shadows** to create a structured hierarchy without the use of heavy borders.

- **Base Layer:** The background uses `Surface Background` (#F8FAFC) to feel clean and expansive.
- **Interactive Layer (Cards):** Pure white surfaces lifted by extremely soft, diffused shadows: `0px 4px 20px rgba(15, 23, 42, 0.05)`.
- **Overlay Layer (Modals/Popovers):** Higher elevation with multi-stage shadows: `0px 10px 32px rgba(15, 23, 42, 0.12)`.

**Stroke Usage:** Use 1px `border-subtle` (#E2E8F0) only when a white element sits on a white background, or to define internal separators within a card. Shadows should feel like natural light, never muddy or heavy.

## Shapes

The shape language is **Rounded**, striking a balance between technical structure and human approachability.

- **Structural Elements:** Buttons, input fields, and small UI components utilize a standard **0.5rem (8px)** radius.
- **Content Containers:** Large cards and opportunity modules use **1rem (16px)** to soften the layout and create a premium feel.
- **Utility Elements:** Tags, status chips, and search bars should be **Pill-shaped (full radius)** to distinguish them from structural, layout-defining components.

## Components

### Buttons
- **Primary:** Intelligence Blue background with White text. 8px radius. High impact, high intent.
- **Secondary (Action):** Action Green background. Reserved for final conversion steps like "Apply Now."
- **Ghost:** No background, Intelligence Blue stroke and text. Used for secondary actions (e.g., "Save for Later").

### Opportunity Cards
The central data component. Requires 24px padding. Must feature a `headline-md` title, a metadata row in `label-sm`, and a prominent "Match Score" badge.

### Match Score Indicators
Circular progress indicators using `Primary Blue` for the fill and a light `Slate` for the track. Center the percentage using `headline-md` for high visibility.

### Input Fields
Utilize `Surface Background` for the field fill with a 1px `Slate-200` border. On focus, the border transitions to `Intelligence Blue` with a 2px outer glow. Labels should be placed above the field in `label-md` weight.

### List Items & Action Lists
Clean vertical stacks with 1px bottom separators. Include leading status icons (e.g., `Alert Amber` for pending tasks) and trailing chevrons to indicate interactivity.