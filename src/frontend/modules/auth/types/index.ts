/**
 * Authentication related types
 */

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  totalPredictions?: number;
  correctPredictions?: number;
  currentRanking?: number;
  points?: number;
}

export interface AuthToken {
  token: string;
  expiresIn: number;
  tokenType?: string;
}

export interface AuthSession extends AuthToken {
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  name: string;
}

export interface AuthError {
  code: string;
  message: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}
