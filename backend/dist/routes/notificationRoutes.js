"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/notificationRoutes.ts
const express_1 = require("express");
const notificationController_1 = require("../controllers/notificationController");
const validation_1 = require("../middleware/validation");
const notificationValidation_1 = require("../validations/notificationValidation");
const router = (0, express_1.Router)();
router.get('/', notificationController_1.NotificationController.getAllNotifications);
router.get('/:id', notificationController_1.NotificationController.getNotificationById);
router.post('/', (0, validation_1.validate)(notificationValidation_1.createNotificationSchema), notificationController_1.NotificationController.createNotification);
router.put('/:id', (0, validation_1.validate)(notificationValidation_1.updateNotificationSchema), notificationController_1.NotificationController.updateNotification);
router.patch('/:id/validate', (0, validation_1.validate)(notificationValidation_1.validationSchema), notificationController_1.NotificationController.validateNotification);
router.delete('/:id', notificationController_1.NotificationController.deleteNotification);
exports.default = router;
//# sourceMappingURL=notificationRoutes.js.map