import { computed, inject, ref, type ComputedRef, type InjectionKey } from "vue";
import type { OnyxNotificationMessageProps } from "../OnyxNotificationMessage/types";

export type NotificationsProvider = {
  /**
   * Readonly list of currently active notifications.
   */
  notifications: ComputedRef<ProvidedNotification[]>;
  /**
   * Shows a single notification.
   */
  show: (notification: ShowNotificationOptions) => void;
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
   * Is only used for internal onyx usage.
   */
  onClose: () => void;
};

export type ShowNotificationOptions = OnyxNotificationMessageProps & {
  /**
   * Callback when the notification is clicked. Requires `clickable` to be enabled.
   */
  onClick?: () => void;
};

export const NOTIFICATIONS_PROVIDER_INJECTION_KEY = Symbol() as InjectionKey<NotificationsProvider>;

/**
 * Creates a new notifications provider that can be used with `useNotification()`.
 * Should be provided once on global app level with:
 *
 * @example
 * ```ts
 * import { createNotificationsProvider, NOTIFICATIONS_PROVIDER_INJECTION_KEY } from "sit-onyx";
 *
 * app.provide(NOTIFICATIONS_PROVIDER_INJECTION_KEY, createNotificationsProvider());
 * ```
 */
export const createNotificationsProvider = (): NotificationsProvider => {
  let nextId = 1;
  const notifications = ref<ProvidedNotification[]>([]);

  const show: NotificationsProvider["show"] = (notification: ShowNotificationOptions) => {
    const id = nextId++;

    notifications.value.unshift({
      ...notification,
      id,
      onClose: () => remove(id),
    });
  };

  const remove: NotificationsProvider["remove"] = (id) => {
    notifications.value = notifications.value.filter((notification) => notification.id !== id);
  };

  return {
    // make notifications readonly so they can not be modified from the outside
    notifications: computed(() => notifications.value),
    show,
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
      'Trying to use "useNotification()" before the notifications provider has been provided. Make sure to "provide" it first.',
    );
  };

  const notificationsProvider = inject(
    NOTIFICATIONS_PROVIDER_INJECTION_KEY,
    // provide fallback so "useNotification()" does not return "undefined"
    () => {
      return {
        notifications: computed(() => []),
        show: logWarning,
        remove: logWarning,
      } satisfies NotificationsProvider;
    },
    true,
  );

  return notificationsProvider;
};
