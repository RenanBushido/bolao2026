'use client';

import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';

interface UseAuthResult {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  isTokenExpired: () => boolean;
  shouldRefreshToken: () => boolean;
  logout: () => void;
}

/**
 * Hook to access authentication state
 */
export const useAuth = (): UseAuthResult => {
  const { user, token, isAuthenticated, isTokenExpired, shouldRefreshToken, clearAuth } =
    useAuthStore();

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  return {
    user,
    token,
    isAuthenticated,
    isTokenExpired,
    shouldRefreshToken,
    logout,
  };
};

/**
 * Hook to get only user
 */
export const useAuthUser = () => {
  const user = useAuthStore((state) => state.user);
  return user;
};

/**
 * Hook to check if authenticated
 */
export const useIsAuthenticated = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated;
};

/**
 * Hook to get token
 */
export const useAuthToken = () => {
  const token = useAuthStore((state) => state.token);
  return token;
};
