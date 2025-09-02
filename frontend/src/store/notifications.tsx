// src/store/notifications.ts
import { create } from "zustand";

export type NotificationStatus = "Em Andamento" | "Validação" | "Concluído";

export interface Notification {
  _id: string;
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

type Store = {
  notifications: Notification[];
  setNotifications: (list: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  updateNotification: (id: string, updates: Partial<Notification>) => void;
};

export const useNotifications = create<Store>((set) => ({
  notifications: [],
  setNotifications: (list) => set({ notifications: list }),
  addNotification: (notification) => 
    set((state) => ({ notifications: [...state.notifications, notification] })),
  updateNotification: (id, updates) =>
    set((state) => ({
      notifications: state.notifications.map(n => 
        n._id === id ? { ...n, ...updates } : n
      )
    })),
}));