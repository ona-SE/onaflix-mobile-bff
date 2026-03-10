import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';

const router = Router();

const CATALOG_URL = process.env.CATALOG_SERVICE_URL || 'http://localhost:3001';

// Aggregate movie data from catalog service for mobile consumption
router.get('/', async (_req: Request, res: Response) => {
  try {
    const response = await fetch(`${CATALOG_URL}/api/movies`);
    const movies = await response.json();

    // Transform for mobile: smaller payloads, optimized image URLs
    const mobileMovies = (movies as any[]).map((m: any) => ({
      id: m.id,
      title: m.title,
      year: m.release_year,
      rating: m.rating,
      poster: m.image_url ? `${m.image_url}?w=300&h=450` : null,
      director: m.director,
    }));

    res.json({ movies: mobileMovies });
  } catch (err) {
    console.error('Failed to fetch movies:', err);
    res.status(502).json({ error: 'Catalog service unavailable' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${CATALOG_URL}/api/movies/${req.params.id}`);
    if (!response.ok) {
      res.status(response.status).json({ error: 'Movie not found' });
      return;
    }

    const movie = await response.json();
    res.json(movie);
  } catch (err) {
    res.status(502).json({ error: 'Catalog service unavailable' });
  }
});

router.get('/featured/home', async (_req: Request, res: Response) => {
  try {
    const response = await fetch(`${CATALOG_URL}/api/movies`);
    const movies = (await response.json()) as any[];

    const featured = {
      hero: movies[0] || null,
      trending: movies.slice(0, 5),
      topRated: [...movies].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10),
      recentlyAdded: [...movies].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ).slice(0, 10),
    };

    res.json(featured);
  } catch (err) {
    res.status(502).json({ error: 'Catalog service unavailable' });
  }
});

export { router as movieRoutes };
