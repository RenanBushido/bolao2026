'use client';

import { LoadingSpinner, ErrorAlert } from '@/components/ui';
import { CardPartida } from '@/modules/matches/components';
import { useMatches } from '@/modules/matches/hooks/useMatches';

export const RodadaPreview = () => {
  const { matches, isLoading, error } = useMatches({
    status: 'pending',
    limit: 4,
  });

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="container-base">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Próximas Partidas
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Faça seus palpites para as próximas partidas da Copa do Mundo 2026.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" label="Carregando partidas..." />
          </div>
        )}

        {/* Error state */}
        {error && (
          <ErrorAlert
            title="Erro ao carregar partidas"
            message={error}
            variant="error"
          />
        )}

        {/* Matches grid */}
        {!isLoading && !error && matches.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {matches.slice(0, 4).map((match) => (
              <CardPartida key={match.id} match={match} />
            ))}
          </div>
        )}

        {/* No matches state */}
        {!isLoading && !error && matches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">
              Nenhuma partida disponível no momento.
            </p>
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-neutral-600 mb-4">
            Faça login para fazer seus palpites e competir pelo ranking.
          </p>
        </div>
      </div>
    </section>
  );
};
