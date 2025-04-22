import type { DensityProp } from "../../composables/density";
import type { DateValue } from "../OnyxDatePicker/types";

export type OnyxNotificationCardProps = DensityProp & {
  /**
   * Notification headline/title.
   */
  headline: string;
  /**
   * Time when the notification was created.
   */
  createdAt: DateValue;
  /**
   * Whether the notification is unread / not acknowledged by the user yet.
   */
  unread?: boolean;
  /**
   *  Notifification options. Use it to add options in the notification header menu on hover.
   */
  options?: { label: string; key: string }[];
};
