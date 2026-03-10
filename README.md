# OnaFlix Mobile BFF

Backend-for-frontend service that aggregates data from OnaFlix microservices for mobile app consumption. Optimizes payloads, handles caching, and provides mobile-specific endpoints.

## Stack

- **Runtime:** Node.js 20
- **Language:** TypeScript
- **Framework:** Express 4
- **Validation:** Zod
- **HTTP Client:** node-fetch
- **Cache:** Redis

## Setup

```bash
npm install
npm run dev
```

Expects the catalog service at `http://localhost:3001` (configurable via `CATALOG_SERVICE_URL`).

## API Endpoints

- `GET /api/v1/movies` -- List movies (mobile-optimized)
- `GET /api/v1/movies/:id` -- Get movie detail
- `GET /api/v1/movies/featured/home` -- Home screen featured content
- `GET /api/v1/users/preferences` -- Get user preferences
- `PUT /api/v1/users/preferences` -- Update user preferences
- `GET /health` -- Health check

## Testing

```bash
npm test
```
