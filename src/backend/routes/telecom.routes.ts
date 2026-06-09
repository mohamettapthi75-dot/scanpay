import { Router } from 'express';

const router = Router();

// Placeholder routes
router.get('/balance/:providerId', (req, res) => res.json({ success: true, balance: 100 }));
router.post('/webhook/:providerId', (req, res) => res.json({ success: true }));

export default router;
