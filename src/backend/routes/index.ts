import { Router } from 'express';
import authRoutes from './auth.routes.js';
import transactionRoutes from './transaction.routes.js';
import merchantRoutes from './merchant.routes.js';
import telecomRoutes from './telecom.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/transactions', transactionRoutes);
router.use('/merchants', merchantRoutes);
router.use('/telecom', telecomRoutes);

export default router;
