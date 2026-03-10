import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { movieRoutes } from './routes/movies';
import { userRoutes } from './routes/users';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'mobile-bff', version: '1.0.0' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Mobile BFF running on port ${PORT}`);
  });
}

export default app;
