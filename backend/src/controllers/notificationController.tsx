// src/controllers/notificationController.ts
import { Request, Response, NextFunction } from 'express';
import { NotificationModel } from '../models/notificationModel';
import { AppError } from '../middleware/errorHandler';
import { ValidationInput } from '../validations/notificationValidation';

export class NotificationController {
  static async getAllNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const notifications = await NotificationModel.findAll();
      res.json({ success: true, data: notifications });
    } catch (error) {
      next(error);
    }
  }

  static async getNotificationById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const notification = await NotificationModel.findById(id);

      if (!notification) {
        throw new AppError('Notificação não encontrada');
      }

      res.json({ success: true, data: notification });
    } catch (error) {
      next(error);
    }
  }

  static async createNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const notification = await NotificationModel.create(req.body);
      res.status(201).json({ success: true, data: notification });
    } catch (error) {
      next(error);
    }
  }

  static async updateNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const notification = await NotificationModel.update(id, req.body);

      if (!notification) {
        throw new AppError('Notificação não encontrada');
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

      const currentNotification = await NotificationModel.findById(id);
      if (!currentNotification) {
        throw new AppError('Notificação não encontrada');
      }

      if (currentNotification.status !== 'Validação') {
        throw new AppError('Notificação não está em estado de validação');
      }

      let updatedNotification;
      if (needs_additional_info) {
        updatedNotification = await NotificationModel.update(id, {
          status: 'Em Andamento',
          needs_additional_info: true,
        });
      } else {
        updatedNotification = await NotificationModel.update(id, {
          status: 'Concluído',
          needs_additional_info: false,
        });
      }

      res.json({ success: true, data: updatedNotification });
    } catch (error) {
      next(error);
    }
  }

  static async deleteNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await NotificationModel.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}