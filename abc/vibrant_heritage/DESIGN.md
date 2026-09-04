---
name: Vibrant Heritage
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5a403e'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#8e706d'
  outline-variant: '#e2beba'
  surface-tint: '#b52424'
  primary: '#8f000d'
  on-primary: '#ffffff'
  primary-container: '#b22222'
  on-primary-container: '#ffc8c2'
  inverse-primary: '#ffb4ac'
  secondary: '#5d5f5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e2'
  on-secondary-container: '#636564'
  tertiary: '#00496e'
  on-tertiary: '#ffffff'
  tertiary-container: '#006292'
  on-tertiary-container: '#b1daff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ac'
  on-primary-fixed: '#410003'
  on-primary-fixed-variant: '#92030f'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#cbe6ff'
  tertiary-fixed-dim: '#8fcdff'
  on-tertiary-fixed: '#001e30'
  on-tertiary-fixed-variant: '#004b71'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  indian-red: '#B22222'
  porcelain-white: '#FFFFFF'
  jali-stroke: '#E2E2E2'
  industrial-gray: '#555555'
typography:
  headline-xl:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: 0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.08em
  caption:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  section-gap: 144px
  container-max: 1200px
---

## Brand & Style

The design system evolved into a **Clean Industrial Heritage** aesthetic. It marries the precision and efficiency of industrial design with the soulful patterns of Indian craft. The brand personality is professional, high-contrast, and focused, shifting from the previous warmth to a more authoritative and "Red and White" signature.

The visual direction follows **Minimalism** with **High-Contrast** accents. By utilizing vast amounts of "Porcelain White" space and a singular, powerful "Indian Red," the UI achieves a sense of high-end manufacturing and meticulous detail. The emotional response is one of reliability, prestige, and clinical clarity, while the subtle integration of Jali patterns ensures the cultural narrative remains present as a sophisticated structural layer.

## Colors

The color story is a high-contrast duo designed for impact and professional legibility.

- **Primary (Indian Red):** A deep, professional red used strategically for key calls to action, active states, and critical brand accents. It represents the "heat" and "strength" of the industrial theme.
- **Neutral (Porcelain White):** The core foundation of the system. It is used as the primary background color to create a crisp, sterile, and expansive environment.
- **Secondary (Charcoal):** Reserved for primary typography and structural borders to ground the white space.
- **Pattern Tone (Jali Stroke):** A very light grey or faint red stroke used exclusively for the geometric Jali motifs, ensuring they act as a texture rather than a focal point.

## Typography

This design system continues to use **Montserrat** to maintain its sturdy, geometric, and professional character. The typography is architectural in nature—clean lines and deliberate spacing reflect industrial blueprints.

- **Headlines:** Bold and impactful. Use Indian Red sparingly for top-level headlines to draw the eye, while keeping secondary headlines in Charcoal.
- **Body Text:** Set against Porcelain White, body text utilizes a generous 1.6x line height to ensure maximum readability and "breathability" in the layout.
- **Labels:** Uppercase styling with 0.08em tracking is used for technical labels, buttons, and navigation, reinforcing the precise, industrial feel.

## Layout & Spacing

The layout is governed by a **Fixed Grid** on desktop, emphasizing a curated and engineered structure. 

- **Grid Model:** A 12-column grid with a 1200px container. 
- **Industrial Rhythm:** Spacing is strictly mathematical, built on an 8px base unit. Section gaps are wide (144px) to preserve the "Clean Red and White" aesthetic and prevent visual clutter.
- **Responsive Adaptations:**
  - **Desktop:** Fixed width at 1200px with 80px outer margins.
  - **Tablet:** Fluid 8-column grid with 32px margins.
  - **Mobile:** Fluid 4-column grid with 20px margins.
- **Jali Integration:** Jali patterns are used as structural dividers or subtle background textures. They should be rendered in `jali-stroke` (#E2E2E2) to separate content sections without using solid horizontal lines.

## Elevation & Depth

This design system uses **Low-Contrast Outlines** and **Tonal Layers** to establish hierarchy. It avoids shadows to maintain a flat, industrial look.

- **Structural Outlines:** Elements like cards, inputs, and containers use a 1px Charcoal border at very low opacity (10%) or a 1px `jali-stroke` (#E2E2E2).
- **Active State Depth:** Instead of shadows, active or focused states are indicated by a 2px solid Indian Red border.
- **Layering:** Hierarchy is achieved through the use of Porcelain White on top of very faint grey (#F9F9F9) "Jali-textured" backgrounds.

## Shapes

The shape language is **Rounded (0.5rem)**, providing a subtle "human" touch to the otherwise sharp industrial aesthetic. This softness prevents the high-contrast red and white from feeling too aggressive.

- **Standard UI:** Buttons, cards, and inputs use 0.5rem (8px) corners.
- **Containers:** Large featured containers use 1rem (16px) to define major layout areas.
- **Full Rounding:** Reserved for status indicators and decorative elements.

## Components

- **Buttons:** Primary buttons are solid Indian Red with Porcelain White text. Secondary buttons are Porcelain White with a 1px Indian Red border and Red text.
- **Input Fields:** Pure white backgrounds with a 1px `jali-stroke` border. Focus states trigger a 2px Indian Red border.
- **Cards:** White surfaces with a 1px light grey border. The Jali pattern can be applied to the background of a card's "header" area in a faint 5% opacity red stroke.
- **Chips & Tags:** Small, pill-shaped elements using a very light red tint background with Indian Red text for active tags, or grey for inactive ones.
- **Jali Dividers:** Replace standard horizontal rules with a single row of geometric Jali motifs (dots or diamonds) rendered in a faint grey stroke.
- **Lists:** Items are separated by generous whitespace and a small Indian Red square or diamond bullet, reinforcing the geometric industrial theme.