// src/routes/notificationRoutes.ts
import { Router } from 'express';
import { NotificationController } from '../controllers/notificationController';
import { validate } from '../middleware/validation';
import { createNotificationSchema, updateNotificationSchema, validationSchema } from '../validations/notificationValidation';

const router = Router();

router.get('/', NotificationController.getAllNotifications);
router.get('/:id', NotificationController.getNotificationById);
router.post('/', validate(createNotificationSchema), NotificationController.createNotification);
router.put('/:id', validate(updateNotificationSchema), NotificationController.updateNotification);
router.patch('/:id/validate', validate(validationSchema), NotificationController.validateNotification);
router.delete('/:id', NotificationController.deleteNotification);

export default router;

// src/routes/index.ts
import { Router } from 'express';
import notificationRoutes from './notificationRoutes';

const router = Router();

router.use('/notifications', notificationRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default router;