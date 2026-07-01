import type { Championship, LeaderboardUser, ApiErrorResponse } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '5000');

class ApiClient {
  private timeout: number;

  constructor(timeout: number = API_TIMEOUT) {
    this.timeout = timeout;
  }

  private async fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.fetchWithTimeout(`${API_URL}${endpoint}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Connection timeout. Please check if the server is running.');
      }
      throw error;
    }
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response = await this.fetchWithTimeout(`${API_URL}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error: ApiErrorResponse = await response.json();
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Connection error. Please check your internet connection.');
      }
      throw error;
    }
  }
}

const client = new ApiClient();

// Championship endpoints
export async function getChampionships(): Promise<Championship[]> {
  try {
    const championships = await client.get<Championship[]>('/api/championships');
    return championships || [];
  } catch (error) {
    console.error('Failed to fetch championships:', error);
    return [];
  }
}

export async function getChampionship(id: string): Promise<Championship | null> {
  try {
    return await client.get<Championship>(`/api/championships/${id}`);
  } catch (error) {
    console.error(`Failed to fetch championship ${id}:`, error);
    return null;
  }
}

// Leaderboard endpoints
export async function getLeaderboard(top: number = 100): Promise<LeaderboardUser[]> {
  try {
    const leaderboard = await client.get<LeaderboardUser[]>(`/api/leaderboard?top=${top}`);
    return (leaderboard || []).map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return [];
  }
}

// User endpoints
export async function getUserByEmail(email: string) {
  try {
    return await client.get(`/api/users/email/${encodeURIComponent(email)}`);
  } catch (error) {
    console.error(`Failed to fetch user by email:`, error);
    return null;
  }
}

export async function getUser(id: string) {
  try {
    return await client.get(`/api/users/${id}`);
  } catch (error) {
    console.error(`Failed to fetch user ${id}:`, error);
    return null;
  }
}

// Export client for advanced usage
export { client as apiClient };
