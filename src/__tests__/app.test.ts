import request from 'supertest';
import app from '../index';

describe('Mobile BFF', () => {
  describe('GET /health', () => {
    it('returns ok status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('mobile-bff');
    });
  });

  describe('GET /api/v1/users/preferences', () => {
    it('returns default preferences', async () => {
      const res = await request(app).get('/api/v1/users/preferences');
      expect(res.status).toBe(200);
      expect(res.body.theme).toBe('dark');
      expect(res.body.language).toBe('en');
    });
  });

  describe('PUT /api/v1/users/preferences', () => {
    it('updates preferences', async () => {
      const res = await request(app)
        .put('/api/v1/users/preferences')
        .send({ theme: 'light', language: 'es' });
      expect(res.status).toBe(200);
      expect(res.body.updated).toBe(true);
    });
  });
});
