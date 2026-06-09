import { Router } from 'express';

const router = Router();

// Placeholder routes
router.get('/analytics', (req, res) => res.json({ success: true, data: { revenue: 0 } }));
router.get('/transactions', (req, res) => res.json({ success: true, data: [] }));
router.post('/generate-qr', (req, res) => res.json({ success: true, data: { qrData: "..." } }));

export default router;
