# Design System Documentation

**Version:** 1.0  
**Last Updated:** 2026-07-01

This document describes the design tokens and patterns used throughout the Bolão 2026 frontend application.

---

## Color Palette

### Primary Colors (Green)
Used for primary actions, success states, and brand identity.

```
primary-50:   #f0fef4    (lightest)
primary-100:  #dafce8
primary-200:  #b7f8d5
primary-300:  #7ffbb9
primary-400:  #4cef95
primary-500:  #22c55e    (base)
primary-600:  #16a34a
primary-700:  #15803d
primary-800:  #166534
primary-900:  #145231    (darkest)
```

**Usage:**
- `primary-500`: Primary CTA buttons, active states
- `primary-600`: Hover states for primary buttons
- `primary-700`: Active/pressed states
- `primary-50`: Light backgrounds, subtle highlights
- `primary-200`: Borders, subtle accents

### Secondary Colors (Blue)
Used for secondary actions, info messages, and links.

```
secondary-50:   #eff6ff    (lightest)
secondary-100:  #dbeafe
secondary-200:  #bfdbfe
secondary-300:  #93c5fd
secondary-400:  #60a5fa
secondary-500:  #3b82f6   (base)
secondary-600:  #2563eb
secondary-700:  #1d4ed8
secondary-800:  #1e40af
secondary-900:  #1e3a8a   (darkest)
```

**Usage:**
- `secondary-500`: Secondary CTAs, info boxes
- `secondary-600`: Hover states
- Links in text content

### Accent Colors (Amber)
Used for warnings, highlights, and attention-grabbing elements.

```
accent-50:   #fffbeb    (lightest)
accent-100:  #fef3c7
accent-200:  #fde68a
accent-300:  #fcd34d
accent-400:  #fbbf24
accent-500:  #f59e0b   (base)
accent-600:  #d97706
accent-700:  #b45309
accent-800:  #92400e
accent-900:  #78350f   (darkest)
```

**Usage:**
- `accent-500`: Warnings, important information
- `accent-600`: Warning button hover states
- Match statistics highlights

### Neutral Colors (Gray)
Used for text, borders, backgrounds, and disabled states.

```
neutral-50:   #f9fafb    (backgrounds)
neutral-100:  #f3f4f6
neutral-200:  #e5e7eb    (borders)
neutral-300:  #d1d5db
neutral-400:  #9ca3af    (placeholder text)
neutral-500:  #6b7280    (secondary text)
neutral-600:  #4b5563    (body text)
neutral-700:  #374151    (dark text)
neutral-800:  #1f2937    (dark backgrounds)
neutral-900:  #111827    (darkest)
```

**Usage:**
- `neutral-50`: Page backgrounds
- `neutral-100`: Card backgrounds
- `neutral-200`: Borders
- `neutral-600`: Body text
- `neutral-900`: Headings, high contrast text

### Semantic Colors (Not in palette, use existing colors)
- **Success:** Use `primary-500`
- **Error:** Use `accent-600` or create red palette if needed
- **Warning:** Use `accent-500`
- **Info:** Use `secondary-500`

---

## Typography

### Font Family
```
Sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif
Mono: "Monaco", "Courier New", monospace
```

### Type Scale

| Class | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `text-h1` | 48px | 700 | 1.2 | Page titles |
| `text-h2` | 36px | 600 | 1.3 | Section headings |
| `text-h3` | 24px | 500 | 1.4 | Subsection headings |
| `text-h4` | 20px | 500 | 1.4 | Card titles |
| `text-h5` | 16px | 600 | 1.5 | Label headings |
| `text-h6` | 14px | 600 | 1.5 | Small headings |
| `text-body` | 16px | 400 | 1.6 | Body text, paragraphs |
| `text-small` | 14px | 400 | 1.5 | Secondary text |
| `text-xs` | 12px | 400 | 1.5 | Captions, hints |

**Usage:**
```html
<h1 class="text-h1">Page Title</h1>
<p class="text-body">Body text content</p>
<span class="text-small">Secondary information</span>
```

---

## Spacing Scale

All spacing is based on a 8px base unit.

