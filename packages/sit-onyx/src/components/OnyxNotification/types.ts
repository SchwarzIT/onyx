export interface OnyxNotificationProps {
  /**
   * Notification headline/title.
   */
  headline: string;
  /**
   * Description/preview of the notification content.
   */
  description: string;
  /**
   * Duration in milliseconds for the notification to close automatically.
   * Timer will be paused when hovering the toast.
   *
   * Can be set to `0` to disable the auto closing.
   */
  duration?: number;
  /**
   * Optional icon to show next to the headline.
   */
  icon?: string;
}
