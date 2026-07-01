/**
 * Shared types for API responses, pagination, errors, etc.
 */

/**
 * Standard API Response wrapper
 */
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  timestamp: string;
  path: string;
}

/**
 * Standard API Error format
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  requestId?: string;
  retryAfter?: number;
}

/**
 * Pagination info
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated list response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

/**
 * API Request error with retry info
 */
export interface NetworkError extends Error {
  status?: number;
  code?: string;
  retryable: boolean;
  retryAfter?: number;
}

/**
 * Validation error with field-level details
 */
export interface ValidationError extends ApiError {
  code: 'VALIDATION_ERROR';
  details: Record<string, string>;
}

/**
 * Common HTTP status codes
 */
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  RATE_LIMITED = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

/**
 * Common error codes
 */
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  RATE_LIMITED = 'RATE_LIMITED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',
}

/**
 * Async data state
 */
export interface AsyncState<T, E = ApiError> {
  data: T | null;
  error: E | null;
  isLoading: boolean;
  isError: boolean;
}

/**
 * Generic hook return type
 */
export interface UseQueryResult<T> extends AsyncState<T> {
  refetch: () => Promise<void>;
}

/**
 * Generic mutation hook return type
 */
export interface UseMutationResult<T, I = any> extends AsyncState<T> {
  mutate: (input: I) => Promise<T>;
  reset: () => void;
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  strategy: 'time' | 'manual' | 'stale-while-revalidate';
}

/**
 * Rate limiter info
 */
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp
}

/**
 * Request interceptor context
 */
export interface RequestContext {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers: Record<string, string>;
  data?: any;
  timestamp: number;
}

/**
 * Response interceptor context
 */
export interface ResponseContext {
  status: number;
  headers: Record<string, string>;
  data: any;
  duration: number;
  timestamp: number;
}
