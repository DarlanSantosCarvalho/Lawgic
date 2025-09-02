import { Notification, CreateNotificationRequest, UpdateNotificationRequest, NotificationStatus } from '../types/notifications';
export declare class NotificationModel {
    static findAll(): Promise<Notification[]>;
    static findById(id: string): Promise<Notification | null>;
    static create(data: CreateNotificationRequest): Promise<Notification>;
    static update(id: string, data: UpdateNotificationRequest): Promise<Notification>;
    static updateStatus(id: string, status: NotificationStatus): Promise<Notification>;
    static delete(id: string): Promise<void>;
}
//# sourceMappingURL=notificationModel.d.ts.map