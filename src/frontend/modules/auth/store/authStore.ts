'use client';

import { create } from 'zustand';
import { User, AuthToken } from '../types';

interface AuthStore {
  // State
  user: User | null;
  token: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User, token: string, expiresIn: number) => void;
  updateUser: (user: User) => void;
  setToken: (token: string, expiresIn: number) => void;
  clearAuth: () => void;
  isTokenExpired: () => boolean;
  shouldRefreshToken: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  token: null,
  expiresAt: null,
  isAuthenticated: false,

  // Actions
  setAuth: (user: User, token: string, expiresIn: number) => {
    const expiresAt = Date.now() + expiresIn * 1000;

    set({
      user,
      token,
      expiresAt,
      isAuthenticated: true,
    });

    // Persist to localStorage as backup
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(user));
      localStorage.setItem('authExpiresAt', expiresAt.toString());
    }
  },

  updateUser: (user: User) => {
    set({ user });

    if (typeof window !== 'undefined') {
      localStorage.setItem('authUser', JSON.stringify(user));
    }
  },

  setToken: (token: string, expiresIn: number) => {
    const expiresAt = Date.now() + expiresIn * 1000;

    set({
      token,
      expiresAt,
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      localStorage.setItem('authExpiresAt', expiresAt.toString());
    }
  },

  clearAuth: () => {
    set({
      user: null,
      token: null,
      expiresAt: null,
      isAuthenticated: false,
    });

    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      localStorage.removeItem('authExpiresAt');
    }
  },

  isTokenExpired: () => {
    const { expiresAt } = get();
    if (!expiresAt) return true;
    return Date.now() > expiresAt;
  },

  shouldRefreshToken: () => {
    const { expiresAt } = get();
    if (!expiresAt) return false;
    // Refresh if token expires in next 5 minutes
    return Date.now() > expiresAt - 5 * 60 * 1000;
  },
}));

/**
 * Selector hooks for optimized component subscriptions
 */
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthToken = () => useAuthStore((state) => state.token);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthActions = () =>
  useAuthStore((state) => ({
    setAuth: state.setAuth,
    updateUser: state.updateUser,
    setToken: state.setToken,
    clearAuth: state.clearAuth,
    isTokenExpired: state.isTokenExpired,
    shouldRefreshToken: state.shouldRefreshToken,
  }));
