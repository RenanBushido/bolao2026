'use client';

import { create } from 'zustand';
import { Prediction, PredictionStats } from '../types';

interface PredictionsStoreState {
  // State
  predictions: Prediction[];
  stats: PredictionStats | null;
  isLoading: boolean;
  error: string | null;
  lastFetchedAt: number | null;
  cacheExpiry: number; // TTL in milliseconds (default 2 minutes)

  // Actions
  setPredictions: (predictions: Prediction[]) => void;
  addPrediction: (prediction: Prediction) => void;
  updatePrediction: (predictionId: string, prediction: Partial<Prediction>) => void;
  removePrediction: (predictionId: string) => void;
  setStats: (stats: PredictionStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearCache: () => void;
  isCacheValid: () => boolean;
  getPredictionForMatch: (matchId: string) => Prediction | undefined;
}

export const usePredictionsStore = create<PredictionsStoreState>((set, get) => ({
  // Initial state
  predictions: [],
  stats: null,
  isLoading: false,
  error: null,
  lastFetchedAt: null,
  cacheExpiry: 2 * 60 * 1000, // 2 minutes

  // Actions
  setPredictions: (predictions: Prediction[]) => {
    set({
      predictions,
      lastFetchedAt: Date.now(),
      error: null,
    });
  },

  addPrediction: (prediction: Prediction) => {
    set((state) => {
      // Check if prediction for same match already exists
      const filtered = state.predictions.filter(
        (p) => p.matchId !== prediction.matchId
      );
      return {
        predictions: [prediction, ...filtered],
      };
    });
  },

  updatePrediction: (predictionId: string, predictionUpdate: Partial<Prediction>) => {
    set((state) => ({
      predictions: state.predictions.map((p) =>
        p.id === predictionId ? { ...p, ...predictionUpdate } : p
      ),
    }));
  },

  removePrediction: (predictionId: string) => {
    set((state) => ({
      predictions: state.predictions.filter((p) => p.id !== predictionId),
    }));
  },

  setStats: (stats: PredictionStats) => {
    set({ stats });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearCache: () => {
    set({
      predictions: [],
      stats: null,
      lastFetchedAt: null,
      error: null,
    });
  },

  isCacheValid: () => {
    const { lastFetchedAt, cacheExpiry } = get();
    if (!lastFetchedAt) return false;
    return Date.now() - lastFetchedAt < cacheExpiry;
  },

  getPredictionForMatch: (matchId: string) => {
    const { predictions } = get();
    return predictions.find((p) => p.matchId === matchId);
  },
}));

/**
 * Selector hooks for optimized subscriptions
 */
export const usePredictions = () => usePredictionsStore((state) => state.predictions);
export const usePredictionStats = () => usePredictionsStore((state) => state.stats);
export const usePredictionsLoading = () => usePredictionsStore((state) => state.isLoading);
export const usePredictionsError = () => usePredictionsStore((state) => state.error);
export const usePredictionsActions = () =>
  usePredictionsStore((state) => ({
    setPredictions: state.setPredictions,
    addPrediction: state.addPrediction,
    updatePrediction: state.updatePrediction,
    removePrediction: state.removePrediction,
    setStats: state.setStats,
    setLoading: state.setLoading,
    setError: state.setError,
    clearCache: state.clearCache,
    isCacheValid: state.isCacheValid,
    getPredictionForMatch: state.getPredictionForMatch,
  }));
