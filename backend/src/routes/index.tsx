import { Router } from 'express';
import notificationRoutes from './notificationRoutes';

const router = Router();

router.use('/notifications', notificationRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default router;