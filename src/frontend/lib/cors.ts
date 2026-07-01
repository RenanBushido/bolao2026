// CORS Configuration
// The backend should be configured with CORS headers to allow requests from this frontend

export const CORS_CONFIG = {
  // Allowed origins (update based on deployment)
  allowedOrigins: [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://127.0.0.1:3000',
  ],

  // HTTP methods
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

  // Allowed headers
  allowedHeaders: ['Content-Type', 'Authorization'],

  // Expose headers
  exposedHeaders: ['Content-Length', 'X-Request-Id'],

  // Allow credentials (cookies, authorization headers)
  credentials: true,

  // Preflight cache duration in seconds
  maxAge: 86400,
};

// Helper function to check if a request is cross-origin
export function isCrossOrigin(origin: string, apiUrl: string): boolean {
  try {
    const originUrl = new URL(origin);
    const apiUrlObj = new URL(apiUrl);

    return originUrl.origin !== apiUrlObj.origin;
  } catch {
    return false;
  }
}

// Get CORS headers for response
export function getCorsHeaders(requestOrigin: string): Record<string, string> {
  const headers: Record<string, string> = {};

  if (CORS_CONFIG.allowedOrigins.includes(requestOrigin)) {
    headers['Access-Control-Allow-Origin'] = requestOrigin;
    headers['Access-Control-Allow-Methods'] = CORS_CONFIG.allowedMethods.join(', ');
    headers['Access-Control-Allow-Headers'] = CORS_CONFIG.allowedHeaders.join(', ');
    headers['Access-Control-Expose-Headers'] = CORS_CONFIG.exposedHeaders.join(', ');
    headers['Access-Control-Max-Age'] = CORS_CONFIG.maxAge.toString();

    if (CORS_CONFIG.credentials) {
      headers['Access-Control-Allow-Credentials'] = 'true';
    }
  }

  return headers;
}
