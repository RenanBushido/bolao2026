'use client';

import { useCallback, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { usePredictionsStore, usePredictionsActions } from '../store/predictionsStore';
import { useMatchesStore } from '@/modules/matches/store/matchesStore';
import { Prediction, CreatePredictionInput, UpdatePredictionInput } from '../types';
import { ENDPOINTS } from '@/lib/endpoints';
import { ApiError } from '@/lib/types';

interface UsePalpiteResult {
  mutate: (matchId: string, scoreCasa: number, scoreVisitante: number) => Promise<Prediction>;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

export const usePalpite = (): UsePalpiteResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addPrediction } = usePredictionsActions();

  const mutate = useCallback(
    async (matchId: string, scoreCasa: number, scoreVisitante: number): Promise<Prediction> => {
      try {
        setIsLoading(true);
        setError(null);

        // Validate input
        if (scoreCasa < 0 || scoreCasa > 10 || scoreVisitante < 0 || scoreVisitante > 10) {
          throw new Error('Score must be between 0 and 10');
        }

        const input: CreatePredictionInput = {
          matchId,
          scoreCasa,
          scoreVisitante,
        };

        // Make request
        const response = await apiClient.post<Prediction>(
          ENDPOINTS.PREDICTIONS_CREATE,
          input
        );

        const prediction = response.data;

        // Optimistic update to store
        addPrediction(prediction);

        return prediction;
      } catch (err) {
        const apiError = err as ApiError | Error;
        const errorMessage = 'message' in apiError ? apiError.message : 'Failed to save prediction';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [addPrediction]
  );

  const reset = useCallback(() => {
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    mutate,
    isLoading,
    error,
    reset,
  };
};

/**
 * Update an existing prediction
 */
export const useUpdatePalpite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updatePrediction } = usePredictionsActions();

  const mutate = useCallback(
    async (predictionId: string, scoreCasa: number, scoreVisitante: number) => {
      try {
        setIsLoading(true);
        setError(null);

        if (scoreCasa < 0 || scoreCasa > 10 || scoreVisitante < 0 || scoreVisitante > 10) {
          throw new Error('Score must be between 0 and 10');
        }

        const input: UpdatePredictionInput = {
          scoreCasa,
          scoreVisitante,
        };

        const response = await apiClient.put<Prediction>(
          ENDPOINTS.PREDICTIONS_UPDATE(predictionId),
          input
        );

        updatePrediction(predictionId, response.data);
        return response.data;
      } catch (err) {
        const apiError = err as ApiError | Error;
        const errorMessage = 'message' in apiError ? apiError.message : 'Failed to update prediction';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [updatePrediction]
  );

  return { mutate, isLoading, error };
};

/**
 * Delete a prediction
 */
export const useDeletePalpite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { removePrediction } = usePredictionsActions();

  const mutate = useCallback(async (predictionId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await apiClient.delete(ENDPOINTS.PREDICTIONS_DELETE(predictionId));
      removePrediction(predictionId);
    } catch (err) {
      const apiError = err as ApiError | Error;
      const errorMessage = 'message' in apiError ? apiError.message : 'Failed to delete prediction';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [removePrediction]);

  return { mutate, isLoading, error };
};
