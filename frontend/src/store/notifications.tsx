// src/store/notifications.ts
import { create } from "zustand";

export type NotificationStatus = "Em Andamento" | "Validação" | "Concluído";

export interface Notification {
  id: string;
  title: string;
  description: string;
  hearingDate: string;
  status: NotificationStatus;
  notifiedName?: string;
  notifiedEmail?: string;
  notifiedPhone?: string;
  notifiedAddress?: string;
  needsAdditionalInfo?: boolean;
}

interface NotificationsStore {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Omit<Notification, "id"> & { id?: string }) => void;
  updateNotification: (id: string, updates: Partial<Notification>) => void;
  getNotification: (id: string) => Notification | undefined;
  deleteNotification: (id: string) => void;
}

export const useNotifications = create<NotificationsStore>((set, get) => ({
  notifications: [],
  
  setNotifications: (notifications) => set({ notifications }),
  
  addNotification: (notification) =>
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: notification.id || Date.now().toString(),
      };
      return {
        notifications: [...state.notifications, newNotification],
      };
    }),
  
  updateNotification: (id, updates) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, ...updates } : n
      ),
    })),
  
  getNotification: (id) => {
    const state = get();
    return state.notifications.find((n) => n.id === id);
  },
  
  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));