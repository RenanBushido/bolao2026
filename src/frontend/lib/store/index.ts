/**
 * Shared store utilities and helpers
 */

import { useCallback } from 'react';

/**
 * Hook for cache validation with callback
 */
export const useStoreCache = (isCacheValid: () => boolean, onInvalidate?: () => void) => {
  const isValid = isCacheValid();

  if (!isValid && onInvalidate) {
    onInvalidate();
  }

  return isValid;
};

/**
 * Hook for combining multiple store loading states
 */
export const useCombinedLoading = (...loaders: boolean[]) => {
  return loaders.some((loading) => loading);
};

/**
 * Hook for combining multiple store errors
 */
export const useCombinedError = (...errors: (string | null)[]) => {
  return errors.find((error) => error !== null) || null;
};

/**
 * Generic cache manager for store data
 */
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class StoreCache<T> {
  private cache: CacheEntry<T> | null = null;

  set(data: T, ttl: number = 5 * 60 * 1000) {
    this.cache = {
      data,
      timestamp: Date.now(),
      ttl,
    };
  }

  get(): T | null {
    if (!this.cache) return null;
    if (Date.now() - this.cache.timestamp > this.cache.ttl) {
      this.cache = null;
      return null;
    }
    return this.cache.data;
  }

  isValid(): boolean {
    return this.get() !== null;
  }

  clear() {
    this.cache = null;
  }
}

/**
 * Redux-like action creator helper
 */
export const createAction = <T>(type: string) => (payload: T) => ({
  type,
  payload,
});
