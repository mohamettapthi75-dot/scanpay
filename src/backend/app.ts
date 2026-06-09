import express from 'express';
import path from 'path';
import apiRoutes from './routes/index.js';

export const configureApp = (viteMiddlewares?: any) => {
  const app = express();

  app.use(express.json());

  // Mount API routes
  app.use('/api', apiRoutes);

  // Healthcheck
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Vite middleware for development
  if (viteMiddlewares) {
    app.use(viteMiddlewares);
  } else if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  return app;
};