```
0:   0px       (none)
1:   8px       (xs)
2:   16px      (sm)
3:   24px      (md)
4:   32px      (lg)
5:   40px      (xl)
6:   48px      (2xl)
7:   56px      (3xl)
8:   64px      (4xl)
9:   72px      (5xl)
10:  80px      (6xl)
```

**Usage:**
```html
<!-- Padding -->
<div class="p-3">Content with 24px padding</div>

<!-- Margin -->
<div class="mb-2 mt-3">24px margin top, 16px bottom</div>

<!-- Gap in flexbox/grid -->
<div class="flex gap-2">Items with 16px gap</div>
```

### Common Spacing Patterns
- **Section padding:** `p-6` (48px) on desktop, `p-3` (24px) on mobile
- **Component padding:** `p-2` (16px) to `p-4` (32px)
- **Card spacing:** `gap-2` (16px) between elements
- **Section gaps:** `gap-4` (32px) between major sections

---

## Shadow System

```
sm:   0 1px 2px 0 rgba(0, 0, 0, 0.05)
base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
md:   0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
lg:   0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
xl:   0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

**Usage:**
```html
<div class="shadow-base">Default card</div>
<button class="shadow-md hover:shadow-lg">Elevated button</button>
<div class="shadow-lg">Modal overlay</div>
```

---

## Responsive Breakpoints

```
Mobile:  < 640px   (default, no prefix)
SM:      640px     (sm:)
MD:      768px     (md:)
LG:      1024px    (lg:)
XL:      1280px    (xl:)
2XL:     1536px    (2xl:)
```

**Mobile-First Pattern:**
```html
<!-- 1 column on mobile, 2 on tablet, 3 on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## Utility Classes

### Container Utilities

**`.container-fluid`** - Full width with responsive padding
```html
<div class="container-fluid">Responsive padding on all sides</div>
```

**`.container-base`** - Max-width container with centered content
```html
<div class="container-base">Max 80rem width, centered</div>
```

### Section Utilities

**`.section-padding`** - Responsive vertical padding for sections
```html
<section class="section-padding">Content</section>
```
- Mobile: `3rem (24px)` top/bottom
- Tablet: `4rem (32px)` top/bottom
- Desktop: `5-6rem (40-48px)` top/bottom

### Grid Utilities

**`.grid-auto`** - Auto-responsive grid
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Large: 4 columns

```html
<div class="grid-auto">
  <div>Card 1</div>
  <div>Card 2</div>
</div>
```

**`.grid-2`** - Two-column grid
- Mobile: 1 column
- Tablet+: 2 columns

**`.grid-3`** - Three-column grid
- Mobile: 1 column
- Tablet: 2 columns
- Desktop+: 3 columns

---

## Component Patterns

### Buttons

**Primary Button**
```html
<button class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
  Primary Action
</button>
```

**Secondary Button**
```html
<button class="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors">
  Secondary Action
</button>
```

**Ghost Button**
```html
<button class="px-4 py-2 text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors">
  Outline Action
</button>
```

### Cards

**Base Card**
```html
<div class="bg-white rounded-lg shadow-base p-4 border border-neutral-200">
  <h3 class="text-h4 mb-2">Card Title</h3>
  <p class="text-small text-neutral-600">Card content</p>
</div>
```

### Forms

**Input Field**
```html
<div class="mb-3">
  <label class="block text-small font-medium text-neutral-700 mb-1">Label</label>
  <input 
    class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
    placeholder="Enter value"
  />
</div>
```

---

## Accessibility

### Color Contrast
All color combinations meet WCAG AA standards:
- Text on backgrounds: minimum 4.5:1 ratio
- Large text: minimum 3:1 ratio

### Focus States
```html
<button class="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
  Accessible button
</button>
```

---

## Implementation Checklist

- [ ] Use established color palette only
- [ ] Use type scale classes (text-h1, text-body, etc.)
- [ ] Use spacing scale (gap-2, p-3, etc.)
- [ ] Use shadow classes for depth
- [ ] Apply responsive breakpoints (mobile-first)
- [ ] Test color contrast for accessibility
- [ ] Use focus rings for keyboard navigation
- [ ] Verify components on all breakpoints

---

## Future Enhancements

- Dark mode support (add dark: variants)
- Additional color palettes for different themes
- Animation specifications
- Component library with Storybook
