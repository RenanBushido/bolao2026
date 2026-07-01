/**
 * Match and Team related types
 */

export type MatchStatus = 'pending' | 'completed' | 'cancelled';
export type Round = 'GROUP' | 'KNOCKOUT' | 'QUARTER' | 'SEMI' | 'FINAL';

export interface Team {
  id: string;
  nome: string;
  sigla: string;
  bandeira?: string;
  escudo?: string;
  grupo?: string;
  confederacao?: string;
}

export interface Match {
  id: string;
  round: Round;
  group?: string;
  matchNumber: number;
  timeCasa: Team;
  timeVisitante: Team;
  dataHora: string;
  local?: string;
  status: MatchStatus;
  placarCasa?: number;
  placarVisitante?: number;
  createdAt: string;
  updatedAt: string;
}

export interface MatchListParams {
  status?: MatchStatus;
  round?: Round;
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'matchNumber';
  sortOrder?: 'asc' | 'desc';
}

export interface MatchListResponse {
  data: Match[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
