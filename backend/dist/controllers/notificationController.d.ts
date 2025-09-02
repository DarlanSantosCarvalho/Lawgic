import { Request, Response, NextFunction } from 'express';
export declare class NotificationController {
    static getAllNotifications(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getNotificationById(req: Request, res: Response, next: NextFunction): Promise<void>;
    static createNotification(req: Request, res: Response, next: NextFunction): Promise<void>;
    static updateNotification(req: Request, res: Response, next: NextFunction): Promise<void>;
    static validateNotification(req: Request, res: Response, next: NextFunction): Promise<void>;
    static deleteNotification(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=notificationController.d.ts.map