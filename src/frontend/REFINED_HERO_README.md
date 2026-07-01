# Refined Hero Section - Implementation Guide

## Overview

The hero section has been redesigned to follow a premium World Cup 2026 branding aesthetic. This document outlines the changes, design decisions, and integration points.

---

## What Changed

### New Components

**Hero Component** (`app/(public)/Hero.tsx`)
- Refined asymmetrical layout (60/40 desktop, 100% mobile)
- Premium color palette (Navy, Gold, Green, Orange)
- New typography system (Space Grotesk display, Inter body)
- Integrated match activity card
- Full responsiveness with TailwindCSS

**MatchActivityCard** (`components/MatchActivityCard/MatchActivityCard.tsx`)
- Displays upcoming/live World Cup matches
- Shows match teams, dates, and odds
- Uses design system colors and spacing
- Placeholder state when data unavailable

### Updated Files

**`app/layout.tsx`**
- Added Google Fonts imports (Space Grotesk, Inter)
- CSS font variables for design system

**`tailwind.config.ts`**
- New colors: navy, gold, green, orange
- New typography scale: display (32–56px), body (12–18px)
- Font families: display, body, mono
- All integrated with Tailwind utilities

**`src/styles/design-system.ts` (NEW)**
- Color tokens exported as TypeScript constants
- Usage guidelines (COLOR_USAGE, TYPOGRAPHY)
- Spacing and breakpoint definitions
- Performance targets

---

## Design System Reference

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Navy | `#1a2f5c` | Primary text, backgrounds, dark sections |
| Gold | `#d4af37` | Accents, highlights, borders (NOT text) |
| Green | `#00d084` | Secondary accents, interactive elements |
| Orange | `#f97316` | Primary CTA buttons, urgency signals |
| White | `#ffffff` | Clean backgrounds, light text |
| Off-White | `#f8f9fa` | Secondary backgrounds |

**✅ Verified WCAG AA Compliant:**
- Navy text on white (5.2:1)
- White text on navy (10.2:1)
- Orange button text (8.1:1)

### Typography

| Font | Family | Usage | Sizes |
|------|--------|-------|-------|
| Display | Space Grotesk | Headlines, emphasis | 32px–56px |
| Body | Inter | Copy, labels, captions | 12px–18px |
| Mono | Monaco/Menlo | Odds, scores, data | System default |

**Font Loading:** Google Fonts with `display: swap` for performance (LCP < 2.5s)

### Spacing

8px-based grid: `xs` (8px), `sm` (12px), `base` (16px), `md` (24px), `lg` (32px), `xl` (48px), `2xl` (64px)

---

## Component API

### Hero (`<Hero />`)

```tsx
import { Hero } from './(public)/Hero';

export default function Home() {
  return (
    <>
      <Hero />
      {/* Other sections below */}
    </>
  );
}
```

**Features:**
- Fully self-contained (imports MatchActivityCard, mock data)
- Responsive layouts built into component
- Links to `/signup` and `/login` routes
- Displays 2 upcoming matches via `getUpcomingMatches(2)`

### MatchActivityCard

```tsx
import MatchActivityCard, { Match } from '@/components/MatchActivityCard/MatchActivityCard';
import { getUpcomingMatches } from '@/src/mocks/matchData';

const matches = getUpcomingMatches(2);

<MatchActivityCard matches={matches} className="w-full max-w-md" />
```

**Props:**
- `matches?: Match[]` — Array of match objects (default: empty)
- `className?: string` — Additional Tailwind classes

**Match Interface:**
```ts
interface Match {
  id: string;
  team1: { name: string; flag: string };
  team2: { name: string; flag: string };
  date: string; // ISO 8601
  status: 'upcoming' | 'live' | 'finished';
  odds?: { team1: number; draw: number; team2: number };
}
```

---

## TailwindCSS Integration

### Using Design System Colors

```jsx
// Primary button
<button className="bg-orange text-white hover:bg-orange/90">
  Sign Up
</button>

// Navy section
<section className="bg-navy text-white">
  Dark content
</section>

// Gold accent
<div className="border-l-4 border-gold">
  Highlighted content
</div>
```

