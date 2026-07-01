import React from 'react';
import { Play, Eye } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import HostCountryCard from './HostCountryCard';

const HeroSection = () => {
  const countries = [
    { name: 'Estados Unidos', description: 'País Sede — 11 estádios', emoji: '🇺🇸' },
    { name: 'Canadá', description: 'País Sede — 2 estádios', emoji: '🇨🇦' },
    { name: 'México', description: 'País Sede — 3 estádios', emoji: '🇲🇽' },
  ];

  return (
    <section className="min-h-[80vh] flex items-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 border border-[#D4AF37] rounded-full px-4 py-2">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">COPA DO MUNDO FIFA</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              O Mundo inteiro no seu{' '}
              <span className="bg-gradient-to-r from-[#FFC857] to-[#E5C158] bg-clip-text text-transparent font-black">
                portal
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#A0AEC0] text-lg leading-relaxed max-w-xl">
              Acompanhe jogos, estatísticas, grupos, rankings e simulações completas da Copa do Mundo FIFA 2026 em uma única plataforma.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg">
                <Play className="w-5 h-5" />
                Abrir Simulador
              </Button>
              <Button variant="secondary" size="lg">
                <Eye className="w-5 h-5" />
                Ver Jogos
              </Button>
            </div>
          </div>

          {/* Center Column - Hero Image Placeholder */}
          <div className="hidden lg:flex items-center justify-center relative h-96">
            <div className="absolute w-64 h-64 bg-gradient-to-br from-[#D4AF37] to-[#FFC857] rounded-full blur-3xl opacity-20" />
            <div className="relative text-center">
              <div className="text-8xl">🏆</div>
              <div className="text-4xl font-bold text-[#D4AF37] mt-4">26</div>
            </div>
          </div>

          {/* Right Column - Host Countries */}
          <div className="space-y-4">
            {countries.map((country) => (
              <HostCountryCard
                key={country.name}
                name={country.name}
                description={country.description}
                emoji={country.emoji}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
