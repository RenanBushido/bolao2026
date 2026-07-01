'use client';

import { create } from 'zustand';
import { Match, MatchListParams } from '../types';

interface MatchesStoreState {
  // State
  matches: Match[];
  isLoading: boolean;
  error: string | null;
  lastFetchedAt: number | null;
  cacheExpiry: number; // TTL in milliseconds (default 5 minutes)

  // Actions
  setMatches: (matches: Match[]) => void;
  addMatch: (match: Match) => void;
  updateMatch: (matchId: string, match: Partial<Match>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearCache: () => void;
  isCacheValid: () => boolean;
}

export const useMatchesStore = create<MatchesStoreState>((set, get) => ({
  // Initial state
  matches: [],
  isLoading: false,
  error: null,
  lastFetchedAt: null,
  cacheExpiry: 5 * 60 * 1000, // 5 minutes

  // Actions
  setMatches: (matches: Match[]) => {
    set({
      matches,
      lastFetchedAt: Date.now(),
      error: null,
    });
  },

  addMatch: (match: Match) => {
    set((state) => ({
      matches: [match, ...state.matches],
    }));
  },

  updateMatch: (matchId: string, matchUpdate: Partial<Match>) => {
    set((state) => ({
      matches: state.matches.map((m) =>
        m.id === matchId ? { ...m, ...matchUpdate } : m
      ),
    }));
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearCache: () => {
    set({
      matches: [],
      lastFetchedAt: null,
      error: null,
    });
  },

  isCacheValid: () => {
    const { lastFetchedAt, cacheExpiry } = get();
    if (!lastFetchedAt) return false;
    return Date.now() - lastFetchedAt < cacheExpiry;
  },
}));

/**
 * Selector hooks for optimized subscriptions
 */
export const useMatches = () => useMatchesStore((state) => state.matches);
export const useMatchesLoading = () => useMatchesStore((state) => state.isLoading);
export const useMatchesError = () => useMatchesStore((state) => state.error);
export const useMatchesActions = () =>
  useMatchesStore((state) => ({
    setMatches: state.setMatches,
    addMatch: state.addMatch,
    updateMatch: state.updateMatch,
    setLoading: state.setLoading,
    setError: state.setError,
    clearCache: state.clearCache,
    isCacheValid: state.isCacheValid,
  }));
