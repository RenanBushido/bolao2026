'use client';

import { ReactNode, memo } from 'react';
import clsx from 'clsx';

export interface Team {
  id: string;
  nome: string;
  sigla: string;
  bandeira?: string;
  escudo?: string;
}

export interface Match {
  id: string;
  timeCasa: Team;
  timeVisitante: Team;
  dataHora: string;
  status: 'pending' | 'completed' | 'cancelled';
  placarCasa?: number;
  placarVisitante?: number;
  local?: string;
}

interface CardPartidaProps {
  match: Match;
  children?: ReactNode;
  isLoading?: boolean;
}

const CardPartidaComponent = ({ match, children, isLoading }: CardPartidaProps) => {
  const isPending = match.status === 'pending';
  const isCompleted = match.status === 'completed';
  const isCancelled = match.status === 'cancelled';

  const matchDate = new Date(match.dataHora);
  const formattedDate = matchDate.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
  const formattedTime = matchDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-base border border-neutral-200 overflow-hidden transition-shadow hover:shadow-md',
        isCancelled && 'opacity-60'
      )}
    >
      {/* Header - Date and Status */}
      <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-200 flex items-center justify-between">
        <div className="text-xs font-medium text-neutral-600">
          <span>{formattedDate}</span>
          <span className="mx-1">•</span>
          <span>{formattedTime}</span>
        </div>

        {/* Status Badge */}
        <div
          className={clsx(
            'inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold',
            isPending && 'bg-blue-100 text-blue-800',
            isCompleted && 'bg-green-100 text-green-800',
            isCancelled && 'bg-neutral-300 text-neutral-700'
          )}
        >
          {isPending && '⏱️ Por começar'}
          {isCompleted && '✓ Finalizado'}
          {isCancelled && '✕ Cancelado'}
        </div>
      </div>

      {/* Body - Match Content */}
      <div className="p-4">
        {/* Teams and Score */}
        <div className="flex items-center justify-between gap-3">
          {/* Home Team */}
          <div className="flex-1 text-center">
            <div className="text-sm font-semibold text-neutral-900 mb-2">
              {match.timeCasa.nome}
            </div>
            {match.timeCasa.escudo && (
              <img
                src={match.timeCasa.escudo}
                alt={match.timeCasa.nome}
                className="w-12 h-12 mx-auto mb-2 object-contain"
              />
            )}
            {isCompleted && match.placarCasa !== undefined && (
              <div className="text-2xl font-bold text-primary-600">
                {match.placarCasa}
              </div>
            )}
          </div>

          {/* VS Badge */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
              {isPending ? 'vs' : '×'}
            </div>
            {match.local && (
              <div className="text-xs text-neutral-600 text-center max-w-[60px]">
                {match.local}
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 text-center">
            <div className="text-sm font-semibold text-neutral-900 mb-2">
              {match.timeVisitante.nome}
            </div>
            {match.timeVisitante.escudo && (
              <img
                src={match.timeVisitante.escudo}
                alt={match.timeVisitante.nome}
                className="w-12 h-12 mx-auto mb-2 object-contain"
              />
            )}
            {isCompleted && match.placarVisitante !== undefined && (
              <div className="text-2xl font-bold text-primary-600">
                {match.placarVisitante}
              </div>
            )}
          </div>
        </div>

        {/* Prediction Input Slot */}
        {isPending && (
          <div className="mt-4 pt-4 border-t border-neutral-200">
            {isLoading ? (
              <div className="flex items-center justify-center py-3">
                <div className="w-4 h-4 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
              </div>
            ) : (
              children
            )}
          </div>
        )}

        {/* Completed Match Info */}
        {isCompleted && (
          <div className="mt-4 pt-4 border-t border-neutral-200 text-center text-xs text-neutral-600">
            Resultado final
          </div>
        )}

        {/* Cancelled Match Info */}
        {isCancelled && (
          <div className="mt-4 text-center text-sm text-neutral-600">
            Partida cancelada
          </div>
        )}
      </div>
    </div>
  );
};

export const CardPartida = memo(CardPartidaComponent);
CardPartida.displayName = 'CardPartida';
