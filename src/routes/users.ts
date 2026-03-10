import { Router, Request, Response } from 'express';

const router = Router();

// Stub user endpoints for mobile app
router.get('/preferences', (_req: Request, res: Response) => {
  res.json({
    theme: 'dark',
    language: 'en',
    notifications: true,
    autoplay: false,
  });
});

router.put('/preferences', (req: Request, res: Response) => {
  const prefs = req.body;
  // In production: save to user service
  res.json({ ...prefs, updated: true });
});

export { router as userRoutes };