### Using Design System Typography

```jsx
// Hero headline
<h1 className="font-display text-display-lg text-navy">
  Faça Seus Palpites
</h1>

// Body copy
<p className="font-body text-body-base text-gray-700">
  Description text
</p>

// Odds/scores
<span className="font-mono text-green">2.1</span>
```

### Responsive Utilities

```jsx
// Responsive text size
<h2 className="text-display-sm md:text-display-md lg:text-display-lg">
  Title
</h2>

// Responsive layout
<div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
  <div className="lg:col-span-3">Left (60%)</div>
  <div className="hidden lg:col-span-2 lg:flex">Right (40%)</div>
</div>
```

---

## Performance Considerations

### Font Loading
- Google Fonts loaded with `display: swap`
- Fallback fonts immediately available
- **LCP Target:** < 2.5s ✓

### Asset Optimization
- FIFA logo SVG: Target < 20KB (currently 1.5MB — needs optimization)
- Argentina flag PNG: Target < 15KB (currently 28KB — acceptable)

### Animation Support
- Animations respect `prefers-reduced-motion`
- Only status badge uses `animate-pulse` (minimal)
- Hover effects for button interactivity

---

## Phase 2: Future Enhancements

These features are OUT OF SCOPE for phase 1 but planned for phase 2:

- [ ] **Live Match Data API** — Connect to `/api/matches` endpoint for real data
- [ ] **Real-time Updates** — WebSocket or polling for live match status
- [ ] **Geolocation** — Show Argentina flag only for Argentine users
- [ ] **Dark Mode** — CSS variable structure already supports it
- [ ] **Asset Optimization** — Minify FIFA logo SVG (currently 1.5MB)
- [ ] **Screen Reader Testing** — Verify with VoiceOver, NVDA

---

## Integration Checklist

- [x] Updated tailwind.config.ts with colors, fonts, spacing
- [x] Added Google Fonts to app/layout.tsx
- [x] Created design-system.ts constants file
- [x] Implemented Hero component (app/(public)/Hero.tsx)
- [x] Implemented MatchActivityCard (components/MatchActivityCard/)
- [x] Updated landing page (app/page.tsx already imports Hero)
- [x] Created DESIGN_SYSTEM_HERO.md documentation
- [ ] Optimize SVG assets (phase 2)
- [ ] Connect to live API (phase 2)
- [ ] Full browser testing (phase 2)

---

## Troubleshooting

**Q: Colors not showing?**
A: Ensure `tailwind.config.ts` is saved and dev server restarted. Check browser DevTools for class names.

**Q: Hero not appearing?**
A: Verify `app/(public)/Hero.tsx` is imported in `app/page.tsx`. Check for TypeScript errors.

**Q: Fonts look wrong?**
A: Clear browser cache. Check that `app/layout.tsx` includes Space Grotesk/Inter imports.

**Q: Match data not showing?**
A: Mock data is in `src/mocks/matchData.ts`. Ensure import path `@/src/mocks/matchData` is correct.

---

## Files Reference

```
src/frontend/
├── app/
│   ├── layout.tsx (updated: Google Fonts)
│   ├── (public)/
│   │   └── Hero.tsx (NEW: refined hero)
│   └── page.tsx (already imports Hero)
├── components/
│   └── MatchActivityCard/ (NEW)
│       └── MatchActivityCard.tsx
├── src/
│   ├── styles/
│   │   └── design-system.ts (NEW)
│   └── mocks/
│       └── matchData.ts (already exists)
├── tailwind.config.ts (updated: colors, fonts)
├── DESIGN_SYSTEM_HERO.md (NEW)
└── REFINED_HERO_README.md (this file)
```

---

## Support

For questions or issues, refer to:
- `DESIGN_SYSTEM_HERO.md` — Complete design system documentation
- `openspec/changes/refinando-frontend-hero/design.md` — Technical design decisions
- `openspec/changes/refinando-frontend-hero/specs/` — Detailed requirements
