import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { DateValue } from "../OnyxDatePicker/types.js";

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
   * Optional icon to show.
   */
  icon?: string;
  /**
   * Whether to show a skeleton.
   */
  skeleton?: SkeletonInjected;
};
