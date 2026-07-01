'use client';

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { ApiError, ErrorCode, HttpStatus } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiClient {
  private instance: AxiosInstance;
  private requestInterceptorId: number | null = null;
  private responseInterceptorId: number | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor: Add auth header
    this.requestInterceptorId = this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const { token, shouldRefreshToken } = useAuthStore.getState();

        // Check if token should be refreshed
        if (shouldRefreshToken()) {
          // Token expiring soon - should refresh before request
          // This will be handled by the response interceptor if needed
        }

        // Add token to Authorization header
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor: Handle errors and refresh token
    this.responseInterceptorId = this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError<any>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized - try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Attempt to refresh token
            const { token } = useAuthStore.getState();
            if (!token) {
              // No token, redirect to login
              useAuthStore.getState().clearAuth();
              if (typeof window !== 'undefined') {
                window.location.href = '/login';
              }
              return Promise.reject(error);
            }

            // Call refresh endpoint (this would be a Server Action in production)
            const response = await this.instance.post('/auth/refresh', {});
            const { token: newToken, expiresIn } = response.data;

            // Update auth store with new token
            const { user } = useAuthStore.getState();
            if (user) {
              useAuthStore.getState().setToken(newToken, expiresIn);
            }

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            // Refresh failed, clear auth and redirect
            useAuthStore.getState().clearAuth();
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }

        // Handle 429 Rate Limit
        if (error.response?.status === 429) {
          const retryAfter = error.response.headers['retry-after'] || 60;
          const customError: ApiError = {
            code: ErrorCode.RATE_LIMITED,
            message: `Too many requests. Retry after ${retryAfter}s`,
            retryAfter: parseInt(String(retryAfter)),
          };
          return Promise.reject(customError);
        }

        // Handle other HTTP errors
        if (error.response?.status) {
          const status = error.response.status as HttpStatus;
          const data = error.response.data;

          const apiError: ApiError = {
            code: data?.error?.code || this.getErrorCodeFromStatus(status),
            message: data?.error?.message || error.message,
            details: data?.error?.details,
            requestId: data?.error?.requestId,
          };

          return Promise.reject(apiError);
        }

        // Handle network errors
        if (!error.response) {
          const networkError: ApiError = {
            code: ErrorCode.NETWORK_ERROR,
            message: 'Network error. Please check your connection.',
          };
          return Promise.reject(networkError);
        }

        return Promise.reject(error);
      }
    );
  }

  private getErrorCodeFromStatus(status: HttpStatus): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return ErrorCode.VALIDATION_ERROR;
      case HttpStatus.UNAUTHORIZED:
        return ErrorCode.UNAUTHORIZED;
      case HttpStatus.FORBIDDEN:
        return ErrorCode.FORBIDDEN;
      case HttpStatus.NOT_FOUND:
        return ErrorCode.NOT_FOUND;
      case HttpStatus.CONFLICT:
        return ErrorCode.CONFLICT;
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return ErrorCode.UNPROCESSABLE_ENTITY;
      case HttpStatus.RATE_LIMITED:
        return ErrorCode.RATE_LIMITED;
      case HttpStatus.INTERNAL_SERVER_ERROR:
      case HttpStatus.BAD_GATEWAY:
      case HttpStatus.SERVICE_UNAVAILABLE:
      case HttpStatus.GATEWAY_TIMEOUT:
        return ErrorCode.INTERNAL_ERROR;
      default:
        return 'UNKNOWN_ERROR';
    }
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }

  public async get<T>(url: string, config = {}) {
    return this.instance.get<T>(url, config);
  }

  public async post<T>(url: string, data?: any, config = {}) {
    return this.instance.post<T>(url, data, config);
  }

  public async put<T>(url: string, data?: any, config = {}) {
    return this.instance.put<T>(url, data, config);
  }

  public async delete<T>(url: string, config = {}) {
    return this.instance.delete<T>(url, config);
  }

  public destroy() {
    if (this.requestInterceptorId !== null) {
      this.instance.interceptors.request.eject(this.requestInterceptorId);
    }
    if (this.responseInterceptorId !== null) {
      this.instance.interceptors.response.eject(this.responseInterceptorId);
    }
  }
}

export const apiClient = new ApiClient();
