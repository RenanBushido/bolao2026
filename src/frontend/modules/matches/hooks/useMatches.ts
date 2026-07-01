'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { useMatchesStore, useMatchesActions } from '../store/matchesStore';
import { Match, MatchListParams } from '../types';
import { ENDPOINTS, CACHE_TTL } from '@/lib/api';
import { ApiError } from '@/lib/types';

interface UseMatchesResult {
  matches: Match[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isCacheValid: () => boolean;
}

export const useMatches = (params?: MatchListParams): UseMatchesResult => {
  const { matches, isLoading, error, isCacheValid: storeIsCacheValid } = useMatchesStore();
  const { setMatches, setLoading, setError } = useMatchesActions();
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchMatches = useCallback(async () => {
    if (storeIsCacheValid() && !isRefetching) {
      return; // Use cached data
    }

    try {
      setLoading(true);
      setError(null);

      // Build query string from params
      const queryParams = new URLSearchParams();
      if (params) {
        if (params.status) queryParams.append('status', params.status);
        if (params.round) queryParams.append('round', params.round);
        if (params.page) queryParams.append('page', String(params.page));
        if (params.limit) queryParams.append('limit', String(params.limit));
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
      }

      const url = queryParams.toString()
        ? `${ENDPOINTS.MATCHES_LIST}?${queryParams.toString()}`
        : ENDPOINTS.MATCHES_LIST;

      const response = await apiClient.get<{ data: Match[] }>(url);
      setMatches(response.data.data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch matches');
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  }, [params, storeIsCacheValid, setMatches, setLoading, setError, isRefetching]);

  // Auto-fetch on mount or param change
  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const refetch = useCallback(async () => {
    setIsRefetching(true);
    try {
      await fetchMatches();
    } finally {
      setIsRefetching(false);
    }
  }, [fetchMatches]);

  return {
    matches,
    isLoading,
    error,
    refetch,
    isCacheValid: storeIsCacheValid,
  };
};

/**
 * Fetch a single match
 */
export const useMatch = (matchId: string | null) => {
  const [match, setMatch] = useState<Match | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!matchId) return;

    const fetchMatch = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<Match>(ENDPOINTS.MATCHES_GET(matchId));
        setMatch(response.data);
        setError(null);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'Failed to fetch match');
        console.error('Error fetching match:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatch();
  }, [matchId]);

  return { match, isLoading, error };
};
