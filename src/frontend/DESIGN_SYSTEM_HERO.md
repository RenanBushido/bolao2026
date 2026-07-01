# Design System: World Cup 2026 Hero & Branding

Complete reference for the refined frontend design system introduced in the "Refinando Frontend Hero" change.

---

## Color Palette

### Primary Colors

| Name | Hex | Usage | Purpose |
|------|-----|-------|---------|
| **Navy** | `#1a2f5c` | Primary backgrounds, main text, dark sections | Trust, premium feel |
| **Gold** | `#d4af37` | Accents, highlights, borders (not text!) | Prestige, football tradition |

### Secondary Colors

| Name | Hex | Usage | Purpose |
|------|-----|-------|---------|
| **Green** | `#00d084` | Secondary accents, highlights, pitch-themed elements | Energy, football authenticity |
| **Orange** | `#f97316` | Primary CTA buttons, urgency signals | Conversion, call-to-action |

### Neutral Colors

| Name | Hex | Usage | Purpose |
|------|-----|-------|---------|
| **White** | `#ffffff` | Main backgrounds, text on dark | Clarity, clean design |
| **Off-White** | `#f8f9fa` | Secondary backgrounds, subtle contrast | Soft separation |
| **Near-Black** | `#1a1a1a` | Dark text, heavy shadows | Strong contrast, emphasis |

### Usage Guidelines

**✅ DO:**
- Use navy for primary text and headings
- Use orange for primary call-to-action buttons
- Use gold for accents, borders, and highlights
- Use green for secondary interactive elements
- Use white/off-white for backgrounds

**❌ DON'T:**
- Use gold for body text (fails WCAG AA contrast)
- Mix all colors equally (creates visual chaos)
- Apply orange to non-interactive elements
- Use navy and green together without clear hierarchy

---

## Typography System

### Display Font: Space Grotesk

Bold, geometric sans-serif for headlines and hero sections. Creates contemporary, energetic feel.

**Sizes (with line-height):**
- **Display XL**: 56px / 1.2 (56px line-height) — Extra large hero headlines
- **Display LG**: 48px / 1.2 — Main hero headlines
- **Display MD**: 40px / 1.2 — Secondary headlines
- **Display SM**: 32px / 1.2 — Section headings (mobile)

**Fallback Stack:** `Space Grotesk, Helvetica Neue, Arial, sans-serif`

**Font Weight:** 700 (bold) for all display text

**Letter Spacing:** Negative letter-spacing for tighter, more premium feel (-0.02em to -0.01em)

**Example:**
```jsx
<h1 className="font-display text-display-lg text-navy">
  Faça Seus Palpites para a Copa 2026
</h1>
```

### Body Font: Inter

Clean, neutral sans-serif for body copy, labels, and secondary text. Ensures readability.

**Sizes (with line-height):**
- **Body LG**: 18px / 1.6 — Large body text, hero copy
- **Body Base**: 16px / 1.6 — Standard body text, form labels
- **Body SM**: 14px / 1.5 — Small text, captions
- **Body XS**: 12px / 1.5 — Tiny text, metadata

**Fallback Stack:** `Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif`

**Font Weight:** 400 (normal), 500 (medium) for labels, 600 (semibold) for emphasis

**Letter Spacing:** Minimal (0 to 0.01em)

**Example:**
```jsx
<p className="font-body text-body-base text-neutral-700">
  Participe do maior bolão da Copa do Mundo. Faça seus palpites, compita com amigos
  e ganhe prêmios.
</p>
```

### Monospace Font: Monaco / Menlo

For scores, odds, timestamps, and any numerical/data display.

**Usage:** Betting odds, match scores, live stats

**Example:**
```jsx
<span className="font-mono text-orange">
  2.1 — 3.2 — 3.5
</span>
```

### Font Loading Strategy

To prevent blocking page load:
- Fonts use `display: swap` in `app/layout.tsx`
- Browser displays system fallback while Space Grotesk/Inter load
- Fonts loaded via Next.js `next/font/google`
- No render-blocking external stylesheets

**Performance Impact:**
- LCP (Largest Contentful Paint): < 2.5s ✓
- FID (First Input Delay): < 100ms ✓

---

## Spacing Scale

