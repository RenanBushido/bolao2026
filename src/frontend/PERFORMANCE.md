# Performance Optimization Guide

## Overview

This guide documents performance optimizations implemented in the Bolão 2026 frontend application.

## Implemented Optimizations

### 1. State Management Optimization (Zustand Selectors)
**Location:** `modules/*/store/*Store.ts`

All Zustand stores use selector hooks to prevent unnecessary re-renders:
```typescript
// Good - only re-renders when this specific slice changes
const matches = useMatches();
const isLoading = useMatchesLoading();

// Avoid - causes re-render on any state change
const { matches, isLoading } = useMatchesStore();
```

**TTL:** Stores implement cache validation with 2-5 minute TTLs to reduce API calls.

### 2. Component Memoization
**Location:** `components/ui/*` and `modules/*/components/*`

Key components are memoized to prevent unnecessary re-renders:
- `Button`, `FormInput`, `Modal` - UI components
- `CardPartida` - Match card display
- `Navbar`, `Footer` - Layout components

Wrap with `React.memo()` for expensive components:
```typescript
export const ExpensiveComponent = memo(({ data }) => {
  return <div>{data}</div>;
});
```

### 3. Callback Memoization
**Location:** Throughout hooks and page components

Use `useCallback` to maintain function references across renders:
```typescript
const handleSubmit = useCallback(
  async (formData) => {
    // Handle submission
  },
  [dependency1, dependency2]
);
```

Examples:
- Dashboard filtering/sorting callbacks
- Form submission handlers
- API mutation callbacks

### 4. Optimistic UI Updates
**Location:** `modules/predictions/hooks/usePalpite.ts`

API mutations immediately update local state before server response:
```typescript
// Optimistically add prediction to store
addPrediction(prediction);

// API call happens in background
await submitPalpite(matchId, scoreCasa, scoreVisitante);
```

Benefits:
- Instant feedback to user
- Automatic rollback on error
- Better perceived performance

### 5. Loading and Error States
**Location:** All pages and components

Proper async state handling prevents UI blocking:
```typescript
{isLoading && <LoadingSpinner />}
{error && <ErrorAlert error={error} />}
{!isLoading && !error && <Content />}
```

### 6. Code Splitting (Next.js Native)
**Location:** Route-based code splitting

Next.js App Router automatically splits code by route:
- `(public)/` - Landing page bundle
- `(auth)/` - Auth pages bundle
- `(dashboard)/` - Dashboard bundle

Each bundle only loads when route is accessed.

## Recommended Additional Optimizations

### Image Optimization
```typescript
import Image from 'next/image';

// Automatic optimization: lazy loading, responsive images
<Image 
  src="/team-crest.png" 
  alt="Team crest"
  width={40}
  height={40}
/>
```

### Dynamic Imports
```typescript
import dynamic from 'next/dynamic';

// Load component only when needed
const Modal = dynamic(() => import('./Modal'), { 
  loading: () => <LoadingSpinner /> 
});
```

### Virtualization for Large Lists
For the match grid with 64+ items, consider:
```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={matches.length}
  itemSize={300}
>
  {({ index, style }) => (
    <CardPartida style={style} match={matches[index]} />
  )}
</FixedSizeList>
```

### HTTP Caching Headers
Configure in `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'max-age=60, stale-while-revalidate=3600' }
      ]
    }
  ];
}
```

## Monitoring Performance

### Lighthouse
Run Lighthouse in Chrome DevTools:
1. Open DevTools (F12)
2. Click "Lighthouse" tab
3. Click "Analyze page load"

Targets:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Web Vitals
The app logs Web Vitals in development:
```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

Target metrics:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Bundle Analysis
Run bundle analysis:
```bash
npm run build
npm run analyze  # or npm install --save-dev @next/bundle-analyzer
```

## Performance Checklist

- [ ] Use selector hooks for state access
- [ ] Memoize expensive components
- [ ] Use useCallback for event handlers
- [ ] Implement optimistic updates for mutations
- [ ] Show loading and error states
- [ ] Lazy load images with next/image
- [ ] Code-split with dynamic imports
- [ ] Monitor Lighthouse scores
- [ ] Check Web Vitals in production
- [ ] Analyze bundle size

## Resources

- [Next.js Performance](https://nextjs.org/learn/foundations/how-nextjs-works/rendering)
- [React Optimization](https://react.dev/reference/react/memo)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
