'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { usePredictionsStore, usePredictionsActions } from '../store/predictionsStore';
import { Prediction, PredictionStats, PredictionListParams } from '../types';
import { ENDPOINTS } from '@/lib/api';
import { ApiError } from '@/lib/types';

interface UsePredictionsResult {
  predictions: Prediction[];
  stats: PredictionStats | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isCacheValid: () => boolean;
}

export const usePredictions = (params?: PredictionListParams): UsePredictionsResult => {
  const { predictions, stats, isLoading, error, isCacheValid: storeIsCacheValid } = usePredictionsStore();
  const { setPredictions, setStats, setLoading, setError } = usePredictionsActions();
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchPredictions = useCallback(async () => {
    if (storeIsCacheValid() && !isRefetching) {
      return; // Use cached data
    }

    try {
      setLoading(true);
      setError(null);

      // Build query string
      const queryParams = new URLSearchParams();
      if (params) {
        if (params.status) queryParams.append('status', params.status);
        if (params.page) queryParams.append('page', String(params.page));
        if (params.limit) queryParams.append('limit', String(params.limit));
      }

      const url = queryParams.toString()
        ? `${ENDPOINTS.PREDICTIONS_LIST}?${queryParams.toString()}`
        : ENDPOINTS.PREDICTIONS_LIST;

      const response = await apiClient.get<{ data: Prediction[] }>(url);
      setPredictions(response.data.data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch predictions');
      console.error('Error fetching predictions:', err);
    } finally {
      setLoading(false);
    }
  }, [params, storeIsCacheValid, setPredictions, setLoading, setError, isRefetching]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchPredictions();
  }, [fetchPredictions]);

  const refetch = useCallback(async () => {
    setIsRefetching(true);
    try {
      await fetchPredictions();
    } finally {
      setIsRefetching(false);
    }
  }, [fetchPredictions]);

  return {
    predictions,
    stats,
    isLoading,
    error,
    refetch,
    isCacheValid: storeIsCacheValid,
  };
};

/**
 * Fetch user statistics
 */
export const usePredictionStats = () => {
  const [stats, setStats] = useState<PredictionStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setStats: setStoreStats } = usePredictionsActions();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<PredictionStats>(ENDPOINTS.STATS_USER);
        setStats(response.data);
        setStoreStats(response.data);
        setError(null);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'Failed to fetch stats');
        console.error('Error fetching stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [setStoreStats]);

  return { stats, isLoading, error };
};
