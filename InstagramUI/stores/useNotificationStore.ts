import { create } from "zustand";
import { NotificationType } from "@/types/notification"; // Ajuste o caminho

interface NotificationState {
  notifications: NotificationType[];
  unreadCount: number;
  
  setNotifications: (notifications: NotificationType[]) => void;
  addRealTimeNotification: (notification: NotificationType) => void;
  removeFollowNotification: (triggerById: number) => void;
  markAsRead: (id: number) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,

  setNotifications: (notifications) => set({ 
      notifications,
      unreadCount: notifications.filter(n => !n.isRead).length
  }),

  addRealTimeNotification: (notification) => set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1
  })),

  removeFollowNotification: (triggerById) => set((state) => {
      const notifToRemove = state.notifications.find(n => n.triggerById === triggerById && n.type === "Follow");
      
      if (!notifToRemove) return state; // Se não achar, não faz nada

      return {
          notifications: state.notifications.filter(n => n.id !== notifToRemove.id),
          unreadCount: !notifToRemove.isRead ? Math.max(0, state.unreadCount - 1) : state.unreadCount
      };
  }),

  markAsRead: (id) => set((state) => ({
      notifications: state.notifications.map(n => 
          n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1)
  }))
}));