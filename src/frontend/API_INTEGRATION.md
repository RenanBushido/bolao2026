# API Integration Guide

This document describes how the frontend integrates with the backend API.

## Configuration

API endpoint and timeout are configured via environment variables:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_TIMEOUT=5000
```

## API Client

The API client is implemented in `lib/api.ts` and provides:

- **Automatic timeout handling** (configurable, default 5s)
- **Error handling** with user-friendly messages
- **CORS support** (see `lib/cors.ts`)
- **Type-safe responses** using TypeScript

## Endpoints Used

### Championships

#### Get All Championships
```
GET /api/championships
```

**Response**:
```json
[
  {
    "id": "uuid",
    "name": "World Cup 2026",
    "year": 2026
  }
]
```

**Usage**:
```tsx
import { getChampionships } from '@/lib/api';

const championships = await getChampionships();
```

**Error Handling**: Returns empty array if request fails

---

### Leaderboard

#### Get Top Players
```
GET /api/leaderboard?top=5
```

**Response**:
```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name",
    "totalScore": 150,
    "rank": 1
  }
]
```

**Usage**:
```tsx
import { getLeaderboard } from '@/lib/api';

const topPlayers = await getLeaderboard(5);
```

**Error Handling**: Returns empty array if request fails

---

### Users

#### Get User by Email
```
GET /api/users/email/{email}
```

**Response**:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "User Name",
  "totalScore": 150
}
```

**Usage**:
```tsx
import { getUserByEmail } from '@/lib/api';

const user = await getUserByEmail('user@example.com');
```

---

#### Get User by ID
```
GET /api/users/{id}
```

**Response**: Same as Get User by Email

**Usage**:
```tsx
import { getUser } from '@/lib/api';

const user = await getUser('user-id');
```

---

## Error Handling

### Network Errors

If the backend is unreachable or times out:

```tsx
try {
  const data = await getChampionships();
} catch (error) {
  console.error('Failed to fetch championships:', error);
  // Show user-friendly error message
}
```

**Common errors**:
- **Connection Timeout**: Backend takes longer than 5 seconds to respond
- **Network Error**: Backend server is down
- **CORS Error**: Backend doesn't allow cross-origin requests

### Backend Errors

If the backend returns an error (500, 404, etc.):

```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "errors": {
    "fieldName": ["Error message"]
  },
  "timestamp": "2026-07-01T02:16:00Z"
}
```

The client logs these errors and returns a fallback response.

## CORS Configuration

The backend must be configured to allow requests from the frontend:

### Required CORS Headers

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

See `lib/cors.ts` for frontend CORS configuration.

## Testing API Integration

### 1. Manual Testing

```bash
# Start backend on localhost:5000
# Start frontend on localhost:3000
# Open http://localhost:3000
# Check browser console for API calls
```

### 2. Mock API (if backend is down)

Modify `lib/api.ts` to return mock data:

```tsx
export async function getChampionships(): Promise<Championship[]> {
  // return mockChampionships; // For testing without backend
  return await client.get<Championship[]>('/api/championships');
}
```

### 3. Network Inspection

Use Chrome DevTools Network tab to inspect:
- Request URL
- Request headers
- Response status
- Response body

## TypeScript Types

All API responses are typed. See `types/api.ts`:

```tsx
export interface Championship {
  id: string;
  name: string;
  year: number;
}

export interface LeaderboardUser extends User {
  rank?: number;
}
```

## Adding New API Endpoints

1. Add type to `types/api.ts`
2. Add function to `lib/api.ts`
3. Use in component

Example:

```tsx
// types/api.ts
export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  scheduledAt: string;
}

// lib/api.ts
export async function getMatches(championshipId: string) {
  return await client.get<Match[]>(`/api/matches?championshipId=${championshipId}`);
}

// In component
import { getMatches } from '@/lib/api';
const matches = await getMatches(championshipId);
```

## Deployment Notes

### Environment Variables

Update `NEXT_PUBLIC_API_URL` for each environment:

- **Local**: `http://localhost:5000`
- **Staging**: `https://api-staging.bolao2026.com`
- **Production**: `https://api.bolao2026.com`

### CORS Headers

Ensure backend allows requests from frontend domain:

```
Access-Control-Allow-Origin: https://bolao2026.com
```

### Monitoring

Monitor API error rates in production:
- 5xx errors: Backend issues
- 4xx errors: Invalid requests
- Timeout errors: Performance issues

## Troubleshooting

### "Connection timeout" Error

**Cause**: Backend takes >5 seconds to respond

**Solution**:
1. Check backend is running
2. Increase `NEXT_PUBLIC_API_TIMEOUT`
3. Check network latency

### "CORS error" in Browser

**Cause**: Backend doesn't allow cross-origin requests

**Solution**:
1. Add CORS headers to backend
2. Check backend CORS configuration
3. Verify frontend origin is whitelisted

### Empty Data Response

**Cause**: API endpoint exists but returns empty data

**Solution**:
1. Check database has data
2. Verify API filter parameters
3. Check API response format

## References

- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [CORS MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/api-routes)
