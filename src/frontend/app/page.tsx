import { Hero } from './(public)/Hero';
import { HowItWorks } from './(public)/HowItWorks';
import { RodadaPreview } from './(public)/RodadaPreview';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui';

export const metadata = {
  title: 'Bolão 2026 - Copa do Mundo',
  description: 'Faça seus palpites da Copa do Mundo 2026 e compita pelo ranking com amigos.',
};

function RodadaPreviewSkeleton() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="container-base flex justify-center py-12">
        <LoadingSpinner size="lg" label="Carregando partidas..." />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Rodada Preview Section */}
      <Suspense fallback={<RodadaPreviewSkeleton />}>
        <RodadaPreview />
      </Suspense>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container-base text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Pronto para Começar?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Crie sua conta agora e comece a fazer seus palpites da Copa do Mundo 2026.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Criar Conta
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Entrar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
