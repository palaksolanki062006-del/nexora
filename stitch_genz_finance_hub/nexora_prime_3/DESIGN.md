---
name: Nexora Prime
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fd'
  surface-container: '#ededf8'
  surface-container-high: '#e7e7f2'
  surface-container-highest: '#e2e2ec'
  on-surface: '#191b23'
  on-surface-variant: '#434654'
  inverse-surface: '#2e3038'
  inverse-on-surface: '#f0f0fb'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#1b55d0'
  primary: '#003594'
  on-primary: '#ffffff'
  primary-container: '#004ac6'
  on-primary-container: '#b8c8ff'
  inverse-primary: '#b4c5ff'
  secondary: '#6750a4'
  on-secondary: '#ffffff'
  secondary-container: '#bba2fd'
  on-secondary-container: '#4b3486'
  tertiary: '#751f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#9c2e02'
  on-tertiary-container: '#ffb9a4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cfbcff'
  on-secondary-fixed: '#22005d'
  on-secondary-fixed-variant: '#4f378a'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59e'
  on-tertiary-fixed: '#3a0b00'
  on-tertiary-fixed-variant: '#842500'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e2e2ec'
  intelligence-blue: '#2563eb'
  deep-slate: '#0b1c30'
  financial-lavender: '#e0d2ff'
  action-green: '#10b981'
  alert-amber: '#f59e0b'
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
  base: 4px
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

The design system embodies the philosophy of **"Premium Technology + Human Clarity,"** specifically tailored for ambitious individuals navigating high-stakes career and financial paths. It balances the steady, authoritative trust of a premium navigator with the vibrant, innovative energy of modern financial intelligence.

The aesthetic is **Modern Corporate Minimalism with Glassmorphic accents.** It rejects the clutter of traditional dashboards in favor of an "Executive Navigator" experience. The atmosphere is calm, intelligent, and spacious, utilizing generous whitespace to reduce cognitive load during complex decision-making. 

**Key Visual Principles:**
- **Spaciousness:** Ample negative space ensures a "premium" breathing room, emphasizing clarity over density.
- **Financial Intelligence:** Modules specifically related to "Nexora Money" utilize subtle gradients and translucent layers to feel like a specialized, integrated high-end feature.
- **Precision & Trust:** Mathematical alignment and cool-toned foundations establish a sense of reliable, data-driven guidance.

## Colors

The palette is anchored in professional trust, using deep blues as the foundation, while introducing sophisticated purples for financial specialized modules.

- **Primary (Intelligence Blue):** The core driver of the brand. Used for navigation, primary actions, and brand-defining moments.
- **Secondary (Nexora Money):** A lavender and purple stack reserved exclusively for financial intelligence modules. This differentiates career navigation from wealth management while maintaining a cohesive family of tones.
- **Neutral Stack:** Deep Slate (#0b1c30) is used for high-contrast typography to provide an authoritative, premium feel. Backgrounds utilize a cool-toned Slate-50 (#f8f9ff) to maintain a sterile, professional environment.
- **Functional Accents:** Action Green is dedicated to success states and "Apply" actions, while Alert Amber is strictly for deadlines and cautionary financial alerts.

**Color Application:**
Use **Intelligence Blue** for standard interface elements. When the user enters the "Nexora Money" context, shift interactive accents to the **Lavender/Purple** palette and introduce subtle purple-tinted glassmorphism.

## Typography

This design system employs a dual-font strategy: **Plus Jakarta Sans** provides the brand's personality and "modern tech" voice, while **Inter** serves as the high-precision engine for data and utility.

- **Headlines:** Use Plus Jakarta Sans with heavy weights (700-800). Tighten letter spacing for larger displays to create an editorial, high-growth startup aesthetic.
- **Interface & Data:** Use Inter for all body copy, labels, and financial data points. Its neutral, systematic nature ensures maximum legibility for dense information.
- **Financial Figures:** Currency and balance displays should match the weight of the surrounding headlines to emphasize financial impact, but remain in the Inter typeface for numeric clarity.

## Layout & Spacing

The layout utilizes a **Fixed Grid** on desktop (12-columns) and a **Fluid Grid** on mobile (4-columns). All spacing is derived from a strict 4px base unit to ensure mathematical precision.

- **Rhythm:** Use `lg` (24px) for standard internal padding within cards to maintain the spacious brand feel.
- **Sectioning:** Use `xl` (40px) or `xxl` (64px) to separate major content groups, reinforcing the minimalist, airy aesthetic.
- **Mobile Reflow:** Margins compress to 16px. Internal card padding must never drop below 16px. Critical data visualizations (like Match Scores or Wealth Balances) should remain prioritized at the top of the scroll order.

## Elevation & Depth

Hierarchy is established through **Ambient Depth** and **Tonal Layering**, with specialized **Glassmorphism** for financial modules.

- **Background:** Surfaces sit on a Slate-50 (#f8f9ff) level-0 plane.
- **Standard Cards:** Use pure White (#ffffff) with a 1px Slate-200 border and a very soft, high-diffusion shadow (`0px 4px 20px rgba(15, 23, 42, 0.05)`).
- **Nexora Money Modules:** Use glassmorphism for financial cards. Apply a 20px backdrop-blur with a 70% white tint and a 1px semi-transparent white border. This makes financial data feel like a "lens" over the career data.
- **Interactive Depth:** Modals use a deeper, multi-layered shadow to indicate high priority, while active elements may feature a subtle glow matching the primary or secondary brand color.

## Shapes

The shape language is **Rounded**, balancing intelligent structure with youthful approachability.

- **Standard Components:** Buttons and Input fields use an 8px radius (`rounded`) for a crisp, professional look.
- **Content Containers:** Opportunity and Financial cards use a 12px radius (`rounded-lg`) to feel substantial and distinct from the background.
- **Interactive Highlights:** Chips, tags, and search bars should be **pill-shaped** to distinguish them as small, tactile interactive elements.

## Components

### Buttons
- **Primary:** Intelligence Blue background with white text. 8px radius.
- **Nexora Money CTA:** Lavender-to-Purple gradient background. Reserved for wealth management actions.
- **Secondary (Success):** Action Green background. Reserved for high-intent actions like "Apply Now."
- **Ghost:** Transparent with an Intelligence Blue stroke and text.

### Cards & Modules
- **Opportunity Cards:** White background, 12px radius, 24px padding. Includes a "Match Score" ring in Intelligence Blue.
- **Money Modules:** Glassmorphic containers with purple accents. Line charts within these modules should feature a subtle "glow" shadow matching the line color.

### Input Fields
- Soft Slate-50 background with a 1px Slate-200 border. On focus, transition to an Intelligence Blue border with a 2px blue ring glow. Labels must always sit above the field using `label-md`.

### Chips & Tags
- Pill-shaped with low-opacity backgrounds (10%) and 100% opacity text of the same hue. Use Intelligence Blue for career tags and Purple for financial categories.

### Progress & Visualization
- Data viz should be sophisticated. Use Intelligence Blue for standard career metrics and Purple/Lavender gradients for money-related growth charts.