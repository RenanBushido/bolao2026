/**
 * Mock match data for Hero component MatchActivityCard during development phase.
 *
 * This data is used until the backend API `/api/matches` is available.
 * Once backend is ready, replace this with API integration (see design.md Phase 2).
 */

export interface MockMatch {
  id: string;
  team1: {
    name: string;
    flag: string; // Country code or emoji
  };
  team2: {
    name: string;
    flag: string;
  };
  date: string; // ISO 8601 format
  status: 'upcoming' | 'live' | 'finished';
  odds?: {
    team1: number;
    draw: number;
    team2: number;
  };
}

/**
 * Sample matches for World Cup 2026 hero display.
 * Shows realistic upcoming/live matches to demonstrate component functionality.
 */
export const sampleMatches: MockMatch[] = [
  {
    id: 'match-001',
    team1: {
      name: 'Argentina',
      flag: '🇦🇷',
    },
    team2: {
      name: 'Brazil',
      flag: '🇧🇷',
    },
    date: '2026-06-15T18:00:00Z',
    status: 'upcoming',
    odds: {
      team1: 2.1,
      draw: 3.2,
      team2: 3.5,
    },
  },
  {
    id: 'match-002',
    team1: {
      name: 'France',
      flag: '🇫🇷',
    },
    team2: {
      name: 'Germany',
      flag: '🇩🇪',
    },
    date: '2026-06-16T20:00:00Z',
    status: 'upcoming',
    odds: {
      team1: 2.8,
      draw: 3.1,
      team2: 2.6,
    },
  },
  {
    id: 'match-003',
    team1: {
      name: 'Spain',
      flag: '🇪🇸',
    },
    team2: {
      name: 'England',
      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    },
    date: '2026-06-17T15:00:00Z',
    status: 'upcoming',
    odds: {
      team1: 1.95,
      draw: 3.5,
      team2: 3.8,
    },
  },
];

/**
 * Returns a subset of matches for display.
 * Use this function to vary the displayed matches without modifying the source data.
 *
 * @param count - Number of matches to return (default 2)
 * @returns Array of mock matches
 */
export function getUpcomingMatches(count: number = 2): MockMatch[] {
  return sampleMatches.slice(0, count);
}
