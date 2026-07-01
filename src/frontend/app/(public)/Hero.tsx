'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Icon */}
        <div className="mb-6 text-7xl animate-bounce" style={{ animationDuration: '3s' }}>
          ⚽
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Bolão da Copa
          <span className="block text-2xl md:text-3xl font-semibold mt-2 text-white/90">
            2026
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          Faça seus palpites, dispute com amigos e conquiste o topo do ranking da Copa do Mundo.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-primary-600 hover:bg-white/90"
            asChild
          >
            <Link href="/signup">Começar Agora</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
            asChild
          >
            <Link href="/login">Entrar</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white">64</div>
            <div className="text-white/70 text-sm mt-1">Partidas</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white">32</div>
            <div className="text-white/70 text-sm mt-1">Times</div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-3xl md:text-4xl font-bold text-white">∞</div>
            <div className="text-white/70 text-sm mt-1">Diversão</div>
          </div>
        </div>
      </div>
    </section>
  );
};
