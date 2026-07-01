'use client';

import HeroSection from '@/components/hero/HeroSection';
import StatsCard from '@/components/hero/StatsCard';
import { Trophy, Users, Zap, Target } from 'lucide-react';

const Home = () => {
  const stats = [
    { icon: Trophy, number: 48, label: 'Seleções' },
    { icon: Users, number: 12, label: 'Grupos' },
    { icon: Zap, number: 104, label: 'Jogos' },
    { icon: Target, number: 16, label: 'Estádios' },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#101826]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatsCard
                key={stat.label}
                icon={stat.icon}
                number={stat.number}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Próximos Jogos Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#060B16]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Próximos Jogos</h2>
            <a href="#" className="text-[#D4AF37] hover:text-[#E5C158] transition-colors text-sm font-semibold">
              Ver todos →
            </a>
          </div>

          {/* Meta Informações */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[#A0AEC0] text-sm inline-flex w-fit">
              Quinta-feira, 11 de Junho de 2026
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[#D4AF37] text-sm font-bold inline-flex w-fit">
              2 JOGOS
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">🇧🇷</div>
                  <div className="text-2xl">🆚</div>
                  <div className="text-3xl">🇦🇷</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold mb-2">Brasil vs Argentina</div>
                  <div className="text-[#A0AEC0] text-sm">11 de Junho de 2026 • 18:00 UTC</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#101826] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-[#718096] text-sm">
          <p>© 2026 Copa do Mundo FIFA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
