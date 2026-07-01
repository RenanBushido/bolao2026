'use client';

import React from 'react';

interface MatchTeam {
  name: string;
  flag: string;
}

interface MatchOdds {
  team1: number;
  draw: number;
  team2: number;
}

export interface Match {
  id: string;
  team1: MatchTeam;
  team2: MatchTeam;
  date: string;
  status: 'upcoming' | 'live' | 'finished';
  odds?: MatchOdds;
}

interface MatchActivityCardProps {
  matches?: Match[];
  className?: string;
}

/**
 * MatchActivityCard displays upcoming/live World Cup matches.
 * Shows team matchups with odds to create FOMO and drive engagement.
 *
 * Responsive: hidden on mobile, simplified on tablet, full on desktop.
 */
const MatchActivityCard = React.forwardRef<HTMLDivElement, MatchActivityCardProps>(
  ({ matches = [], className = '' }, ref) => {
    const getStatusBadge = (status: Match['status']) => {
      const statusConfig = {
        upcoming: { label: 'Próximo', className: 'bg-gold/20 text-gold' },
        live: { label: 'AO VIVO', className: 'bg-orange text-white animate-pulse' },
        finished: { label: 'Finalizado', className: 'bg-neutral-600/20 text-neutral-600' },
      };
      return statusConfig[status];
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    return (
      <div
        ref={ref}
        className={`${className} bg-navy rounded-lg p-6 border-l-4 border-gold shadow-lg`}
      >
        <h3 className="text-white font-display text-lg mb-4 flex items-center gap-2">
          <span className="text-orange">⚽</span>
          Próximas Partidas
        </h3>

        {matches.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            <p className="text-sm">Carregando partidas...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => {
              const statusInfo = getStatusBadge(match.status);
              return (
                <div
                  key={match.id}
                  className="bg-navy/50 rounded p-3 border border-gold/10 hover:border-gold/30 transition-colors"
                >
                  {/* Status Badge */}
                  <div className={`inline-block text-xs font-semibold px-2 py-1 rounded mb-2 ${statusInfo.className}`}>
                    {statusInfo.label}
                  </div>

                  {/* Match Info */}
                  <div className="text-white mb-2">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm">
                        {match.team1.flag} {match.team1.name}
                      </span>
                      <span className="text-xs text-green font-mono font-semibold">
                        {match.odds ? `${match.odds.team1.toFixed(1)}` : '—'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm">
                        {match.team2.flag} {match.team2.name}
                      </span>
                      <span className="text-xs text-green font-mono font-semibold">
                        {match.odds ? `${match.odds.team2.toFixed(1)}` : '—'}
                      </span>
                    </div>
                  </div>

                  {/* Date & Draw Odds */}
                  <div className="flex justify-between items-center text-xs text-white/60 border-t border-gold/10 pt-2">
                    <span>{formatDate(match.date)}</span>
                    {match.odds && (
                      <span className="text-gold">
                        Draw: <span className="font-mono font-semibold">{match.odds.draw.toFixed(1)}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Argentina Flag Accent */}
        <div className="mt-4 pt-4 border-t border-gold/20 flex items-center gap-2 text-white/60 text-xs">
          <span>🇦🇷</span>
          <span>Defendendo o Título</span>
        </div>
      </div>
    );
  }
);

MatchActivityCard.displayName = 'MatchActivityCard';

export default MatchActivityCard;
