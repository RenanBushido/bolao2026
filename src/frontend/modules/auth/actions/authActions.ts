/**
 * Auth actions - API calls for authentication
 * In production, these would be Next.js Server Actions in src/app/(auth)/
 */

import { apiClient } from '@/lib/api';
import { useAuthStore } from '../store/authStore';
import { User, AuthSession, LoginInput, SignupInput } from '../types';
import { ENDPOINTS } from '@/lib/api';
import { ApiError } from '@/lib/types';

/**
 * Login with email and password
 * Returns user and token on success
 */
export async function login(email: string, password: string): Promise<AuthSession> {
  try {
    const input: LoginInput = { email, password };
    const response = await apiClient.post<AuthSession>(ENDPOINTS.AUTH_LOGIN, input);

    const { user, token, expiresIn } = response.data;

    // Update auth store
    useAuthStore.getState().setAuth(user, token, expiresIn);

    return response.data;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Login failed');
  }
}

/**
 * Sign up with email, password, and name
 * Returns user and token on success
 */
export async function signup(email: string, password: string, name: string): Promise<AuthSession> {
  try {
    const input: SignupInput = { email, password, name };
    const response = await apiClient.post<AuthSession>(ENDPOINTS.AUTH_SIGNUP, input);

    const { user, token, expiresIn } = response.data;

    // Update auth store
    useAuthStore.getState().setAuth(user, token, expiresIn);

    return response.data;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Signup failed');
  }
}

/**
 * Logout - invalidate token on backend
 */
export async function logout(): Promise<void> {
  try {
    const { token } = useAuthStore.getState();

    if (token) {
      await apiClient.post(ENDPOINTS.AUTH_LOGOUT, {});
    }

    // Clear local auth state
    useAuthStore.getState().clearAuth();
  } catch (error) {
    // Even if logout API call fails, clear local state
    useAuthStore.getState().clearAuth();
    console.error('Logout error:', error);
  }
}

/**
 * Refresh authentication token
 */
export async function refreshToken(): Promise<string> {
  try {
    const response = await apiClient.post<{ token: string; expiresIn: number }>(
      ENDPOINTS.AUTH_REFRESH,
      {}
    );

    const { token, expiresIn } = response.data;
    const { user } = useAuthStore.getState();

    if (user) {
      useAuthStore.getState().setToken(token, expiresIn);
    }

    return token;
  } catch (error) {
    // Refresh failed, clear auth
    useAuthStore.getState().clearAuth();
    throw error;
  }
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<User> {
  try {
    const response = await apiClient.get<User>(ENDPOINTS.AUTH_ME);
    const user = response.data;

    // Update store with fresh user data
    useAuthStore.getState().updateUser(user);

    return user;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Failed to fetch user');
  }
}
