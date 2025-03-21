export type OnyxNotificationMessageProps = {
  /**
   * Notification headline/title.
   */
  headline: string;
  /**
   * Duration in milliseconds for the notification to close automatically.
   * Timer will be paused when hovering the toast.
   *
   * Can be set to `0` to disable the auto closing.
   */
  duration?: number;
  /**
   * Optional icon to display.
   */
  icon?: string;
};
