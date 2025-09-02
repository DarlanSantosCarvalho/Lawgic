// src/types/notification.ts
export type NotificationStatus = 'Em Andamento' | 'Validação' | 'Concluído';

export interface Notification {
  id: string;
  title: string;
  description: string;
  hearing_date: string;
  status: NotificationStatus;
  notified_name?: string;
  notified_email?: string;
  notified_phone?: string;
  notified_address?: string;
  needs_additional_info?: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateNotificationRequest {
  title: string;
  description: string;
  hearing_date: string;
}

export interface UpdateNotificationRequest {
  title?: string;
  description?: string;
  hearing_date?: string;
  notified_name?: string;
  notified_email?: string;
  notified_phone?: string;
  notified_address?: string;
  needs_additional_info?: boolean;
  status?: NotificationStatus;
}

export interface ValidationRequest {
  needs_additional_info: boolean;
}