import { Router } from 'express';

const router = Router();

// Placeholder routes
router.post('/send', (req, res) => res.json({ success: true, message: "Send money endpoint placeholder" }));
router.get('/history', (req, res) => res.json({ success: true, data: [] }));
router.post('/scan', (req, res) => res.json({ success: true, message: "Process QR payment endpoint placeholder" }));

export default router;
