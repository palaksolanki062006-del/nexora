---
name: Luminous Finance
colors:
  surface: '#fdf7ff'
  surface-dim: '#ded8e0'
  surface-bright: '#fdf7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f2fa'
  surface-container: '#f2ecf4'
  surface-container-high: '#ece6ee'
  surface-container-highest: '#e6e0e9'
  on-surface: '#1d1b20'
  on-surface-variant: '#494551'
  inverse-surface: '#322f35'
  inverse-on-surface: '#f5eff7'
  outline: '#7a7582'
  outline-variant: '#cbc4d2'
  surface-tint: '#6750a4'
  primary: '#4f378a'
  on-primary: '#ffffff'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#cfbcff'
  secondary: '#63597c'
  on-secondary: '#ffffff'
  secondary-container: '#e1d4fd'
  on-secondary-container: '#645a7d'
  tertiary: '#765b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#fdf7ff'
  on-background: '#1d1b20'
  surface-variant: '#e6e0e9'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is engineered for the next generation of high-net-worth individuals. It balances the serious nature of wealth management with the vibrant energy of digital-native culture. The aesthetic is **Modern Tech-Premium**, characterized by high-energy gradients, expansive whitespace, and sophisticated glassmorphism.

The UI should feel "viral-ready"—highly polished, visually stimulating, and unmistakably high-end. It rejects the stuffiness of traditional banking in favor of a sleek, fluid experience that prioritizes clarity, speed, and emotional resonance.

**Key Principles:**
- **Kinetic Energy:** Use gradients and subtle motion to suggest growth and momentum.
- **Radical Clarity:** Deep charcoal text against pristine white surfaces ensures critical financial data is never obscured.
- **Tactile Softness:** Over-rounded corners and soft shadows create a friendly, approachable atmosphere despite the professional context.

## Colors

The palette is anchored by a sterile, professional background to provide a canvas for high-chroma interactive elements.

- **Primary (Mint to Teal):** Used for primary actions, growth indicators, and main brand moments. This gradient symbolizes prosperity and fresh starts.
- **Accent (Lavender to Purple):** Reserved for secondary highlights, specialized features (like crypto or savings goals), and premium tier indicators.
- **Neutral Stack:** Use Deep Charcoal (#111827) for high-contrast headlines and Medium Grey (#4B5563) for long-form body copy to maintain legibility without the harshness of pure black.

## Typography

This design system utilizes **Plus Jakarta Sans** for its friendly yet geometric profile, providing the "Modern Tech" feel required for Gen Z appeal. For utility-heavy contexts like data tables and small labels, **Inter** is employed for its unrivaled legibility and systematic precision.

Headlines should use heavy weights (700+) with tight letter-spacing to create a "bold" editorial look. Ensure that currency displays use the same weight as headlines to emphasize financial impact.

## Layout & Spacing

The layout philosophy is **Expansive and Fluid**. Generous whitespace is a core brand pillar, used to reduce cognitive load and convey a sense of "premium" breathing room.

- **Grid:** Use a 12-column grid for desktop with 24px gutters. On mobile, transition to a single-column layout with 20px side margins.
- **Rhythm:** All spacing must be multiples of 8px. Use larger gaps (48px+) between distinct content sections to maintain the airy, high-end feel.
- **Safe Areas:** Cards and containers should have internal padding of at least 24px to prevent content from feeling cramped against rounded edges.

## Elevation & Depth

Hierarchy is established through **Ambient Depth** and **Tonal Layering**.

- **Surface Tiers:** The background is #F9FAFB. Primary containers are pure White (#FFFFFF).
- **Shadows:** Use extremely soft, high-diffusion shadows. A typical "floating" card should use a 20px to 30px blur with only 4-6% opacity, tinted slightly with the primary teal color to integrate with the brand palette.
- **Glassmorphism:** Use for overlays, navigation bars, and "sticky" elements. Apply a 20px backdrop-blur with a 70% white tint and a 1px semi-transparent white border to simulate polished glass.

## Shapes

The shape language is dominated by **Hyper-Rounded geometry**. 

- **Cards:** Use a 24px (1.5rem) radius as the standard for all content containers.
- **Interactive Elements:** Buttons should be fully pill-shaped (100px) to maximize the "friendly" and "tactile" aesthetic.
- **Inputs:** Form fields use a slightly tighter 12px radius to maintain a professional, structured look while remaining cohesive with the broader system.

## Components

### Buttons
- **Primary:** Pill-shaped with the Mint-to-Teal gradient. White text with a subtle drop shadow on the label for readability.
- **Secondary:** White background with a 1.5px border using the Mint-to-Teal gradient. 
- **Tertiary:** Ghost style with Medium Grey text, shifting to a subtle Lavender tint on hover.

### Cards
- Pure white background, 24px corner radius, and a 1px border (#F3F4F6). 
- Active states should feature a subtle glow effect using the Primary Gradient.

### Input Fields
- Soft grey background (#F3F4F6) that transitions to White with a Primary Gradient border on focus. 
- Floating labels using the **Inter** font for maximum clarity.

### Chips & Tags
- Used for transaction categories or stock symbols. Small (12px) radius, using low-opacity versions of the primary/accent colors (e.g., 10% Teal background with 100% Teal text).

### Progress & Charts
- All data visualizations must use the Primary and Accent gradients. Line charts should feature a "glow" effect (drop shadow) matching the line color to enhance the premium tech feel.