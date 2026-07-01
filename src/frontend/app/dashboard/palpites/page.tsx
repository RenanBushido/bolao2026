'use client';

import { useState, useCallback } from 'react';
import { useMatches } from '@/modules/matches/hooks/useMatches';
import { CardPartida, InputPalpite, FormWrapper } from '@/modules/matches/components';
import { usePalpite } from '@/modules/predictions/hooks/usePalpite';
import { LoadingSpinner, ErrorAlert, Button } from '@/components/ui';
import type { Match } from '@/modules/matches/types';

type SortOption = 'date-asc' | 'date-desc';
type FilterStatus = 'all' | 'pending' | 'completed';

export default function PalpitesPage() {
  const [sortBy, setSortBy] = useState<SortOption>('date-asc');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { matches, isLoading, error, refetch } = useMatches({
    status: filterStatus === 'all' ? undefined : (filterStatus as any),
    page: currentPage,
    limit: itemsPerPage,
  });

  const { mutate: submitPalpite, isLoading: isSubmitting, error: palpiteError } = usePalpite();

  // Sort matches
  const sortedMatches = [...matches].sort((a, b) => {
    const dateA = new Date(a.dataHora).getTime();
    const dateB = new Date(b.dataHora).getTime();
    return sortBy === 'date-asc' ? dateA - dateB : dateB - dateA;
  });

  const handlePalpite = useCallback(
    async (matchId: string, scoreCasa: number, scoreVisitante: number) => {
      try {
        await submitPalpite(matchId, scoreCasa, scoreVisitante);
      } catch (error) {
        console.error('Error submitting palpite:', error);
      }
    },
    [submitPalpite]
  );

  return (
    <div className="container-base py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Meus Palpites</h1>
        <p className="text-neutral-600">Faça seus palpites e compete no ranking</p>
      </div>

      {/* Alerts */}
      {error && (
        <ErrorAlert
          title="Erro ao carregar partidas"
          message={error}
          variant="error"
          onDismiss={refetch}
        />
      )}

      {palpiteError && (
        <ErrorAlert
          title="Erro ao salvar palpite"
          message={palpiteError}
          variant="error"
        />
      )}

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-base border border-neutral-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Status
            </label>
            <div className="flex gap-2">
              {(['all', 'pending', 'completed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilterStatus(status);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {status === 'all' ? 'Todas' : status === 'pending' ? 'Por começar' : 'Finalizadas'}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Ordenar por
            </label>
            <div className="flex gap-2">
              {(['date-asc', 'date-desc'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === option
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {option === 'date-asc' ? 'Próximas' : 'Antigas'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" label="Carregando partidas..." />
        </div>
      )}

      {/* Matches grid */}
      {!isLoading && sortedMatches.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sortedMatches.map((match) => (
              <CardPartida key={match.id} match={match} isLoading={isSubmitting}>
                {match.status === 'pending' && (
                  <FormWrapper
                    onSubmit={async (formData) => {
                      const scoreCasa = parseInt(formData.get('scoreCasa') as string) || 0;
                      const scoreVisitante = parseInt(formData.get('scoreVisitante') as string) || 0;
                      await handlePalpite(match.id, scoreCasa, scoreVisitante);
                    }}
                    submitLabel="Salvar Palpite"
                    layout="inline"
                  >
                    <InputPalpite
                      name="scoreCasa"
                      team={match.timeCasa.sigla}
                      defaultValue={0}
                    />
                    <span className="px-2 text-neutral-400">×</span>
                    <InputPalpite
                      name="scoreVisitante"
                      team={match.timeVisitante.sigla}
                      defaultValue={0}
                    />
                  </FormWrapper>
                )}
              </CardPartida>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <span className="px-4 py-2 text-neutral-600">Página {currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={sortedMatches.length < itemsPerPage}
              className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </button>
          </div>
        </>
      )}

      {/* Empty state */}
      {!isLoading && sortedMatches.length === 0 && (
        <div className="text-center py-16">
          <p className="text-neutral-600 text-lg mb-4">
            {filterStatus === 'pending'
              ? 'Nenhuma partida disponível para palpites.'
              : 'Nenhuma partida nesta categoria.'}
          </p>
          {filterStatus !== 'all' && (
            <button
              onClick={() => {
                setFilterStatus('all');
                setCurrentPage(1);
              }}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Ver todas as partidas
            </button>
          )}
        </div>
      )}
    </div>
  );
}
