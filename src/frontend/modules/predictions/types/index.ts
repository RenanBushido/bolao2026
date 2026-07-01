/**
 * Prediction/Palpite related types
 */

export interface Prediction {
  id: string;
  matchId: string;
  userId: string;
  scoreCasa: number;
  scoreVisitante: number;
  isCorrect?: boolean;
  points?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PredictionWithMatch extends Prediction {
  match: {
    id: string;
    timeCasa: { id: string; nome: string; sigla: string };
    timeVisitante: { id: string; nome: string; sigla: string };
    dataHora: string;
    status: 'pending' | 'completed' | 'cancelled';
    placarCasa?: number;
    placarVisitante?: number;
  };
}

export interface CreatePredictionInput {
  matchId: string;
  scoreCasa: number;
  scoreVisitante: number;
}

export interface UpdatePredictionInput {
  scoreCasa: number;
  scoreVisitante: number;
}

export interface PredictionListParams {
  status?: 'pending' | 'completed' | 'incorrect';
  page?: number;
  limit?: number;
}

export interface PredictionListResponse {
  data: PredictionWithMatch[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PredictionStats {
  totalPredictions: number;
  correctPredictions: number;
  accuracy: number;
  totalPoints: number;
  averagePointsPerPrediction: number;
  ranking: number;
  bestStreak: number;
  currentStreak: number;
  byRound: Record<string, {
    total: number;
    correct: number;
    accuracy: number;
    points: number;
  }>;
}
