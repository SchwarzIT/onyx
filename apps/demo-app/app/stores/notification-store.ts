import { defineStore } from "pinia";
import type { MyNotification } from "../components/NotificationCenter.vue";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [] as MyNotification[],
    isSidebarOpen: false,
  }),

  getters: {
    unreadNotifications: (state) => state.notifications.filter(({ unread }) => unread),
    readNotifications: (state) => state.notifications.filter(({ unread }) => !unread),
  },

  actions: {
    /**
     * Marks all existing notifications as read.
     */
    markAllAsRead() {
      this.notifications = this.notifications.map((notification) => ({
        ...notification,
        unread: false,
      }));
    },
    /**
     * Adds a new unread notification.
     */
    add(notification: Omit<MyNotification, "unread">) {
      this.notifications.unshift({ ...notification, unread: true });
    },
  },
});
