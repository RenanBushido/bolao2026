'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import MatchActivityCard, { Match } from '@/components/MatchActivityCard/MatchActivityCard';
import { getUpcomingMatches } from '@/src/mocks/matchData';
import Image from 'next/image';

/**
 * Refined Hero Section for Landing Page
 *
 * Design System: World Cup 2026 Premium Branding
 * - Asymmetrical layout: 60/40 desktop, 50/50 tablet, stacked mobile
 * - Color palette: Navy, Gold, Green, Orange
 * - Typography: Space Grotesk (display) + Inter (body)
 * - Accessibility: WCAG AA compliant, keyboard navigation, reduced motion support
 */
export const Hero = () => {
  // Use mock data during development (phase 1)
  // Phase 2: Replace with API call to `/api/matches`
  const upcomingMatches: Match[] = getUpcomingMatches(2);

  return (
    <section className="relative min-h-screen bg-off-white overflow-hidden">
      {/* Background Accent Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-right gradient accent */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl" />
        {/* Bottom-left gradient accent */}
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* FIFA Logo Badge (Top Right) */}
      <div className="absolute top-6 right-6 z-20 h-12 w-auto flex items-center">
        <div className="text-gray-400 text-xs font-semibold uppercase tracking-widest">FIFA</div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
        <div className="w-full max-w-7xl mx-auto">
          {/* Desktop/Tablet: Two-column layout, Mobile: Single column */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN (60% on desktop, 100% on mobile) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Eyebrow Subtitle */}
              <div className="inline-block">
                <span className="text-sm font-semibold text-orange uppercase tracking-wider">
                  ⚽ Copa do Mundo 2026
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-display-sm md:text-display-md lg:text-display-lg text-navy leading-tight">
                Faça Seus Palpites para a Copa 2026
              </h1>

              {/* Subheading/Description */}
              <p className="font-body text-body-lg md:text-body-lg text-gray-700 max-w-lg leading-relaxed">
                Participe do maior bolão da Copa do Mundo. Faça seus palpites, compita com amigos e conquiste o topo
                do ranking. A emoção começa aqui.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* Primary CTA: Sign Up */}
                <Button
                  className="px-8 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange/90 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 transition-all duration-200"
                  asChild
                >
                  <Link href="/signup">
                    Começar Agora
                    <span className="ml-2">→</span>
                  </Link>
                </Button>

                {/* Secondary CTA: Log In */}
                <Button
                  className="px-8 py-3 border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy/5 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 transition-all duration-200"
                  asChild
                >
                  <Link href="/login">
                    Entrar
                  </Link>
                </Button>
              </div>

              {/* Trust Signals / Stats */}
              <div className="pt-8 border-t border-gray-200 grid grid-cols-3 gap-4">
                <div>
                  <div className="font-display text-display-sm text-orange">64</div>
                  <div className="text-body-sm text-gray-600">Partidas</div>
                </div>
                <div>
                  <div className="font-display text-display-sm text-green">32</div>
                  <div className="text-body-sm text-gray-600">Times</div>
                </div>
                <div>
                  <div className="font-display text-display-sm text-gold">∞</div>
                  <div className="text-body-sm text-gray-600">Emoção</div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (40% on desktop, hidden on mobile/tablet for now) */}
            <div className="hidden lg:col-span-2 lg:flex items-center justify-end">
              <MatchActivityCard matches={upcomingMatches} className="w-full max-w-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Wave/Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
};
