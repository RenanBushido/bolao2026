# Bolão 2026 - Frontend

Professional landing page for the FIFA World Cup 2026 betting application, built with Next.js 14, TailwindCSS, and Framer Motion.

## Features

- 🎯 **Responsive Design**: Mobile-first approach with support for all devices
- ⚡ **Performance**: Optimized with Next.js 14 (App Router, SSR)
- 🎨 **Beautiful UI**: Custom TailwindCSS design system with reusable components
- 🔄 **Animations**: Smooth transitions with Framer Motion
- 📊 **Real-time Data**: Integrates with backend API for championships and leaderboard
- 🛡️ **Error Handling**: Comprehensive error handling and timeout management
- 📱 **CORS Ready**: Pre-configured CORS support

## Project Structure

```
src/frontend/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout with Navigation and Footer
│   ├── page.tsx        # Home page with all sections
│   ├── globals.css     # Global styles and Tailwind imports
│   └── favicon.ico
├── components/          # Reusable UI components
│   ├── Button.tsx      # Button component
│   ├── Card.tsx        # Card component
│   ├── Navigation.tsx  # Top navigation bar
│   ├── Footer.tsx      # Footer with links
│   ├── Badge.tsx       # Status badges
│   ├── Hero.tsx        # Banner sections
│   ├── Loading.tsx     # Loading spinner
│   ├── Stats.tsx       # Statistics display
│   ├── AnimatedCard.tsx     # Animated card wrapper
│   ├── AnimatedHero.tsx     # Animated hero section
│   ├── AnimatedButton.tsx   # Animated button wrapper
│   └── index.ts        # Component exports
├── lib/
│   ├── api.ts         # API client with timeout and error handling
│   └── cors.ts        # CORS configuration
├── styles/
│   └── utilities.css   # Custom Tailwind utility classes
├── types/
│   └── api.ts         # TypeScript types for API responses
├── tailwind.config.ts  # TailwindCSS custom configuration
├── .env.local         # Environment variables
└── README.md
```

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_TIMEOUT=5000
```

### Development

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Build

```bash
npm run build
npm start
```

## Design System

**Colors**: Green (primary), Blue (secondary), Yellow (accent)  
**Typography**: H1-H6 with responsive scaling  
**Spacing**: 8px grid system  
**Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

## Components

- **Button**: Primary, secondary, outline, ghost variants
- **Card**: With Header, Body, Footer subcomponents
- **Navigation**: Fixed header with responsive menu
- **Footer**: Links and copyright
- **Hero**: Full-height banner sections
- **Badge**: Status indicators
- **Loading**: Animated spinner
- **Stats**: Statistics display grid

## API Integration

- `GET /api/championships` - List tournaments
- `GET /api/leaderboard?top=5` - Top players

Error handling with 5s timeout and user-friendly messages.

## Deployment

### Vercel

```bash
vercel
```

### Docker

```bash
docker build -t bolao-frontend .
docker run -p 3000:3000 bolao-frontend
```

## Testing

Manual testing checklist:
- [ ] Hero animations on load
- [ ] Tournament cards display
- [ ] Leaderboard shows top 5 players
- [ ] Responsive on mobile/tablet/desktop
- [ ] Loading spinner during API calls
- [ ] Error handling if API fails
- [ ] Navigation scrolls to sections

## Troubleshooting

**API Connection Issues**:
- Verify backend is running
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend has CORS enabled

**Build Errors**:
```bash
rm -rf .next node_modules
npm install
npm run build
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS 3
- Framer Motion 10
- Fetch API

## License

MIT
