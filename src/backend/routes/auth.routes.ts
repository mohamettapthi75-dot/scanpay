import { Router } from 'express';

const router = Router();

// Placeholder routes
router.post('/login', (req, res) => res.json({ success: true, message: "Login endpoint placeholder" }));
router.post('/register', (req, res) => res.json({ success: true, message: "Register endpoint placeholder" }));
router.post('/verify-otp', (req, res) => res.json({ success: true, message: "Verify OTP endpoint placeholder" }));

export default router;
