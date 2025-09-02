"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notificationModel_1 = require("../models/notificationModel");
const errorHandler_1 = require("../middleware/errorHandler");
class NotificationController {
    static async getAllNotifications(req, res, next) {
        try {
            const notifications = await notificationModel_1.NotificationModel.findAll();
            res.json({ success: true, data: notifications });
        }
        catch (error) {
            next(error);
        }
    }
    static async getNotificationById(req, res, next) {
        try {
            const { id } = req.params;
            const notification = await notificationModel_1.NotificationModel.findById(id);
            if (!notification) {
                throw new errorHandler_1.AppError('Notificação não encontrada', 404);
            }
            res.json({ success: true, data: notification });
        }
        catch (error) {
            next(error);
        }
    }
    static async createNotification(req, res, next) {
        try {
            const notification = await notificationModel_1.NotificationModel.create(req.body);
            res.status(201).json({ success: true, data: notification });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateNotification(req, res, next) {
        try {
            const { id } = req.params;
            const notification = await notificationModel_1.NotificationModel.update(id, req.body);
            if (!notification) {
                throw new errorHandler_1.AppError('Notificação não encontrada', 404);
            }
            res.json({ success: true, data: notification });
        }
        catch (error) {
            next(error);
        }
    }
    static async validateNotification(req, res, next) {
        try {
            const { id } = req.params;
            const { needs_additional_info } = req.body;
            const currentNotification = await notificationModel_1.NotificationModel.findById(id);
            if (!currentNotification) {
                throw new errorHandler_1.AppError('Notificação não encontrada', 404);
            }
            if (currentNotification.status !== 'Validação') {
                throw new errorHandler_1.AppError('Notificação não está em estado de validação', 400);
            }
            let updatedNotification;
            if (needs_additional_info) {
                updatedNotification = await notificationModel_1.NotificationModel.update(id, {
                    status: 'Em Andamento',
                    needs_additional_info: true,
                });
            }
            else {
                updatedNotification = await notificationModel_1.NotificationModel.update(id, {
                    status: 'Concluído',
                    needs_additional_info: false,
                });
            }
            res.json({ success: true, data: updatedNotification });
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteNotification(req, res, next) {
        try {
            const { id } = req.params;
            await notificationModel_1.NotificationModel.delete(id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notificationController.js.map