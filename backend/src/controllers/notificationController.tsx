// src/controllers/notificationController.tsx
import { Request, Response, NextFunction } from 'express';
import { Notification } from '../models/notificationModel'; 
import { AppError } from '../middleware/errorHandler';
import { ValidationInput } from '../validations/notificationValidation';

export class NotificationController {
  static async getAllNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const notifications = await Notification.find().sort({ created_at: -1 });
      res.json({ success: true, data: notifications });
    } catch (error) {
      next(error);
    }
  }

  static async getNotificationById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const notification = await Notification.findById(id);

      if (!notification) {
        throw new AppError('Notificação não encontrada', 404);
      }

      res.json({ success: true, data: notification });
    } catch (error) {
      next(error);
    }
  }

  static async createNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const notification = await Notification.create(req.body);
      res.status(201).json({ success: true, data: notification });
    } catch (error) {
      next(error);
    }
  }

  static async updateNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const notification = await Notification.findByIdAndUpdate(
        id,
        { ...req.body, updated_at: new Date() },
        { new: true, runValidators: true }
      );

      if (!notification) {
        throw new AppError('Notificação não encontrada', 404);
      }

      res.json({ success: true, data: notification });
    } catch (error) {
      next(error);
    }
  }

  static async validateNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { needs_additional_info }: ValidationInput = req.body;

      const currentNotification = await Notification.findById(id);
      if (!currentNotification) {
        throw new AppError('Notificação não encontrada', 404);
      }

      if (currentNotification.status !== 'Validação') {
        throw new AppError('Notificação não está em estado de validação', 400);
      }

      let updatedNotification;
      if (needs_additional_info) {
        updatedNotification = await Notification.findByIdAndUpdate(
          id,
          { 
            status: 'Em Andamento',
            needs_additional_info: true,
            updated_at: new Date()
          },
          { new: true }
        );
      } else {
        updatedNotification = await Notification.findByIdAndUpdate(
          id,
          { 
            status: 'Concluído',
            needs_additional_info: false,
            updated_at: new Date()
          },
          { new: true }
        );
      }

      res.json({ success: true, data: updatedNotification });
    } catch (error) {
      next(error);
    }
  }

  static async deleteNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const notification = await Notification.findByIdAndDelete(id);
      
      if (!notification) {
        throw new AppError('Notificação não encontrada', 404);
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}