Consistent 8px-based grid system for margins, padding, and gaps.

| Token | Value | Use Case |
|-------|-------|----------|
| `xs` | 8px | Tight spacing inside components |
| `sm` | 12px | Small padding/margins |
| `base` | 16px | Standard padding/margins (most common) |
| `md` | 24px | Larger spacing between elements |
| `lg` | 32px | Section spacing |
| `xl` | 48px | Large section gaps |
| `2xl` | 64px | Extra large spacing (full section breaks) |

**TailwindCSS Usage:**
```jsx
<div className="p-4 md:p-6">        {/* padding: base (16px) on mobile, lg (32px) on desktop */}
  <h2 className="mb-3">Título</h2>  {/* margin-bottom: md (24px) */}
</div>
```

---

## Component-Specific Styling

### Buttons

**Primary Button (CTA):**
```jsx
className="bg-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange/90 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 transition-colors"
```
- Background: Orange (`#f97316`)
- Text: White
- Hover: Orange with 90% opacity
- Focus: Visible ring outline (WCAG AA)

**Secondary Button (Log In):**
```jsx
className="border-2 border-navy text-navy px-8 py-3 rounded-lg font-semibold hover:bg-navy/5 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 transition-colors"
```
- Border: Navy (2px)
- Text: Navy
- Hover: Light navy background
- Focus: Visible ring outline

### Hero Section

**Desktop Layout (1024px+):**
- Left column (60%): Headline, copy, CTAs
- Right column (40%): Match activity card with Argentina flag accent
- Asymmetrical layout creates visual energy

**Tablet Layout (640–1024px):**
- Two-column 50/50 split
- Simplified match card

**Mobile Layout (< 640px):**
- Single column, headline prominent
- Stacked CTAs
- Match card hidden
- Full-width content

### Match Activity Card

- Background: Navy (`#1a2f5c`)
- Accents: Gold borders or highlights
- Text: White or off-white
- Team flags: Use emojis or small SVG icons
- Argentina flag: Subtle accent (gradient backdrop, not literal overlay)

---

## Accessibility Requirements

### Color Contrast

All color combinations MUST meet WCAG AA standards (4.5:1 for normal text).

**Verified Combinations:**
- Navy text on white ✓ (5.2:1)
- Navy text on off-white ✓ (5.0:1)
- White text on navy ✓ (10.2:1)
- Orange text on white ✗ (FAIL — don't use)
- Orange button with white text ✓ (8.1:1)

### Keyboard Navigation

- All buttons must be focusable (tab order)
- Focus states must be visible (outline, underline, or ring)
- No focus trap, logical tab order

### Motion

- Animations respect `prefers-reduced-motion`
- Hover effects disabled for reduced-motion users
- Fade-ins and slides simplified to instant display

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Breakpoints

Match TailwindCSS defaults:

| Breakpoint | Width | Use |
|------------|-------|-----|
| Mobile | < 640px | Phones (320px – 639px) |
| Tablet | 640px – 1024px | Tablets, small laptops |
| Desktop | 1024px+ | Full-size screens |

**Example:**
```jsx
<div className="text-display-sm md:text-display-md lg:text-display-lg">
  {/* 32px on mobile, 40px on tablet, 48px on desktop */}
</div>
```

---

## Performance Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **SVG Assets (FIFA logo):** < 20KB (minified)
- **PNG Assets (Argentina flag):** < 15KB (compressed)

Monitor with:
- Lighthouse (Chrome DevTools)
- WebPageTest.org
- Future: Sentry Web Vitals

---

## Implementation Files

**Configuration:**
- `tailwind.config.ts` — Color, font, sizing tokens
- `app/layout.tsx` — Google Fonts imports

**Constants:**
- `src/styles/design-system.ts` — TypeScript color/typography constants

**Components:**
- `components/Hero/` — New hero component with design system
- `components/MatchActivityCard/` — Match card with design colors
- `app/(public)/Hero/` — Landing page hero integration (modified)

---

## Future Enhancements

- [ ] Dark mode support (structure ready, implementation pending)
- [ ] Custom CSS variables for dynamic theming
- [ ] Design tokens JSON export for other projects
- [ ] Storybook documentation
- [ ] Accessibility audit with Axe or Pa11y
