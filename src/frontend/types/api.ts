export interface Championship {
  id: string;
  name: string;
  year: number;
}

export interface Team {
  id: string;
  name: string;
  coach?: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  scheduledAt: string;
  phase: string;
  stadiumId?: string;
  homeGoals?: number;
  awayGoals?: number;
}

export interface Prediction {
  id: string;
  userId: string;
  matchId: string;
  predictedResult: string;
  predictedHomeGoals: number;
  predictedAwayGoals: number;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  totalScore: number;
}

export interface LeaderboardUser extends User {
  rank?: number;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  timestamp: string;
}
