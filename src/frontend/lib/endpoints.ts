/**
 * API Endpoints Configuration
 * Centralized API endpoint constants for the application
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const ENDPOINTS = {
  // Matches
  MATCHES: `${API_BASE}/matches`,
  MATCH_DETAIL: (id: string) => `${API_BASE}/matches/${id}`,

  // Predictions/Palpites
  PREDICTIONS: `${API_BASE}/predictions`,
  PREDICTION_DETAIL: (id: string) => `${API_BASE}/predictions/${id}`,
  USER_PREDICTIONS: (userId: string) => `${API_BASE}/users/${userId}/predictions`,

  // Championships
  CHAMPIONSHIPS: `${API_BASE}/championships`,
  CHAMPIONSHIP_DETAIL: (id: string) => `${API_BASE}/championships/${id}`,

  // Users & Auth
  USERS: `${API_BASE}/users`,
  USER_DETAIL: (id: string) => `${API_BASE}/users/${id}`,
  LOGIN: `${API_BASE}/auth/login`,
  SIGNUP: `${API_BASE}/auth/signup`,
  LOGOUT: `${API_BASE}/auth/logout`,

  // Leaderboard
  LEADERBOARD: `${API_BASE}/leaderboard`,

  // Stats
  STATS: `${API_BASE}/stats`,
} as const;

export default ENDPOINTS;
