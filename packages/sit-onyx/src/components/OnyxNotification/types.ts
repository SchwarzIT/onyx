import type { OnyxColor } from "../../types";

export interface OnyxNotificationProps {
  /**
   * Use this property to set the title of the notification
   */
  headline: string;
  /**
   * Use this property to set the text in the notification pop-up body
   */
  description: string;
  /**
   * Use this property to set the color
   */
  color?: Extract<OnyxColor, "neutral" | "danger" | "warning" | "success">;
  /**
   * Use this property to set the duration time. Default value: 5000 ms
   */
  duration?: number;
  /**
   * Use this property to add icon to the notification pop-up headline.
   */
  icon?: string;
}
