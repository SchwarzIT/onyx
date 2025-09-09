import { defineStore } from "pinia";
import type { OnyxNotificationCardProps } from "sit-onyx";

export type MyNotification = OnyxNotificationCardProps & {
  description: string;
};

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<MyNotification[]>([]);

  const unreadNotifications = computed(() => notifications.value.filter(({ unread }) => unread));
  const readNotifications = computed(() => notifications.value.filter(({ unread }) => !unread));

  /**
   * Marks all existing notifications as read.
   */
  const markAllAsRead = () => {
    notifications.value = notifications.value.map((notification) => ({
      ...notification,
      unread: false,
    }));
  };

  /**
   * Adds a new unread notification.
   */
  const add = (notification: Omit<MyNotification, "unread">) => {
    notifications.value.unshift({ ...notification, unread: true });
  };

  return { notifications, unreadNotifications, readNotifications, markAllAsRead, add };
});
