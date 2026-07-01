# Frontend Development Guide

## Quick Start

### Setup
```bash
cd src/frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build
```bash
npm run build
npm run start
```

## Project Structure

```
src/frontend/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public routes
│   │   ├── page.tsx              # Landing page
│   │   ├── Hero.tsx              # Hero section
│   │   ├── HowItWorks.tsx         # How-it-works guide
│   │   └── RodadaPreview.tsx      # Match preview
│   ├── (auth)/                   # Auth routes (unprotected)
│   │   ├── login/page.tsx         # Login page
│   │   └── signup/page.tsx        # Signup page
│   └── (dashboard)/              # Dashboard routes (protected)
│       ├── layout.tsx             # Protected layout
│       └── palpites/page.tsx      # Predictions page
│
├── components/                   # Reusable React components
│   ├── ui/                       # Atomic UI components
│   │   ├── Button.tsx
│   │   ├── FormInput.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorAlert.tsx
│   │   └── index.ts              # Barrel export
│   └── layout/                   # Layout components
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── LayoutShell.tsx
│       └── index.ts
│
├── modules/                      # Feature modules
│   ├── auth/                     # Authentication
│   │   ├── store/authStore.ts
│   │   ├── hooks/useAuth.ts
│   │   ├── actions/authActions.ts
│   │   ├── types/index.ts
│   │   └── components/
│   ├── matches/                  # Matches/Partidas
│   │   ├── store/matchesStore.ts
│   │   ├── hooks/useMatches.ts
│   │   ├── types/index.ts
│   │   └── components/
│   │       ├── CardPartida.tsx
│   │       ├── InputPalpite.tsx
│   │       └── FormWrapper.tsx
│   └── predictions/              # Predictions/Palpites
│       ├── store/predictionsStore.ts
│       ├── hooks/usePalpite.ts
│       ├── hooks/usePredictions.ts
│       ├── types/index.ts
│       └── components/
│
├── lib/                          # Utilities
│   ├── api-client.ts             # Axios client with interceptors
│   ├── api.ts                    # API configuration
│   ├── types.ts                  # Shared types
│   ├── validation.ts             # Form validation
│   └── hooks/useValidation.ts
│
├── styles/
│   ├── globals.css               # Global styles
│   └── utilities.css             # Utility classes
│
├── public/                       # Static files
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## Key Concepts

### Authentication Flow
1. User creates account on `/signup` or logs in on `/login`
2. `authActions.ts` calls backend API
3. `authStore` saves token and user to state + localStorage
4. Protected routes check `useAuth()` and redirect if needed
5. `apiClient` interceptors add token to all requests

### Data Fetching
1. Pages/components call `useMatches()`, `usePredictions()`, etc.
2. Hooks fetch from API and update Zustand stores
3. Stores cache data with TTL (2-5 minutes)
4. Components get data from store selectors
5. Selectors only cause re-render when specific slice changes

### State Management
Three Zustand stores manage all app state:

**authStore:**
- User info, token, expiry
- Selector: `useAuthUser()`, `useIsAuthenticated()`, `useAuthToken()`

**matchesStore:**
- All matches, loading, error, cache state
- Selector: `useMatches()`, `useMatchesLoading()`, `useMatchesError()`

**predictionsStore:**
- User predictions, stats, cache state
- Selector: `usePredictions()`, `usePredictionStats()`

### Form Validation
1. Create validation rules in `lib/validation.ts`
2. Use `validateLoginForm()` or `validateSignupForm()` 
3. Show field errors in `FormInput` component
4. Clear errors when user types

Example:
```typescript
const errors = validateLoginForm({ email, password });
if (hasErrors) {
  setFieldErrors(errors);
  return;
}
```

### Error Handling
All errors are classified and handled:
- **Network errors**: Show "Connection error" message
- **401 Unauthorized**: Auto-refresh token, redirect to login
- **429 Rate Limited**: Show retry-after message
- **Validation errors**: Show field-specific errors

## Common Tasks

### Add a New Page
1. Create file in `app/(section)/[name]/page.tsx`
2. If authenticated: put in `(dashboard)`
3. If public: put in `(public)`
4. If auth: put in `(auth)`

### Add a New Component
1. If UI component: `components/ui/ComponentName.tsx`
2. If feature: `modules/[feature]/components/ComponentName.tsx`
3. Export in `index.ts` barrel file

### Add a New API Integration
1. Add endpoint to `ENDPOINTS` in `lib/api.ts`
2. Create hook: `modules/[feature]/hooks/useFeature.ts`
3. Create store if needed: `modules/[feature]/store/featureStore.ts`
4. Use in components: `const { data } = useFeature()`

### Add a New Form
1. Create validation rules in `lib/validation.ts`
2. Create page component with form
3. Use `FormInput` for text fields
4. Use `validateForm()` on submit
5. Show errors in form inputs

## Testing

### Unit Tests
```bash
npm run test
```

Tests use Jest and React Testing Library.

Example:
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

Uses Playwright for browser automation.

## Debugging

### Enable Debug Logging
Set environment variable:
```bash
DEBUG=bolao:* npm run dev
```

### Chrome DevTools
1. Open DevTools (F12)
2. Check Console for errors
3. Check Network tab for API calls
4. Check Storage tab for localStorage

### React DevTools
Install React DevTools browser extension to inspect component tree and props.

## Performance

See [PERFORMANCE.md](./PERFORMANCE.md) for detailed optimization guide.

Key practices:
- Use selector hooks for state
- Memoize expensive components
- Implement optimistic updates
- Show loading/error states
- Lazy load images

## Styling

### Tailwind CSS
All styling uses Tailwind CSS v4 with custom tokens.

Configuration in `tailwind.config.ts`:
- Colors: primary, secondary, accent, neutral
- Typography: h1-h6, body, small, xs
- Spacing: 0-10 scale (8px base)

### Dark Mode
Tailwind dark mode is available:
```tsx
<div className="bg-white dark:bg-neutral-900">
  Light and dark background
</div>
```

Enable in browser DevTools or system settings.

## Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_TIMEOUT=30000
```

Variables prefixed with `NEXT_PUBLIC_` are available in browser.

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t bolao-frontend .
docker run -p 3000:3000 bolao-frontend
```

### Manual Hosting
```bash
npm run build
npm run start
```

Builds a production bundle in `.next/` directory.

## Troubleshooting

### "Module not found" errors
- Check import paths use `@/` alias
- Run `npm install` to install dependencies

### API connection errors
- Verify `NEXT_PUBLIC_API_URL` env variable
- Check backend is running
- Check CORS headers

### Token refresh loops
- Check token expiry in `authStore`
- Verify refresh endpoint is working
- Check browser localStorage

### Blank page
- Check browser console for errors
- Check Network tab for failed requests
- Try hard refresh (Ctrl+Shift+R)

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [TypeScript](https://www.typescriptlang.org/docs/)

## Contributing

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and test
3. Commit: `git commit -m "Add new feature"`
4. Push: `git push origin feature/new-feature`
5. Create pull request

Follow CLAUDE.md guidelines for code style.
