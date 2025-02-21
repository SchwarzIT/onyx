import type { OnyxColor } from "sit-onyx";
import { computed, inject, ref, type ComputedRef, type InjectionKey } from "vue";

export type NotificationProvider = {
  /**
   * Readonly list of currently added notifications.
   */
  notificationsQueue: ComputedRef<ProvidedNotification[]>;
  /**
   * Add new notification queue at the end of an array
   */
  add: (notification: ShowNotificationOptions) => void;
  /**
   * Removes the notification with the given `id`.
   */
  remove: (id: ProvidedNotification["id"]) => void;
};

export type ProvidedNotification = ShowNotificationOptions & {
  /**
   * Unique notification id used to identify the notification.
   */
  id: number;
  /**
   * Handler that should remove the notification. Will be called when the notification closes.
   */
  onClose: () => void;
};

export type ShowNotificationOptions = NotificationMessageProps & {
  /**
   * Callback when the notification is clicked. Requires `clickable` to be enabled.
   */
  onClick?: () => void;
};

export type NotificationMessageProps = {
  /**
   * Main notification headline.
   */
  headline: string;
  /**
   * Message of the notification
   */
  description: string;
  /**
   * Notification color.
   */
  color?: Extract<OnyxColor, "neutral" | "danger" | "warning" | "success">;
  /**
   * Duration in milliseconds for the notification to close automatically.
   * Timer will be paused when hovering the notification.
   *
   * Can be set to `0` to disable the auto closing.
   */
  duration?: number;
  /**
   * Icon to display. By default, an icon will be displayed depending on the current `color` property.
   * Can be set to `false` to hide the icon.
   */
  icon?: string;
};

export const NOTIFICATION_PROVIDER_INJECTION_KEY = Symbol() as InjectionKey<NotificationProvider>;

/**
 * Creates a new notification provider that can be used with `useNotification()`.
 * Should be provided once on global app level. E.g in main.ts like:
 * app.provide(NOTIFICATION_PROVIDER_INJECTION_KEY, createNotificationProvider());
 */
export const createNotificationProvider = (): NotificationProvider => {
  let nextId = 1;
  const notifications = ref<ProvidedNotification[]>([]);

  const add: NotificationProvider["add"] = (notification: ShowNotificationOptions) => {
    const id = (nextId += 1);

    notifications.value.push({ ...notification, id, onClose: () => remove(id) });
  };

  const remove: NotificationProvider["remove"] = (id) => {
    notifications.value = notifications.value.filter((notification) => notification.id !== id);
  };

  return {
    // make notifications readonly so they can not be modified from the outside
    notificationsQueue: computed(() => notifications.value),
    add,
    remove,
  };
};

/**
 * Composable for showing notifications.
 */
export const useNotification = () => {
  const logWarning = () => {
    // eslint-disable-next-line no-console
    console.warn(
      'Trying to use "useNotification()" before the notification provider has been provided. Make sure to "provide" it first.',
    );
  };

  const notificationProvider = inject(
    NOTIFICATION_PROVIDER_INJECTION_KEY,
    // provide fallback so "useNotification()" does not return "undefined"
    () => {
      return {
        notificationsQueue: computed(() => []),
        add: logWarning,
        remove: logWarning,
      } satisfies NotificationProvider;
    },
    true,
  );

  return notificationProvider;
};
